using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Persistence;

public interface IAccountRepository
{
    Task<Account?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Account>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Account account, CancellationToken cancellationToken);
    Task UpdateAsync(Account account, CancellationToken cancellationToken);
    Task DeleteAsync(Account account, CancellationToken cancellationToken);

    Task AddToChildAccountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromChildAccountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToContactsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromContactsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToOpportunitiesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromOpportunitiesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToCasesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromCasesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToActivitiesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromActivitiesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToCampaignsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromCampaignsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToQuotesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromQuotesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToOrdersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromOrdersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToContractsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromContractsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToNotesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromNotesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToEmailMessagesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromEmailMessagesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
