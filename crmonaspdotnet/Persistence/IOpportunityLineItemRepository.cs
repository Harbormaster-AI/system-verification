using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Persistence;

public interface IOpportunityLineItemRepository
{
    Task<OpportunityLineItem?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<OpportunityLineItem>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(OpportunityLineItem opportunityLineItem, CancellationToken cancellationToken);
    Task UpdateAsync(OpportunityLineItem opportunityLineItem, CancellationToken cancellationToken);
    Task DeleteAsync(OpportunityLineItem opportunityLineItem, CancellationToken cancellationToken);


}
