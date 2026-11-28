
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class VolSurface : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string AssetClass { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Currency { get; set; }
    public virtual MarketDataSet? MarketDataSet { get; set; }
    public virtual PricingModel? Model { get; set; }

    public static VolSurface FromRequest(VolSurfaceRequest request)
    {
        return new VolSurface
        {
            Id = request.Id,
            AssetClass = request.AssetClass,
            Currency = request.Currency,
            Model = request.Model,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
