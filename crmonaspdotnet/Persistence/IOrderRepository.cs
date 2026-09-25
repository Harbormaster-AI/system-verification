using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Persistence;

public interface IOrderRepository
{
    Task<Order?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Order>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Order order, CancellationToken cancellationToken);
    Task UpdateAsync(Order order, CancellationToken cancellationToken);
    Task DeleteAsync(Order order, CancellationToken cancellationToken);

    Task AddToItemsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromItemsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
