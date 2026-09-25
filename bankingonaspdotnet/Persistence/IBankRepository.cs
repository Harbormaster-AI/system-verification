using bankingonaspdotnet.Domain;

namespace bankingonaspdotnet.Persistence;

public interface IBankRepository
{
    Task<Bank?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Bank>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Bank bank, CancellationToken cancellationToken);
    Task UpdateAsync(Bank bank, CancellationToken cancellationToken);
    Task DeleteAsync(Bank bank, CancellationToken cancellationToken);

    Task AddToBranchesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromBranchesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToProductsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromProductsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToCustomersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromCustomersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToAccountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromAccountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToPaymentCardsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromPaymentCardsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToLoanAccountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromLoanAccountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToExchangeRatesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromExchangeRatesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToConsentsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromConsentsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToThirdPartyProvidersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromThirdPartyProvidersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
