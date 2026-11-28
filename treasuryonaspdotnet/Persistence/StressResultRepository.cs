
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class StressResultRepository : IStressResultRepository
{
    private readonly ApplicationDbContext _db;

    public StressResultRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<StressResult?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.StressResults
            .Include(x => x.StressScenario)
            .Include(x => x.Portfolio)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<StressResult>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.StressResults
            .AsNoTracking()
            .Include(x => x.StressScenario)
            .Include(x => x.Portfolio)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(StressResult stressResult, CancellationToken cancellationToken)
    {
        _db.StressResults.Add(stressResult);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(StressResult stressResult, CancellationToken cancellationToken)
    {
        _db.StressResults.Update(stressResult);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(StressResult stressResult, CancellationToken cancellationToken)
    {
        _db.StressResults.Remove(stressResult);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
