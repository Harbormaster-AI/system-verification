
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Domain;

public class StockAdjustmentLine
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? StockadjustmentlineId { get; set; } 
 public virtual int? LineNumber { get; set; } 
 public virtual decimal? Quantity { get; set; } 
public virtual StockAdjustment? Adjustment { get; set; } 
public virtual StockKeepingUnit? Sku { get; set; } 
public virtual Lot? Lot { get; set; } 
public virtual StorageLocation? Location { get; set; } 
public virtual ICollection<SerialNumber> SerialNumbers { get; set; } = new List<SerialNumber>();
 public virtual UnitOfMeasure? UnitOfMeasure { get; set; } 
 public virtual StockStatus? StockStatus { get; set; } 

    public static StockAdjustmentLine FromRequest(StockAdjustmentLineRequest request) {
        return new StockAdjustmentLine {
            Id = request.Id,
            LineNumber = request.LineNumber,
            Quantity = request.Quantity,
            UnitOfMeasure = request.UnitOfMeasure,
            StockStatus = request.StockStatus,
        };
    }
}
