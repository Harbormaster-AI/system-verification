using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Persistence;

public interface IUserRepository
{
    Task<User?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<User>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(User user, CancellationToken cancellationToken);
    Task UpdateAsync(User user, CancellationToken cancellationToken);
    Task DeleteAsync(User user, CancellationToken cancellationToken);

    Task AddToTeamsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromTeamsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToActivitiesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromActivitiesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToOwnedAccountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromOwnedAccountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToOwnedLeadsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromOwnedLeadsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToOwnedOpportunitiesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromOwnedOpportunitiesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToOwnedCasesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromOwnedCasesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToQuotesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromQuotesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToOrdersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromOrdersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToContractsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromContractsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToEmailMessagesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromEmailMessagesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
