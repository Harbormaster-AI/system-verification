using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Persistence;

public interface ITeamRepository
{
    Task<Team?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Team>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Team team, CancellationToken cancellationToken);
    Task UpdateAsync(Team team, CancellationToken cancellationToken);
    Task DeleteAsync(Team team, CancellationToken cancellationToken);

    Task AddToUsersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromUsersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToAccountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromAccountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToOpportunitiesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromOpportunitiesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToCasesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromCasesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToCampaignsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromCampaignsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
