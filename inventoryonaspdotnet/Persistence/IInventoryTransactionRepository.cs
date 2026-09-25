using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Persistence;

public interface IInventoryTransactionRepository
{
    Task<InventoryTransaction?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<InventoryTransaction>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(InventoryTransaction inventoryTransaction, CancellationToken cancellationToken);
    Task UpdateAsync(InventoryTransaction inventoryTransaction, CancellationToken cancellationToken);
    Task DeleteAsync(InventoryTransaction inventoryTransaction, CancellationToken cancellationToken);

    Task AddToSerialNumbersAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromSerialNumbersAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
