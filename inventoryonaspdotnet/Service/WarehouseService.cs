
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Persistence;
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Telemetry;

namespace inventoryonaspdotnet.Service;

public interface IWarehouseService
{

    Task Create(Warehouse model, CancellationToken cancellationToken);
    Task<bool> Update(Warehouse model, CancellationToken cancellationToken);
    Task<Warehouse?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<Warehouse>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------

    Task<bool> AddToStorageLocations(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromStorageLocations(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToInventoryItems(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromInventoryItems(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToInboundShipments(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromInboundShipments(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToOutboundAllocations(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromOutboundAllocations(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToOriginTransfers(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromOriginTransfers(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToDestinationTransfers(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromDestinationTransfers(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToCycleCounts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromCycleCounts(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class WarehouseService : IWarehouseService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IWarehouseRepository _repository;
    private readonly ILogger<WarehouseService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public WarehouseService(
        ApplicationTelemetry telemetry,
        IWarehouseRepository repository,
        ILogger<WarehouseService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(Warehouse model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Warehouse",
                "CreateWarehouse",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(Warehouse model, CancellationToken cancellationToken)
    {
        try
        {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.Name = model.Name;
            existing.Code = model.Code;
            existing.Address = model.Address;
            existing.TimeZone = model.TimeZone;
            existing.AllowsOverAllocation = model.AllowsOverAllocation;

            await _telemetry.Execute(
                "Warehouse",
                "UpdateWarehouse",
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

    public Task<Warehouse?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<Warehouse>> GetAll(CancellationToken cancellationToken)
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
                "Warehouse",
                "UpdateWarehouse",
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


    public async Task<bool> AddToStorageLocations(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Warehouse",
                "AddToStorageLocations",
                () => _repository.AddToStorageLocationsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromStorageLocations(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Warehouse",
                "RemoveFromStorageLocations",
                () => _repository.RemoveFromStorageLocationsAsync(request, cancellationToken));
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

    public async Task<bool> AddToInventoryItems(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Warehouse",
                "AddToInventoryItems",
                () => _repository.AddToInventoryItemsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromInventoryItems(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Warehouse",
                "RemoveFromInventoryItems",
                () => _repository.RemoveFromInventoryItemsAsync(request, cancellationToken));
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

    public async Task<bool> AddToInboundShipments(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Warehouse",
                "AddToInboundShipments",
                () => _repository.AddToInboundShipmentsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromInboundShipments(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Warehouse",
                "RemoveFromInboundShipments",
                () => _repository.RemoveFromInboundShipmentsAsync(request, cancellationToken));
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

    public async Task<bool> AddToOutboundAllocations(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Warehouse",
                "AddToOutboundAllocations",
                () => _repository.AddToOutboundAllocationsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromOutboundAllocations(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Warehouse",
                "RemoveFromOutboundAllocations",
                () => _repository.RemoveFromOutboundAllocationsAsync(request, cancellationToken));
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

    public async Task<bool> AddToOriginTransfers(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Warehouse",
                "AddToOriginTransfers",
                () => _repository.AddToOriginTransfersAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromOriginTransfers(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Warehouse",
                "RemoveFromOriginTransfers",
                () => _repository.RemoveFromOriginTransfersAsync(request, cancellationToken));
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

    public async Task<bool> AddToDestinationTransfers(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Warehouse",
                "AddToDestinationTransfers",
                () => _repository.AddToDestinationTransfersAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromDestinationTransfers(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Warehouse",
                "RemoveFromDestinationTransfers",
                () => _repository.RemoveFromDestinationTransfersAsync(request, cancellationToken));
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

    public async Task<bool> AddToCycleCounts(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Warehouse",
                "AddToCycleCounts",
                () => _repository.AddToCycleCountsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromCycleCounts(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Warehouse",
                "RemoveFromCycleCounts",
                () => _repository.RemoveFromCycleCountsAsync(request, cancellationToken));
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
