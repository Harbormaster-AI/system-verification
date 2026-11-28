using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface IApprovalRepository
{
    Task<Approval?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Approval>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Approval approval, CancellationToken cancellationToken);
    Task UpdateAsync(Approval approval, CancellationToken cancellationToken);
    Task DeleteAsync(Approval approval, CancellationToken cancellationToken);


}
