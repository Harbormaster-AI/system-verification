
using bankingonaspdotnet.Contracts;
using bankingonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace bankingonaspdotnet.Persistence;

public class BankingProductRepository : IBankingProductRepository
{
    private readonly ApplicationDbContext _db;

    public BankingProductRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<BankingProduct?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.BankingProducts
            .Include(x => x.Bank)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<BankingProduct>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.BankingProducts
            .AsNoTracking()
            .Include(x => x.Bank)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(BankingProduct bankingProduct, CancellationToken cancellationToken)
    {
        _db.BankingProducts.Add(bankingProduct);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(BankingProduct bankingProduct, CancellationToken cancellationToken)
    {
        _db.BankingProducts.Update(bankingProduct);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(BankingProduct bankingProduct, CancellationToken cancellationToken)
    {
        _db.BankingProducts.Remove(bankingProduct);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToAccountsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Accounts
            .Where(account =>
                request.ChildIds.Contains(account.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    account =>
                        EF.Property<Guid?>(
                            account,
                            "ThirdPartyProvider_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromAccountsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Accounts
            .Where(account =>
                request.ChildIds.Contains(account.Id) &&
                EF.Property<Guid?>(
                    account,
                    "ThirdPartyProvider_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    account =>
                        EF.Property<Guid?>(
                            account,
                            "ThirdPartyProvider_Id"),
                    (Guid?)null));
    }


    public async Task AddToLoanAccountsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.LoanAccounts
            .Where(loanAccount =>
                request.ChildIds.Contains(loanAccount.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    loanAccount =>
                        EF.Property<Guid?>(
                            loanAccount,
                            "ThirdPartyProvider_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromLoanAccountsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.LoanAccounts
            .Where(loanAccount =>
                request.ChildIds.Contains(loanAccount.Id) &&
                EF.Property<Guid?>(
                    loanAccount,
                    "ThirdPartyProvider_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    loanAccount =>
                        EF.Property<Guid?>(
                            loanAccount,
                            "ThirdPartyProvider_Id"),
                    (Guid?)null));
    }


    public async Task AddToPaymentCardsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.PaymentCards
            .Where(paymentCard =>
                request.ChildIds.Contains(paymentCard.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    paymentCard =>
                        EF.Property<Guid?>(
                            paymentCard,
                            "ThirdPartyProvider_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromPaymentCardsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.PaymentCards
            .Where(paymentCard =>
                request.ChildIds.Contains(paymentCard.Id) &&
                EF.Property<Guid?>(
                    paymentCard,
                    "ThirdPartyProvider_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    paymentCard =>
                        EF.Property<Guid?>(
                            paymentCard,
                            "ThirdPartyProvider_Id"),
                    (Guid?)null));
    }

}
