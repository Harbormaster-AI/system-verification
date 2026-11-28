
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class InternalDealRepository : IInternalDealRepository
{
    private readonly ApplicationDbContext _db;

    public InternalDealRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<InternalDeal?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.InternalDeals
            .Include(x => x.TransferPricingRule)
            .Include(x => x.FromUnit)
            .Include(x => x.ToUnit)
            .Include(x => x.Portfolio)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<InternalDeal>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.InternalDeals
            .AsNoTracking()
            .Include(x => x.TransferPricingRule)
            .Include(x => x.FromUnit)
            .Include(x => x.ToUnit)
            .Include(x => x.Portfolio)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(InternalDeal internalDeal, CancellationToken cancellationToken)
    {
        _db.InternalDeals.Add(internalDeal);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(InternalDeal internalDeal, CancellationToken cancellationToken)
    {
        _db.InternalDeals.Update(internalDeal);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(InternalDeal internalDeal, CancellationToken cancellationToken)
    {
        _db.InternalDeals.Remove(internalDeal);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToCashFlowsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.CashFlows
            .Where(cashFlow =>
                request.ChildIds.Contains(cashFlow.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    cashFlow =>
                        EF.Property<Guid?>(
                            cashFlow,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromCashFlowsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.CashFlows
            .Where(cashFlow =>
                request.ChildIds.Contains(cashFlow.Id) &&
                EF.Property<Guid?>(
                    cashFlow,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    cashFlow =>
                        EF.Property<Guid?>(
                            cashFlow,
                            "Holiday_Id"),
                    (Guid?)null));
    }

}
