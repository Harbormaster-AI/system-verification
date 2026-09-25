
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Domain;

public class InventoryItem
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? InventoryitemId { get; set; } 
 public virtual decimal? QuantityOnHand { get; set; } 
 public virtual decimal? QuantityAvailable { get; set; } 
 public virtual decimal? QuantityReserved { get; set; } 
 public virtual Money? UnitCost { get; set; } 
 public virtual DateOnly? LastUpdated { get; set; } 
public virtual StockKeepingUnit? Sku { get; set; } 
public virtual Warehouse? Warehouse { get; set; } 
public virtual StorageLocation? Location { get; set; } 
public virtual Lot? Lot { get; set; } 
public virtual ICollection<SerialNumber> SerialNumbers { get; set; } = new List<SerialNumber>();
public virtual ICollection<InventoryTransaction> Transactions { get; set; } = new List<InventoryTransaction>();
public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
 public virtual StockStatus? StockStatus { get; set; } 

    public static InventoryItem FromRequest(InventoryItemRequest request) {
        return new InventoryItem {
            Id = request.Id,
            QuantityOnHand = request.QuantityOnHand,
            QuantityAvailable = request.QuantityAvailable,
            QuantityReserved = request.QuantityReserved,
            UnitCost = request.UnitCost,
            LastUpdated = request.LastUpdated,
            StockStatus = request.StockStatus,
        };
    }
}
