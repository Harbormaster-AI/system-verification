
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace crmonaspdotnet.Persistence;

public class ProductRepository : IProductRepository
{
    private readonly ApplicationDbContext _db;

    public ProductRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Product?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Products
            .Include(x => x.Organization)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Product>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Products
            .AsNoTracking()
            .Include(x => x.Organization)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Product product, CancellationToken cancellationToken)
    {
        _db.Products.Add(product);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Product product, CancellationToken cancellationToken)
    {
        _db.Products.Update(product);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Product product, CancellationToken cancellationToken)
    {
        _db.Products.Remove(product);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToPriceBookEntriesAsync(
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

    public async Task RemoveFromPriceBookEntriesAsync(
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


    public async Task AddToOpportunityLineItemsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.OpportunityLineItems
            .Where(opportunityLineItem =>
                request.ChildIds.Contains(opportunityLineItem.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    opportunityLineItem =>
                        EF.Property<Guid?>(
                            opportunityLineItem,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromOpportunityLineItemsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.OpportunityLineItems
            .Where(opportunityLineItem =>
                request.ChildIds.Contains(opportunityLineItem.Id) &&
                EF.Property<Guid?>(
                    opportunityLineItem,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    opportunityLineItem =>
                        EF.Property<Guid?>(
                            opportunityLineItem,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }


    public async Task AddToQuoteLineItemsAsync(
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

    public async Task RemoveFromQuoteLineItemsAsync(
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


    public async Task AddToOrderItemsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.OrderItems
            .Where(orderItem =>
                request.ChildIds.Contains(orderItem.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    orderItem =>
                        EF.Property<Guid?>(
                            orderItem,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromOrderItemsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.OrderItems
            .Where(orderItem =>
                request.ChildIds.Contains(orderItem.Id) &&
                EF.Property<Guid?>(
                    orderItem,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    orderItem =>
                        EF.Property<Guid?>(
                            orderItem,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }

}
