using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Persistence;

public interface IStockKeepingUnitRepository
{
    Task<StockKeepingUnit?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<StockKeepingUnit>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(StockKeepingUnit stockKeepingUnit, CancellationToken cancellationToken);
    Task UpdateAsync(StockKeepingUnit stockKeepingUnit, CancellationToken cancellationToken);
    Task DeleteAsync(StockKeepingUnit stockKeepingUnit, CancellationToken cancellationToken);

    Task AddToInventoryItemsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromInventoryItemsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToUomConversionsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromUomConversionsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToReplenishmentPoliciesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromReplenishmentPoliciesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToLotsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromLotsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToSerialNumbersAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromSerialNumbersAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
