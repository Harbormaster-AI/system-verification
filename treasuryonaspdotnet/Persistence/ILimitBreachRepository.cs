using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface ILimitBreachRepository
{
    Task<LimitBreach?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<LimitBreach>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(LimitBreach limitBreach, CancellationToken cancellationToken);
    Task UpdateAsync(LimitBreach limitBreach, CancellationToken cancellationToken);
    Task DeleteAsync(LimitBreach limitBreach, CancellationToken cancellationToken);

    Task AddToApprovalsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromApprovalsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
