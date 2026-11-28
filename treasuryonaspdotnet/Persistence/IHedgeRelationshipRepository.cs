using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface IHedgeRelationshipRepository
{
    Task<HedgeRelationship?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<HedgeRelationship>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(HedgeRelationship hedgeRelationship, CancellationToken cancellationToken);
    Task UpdateAsync(HedgeRelationship hedgeRelationship, CancellationToken cancellationToken);
    Task DeleteAsync(HedgeRelationship hedgeRelationship, CancellationToken cancellationToken);

    Task AddToAccountingEntriesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromAccountingEntriesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
