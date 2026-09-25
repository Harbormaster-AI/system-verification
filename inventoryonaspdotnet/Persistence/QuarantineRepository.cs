
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace inventoryonaspdotnet.Persistence;

public class QuarantineRepository : IQuarantineRepository
{
    private readonly ApplicationDbContext _db;

    public QuarantineRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Quarantine?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Quarantines
            .Include(x => x.Warehouse)
            .Include(x => x.Lot)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Quarantine>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Quarantines
            .AsNoTracking()
            .Include(x => x.Warehouse)
            .Include(x => x.Lot)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Quarantine quarantine, CancellationToken cancellationToken)
    {
        _db.Quarantines.Add(quarantine);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Quarantine quarantine, CancellationToken cancellationToken)
    {
        _db.Quarantines.Update(quarantine);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Quarantine quarantine, CancellationToken cancellationToken)
    {
        _db.Quarantines.Remove(quarantine);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToItemsAsync(
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

    public async Task RemoveFromItemsAsync(
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


    public async Task AddToSerialNumbersAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.SerialNumbers
            .Where(serialNumber =>
                request.ChildIds.Contains(serialNumber.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    serialNumber =>
                        EF.Property<Guid?>(
                            serialNumber,
                            "OutboundAllocation_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromSerialNumbersAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.SerialNumbers
            .Where(serialNumber =>
                request.ChildIds.Contains(serialNumber.Id) &&
                EF.Property<Guid?>(
                    serialNumber,
                    "OutboundAllocation_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    serialNumber =>
                        EF.Property<Guid?>(
                            serialNumber,
                            "OutboundAllocation_Id"),
                    (Guid?)null));
    }

}
