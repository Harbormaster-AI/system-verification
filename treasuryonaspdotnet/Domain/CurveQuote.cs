
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class CurveQuote : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public required virtual Tenor Tenor { get; set; }
    [Required]
    public required virtual Rate Rate { get; set; }
    public virtual YieldCurve? YieldCurve { get; set; }

    public static CurveQuote FromRequest(CurveQuoteRequest request)
    {
        return new CurveQuote
        {
            Id = request.Id,
            Tenor = request.Tenor,
            Rate = request.Rate,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
