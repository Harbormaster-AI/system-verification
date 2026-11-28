
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class LimitBreachRepository : ILimitBreachRepository
{
    private readonly ApplicationDbContext _db;

    public LimitBreachRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<LimitBreach?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.LimitBreachs
            .Include(x => x.RiskLimit)
            .Include(x => x.Portfolio)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<LimitBreach>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.LimitBreachs
            .AsNoTracking()
            .Include(x => x.RiskLimit)
            .Include(x => x.Portfolio)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(LimitBreach limitBreach, CancellationToken cancellationToken)
    {
        _db.LimitBreachs.Add(limitBreach);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(LimitBreach limitBreach, CancellationToken cancellationToken)
    {
        _db.LimitBreachs.Update(limitBreach);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(LimitBreach limitBreach, CancellationToken cancellationToken)
    {
        _db.LimitBreachs.Remove(limitBreach);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToApprovalsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Approvals
            .Where(approval =>
                request.ChildIds.Contains(approval.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    approval =>
                        EF.Property<Guid?>(
                            approval,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromApprovalsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Approvals
            .Where(approval =>
                request.ChildIds.Contains(approval.Id) &&
                EF.Property<Guid?>(
                    approval,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    approval =>
                        EF.Property<Guid?>(
                            approval,
                            "Holiday_Id"),
                    (Guid?)null));
    }

}
