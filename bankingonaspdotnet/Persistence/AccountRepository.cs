
using bankingonaspdotnet.Contracts;
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


    public async Task AddToOwnersAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Owners
            .Where(customer =>
                request.ChildIds.Contains(customer.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    customer =>
                        EF.Property<Guid?>(
                            customer,
                            "ThirdPartyProvider_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromOwnersAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Owners
            .Where(customer =>
                request.ChildIds.Contains(customer.Id) &&
                EF.Property<Guid?>(
                    customer,
                    "ThirdPartyProvider_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    customer =>
                        EF.Property<Guid?>(
                            customer,
                            "ThirdPartyProvider_Id"),
                    (Guid?)null));
    }


    public async Task AddToTransactionsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Transactions
            .Where(transaction =>
                request.ChildIds.Contains(transaction.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    transaction =>
                        EF.Property<Guid?>(
                            transaction,
                            "ThirdPartyProvider_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromTransactionsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Transactions
            .Where(transaction =>
                request.ChildIds.Contains(transaction.Id) &&
                EF.Property<Guid?>(
                    transaction,
                    "ThirdPartyProvider_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    transaction =>
                        EF.Property<Guid?>(
                            transaction,
                            "ThirdPartyProvider_Id"),
                    (Guid?)null));
    }


    public async Task AddToStatementsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Statements
            .Where(accountStatement =>
                request.ChildIds.Contains(accountStatement.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    accountStatement =>
                        EF.Property<Guid?>(
                            accountStatement,
                            "ThirdPartyProvider_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromStatementsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Statements
            .Where(accountStatement =>
                request.ChildIds.Contains(accountStatement.Id) &&
                EF.Property<Guid?>(
                    accountStatement,
                    "ThirdPartyProvider_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    accountStatement =>
                        EF.Property<Guid?>(
                            accountStatement,
                            "ThirdPartyProvider_Id"),
                    (Guid?)null));
    }


    public async Task AddToStandingInstructionsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.StandingInstructions
            .Where(standingInstruction =>
                request.ChildIds.Contains(standingInstruction.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    standingInstruction =>
                        EF.Property<Guid?>(
                            standingInstruction,
                            "ThirdPartyProvider_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromStandingInstructionsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.StandingInstructions
            .Where(standingInstruction =>
                request.ChildIds.Contains(standingInstruction.Id) &&
                EF.Property<Guid?>(
                    standingInstruction,
                    "ThirdPartyProvider_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    standingInstruction =>
                        EF.Property<Guid?>(
                            standingInstruction,
                            "ThirdPartyProvider_Id"),
                    (Guid?)null));
    }


    public async Task AddToFeeChargesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.FeeCharges
            .Where(feeCharge =>
                request.ChildIds.Contains(feeCharge.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    feeCharge =>
                        EF.Property<Guid?>(
                            feeCharge,
                            "ThirdPartyProvider_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromFeeChargesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.FeeCharges
            .Where(feeCharge =>
                request.ChildIds.Contains(feeCharge.Id) &&
                EF.Property<Guid?>(
                    feeCharge,
                    "ThirdPartyProvider_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    feeCharge =>
                        EF.Property<Guid?>(
                            feeCharge,
                            "ThirdPartyProvider_Id"),
                    (Guid?)null));
    }

}
