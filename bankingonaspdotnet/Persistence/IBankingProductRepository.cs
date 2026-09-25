using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Persistence;

public interface IBankingProductRepository
{
    Task<BankingProduct?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<BankingProduct>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(BankingProduct bankingProduct, CancellationToken cancellationToken);
    Task UpdateAsync(BankingProduct bankingProduct, CancellationToken cancellationToken);
    Task DeleteAsync(BankingProduct bankingProduct, CancellationToken cancellationToken);

    Task AddToAccountsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromAccountsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToLoanAccountsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromLoanAccountsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToPaymentCardsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromPaymentCardsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
