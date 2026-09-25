using bankingonaspdotnet.Domain;

namespace bankingonaspdotnet.Persistence;

public interface IStandingInstructionRepository
{
    Task<StandingInstruction?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<StandingInstruction>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(StandingInstruction standingInstruction, CancellationToken cancellationToken);
    Task UpdateAsync(StandingInstruction standingInstruction, CancellationToken cancellationToken);
    Task DeleteAsync(StandingInstruction standingInstruction, CancellationToken cancellationToken);
}
