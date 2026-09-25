
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace inventoryonaspdotnet.Persistence;

public class InboundShipmentLineRepository : IInboundShipmentLineRepository
{
    private readonly ApplicationDbContext _db;

    public InboundShipmentLineRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<InboundShipmentLine?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.InboundShipmentLines
            .Include(x => x.InboundShipment)
            .Include(x => x.Sku)
            .Include(x => x.Lot)
            .Include(x => x.DestinationLocation)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<InboundShipmentLine>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.InboundShipmentLines
            .AsNoTracking()
            .Include(x => x.InboundShipment)
            .Include(x => x.Sku)
            .Include(x => x.Lot)
            .Include(x => x.DestinationLocation)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(InboundShipmentLine inboundShipmentLine, CancellationToken cancellationToken)
    {
        _db.InboundShipmentLines.Add(inboundShipmentLine);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(InboundShipmentLine inboundShipmentLine, CancellationToken cancellationToken)
    {
        _db.InboundShipmentLines.Update(inboundShipmentLine);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(InboundShipmentLine inboundShipmentLine, CancellationToken cancellationToken)
    {
        _db.InboundShipmentLines.Remove(inboundShipmentLine);
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
