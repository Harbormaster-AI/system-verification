using bankingonaspdotnet.Domain;
using Microsoft.EntityFrameworkCore;

namespace bankingonaspdotnet.Persistence;

public class BankRepository : IBankRepository
{
    private readonly ApplicationDbContext _db;

    public BankRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Bank?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Banks
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Bank>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Banks
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Bank bank, CancellationToken cancellationToken)
    {
        _db.Banks.Add(bank);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Bank bank, CancellationToken cancellationToken)
    {
        _db.Banks.Update(bank);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Bank bank, CancellationToken cancellationToken)
    {
        _db.Banks.Remove(bank);
        await _db.SaveChangesAsync(cancellationToken);
    }
}
