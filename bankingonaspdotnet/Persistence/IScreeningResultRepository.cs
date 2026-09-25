using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Persistence;

public interface IScreeningResultRepository
{
    Task<ScreeningResult?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<ScreeningResult>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(ScreeningResult screeningResult, CancellationToken cancellationToken);
    Task UpdateAsync(ScreeningResult screeningResult, CancellationToken cancellationToken);
    Task DeleteAsync(ScreeningResult screeningResult, CancellationToken cancellationToken);


}
