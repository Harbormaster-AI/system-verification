using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Persistence;

public interface IExpirationPolicyRepository
{
    Task<ExpirationPolicy?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<ExpirationPolicy>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(ExpirationPolicy expirationPolicy, CancellationToken cancellationToken);
    Task UpdateAsync(ExpirationPolicy expirationPolicy, CancellationToken cancellationToken);
    Task DeleteAsync(ExpirationPolicy expirationPolicy, CancellationToken cancellationToken);


}
