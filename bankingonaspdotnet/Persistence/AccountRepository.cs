using bankingonaspdotnet.Domain;
using Microsoft.EntityFrameworkCore;

namespace bankingonaspdotnet.Persistence;

public class AccountRepository : IAccountRepository
{
    private readonly ApplicationDbContext _db;

    public AccountRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Account?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Accounts
            .Include(x => x.Bank)
            .Include(x => x.Branch)
            .Include(x => x.Product)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Account>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Accounts
            .AsNoTracking()
            .Include(x => x.Bank)
            .Include(x => x.Branch)
            .Include(x => x.Product)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Account account, CancellationToken cancellationToken)
    {
        _db.Accounts.Add(account);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Account account, CancellationToken cancellationToken)
    {
        _db.Accounts.Update(account);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Account account, CancellationToken cancellationToken)
    {
        _db.Accounts.Remove(account);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task AddToOwnersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.Owners
            .Where(customer => request.ChildIds.Contains(customer.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    customer => customer.{ roleName}
        _Id,
                    request.ParentId));
    }

    public async Task RemoveFromOwnersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.Owners
            .Where(customer =>
                request.ChildIds.Contains(customer.Id) &&
                customer.Owners_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    customer => customer.Owners_Id,
                    (Guid?)null));
    }

    public async Task AddToTransactionsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.Transactions
            .Where(transaction => request.ChildIds.Contains(transaction.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    transaction => transaction.{ roleName}
        _Id,
                    request.ParentId));
    }

    public async Task RemoveFromTransactionsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.Transactions
            .Where(transaction =>
                request.ChildIds.Contains(transaction.Id) &&
                transaction.Transactions_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    transaction => transaction.Transactions_Id,
                    (Guid?)null));
    }

    public async Task AddToStatementsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.Statements
            .Where(accountStatement => request.ChildIds.Contains(accountStatement.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    accountStatement => accountStatement.{ roleName}
        _Id,
                    request.ParentId));
    }

    public async Task RemoveFromStatementsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.Statements
            .Where(accountStatement =>
                request.ChildIds.Contains(accountStatement.Id) &&
                accountStatement.Statements_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    accountStatement => accountStatement.Statements_Id,
                    (Guid?)null));
    }

    public async Task AddToStandingInstructionsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.StandingInstructions
            .Where(standingInstruction => request.ChildIds.Contains(standingInstruction.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    standingInstruction => standingInstruction.{ roleName}
        _Id,
                    request.ParentId));
    }

    public async Task RemoveFromStandingInstructionsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.StandingInstructions
            .Where(standingInstruction =>
                request.ChildIds.Contains(standingInstruction.Id) &&
                standingInstruction.StandingInstructions_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    standingInstruction => standingInstruction.StandingInstructions_Id,
                    (Guid?)null));
    }

    public async Task AddToFeeChargesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.FeeCharges
            .Where(feeCharge => request.ChildIds.Contains(feeCharge.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    feeCharge => feeCharge.{ roleName}
        _Id,
                    request.ParentId));
    }

    public async Task RemoveFromFeeChargesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.FeeCharges
            .Where(feeCharge =>
                request.ChildIds.Contains(feeCharge.Id) &&
                feeCharge.FeeCharges_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    feeCharge => feeCharge.FeeCharges_Id,
                    (Guid?)null));
    }

}
