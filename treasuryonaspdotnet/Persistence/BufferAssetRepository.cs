
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class BufferAssetRepository : IBufferAssetRepository
{
    private readonly ApplicationDbContext _db;

    public BufferAssetRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<BufferAsset?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.BufferAssets
            .Include(x => x.LiquidityBuffer)
            .Include(x => x.Portfolio)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<BufferAsset>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.BufferAssets
            .AsNoTracking()
            .Include(x => x.LiquidityBuffer)
            .Include(x => x.Portfolio)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(BufferAsset bufferAsset, CancellationToken cancellationToken)
    {
        _db.BufferAssets.Add(bufferAsset);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(BufferAsset bufferAsset, CancellationToken cancellationToken)
    {
        _db.BufferAssets.Update(bufferAsset);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(BufferAsset bufferAsset, CancellationToken cancellationToken)
    {
        _db.BufferAssets.Remove(bufferAsset);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
