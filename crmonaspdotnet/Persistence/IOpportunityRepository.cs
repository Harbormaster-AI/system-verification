using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Persistence;

public interface IOpportunityRepository
{
    Task<Opportunity?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Opportunity>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Opportunity opportunity, CancellationToken cancellationToken);
    Task UpdateAsync(Opportunity opportunity, CancellationToken cancellationToken);
    Task DeleteAsync(Opportunity opportunity, CancellationToken cancellationToken);

    Task AddToContactsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromContactsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToLineItemsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromLineItemsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToStageHistoryAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromStageHistoryAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToQuotesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromQuotesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToOrdersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromOrdersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToCampaignsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromCampaignsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToActivitiesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromActivitiesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToTeamsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromTeamsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
