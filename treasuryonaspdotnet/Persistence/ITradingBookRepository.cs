using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface ITradingBookRepository
{
    Task<TradingBook?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<TradingBook>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(TradingBook tradingBook, CancellationToken cancellationToken);
    Task UpdateAsync(TradingBook tradingBook, CancellationToken cancellationToken);
    Task DeleteAsync(TradingBook tradingBook, CancellationToken cancellationToken);

    Task AddToPortfoliosAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromPortfoliosAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToLimitsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromLimitsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToTradesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromTradesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
