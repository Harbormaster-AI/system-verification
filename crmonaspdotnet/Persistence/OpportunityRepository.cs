
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace crmonaspdotnet.Persistence;

public class OpportunityRepository : IOpportunityRepository
{
    private readonly ApplicationDbContext _db;

    public OpportunityRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Opportunity?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Opportunitys
            .Include(x => x.Organization)
            .Include(x => x.Account)
            .Include(x => x.Owner)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Opportunity>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Opportunitys
            .AsNoTracking()
            .Include(x => x.Organization)
            .Include(x => x.Account)
            .Include(x => x.Owner)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Opportunity opportunity, CancellationToken cancellationToken)
    {
        _db.Opportunitys.Add(opportunity);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Opportunity opportunity, CancellationToken cancellationToken)
    {
        _db.Opportunitys.Update(opportunity);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Opportunity opportunity, CancellationToken cancellationToken)
    {
        _db.Opportunitys.Remove(opportunity);
        await _db.SaveChangesAsync(cancellationToken);
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


    public async Task AddToLineItemsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.OpportunityLineItems
            .Where(opportunityLineItem =>
                request.ChildIds.Contains(opportunityLineItem.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    opportunityLineItem =>
                        EF.Property<Guid?>(
                            opportunityLineItem,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromLineItemsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.OpportunityLineItems
            .Where(opportunityLineItem =>
                request.ChildIds.Contains(opportunityLineItem.Id) &&
                EF.Property<Guid?>(
                    opportunityLineItem,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    opportunityLineItem =>
                        EF.Property<Guid?>(
                            opportunityLineItem,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }


    public async Task AddToStageHistoryAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.OpportunityStageHistorys
            .Where(opportunityStageHistory =>
                request.ChildIds.Contains(opportunityStageHistory.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    opportunityStageHistory =>
                        EF.Property<Guid?>(
                            opportunityStageHistory,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromStageHistoryAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.OpportunityStageHistorys
            .Where(opportunityStageHistory =>
                request.ChildIds.Contains(opportunityStageHistory.Id) &&
                EF.Property<Guid?>(
                    opportunityStageHistory,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    opportunityStageHistory =>
                        EF.Property<Guid?>(
                            opportunityStageHistory,
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

}
