
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class TransferPricingRule : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

 [Required]
[Length(0, int.MaxValue)]
public required virtual string Name { get; set; } 
 [Required]
public required virtual Rate Spread { get; set; } 
 [Required]
public required virtual DateOnly EffectiveFrom { get; set; } 
public virtual TreasuryUnit? TreasuryUnit { get; set; } 
public virtual ICollection<InternalDeal> AppliedDeals { get; set; } = new List<InternalDeal>();
 public virtual TransferPricingMethod? Method { get; set; } 
 public virtual CurveType? CurveType { get; set; } 

    public static TransferPricingRule FromRequest(TransferPricingRuleRequest request) {
        return new TransferPricingRule {
            Id = request.Id,
            Name = request.Name,
            Spread = request.Spread,
            EffectiveFrom = request.EffectiveFrom,
            Method = request.Method,
            CurveType = request.CurveType,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
