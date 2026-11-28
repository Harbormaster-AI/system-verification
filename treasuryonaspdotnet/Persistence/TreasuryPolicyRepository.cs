
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class TreasuryPolicyRepository : ITreasuryPolicyRepository
{
    private readonly ApplicationDbContext _db;

    public TreasuryPolicyRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<TreasuryPolicy?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.TreasuryPolicys
            .Include(x => x.TreasuryUnit)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<TreasuryPolicy>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.TreasuryPolicys
            .AsNoTracking()
            .Include(x => x.TreasuryUnit)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(TreasuryPolicy treasuryPolicy, CancellationToken cancellationToken)
    {
        _db.TreasuryPolicys.Add(treasuryPolicy);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(TreasuryPolicy treasuryPolicy, CancellationToken cancellationToken)
    {
        _db.TreasuryPolicys.Update(treasuryPolicy);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(TreasuryPolicy treasuryPolicy, CancellationToken cancellationToken)
    {
        _db.TreasuryPolicys.Remove(treasuryPolicy);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToLimitsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.RiskLimits
            .Where(riskLimit =>
                request.ChildIds.Contains(riskLimit.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    riskLimit =>
                        EF.Property<Guid?>(
                            riskLimit,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromLimitsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.RiskLimits
            .Where(riskLimit =>
                request.ChildIds.Contains(riskLimit.Id) &&
                EF.Property<Guid?>(
                    riskLimit,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    riskLimit =>
                        EF.Property<Guid?>(
                            riskLimit,
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
