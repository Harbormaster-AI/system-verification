
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class CurveQuoteRepository : ICurveQuoteRepository
{
    private readonly ApplicationDbContext _db;

    public CurveQuoteRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<CurveQuote?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.CurveQuotes
            .Include(x => x.YieldCurve)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<CurveQuote>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.CurveQuotes
            .AsNoTracking()
            .Include(x => x.YieldCurve)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(CurveQuote curveQuote, CancellationToken cancellationToken)
    {
        _db.CurveQuotes.Add(curveQuote);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(CurveQuote curveQuote, CancellationToken cancellationToken)
    {
        _db.CurveQuotes.Update(curveQuote);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(CurveQuote curveQuote, CancellationToken cancellationToken)
    {
        _db.CurveQuotes.Remove(curveQuote);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
