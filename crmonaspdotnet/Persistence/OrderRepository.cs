
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace crmonaspdotnet.Persistence;

public class OrderRepository : IOrderRepository
{
    private readonly ApplicationDbContext _db;

    public OrderRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Order?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Orders
            .Include(x => x.Organization)
            .Include(x => x.Account)
            .Include(x => x.Opportunity)
            .Include(x => x.Quote)
            .Include(x => x.Owner)
            .Include(x => x.Contract)
            .Include(x => x.PriceBook)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Order>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Orders
            .AsNoTracking()
            .Include(x => x.Organization)
            .Include(x => x.Account)
            .Include(x => x.Opportunity)
            .Include(x => x.Quote)
            .Include(x => x.Owner)
            .Include(x => x.Contract)
            .Include(x => x.PriceBook)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Order order, CancellationToken cancellationToken)
    {
        _db.Orders.Add(order);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Order order, CancellationToken cancellationToken)
    {
        _db.Orders.Update(order);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Order order, CancellationToken cancellationToken)
    {
        _db.Orders.Remove(order);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToItemsAsync(
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

    public async Task RemoveFromItemsAsync(
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
