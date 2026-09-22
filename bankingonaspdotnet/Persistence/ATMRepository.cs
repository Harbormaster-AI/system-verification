using bankingonaspdotnet.Domain;
using Microsoft.EntityFrameworkCore;

namespace bankingonaspdotnet.Persistence;

public class ATMRepository : IATMRepository
{
    private readonly ApplicationDbContext _db;

    public ATMRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<ATM?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.ATMs
            .Include(x => x.Branch)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<ATM>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.ATMs
            .AsNoTracking()
            .Include(x => x.Branch)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(ATM aTM, CancellationToken cancellationToken)
    {
        _db.ATMs.Add(aTM);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(ATM aTM, CancellationToken cancellationToken)
    {
        _db.ATMs.Update(aTM);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(ATM aTM, CancellationToken cancellationToken)
    {
        _db.ATMs.Remove(aTM);
        await _db.SaveChangesAsync(cancellationToken);
    }
}
