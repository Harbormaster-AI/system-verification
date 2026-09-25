using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Persistence;

public interface IInventoryThresholdAlertRepository
{
    Task<InventoryThresholdAlert?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<InventoryThresholdAlert>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(InventoryThresholdAlert inventoryThresholdAlert, CancellationToken cancellationToken);
    Task UpdateAsync(InventoryThresholdAlert inventoryThresholdAlert, CancellationToken cancellationToken);
    Task DeleteAsync(InventoryThresholdAlert inventoryThresholdAlert, CancellationToken cancellationToken);


}
