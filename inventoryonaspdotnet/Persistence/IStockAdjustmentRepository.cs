using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Persistence;

public interface IStockAdjustmentRepository
{
    Task<StockAdjustment?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<StockAdjustment>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(StockAdjustment stockAdjustment, CancellationToken cancellationToken);
    Task UpdateAsync(StockAdjustment stockAdjustment, CancellationToken cancellationToken);
    Task DeleteAsync(StockAdjustment stockAdjustment, CancellationToken cancellationToken);

    Task AddToLinesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromLinesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToTransactionsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromTransactionsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
