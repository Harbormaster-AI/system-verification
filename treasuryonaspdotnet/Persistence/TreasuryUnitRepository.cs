
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class TreasuryUnitRepository : ITreasuryUnitRepository
{
    private readonly ApplicationDbContext _db;

    public TreasuryUnitRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<TreasuryUnit?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.TreasuryUnits
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<TreasuryUnit>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.TreasuryUnits
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(TreasuryUnit treasuryUnit, CancellationToken cancellationToken)
    {
        _db.TreasuryUnits.Add(treasuryUnit);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(TreasuryUnit treasuryUnit, CancellationToken cancellationToken)
    {
        _db.TreasuryUnits.Update(treasuryUnit);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(TreasuryUnit treasuryUnit, CancellationToken cancellationToken)
    {
        _db.TreasuryUnits.Remove(treasuryUnit);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToTradingBooksAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.TradingBooks
            .Where(tradingBook =>
                request.ChildIds.Contains(tradingBook.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    tradingBook =>
                        EF.Property<Guid?>(
                            tradingBook,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromTradingBooksAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.TradingBooks
            .Where(tradingBook =>
                request.ChildIds.Contains(tradingBook.Id) &&
                EF.Property<Guid?>(
                    tradingBook,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    tradingBook =>
                        EF.Property<Guid?>(
                            tradingBook,
                            "Holiday_Id"),
                    (Guid?)null));
    }


    public async Task AddToBankAccountsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.BankAccounts
            .Where(bankAccount =>
                request.ChildIds.Contains(bankAccount.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    bankAccount =>
                        EF.Property<Guid?>(
                            bankAccount,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromBankAccountsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.BankAccounts
            .Where(bankAccount =>
                request.ChildIds.Contains(bankAccount.Id) &&
                EF.Property<Guid?>(
                    bankAccount,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    bankAccount =>
                        EF.Property<Guid?>(
                            bankAccount,
                            "Holiday_Id"),
                    (Guid?)null));
    }


    public async Task AddToPoliciesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.TreasuryPolicys
            .Where(treasuryPolicy =>
                request.ChildIds.Contains(treasuryPolicy.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    treasuryPolicy =>
                        EF.Property<Guid?>(
                            treasuryPolicy,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromPoliciesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.TreasuryPolicys
            .Where(treasuryPolicy =>
                request.ChildIds.Contains(treasuryPolicy.Id) &&
                EF.Property<Guid?>(
                    treasuryPolicy,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    treasuryPolicy =>
                        EF.Property<Guid?>(
                            treasuryPolicy,
                            "Holiday_Id"),
                    (Guid?)null));
    }


    public async Task AddToTransferPricingRulesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.TransferPricingRules
            .Where(transferPricingRule =>
                request.ChildIds.Contains(transferPricingRule.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    transferPricingRule =>
                        EF.Property<Guid?>(
                            transferPricingRule,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromTransferPricingRulesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.TransferPricingRules
            .Where(transferPricingRule =>
                request.ChildIds.Contains(transferPricingRule.Id) &&
                EF.Property<Guid?>(
                    transferPricingRule,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    transferPricingRule =>
                        EF.Property<Guid?>(
                            transferPricingRule,
                            "Holiday_Id"),
                    (Guid?)null));
    }


    public async Task AddToInternalDealsOutAsync(
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

    public async Task RemoveFromInternalDealsOutAsync(
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


    public async Task AddToInternalDealsInAsync(
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

    public async Task RemoveFromInternalDealsInAsync(
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
