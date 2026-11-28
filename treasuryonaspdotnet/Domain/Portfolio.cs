
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class Portfolio : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Name { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Strategy { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string BaseCurrency { get; set; }
    public virtual TradingBook? TradingBook { get; set; }
    public virtual ICollection<Position> Positions { get; set; } = new List<Position>();
    public virtual ICollection<Trade> Trades { get; set; } = new List<Trade>();
    public virtual ICollection<RiskReport> RiskReports { get; set; } = new List<RiskReport>();
    public virtual ICollection<RiskLimit> RiskLimits { get; set; } = new List<RiskLimit>();
    public virtual ICollection<LiquidityBuffer> LiquidityBuffers { get; set; } = new List<LiquidityBuffer>();

    public static Portfolio FromRequest(PortfolioRequest request)
    {
        return new Portfolio
        {
            Id = request.Id,
            Name = request.Name,
            Strategy = request.Strategy,
            BaseCurrency = request.BaseCurrency,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
