
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class ApprovalRepository : IApprovalRepository
{
    private readonly ApplicationDbContext _db;

    public ApprovalRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Approval?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Approvals
            .Include(x => x.RiskLimit)
            .Include(x => x.LimitBreach)
            .Include(x => x.Policy)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Approval>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Approvals
            .AsNoTracking()
            .Include(x => x.RiskLimit)
            .Include(x => x.LimitBreach)
            .Include(x => x.Policy)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Approval approval, CancellationToken cancellationToken)
    {
        _db.Approvals.Add(approval);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Approval approval, CancellationToken cancellationToken)
    {
        _db.Approvals.Update(approval);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Approval approval, CancellationToken cancellationToken)
    {
        _db.Approvals.Remove(approval);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
