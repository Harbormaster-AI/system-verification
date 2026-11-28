using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface IFXRateRepository
{
    Task<FXRate?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<FXRate>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(FXRate fXRate, CancellationToken cancellationToken);
    Task UpdateAsync(FXRate fXRate, CancellationToken cancellationToken);
    Task DeleteAsync(FXRate fXRate, CancellationToken cancellationToken);


}
