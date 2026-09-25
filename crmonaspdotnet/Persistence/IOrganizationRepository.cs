using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Persistence;

public interface IOrganizationRepository
{
    Task<Organization?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Organization>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Organization organization, CancellationToken cancellationToken);
    Task UpdateAsync(Organization organization, CancellationToken cancellationToken);
    Task DeleteAsync(Organization organization, CancellationToken cancellationToken);

    Task AddToUsersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromUsersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToAccountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromAccountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToTeamsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromTeamsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToTerritoriesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromTerritoriesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToProductsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromProductsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToPriceBooksAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromPriceBooksAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToCampaignsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromCampaignsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
