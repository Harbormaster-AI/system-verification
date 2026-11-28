using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface IAccountingEntryRepository
{
    Task<AccountingEntry?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<AccountingEntry>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(AccountingEntry accountingEntry, CancellationToken cancellationToken);
    Task UpdateAsync(AccountingEntry accountingEntry, CancellationToken cancellationToken);
    Task DeleteAsync(AccountingEntry accountingEntry, CancellationToken cancellationToken);


}
