using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Persistence;

public interface IPriceBookRepository
{
    Task<PriceBook?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<PriceBook>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(PriceBook priceBook, CancellationToken cancellationToken);
    Task UpdateAsync(PriceBook priceBook, CancellationToken cancellationToken);
    Task DeleteAsync(PriceBook priceBook, CancellationToken cancellationToken);

    Task AddToEntriesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromEntriesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToQuotesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromQuotesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToOrdersAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromOrdersAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
