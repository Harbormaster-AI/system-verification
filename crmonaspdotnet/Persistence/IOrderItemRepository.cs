using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Persistence;

public interface IOrderItemRepository
{
    Task<OrderItem?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<OrderItem>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(OrderItem orderItem, CancellationToken cancellationToken);
    Task UpdateAsync(OrderItem orderItem, CancellationToken cancellationToken);
    Task DeleteAsync(OrderItem orderItem, CancellationToken cancellationToken);


}
