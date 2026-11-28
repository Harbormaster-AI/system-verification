
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class CashPosition : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

 [Required]
public required virtual DateOnly PositionDate { get; set; } 
 [Required]
public required virtual Money OpeningBalance { get; set; } 
 [Required]
public required virtual Money ClosingBalance { get; set; } 
 [Required]
public required virtual Money AvailableBalance { get; set; } 
public virtual BankAccount? BankAccount { get; set; } 
public virtual ICollection<CashFlow> CashFlows { get; set; } = new List<CashFlow>();

    public static CashPosition FromRequest(CashPositionRequest request) {
        return new CashPosition {
            Id = request.Id,
            PositionDate = request.PositionDate,
            OpeningBalance = request.OpeningBalance,
            ClosingBalance = request.ClosingBalance,
            AvailableBalance = request.AvailableBalance,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
