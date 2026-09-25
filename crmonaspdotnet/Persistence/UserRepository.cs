
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace crmonaspdotnet.Persistence;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _db;

    public UserRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<User?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Users
            .Include(x => x.Organization)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<User>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Users
            .AsNoTracking()
            .Include(x => x.Organization)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(User user, CancellationToken cancellationToken)
    {
        _db.Users.Add(user);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(User user, CancellationToken cancellationToken)
    {
        _db.Users.Update(user);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(User user, CancellationToken cancellationToken)
    {
        _db.Users.Remove(user);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToTeamsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Teams
            .Where(team =>
                request.ChildIds.Contains(team.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    team =>
                        EF.Property<Guid?>(
                            team,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromTeamsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Teams
            .Where(team =>
                request.ChildIds.Contains(team.Id) &&
                EF.Property<Guid?>(
                    team,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    team =>
                        EF.Property<Guid?>(
                            team,
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


    public async Task AddToOwnedAccountsAsync(
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

    public async Task RemoveFromOwnedAccountsAsync(
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


    public async Task AddToOwnedLeadsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Leads
            .Where(lead =>
                request.ChildIds.Contains(lead.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    lead =>
                        EF.Property<Guid?>(
                            lead,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromOwnedLeadsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Leads
            .Where(lead =>
                request.ChildIds.Contains(lead.Id) &&
                EF.Property<Guid?>(
                    lead,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    lead =>
                        EF.Property<Guid?>(
                            lead,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }


    public async Task AddToOwnedOpportunitiesAsync(
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

    public async Task RemoveFromOwnedOpportunitiesAsync(
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


    public async Task AddToOwnedCasesAsync(
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

    public async Task RemoveFromOwnedCasesAsync(
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
