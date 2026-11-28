using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface IBufferAssetRepository
{
    Task<BufferAsset?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<BufferAsset>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(BufferAsset bufferAsset, CancellationToken cancellationToken);
    Task UpdateAsync(BufferAsset bufferAsset, CancellationToken cancellationToken);
    Task DeleteAsync(BufferAsset bufferAsset, CancellationToken cancellationToken);


}
