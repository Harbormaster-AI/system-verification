using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface ITradeRepository
{
    Task<Trade?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Trade>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Trade trade, CancellationToken cancellationToken);
    Task UpdateAsync(Trade trade, CancellationToken cancellationToken);
    Task DeleteAsync(Trade trade, CancellationToken cancellationToken);

    Task AddToCashFlowsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromCashFlowsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
