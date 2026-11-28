
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class IssuanceRepository : IIssuanceRepository
{
    private readonly ApplicationDbContext _db;

    public IssuanceRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Issuance?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Issuances
            .Include(x => x.FundingProgram)
            .Include(x => x.Portfolio)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Issuance>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Issuances
            .AsNoTracking()
            .Include(x => x.FundingProgram)
            .Include(x => x.Portfolio)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Issuance issuance, CancellationToken cancellationToken)
    {
        _db.Issuances.Add(issuance);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Issuance issuance, CancellationToken cancellationToken)
    {
        _db.Issuances.Update(issuance);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Issuance issuance, CancellationToken cancellationToken)
    {
        _db.Issuances.Remove(issuance);
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
