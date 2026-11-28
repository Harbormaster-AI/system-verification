
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class BankAccountRepository : IBankAccountRepository
{
    private readonly ApplicationDbContext _db;

    public BankAccountRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<BankAccount?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.BankAccounts
            .Include(x => x.TreasuryUnit)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<BankAccount>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.BankAccounts
            .AsNoTracking()
            .Include(x => x.TreasuryUnit)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(BankAccount bankAccount, CancellationToken cancellationToken)
    {
        _db.BankAccounts.Add(bankAccount);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(BankAccount bankAccount, CancellationToken cancellationToken)
    {
        _db.BankAccounts.Update(bankAccount);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(BankAccount bankAccount, CancellationToken cancellationToken)
    {
        _db.BankAccounts.Remove(bankAccount);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToCashPositionsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.CashPositions
            .Where(cashPosition =>
                request.ChildIds.Contains(cashPosition.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    cashPosition =>
                        EF.Property<Guid?>(
                            cashPosition,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromCashPositionsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.CashPositions
            .Where(cashPosition =>
                request.ChildIds.Contains(cashPosition.Id) &&
                EF.Property<Guid?>(
                    cashPosition,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    cashPosition =>
                        EF.Property<Guid?>(
                            cashPosition,
                            "Holiday_Id"),
                    (Guid?)null));
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
