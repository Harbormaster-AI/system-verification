
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class LimitBreach : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

 [Required]
public required virtual DateOnly BreachDate { get; set; } 
 [Required]
public required virtual decimal ObservedValue { get; set; } 
 [Required]
[Length(0, int.MaxValue)]
public required virtual string Severity { get; set; } 
public virtual RiskLimit? RiskLimit { get; set; } 
public virtual Portfolio? Portfolio { get; set; } 
public virtual ICollection<Approval> Approvals { get; set; } = new List<Approval>();
 public virtual LimitBreachStatus? Status { get; set; } 

    public static LimitBreach FromRequest(LimitBreachRequest request) {
        return new LimitBreach {
            Id = request.Id,
            BreachDate = request.BreachDate,
            ObservedValue = request.ObservedValue,
            Severity = request.Severity,
            Status = request.Status,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
