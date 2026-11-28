using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface ICollateralAccountRepository
{
    Task<CollateralAccount?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<CollateralAccount>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(CollateralAccount collateralAccount, CancellationToken cancellationToken);
    Task UpdateAsync(CollateralAccount collateralAccount, CancellationToken cancellationToken);
    Task DeleteAsync(CollateralAccount collateralAccount, CancellationToken cancellationToken);

    Task AddToTradesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromTradesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToMarginCallsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromMarginCallsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
