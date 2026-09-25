
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Domain;

public class TransferOrderLine
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? TransferorderlineId { get; set; } 
 public virtual int? LineNumber { get; set; } 
 public virtual decimal? Quantity { get; set; } 
public virtual TransferOrder? TransferOrder { get; set; } 
public virtual StockKeepingUnit? Sku { get; set; } 
public virtual Lot? Lot { get; set; } 
public virtual ICollection<SerialNumber> SerialNumbers { get; set; } = new List<SerialNumber>();
public virtual StorageLocation? FromLocation { get; set; } 
public virtual StorageLocation? ToLocation { get; set; } 
 public virtual UnitOfMeasure? UnitOfMeasure { get; set; } 
 public virtual StockStatus? StockStatus { get; set; } 

    public static TransferOrderLine FromRequest(TransferOrderLineRequest request) {
        return new TransferOrderLine {
            Id = request.Id,
            LineNumber = request.LineNumber,
            Quantity = request.Quantity,
            UnitOfMeasure = request.UnitOfMeasure,
            StockStatus = request.StockStatus,
        };
    }
}
