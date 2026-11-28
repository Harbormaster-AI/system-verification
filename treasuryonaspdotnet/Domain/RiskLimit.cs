
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class RiskLimit : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

 [Required]
[Length(0, int.MaxValue)]
public required virtual string Name { get; set; } 
 [Required]
public required virtual decimal Threshold { get; set; } 
 [Required]
[Length(0, int.MaxValue)]
public required virtual string Currency { get; set; } 
 [Required]
public required virtual DateOnly EffectiveDate { get; set; } 
public virtual Portfolio? Portfolio { get; set; } 
public virtual Counterparty? Counterparty { get; set; } 
public virtual ICollection<LimitBreach> Breaches { get; set; } = new List<LimitBreach>();
public virtual ICollection<Approval> Approvals { get; set; } = new List<Approval>();
public virtual TreasuryPolicy? Policy { get; set; } 
 public virtual LimitType? LimitType { get; set; } 
 public virtual RiskMeasureType? Measure { get; set; } 

    public static RiskLimit FromRequest(RiskLimitRequest request) {
        return new RiskLimit {
            Id = request.Id,
            Name = request.Name,
            Threshold = request.Threshold,
            Currency = request.Currency,
            EffectiveDate = request.EffectiveDate,
            LimitType = request.LimitType,
            Measure = request.Measure,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
