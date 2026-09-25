using bankingonaspdotnet.Domain;

namespace bankingonaspdotnet.Persistence;

public interface IFXTradeRepository
{
    Task<FXTrade?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<FXTrade>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(FXTrade fXTrade, CancellationToken cancellationToken);
    Task UpdateAsync(FXTrade fXTrade, CancellationToken cancellationToken);
    Task DeleteAsync(FXTrade fXTrade, CancellationToken cancellationToken);


}
