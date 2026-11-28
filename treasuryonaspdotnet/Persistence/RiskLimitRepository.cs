
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class RiskLimitRepository : IRiskLimitRepository
{
    private readonly ApplicationDbContext _db;

    public RiskLimitRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<RiskLimit?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.RiskLimits
            .Include(x => x.Portfolio)
            .Include(x => x.Counterparty)
            .Include(x => x.Policy)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<RiskLimit>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.RiskLimits
            .AsNoTracking()
            .Include(x => x.Portfolio)
            .Include(x => x.Counterparty)
            .Include(x => x.Policy)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(RiskLimit riskLimit, CancellationToken cancellationToken)
    {
        _db.RiskLimits.Add(riskLimit);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(RiskLimit riskLimit, CancellationToken cancellationToken)
    {
        _db.RiskLimits.Update(riskLimit);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(RiskLimit riskLimit, CancellationToken cancellationToken)
    {
        _db.RiskLimits.Remove(riskLimit);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToBreachesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.LimitBreachs
            .Where(limitBreach =>
                request.ChildIds.Contains(limitBreach.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    limitBreach =>
                        EF.Property<Guid?>(
                            limitBreach,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromBreachesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.LimitBreachs
            .Where(limitBreach =>
                request.ChildIds.Contains(limitBreach.Id) &&
                EF.Property<Guid?>(
                    limitBreach,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    limitBreach =>
                        EF.Property<Guid?>(
                            limitBreach,
                            "Holiday_Id"),
                    (Guid?)null));
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
