using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Persistence;

public interface ILeadRepository
{
    Task<Lead?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Lead>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Lead lead, CancellationToken cancellationToken);
    Task UpdateAsync(Lead lead, CancellationToken cancellationToken);
    Task DeleteAsync(Lead lead, CancellationToken cancellationToken);

    Task AddToActivitiesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromActivitiesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToCampaignsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromCampaignsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToNotesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromNotesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToEmailMessagesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromEmailMessagesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
