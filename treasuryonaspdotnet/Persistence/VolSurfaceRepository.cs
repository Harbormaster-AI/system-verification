
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class VolSurfaceRepository : IVolSurfaceRepository
{
    private readonly ApplicationDbContext _db;

    public VolSurfaceRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<VolSurface?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.VolSurfaces
            .Include(x => x.MarketDataSet)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<VolSurface>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.VolSurfaces
            .AsNoTracking()
            .Include(x => x.MarketDataSet)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(VolSurface volSurface, CancellationToken cancellationToken)
    {
        _db.VolSurfaces.Add(volSurface);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(VolSurface volSurface, CancellationToken cancellationToken)
    {
        _db.VolSurfaces.Update(volSurface);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(VolSurface volSurface, CancellationToken cancellationToken)
    {
        _db.VolSurfaces.Remove(volSurface);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
