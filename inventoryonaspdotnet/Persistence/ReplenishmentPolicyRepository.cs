
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace inventoryonaspdotnet.Persistence;

public class ReplenishmentPolicyRepository : IReplenishmentPolicyRepository
{
    private readonly ApplicationDbContext _db;

    public ReplenishmentPolicyRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<ReplenishmentPolicy?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.ReplenishmentPolicys
            .Include(x => x.Sku)
            .Include(x => x.Warehouse)
            .Include(x => x.Location)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<ReplenishmentPolicy>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.ReplenishmentPolicys
            .AsNoTracking()
            .Include(x => x.Sku)
            .Include(x => x.Warehouse)
            .Include(x => x.Location)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(ReplenishmentPolicy replenishmentPolicy, CancellationToken cancellationToken)
    {
        _db.ReplenishmentPolicys.Add(replenishmentPolicy);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(ReplenishmentPolicy replenishmentPolicy, CancellationToken cancellationToken)
    {
        _db.ReplenishmentPolicys.Update(replenishmentPolicy);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(ReplenishmentPolicy replenishmentPolicy, CancellationToken cancellationToken)
    {
        _db.ReplenishmentPolicys.Remove(replenishmentPolicy);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
