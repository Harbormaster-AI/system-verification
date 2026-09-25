
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Domain;

public class Warehouse
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? WarehouseId { get; set; }
    public virtual string? Name { get; set; }
    public virtual string? Code { get; set; }
    public virtual Address? Address { get; set; }
    public virtual string? TimeZone { get; set; }
    public virtual bool? AllowsOverAllocation { get; set; }
    public virtual ICollection<StorageLocation> StorageLocations { get; set; } = new List<StorageLocation>();
    public virtual ICollection<InventoryItem> InventoryItems { get; set; } = new List<InventoryItem>();
    public virtual ICollection<InboundShipment> InboundShipments { get; set; } = new List<InboundShipment>();
    public virtual ICollection<OutboundAllocation> OutboundAllocations { get; set; } = new List<OutboundAllocation>();
    public virtual ICollection<TransferOrder> OriginTransfers { get; set; } = new List<TransferOrder>();
    public virtual ICollection<TransferOrder> DestinationTransfers { get; set; } = new List<TransferOrder>();
    public virtual ICollection<CycleCount> CycleCounts { get; set; } = new List<CycleCount>();

    public static Warehouse FromRequest(WarehouseRequest request)
    {
        return new Warehouse
        {
            Id = request.Id,
            Name = request.Name,
            Code = request.Code,
            Address = request.Address,
            TimeZone = request.TimeZone,
            AllowsOverAllocation = request.AllowsOverAllocation,
        };
    }
}
