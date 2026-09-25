
using crmonaspdotnet.Domain;
using crmonaspdotnet.Persistence;
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Telemetry;

namespace crmonaspdotnet.Service;

public interface IPriceBookService
{

    Task Create(PriceBook model, CancellationToken cancellationToken);
    Task<bool> Update(PriceBook model, CancellationToken cancellationToken);
    Task<PriceBook?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<PriceBook>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignOrganization(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignOrganization(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToEntries(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromEntries(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToQuotes(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromQuotes(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToOrders(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromOrders(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class PriceBookService : IPriceBookService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IPriceBookRepository _repository;
    private readonly ILogger<PriceBookService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public PriceBookService(
        ApplicationTelemetry telemetry,
        IPriceBookRepository repository,
        ILogger<PriceBookService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(PriceBook model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "PriceBook",
                "CreatePriceBook",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(PriceBook model, CancellationToken cancellationToken)
    {
        try
        {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.Name = model.Name;
            existing.AsActive = model.AsActive;
            existing.Description = model.Description;

            await _telemetry.Execute(
                "PriceBook",
                "UpdatePriceBook",
                () => _repository.UpdateAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public Task<PriceBook?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<PriceBook>> GetAll(CancellationToken cancellationToken)
    => _repository.GetAllAsync(cancellationToken);

    public async Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken)
    {
        var existing = await _repository.GetByIdAsync(identifier.Id, cancellationToken);
        if (existing is null)
        {
            return false;
        }

        try
        {
            await _telemetry.Execute(
                "PriceBook",
                "UpdatePriceBook",
                () => _repository.DeleteAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> AssignOrganization(AssociationRequest request, CancellationToken cancellationToken)
    {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No PriceBook found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<OrganizationService>().Get(childRequest, cancellationToken);
            parent.Organization = child;
            await Update(parent, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> UnassignOrganization(AssociationRequest request, CancellationToken cancellationToken)
    {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No PriceBook found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Organization = null;
            await Update(parent, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }


    public async Task<bool> AddToEntries(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "PriceBook",
                "AddToEntries",
                () => _repository.AddToEntriesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromEntries(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "PriceBook",
                "RemoveFromEntries",
                () => _repository.RemoveFromEntriesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> AddToQuotes(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "PriceBook",
                "AddToQuotes",
                () => _repository.AddToQuotesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromQuotes(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "PriceBook",
                "RemoveFromQuotes",
                () => _repository.RemoveFromQuotesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> AddToOrders(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "PriceBook",
                "AddToOrders",
                () => _repository.AddToOrdersAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromOrders(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "PriceBook",
                "RemoveFromOrders",
                () => _repository.RemoveFromOrdersAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }



}
