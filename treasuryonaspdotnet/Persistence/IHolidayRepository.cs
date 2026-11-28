using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface IHolidayRepository
{
    Task<Holiday?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Holiday>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Holiday holiday, CancellationToken cancellationToken);
    Task UpdateAsync(Holiday holiday, CancellationToken cancellationToken);
    Task DeleteAsync(Holiday holiday, CancellationToken cancellationToken);


}
