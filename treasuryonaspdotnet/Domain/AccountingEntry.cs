
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class AccountingEntry : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

 [Required]
public required virtual DateOnly PostingDate { get; set; } 
 [Required]
[Length(0, int.MaxValue)]
public required virtual string Account { get; set; } 
 [Required]
public required virtual Money Amount { get; set; } 
 [Required]
[Length(0, int.MaxValue)]
public required virtual string Narrative { get; set; } 
 [Required]
public required virtual AccountingTreatment Treatment { get; set; } 
public virtual Trade? Trade { get; set; } 
public virtual HedgeRelationship? HedgeRelationship { get; set; } 
public virtual Portfolio? Portfolio { get; set; } 

    public static AccountingEntry FromRequest(AccountingEntryRequest request) {
        return new AccountingEntry {
            Id = request.Id,
            PostingDate = request.PostingDate,
            Account = request.Account,
            Amount = request.Amount,
            Narrative = request.Narrative,
            Treatment = request.Treatment,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
