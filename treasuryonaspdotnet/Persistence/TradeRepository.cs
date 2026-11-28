
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class TradeRepository : ITradeRepository
{
    private readonly ApplicationDbContext _db;

    public TradeRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Trade?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Trades
            .Include(x => x.Counterparty)
            .Include(x => x.Portfolio)
            .Include(x => x.SettlementInstruction)
            .Include(x => x.CollateralAccount)
            .Include(x => x.HedgeRelationship)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Trade>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Trades
            .AsNoTracking()
            .Include(x => x.Counterparty)
            .Include(x => x.Portfolio)
            .Include(x => x.SettlementInstruction)
            .Include(x => x.CollateralAccount)
            .Include(x => x.HedgeRelationship)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Trade trade, CancellationToken cancellationToken)
    {
        _db.Trades.Add(trade);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Trade trade, CancellationToken cancellationToken)
    {
        _db.Trades.Update(trade);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Trade trade, CancellationToken cancellationToken)
    {
        _db.Trades.Remove(trade);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToCashFlowsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.CashFlows
            .Where(cashFlow =>
                request.ChildIds.Contains(cashFlow.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    cashFlow =>
                        EF.Property<Guid?>(
                            cashFlow,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromCashFlowsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.CashFlows
            .Where(cashFlow =>
                request.ChildIds.Contains(cashFlow.Id) &&
                EF.Property<Guid?>(
                    cashFlow,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    cashFlow =>
                        EF.Property<Guid?>(
                            cashFlow,
                            "Holiday_Id"),
                    (Guid?)null));
    }

}
