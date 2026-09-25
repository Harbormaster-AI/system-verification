
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace inventoryonaspdotnet.Persistence;

public class ReservationRepository : IReservationRepository
{
    private readonly ApplicationDbContext _db;

    public ReservationRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Reservation?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Reservations
            .Include(x => x.Sku)
            .Include(x => x.Warehouse)
            .Include(x => x.Location)
            .Include(x => x.InventoryItem)
            .Include(x => x.Lot)
            .Include(x => x.DemandSignal)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Reservation>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Reservations
            .AsNoTracking()
            .Include(x => x.Sku)
            .Include(x => x.Warehouse)
            .Include(x => x.Location)
            .Include(x => x.InventoryItem)
            .Include(x => x.Lot)
            .Include(x => x.DemandSignal)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Reservation reservation, CancellationToken cancellationToken)
    {
        _db.Reservations.Add(reservation);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Reservation reservation, CancellationToken cancellationToken)
    {
        _db.Reservations.Update(reservation);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Reservation reservation, CancellationToken cancellationToken)
    {
        _db.Reservations.Remove(reservation);
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
