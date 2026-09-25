using bankingonaspdotnet.Domain;

namespace bankingonaspdotnet.Persistence;

public interface IBankingProductRepository
{
    Task<BankingProduct?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<BankingProduct>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(BankingProduct bankingProduct, CancellationToken cancellationToken);
    Task UpdateAsync(BankingProduct bankingProduct, CancellationToken cancellationToken);
    Task DeleteAsync(BankingProduct bankingProduct, CancellationToken cancellationToken);
}
