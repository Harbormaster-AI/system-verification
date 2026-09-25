using bankingonaspdotnet.Domain;
using Microsoft.EntityFrameworkCore;

namespace bankingonaspdotnet.Persistence;

public class FXTradeRepository : IFXTradeRepository
{
    private readonly ApplicationDbContext _db;

    public FXTradeRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<FXTrade?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.FXTrades
            .Include(x => x.Customer)
            .Include(x => x.Bank)
            .Include(x => x.ExchangeRate)
            .Include(x => x.SourceAccount)
            .Include(x => x.DestinationAccount)
            .Include(x => x.Transaction)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<FXTrade>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.FXTrades
            .AsNoTracking()
            .Include(x => x.Customer)
            .Include(x => x.Bank)
            .Include(x => x.ExchangeRate)
            .Include(x => x.SourceAccount)
            .Include(x => x.DestinationAccount)
            .Include(x => x.Transaction)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(FXTrade fXTrade, CancellationToken cancellationToken)
    {
        _db.FXTrades.Add(fXTrade);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(FXTrade fXTrade, CancellationToken cancellationToken)
    {
        _db.FXTrades.Update(fXTrade);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(FXTrade fXTrade, CancellationToken cancellationToken)
    {
        _db.FXTrades.Remove(fXTrade);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
