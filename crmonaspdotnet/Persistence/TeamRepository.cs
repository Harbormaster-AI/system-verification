
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace crmonaspdotnet.Persistence;

public class TeamRepository : ITeamRepository
{
    private readonly ApplicationDbContext _db;

    public TeamRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Team?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Teams
            .Include(x => x.Organization)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Team>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Teams
            .AsNoTracking()
            .Include(x => x.Organization)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Team team, CancellationToken cancellationToken)
    {
        _db.Teams.Add(team);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Team team, CancellationToken cancellationToken)
    {
        _db.Teams.Update(team);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Team team, CancellationToken cancellationToken)
    {
        _db.Teams.Remove(team);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToUsersAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Users
            .Where(user =>
                request.ChildIds.Contains(user.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    user =>
                        EF.Property<Guid?>(
                            user,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromUsersAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Users
            .Where(user =>
                request.ChildIds.Contains(user.Id) &&
                EF.Property<Guid?>(
                    user,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    user =>
                        EF.Property<Guid?>(
                            user,
                            "EmailMessage_Id"),
                    (Guid?)null));
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
                            "EmailMessage_Id"),
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
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    account =>
                        EF.Property<Guid?>(
                            account,
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

}
