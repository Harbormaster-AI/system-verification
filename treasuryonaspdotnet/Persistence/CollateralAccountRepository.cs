
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class CollateralAccountRepository : ICollateralAccountRepository
{
    private readonly ApplicationDbContext _db;

    public CollateralAccountRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<CollateralAccount?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.CollateralAccounts
            .Include(x => x.CollateralAgreement)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<CollateralAccount>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.CollateralAccounts
            .AsNoTracking()
            .Include(x => x.CollateralAgreement)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(CollateralAccount collateralAccount, CancellationToken cancellationToken)
    {
        _db.CollateralAccounts.Add(collateralAccount);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(CollateralAccount collateralAccount, CancellationToken cancellationToken)
    {
        _db.CollateralAccounts.Update(collateralAccount);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(CollateralAccount collateralAccount, CancellationToken cancellationToken)
    {
        _db.CollateralAccounts.Remove(collateralAccount);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToTradesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Trades
            .Where(trade =>
                request.ChildIds.Contains(trade.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    trade =>
                        EF.Property<Guid?>(
                            trade,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromTradesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Trades
            .Where(trade =>
                request.ChildIds.Contains(trade.Id) &&
                EF.Property<Guid?>(
                    trade,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    trade =>
                        EF.Property<Guid?>(
                            trade,
                            "Holiday_Id"),
                    (Guid?)null));
    }


    public async Task AddToMarginCallsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.MarginCalls
            .Where(marginCall =>
                request.ChildIds.Contains(marginCall.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    marginCall =>
                        EF.Property<Guid?>(
                            marginCall,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromMarginCallsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.MarginCalls
            .Where(marginCall =>
                request.ChildIds.Contains(marginCall.Id) &&
                EF.Property<Guid?>(
                    marginCall,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    marginCall =>
                        EF.Property<Guid?>(
                            marginCall,
                            "Holiday_Id"),
                    (Guid?)null));
    }

}
