
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class PositionRepository : IPositionRepository
{
    private readonly ApplicationDbContext _db;

    public PositionRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Position?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Positions
            .Include(x => x.Portfolio)
            .Include(x => x.Trade)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Position>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Positions
            .AsNoTracking()
            .Include(x => x.Portfolio)
            .Include(x => x.Trade)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Position position, CancellationToken cancellationToken)
    {
        _db.Positions.Add(position);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Position position, CancellationToken cancellationToken)
    {
        _db.Positions.Update(position);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Position position, CancellationToken cancellationToken)
    {
        _db.Positions.Remove(position);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
