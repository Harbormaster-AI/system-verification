
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace crmonaspdotnet.Persistence;

public class QuoteRepository : IQuoteRepository
{
    private readonly ApplicationDbContext _db;

    public QuoteRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Quote?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Quotes
            .Include(x => x.Organization)
            .Include(x => x.Account)
            .Include(x => x.Opportunity)
            .Include(x => x.Owner)
            .Include(x => x.PriceBook)
            .Include(x => x.Order)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Quote>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Quotes
            .AsNoTracking()
            .Include(x => x.Organization)
            .Include(x => x.Account)
            .Include(x => x.Opportunity)
            .Include(x => x.Owner)
            .Include(x => x.PriceBook)
            .Include(x => x.Order)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Quote quote, CancellationToken cancellationToken)
    {
        _db.Quotes.Add(quote);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Quote quote, CancellationToken cancellationToken)
    {
        _db.Quotes.Update(quote);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Quote quote, CancellationToken cancellationToken)
    {
        _db.Quotes.Remove(quote);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToLineItemsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.QuoteLineItems
            .Where(quoteLineItem =>
                request.ChildIds.Contains(quoteLineItem.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    quoteLineItem =>
                        EF.Property<Guid?>(
                            quoteLineItem,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromLineItemsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.QuoteLineItems
            .Where(quoteLineItem =>
                request.ChildIds.Contains(quoteLineItem.Id) &&
                EF.Property<Guid?>(
                    quoteLineItem,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    quoteLineItem =>
                        EF.Property<Guid?>(
                            quoteLineItem,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }

}
