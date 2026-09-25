
using crmonaspdotnet.Domain;
using crmonaspdotnet.Persistence;
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Telemetry;

namespace crmonaspdotnet.Service;

public interface IQuoteService
{

    Task Create(Quote model, CancellationToken cancellationToken);
    Task<bool> Update(Quote model, CancellationToken cancellationToken);
    Task<Quote?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<Quote>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignOrganization(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignOrganization(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignAccount(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignAccount(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignOpportunity(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignOpportunity(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignOwner(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignOwner(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignPriceBook(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignPriceBook(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignOrder(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignOrder(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToLineItems(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromLineItems(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class QuoteService : IQuoteService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IQuoteRepository _repository;
    private readonly ILogger<QuoteService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public QuoteService(
        ApplicationTelemetry telemetry,
        IQuoteRepository repository,
        ILogger<QuoteService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(Quote model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Quote",
                "CreateQuote",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(Quote model, CancellationToken cancellationToken)
    {
        try
        {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.QuoteNumber = model.QuoteNumber;
            existing.ValidityStart = model.ValidityStart;
            existing.ValidityEnd = model.ValidityEnd;
            existing.TotalAmount = model.TotalAmount;
            existing.DiscountPercent = model.DiscountPercent;
            existing.TaxAmount = model.TaxAmount;
            existing.ShippingAmount = model.ShippingAmount;
            existing.Status = model.Status;

            await _telemetry.Execute(
                "Quote",
                "UpdateQuote",
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

    public Task<Quote?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<Quote>> GetAll(CancellationToken cancellationToken)
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
                "Quote",
                "UpdateQuote",
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
            _logger.LogError("No Quote found using Id {ParentId}", request.ParentId);
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
            _logger.LogError("No Quote found using Id {ParentId}", request.ParentId);
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

    public async Task<bool> AssignAccount(AssociationRequest request, CancellationToken cancellationToken)
    {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No Quote found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<AccountService>().Get(childRequest, cancellationToken);
            parent.Account = child;
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

    public async Task<bool> UnassignAccount(AssociationRequest request, CancellationToken cancellationToken)
    {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No Quote found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Account = null;
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

    public async Task<bool> AssignOpportunity(AssociationRequest request, CancellationToken cancellationToken)
    {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No Quote found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<OpportunityService>().Get(childRequest, cancellationToken);
            parent.Opportunity = child;
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

    public async Task<bool> UnassignOpportunity(AssociationRequest request, CancellationToken cancellationToken)
    {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No Quote found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Opportunity = null;
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

    public async Task<bool> AssignOwner(AssociationRequest request, CancellationToken cancellationToken)
    {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No Quote found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<UserService>().Get(childRequest, cancellationToken);
            parent.Owner = child;
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

    public async Task<bool> UnassignOwner(AssociationRequest request, CancellationToken cancellationToken)
    {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No Quote found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Owner = null;
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

    public async Task<bool> AssignPriceBook(AssociationRequest request, CancellationToken cancellationToken)
    {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No Quote found using Id {ParentId}", request.ParentId);
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

    public async Task<bool> UnassignPriceBook(AssociationRequest request, CancellationToken cancellationToken)
    {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No Quote found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.PriceBook = null;
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

    public async Task<bool> AssignOrder(AssociationRequest request, CancellationToken cancellationToken)
    {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No Quote found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<OrderService>().Get(childRequest, cancellationToken);
            parent.Order = child;
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

    public async Task<bool> UnassignOrder(AssociationRequest request, CancellationToken cancellationToken)
    {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No Quote found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Order = null;
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


    public async Task<bool> AddToLineItems(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Quote",
                "AddToLineItems",
                () => _repository.AddToLineItemsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromLineItems(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Quote",
                "RemoveFromLineItems",
                () => _repository.RemoveFromLineItemsAsync(request, cancellationToken));
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
