using bankingonaspdotnet.Domain;

namespace bankingonaspdotnet.Persistence;

public interface IFundsTransferRepository
{
    Task<FundsTransfer?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<FundsTransfer>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(FundsTransfer fundsTransfer, CancellationToken cancellationToken);
    Task UpdateAsync(FundsTransfer fundsTransfer, CancellationToken cancellationToken);
    Task DeleteAsync(FundsTransfer fundsTransfer, CancellationToken cancellationToken);
}
