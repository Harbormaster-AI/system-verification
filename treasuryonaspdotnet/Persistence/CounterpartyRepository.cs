
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class CounterpartyRepository : ICounterpartyRepository
{
    private readonly ApplicationDbContext _db;

    public CounterpartyRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Counterparty?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Counterpartys
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Counterparty>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Counterpartys
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Counterparty counterparty, CancellationToken cancellationToken)
    {
        _db.Counterpartys.Add(counterparty);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Counterparty counterparty, CancellationToken cancellationToken)
    {
        _db.Counterpartys.Update(counterparty);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Counterparty counterparty, CancellationToken cancellationToken)
    {
        _db.Counterpartys.Remove(counterparty);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToNettingAgreementsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.NettingAgreements
            .Where(nettingAgreement =>
                request.ChildIds.Contains(nettingAgreement.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    nettingAgreement =>
                        EF.Property<Guid?>(
                            nettingAgreement,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromNettingAgreementsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.NettingAgreements
            .Where(nettingAgreement =>
                request.ChildIds.Contains(nettingAgreement.Id) &&
                EF.Property<Guid?>(
                    nettingAgreement,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    nettingAgreement =>
                        EF.Property<Guid?>(
                            nettingAgreement,
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


    public async Task AddToSettlementInstructionsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.SettlementInstructions
            .Where(settlementInstruction =>
                request.ChildIds.Contains(settlementInstruction.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    settlementInstruction =>
                        EF.Property<Guid?>(
                            settlementInstruction,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromSettlementInstructionsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.SettlementInstructions
            .Where(settlementInstruction =>
                request.ChildIds.Contains(settlementInstruction.Id) &&
                EF.Property<Guid?>(
                    settlementInstruction,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    settlementInstruction =>
                        EF.Property<Guid?>(
                            settlementInstruction,
                            "Holiday_Id"),
                    (Guid?)null));
    }

}
