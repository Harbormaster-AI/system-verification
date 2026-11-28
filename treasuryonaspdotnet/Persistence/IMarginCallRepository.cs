using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface IMarginCallRepository
{
    Task<MarginCall?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<MarginCall>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(MarginCall marginCall, CancellationToken cancellationToken);
    Task UpdateAsync(MarginCall marginCall, CancellationToken cancellationToken);
    Task DeleteAsync(MarginCall marginCall, CancellationToken cancellationToken);

    Task AddToCashFlowsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromCashFlowsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
