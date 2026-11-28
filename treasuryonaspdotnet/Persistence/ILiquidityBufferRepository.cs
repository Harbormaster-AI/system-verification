using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface ILiquidityBufferRepository
{
    Task<LiquidityBuffer?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<LiquidityBuffer>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(LiquidityBuffer liquidityBuffer, CancellationToken cancellationToken);
    Task UpdateAsync(LiquidityBuffer liquidityBuffer, CancellationToken cancellationToken);
    Task DeleteAsync(LiquidityBuffer liquidityBuffer, CancellationToken cancellationToken);

    Task AddToAssetsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromAssetsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToRegulatoryMetricsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromRegulatoryMetricsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
