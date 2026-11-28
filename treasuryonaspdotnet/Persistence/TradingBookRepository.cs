
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class TradingBookRepository : ITradingBookRepository
{
    private readonly ApplicationDbContext _db;

    public TradingBookRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<TradingBook?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.TradingBooks
            .Include(x => x.TreasuryUnit)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<TradingBook>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.TradingBooks
            .AsNoTracking()
            .Include(x => x.TreasuryUnit)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(TradingBook tradingBook, CancellationToken cancellationToken)
    {
        _db.TradingBooks.Add(tradingBook);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(TradingBook tradingBook, CancellationToken cancellationToken)
    {
        _db.TradingBooks.Update(tradingBook);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(TradingBook tradingBook, CancellationToken cancellationToken)
    {
        _db.TradingBooks.Remove(tradingBook);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToPortfoliosAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Portfolios
            .Where(portfolio =>
                request.ChildIds.Contains(portfolio.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    portfolio =>
                        EF.Property<Guid?>(
                            portfolio,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromPortfoliosAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Portfolios
            .Where(portfolio =>
                request.ChildIds.Contains(portfolio.Id) &&
                EF.Property<Guid?>(
                    portfolio,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    portfolio =>
                        EF.Property<Guid?>(
                            portfolio,
                            "Holiday_Id"),
                    (Guid?)null));
    }


    public async Task AddToLimitsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.RiskLimits
            .Where(riskLimit =>
                request.ChildIds.Contains(riskLimit.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    riskLimit =>
                        EF.Property<Guid?>(
                            riskLimit,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromLimitsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.RiskLimits
            .Where(riskLimit =>
                request.ChildIds.Contains(riskLimit.Id) &&
                EF.Property<Guid?>(
                    riskLimit,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    riskLimit =>
                        EF.Property<Guid?>(
                            riskLimit,
                            "Holiday_Id"),
                    (Guid?)null));
    }


    public async Task AddToTradesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Trades
            .Where(trade =>
                request.ChildIds.Contains(trade.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    trade =>
                        EF.Property<Guid?>(
                            trade,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromTradesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Trades
            .Where(trade =>
                request.ChildIds.Contains(trade.Id) &&
                EF.Property<Guid?>(
                    trade,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    trade =>
                        EF.Property<Guid?>(
                            trade,
                            "Holiday_Id"),
                    (Guid?)null));
    }

}
