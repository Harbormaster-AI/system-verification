
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class StressResult : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public required virtual decimal Value { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Currency { get; set; }
    public virtual StressScenario? StressScenario { get; set; }
    public virtual Portfolio? Portfolio { get; set; }
    public virtual RiskMeasureType? Measure { get; set; }

    public static StressResult FromRequest(StressResultRequest request)
    {
        return new StressResult
        {
            Id = request.Id,
            Value = request.Value,
            Currency = request.Currency,
            Measure = request.Measure,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
