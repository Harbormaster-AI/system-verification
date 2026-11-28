
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class TreasuryPolicy : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Name { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Version { get; set; }
    [Required]
    public required virtual DateOnly EffectiveFrom { get; set; }
    public virtual TreasuryUnit? TreasuryUnit { get; set; }
    public virtual ICollection<RiskLimit> Limits { get; set; } = new List<RiskLimit>();
    public virtual ICollection<Approval> Approvals { get; set; } = new List<Approval>();
    public virtual PolicyArea? Area { get; set; }

    public static TreasuryPolicy FromRequest(TreasuryPolicyRequest request)
    {
        return new TreasuryPolicy
        {
            Id = request.Id,
            Name = request.Name,
            Version = request.Version,
            EffectiveFrom = request.EffectiveFrom,
            Area = request.Area,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
