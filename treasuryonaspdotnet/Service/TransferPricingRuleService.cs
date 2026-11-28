
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Persistence;
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Telemetry;

namespace treasuryonaspdotnet.Service;

public interface ITransferPricingRuleService
{

    Task Create(TransferPricingRule model, CancellationToken cancellationToken);
    Task<bool> Update(TransferPricingRule model, CancellationToken cancellationToken);
    Task<TransferPricingRule?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<TransferPricingRule>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignTreasuryUnit(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignTreasuryUnit(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToAppliedDeals(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromAppliedDeals(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class TransferPricingRuleService : ITransferPricingRuleService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly ITransferPricingRuleRepository _repository;
    private readonly ILogger<TransferPricingRuleService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public TransferPricingRuleService(
        ApplicationTelemetry telemetry,
        ITransferPricingRuleRepository repository,
        ILogger<TransferPricingRuleService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(TransferPricingRule model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "TransferPricingRule",
                "CreateTransferPricingRule",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(TransferPricingRule model, CancellationToken cancellationToken)
    {
        try
        {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.Name = model.Name;
            existing.Spread = model.Spread;
            existing.EffectiveFrom = model.EffectiveFrom;
            existing.Method = model.Method;
            existing.CurveType = model.CurveType;

            await _telemetry.Execute(
                "TransferPricingRule",
                "UpdateTransferPricingRule",
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

    public Task<TransferPricingRule?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<TransferPricingRule>> GetAll(CancellationToken cancellationToken)
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
                "TransferPricingRule",
                "UpdateTransferPricingRule",
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

    public async Task<bool> AssignTreasuryUnit(AssociationRequest request, CancellationToken cancellationToken)
    {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No TransferPricingRule found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<TreasuryUnitService>().Get(childRequest, cancellationToken);
            parent.TreasuryUnit = child;
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

    public async Task<bool> UnassignTreasuryUnit(AssociationRequest request, CancellationToken cancellationToken)
    {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No TransferPricingRule found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.TreasuryUnit = null;
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


    public async Task<bool> AddToAppliedDeals(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "TransferPricingRule",
                "AddToAppliedDeals",
                () => _repository.AddToAppliedDealsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromAppliedDeals(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "TransferPricingRule",
                "RemoveFromAppliedDeals",
                () => _repository.RemoveFromAppliedDealsAsync(request, cancellationToken));
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
