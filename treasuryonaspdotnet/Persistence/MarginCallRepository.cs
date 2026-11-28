
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class MarginCallRepository : IMarginCallRepository
{
    private readonly ApplicationDbContext _db;

    public MarginCallRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<MarginCall?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.MarginCalls
            .Include(x => x.CollateralAgreement)
            .Include(x => x.CollateralAccount)
            .Include(x => x.Counterparty)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<MarginCall>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.MarginCalls
            .AsNoTracking()
            .Include(x => x.CollateralAgreement)
            .Include(x => x.CollateralAccount)
            .Include(x => x.Counterparty)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(MarginCall marginCall, CancellationToken cancellationToken)
    {
        _db.MarginCalls.Add(marginCall);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(MarginCall marginCall, CancellationToken cancellationToken)
    {
        _db.MarginCalls.Update(marginCall);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(MarginCall marginCall, CancellationToken cancellationToken)
    {
        _db.MarginCalls.Remove(marginCall);
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
