using bankingonaspdotnet.Domain;
using Microsoft.EntityFrameworkCore;

namespace bankingonaspdotnet.Persistence;

public class IdentityDocumentRepository : IIdentityDocumentRepository
{
    private readonly ApplicationDbContext _db;

    public IdentityDocumentRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<IdentityDocument?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.IdentityDocuments
            .Include(x => x.KycProfile)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<IdentityDocument>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.IdentityDocuments
            .AsNoTracking()
            .Include(x => x.KycProfile)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(IdentityDocument identityDocument, CancellationToken cancellationToken)
    {
        _db.IdentityDocuments.Add(identityDocument);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(IdentityDocument identityDocument, CancellationToken cancellationToken)
    {
        _db.IdentityDocuments.Update(identityDocument);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(IdentityDocument identityDocument, CancellationToken cancellationToken)
    {
        _db.IdentityDocuments.Remove(identityDocument);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
