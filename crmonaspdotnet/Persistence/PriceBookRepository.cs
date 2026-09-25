
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace crmonaspdotnet.Persistence;

public class PriceBookRepository : IPriceBookRepository
{
    private readonly ApplicationDbContext _db;

    public PriceBookRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<PriceBook?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.PriceBooks
            .Include(x => x.Organization)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<PriceBook>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.PriceBooks
            .AsNoTracking()
            .Include(x => x.Organization)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(PriceBook priceBook, CancellationToken cancellationToken)
    {
        _db.PriceBooks.Add(priceBook);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(PriceBook priceBook, CancellationToken cancellationToken)
    {
        _db.PriceBooks.Update(priceBook);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(PriceBook priceBook, CancellationToken cancellationToken)
    {
        _db.PriceBooks.Remove(priceBook);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToEntriesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.PriceBookEntrys
            .Where(priceBookEntry =>
                request.ChildIds.Contains(priceBookEntry.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    priceBookEntry =>
                        EF.Property<Guid?>(
                            priceBookEntry,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromEntriesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.PriceBookEntrys
            .Where(priceBookEntry =>
                request.ChildIds.Contains(priceBookEntry.Id) &&
                EF.Property<Guid?>(
                    priceBookEntry,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    priceBookEntry =>
                        EF.Property<Guid?>(
                            priceBookEntry,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }


    public async Task AddToQuotesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Quotes
            .Where(quote =>
                request.ChildIds.Contains(quote.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    quote =>
                        EF.Property<Guid?>(
                            quote,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromQuotesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Quotes
            .Where(quote =>
                request.ChildIds.Contains(quote.Id) &&
                EF.Property<Guid?>(
                    quote,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    quote =>
                        EF.Property<Guid?>(
                            quote,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }


    public async Task AddToOrdersAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Orders
            .Where(order =>
                request.ChildIds.Contains(order.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    order =>
                        EF.Property<Guid?>(
                            order,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromOrdersAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Orders
            .Where(order =>
                request.ChildIds.Contains(order.Id) &&
                EF.Property<Guid?>(
                    order,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    order =>
                        EF.Property<Guid?>(
                            order,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }

}
