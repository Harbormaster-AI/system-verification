
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class YieldCurve : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Currency { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string BuildMethod { get; set; }
    public virtual MarketDataSet? MarketDataSet { get; set; }
    public virtual ICollection<CurveQuote> Quotes { get; set; } = new List<CurveQuote>();
    public virtual CurveType? CurveType { get; set; }
    public virtual DayCountConvention? DayCount { get; set; }

    public static YieldCurve FromRequest(YieldCurveRequest request)
    {
        return new YieldCurve
        {
            Id = request.Id,
            Currency = request.Currency,
            BuildMethod = request.BuildMethod,
            CurveType = request.CurveType,
            DayCount = request.DayCount,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
