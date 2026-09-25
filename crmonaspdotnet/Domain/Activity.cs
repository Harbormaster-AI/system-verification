
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Domain;

public class Activity
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? ActivityId { get; set; } 
 public virtual string? Subject { get; set; } 
 public virtual DateOnly? DueDate { get; set; } 
 public virtual DateTime? StartAt { get; set; } 
 public virtual DateTime? EndAt { get; set; } 
 public virtual string? Location { get; set; } 
public virtual Organization? Organization { get; set; } 
public virtual User? Owner { get; set; } 
public virtual Account? Account { get; set; } 
public virtual Contact? Contact { get; set; } 
public virtual Lead? Lead { get; set; } 
public virtual Opportunity? Opportunity { get; set; } 
public virtual Case_? Case_ { get; set; } 
public virtual Campaign? Campaign { get; set; } 
 public virtual ActivityType? ActivityType { get; set; } 
 public virtual ActivityStatus? Status { get; set; } 
 public virtual ActivityPriority? Priority { get; set; } 

    public static Activity FromRequest(ActivityRequest request) {
        return new Activity {
            Id = request.Id,
            Subject = request.Subject,
            DueDate = request.DueDate,
            StartAt = request.StartAt,
            EndAt = request.EndAt,
            Location = request.Location,
            ActivityType = request.ActivityType,
            Status = request.Status,
            Priority = request.Priority,
        };
    }
}
