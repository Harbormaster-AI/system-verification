
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Domain;

public class QuoteLineItem
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? QuotelineitemId { get; set; } 
 public virtual decimal? Quantity { get; set; } 
 public virtual Money? UnitPrice { get; set; } 
 public virtual Money? DiscountAmount { get; set; } 
 public virtual Money? TaxAmount { get; set; } 
 public virtual Money? TotalAmount { get; set; } 
public virtual Quote? Quote { get; set; } 
public virtual Product? Product { get; set; } 
public virtual PriceBookEntry? PriceBookEntry { get; set; } 
public virtual OpportunityLineItem? OpportunityLineItem { get; set; } 

    public static QuoteLineItem FromRequest(QuoteLineItemRequest request) {
        return new QuoteLineItem {
            Id = request.Id,
            Quantity = request.Quantity,
            UnitPrice = request.UnitPrice,
            DiscountAmount = request.DiscountAmount,
            TaxAmount = request.TaxAmount,
            TotalAmount = request.TotalAmount,
        };
    }
}
