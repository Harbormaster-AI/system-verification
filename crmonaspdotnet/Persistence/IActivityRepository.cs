using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Persistence;

public interface IActivityRepository
{
    Task<Activity?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Activity>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Activity activity, CancellationToken cancellationToken);
    Task UpdateAsync(Activity activity, CancellationToken cancellationToken);
    Task DeleteAsync(Activity activity, CancellationToken cancellationToken);


}
