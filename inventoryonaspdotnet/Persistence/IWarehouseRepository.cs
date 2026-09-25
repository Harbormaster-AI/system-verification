using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Persistence;

public interface IWarehouseRepository
{
    Task<Warehouse?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Warehouse>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Warehouse warehouse, CancellationToken cancellationToken);
    Task UpdateAsync(Warehouse warehouse, CancellationToken cancellationToken);
    Task DeleteAsync(Warehouse warehouse, CancellationToken cancellationToken);

    Task AddToStorageLocationsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromStorageLocationsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToInventoryItemsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromInventoryItemsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToInboundShipmentsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromInboundShipmentsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToOutboundAllocationsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromOutboundAllocationsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToOriginTransfersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromOriginTransfersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToDestinationTransfersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromDestinationTransfersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToCycleCountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromCycleCountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
