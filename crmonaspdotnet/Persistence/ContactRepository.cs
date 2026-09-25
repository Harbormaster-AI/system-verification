
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace crmonaspdotnet.Persistence;

public class ContactRepository : IContactRepository
{
    private readonly ApplicationDbContext _db;

    public ContactRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Contact?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Contacts
            .Include(x => x.Organization)
            .Include(x => x.Account)
            .Include(x => x.Owner)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Contact>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Contacts
            .AsNoTracking()
            .Include(x => x.Organization)
            .Include(x => x.Account)
            .Include(x => x.Owner)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Contact contact, CancellationToken cancellationToken)
    {
        _db.Contacts.Add(contact);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Contact contact, CancellationToken cancellationToken)
    {
        _db.Contacts.Update(contact);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Contact contact, CancellationToken cancellationToken)
    {
        _db.Contacts.Remove(contact);
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
