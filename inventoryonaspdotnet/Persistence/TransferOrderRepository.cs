
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace inventoryonaspdotnet.Persistence;

public class TransferOrderRepository : ITransferOrderRepository
{
    private readonly ApplicationDbContext _db;

    public TransferOrderRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<TransferOrder?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.TransferOrders
            .Include(x => x.OriginWarehouse)
            .Include(x => x.DestinationWarehouse)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<TransferOrder>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.TransferOrders
            .AsNoTracking()
            .Include(x => x.OriginWarehouse)
            .Include(x => x.DestinationWarehouse)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(TransferOrder transferOrder, CancellationToken cancellationToken)
    {
        _db.TransferOrders.Add(transferOrder);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(TransferOrder transferOrder, CancellationToken cancellationToken)
    {
        _db.TransferOrders.Update(transferOrder);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(TransferOrder transferOrder, CancellationToken cancellationToken)
    {
        _db.TransferOrders.Remove(transferOrder);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToLinesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.TransferOrderLines
            .Where(transferOrderLine =>
                request.ChildIds.Contains(transferOrderLine.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    transferOrderLine =>
                        EF.Property<Guid?>(
                            transferOrderLine,
                            "OutboundAllocation_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromLinesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.TransferOrderLines
            .Where(transferOrderLine =>
                request.ChildIds.Contains(transferOrderLine.Id) &&
                EF.Property<Guid?>(
                    transferOrderLine,
                    "OutboundAllocation_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    transferOrderLine =>
                        EF.Property<Guid?>(
                            transferOrderLine,
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
