
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class BusinessCalendarRepository : IBusinessCalendarRepository
{
    private readonly ApplicationDbContext _db;

    public BusinessCalendarRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<BusinessCalendar?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.BusinessCalendars
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<BusinessCalendar>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.BusinessCalendars
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(BusinessCalendar businessCalendar, CancellationToken cancellationToken)
    {
        _db.BusinessCalendars.Add(businessCalendar);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(BusinessCalendar businessCalendar, CancellationToken cancellationToken)
    {
        _db.BusinessCalendars.Update(businessCalendar);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(BusinessCalendar businessCalendar, CancellationToken cancellationToken)
    {
        _db.BusinessCalendars.Remove(businessCalendar);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToHolidaysAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Holidays
            .Where(holiday =>
                request.ChildIds.Contains(holiday.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    holiday =>
                        EF.Property<Guid?>(
                            holiday,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromHolidaysAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Holidays
            .Where(holiday =>
                request.ChildIds.Contains(holiday.Id) &&
                EF.Property<Guid?>(
                    holiday,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    holiday =>
                        EF.Property<Guid?>(
                            holiday,
                            "Holiday_Id"),
                    (Guid?)null));
    }

}
