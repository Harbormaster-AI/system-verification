using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface ITreasuryPolicyRepository
{
    Task<TreasuryPolicy?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<TreasuryPolicy>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(TreasuryPolicy treasuryPolicy, CancellationToken cancellationToken);
    Task UpdateAsync(TreasuryPolicy treasuryPolicy, CancellationToken cancellationToken);
    Task DeleteAsync(TreasuryPolicy treasuryPolicy, CancellationToken cancellationToken);

    Task AddToLimitsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromLimitsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToApprovalsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromApprovalsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
