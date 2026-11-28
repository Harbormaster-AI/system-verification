
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class CashFlowRepository : ICashFlowRepository
{
    private readonly ApplicationDbContext _db;

    public CashFlowRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<CashFlow?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.CashFlows
            .Include(x => x.Trade)
            .Include(x => x.CashPosition)
            .Include(x => x.MarginCall)
            .Include(x => x.BankAccount)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<CashFlow>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.CashFlows
            .AsNoTracking()
            .Include(x => x.Trade)
            .Include(x => x.CashPosition)
            .Include(x => x.MarginCall)
            .Include(x => x.BankAccount)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(CashFlow cashFlow, CancellationToken cancellationToken)
    {
        _db.CashFlows.Add(cashFlow);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(CashFlow cashFlow, CancellationToken cancellationToken)
    {
        _db.CashFlows.Update(cashFlow);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(CashFlow cashFlow, CancellationToken cancellationToken)
    {
        _db.CashFlows.Remove(cashFlow);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
