
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class Position : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public required virtual DateOnly AsOfDate { get; set; }
    [Required]
    public required virtual decimal Quantity { get; set; }
    [Required]
    public required virtual Money MarketValue { get; set; }
    [Required]
    public required virtual Money Pnl { get; set; }
    public virtual Portfolio? Portfolio { get; set; }
    public virtual Trade? Trade { get; set; }
    public virtual PositionType? PositionType { get; set; }

    public static Position FromRequest(PositionRequest request)
    {
        return new Position
        {
            Id = request.Id,
            AsOfDate = request.AsOfDate,
            Quantity = request.Quantity,
            MarketValue = request.MarketValue,
            Pnl = request.Pnl,
            PositionType = request.PositionType,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
