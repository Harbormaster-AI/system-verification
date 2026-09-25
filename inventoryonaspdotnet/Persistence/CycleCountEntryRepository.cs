
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace inventoryonaspdotnet.Persistence;

public class CycleCountEntryRepository : ICycleCountEntryRepository
{
    private readonly ApplicationDbContext _db;

    public CycleCountEntryRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<CycleCountEntry?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.CycleCountEntrys
            .Include(x => x.CycleCount)
            .Include(x => x.Sku)
            .Include(x => x.Lot)
            .Include(x => x.Location)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<CycleCountEntry>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.CycleCountEntrys
            .AsNoTracking()
            .Include(x => x.CycleCount)
            .Include(x => x.Sku)
            .Include(x => x.Lot)
            .Include(x => x.Location)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(CycleCountEntry cycleCountEntry, CancellationToken cancellationToken)
    {
        _db.CycleCountEntrys.Add(cycleCountEntry);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(CycleCountEntry cycleCountEntry, CancellationToken cancellationToken)
    {
        _db.CycleCountEntrys.Update(cycleCountEntry);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(CycleCountEntry cycleCountEntry, CancellationToken cancellationToken)
    {
        _db.CycleCountEntrys.Remove(cycleCountEntry);
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
