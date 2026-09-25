
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace inventoryonaspdotnet.Persistence;

public class InventoryTransactionRepository : IInventoryTransactionRepository
{
    private readonly ApplicationDbContext _db;

    public InventoryTransactionRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<InventoryTransaction?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.InventoryTransactions
            .Include(x => x.Sku)
            .Include(x => x.Warehouse)
            .Include(x => x.Location)
            .Include(x => x.Lot)
            .Include(x => x.RelatedReservation)
            .Include(x => x.TransferOrder)
            .Include(x => x.Adjustment)
            .Include(x => x.CycleCount)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<InventoryTransaction>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.InventoryTransactions
            .AsNoTracking()
            .Include(x => x.Sku)
            .Include(x => x.Warehouse)
            .Include(x => x.Location)
            .Include(x => x.Lot)
            .Include(x => x.RelatedReservation)
            .Include(x => x.TransferOrder)
            .Include(x => x.Adjustment)
            .Include(x => x.CycleCount)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(InventoryTransaction inventoryTransaction, CancellationToken cancellationToken)
    {
        _db.InventoryTransactions.Add(inventoryTransaction);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(InventoryTransaction inventoryTransaction, CancellationToken cancellationToken)
    {
        _db.InventoryTransactions.Update(inventoryTransaction);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(InventoryTransaction inventoryTransaction, CancellationToken cancellationToken)
    {
        _db.InventoryTransactions.Remove(inventoryTransaction);
        await _db.SaveChangesAsync(cancellationToken);
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
