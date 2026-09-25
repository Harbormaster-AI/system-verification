using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Persistence;

public interface IAccountRepository
{
    Task<Account?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Account>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Account account, CancellationToken cancellationToken);
    Task UpdateAsync(Account account, CancellationToken cancellationToken);
    Task DeleteAsync(Account account, CancellationToken cancellationToken);

    Task AddToOwnersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromOwnersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToTransactionsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromTransactionsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToStatementsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromStatementsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToStandingInstructionsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromStandingInstructionsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToFeeChargesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromFeeChargesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
