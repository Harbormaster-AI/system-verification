using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface INettingAgreementRepository
{
    Task<NettingAgreement?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<NettingAgreement>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(NettingAgreement nettingAgreement, CancellationToken cancellationToken);
    Task UpdateAsync(NettingAgreement nettingAgreement, CancellationToken cancellationToken);
    Task DeleteAsync(NettingAgreement nettingAgreement, CancellationToken cancellationToken);

    Task AddToCollateralAgreementsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromCollateralAgreementsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToTradesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromTradesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
