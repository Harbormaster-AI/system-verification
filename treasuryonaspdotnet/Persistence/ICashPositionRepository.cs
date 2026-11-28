using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface ICashPositionRepository
{
    Task<CashPosition?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<CashPosition>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(CashPosition cashPosition, CancellationToken cancellationToken);
    Task UpdateAsync(CashPosition cashPosition, CancellationToken cancellationToken);
    Task DeleteAsync(CashPosition cashPosition, CancellationToken cancellationToken);

    Task AddToCashFlowsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromCashFlowsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
