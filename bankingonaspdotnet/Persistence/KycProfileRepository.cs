using bankingonaspdotnet.Domain;
using Microsoft.EntityFrameworkCore;

namespace bankingonaspdotnet.Persistence;

public class KycProfileRepository : IKycProfileRepository
{
    private readonly ApplicationDbContext _db;

    public KycProfileRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<KycProfile?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.KycProfiles
            .Include(x => x.Customer)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<KycProfile>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.KycProfiles
            .AsNoTracking()
            .Include(x => x.Customer)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(KycProfile kycProfile, CancellationToken cancellationToken)
    {
        _db.KycProfiles.Add(kycProfile);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(KycProfile kycProfile, CancellationToken cancellationToken)
    {
        _db.KycProfiles.Update(kycProfile);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(KycProfile kycProfile, CancellationToken cancellationToken)
    {
        _db.KycProfiles.Remove(kycProfile);
        await _db.SaveChangesAsync(cancellationToken);
    }
}
