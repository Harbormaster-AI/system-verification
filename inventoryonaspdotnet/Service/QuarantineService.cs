
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Persistence;
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Telemetry;

namespace inventoryonaspdotnet.Service;

public interface IQuarantineService {

    Task Create(Quarantine model , CancellationToken cancellationToken);
    Task<bool> Update(Quarantine model, CancellationToken cancellationToken);
    Task<Quarantine?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<Quarantine>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignWarehouse(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignWarehouse(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignLot(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignLot(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToItems(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromItems(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToSerialNumbers(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromSerialNumbers(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class QuarantineService : IQuarantineService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IQuarantineRepository _repository;
    private readonly ILogger<QuarantineService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public QuarantineService(
        ApplicationTelemetry telemetry,
        IQuarantineRepository repository,
        ILogger<QuarantineService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(Quarantine model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Quarantine",
                "CreateQuarantine",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(Quarantine model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.Reason = model.Reason;
            existing.StartedAt = model.StartedAt;
            existing.ReleasedAt = model.ReleasedAt;
            existing.Disposition = model.Disposition;

            await _telemetry.Execute(
                "Quarantine",
                "UpdateQuarantine",
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

    public Task<Quarantine?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<Quarantine>> GetAll(CancellationToken cancellationToken)
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
                "Quarantine",
                "UpdateQuarantine",
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

    public async Task<bool> AssignWarehouse(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No Quarantine found using Id {ParentId}", request.ParentId);
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
            _logger.LogError("No Quarantine found using Id {ParentId}", request.ParentId);
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

    public async Task<bool> AssignLot(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No Quarantine found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<LotService>().Get(childRequest, cancellationToken);
            parent.Lot = child;
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

    public async Task<bool> UnassignLot(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No Quarantine found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Lot = null;
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


    public async Task<bool> AddToItems(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "Quarantine",
                "AddToItems",
                () => _repository.AddToItemsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromItems(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "Quarantine",
                "RemoveFromItems",
                () => _repository.RemoveFromItemsAsync(request, cancellationToken));
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

    public async Task<bool> AddToSerialNumbers(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "Quarantine",
                "AddToSerialNumbers",
                () => _repository.AddToSerialNumbersAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromSerialNumbers(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "Quarantine",
                "RemoveFromSerialNumbers",
                () => _repository.RemoveFromSerialNumbersAsync(request, cancellationToken));
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
