
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class MarketDataSetRepository : IMarketDataSetRepository
{
    private readonly ApplicationDbContext _db;

    public MarketDataSetRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<MarketDataSet?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.MarketDataSets
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<MarketDataSet>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.MarketDataSets
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(MarketDataSet marketDataSet, CancellationToken cancellationToken)
    {
        _db.MarketDataSets.Add(marketDataSet);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(MarketDataSet marketDataSet, CancellationToken cancellationToken)
    {
        _db.MarketDataSets.Update(marketDataSet);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(MarketDataSet marketDataSet, CancellationToken cancellationToken)
    {
        _db.MarketDataSets.Remove(marketDataSet);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToYieldCurvesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.YieldCurves
            .Where(yieldCurve =>
                request.ChildIds.Contains(yieldCurve.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    yieldCurve =>
                        EF.Property<Guid?>(
                            yieldCurve,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromYieldCurvesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.YieldCurves
            .Where(yieldCurve =>
                request.ChildIds.Contains(yieldCurve.Id) &&
                EF.Property<Guid?>(
                    yieldCurve,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    yieldCurve =>
                        EF.Property<Guid?>(
                            yieldCurve,
                            "Holiday_Id"),
                    (Guid?)null));
    }


    public async Task AddToFxRatesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.FXRates
            .Where(fXRate =>
                request.ChildIds.Contains(fXRate.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    fXRate =>
                        EF.Property<Guid?>(
                            fXRate,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromFxRatesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.FXRates
            .Where(fXRate =>
                request.ChildIds.Contains(fXRate.Id) &&
                EF.Property<Guid?>(
                    fXRate,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    fXRate =>
                        EF.Property<Guid?>(
                            fXRate,
                            "Holiday_Id"),
                    (Guid?)null));
    }


    public async Task AddToVolSurfacesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.VolSurfaces
            .Where(volSurface =>
                request.ChildIds.Contains(volSurface.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    volSurface =>
                        EF.Property<Guid?>(
                            volSurface,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromVolSurfacesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.VolSurfaces
            .Where(volSurface =>
                request.ChildIds.Contains(volSurface.Id) &&
                EF.Property<Guid?>(
                    volSurface,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    volSurface =>
                        EF.Property<Guid?>(
                            volSurface,
                            "Holiday_Id"),
                    (Guid?)null));
    }


    public async Task AddToStressScenariosAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.StressScenarios
            .Where(stressScenario =>
                request.ChildIds.Contains(stressScenario.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    stressScenario =>
                        EF.Property<Guid?>(
                            stressScenario,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromStressScenariosAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.StressScenarios
            .Where(stressScenario =>
                request.ChildIds.Contains(stressScenario.Id) &&
                EF.Property<Guid?>(
                    stressScenario,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    stressScenario =>
                        EF.Property<Guid?>(
                            stressScenario,
                            "Holiday_Id"),
                    (Guid?)null));
    }

}
