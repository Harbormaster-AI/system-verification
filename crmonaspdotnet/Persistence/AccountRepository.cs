
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace crmonaspdotnet.Persistence;

public class AccountRepository : IAccountRepository
{
    private readonly ApplicationDbContext _db;

    public AccountRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Account?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Accounts
            .Include(x => x.Organization)
            .Include(x => x.ParentAccount)
            .Include(x => x.Owner)
            .Include(x => x.Territory)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Account>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Accounts
            .AsNoTracking()
            .Include(x => x.Organization)
            .Include(x => x.ParentAccount)
            .Include(x => x.Owner)
            .Include(x => x.Territory)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Account account, CancellationToken cancellationToken)
    {
        _db.Accounts.Add(account);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Account account, CancellationToken cancellationToken)
    {
        _db.Accounts.Update(account);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Account account, CancellationToken cancellationToken)
    {
        _db.Accounts.Remove(account);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToChildAccountsAsync(
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
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromChildAccountsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Accounts
            .Where(account =>
                request.ChildIds.Contains(account.Id) &&
                EF.Property<Guid?>(
                    account,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    account =>
                        EF.Property<Guid?>(
                            account,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }


    public async Task AddToContactsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Contacts
            .Where(contact =>
                request.ChildIds.Contains(contact.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    contact =>
                        EF.Property<Guid?>(
                            contact,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromContactsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Contacts
            .Where(contact =>
                request.ChildIds.Contains(contact.Id) &&
                EF.Property<Guid?>(
                    contact,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    contact =>
                        EF.Property<Guid?>(
                            contact,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }


    public async Task AddToOpportunitiesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Opportunitys
            .Where(opportunity =>
                request.ChildIds.Contains(opportunity.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    opportunity =>
                        EF.Property<Guid?>(
                            opportunity,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromOpportunitiesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Opportunitys
            .Where(opportunity =>
                request.ChildIds.Contains(opportunity.Id) &&
                EF.Property<Guid?>(
                    opportunity,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    opportunity =>
                        EF.Property<Guid?>(
                            opportunity,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }


    public async Task AddToCasesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Case_s
            .Where(case_ =>
                request.ChildIds.Contains(case_.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    case_ =>
                        EF.Property<Guid?>(
                            case_,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromCasesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Case_s
            .Where(case_ =>
                request.ChildIds.Contains(case_.Id) &&
                EF.Property<Guid?>(
                    case_,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    case_ =>
                        EF.Property<Guid?>(
                            case_,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }


    public async Task AddToActivitiesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Activitys
            .Where(activity =>
                request.ChildIds.Contains(activity.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    activity =>
                        EF.Property<Guid?>(
                            activity,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromActivitiesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Activitys
            .Where(activity =>
                request.ChildIds.Contains(activity.Id) &&
                EF.Property<Guid?>(
                    activity,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    activity =>
                        EF.Property<Guid?>(
                            activity,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }


    public async Task AddToCampaignsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Campaigns
            .Where(campaign =>
                request.ChildIds.Contains(campaign.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    campaign =>
                        EF.Property<Guid?>(
                            campaign,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromCampaignsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Campaigns
            .Where(campaign =>
                request.ChildIds.Contains(campaign.Id) &&
                EF.Property<Guid?>(
                    campaign,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    campaign =>
                        EF.Property<Guid?>(
                            campaign,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }


    public async Task AddToQuotesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Quotes
            .Where(quote =>
                request.ChildIds.Contains(quote.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    quote =>
                        EF.Property<Guid?>(
                            quote,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromQuotesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Quotes
            .Where(quote =>
                request.ChildIds.Contains(quote.Id) &&
                EF.Property<Guid?>(
                    quote,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    quote =>
                        EF.Property<Guid?>(
                            quote,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }


    public async Task AddToOrdersAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Orders
            .Where(order =>
                request.ChildIds.Contains(order.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    order =>
                        EF.Property<Guid?>(
                            order,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromOrdersAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Orders
            .Where(order =>
                request.ChildIds.Contains(order.Id) &&
                EF.Property<Guid?>(
                    order,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    order =>
                        EF.Property<Guid?>(
                            order,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }


    public async Task AddToContractsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Contracts
            .Where(contract =>
                request.ChildIds.Contains(contract.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    contract =>
                        EF.Property<Guid?>(
                            contract,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromContractsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Contracts
            .Where(contract =>
                request.ChildIds.Contains(contract.Id) &&
                EF.Property<Guid?>(
                    contract,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    contract =>
                        EF.Property<Guid?>(
                            contract,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }


    public async Task AddToNotesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Notes
            .Where(note =>
                request.ChildIds.Contains(note.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    note =>
                        EF.Property<Guid?>(
                            note,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromNotesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Notes
            .Where(note =>
                request.ChildIds.Contains(note.Id) &&
                EF.Property<Guid?>(
                    note,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    note =>
                        EF.Property<Guid?>(
                            note,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }


    public async Task AddToEmailMessagesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.EmailMessages
            .Where(emailMessage =>
                request.ChildIds.Contains(emailMessage.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    emailMessage =>
                        EF.Property<Guid?>(
                            emailMessage,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromEmailMessagesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.EmailMessages
            .Where(emailMessage =>
                request.ChildIds.Contains(emailMessage.Id) &&
                EF.Property<Guid?>(
                    emailMessage,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    emailMessage =>
                        EF.Property<Guid?>(
                            emailMessage,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }

}
