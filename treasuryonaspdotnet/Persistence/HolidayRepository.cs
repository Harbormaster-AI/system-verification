
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class HolidayRepository : IHolidayRepository
{
    private readonly ApplicationDbContext _db;

    public HolidayRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Holiday?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Holidays
            .Include(x => x.Calendar)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Holiday>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Holidays
            .AsNoTracking()
            .Include(x => x.Calendar)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Holiday holiday, CancellationToken cancellationToken)
    {
        _db.Holidays.Add(holiday);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Holiday holiday, CancellationToken cancellationToken)
    {
        _db.Holidays.Update(holiday);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Holiday holiday, CancellationToken cancellationToken)
    {
        _db.Holidays.Remove(holiday);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
