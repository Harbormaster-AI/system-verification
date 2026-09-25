using bankingonaspdotnet.Domain;

namespace bankingonaspdotnet.Persistence;

public interface IExternalAccountRepository
{
    Task<ExternalAccount?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<ExternalAccount>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(ExternalAccount externalAccount, CancellationToken cancellationToken);
    Task UpdateAsync(ExternalAccount externalAccount, CancellationToken cancellationToken);
    Task DeleteAsync(ExternalAccount externalAccount, CancellationToken cancellationToken);

    Task AddToTransactionsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromTransactionsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
