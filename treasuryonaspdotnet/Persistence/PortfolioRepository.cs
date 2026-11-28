
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class PortfolioRepository : IPortfolioRepository
{
    private readonly ApplicationDbContext _db;

    public PortfolioRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Portfolio?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Portfolios
            .Include(x => x.TradingBook)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Portfolio>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Portfolios
            .AsNoTracking()
            .Include(x => x.TradingBook)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Portfolio portfolio, CancellationToken cancellationToken)
    {
        _db.Portfolios.Add(portfolio);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Portfolio portfolio, CancellationToken cancellationToken)
    {
        _db.Portfolios.Update(portfolio);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Portfolio portfolio, CancellationToken cancellationToken)
    {
        _db.Portfolios.Remove(portfolio);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToPositionsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Positions
            .Where(position =>
                request.ChildIds.Contains(position.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    position =>
                        EF.Property<Guid?>(
                            position,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromPositionsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Positions
            .Where(position =>
                request.ChildIds.Contains(position.Id) &&
                EF.Property<Guid?>(
                    position,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    position =>
                        EF.Property<Guid?>(
                            position,
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


    public async Task AddToRiskReportsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.RiskReports
            .Where(riskReport =>
                request.ChildIds.Contains(riskReport.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    riskReport =>
                        EF.Property<Guid?>(
                            riskReport,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromRiskReportsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.RiskReports
            .Where(riskReport =>
                request.ChildIds.Contains(riskReport.Id) &&
                EF.Property<Guid?>(
                    riskReport,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    riskReport =>
                        EF.Property<Guid?>(
                            riskReport,
                            "Holiday_Id"),
                    (Guid?)null));
    }


    public async Task AddToRiskLimitsAsync(
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

    public async Task RemoveFromRiskLimitsAsync(
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


    public async Task AddToLiquidityBuffersAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.LiquidityBuffers
            .Where(liquidityBuffer =>
                request.ChildIds.Contains(liquidityBuffer.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    liquidityBuffer =>
                        EF.Property<Guid?>(
                            liquidityBuffer,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromLiquidityBuffersAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.LiquidityBuffers
            .Where(liquidityBuffer =>
                request.ChildIds.Contains(liquidityBuffer.Id) &&
                EF.Property<Guid?>(
                    liquidityBuffer,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    liquidityBuffer =>
                        EF.Property<Guid?>(
                            liquidityBuffer,
                            "Holiday_Id"),
                    (Guid?)null));
    }

}
