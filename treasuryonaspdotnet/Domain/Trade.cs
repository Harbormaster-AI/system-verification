
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class Trade : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

 [Required]
[Length(0, int.MaxValue)]
public required virtual string TradeNumber { get; set; } 
 [Required]
public required virtual DateOnly TradeDate { get; set; } 
 [Required]
public required virtual DateOnly ValueDate { get; set; } 
 [Required]
public required virtual DateOnly MaturityDate { get; set; } 
 [Required]
public required virtual Money Notional { get; set; } 
 [Required]
public required virtual Rate FixedRate { get; set; } 
public virtual Counterparty? Counterparty { get; set; } 
public virtual Portfolio? Portfolio { get; set; } 
public virtual SettlementInstruction? SettlementInstruction { get; set; } 
public virtual ICollection<CashFlow> CashFlows { get; set; } = new List<CashFlow>();
public virtual CollateralAccount? CollateralAccount { get; set; } 
public virtual HedgeRelationship? HedgeRelationship { get; set; } 
 public virtual InstrumentType? InstrumentType { get; set; } 
 public virtual Side? Side { get; set; } 
 public virtual TradeStatus? Status { get; set; } 
 public virtual ClearingStatus? ClearingStatus { get; set; } 

    public static Trade FromRequest(TradeRequest request) {
        return new Trade {
            Id = request.Id,
            TradeNumber = request.TradeNumber,
            TradeDate = request.TradeDate,
            ValueDate = request.ValueDate,
            MaturityDate = request.MaturityDate,
            Notional = request.Notional,
            FixedRate = request.FixedRate,
            InstrumentType = request.InstrumentType,
            Side = request.Side,
            Status = request.Status,
            ClearingStatus = request.ClearingStatus,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
