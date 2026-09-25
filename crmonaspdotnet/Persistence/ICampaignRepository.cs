using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Persistence;

public interface ICampaignRepository
{
    Task<Campaign?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Campaign>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Campaign campaign, CancellationToken cancellationToken);
    Task UpdateAsync(Campaign campaign, CancellationToken cancellationToken);
    Task DeleteAsync(Campaign campaign, CancellationToken cancellationToken);

    Task AddToChildCampaignsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromChildCampaignsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToMembersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromMembersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToOpportunitiesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromOpportunitiesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToAccountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromAccountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToLeadsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromLeadsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToContactsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromContactsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToTeamsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromTeamsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToActivitiesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromActivitiesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
