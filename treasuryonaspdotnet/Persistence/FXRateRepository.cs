
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class FXRateRepository : IFXRateRepository
{
    private readonly ApplicationDbContext _db;

    public FXRateRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<FXRate?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.FXRates
            .Include(x => x.MarketDataSet)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<FXRate>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.FXRates
            .AsNoTracking()
            .Include(x => x.MarketDataSet)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(FXRate fXRate, CancellationToken cancellationToken)
    {
        _db.FXRates.Add(fXRate);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(FXRate fXRate, CancellationToken cancellationToken)
    {
        _db.FXRates.Update(fXRate);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(FXRate fXRate, CancellationToken cancellationToken)
    {
        _db.FXRates.Remove(fXRate);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
