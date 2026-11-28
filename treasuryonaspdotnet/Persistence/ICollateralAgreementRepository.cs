using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface ICollateralAgreementRepository
{
    Task<CollateralAgreement?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<CollateralAgreement>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(CollateralAgreement collateralAgreement, CancellationToken cancellationToken);
    Task UpdateAsync(CollateralAgreement collateralAgreement, CancellationToken cancellationToken);
    Task DeleteAsync(CollateralAgreement collateralAgreement, CancellationToken cancellationToken);

    Task AddToMarginCallsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromMarginCallsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToCollateralAccountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromCollateralAccountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
