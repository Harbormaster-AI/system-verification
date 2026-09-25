
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Domain;

public class OutboundAllocation
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? OutboundallocationId { get; set; } 
 public virtual string? AllocationNumber { get; set; } 
 public virtual decimal? AllocatedQuantity { get; set; } 
 public virtual DateOnly? AllocationDate { get; set; } 
public virtual Warehouse? Warehouse { get; set; } 
public virtual StockKeepingUnit? Sku { get; set; } 
public virtual InventoryItem? InventoryItem { get; set; } 
public virtual Reservation? Reservation { get; set; } 
public virtual Lot? Lot { get; set; } 
public virtual ICollection<SerialNumber> SerialNumbers { get; set; } = new List<SerialNumber>();
public virtual StorageLocation? SourceLocation { get; set; } 
 public virtual AllocationStatus? Status { get; set; } 

    public static OutboundAllocation FromRequest(OutboundAllocationRequest request) {
        return new OutboundAllocation {
            Id = request.Id,
            AllocationNumber = request.AllocationNumber,
            AllocatedQuantity = request.AllocatedQuantity,
            AllocationDate = request.AllocationDate,
            Status = request.Status,
        };
    }
}
