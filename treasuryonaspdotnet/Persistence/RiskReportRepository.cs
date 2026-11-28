
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class RiskReportRepository : IRiskReportRepository
{
    private readonly ApplicationDbContext _db;

    public RiskReportRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<RiskReport?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.RiskReports
            .Include(x => x.Portfolio)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<RiskReport>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.RiskReports
            .AsNoTracking()
            .Include(x => x.Portfolio)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(RiskReport riskReport, CancellationToken cancellationToken)
    {
        _db.RiskReports.Add(riskReport);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(RiskReport riskReport, CancellationToken cancellationToken)
    {
        _db.RiskReports.Update(riskReport);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(RiskReport riskReport, CancellationToken cancellationToken)
    {
        _db.RiskReports.Remove(riskReport);
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


    public async Task AddToRegulatoryMetricsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.RegulatoryMetrics
            .Where(regulatoryMetric =>
                request.ChildIds.Contains(regulatoryMetric.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    regulatoryMetric =>
                        EF.Property<Guid?>(
                            regulatoryMetric,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromRegulatoryMetricsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.RegulatoryMetrics
            .Where(regulatoryMetric =>
                request.ChildIds.Contains(regulatoryMetric.Id) &&
                EF.Property<Guid?>(
                    regulatoryMetric,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    regulatoryMetric =>
                        EF.Property<Guid?>(
                            regulatoryMetric,
                            "Holiday_Id"),
                    (Guid?)null));
    }

}
