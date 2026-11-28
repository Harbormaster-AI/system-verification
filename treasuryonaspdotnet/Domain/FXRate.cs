
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class FXRate : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string BaseCurrency { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string QuoteCurrency { get; set; }
    [Required]
    public required virtual decimal Rate { get; set; }
    public virtual MarketDataSet? MarketDataSet { get; set; }

    public static FXRate FromRequest(FXRateRequest request)
    {
        return new FXRate
        {
            Id = request.Id,
            BaseCurrency = request.BaseCurrency,
            QuoteCurrency = request.QuoteCurrency,
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
