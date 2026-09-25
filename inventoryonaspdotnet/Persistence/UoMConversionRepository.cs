
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace inventoryonaspdotnet.Persistence;

public class UoMConversionRepository : IUoMConversionRepository
{
    private readonly ApplicationDbContext _db;

    public UoMConversionRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<UoMConversion?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.UoMConversions
            .Include(x => x.Sku)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<UoMConversion>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.UoMConversions
            .AsNoTracking()
            .Include(x => x.Sku)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(UoMConversion uoMConversion, CancellationToken cancellationToken)
    {
        _db.UoMConversions.Add(uoMConversion);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(UoMConversion uoMConversion, CancellationToken cancellationToken)
    {
        _db.UoMConversions.Update(uoMConversion);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(UoMConversion uoMConversion, CancellationToken cancellationToken)
    {
        _db.UoMConversions.Remove(uoMConversion);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
