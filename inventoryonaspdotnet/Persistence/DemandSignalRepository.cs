
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace inventoryonaspdotnet.Persistence;

public class DemandSignalRepository : IDemandSignalRepository
{
    private readonly ApplicationDbContext _db;

    public DemandSignalRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<DemandSignal?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.DemandSignals
            .Include(x => x.Sku)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<DemandSignal>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.DemandSignals
            .AsNoTracking()
            .Include(x => x.Sku)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(DemandSignal demandSignal, CancellationToken cancellationToken)
    {
        _db.DemandSignals.Add(demandSignal);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(DemandSignal demandSignal, CancellationToken cancellationToken)
    {
        _db.DemandSignals.Update(demandSignal);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(DemandSignal demandSignal, CancellationToken cancellationToken)
    {
        _db.DemandSignals.Remove(demandSignal);
        await _db.SaveChangesAsync(cancellationToken);
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
