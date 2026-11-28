
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class YieldCurveRepository : IYieldCurveRepository
{
    private readonly ApplicationDbContext _db;

    public YieldCurveRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<YieldCurve?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.YieldCurves
            .Include(x => x.MarketDataSet)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<YieldCurve>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.YieldCurves
            .AsNoTracking()
            .Include(x => x.MarketDataSet)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(YieldCurve yieldCurve, CancellationToken cancellationToken)
    {
        _db.YieldCurves.Add(yieldCurve);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(YieldCurve yieldCurve, CancellationToken cancellationToken)
    {
        _db.YieldCurves.Update(yieldCurve);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(YieldCurve yieldCurve, CancellationToken cancellationToken)
    {
        _db.YieldCurves.Remove(yieldCurve);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToQuotesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.CurveQuotes
            .Where(curveQuote =>
                request.ChildIds.Contains(curveQuote.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    curveQuote =>
                        EF.Property<Guid?>(
                            curveQuote,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromQuotesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.CurveQuotes
            .Where(curveQuote =>
                request.ChildIds.Contains(curveQuote.Id) &&
                EF.Property<Guid?>(
                    curveQuote,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    curveQuote =>
                        EF.Property<Guid?>(
                            curveQuote,
                            "Holiday_Id"),
                    (Guid?)null));
    }

}
