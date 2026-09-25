
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Domain;

public class Product
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? ProductId { get; set; } 
 public virtual string? Sku { get; set; } 
 public virtual string? Name { get; set; } 
 public virtual bool? AsActive { get; set; } 
 public virtual Money? StandardPrice { get; set; } 
 public virtual string? Description { get; set; } 
public virtual Organization? Organization { get; set; } 
public virtual ICollection<PriceBookEntry> PriceBookEntries { get; set; } = new List<PriceBookEntry>();
public virtual ICollection<OpportunityLineItem> OpportunityLineItems { get; set; } = new List<OpportunityLineItem>();
public virtual ICollection<QuoteLineItem> QuoteLineItems { get; set; } = new List<QuoteLineItem>();
public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
 public virtual ProductType? ProductType { get; set; } 
 public virtual UnitOfMeasure? Uom { get; set; } 

    public static Product FromRequest(ProductRequest request) {
        return new Product {
            Id = request.Id,
            Sku = request.Sku,
            Name = request.Name,
            AsActive = request.AsActive,
            StandardPrice = request.StandardPrice,
            Description = request.Description,
            ProductType = request.ProductType,
            Uom = request.Uom,
        };
    }
}
