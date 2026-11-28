using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface ICurveQuoteRepository
{
    Task<CurveQuote?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<CurveQuote>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(CurveQuote curveQuote, CancellationToken cancellationToken);
    Task UpdateAsync(CurveQuote curveQuote, CancellationToken cancellationToken);
    Task DeleteAsync(CurveQuote curveQuote, CancellationToken cancellationToken);


}
