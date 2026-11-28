
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class AccountingEntryRepository : IAccountingEntryRepository
{
    private readonly ApplicationDbContext _db;

    public AccountingEntryRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<AccountingEntry?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.AccountingEntrys
            .Include(x => x.Trade)
            .Include(x => x.HedgeRelationship)
            .Include(x => x.Portfolio)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<AccountingEntry>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.AccountingEntrys
            .AsNoTracking()
            .Include(x => x.Trade)
            .Include(x => x.HedgeRelationship)
            .Include(x => x.Portfolio)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(AccountingEntry accountingEntry, CancellationToken cancellationToken)
    {
        _db.AccountingEntrys.Add(accountingEntry);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(AccountingEntry accountingEntry, CancellationToken cancellationToken)
    {
        _db.AccountingEntrys.Update(accountingEntry);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(AccountingEntry accountingEntry, CancellationToken cancellationToken)
    {
        _db.AccountingEntrys.Remove(accountingEntry);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
