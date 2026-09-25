
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace inventoryonaspdotnet.Persistence;

public class StockAdjustmentLineRepository : IStockAdjustmentLineRepository
{
    private readonly ApplicationDbContext _db;

    public StockAdjustmentLineRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<StockAdjustmentLine?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.StockAdjustmentLines
            .Include(x => x.Adjustment)
            .Include(x => x.Sku)
            .Include(x => x.Lot)
            .Include(x => x.Location)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<StockAdjustmentLine>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.StockAdjustmentLines
            .AsNoTracking()
            .Include(x => x.Adjustment)
            .Include(x => x.Sku)
            .Include(x => x.Lot)
            .Include(x => x.Location)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(StockAdjustmentLine stockAdjustmentLine, CancellationToken cancellationToken)
    {
        _db.StockAdjustmentLines.Add(stockAdjustmentLine);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(StockAdjustmentLine stockAdjustmentLine, CancellationToken cancellationToken)
    {
        _db.StockAdjustmentLines.Update(stockAdjustmentLine);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(StockAdjustmentLine stockAdjustmentLine, CancellationToken cancellationToken)
    {
        _db.StockAdjustmentLines.Remove(stockAdjustmentLine);
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
