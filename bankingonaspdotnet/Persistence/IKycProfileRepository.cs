using bankingonaspdotnet.Domain;

namespace bankingonaspdotnet.Persistence;

public interface IKycProfileRepository
{
    Task<KycProfile?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<KycProfile>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(KycProfile kycProfile, CancellationToken cancellationToken);
    Task UpdateAsync(KycProfile kycProfile, CancellationToken cancellationToken);
    Task DeleteAsync(KycProfile kycProfile, CancellationToken cancellationToken);
}
