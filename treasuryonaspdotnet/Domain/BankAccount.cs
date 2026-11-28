
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class BankAccount : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

 [Required]
[Length(0, int.MaxValue)]
public required virtual string AccountName { get; set; } 
 [Required]
public required virtual AccountIdentifier AccountIdentifier { get; set; } 
 [Required]
[Length(0, int.MaxValue)]
public required virtual string Currency { get; set; } 
 [Required]
public required virtual BIC BankBic { get; set; } 
public virtual TreasuryUnit? TreasuryUnit { get; set; } 
public virtual ICollection<CashPosition> CashPositions { get; set; } = new List<CashPosition>();
public virtual ICollection<CashFlow> CashFlows { get; set; } = new List<CashFlow>();
public virtual ICollection<SettlementInstruction> SettlementInstructions { get; set; } = new List<SettlementInstruction>();

    public static BankAccount FromRequest(BankAccountRequest request) {
        return new BankAccount {
            Id = request.Id,
            AccountName = request.AccountName,
            AccountIdentifier = request.AccountIdentifier,
            Currency = request.Currency,
            BankBic = request.BankBic,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
