
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class LiquidityBuffer : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Name { get; set; }
    [Required]
    public required virtual Money MarketValue { get; set; }
    public virtual Portfolio? Portfolio { get; set; }
    public virtual ICollection<BufferAsset> Assets { get; set; } = new List<BufferAsset>();
    public virtual ICollection<RegulatoryMetric> RegulatoryMetrics { get; set; } = new List<RegulatoryMetric>();
    public virtual HQLAClass? HqlaClass { get; set; }

    public static LiquidityBuffer FromRequest(LiquidityBufferRequest request)
    {
        return new LiquidityBuffer
        {
            Id = request.Id,
            Name = request.Name,
            MarketValue = request.MarketValue,
            HqlaClass = request.HqlaClass,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
