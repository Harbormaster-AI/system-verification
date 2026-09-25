using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Persistence;

public interface IReplenishmentPolicyRepository
{
    Task<ReplenishmentPolicy?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<ReplenishmentPolicy>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(ReplenishmentPolicy replenishmentPolicy, CancellationToken cancellationToken);
    Task UpdateAsync(ReplenishmentPolicy replenishmentPolicy, CancellationToken cancellationToken);
    Task DeleteAsync(ReplenishmentPolicy replenishmentPolicy, CancellationToken cancellationToken);


}
