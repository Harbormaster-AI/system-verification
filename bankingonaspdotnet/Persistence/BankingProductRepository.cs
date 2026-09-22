using bankingonaspdotnet.Domain;
using Microsoft.EntityFrameworkCore;

namespace bankingonaspdotnet.Persistence;

public class BankingProductRepository : IBankingProductRepository
{
    private readonly ApplicationDbContext _db;

    public BankingProductRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<BankingProduct?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.BankingProducts
            .Include(x => x.Bank)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<BankingProduct>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.BankingProducts
            .AsNoTracking()
            .Include(x => x.Bank)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(BankingProduct bankingProduct, CancellationToken cancellationToken)
    {
        _db.BankingProducts.Add(bankingProduct);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(BankingProduct bankingProduct, CancellationToken cancellationToken)
    {
        _db.BankingProducts.Update(bankingProduct);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(BankingProduct bankingProduct, CancellationToken cancellationToken)
    {
        _db.BankingProducts.Remove(bankingProduct);
        await _db.SaveChangesAsync(cancellationToken);
    }
}
