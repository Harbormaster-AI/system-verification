
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class SettlementInstructionRepository : ISettlementInstructionRepository
{
    private readonly ApplicationDbContext _db;

    public SettlementInstructionRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<SettlementInstruction?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.SettlementInstructions
            .Include(x => x.Trade)
            .Include(x => x.Counterparty)
            .Include(x => x.BankAccount)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<SettlementInstruction>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.SettlementInstructions
            .AsNoTracking()
            .Include(x => x.Trade)
            .Include(x => x.Counterparty)
            .Include(x => x.BankAccount)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(SettlementInstruction settlementInstruction, CancellationToken cancellationToken)
    {
        _db.SettlementInstructions.Add(settlementInstruction);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(SettlementInstruction settlementInstruction, CancellationToken cancellationToken)
    {
        _db.SettlementInstructions.Update(settlementInstruction);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(SettlementInstruction settlementInstruction, CancellationToken cancellationToken)
    {
        _db.SettlementInstructions.Remove(settlementInstruction);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
