
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class MarginCall : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public required virtual DateOnly CallDate { get; set; }
    [Required]
    public required virtual Money RequiredAmount { get; set; }
    public virtual CollateralAgreement? CollateralAgreement { get; set; }
    public virtual CollateralAccount? CollateralAccount { get; set; }
    public virtual Counterparty? Counterparty { get; set; }
    public virtual ICollection<CashFlow> CashFlows { get; set; } = new List<CashFlow>();
    public virtual MarginDirection? Direction { get; set; }
    public virtual MarginStatus? Status { get; set; }

    public static MarginCall FromRequest(MarginCallRequest request)
    {
        return new MarginCall
        {
            Id = request.Id,
            CallDate = request.CallDate,
            RequiredAmount = request.RequiredAmount,
            Direction = request.Direction,
            Status = request.Status,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
