
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Persistence;
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Telemetry;

namespace treasuryonaspdotnet.Service;

public interface IMarginCallService
{

    Task Create(MarginCall model, CancellationToken cancellationToken);
    Task<bool> Update(MarginCall model, CancellationToken cancellationToken);
    Task<MarginCall?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<MarginCall>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignCollateralAgreement(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignCollateralAgreement(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignCollateralAccount(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignCollateralAccount(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignCounterparty(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignCounterparty(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToCashFlows(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromCashFlows(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class MarginCallService : IMarginCallService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IMarginCallRepository _repository;
    private readonly ILogger<MarginCallService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public MarginCallService(
        ApplicationTelemetry telemetry,
        IMarginCallRepository repository,
        ILogger<MarginCallService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(MarginCall model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "MarginCall",
                "CreateMarginCall",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(MarginCall model, CancellationToken cancellationToken)
    {
        try
        {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.CallDate = model.CallDate;
            existing.RequiredAmount = model.RequiredAmount;
            existing.Direction = model.Direction;
            existing.Status = model.Status;

            await _telemetry.Execute(
                "MarginCall",
                "UpdateMarginCall",
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

    public Task<MarginCall?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<MarginCall>> GetAll(CancellationToken cancellationToken)
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
                "MarginCall",
                "UpdateMarginCall",
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

    public async Task<bool> AssignCollateralAgreement(AssociationRequest request, CancellationToken cancellationToken)
    {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No MarginCall found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<CollateralAgreementService>().Get(childRequest, cancellationToken);
            parent.CollateralAgreement = child;
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

    public async Task<bool> UnassignCollateralAgreement(AssociationRequest request, CancellationToken cancellationToken)
    {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No MarginCall found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.CollateralAgreement = null;
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

    public async Task<bool> AssignCollateralAccount(AssociationRequest request, CancellationToken cancellationToken)
    {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No MarginCall found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<CollateralAccountService>().Get(childRequest, cancellationToken);
            parent.CollateralAccount = child;
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

    public async Task<bool> UnassignCollateralAccount(AssociationRequest request, CancellationToken cancellationToken)
    {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No MarginCall found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.CollateralAccount = null;
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

    public async Task<bool> AssignCounterparty(AssociationRequest request, CancellationToken cancellationToken)
    {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No MarginCall found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<CounterpartyService>().Get(childRequest, cancellationToken);
            parent.Counterparty = child;
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

    public async Task<bool> UnassignCounterparty(AssociationRequest request, CancellationToken cancellationToken)
    {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No MarginCall found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Counterparty = null;
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


    public async Task<bool> AddToCashFlows(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "MarginCall",
                "AddToCashFlows",
                () => _repository.AddToCashFlowsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromCashFlows(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "MarginCall",
                "RemoveFromCashFlows",
                () => _repository.RemoveFromCashFlowsAsync(request, cancellationToken));
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
