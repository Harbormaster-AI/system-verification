
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace crmonaspdotnet.Persistence;

public class CampaignRepository : ICampaignRepository
{
    private readonly ApplicationDbContext _db;

    public CampaignRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Campaign?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Campaigns
            .Include(x => x.Organization)
            .Include(x => x.ParentCampaign)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Campaign>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Campaigns
            .AsNoTracking()
            .Include(x => x.Organization)
            .Include(x => x.ParentCampaign)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Campaign campaign, CancellationToken cancellationToken)
    {
        _db.Campaigns.Add(campaign);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Campaign campaign, CancellationToken cancellationToken)
    {
        _db.Campaigns.Update(campaign);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Campaign campaign, CancellationToken cancellationToken)
    {
        _db.Campaigns.Remove(campaign);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToChildCampaignsAsync(
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

    public async Task RemoveFromChildCampaignsAsync(
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


    public async Task AddToMembersAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.CampaignMembers
            .Where(campaignMember =>
                request.ChildIds.Contains(campaignMember.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    campaignMember =>
                        EF.Property<Guid?>(
                            campaignMember,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromMembersAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.CampaignMembers
            .Where(campaignMember =>
                request.ChildIds.Contains(campaignMember.Id) &&
                EF.Property<Guid?>(
                    campaignMember,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    campaignMember =>
                        EF.Property<Guid?>(
                            campaignMember,
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


    public async Task AddToLeadsAsync(
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

    public async Task RemoveFromLeadsAsync(
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

}
