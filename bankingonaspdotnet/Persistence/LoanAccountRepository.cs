using bankingonaspdotnet.Domain;
using Microsoft.EntityFrameworkCore;

namespace bankingonaspdotnet.Persistence;

public class LoanAccountRepository : ILoanAccountRepository
{
    private readonly ApplicationDbContext _db;

    public LoanAccountRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<LoanAccount?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.LoanAccounts
            .Include(x => x.Bank)
            .Include(x => x.Branch)
            .Include(x => x.Product)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<LoanAccount>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.LoanAccounts
            .AsNoTracking()
            .Include(x => x.Bank)
            .Include(x => x.Branch)
            .Include(x => x.Product)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(LoanAccount loanAccount, CancellationToken cancellationToken)
    {
        _db.LoanAccounts.Add(loanAccount);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(LoanAccount loanAccount, CancellationToken cancellationToken)
    {
        _db.LoanAccounts.Update(loanAccount);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(LoanAccount loanAccount, CancellationToken cancellationToken)
    {
        _db.LoanAccounts.Remove(loanAccount);
        await _db.SaveChangesAsync(cancellationToken);
    }
}
