
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Domain;

public class InventoryThresholdAlert
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? InventorythresholdalertId { get; set; } 
 public virtual string? AlertNumber { get; set; } 
 public virtual DateOnly? DetectedAt { get; set; } 
 public virtual string? Message { get; set; } 
public virtual StockKeepingUnit? Sku { get; set; } 
public virtual Warehouse? Warehouse { get; set; } 
public virtual StorageLocation? Location { get; set; } 
public virtual ReplenishmentPolicy? RelatedPolicy { get; set; } 
 public virtual InventoryAlertType? AlertType { get; set; } 
 public virtual AlertStatus? Status { get; set; } 

    public static InventoryThresholdAlert FromRequest(InventoryThresholdAlertRequest request) {
        return new InventoryThresholdAlert {
            Id = request.Id,
            AlertNumber = request.AlertNumber,
            DetectedAt = request.DetectedAt,
            Message = request.Message,
            AlertType = request.AlertType,
            Status = request.Status,
        };
    }
}
