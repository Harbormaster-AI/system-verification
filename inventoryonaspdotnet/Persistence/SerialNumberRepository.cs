
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace inventoryonaspdotnet.Persistence;

public class SerialNumberRepository : ISerialNumberRepository
{
    private readonly ApplicationDbContext _db;

    public SerialNumberRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<SerialNumber?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.SerialNumbers
            .Include(x => x.Sku)
            .Include(x => x.CurrentInventoryItem)
            .Include(x => x.Lot)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<SerialNumber>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.SerialNumbers
            .AsNoTracking()
            .Include(x => x.Sku)
            .Include(x => x.CurrentInventoryItem)
            .Include(x => x.Lot)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(SerialNumber serialNumber, CancellationToken cancellationToken)
    {
        _db.SerialNumbers.Add(serialNumber);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(SerialNumber serialNumber, CancellationToken cancellationToken)
    {
        _db.SerialNumbers.Update(serialNumber);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(SerialNumber serialNumber, CancellationToken cancellationToken)
    {
        _db.SerialNumbers.Remove(serialNumber);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
