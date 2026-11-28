
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class LiquidityBufferRepository : ILiquidityBufferRepository
{
    private readonly ApplicationDbContext _db;

    public LiquidityBufferRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<LiquidityBuffer?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.LiquidityBuffers
            .Include(x => x.Portfolio)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<LiquidityBuffer>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.LiquidityBuffers
            .AsNoTracking()
            .Include(x => x.Portfolio)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(LiquidityBuffer liquidityBuffer, CancellationToken cancellationToken)
    {
        _db.LiquidityBuffers.Add(liquidityBuffer);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(LiquidityBuffer liquidityBuffer, CancellationToken cancellationToken)
    {
        _db.LiquidityBuffers.Update(liquidityBuffer);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(LiquidityBuffer liquidityBuffer, CancellationToken cancellationToken)
    {
        _db.LiquidityBuffers.Remove(liquidityBuffer);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToAssetsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.BufferAssets
            .Where(bufferAsset =>
                request.ChildIds.Contains(bufferAsset.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    bufferAsset =>
                        EF.Property<Guid?>(
                            bufferAsset,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromAssetsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.BufferAssets
            .Where(bufferAsset =>
                request.ChildIds.Contains(bufferAsset.Id) &&
                EF.Property<Guid?>(
                    bufferAsset,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    bufferAsset =>
                        EF.Property<Guid?>(
                            bufferAsset,
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
