
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class SettlementInstruction : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string PaymentSystem { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string SettlementCurrency { get; set; }
    [Required]
    public required virtual AccountIdentifier BeneficiaryAccount { get; set; }
    [Required]
    public required virtual BIC IntermediaryBankBic { get; set; }
    public virtual Trade? Trade { get; set; }
    public virtual Counterparty? Counterparty { get; set; }
    public virtual BankAccount? BankAccount { get; set; }

    public static SettlementInstruction FromRequest(SettlementInstructionRequest request)
    {
        return new SettlementInstruction
        {
            Id = request.Id,
            PaymentSystem = request.PaymentSystem,
            SettlementCurrency = request.SettlementCurrency,
            BeneficiaryAccount = request.BeneficiaryAccount,
            IntermediaryBankBic = request.IntermediaryBankBic,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
