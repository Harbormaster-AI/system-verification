
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace inventoryonaspdotnet.Persistence;

public class CycleCountRepository : ICycleCountRepository
{
    private readonly ApplicationDbContext _db;

    public CycleCountRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<CycleCount?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.CycleCounts
            .Include(x => x.Warehouse)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<CycleCount>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.CycleCounts
            .AsNoTracking()
            .Include(x => x.Warehouse)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(CycleCount cycleCount, CancellationToken cancellationToken)
    {
        _db.CycleCounts.Add(cycleCount);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(CycleCount cycleCount, CancellationToken cancellationToken)
    {
        _db.CycleCounts.Update(cycleCount);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(CycleCount cycleCount, CancellationToken cancellationToken)
    {
        _db.CycleCounts.Remove(cycleCount);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToLocationsAsync(
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

    public async Task RemoveFromLocationsAsync(
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


    public async Task AddToEntriesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.CycleCountEntrys
            .Where(cycleCountEntry =>
                request.ChildIds.Contains(cycleCountEntry.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    cycleCountEntry =>
                        EF.Property<Guid?>(
                            cycleCountEntry,
                            "OutboundAllocation_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromEntriesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.CycleCountEntrys
            .Where(cycleCountEntry =>
                request.ChildIds.Contains(cycleCountEntry.Id) &&
                EF.Property<Guid?>(
                    cycleCountEntry,
                    "OutboundAllocation_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    cycleCountEntry =>
                        EF.Property<Guid?>(
                            cycleCountEntry,
                            "OutboundAllocation_Id"),
                    (Guid?)null));
    }


    public async Task AddToTransactionsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.InventoryTransactions
            .Where(inventoryTransaction =>
                request.ChildIds.Contains(inventoryTransaction.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    inventoryTransaction =>
                        EF.Property<Guid?>(
                            inventoryTransaction,
                            "OutboundAllocation_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromTransactionsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.InventoryTransactions
            .Where(inventoryTransaction =>
                request.ChildIds.Contains(inventoryTransaction.Id) &&
                EF.Property<Guid?>(
                    inventoryTransaction,
                    "OutboundAllocation_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    inventoryTransaction =>
                        EF.Property<Guid?>(
                            inventoryTransaction,
                            "OutboundAllocation_Id"),
                    (Guid?)null));
    }

}
