
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Domain;

public class Reservation
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? ReservationId { get; set; } 
 public virtual string? ReferenceNumber { get; set; } 
 public virtual decimal? ReservedQuantity { get; set; } 
 public virtual DateOnly? PromisedDate { get; set; } 
public virtual StockKeepingUnit? Sku { get; set; } 
public virtual Warehouse? Warehouse { get; set; } 
public virtual StorageLocation? Location { get; set; } 
public virtual InventoryItem? InventoryItem { get; set; } 
public virtual Lot? Lot { get; set; } 
public virtual ICollection<SerialNumber> SerialNumbers { get; set; } = new List<SerialNumber>();
public virtual DemandSignal? DemandSignal { get; set; } 
 public virtual ReservationStatus? ReservationStatus { get; set; } 
 public virtual ReservationType? ReservationType { get; set; } 

    public static Reservation FromRequest(ReservationRequest request) {
        return new Reservation {
            Id = request.Id,
            ReferenceNumber = request.ReferenceNumber,
            ReservedQuantity = request.ReservedQuantity,
            PromisedDate = request.PromisedDate,
            ReservationStatus = request.ReservationStatus,
            ReservationType = request.ReservationType,
        };
    }
}
