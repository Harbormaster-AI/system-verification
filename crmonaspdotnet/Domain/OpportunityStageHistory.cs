
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Domain;

public class OpportunityStageHistory
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? OpportunitystagehistoryId { get; set; } 
 public virtual DateTime? ChangedAt { get; set; } 
 public virtual string? Comment { get; set; } 
public virtual Opportunity? Opportunity { get; set; } 
public virtual User? ChangedBy { get; set; } 
 public virtual OpportunityStage? FromStage { get; set; } 
 public virtual OpportunityStage? ToStage { get; set; } 

    public static OpportunityStageHistory FromRequest(OpportunityStageHistoryRequest request) {
        return new OpportunityStageHistory {
            Id = request.Id,
            ChangedAt = request.ChangedAt,
            Comment = request.Comment,
            FromStage = request.FromStage,
            ToStage = request.ToStage,
        };
    }
}
