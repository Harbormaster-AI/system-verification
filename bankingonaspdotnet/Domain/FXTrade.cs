
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Domain;

public class FXTrade
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? FxtradeId { get; set; } 
 public virtual string? TradeReference { get; set; } 
 public virtual DateOnly? TradeDate { get; set; } 
 public virtual DateOnly? SettlementDate { get; set; } 
 public virtual Money? AmountSold { get; set; } 
 public virtual Money? AmountBought { get; set; } 
 public virtual decimal? Rate { get; set; } 
public virtual Customer? Customer { get; set; } 
public virtual Bank? Bank { get; set; } 
public virtual ExchangeRate? ExchangeRate { get; set; } 
public virtual Account? SourceAccount { get; set; } 
public virtual Account? DestinationAccount { get; set; } 
public virtual Transaction? Transaction { get; set; } 
 public virtual TradeStatus? Status { get; set; } 

    public static FXTrade FromRequest(FXTradeRequest request) {
        return new FXTrade {
            Id = request.Id,
            TradeReference = request.TradeReference,
            TradeDate = request.TradeDate,
            SettlementDate = request.SettlementDate,
            AmountSold = request.AmountSold,
            AmountBought = request.AmountBought,
            Rate = request.Rate,
            Status = request.Status,
        };
    }
}
