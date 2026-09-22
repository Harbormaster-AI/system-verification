using bankingonaspdotnet.Domain;
using Microsoft.EntityFrameworkCore;

namespace bankingonaspdotnet.Persistence;

public class ExternalAccountRepository : IExternalAccountRepository
{
    private readonly ApplicationDbContext _db;

    public ExternalAccountRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<ExternalAccount?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.ExternalAccounts
            .Include(x => x.Customer)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<ExternalAccount>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.ExternalAccounts
            .AsNoTracking()
            .Include(x => x.Customer)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(ExternalAccount externalAccount, CancellationToken cancellationToken)
    {
        _db.ExternalAccounts.Add(externalAccount);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(ExternalAccount externalAccount, CancellationToken cancellationToken)
    {
        _db.ExternalAccounts.Update(externalAccount);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(ExternalAccount externalAccount, CancellationToken cancellationToken)
    {
        _db.ExternalAccounts.Remove(externalAccount);
        await _db.SaveChangesAsync(cancellationToken);
    }
}
