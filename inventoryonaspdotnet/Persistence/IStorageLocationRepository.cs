using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Persistence;

public interface IStorageLocationRepository
{
    Task<StorageLocation?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<StorageLocation>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(StorageLocation storageLocation, CancellationToken cancellationToken);
    Task UpdateAsync(StorageLocation storageLocation, CancellationToken cancellationToken);
    Task DeleteAsync(StorageLocation storageLocation, CancellationToken cancellationToken);

    Task AddToChildLocationsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromChildLocationsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToInventoryItemsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromInventoryItemsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
