using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Persistence;

public interface ILotRepository
{
    Task<Lot?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Lot>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Lot lot, CancellationToken cancellationToken);
    Task UpdateAsync(Lot lot, CancellationToken cancellationToken);
    Task DeleteAsync(Lot lot, CancellationToken cancellationToken);

    Task AddToInventoryItemsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromInventoryItemsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
