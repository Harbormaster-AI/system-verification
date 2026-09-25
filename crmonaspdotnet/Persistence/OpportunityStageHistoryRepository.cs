
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace crmonaspdotnet.Persistence;

public class OpportunityStageHistoryRepository : IOpportunityStageHistoryRepository
{
    private readonly ApplicationDbContext _db;

    public OpportunityStageHistoryRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<OpportunityStageHistory?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.OpportunityStageHistorys
            .Include(x => x.Opportunity)
            .Include(x => x.ChangedBy)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<OpportunityStageHistory>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.OpportunityStageHistorys
            .AsNoTracking()
            .Include(x => x.Opportunity)
            .Include(x => x.ChangedBy)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(OpportunityStageHistory opportunityStageHistory, CancellationToken cancellationToken)
    {
        _db.OpportunityStageHistorys.Add(opportunityStageHistory);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(OpportunityStageHistory opportunityStageHistory, CancellationToken cancellationToken)
    {
        _db.OpportunityStageHistorys.Update(opportunityStageHistory);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(OpportunityStageHistory opportunityStageHistory, CancellationToken cancellationToken)
    {
        _db.OpportunityStageHistorys.Remove(opportunityStageHistory);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
