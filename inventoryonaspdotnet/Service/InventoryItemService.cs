
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Persistence;
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Telemetry;

namespace inventoryonaspdotnet.Service;

public interface IInventoryItemService {

    Task Create(InventoryItem model , CancellationToken cancellationToken);
    Task<bool> Update(InventoryItem model, CancellationToken cancellationToken);
    Task<InventoryItem?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<InventoryItem>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignSku(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignSku(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignWarehouse(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignWarehouse(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignLocation(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignLocation(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignLot(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignLot(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToSerialNumbers(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromSerialNumbers(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToTransactions(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromTransactions(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToReservations(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromReservations(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class InventoryItemService : IInventoryItemService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IInventoryItemRepository _repository;
    private readonly ILogger<InventoryItemService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public InventoryItemService(
        ApplicationTelemetry telemetry,
        IInventoryItemRepository repository,
        ILogger<InventoryItemService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(InventoryItem model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "InventoryItem",
                "CreateInventoryItem",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(InventoryItem model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.QuantityOnHand = model.QuantityOnHand;
            existing.QuantityAvailable = model.QuantityAvailable;
            existing.QuantityReserved = model.QuantityReserved;
            existing.UnitCost = model.UnitCost;
            existing.LastUpdated = model.LastUpdated;
            existing.StockStatus = model.StockStatus;

            await _telemetry.Execute(
                "InventoryItem",
                "UpdateInventoryItem",
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

    public Task<InventoryItem?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<InventoryItem>> GetAll(CancellationToken cancellationToken)
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
                "InventoryItem",
                "UpdateInventoryItem",
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
            _logger.LogError("No InventoryItem found using Id {ParentId}", request.ParentId);
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
            _logger.LogError("No InventoryItem found using Id {ParentId}", request.ParentId);
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
            _logger.LogError("No InventoryItem found using Id {ParentId}", request.ParentId);
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
            _logger.LogError("No InventoryItem found using Id {ParentId}", request.ParentId);
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

    public async Task<bool> AssignLocation(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No InventoryItem found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<StorageLocationService>().Get(childRequest, cancellationToken);
            parent.Location = child;
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

    public async Task<bool> UnassignLocation(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No InventoryItem found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Location = null;
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
            _logger.LogError("No InventoryItem found using Id {ParentId}", request.ParentId);
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
            _logger.LogError("No InventoryItem found using Id {ParentId}", request.ParentId);
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


    public async Task<bool> AddToSerialNumbers(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "InventoryItem",
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
                "InventoryItem",
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

    public async Task<bool> AddToTransactions(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "InventoryItem",
                "AddToTransactions",
                () => _repository.AddToTransactionsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromTransactions(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "InventoryItem",
                "RemoveFromTransactions",
                () => _repository.RemoveFromTransactionsAsync(request, cancellationToken));
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

    public async Task<bool> AddToReservations(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "InventoryItem",
                "AddToReservations",
                () => _repository.AddToReservationsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromReservations(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "InventoryItem",
                "RemoveFromReservations",
                () => _repository.RemoveFromReservationsAsync(request, cancellationToken));
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
