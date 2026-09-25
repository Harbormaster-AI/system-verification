
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace crmonaspdotnet.Persistence;

public class QuoteLineItemRepository : IQuoteLineItemRepository
{
    private readonly ApplicationDbContext _db;

    public QuoteLineItemRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<QuoteLineItem?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.QuoteLineItems
            .Include(x => x.Quote)
            .Include(x => x.Product)
            .Include(x => x.PriceBookEntry)
            .Include(x => x.OpportunityLineItem)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<QuoteLineItem>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.QuoteLineItems
            .AsNoTracking()
            .Include(x => x.Quote)
            .Include(x => x.Product)
            .Include(x => x.PriceBookEntry)
            .Include(x => x.OpportunityLineItem)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(QuoteLineItem quoteLineItem, CancellationToken cancellationToken)
    {
        _db.QuoteLineItems.Add(quoteLineItem);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(QuoteLineItem quoteLineItem, CancellationToken cancellationToken)
    {
        _db.QuoteLineItems.Update(quoteLineItem);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(QuoteLineItem quoteLineItem, CancellationToken cancellationToken)
    {
        _db.QuoteLineItems.Remove(quoteLineItem);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
