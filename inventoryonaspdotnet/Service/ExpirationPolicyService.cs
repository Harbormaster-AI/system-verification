
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Persistence;
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Telemetry;

namespace inventoryonaspdotnet.Service;

public interface IExpirationPolicyService {

    Task Create(ExpirationPolicy model , CancellationToken cancellationToken);
    Task<bool> Update(ExpirationPolicy model, CancellationToken cancellationToken);
    Task<ExpirationPolicy?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<ExpirationPolicy>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignSku(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignSku(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignWarehouse(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignWarehouse(AssociationRequest request, CancellationToken cancellationToken);


}

public class ExpirationPolicyService : IExpirationPolicyService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IExpirationPolicyRepository _repository;
    private readonly ILogger<ExpirationPolicyService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public ExpirationPolicyService(
        ApplicationTelemetry telemetry,
        IExpirationPolicyRepository repository,
        ILogger<ExpirationPolicyService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(ExpirationPolicy model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "ExpirationPolicy",
                "CreateExpirationPolicy",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(ExpirationPolicy model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.RejectIfDaysToExpireLessThan = model.RejectIfDaysToExpireLessThan;
            existing.AutoQuarantineDaysToExpire = model.AutoQuarantineDaysToExpire;
            existing.RotationMethod = model.RotationMethod;

            await _telemetry.Execute(
                "ExpirationPolicy",
                "UpdateExpirationPolicy",
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

    public Task<ExpirationPolicy?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<ExpirationPolicy>> GetAll(CancellationToken cancellationToken)
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
                "ExpirationPolicy",
                "UpdateExpirationPolicy",
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

    public async Task<bool> AssignSku(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No ExpirationPolicy found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<StockKeepingUnitService>().Get(childRequest, cancellationToken);
            parent.Sku = child;
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

    public async Task<bool> UnassignSku(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No ExpirationPolicy found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Sku = null;
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

    public async Task<bool> AssignWarehouse(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No ExpirationPolicy found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<WarehouseService>().Get(childRequest, cancellationToken);
            parent.Warehouse = child;
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

    public async Task<bool> UnassignWarehouse(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No ExpirationPolicy found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Warehouse = null;
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
