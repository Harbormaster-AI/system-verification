
using bankingonaspdotnet.Contracts;
using bankingonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace bankingonaspdotnet.Persistence;

public class ExchangeRateRepository : IExchangeRateRepository
{
    private readonly ApplicationDbContext _db;

    public ExchangeRateRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<ExchangeRate?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.ExchangeRates
            .Include(x => x.Bank)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<ExchangeRate>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.ExchangeRates
            .AsNoTracking()
            .Include(x => x.Bank)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(ExchangeRate exchangeRate, CancellationToken cancellationToken)
    {
        _db.ExchangeRates.Add(exchangeRate);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(ExchangeRate exchangeRate, CancellationToken cancellationToken)
    {
        _db.ExchangeRates.Update(exchangeRate);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(ExchangeRate exchangeRate, CancellationToken cancellationToken)
    {
        _db.ExchangeRates.Remove(exchangeRate);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task AddToFxTradesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.FxTrades
            .Where(fXTrade => request.ChildIds.Contains(fXTrade.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    fXTrade => fXTrade.FxTrades_Id,
                    request.ParentId));
    }

    public async Task RemoveFromFxTradesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.FxTrades
            .Where(fXTrade =>
                request.ChildIds.Contains(fXTrade.Id) &&
                fXTrade.FxTrades_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    fXTrade => fXTrade.FxTrades_Id,
                    (Guid?)null));
    }

}
