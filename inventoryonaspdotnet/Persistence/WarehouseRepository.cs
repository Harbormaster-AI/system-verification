
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace inventoryonaspdotnet.Persistence;

public class WarehouseRepository : IWarehouseRepository
{
    private readonly ApplicationDbContext _db;

    public WarehouseRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Warehouse?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Warehouses
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Warehouse>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Warehouses
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Warehouse warehouse, CancellationToken cancellationToken)
    {
        _db.Warehouses.Add(warehouse);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Warehouse warehouse, CancellationToken cancellationToken)
    {
        _db.Warehouses.Update(warehouse);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Warehouse warehouse, CancellationToken cancellationToken)
    {
        _db.Warehouses.Remove(warehouse);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToStorageLocationsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.StorageLocations
            .Where(storageLocation =>
                request.ChildIds.Contains(storageLocation.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    storageLocation =>
                        EF.Property<Guid?>(
                            storageLocation,
                            "OutboundAllocation_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromStorageLocationsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.StorageLocations
            .Where(storageLocation =>
                request.ChildIds.Contains(storageLocation.Id) &&
                EF.Property<Guid?>(
                    storageLocation,
                    "OutboundAllocation_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    storageLocation =>
                        EF.Property<Guid?>(
                            storageLocation,
                            "OutboundAllocation_Id"),
                    (Guid?)null));
    }


    public async Task AddToInventoryItemsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.InventoryItems
            .Where(inventoryItem =>
                request.ChildIds.Contains(inventoryItem.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    inventoryItem =>
                        EF.Property<Guid?>(
                            inventoryItem,
                            "OutboundAllocation_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromInventoryItemsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.InventoryItems
            .Where(inventoryItem =>
                request.ChildIds.Contains(inventoryItem.Id) &&
                EF.Property<Guid?>(
                    inventoryItem,
                    "OutboundAllocation_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    inventoryItem =>
                        EF.Property<Guid?>(
                            inventoryItem,
                            "OutboundAllocation_Id"),
                    (Guid?)null));
    }


    public async Task AddToInboundShipmentsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.InboundShipments
            .Where(inboundShipment =>
                request.ChildIds.Contains(inboundShipment.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    inboundShipment =>
                        EF.Property<Guid?>(
                            inboundShipment,
                            "OutboundAllocation_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromInboundShipmentsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.InboundShipments
            .Where(inboundShipment =>
                request.ChildIds.Contains(inboundShipment.Id) &&
                EF.Property<Guid?>(
                    inboundShipment,
                    "OutboundAllocation_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    inboundShipment =>
                        EF.Property<Guid?>(
                            inboundShipment,
                            "OutboundAllocation_Id"),
                    (Guid?)null));
    }


    public async Task AddToOutboundAllocationsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.OutboundAllocations
            .Where(outboundAllocation =>
                request.ChildIds.Contains(outboundAllocation.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    outboundAllocation =>
                        EF.Property<Guid?>(
                            outboundAllocation,
                            "OutboundAllocation_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromOutboundAllocationsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.OutboundAllocations
            .Where(outboundAllocation =>
                request.ChildIds.Contains(outboundAllocation.Id) &&
                EF.Property<Guid?>(
                    outboundAllocation,
                    "OutboundAllocation_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    outboundAllocation =>
                        EF.Property<Guid?>(
                            outboundAllocation,
                            "OutboundAllocation_Id"),
                    (Guid?)null));
    }


    public async Task AddToOriginTransfersAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.TransferOrders
            .Where(transferOrder =>
                request.ChildIds.Contains(transferOrder.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    transferOrder =>
                        EF.Property<Guid?>(
                            transferOrder,
                            "OutboundAllocation_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromOriginTransfersAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.TransferOrders
            .Where(transferOrder =>
                request.ChildIds.Contains(transferOrder.Id) &&
                EF.Property<Guid?>(
                    transferOrder,
                    "OutboundAllocation_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    transferOrder =>
                        EF.Property<Guid?>(
                            transferOrder,
                            "OutboundAllocation_Id"),
                    (Guid?)null));
    }


    public async Task AddToDestinationTransfersAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.TransferOrders
            .Where(transferOrder =>
                request.ChildIds.Contains(transferOrder.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    transferOrder =>
                        EF.Property<Guid?>(
                            transferOrder,
                            "OutboundAllocation_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromDestinationTransfersAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.TransferOrders
            .Where(transferOrder =>
                request.ChildIds.Contains(transferOrder.Id) &&
                EF.Property<Guid?>(
                    transferOrder,
                    "OutboundAllocation_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    transferOrder =>
                        EF.Property<Guid?>(
                            transferOrder,
                            "OutboundAllocation_Id"),
                    (Guid?)null));
    }


    public async Task AddToCycleCountsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.CycleCounts
            .Where(cycleCount =>
                request.ChildIds.Contains(cycleCount.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    cycleCount =>
                        EF.Property<Guid?>(
                            cycleCount,
                            "OutboundAllocation_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromCycleCountsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.CycleCounts
            .Where(cycleCount =>
                request.ChildIds.Contains(cycleCount.Id) &&
                EF.Property<Guid?>(
                    cycleCount,
                    "OutboundAllocation_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    cycleCount =>
                        EF.Property<Guid?>(
                            cycleCount,
                            "OutboundAllocation_Id"),
                    (Guid?)null));
    }

}
