
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class CollateralAgreementRepository : ICollateralAgreementRepository
{
    private readonly ApplicationDbContext _db;

    public CollateralAgreementRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<CollateralAgreement?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.CollateralAgreements
            .Include(x => x.NettingAgreement)
            .Include(x => x.Counterparty)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<CollateralAgreement>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.CollateralAgreements
            .AsNoTracking()
            .Include(x => x.NettingAgreement)
            .Include(x => x.Counterparty)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(CollateralAgreement collateralAgreement, CancellationToken cancellationToken)
    {
        _db.CollateralAgreements.Add(collateralAgreement);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(CollateralAgreement collateralAgreement, CancellationToken cancellationToken)
    {
        _db.CollateralAgreements.Update(collateralAgreement);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(CollateralAgreement collateralAgreement, CancellationToken cancellationToken)
    {
        _db.CollateralAgreements.Remove(collateralAgreement);
        await _db.SaveChangesAsync(cancellationToken);
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


    public async Task AddToCollateralAccountsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.CollateralAccounts
            .Where(collateralAccount =>
                request.ChildIds.Contains(collateralAccount.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    collateralAccount =>
                        EF.Property<Guid?>(
                            collateralAccount,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromCollateralAccountsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.CollateralAccounts
            .Where(collateralAccount =>
                request.ChildIds.Contains(collateralAccount.Id) &&
                EF.Property<Guid?>(
                    collateralAccount,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    collateralAccount =>
                        EF.Property<Guid?>(
                            collateralAccount,
                            "Holiday_Id"),
                    (Guid?)null));
    }

}
