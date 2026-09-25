using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Persistence;

public interface IQuoteLineItemRepository
{
    Task<QuoteLineItem?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<QuoteLineItem>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(QuoteLineItem quoteLineItem, CancellationToken cancellationToken);
    Task UpdateAsync(QuoteLineItem quoteLineItem, CancellationToken cancellationToken);
    Task DeleteAsync(QuoteLineItem quoteLineItem, CancellationToken cancellationToken);


}
