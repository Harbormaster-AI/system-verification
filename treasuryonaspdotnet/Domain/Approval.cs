
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class Approval : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string ApproverName { get; set; }
    [Required]
    public required virtual DateOnly ApprovalDate { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Notes { get; set; }
    public virtual RiskLimit? RiskLimit { get; set; }
    public virtual LimitBreach? LimitBreach { get; set; }
    public virtual TreasuryPolicy? Policy { get; set; }
    public virtual ApprovalDecision? Decision { get; set; }

    public static Approval FromRequest(ApprovalRequest request)
    {
        return new Approval
        {
            Id = request.Id,
            ApproverName = request.ApproverName,
            ApprovalDate = request.ApprovalDate,
            Notes = request.Notes,
            Decision = request.Decision,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
