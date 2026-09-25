using bankingonaspdotnet.Domain;

namespace bankingonaspdotnet.Persistence;

public interface IATMRepository
{
    Task<ATM?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<ATM>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(ATM aTM, CancellationToken cancellationToken);
    Task UpdateAsync(ATM aTM, CancellationToken cancellationToken);
    Task DeleteAsync(ATM aTM, CancellationToken cancellationToken);
}
