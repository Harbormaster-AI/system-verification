using bankingonaspdotnet.Domain;
using Microsoft.EntityFrameworkCore;

namespace bankingonaspdotnet.Persistence;

public class StandingInstructionRepository : IStandingInstructionRepository
{
    private readonly ApplicationDbContext _db;

    public StandingInstructionRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<StandingInstruction?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.StandingInstructions
            .Include(x => x.Account)
            .Include(x => x.Beneficiary)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<StandingInstruction>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.StandingInstructions
            .AsNoTracking()
            .Include(x => x.Account)
            .Include(x => x.Beneficiary)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(StandingInstruction standingInstruction, CancellationToken cancellationToken)
    {
        _db.StandingInstructions.Add(standingInstruction);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(StandingInstruction standingInstruction, CancellationToken cancellationToken)
    {
        _db.StandingInstructions.Update(standingInstruction);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(StandingInstruction standingInstruction, CancellationToken cancellationToken)
    {
        _db.StandingInstructions.Remove(standingInstruction);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
