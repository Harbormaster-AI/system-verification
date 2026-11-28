using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface IIssuanceRepository
{
    Task<Issuance?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Issuance>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Issuance issuance, CancellationToken cancellationToken);
    Task UpdateAsync(Issuance issuance, CancellationToken cancellationToken);
    Task DeleteAsync(Issuance issuance, CancellationToken cancellationToken);

    Task AddToCashFlowsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromCashFlowsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
