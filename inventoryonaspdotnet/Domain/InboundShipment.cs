
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Domain;

public class InboundShipment
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? InboundshipmentId { get; set; }
    public virtual string? ShipmentNumber { get; set; }
    public virtual DateOnly? ExpectedArrivalDate { get; set; }
    public virtual DateOnly? ArrivalDate { get; set; }
    public virtual string? CarrierName { get; set; }
    public virtual Warehouse? Warehouse { get; set; }
    public virtual ICollection<InboundShipmentLine> Lines { get; set; } = new List<InboundShipmentLine>();
    public virtual ICollection<InventoryTransaction> Transactions { get; set; } = new List<InventoryTransaction>();
    public virtual InboundShipmentStatus? Status { get; set; }

    public static InboundShipment FromRequest(InboundShipmentRequest request)
    {
        return new InboundShipment
        {
            Id = request.Id,
            ShipmentNumber = request.ShipmentNumber,
            ExpectedArrivalDate = request.ExpectedArrivalDate,
            ArrivalDate = request.ArrivalDate,
            CarrierName = request.CarrierName,
            Status = request.Status,
        };
    }
}
