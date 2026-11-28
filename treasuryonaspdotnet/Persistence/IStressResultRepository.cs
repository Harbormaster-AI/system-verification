using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface IStressResultRepository
{
    Task<StressResult?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<StressResult>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(StressResult stressResult, CancellationToken cancellationToken);
    Task UpdateAsync(StressResult stressResult, CancellationToken cancellationToken);
    Task DeleteAsync(StressResult stressResult, CancellationToken cancellationToken);


}
