using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Persistence;

public interface IOpportunityStageHistoryRepository
{
    Task<OpportunityStageHistory?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<OpportunityStageHistory>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(OpportunityStageHistory opportunityStageHistory, CancellationToken cancellationToken);
    Task UpdateAsync(OpportunityStageHistory opportunityStageHistory, CancellationToken cancellationToken);
    Task DeleteAsync(OpportunityStageHistory opportunityStageHistory, CancellationToken cancellationToken);


}
