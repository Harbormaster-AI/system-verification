
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace crmonaspdotnet.Persistence;

public class OpportunityLineItemRepository : IOpportunityLineItemRepository
{
    private readonly ApplicationDbContext _db;

    public OpportunityLineItemRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<OpportunityLineItem?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.OpportunityLineItems
            .Include(x => x.Opportunity)
            .Include(x => x.Product)
            .Include(x => x.PriceBookEntry)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<OpportunityLineItem>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.OpportunityLineItems
            .AsNoTracking()
            .Include(x => x.Opportunity)
            .Include(x => x.Product)
            .Include(x => x.PriceBookEntry)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(OpportunityLineItem opportunityLineItem, CancellationToken cancellationToken)
    {
        _db.OpportunityLineItems.Add(opportunityLineItem);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(OpportunityLineItem opportunityLineItem, CancellationToken cancellationToken)
    {
        _db.OpportunityLineItems.Update(opportunityLineItem);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(OpportunityLineItem opportunityLineItem, CancellationToken cancellationToken)
    {
        _db.OpportunityLineItems.Remove(opportunityLineItem);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
