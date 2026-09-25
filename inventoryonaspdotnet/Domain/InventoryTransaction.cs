
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Domain;

public class InventoryTransaction
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? InventorytransactionId { get; set; } 
 public virtual string? TransactionNumber { get; set; } 
 public virtual decimal? Quantity { get; set; } 
 public virtual Money? UnitCost { get; set; } 
 public virtual DateOnly? TransactionDate { get; set; } 
 public virtual string? ReasonCode { get; set; } 
public virtual StockKeepingUnit? Sku { get; set; } 
public virtual Warehouse? Warehouse { get; set; } 
public virtual StorageLocation? Location { get; set; } 
public virtual Lot? Lot { get; set; } 
public virtual ICollection<SerialNumber> SerialNumbers { get; set; } = new List<SerialNumber>();
public virtual Reservation? RelatedReservation { get; set; } 
public virtual TransferOrder? TransferOrder { get; set; } 
public virtual StockAdjustment? Adjustment { get; set; } 
public virtual CycleCount? CycleCount { get; set; } 
 public virtual TransactionType? TransactionType { get; set; } 
 public virtual UnitOfMeasure? UnitOfMeasure { get; set; } 
 public virtual TransactionStatus? Status { get; set; } 

    public static InventoryTransaction FromRequest(InventoryTransactionRequest request) {
        return new InventoryTransaction {
            Id = request.Id,
            TransactionNumber = request.TransactionNumber,
            Quantity = request.Quantity,
            UnitCost = request.UnitCost,
            TransactionDate = request.TransactionDate,
            ReasonCode = request.ReasonCode,
            TransactionType = request.TransactionType,
            UnitOfMeasure = request.UnitOfMeasure,
            Status = request.Status,
        };
    }
}
