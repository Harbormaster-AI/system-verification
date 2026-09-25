using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Persistence;

public interface ICase_Repository
{
    Task<Case_?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Case_>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Case_ case_, CancellationToken cancellationToken);
    Task UpdateAsync(Case_ case_, CancellationToken cancellationToken);
    Task DeleteAsync(Case_ case_, CancellationToken cancellationToken);

    Task AddToActivitiesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromActivitiesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToCaseCommentsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromCaseCommentsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToEmailsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromEmailsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToRelatedOpportunitiesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromRelatedOpportunitiesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
