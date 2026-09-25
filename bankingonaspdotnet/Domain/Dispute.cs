
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Domain;

public class Dispute
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? DisputeId { get; set; } 
 public virtual string? DisputeReference { get; set; } 
 public virtual DateOnly? RaisedOn { get; set; } 
 public virtual string? Reason { get; set; } 
public virtual Transaction? Transaction { get; set; } 
public virtual Customer? Customer { get; set; } 
public virtual Account? Account { get; set; } 
public virtual PaymentCard? PaymentCard { get; set; } 
 public virtual DisputeStatus? Status { get; set; } 

    public static Dispute FromRequest(DisputeRequest request) {
        return new Dispute {
            Id = request.Id,
            DisputeReference = request.DisputeReference,
            RaisedOn = request.RaisedOn,
            Reason = request.Reason,
            Status = request.Status,
        };
    }
}
