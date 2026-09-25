using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Persistence;

public interface IInventoryItemRepository
{
    Task<InventoryItem?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<InventoryItem>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(InventoryItem inventoryItem, CancellationToken cancellationToken);
    Task UpdateAsync(InventoryItem inventoryItem, CancellationToken cancellationToken);
    Task DeleteAsync(InventoryItem inventoryItem, CancellationToken cancellationToken);

    Task AddToSerialNumbersAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromSerialNumbersAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToTransactionsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromTransactionsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToReservationsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromReservationsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
