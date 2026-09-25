
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Persistence;
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Telemetry;

namespace inventoryonaspdotnet.Service;

public interface IOutboundAllocationService {

    Task Create(OutboundAllocation model , CancellationToken cancellationToken);
    Task<bool> Update(OutboundAllocation model, CancellationToken cancellationToken);
    Task<OutboundAllocation?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<OutboundAllocation>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignWarehouse(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignWarehouse(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignSku(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignSku(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignInventoryItem(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignInventoryItem(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignReservation(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignReservation(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignLot(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignLot(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignSourceLocation(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignSourceLocation(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToSerialNumbers(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromSerialNumbers(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class OutboundAllocationService : IOutboundAllocationService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IOutboundAllocationRepository _repository;
    private readonly ILogger<OutboundAllocationService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public OutboundAllocationService(
        ApplicationTelemetry telemetry,
        IOutboundAllocationRepository repository,
        ILogger<OutboundAllocationService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(OutboundAllocation model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "OutboundAllocation",
                "CreateOutboundAllocation",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(OutboundAllocation model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.AllocationNumber = model.AllocationNumber;
            existing.AllocatedQuantity = model.AllocatedQuantity;
            existing.AllocationDate = model.AllocationDate;
            existing.Status = model.Status;

            await _telemetry.Execute(
                "OutboundAllocation",
                "UpdateOutboundAllocation",
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

    public Task<OutboundAllocation?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<OutboundAllocation>> GetAll(CancellationToken cancellationToken)
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
                "OutboundAllocation",
                "UpdateOutboundAllocation",
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
            _logger.LogError("No OutboundAllocation found using Id {ParentId}", request.ParentId);
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
            _logger.LogError("No OutboundAllocation found using Id {ParentId}", request.ParentId);
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

    public async Task<bool> AssignSku(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No OutboundAllocation found using Id {ParentId}", request.ParentId);
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
            _logger.LogError("No OutboundAllocation found using Id {ParentId}", request.ParentId);
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

    public async Task<bool> AssignInventoryItem(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No OutboundAllocation found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<InventoryItemService>().Get(childRequest, cancellationToken);
            parent.InventoryItem = child;
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

    public async Task<bool> UnassignInventoryItem(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No OutboundAllocation found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.InventoryItem = null;
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

    public async Task<bool> AssignReservation(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No OutboundAllocation found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<ReservationService>().Get(childRequest, cancellationToken);
            parent.Reservation = child;
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

    public async Task<bool> UnassignReservation(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No OutboundAllocation found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Reservation = null;
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
            _logger.LogError("No OutboundAllocation found using Id {ParentId}", request.ParentId);
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
            _logger.LogError("No OutboundAllocation found using Id {ParentId}", request.ParentId);
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

    public async Task<bool> AssignSourceLocation(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No OutboundAllocation found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<StorageLocationService>().Get(childRequest, cancellationToken);
            parent.SourceLocation = child;
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

    public async Task<bool> UnassignSourceLocation(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No OutboundAllocation found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.SourceLocation = null;
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


    public async Task<bool> AddToSerialNumbers(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "OutboundAllocation",
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
                "OutboundAllocation",
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
