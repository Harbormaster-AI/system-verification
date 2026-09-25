using bankingonaspdotnet.Domain;

namespace bankingonaspdotnet.Persistence;

public interface ILoanAccountRepository
{
    Task<LoanAccount?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<LoanAccount>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(LoanAccount loanAccount, CancellationToken cancellationToken);
    Task UpdateAsync(LoanAccount loanAccount, CancellationToken cancellationToken);
    Task DeleteAsync(LoanAccount loanAccount, CancellationToken cancellationToken);

    Task AddToBorrowersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromBorrowersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToRepaymentScheduleAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromRepaymentScheduleAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToPaymentsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromPaymentsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToCollateralAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromCollateralAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToFeeChargesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromFeeChargesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
