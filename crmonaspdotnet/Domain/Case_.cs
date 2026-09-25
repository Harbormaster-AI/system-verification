
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Domain;

public class Case_
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? Case_Id { get; set; } 
 public virtual string? CaseNumber { get; set; } 
 public virtual string? Subject { get; set; } 
 public virtual string? Description { get; set; } 
 public virtual DateTime? SlaDue { get; set; } 
public virtual Organization? Organization { get; set; } 
public virtual Account? Account { get; set; } 
public virtual Contact? Contact { get; set; } 
public virtual User? Owner { get; set; } 
public virtual Team? Team { get; set; } 
public virtual ICollection<Activity> Activities { get; set; } = new List<Activity>();
public virtual ICollection<Note> CaseComments { get; set; } = new List<Note>();
public virtual ICollection<EmailMessage> Emails { get; set; } = new List<EmailMessage>();
public virtual ICollection<Opportunity> RelatedOpportunities { get; set; } = new List<Opportunity>();
 public virtual CaseStatus? Status { get; set; } 
 public virtual CasePriority? Priority { get; set; } 
 public virtual CaseOrigin? Origin { get; set; } 
 public virtual CaseSeverity? Severity { get; set; } 

    public static Case_ FromRequest(Case_Request request) {
        return new Case_ {
            Id = request.Id,
            CaseNumber = request.CaseNumber,
            Subject = request.Subject,
            Description = request.Description,
            SlaDue = request.SlaDue,
            Status = request.Status,
            Priority = request.Priority,
            Origin = request.Origin,
            Severity = request.Severity,
        };
    }
}
