
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Domain;

public class Order
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? OrderId { get; set; } 
 public virtual string? OrderNumber { get; set; } 
 public virtual DateOnly? OrderDate { get; set; } 
 public virtual Money? TotalAmount { get; set; } 
 public virtual Money? TaxAmount { get; set; } 
 public virtual Money? ShippingAmount { get; set; } 
public virtual Organization? Organization { get; set; } 
public virtual Account? Account { get; set; } 
public virtual Opportunity? Opportunity { get; set; } 
public virtual Quote? Quote { get; set; } 
public virtual User? Owner { get; set; } 
public virtual ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
public virtual Contract? Contract { get; set; } 
public virtual PriceBook? PriceBook { get; set; } 
 public virtual OrderStatus? Status { get; set; } 

    public static Order FromRequest(OrderRequest request) {
        return new Order {
            Id = request.Id,
            OrderNumber = request.OrderNumber,
            OrderDate = request.OrderDate,
            TotalAmount = request.TotalAmount,
            TaxAmount = request.TaxAmount,
            ShippingAmount = request.ShippingAmount,
            Status = request.Status,
        };
    }
}
