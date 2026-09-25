using bankingonaspdotnet.Domain;

namespace bankingonaspdotnet.Persistence;

public interface IFeeChargeRepository
{
    Task<FeeCharge?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<FeeCharge>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(FeeCharge feeCharge, CancellationToken cancellationToken);
    Task UpdateAsync(FeeCharge feeCharge, CancellationToken cancellationToken);
    Task DeleteAsync(FeeCharge feeCharge, CancellationToken cancellationToken);
}
