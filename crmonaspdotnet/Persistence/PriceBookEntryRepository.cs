
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace crmonaspdotnet.Persistence;

public class PriceBookEntryRepository : IPriceBookEntryRepository
{
    private readonly ApplicationDbContext _db;

    public PriceBookEntryRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<PriceBookEntry?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.PriceBookEntrys
            .Include(x => x.PriceBook)
            .Include(x => x.Product)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<PriceBookEntry>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.PriceBookEntrys
            .AsNoTracking()
            .Include(x => x.PriceBook)
            .Include(x => x.Product)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(PriceBookEntry priceBookEntry, CancellationToken cancellationToken)
    {
        _db.PriceBookEntrys.Add(priceBookEntry);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(PriceBookEntry priceBookEntry, CancellationToken cancellationToken)
    {
        _db.PriceBookEntrys.Update(priceBookEntry);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(PriceBookEntry priceBookEntry, CancellationToken cancellationToken)
    {
        _db.PriceBookEntrys.Remove(priceBookEntry);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
