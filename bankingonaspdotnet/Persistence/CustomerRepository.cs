
using bankingonaspdotnet.Contracts;
using bankingonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace bankingonaspdotnet.Persistence;

public class CustomerRepository : ICustomerRepository
{
    private readonly ApplicationDbContext _db;

    public CustomerRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Customer?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Customers
            .Include(x => x.Bank)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Customer>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Customers
            .AsNoTracking()
            .Include(x => x.Bank)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Customer customer, CancellationToken cancellationToken)
    {
        _db.Customers.Add(customer);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Customer customer, CancellationToken cancellationToken)
    {
        _db.Customers.Update(customer);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Customer customer, CancellationToken cancellationToken)
    {
        _db.Customers.Remove(customer);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task AddToAccountsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _db.Accounts
            .Where(account => request.ChildIds.Contains(account.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    account => account.Accounts_Id,
                    request.ParentId));
    }

    public async Task RemoveFromAccountsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _db.Accounts
            .Where(account =>
                request.ChildIds.Contains(account.Id) &&
                account.Accounts_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    account => account.Accounts_Id,
                    (Guid?)null));
    }

    public async Task AddToLoanAccountsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _db.LoanAccounts
            .Where(loanAccount => request.ChildIds.Contains(loanAccount.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    loanAccount => loanAccount.LoanAccounts_Id,
                    request.ParentId));
    }

    public async Task RemoveFromLoanAccountsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _db.LoanAccounts
            .Where(loanAccount =>
                request.ChildIds.Contains(loanAccount.Id) &&
                loanAccount.LoanAccounts_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    loanAccount => loanAccount.LoanAccounts_Id,
                    (Guid?)null));
    }

    public async Task AddToPaymentCardsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _db.PaymentCards
            .Where(paymentCard => request.ChildIds.Contains(paymentCard.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    paymentCard => paymentCard.PaymentCards_Id,
                    request.ParentId));
    }

    public async Task RemoveFromPaymentCardsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _db.PaymentCards
            .Where(paymentCard =>
                request.ChildIds.Contains(paymentCard.Id) &&
                paymentCard.PaymentCards_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    paymentCard => paymentCard.PaymentCards_Id,
                    (Guid?)null));
    }

    public async Task AddToExternalAccountsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _db.ExternalAccounts
            .Where(externalAccount => request.ChildIds.Contains(externalAccount.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    externalAccount => externalAccount.ExternalAccounts_Id,
                    request.ParentId));
    }

    public async Task RemoveFromExternalAccountsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _db.ExternalAccounts
            .Where(externalAccount =>
                request.ChildIds.Contains(externalAccount.Id) &&
                externalAccount.ExternalAccounts_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    externalAccount => externalAccount.ExternalAccounts_Id,
                    (Guid?)null));
    }

    public async Task AddToFundsTransfersAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _db.FundsTransfers
            .Where(fundsTransfer => request.ChildIds.Contains(fundsTransfer.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    fundsTransfer => fundsTransfer.FundsTransfers_Id,
                    request.ParentId));
    }

    public async Task RemoveFromFundsTransfersAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _db.FundsTransfers
            .Where(fundsTransfer =>
                request.ChildIds.Contains(fundsTransfer.Id) &&
                fundsTransfer.FundsTransfers_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    fundsTransfer => fundsTransfer.FundsTransfers_Id,
                    (Guid?)null));
    }

    public async Task AddToDisputesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _db.Disputes
            .Where(dispute => request.ChildIds.Contains(dispute.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    dispute => dispute.Disputes_Id,
                    request.ParentId));
    }

    public async Task RemoveFromDisputesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _db.Disputes
            .Where(dispute =>
                request.ChildIds.Contains(dispute.Id) &&
                dispute.Disputes_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    dispute => dispute.Disputes_Id,
                    (Guid?)null));
    }

    public async Task AddToKycProfilesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _db.KycProfiles
            .Where(kycProfile => request.ChildIds.Contains(kycProfile.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    kycProfile => kycProfile.KycProfiles_Id,
                    request.ParentId));
    }

    public async Task RemoveFromKycProfilesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _db.KycProfiles
            .Where(kycProfile =>
                request.ChildIds.Contains(kycProfile.Id) &&
                kycProfile.KycProfiles_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    kycProfile => kycProfile.KycProfiles_Id,
                    (Guid?)null));
    }

    public async Task AddToConsentsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _db.Consents
            .Where(consent => request.ChildIds.Contains(consent.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    consent => consent.Consents_Id,
                    request.ParentId));
    }

    public async Task RemoveFromConsentsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _db.Consents
            .Where(consent =>
                request.ChildIds.Contains(consent.Id) &&
                consent.Consents_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    consent => consent.Consents_Id,
                    (Guid?)null));
    }

}
