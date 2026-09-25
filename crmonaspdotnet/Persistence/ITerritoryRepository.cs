using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Persistence;

public interface ITerritoryRepository
{
    Task<Territory?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Territory>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Territory territory, CancellationToken cancellationToken);
    Task UpdateAsync(Territory territory, CancellationToken cancellationToken);
    Task DeleteAsync(Territory territory, CancellationToken cancellationToken);

    Task AddToAccountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromAccountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToUsersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromUsersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
