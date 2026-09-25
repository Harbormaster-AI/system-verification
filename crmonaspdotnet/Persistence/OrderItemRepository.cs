
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace crmonaspdotnet.Persistence;

public class OrderItemRepository : IOrderItemRepository
{
    private readonly ApplicationDbContext _db;

    public OrderItemRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<OrderItem?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.OrderItems
            .Include(x => x.Order)
            .Include(x => x.Product)
            .Include(x => x.PriceBookEntry)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<OrderItem>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.OrderItems
            .AsNoTracking()
            .Include(x => x.Order)
            .Include(x => x.Product)
            .Include(x => x.PriceBookEntry)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(OrderItem orderItem, CancellationToken cancellationToken)
    {
        _db.OrderItems.Add(orderItem);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(OrderItem orderItem, CancellationToken cancellationToken)
    {
        _db.OrderItems.Update(orderItem);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(OrderItem orderItem, CancellationToken cancellationToken)
    {
        _db.OrderItems.Remove(orderItem);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
