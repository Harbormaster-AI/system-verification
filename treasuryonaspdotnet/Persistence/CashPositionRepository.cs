
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class CashPositionRepository : ICashPositionRepository
{
    private readonly ApplicationDbContext _db;

    public CashPositionRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<CashPosition?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.CashPositions
            .Include(x => x.BankAccount)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<CashPosition>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.CashPositions
            .AsNoTracking()
            .Include(x => x.BankAccount)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(CashPosition cashPosition, CancellationToken cancellationToken)
    {
        _db.CashPositions.Add(cashPosition);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(CashPosition cashPosition, CancellationToken cancellationToken)
    {
        _db.CashPositions.Update(cashPosition);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(CashPosition cashPosition, CancellationToken cancellationToken)
    {
        _db.CashPositions.Remove(cashPosition);
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
