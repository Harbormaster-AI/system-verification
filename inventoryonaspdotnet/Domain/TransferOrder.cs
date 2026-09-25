
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Domain;

public class TransferOrder
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? TransferorderId { get; set; }
    public virtual string? OrderNumber { get; set; }
    public virtual DateOnly? RequestedShipDate { get; set; }
    public virtual DateOnly? RequestedReceiveDate { get; set; }
    public virtual DateOnly? ShippedDate { get; set; }
    public virtual DateOnly? ReceivedDate { get; set; }
    public virtual Warehouse? OriginWarehouse { get; set; }
    public virtual Warehouse? DestinationWarehouse { get; set; }
    public virtual ICollection<TransferOrderLine> Lines { get; set; } = new List<TransferOrderLine>();
    public virtual ICollection<InventoryTransaction> Transactions { get; set; } = new List<InventoryTransaction>();
    public virtual TransferOrderStatus? Status { get; set; }

    public static TransferOrder FromRequest(TransferOrderRequest request)
    {
        return new TransferOrder
        {
            Id = request.Id,
            OrderNumber = request.OrderNumber,
            RequestedShipDate = request.RequestedShipDate,
            RequestedReceiveDate = request.RequestedReceiveDate,
            ShippedDate = request.ShippedDate,
            ReceivedDate = request.ReceivedDate,
            Status = request.Status,
        };
    }
}
