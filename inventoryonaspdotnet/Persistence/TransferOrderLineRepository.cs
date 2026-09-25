
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace inventoryonaspdotnet.Persistence;

public class TransferOrderLineRepository : ITransferOrderLineRepository
{
    private readonly ApplicationDbContext _db;

    public TransferOrderLineRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<TransferOrderLine?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.TransferOrderLines
            .Include(x => x.TransferOrder)
            .Include(x => x.Sku)
            .Include(x => x.Lot)
            .Include(x => x.FromLocation)
            .Include(x => x.ToLocation)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<TransferOrderLine>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.TransferOrderLines
            .AsNoTracking()
            .Include(x => x.TransferOrder)
            .Include(x => x.Sku)
            .Include(x => x.Lot)
            .Include(x => x.FromLocation)
            .Include(x => x.ToLocation)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(TransferOrderLine transferOrderLine, CancellationToken cancellationToken)
    {
        _db.TransferOrderLines.Add(transferOrderLine);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(TransferOrderLine transferOrderLine, CancellationToken cancellationToken)
    {
        _db.TransferOrderLines.Update(transferOrderLine);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(TransferOrderLine transferOrderLine, CancellationToken cancellationToken)
    {
        _db.TransferOrderLines.Remove(transferOrderLine);
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
