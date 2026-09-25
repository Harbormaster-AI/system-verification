
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Domain;

public class OrderItem
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? OrderitemId { get; set; } 
 public virtual decimal? Quantity { get; set; } 
 public virtual Money? UnitPrice { get; set; } 
 public virtual Money? DiscountAmount { get; set; } 
 public virtual Money? TaxAmount { get; set; } 
 public virtual Money? TotalAmount { get; set; } 
public virtual Order? Order { get; set; } 
public virtual Product? Product { get; set; } 
public virtual PriceBookEntry? PriceBookEntry { get; set; } 

    public static OrderItem FromRequest(OrderItemRequest request) {
        return new OrderItem {
            Id = request.Id,
            Quantity = request.Quantity,
            UnitPrice = request.UnitPrice,
            DiscountAmount = request.DiscountAmount,
            TaxAmount = request.TaxAmount,
            TotalAmount = request.TotalAmount,
        };
    }
}
