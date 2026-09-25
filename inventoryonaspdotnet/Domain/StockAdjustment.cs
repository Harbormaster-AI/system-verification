
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Domain;

public class StockAdjustment
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? StockadjustmentId { get; set; } 
 public virtual string? AdjustmentNumber { get; set; } 
 public virtual string? Reason { get; set; } 
 public virtual DateOnly? AdjustmentDate { get; set; } 
public virtual Warehouse? Warehouse { get; set; } 
public virtual ICollection<StockAdjustmentLine> Lines { get; set; } = new List<StockAdjustmentLine>();
public virtual ICollection<InventoryTransaction> Transactions { get; set; } = new List<InventoryTransaction>();
 public virtual AdjustmentType? AdjustmentType { get; set; } 
 public virtual AdjustmentStatus? Status { get; set; } 

    public static StockAdjustment FromRequest(StockAdjustmentRequest request) {
        return new StockAdjustment {
            Id = request.Id,
            AdjustmentNumber = request.AdjustmentNumber,
            Reason = request.Reason,
            AdjustmentDate = request.AdjustmentDate,
            AdjustmentType = request.AdjustmentType,
            Status = request.Status,
        };
    }
}
