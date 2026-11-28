
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class RegulatoryMetricRepository : IRegulatoryMetricRepository
{
    private readonly ApplicationDbContext _db;

    public RegulatoryMetricRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<RegulatoryMetric?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.RegulatoryMetrics
            .Include(x => x.RiskReport)
            .Include(x => x.LiquidityBuffer)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<RegulatoryMetric>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.RegulatoryMetrics
            .AsNoTracking()
            .Include(x => x.RiskReport)
            .Include(x => x.LiquidityBuffer)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(RegulatoryMetric regulatoryMetric, CancellationToken cancellationToken)
    {
        _db.RegulatoryMetrics.Add(regulatoryMetric);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(RegulatoryMetric regulatoryMetric, CancellationToken cancellationToken)
    {
        _db.RegulatoryMetrics.Update(regulatoryMetric);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(RegulatoryMetric regulatoryMetric, CancellationToken cancellationToken)
    {
        _db.RegulatoryMetrics.Remove(regulatoryMetric);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
