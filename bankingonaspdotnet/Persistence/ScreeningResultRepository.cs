
using bankingonaspdotnet.Domain;
using Microsoft.EntityFrameworkCore;

namespace bankingonaspdotnet.Persistence;

public class ScreeningResultRepository : IScreeningResultRepository
{
    private readonly ApplicationDbContext _db;

    public ScreeningResultRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<ScreeningResult?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.ScreeningResults
            .Include(x => x.KycProfile)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<ScreeningResult>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.ScreeningResults
            .AsNoTracking()
            .Include(x => x.KycProfile)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(ScreeningResult screeningResult, CancellationToken cancellationToken)
    {
        _db.ScreeningResults.Add(screeningResult);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(ScreeningResult screeningResult, CancellationToken cancellationToken)
    {
        _db.ScreeningResults.Update(screeningResult);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(ScreeningResult screeningResult, CancellationToken cancellationToken)
    {
        _db.ScreeningResults.Remove(screeningResult);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
