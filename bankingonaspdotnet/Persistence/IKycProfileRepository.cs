using bankingonaspdotnet.Domain;

namespace bankingonaspdotnet.Persistence;

public interface IKycProfileRepository
{
    Task<KycProfile?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<KycProfile>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(KycProfile kycProfile, CancellationToken cancellationToken);
    Task UpdateAsync(KycProfile kycProfile, CancellationToken cancellationToken);
    Task DeleteAsync(KycProfile kycProfile, CancellationToken cancellationToken);

    Task AddToIdentityDocumentsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromIdentityDocumentsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToRiskAssessmentsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromRiskAssessmentsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToScreeningsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromScreeningsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
