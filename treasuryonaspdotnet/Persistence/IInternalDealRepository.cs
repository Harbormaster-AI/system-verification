using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface IInternalDealRepository
{
    Task<InternalDeal?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<InternalDeal>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(InternalDeal internalDeal, CancellationToken cancellationToken);
    Task UpdateAsync(InternalDeal internalDeal, CancellationToken cancellationToken);
    Task DeleteAsync(InternalDeal internalDeal, CancellationToken cancellationToken);

    Task AddToCashFlowsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromCashFlowsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
