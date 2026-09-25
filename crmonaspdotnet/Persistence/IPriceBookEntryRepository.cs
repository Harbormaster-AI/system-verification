using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Persistence;

public interface IPriceBookEntryRepository
{
    Task<PriceBookEntry?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<PriceBookEntry>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(PriceBookEntry priceBookEntry, CancellationToken cancellationToken);
    Task UpdateAsync(PriceBookEntry priceBookEntry, CancellationToken cancellationToken);
    Task DeleteAsync(PriceBookEntry priceBookEntry, CancellationToken cancellationToken);


}
