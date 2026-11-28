using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface IYieldCurveRepository
{
    Task<YieldCurve?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<YieldCurve>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(YieldCurve yieldCurve, CancellationToken cancellationToken);
    Task UpdateAsync(YieldCurve yieldCurve, CancellationToken cancellationToken);
    Task DeleteAsync(YieldCurve yieldCurve, CancellationToken cancellationToken);

    Task AddToQuotesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromQuotesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
