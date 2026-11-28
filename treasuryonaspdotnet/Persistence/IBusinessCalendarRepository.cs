using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface IBusinessCalendarRepository
{
    Task<BusinessCalendar?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<BusinessCalendar>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(BusinessCalendar businessCalendar, CancellationToken cancellationToken);
    Task UpdateAsync(BusinessCalendar businessCalendar, CancellationToken cancellationToken);
    Task DeleteAsync(BusinessCalendar businessCalendar, CancellationToken cancellationToken);

    Task AddToHolidaysAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromHolidaysAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
