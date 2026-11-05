using demo.Domain;
using demo.Contracts;

namespace demo.Persistence;

public interface ILoanPaymentRepository
{
    Task<LoanPayment?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<LoanPayment>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(LoanPayment loanPayment, CancellationToken cancellationToken);
    Task UpdateAsync(LoanPayment loanPayment, CancellationToken cancellationToken);
    Task DeleteAsync(LoanPayment loanPayment, CancellationToken cancellationToken);


}
