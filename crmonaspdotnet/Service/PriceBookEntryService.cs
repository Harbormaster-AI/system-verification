
using crmonaspdotnet.Domain;
using crmonaspdotnet.Persistence;
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Telemetry;

namespace crmonaspdotnet.Service;

public interface IPriceBookEntryService {

    Task Create(PriceBookEntry model , CancellationToken cancellationToken);
    Task<bool> Update(PriceBookEntry model, CancellationToken cancellationToken);
    Task<PriceBookEntry?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<PriceBookEntry>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignPriceBook(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignPriceBook(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignProduct(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignProduct(AssociationRequest request, CancellationToken cancellationToken);


}

public class PriceBookEntryService : IPriceBookEntryService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IPriceBookEntryRepository _repository;
    private readonly ILogger<PriceBookEntryService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public PriceBookEntryService(
        ApplicationTelemetry telemetry,
        IPriceBookEntryRepository repository,
        ILogger<PriceBookEntryService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(PriceBookEntry model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "PriceBookEntry",
                "CreatePriceBookEntry",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(PriceBookEntry model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.UnitPrice = model.UnitPrice;
            existing.EffectiveDate = model.EffectiveDate;
            existing.ExpirationDate = model.ExpirationDate;
            existing.AsActive = model.AsActive;

            await _telemetry.Execute(
                "PriceBookEntry",
                "UpdatePriceBookEntry",
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

    public Task<PriceBookEntry?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<PriceBookEntry>> GetAll(CancellationToken cancellationToken)
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
                "PriceBookEntry",
                "UpdatePriceBookEntry",
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

    public async Task<bool> AssignPriceBook(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No PriceBookEntry found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<PriceBookService>().Get(childRequest, cancellationToken);
            parent.PriceBook = child;
            await Update( parent, cancellationToken );
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

    public async Task<bool> UnassignPriceBook(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No PriceBookEntry found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.PriceBook = null;
            await Update( parent, cancellationToken );
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

    public async Task<bool> AssignProduct(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No PriceBookEntry found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<ProductService>().Get(childRequest, cancellationToken);
            parent.Product = child;
            await Update( parent, cancellationToken );
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

    public async Task<bool> UnassignProduct(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No PriceBookEntry found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Product = null;
            await Update( parent, cancellationToken );
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
