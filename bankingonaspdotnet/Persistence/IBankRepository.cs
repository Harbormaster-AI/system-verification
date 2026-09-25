using bankingonaspdotnet.Domain;

namespace bankingonaspdotnet.Persistence;

public interface IBankRepository
{
    Task<Bank?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Bank>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Bank bank, CancellationToken cancellationToken);
    Task UpdateAsync(Bank bank, CancellationToken cancellationToken);
    Task DeleteAsync(Bank bank, CancellationToken cancellationToken);
}
