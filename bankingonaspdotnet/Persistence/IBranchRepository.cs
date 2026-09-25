using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Persistence;

public interface IBranchRepository
{
    Task<Branch?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Branch>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Branch branch, CancellationToken cancellationToken);
    Task UpdateAsync(Branch branch, CancellationToken cancellationToken);
    Task DeleteAsync(Branch branch, CancellationToken cancellationToken);

    Task AddToAccountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromAccountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToLoanAccountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromLoanAccountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToAtmsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromAtmsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
