
using bankingonaspdotnet.Contracts;
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

    public async Task AddToBorrowersAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _db.Borrowers
            .Where(customer => request.ChildIds.Contains(customer.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    customer => customer.Borrowers_Id,
                    request.ParentId));
    }

    public async Task RemoveFromBorrowersAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _db.Borrowers
            .Where(customer =>
                request.ChildIds.Contains(customer.Id) &&
                customer.Borrowers_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    customer => customer.Borrowers_Id,
                    (Guid?)null));
    }

    public async Task AddToRepaymentScheduleAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _db.RepaymentSchedule
            .Where(repaymentSchedule => request.ChildIds.Contains(repaymentSchedule.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    repaymentSchedule => repaymentSchedule.RepaymentSchedule_Id,
                    request.ParentId));
    }

    public async Task RemoveFromRepaymentScheduleAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _db.RepaymentSchedule
            .Where(repaymentSchedule =>
                request.ChildIds.Contains(repaymentSchedule.Id) &&
                repaymentSchedule.RepaymentSchedule_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    repaymentSchedule => repaymentSchedule.RepaymentSchedule_Id,
                    (Guid?)null));
    }

    public async Task AddToPaymentsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _db.Payments
            .Where(loanPayment => request.ChildIds.Contains(loanPayment.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    loanPayment => loanPayment.Payments_Id,
                    request.ParentId));
    }

    public async Task RemoveFromPaymentsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _db.Payments
            .Where(loanPayment =>
                request.ChildIds.Contains(loanPayment.Id) &&
                loanPayment.Payments_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    loanPayment => loanPayment.Payments_Id,
                    (Guid?)null));
    }

    public async Task AddToCollateralAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _db.Collateral
            .Where(collateral => request.ChildIds.Contains(collateral.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    collateral => collateral.Collateral_Id,
                    request.ParentId));
    }

    public async Task RemoveFromCollateralAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _db.Collateral
            .Where(collateral =>
                request.ChildIds.Contains(collateral.Id) &&
                collateral.Collateral_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    collateral => collateral.Collateral_Id,
                    (Guid?)null));
    }

    public async Task AddToFeeChargesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _db.FeeCharges
            .Where(feeCharge => request.ChildIds.Contains(feeCharge.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    feeCharge => feeCharge.FeeCharges_Id,
                    request.ParentId));
    }

    public async Task RemoveFromFeeChargesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _db.FeeCharges
            .Where(feeCharge =>
                request.ChildIds.Contains(feeCharge.Id) &&
                feeCharge.FeeCharges_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    feeCharge => feeCharge.FeeCharges_Id,
                    (Guid?)null));
    }

}
