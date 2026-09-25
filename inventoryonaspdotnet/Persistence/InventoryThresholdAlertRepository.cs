
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace inventoryonaspdotnet.Persistence;

public class InventoryThresholdAlertRepository : IInventoryThresholdAlertRepository
{
    private readonly ApplicationDbContext _db;

    public InventoryThresholdAlertRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<InventoryThresholdAlert?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.InventoryThresholdAlerts
            .Include(x => x.Sku)
            .Include(x => x.Warehouse)
            .Include(x => x.Location)
            .Include(x => x.RelatedPolicy)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<InventoryThresholdAlert>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.InventoryThresholdAlerts
            .AsNoTracking()
            .Include(x => x.Sku)
            .Include(x => x.Warehouse)
            .Include(x => x.Location)
            .Include(x => x.RelatedPolicy)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(InventoryThresholdAlert inventoryThresholdAlert, CancellationToken cancellationToken)
    {
        _db.InventoryThresholdAlerts.Add(inventoryThresholdAlert);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(InventoryThresholdAlert inventoryThresholdAlert, CancellationToken cancellationToken)
    {
        _db.InventoryThresholdAlerts.Update(inventoryThresholdAlert);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(InventoryThresholdAlert inventoryThresholdAlert, CancellationToken cancellationToken)
    {
        _db.InventoryThresholdAlerts.Remove(inventoryThresholdAlert);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
