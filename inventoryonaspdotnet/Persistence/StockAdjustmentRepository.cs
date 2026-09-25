
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace inventoryonaspdotnet.Persistence;

public class StockAdjustmentRepository : IStockAdjustmentRepository
{
    private readonly ApplicationDbContext _db;

    public StockAdjustmentRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<StockAdjustment?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.StockAdjustments
            .Include(x => x.Warehouse)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<StockAdjustment>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.StockAdjustments
            .AsNoTracking()
            .Include(x => x.Warehouse)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(StockAdjustment stockAdjustment, CancellationToken cancellationToken)
    {
        _db.StockAdjustments.Add(stockAdjustment);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(StockAdjustment stockAdjustment, CancellationToken cancellationToken)
    {
        _db.StockAdjustments.Update(stockAdjustment);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(StockAdjustment stockAdjustment, CancellationToken cancellationToken)
    {
        _db.StockAdjustments.Remove(stockAdjustment);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToLinesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.StockAdjustmentLines
            .Where(stockAdjustmentLine =>
                request.ChildIds.Contains(stockAdjustmentLine.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    stockAdjustmentLine =>
                        EF.Property<Guid?>(
                            stockAdjustmentLine,
                            "OutboundAllocation_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromLinesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.StockAdjustmentLines
            .Where(stockAdjustmentLine =>
                request.ChildIds.Contains(stockAdjustmentLine.Id) &&
                EF.Property<Guid?>(
                    stockAdjustmentLine,
                    "OutboundAllocation_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    stockAdjustmentLine =>
                        EF.Property<Guid?>(
                            stockAdjustmentLine,
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
