
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class BufferAsset : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string SecurityName { get; set; }
    [Required]
    public required virtual ISIN Isin { get; set; }
    [Required]
    public required virtual Money MarketValue { get; set; }
    public virtual LiquidityBuffer? LiquidityBuffer { get; set; }
    public virtual Portfolio? Portfolio { get; set; }
    public virtual HQLAClass? HqlaClass { get; set; }

    public static BufferAsset FromRequest(BufferAssetRequest request)
    {
        return new BufferAsset
        {
            Id = request.Id,
            SecurityName = request.SecurityName,
            Isin = request.Isin,
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
