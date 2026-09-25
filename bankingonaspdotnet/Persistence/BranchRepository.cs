
using bankingonaspdotnet.Contracts;
using bankingonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace bankingonaspdotnet.Persistence;

public class BranchRepository : IBranchRepository
{
    private readonly ApplicationDbContext _db;

    public BranchRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Branch?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Branchs
            .Include(x => x.Bank)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Branch>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Branchs
            .AsNoTracking()
            .Include(x => x.Bank)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Branch branch, CancellationToken cancellationToken)
    {
        _db.Branchs.Add(branch);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Branch branch, CancellationToken cancellationToken)
    {
        _db.Branchs.Update(branch);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Branch branch, CancellationToken cancellationToken)
    {
        _db.Branchs.Remove(branch);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task AddToAccountsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.Accounts
            .Where(account => request.ChildIds.Contains(account.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    account => account.Accounts_Id,
                    request.ParentId));
    }

    public async Task RemoveFromAccountsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.Accounts
            .Where(account =>
                request.ChildIds.Contains(account.Id) &&
                account.Accounts_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    account => account.Accounts_Id,
                    (Guid?)null));
    }

    public async Task AddToLoanAccountsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.LoanAccounts
            .Where(loanAccount => request.ChildIds.Contains(loanAccount.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    loanAccount => loanAccount.LoanAccounts_Id,
                    request.ParentId));
    }

    public async Task RemoveFromLoanAccountsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.LoanAccounts
            .Where(loanAccount =>
                request.ChildIds.Contains(loanAccount.Id) &&
                loanAccount.LoanAccounts_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    loanAccount => loanAccount.LoanAccounts_Id,
                    (Guid?)null));
    }

    public async Task AddToAtmsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.Atms
            .Where(aTM => request.ChildIds.Contains(aTM.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    aTM => aTM.Atms_Id,
                    request.ParentId));
    }

    public async Task RemoveFromAtmsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.Atms
            .Where(aTM =>
                request.ChildIds.Contains(aTM.Id) &&
                aTM.Atms_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    aTM => aTM.Atms_Id,
                    (Guid?)null));
    }

}
