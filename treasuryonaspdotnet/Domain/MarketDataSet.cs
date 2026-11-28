
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class MarketDataSet : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

 [Required]
[Length(0, int.MaxValue)]
public required virtual string Name { get; set; } 
 [Required]
public required virtual DateOnly ValuationDate { get; set; } 
public virtual ICollection<YieldCurve> YieldCurves { get; set; } = new List<YieldCurve>();
public virtual ICollection<FXRate> FxRates { get; set; } = new List<FXRate>();
public virtual ICollection<VolSurface> VolSurfaces { get; set; } = new List<VolSurface>();
public virtual ICollection<StressScenario> StressScenarios { get; set; } = new List<StressScenario>();

    public static MarketDataSet FromRequest(MarketDataSetRequest request) {
        return new MarketDataSet {
            Id = request.Id,
            Name = request.Name,
            ValuationDate = request.ValuationDate,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
