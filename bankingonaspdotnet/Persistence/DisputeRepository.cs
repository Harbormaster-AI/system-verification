using bankingonaspdotnet.Domain;
using Microsoft.EntityFrameworkCore;

namespace bankingonaspdotnet.Persistence;

public class DisputeRepository : IDisputeRepository
{
    private readonly ApplicationDbContext _db;

    public DisputeRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Dispute?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Disputes
            .Include(x => x.Transaction)
            .Include(x => x.Customer)
            .Include(x => x.Account)
            .Include(x => x.PaymentCard)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Dispute>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Disputes
            .AsNoTracking()
            .Include(x => x.Transaction)
            .Include(x => x.Customer)
            .Include(x => x.Account)
            .Include(x => x.PaymentCard)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Dispute dispute, CancellationToken cancellationToken)
    {
        _db.Disputes.Add(dispute);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Dispute dispute, CancellationToken cancellationToken)
    {
        _db.Disputes.Update(dispute);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Dispute dispute, CancellationToken cancellationToken)
    {
        _db.Disputes.Remove(dispute);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
