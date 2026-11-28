
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class HedgeRelationship : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

 [Required]
[Length(0, int.MaxValue)]
public required virtual string Name { get; set; } 
 [Required]
[Length(0, int.MaxValue)]
public required virtual string Objective { get; set; } 
public virtual Trade? HedgedItem { get; set; } 
public virtual Trade? HedgingInstrument { get; set; } 
public virtual ICollection<AccountingEntry> AccountingEntries { get; set; } = new List<AccountingEntry>();
 public virtual HedgeDesignationStatus? DesignationStatus { get; set; } 

    public static HedgeRelationship FromRequest(HedgeRelationshipRequest request) {
        return new HedgeRelationship {
            Id = request.Id,
            Name = request.Name,
            Objective = request.Objective,
            DesignationStatus = request.DesignationStatus,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
