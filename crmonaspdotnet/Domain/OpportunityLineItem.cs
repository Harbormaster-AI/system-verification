
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Domain;

public class OpportunityLineItem
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? OpportunitylineitemId { get; set; } 
 public virtual decimal? Quantity { get; set; } 
 public virtual Money? UnitPrice { get; set; } 
 public virtual decimal? DiscountPercent { get; set; } 
 public virtual Money? TotalPrice { get; set; } 
public virtual Opportunity? Opportunity { get; set; } 
public virtual Product? Product { get; set; } 
public virtual PriceBookEntry? PriceBookEntry { get; set; } 

    public static OpportunityLineItem FromRequest(OpportunityLineItemRequest request) {
        return new OpportunityLineItem {
            Id = request.Id,
            Quantity = request.Quantity,
            UnitPrice = request.UnitPrice,
            DiscountPercent = request.DiscountPercent,
            TotalPrice = request.TotalPrice,
        };
    }
}
