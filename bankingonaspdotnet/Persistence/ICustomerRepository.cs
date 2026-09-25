using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Persistence;

public interface ICustomerRepository
{
    Task<Customer?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Customer>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Customer customer, CancellationToken cancellationToken);
    Task UpdateAsync(Customer customer, CancellationToken cancellationToken);
    Task DeleteAsync(Customer customer, CancellationToken cancellationToken);

    Task AddToAccountsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromAccountsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToLoanAccountsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromLoanAccountsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToPaymentCardsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromPaymentCardsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToExternalAccountsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromExternalAccountsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToFundsTransfersAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromFundsTransfersAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToDisputesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromDisputesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToKycProfilesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromKycProfilesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToConsentsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromConsentsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
