using bankingonaspdotnet.Domain;

namespace bankingonaspdotnet.Persistence;

public interface ILoanAccountRepository
{
    Task<LoanAccount?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<LoanAccount>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(LoanAccount loanAccount, CancellationToken cancellationToken);
    Task UpdateAsync(LoanAccount loanAccount, CancellationToken cancellationToken);
    Task DeleteAsync(LoanAccount loanAccount, CancellationToken cancellationToken);
}
