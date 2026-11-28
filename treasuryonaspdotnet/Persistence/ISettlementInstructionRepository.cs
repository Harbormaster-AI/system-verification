using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface ISettlementInstructionRepository
{
    Task<SettlementInstruction?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<SettlementInstruction>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(SettlementInstruction settlementInstruction, CancellationToken cancellationToken);
    Task UpdateAsync(SettlementInstruction settlementInstruction, CancellationToken cancellationToken);
    Task DeleteAsync(SettlementInstruction settlementInstruction, CancellationToken cancellationToken);


}
