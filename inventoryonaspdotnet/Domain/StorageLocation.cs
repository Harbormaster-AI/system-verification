
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Domain;

public class StorageLocation
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? StoragelocationId { get; set; } 
 public virtual string? Code { get; set; } 
 public virtual bool? TemperatureControlled { get; set; } 
 public virtual decimal? Capacity { get; set; } 
 public virtual string? CapacityUnit { get; set; } 
public virtual Warehouse? Warehouse { get; set; } 
public virtual StorageLocation? ParentLocation { get; set; } 
public virtual ICollection<StorageLocation> ChildLocations { get; set; } = new List<StorageLocation>();
public virtual ICollection<InventoryItem> InventoryItems { get; set; } = new List<InventoryItem>();
 public virtual LocationType? LocationType { get; set; } 

    public static StorageLocation FromRequest(StorageLocationRequest request) {
        return new StorageLocation {
            Id = request.Id,
            Code = request.Code,
            TemperatureControlled = request.TemperatureControlled,
            Capacity = request.Capacity,
            CapacityUnit = request.CapacityUnit,
            LocationType = request.LocationType,
        };
    }
}
