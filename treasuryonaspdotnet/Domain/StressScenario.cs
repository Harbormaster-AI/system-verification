
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class StressScenario : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

 [Required]
[Length(0, int.MaxValue)]
public required virtual string Name { get; set; } 
 [Required]
[Length(0, int.MaxValue)]
public required virtual string Severity { get; set; } 
public virtual MarketDataSet? MarketDataSet { get; set; } 
public virtual ICollection<StressResult> StressResults { get; set; } = new List<StressResult>();
 public virtual LiquidityHorizon? Horizon { get; set; } 

    public static StressScenario FromRequest(StressScenarioRequest request) {
        return new StressScenario {
            Id = request.Id,
            Name = request.Name,
            Severity = request.Severity,
            Horizon = request.Horizon,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
