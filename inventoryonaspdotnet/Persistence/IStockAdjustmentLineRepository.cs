using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Persistence;

public interface IStockAdjustmentLineRepository
{
    Task<StockAdjustmentLine?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<StockAdjustmentLine>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(StockAdjustmentLine stockAdjustmentLine, CancellationToken cancellationToken);
    Task UpdateAsync(StockAdjustmentLine stockAdjustmentLine, CancellationToken cancellationToken);
    Task DeleteAsync(StockAdjustmentLine stockAdjustmentLine, CancellationToken cancellationToken);

    Task AddToSerialNumbersAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromSerialNumbersAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
