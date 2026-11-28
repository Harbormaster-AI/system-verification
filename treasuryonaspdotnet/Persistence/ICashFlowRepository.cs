using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface ICashFlowRepository
{
    Task<CashFlow?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<CashFlow>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(CashFlow cashFlow, CancellationToken cancellationToken);
    Task UpdateAsync(CashFlow cashFlow, CancellationToken cancellationToken);
    Task DeleteAsync(CashFlow cashFlow, CancellationToken cancellationToken);


}
