
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace inventoryonaspdotnet.Persistence;

public class OutboundAllocationRepository : IOutboundAllocationRepository
{
    private readonly ApplicationDbContext _db;

    public OutboundAllocationRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<OutboundAllocation?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.OutboundAllocations
            .Include(x => x.Warehouse)
            .Include(x => x.Sku)
            .Include(x => x.InventoryItem)
            .Include(x => x.Reservation)
            .Include(x => x.Lot)
            .Include(x => x.SourceLocation)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<OutboundAllocation>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.OutboundAllocations
            .AsNoTracking()
            .Include(x => x.Warehouse)
            .Include(x => x.Sku)
            .Include(x => x.InventoryItem)
            .Include(x => x.Reservation)
            .Include(x => x.Lot)
            .Include(x => x.SourceLocation)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(OutboundAllocation outboundAllocation, CancellationToken cancellationToken)
    {
        _db.OutboundAllocations.Add(outboundAllocation);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(OutboundAllocation outboundAllocation, CancellationToken cancellationToken)
    {
        _db.OutboundAllocations.Update(outboundAllocation);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(OutboundAllocation outboundAllocation, CancellationToken cancellationToken)
    {
        _db.OutboundAllocations.Remove(outboundAllocation);
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
