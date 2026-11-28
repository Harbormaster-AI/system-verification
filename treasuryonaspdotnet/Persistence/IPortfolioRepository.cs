using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface IPortfolioRepository
{
    Task<Portfolio?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Portfolio>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Portfolio portfolio, CancellationToken cancellationToken);
    Task UpdateAsync(Portfolio portfolio, CancellationToken cancellationToken);
    Task DeleteAsync(Portfolio portfolio, CancellationToken cancellationToken);

    Task AddToPositionsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromPositionsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToTradesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromTradesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToRiskReportsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromRiskReportsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToRiskLimitsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromRiskLimitsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToLiquidityBuffersAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromLiquidityBuffersAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
