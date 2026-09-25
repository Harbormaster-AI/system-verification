
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace inventoryonaspdotnet.Persistence;

public class InventoryItemRepository : IInventoryItemRepository
{
    private readonly ApplicationDbContext _db;

    public InventoryItemRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<InventoryItem?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.InventoryItems
            .Include(x => x.Sku)
            .Include(x => x.Warehouse)
            .Include(x => x.Location)
            .Include(x => x.Lot)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<InventoryItem>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.InventoryItems
            .AsNoTracking()
            .Include(x => x.Sku)
            .Include(x => x.Warehouse)
            .Include(x => x.Location)
            .Include(x => x.Lot)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(InventoryItem inventoryItem, CancellationToken cancellationToken)
    {
        _db.InventoryItems.Add(inventoryItem);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(InventoryItem inventoryItem, CancellationToken cancellationToken)
    {
        _db.InventoryItems.Update(inventoryItem);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(InventoryItem inventoryItem, CancellationToken cancellationToken)
    {
        _db.InventoryItems.Remove(inventoryItem);
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


    public async Task AddToReservationsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Reservations
            .Where(reservation =>
                request.ChildIds.Contains(reservation.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    reservation =>
                        EF.Property<Guid?>(
                            reservation,
                            "OutboundAllocation_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromReservationsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Reservations
            .Where(reservation =>
                request.ChildIds.Contains(reservation.Id) &&
                EF.Property<Guid?>(
                    reservation,
                    "OutboundAllocation_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    reservation =>
                        EF.Property<Guid?>(
                            reservation,
                            "OutboundAllocation_Id"),
                    (Guid?)null));
    }

}
