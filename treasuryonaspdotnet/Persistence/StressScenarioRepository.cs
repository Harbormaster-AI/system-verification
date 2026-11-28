
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class StressScenarioRepository : IStressScenarioRepository
{
    private readonly ApplicationDbContext _db;

    public StressScenarioRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<StressScenario?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.StressScenarios
            .Include(x => x.MarketDataSet)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<StressScenario>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.StressScenarios
            .AsNoTracking()
            .Include(x => x.MarketDataSet)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(StressScenario stressScenario, CancellationToken cancellationToken)
    {
        _db.StressScenarios.Add(stressScenario);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(StressScenario stressScenario, CancellationToken cancellationToken)
    {
        _db.StressScenarios.Update(stressScenario);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(StressScenario stressScenario, CancellationToken cancellationToken)
    {
        _db.StressScenarios.Remove(stressScenario);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToStressResultsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.StressResults
            .Where(stressResult =>
                request.ChildIds.Contains(stressResult.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    stressResult =>
                        EF.Property<Guid?>(
                            stressResult,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromStressResultsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.StressResults
            .Where(stressResult =>
                request.ChildIds.Contains(stressResult.Id) &&
                EF.Property<Guid?>(
                    stressResult,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    stressResult =>
                        EF.Property<Guid?>(
                            stressResult,
                            "Holiday_Id"),
                    (Guid?)null));
    }

}
