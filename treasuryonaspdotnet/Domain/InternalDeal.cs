
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class InternalDeal : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string DealNumber { get; set; }
    [Required]
    public required virtual DateOnly TradeDate { get; set; }
    [Required]
    public required virtual DateOnly ValueDate { get; set; }
    [Required]
    public required virtual DateOnly MaturityDate { get; set; }
    [Required]
    public required virtual Rate Rate { get; set; }
    [Required]
    public required virtual Money Notional { get; set; }
    public virtual TransferPricingRule? TransferPricingRule { get; set; }
    public virtual TreasuryUnit? FromUnit { get; set; }
    public virtual TreasuryUnit? ToUnit { get; set; }
    public virtual ICollection<CashFlow> CashFlows { get; set; } = new List<CashFlow>();
    public virtual Portfolio? Portfolio { get; set; }
    public virtual InstrumentType? Product { get; set; }
    public virtual Side? Side { get; set; }
    public virtual TradeStatus? Status { get; set; }

    public static InternalDeal FromRequest(InternalDealRequest request)
    {
        return new InternalDeal
        {
            Id = request.Id,
            DealNumber = request.DealNumber,
            TradeDate = request.TradeDate,
            ValueDate = request.ValueDate,
            MaturityDate = request.MaturityDate,
            Rate = request.Rate,
            Notional = request.Notional,
            Product = request.Product,
            Side = request.Side,
            Status = request.Status,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
