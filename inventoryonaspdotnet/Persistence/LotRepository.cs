
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace inventoryonaspdotnet.Persistence;

public class LotRepository : ILotRepository
{
    private readonly ApplicationDbContext _db;

    public LotRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Lot?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Lots
            .Include(x => x.Sku)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Lot>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Lots
            .AsNoTracking()
            .Include(x => x.Sku)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Lot lot, CancellationToken cancellationToken)
    {
        _db.Lots.Add(lot);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Lot lot, CancellationToken cancellationToken)
    {
        _db.Lots.Update(lot);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Lot lot, CancellationToken cancellationToken)
    {
        _db.Lots.Remove(lot);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToInventoryItemsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.InventoryItems
            .Where(inventoryItem =>
                request.ChildIds.Contains(inventoryItem.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    inventoryItem =>
                        EF.Property<Guid?>(
                            inventoryItem,
                            "OutboundAllocation_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromInventoryItemsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.InventoryItems
            .Where(inventoryItem =>
                request.ChildIds.Contains(inventoryItem.Id) &&
                EF.Property<Guid?>(
                    inventoryItem,
                    "OutboundAllocation_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    inventoryItem =>
                        EF.Property<Guid?>(
                            inventoryItem,
                            "OutboundAllocation_Id"),
                    (Guid?)null));
    }

}
