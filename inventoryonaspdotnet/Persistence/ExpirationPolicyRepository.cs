
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace inventoryonaspdotnet.Persistence;

public class ExpirationPolicyRepository : IExpirationPolicyRepository
{
    private readonly ApplicationDbContext _db;

    public ExpirationPolicyRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<ExpirationPolicy?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.ExpirationPolicys
            .Include(x => x.Sku)
            .Include(x => x.Warehouse)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<ExpirationPolicy>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.ExpirationPolicys
            .AsNoTracking()
            .Include(x => x.Sku)
            .Include(x => x.Warehouse)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(ExpirationPolicy expirationPolicy, CancellationToken cancellationToken)
    {
        _db.ExpirationPolicys.Add(expirationPolicy);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(ExpirationPolicy expirationPolicy, CancellationToken cancellationToken)
    {
        _db.ExpirationPolicys.Update(expirationPolicy);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(ExpirationPolicy expirationPolicy, CancellationToken cancellationToken)
    {
        _db.ExpirationPolicys.Remove(expirationPolicy);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
