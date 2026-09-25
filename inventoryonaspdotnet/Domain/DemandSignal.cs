
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Domain;

public class DemandSignal
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? DemandsignalId { get; set; } 
 public virtual string? ExternalReference { get; set; } 
 public virtual DateOnly? RequestedDate { get; set; } 
 public virtual decimal? Quantity { get; set; } 
public virtual StockKeepingUnit? Sku { get; set; } 
public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
 public virtual DemandType? DemandType { get; set; } 

    public static DemandSignal FromRequest(DemandSignalRequest request) {
        return new DemandSignal {
            Id = request.Id,
            ExternalReference = request.ExternalReference,
            RequestedDate = request.RequestedDate,
            Quantity = request.Quantity,
            DemandType = request.DemandType,
        };
    }
}
