using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Persistence;

public interface IContactRepository
{
    Task<Contact?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Contact>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Contact contact, CancellationToken cancellationToken);
    Task UpdateAsync(Contact contact, CancellationToken cancellationToken);
    Task DeleteAsync(Contact contact, CancellationToken cancellationToken);

    Task AddToActivitiesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromActivitiesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToOpportunitiesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromOpportunitiesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToCasesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromCasesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToCampaignsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromCampaignsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToNotesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromNotesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToEmailMessagesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromEmailMessagesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
