
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace inventoryonaspdotnet.Persistence;

public class StorageLocationRepository : IStorageLocationRepository
{
    private readonly ApplicationDbContext _db;

    public StorageLocationRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<StorageLocation?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.StorageLocations
            .Include(x => x.Warehouse)
            .Include(x => x.ParentLocation)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<StorageLocation>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.StorageLocations
            .AsNoTracking()
            .Include(x => x.Warehouse)
            .Include(x => x.ParentLocation)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(StorageLocation storageLocation, CancellationToken cancellationToken)
    {
        _db.StorageLocations.Add(storageLocation);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(StorageLocation storageLocation, CancellationToken cancellationToken)
    {
        _db.StorageLocations.Update(storageLocation);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(StorageLocation storageLocation, CancellationToken cancellationToken)
    {
        _db.StorageLocations.Remove(storageLocation);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToChildLocationsAsync(
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

    public async Task RemoveFromChildLocationsAsync(
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

}
