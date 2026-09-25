using bankingonaspdotnet.Domain;
using Microsoft.EntityFrameworkCore;

namespace bankingonaspdotnet.Persistence;

public class BankRepository : IBankRepository
{
    private readonly ApplicationDbContext _db;

    public BankRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Bank?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Banks
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Bank>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Banks
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Bank bank, CancellationToken cancellationToken)
    {
        _db.Banks.Add(bank);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Bank bank, CancellationToken cancellationToken)
    {
        _db.Banks.Update(bank);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Bank bank, CancellationToken cancellationToken)
    {
        _db.Banks.Remove(bank);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task AddToBranchesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.Branches
            .Where(branch => request.ChildIds.Contains(branch.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    branch => branch.{ roleName}
        _Id,
                    request.ParentId));
    }

    public async Task RemoveFromBranchesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.Branches
            .Where(branch =>
                request.ChildIds.Contains(branch.Id) &&
                branch.Branches_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    branch => branch.Branches_Id,
                    (Guid?)null));
    }

    public async Task AddToProductsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.Products
            .Where(bankingProduct => request.ChildIds.Contains(bankingProduct.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    bankingProduct => bankingProduct.{ roleName}
        _Id,
                    request.ParentId));
    }

    public async Task RemoveFromProductsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.Products
            .Where(bankingProduct =>
                request.ChildIds.Contains(bankingProduct.Id) &&
                bankingProduct.Products_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    bankingProduct => bankingProduct.Products_Id,
                    (Guid?)null));
    }

    public async Task AddToCustomersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.Customers
            .Where(customer => request.ChildIds.Contains(customer.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    customer => customer.{ roleName}
        _Id,
                    request.ParentId));
    }

    public async Task RemoveFromCustomersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.Customers
            .Where(customer =>
                request.ChildIds.Contains(customer.Id) &&
                customer.Customers_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    customer => customer.Customers_Id,
                    (Guid?)null));
    }

    public async Task AddToAccountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.Accounts
            .Where(account => request.ChildIds.Contains(account.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    account => account.{ roleName}
        _Id,
                    request.ParentId));
    }

    public async Task RemoveFromAccountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.Accounts
            .Where(account =>
                request.ChildIds.Contains(account.Id) &&
                account.Accounts_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    account => account.Accounts_Id,
                    (Guid?)null));
    }

    public async Task AddToPaymentCardsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.PaymentCards
            .Where(paymentCard => request.ChildIds.Contains(paymentCard.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    paymentCard => paymentCard.{ roleName}
        _Id,
                    request.ParentId));
    }

    public async Task RemoveFromPaymentCardsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.PaymentCards
            .Where(paymentCard =>
                request.ChildIds.Contains(paymentCard.Id) &&
                paymentCard.PaymentCards_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    paymentCard => paymentCard.PaymentCards_Id,
                    (Guid?)null));
    }

    public async Task AddToLoanAccountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.LoanAccounts
            .Where(loanAccount => request.ChildIds.Contains(loanAccount.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    loanAccount => loanAccount.{ roleName}
        _Id,
                    request.ParentId));
    }

    public async Task RemoveFromLoanAccountsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.LoanAccounts
            .Where(loanAccount =>
                request.ChildIds.Contains(loanAccount.Id) &&
                loanAccount.LoanAccounts_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    loanAccount => loanAccount.LoanAccounts_Id,
                    (Guid?)null));
    }

    public async Task AddToExchangeRatesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.ExchangeRates
            .Where(exchangeRate => request.ChildIds.Contains(exchangeRate.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    exchangeRate => exchangeRate.{ roleName}
        _Id,
                    request.ParentId));
    }

    public async Task RemoveFromExchangeRatesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.ExchangeRates
            .Where(exchangeRate =>
                request.ChildIds.Contains(exchangeRate.Id) &&
                exchangeRate.ExchangeRates_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    exchangeRate => exchangeRate.ExchangeRates_Id,
                    (Guid?)null));
    }

    public async Task AddToConsentsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.Consents
            .Where(consent => request.ChildIds.Contains(consent.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    consent => consent.{ roleName}
        _Id,
                    request.ParentId));
    }

    public async Task RemoveFromConsentsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.Consents
            .Where(consent =>
                request.ChildIds.Contains(consent.Id) &&
                consent.Consents_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    consent => consent.Consents_Id,
                    (Guid?)null));
    }

    public async Task AddToThirdPartyProvidersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.ThirdPartyProviders
            .Where(thirdPartyProvider => request.ChildIds.Contains(thirdPartyProvider.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    thirdPartyProvider => thirdPartyProvider.{ roleName}
        _Id,
                    request.ParentId));
    }

    public async Task RemoveFromThirdPartyProvidersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.ThirdPartyProviders
            .Where(thirdPartyProvider =>
                request.ChildIds.Contains(thirdPartyProvider.Id) &&
                thirdPartyProvider.ThirdPartyProviders_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    thirdPartyProvider => thirdPartyProvider.ThirdPartyProviders_Id,
                    (Guid?)null));
    }

}
