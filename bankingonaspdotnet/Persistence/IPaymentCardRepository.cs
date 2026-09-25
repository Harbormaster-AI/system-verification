using bankingonaspdotnet.Domain;

namespace bankingonaspdotnet.Persistence;

public interface IPaymentCardRepository
{
    Task<PaymentCard?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<PaymentCard>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(PaymentCard paymentCard, CancellationToken cancellationToken);
    Task UpdateAsync(PaymentCard paymentCard, CancellationToken cancellationToken);
    Task DeleteAsync(PaymentCard paymentCard, CancellationToken cancellationToken);

    Task AddToTransactionsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromTransactionsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
