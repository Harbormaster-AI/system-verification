
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class CashFlow : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public required virtual DateOnly FlowDate { get; set; }
    [Required]
    public required virtual Money Amount { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Description { get; set; }
    public virtual Trade? Trade { get; set; }
    public virtual CashPosition? CashPosition { get; set; }
    public virtual MarginCall? MarginCall { get; set; }
    public virtual BankAccount? BankAccount { get; set; }
    public virtual CashFlowType? FlowType { get; set; }

    public static CashFlow FromRequest(CashFlowRequest request)
    {
        return new CashFlow
        {
            Id = request.Id,
            FlowDate = request.FlowDate,
            Amount = request.Amount,
            Description = request.Description,
            FlowType = request.FlowType,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
