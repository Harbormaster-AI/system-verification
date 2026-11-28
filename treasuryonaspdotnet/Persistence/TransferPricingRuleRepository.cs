
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class TransferPricingRuleRepository : ITransferPricingRuleRepository
{
    private readonly ApplicationDbContext _db;

    public TransferPricingRuleRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<TransferPricingRule?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.TransferPricingRules
            .Include(x => x.TreasuryUnit)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<TransferPricingRule>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.TransferPricingRules
            .AsNoTracking()
            .Include(x => x.TreasuryUnit)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(TransferPricingRule transferPricingRule, CancellationToken cancellationToken)
    {
        _db.TransferPricingRules.Add(transferPricingRule);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(TransferPricingRule transferPricingRule, CancellationToken cancellationToken)
    {
        _db.TransferPricingRules.Update(transferPricingRule);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(TransferPricingRule transferPricingRule, CancellationToken cancellationToken)
    {
        _db.TransferPricingRules.Remove(transferPricingRule);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToAppliedDealsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.InternalDeals
            .Where(internalDeal =>
                request.ChildIds.Contains(internalDeal.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    internalDeal =>
                        EF.Property<Guid?>(
                            internalDeal,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromAppliedDealsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.InternalDeals
            .Where(internalDeal =>
                request.ChildIds.Contains(internalDeal.Id) &&
                EF.Property<Guid?>(
                    internalDeal,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    internalDeal =>
                        EF.Property<Guid?>(
                            internalDeal,
                            "Holiday_Id"),
                    (Guid?)null));
    }

}
