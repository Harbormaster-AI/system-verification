using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface IRiskLimitRepository
{
    Task<RiskLimit?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<RiskLimit>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(RiskLimit riskLimit, CancellationToken cancellationToken);
    Task UpdateAsync(RiskLimit riskLimit, CancellationToken cancellationToken);
    Task DeleteAsync(RiskLimit riskLimit, CancellationToken cancellationToken);

    Task AddToBreachesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromBreachesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToApprovalsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromApprovalsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
