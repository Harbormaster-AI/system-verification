
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace crmonaspdotnet.Persistence;

public class LeadRepository : ILeadRepository
{
    private readonly ApplicationDbContext _db;

    public LeadRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Lead?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Leads
            .Include(x => x.Organization)
            .Include(x => x.Owner)
            .Include(x => x.ConvertedAccount)
            .Include(x => x.ConvertedContact)
            .Include(x => x.ConvertedOpportunity)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Lead>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Leads
            .AsNoTracking()
            .Include(x => x.Organization)
            .Include(x => x.Owner)
            .Include(x => x.ConvertedAccount)
            .Include(x => x.ConvertedContact)
            .Include(x => x.ConvertedOpportunity)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Lead lead, CancellationToken cancellationToken)
    {
        _db.Leads.Add(lead);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Lead lead, CancellationToken cancellationToken)
    {
        _db.Leads.Update(lead);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Lead lead, CancellationToken cancellationToken)
    {
        _db.Leads.Remove(lead);
        await _db.SaveChangesAsync(cancellationToken);
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
