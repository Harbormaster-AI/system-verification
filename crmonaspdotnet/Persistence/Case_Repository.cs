
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace crmonaspdotnet.Persistence;

public class Case_Repository : ICase_Repository
{
    private readonly ApplicationDbContext _db;

    public Case_Repository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Case_?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Case_s
            .Include(x => x.Organization)
            .Include(x => x.Account)
            .Include(x => x.Contact)
            .Include(x => x.Owner)
            .Include(x => x.Team)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Case_>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Case_s
            .AsNoTracking()
            .Include(x => x.Organization)
            .Include(x => x.Account)
            .Include(x => x.Contact)
            .Include(x => x.Owner)
            .Include(x => x.Team)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Case_ case_, CancellationToken cancellationToken)
    {
        _db.Case_s.Add(case_);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Case_ case_, CancellationToken cancellationToken)
    {
        _db.Case_s.Update(case_);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Case_ case_, CancellationToken cancellationToken)
    {
        _db.Case_s.Remove(case_);
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


    public async Task AddToCaseCommentsAsync(
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

    public async Task RemoveFromCaseCommentsAsync(
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


    public async Task AddToEmailsAsync(
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

    public async Task RemoveFromEmailsAsync(
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


    public async Task AddToRelatedOpportunitiesAsync(
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

    public async Task RemoveFromRelatedOpportunitiesAsync(
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

}
