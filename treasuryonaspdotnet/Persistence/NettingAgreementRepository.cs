
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class NettingAgreementRepository : INettingAgreementRepository
{
    private readonly ApplicationDbContext _db;

    public NettingAgreementRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<NettingAgreement?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.NettingAgreements
            .Include(x => x.Counterparty)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<NettingAgreement>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.NettingAgreements
            .AsNoTracking()
            .Include(x => x.Counterparty)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(NettingAgreement nettingAgreement, CancellationToken cancellationToken)
    {
        _db.NettingAgreements.Add(nettingAgreement);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(NettingAgreement nettingAgreement, CancellationToken cancellationToken)
    {
        _db.NettingAgreements.Update(nettingAgreement);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(NettingAgreement nettingAgreement, CancellationToken cancellationToken)
    {
        _db.NettingAgreements.Remove(nettingAgreement);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToCollateralAgreementsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.CollateralAgreements
            .Where(collateralAgreement =>
                request.ChildIds.Contains(collateralAgreement.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    collateralAgreement =>
                        EF.Property<Guid?>(
                            collateralAgreement,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromCollateralAgreementsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.CollateralAgreements
            .Where(collateralAgreement =>
                request.ChildIds.Contains(collateralAgreement.Id) &&
                EF.Property<Guid?>(
                    collateralAgreement,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    collateralAgreement =>
                        EF.Property<Guid?>(
                            collateralAgreement,
                            "Holiday_Id"),
                    (Guid?)null));
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

}
