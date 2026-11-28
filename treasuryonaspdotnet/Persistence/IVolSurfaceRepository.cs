using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface IVolSurfaceRepository
{
    Task<VolSurface?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<VolSurface>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(VolSurface volSurface, CancellationToken cancellationToken);
    Task UpdateAsync(VolSurface volSurface, CancellationToken cancellationToken);
    Task DeleteAsync(VolSurface volSurface, CancellationToken cancellationToken);


}
