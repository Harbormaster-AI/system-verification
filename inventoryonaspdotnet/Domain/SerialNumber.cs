
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Domain;

public class SerialNumber
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? SerialnumberId { get; set; } 
 public virtual SerialCode? Serial { get; set; } 
 public virtual DateOnly? ActivationDate { get; set; } 
public virtual StockKeepingUnit? Sku { get; set; } 
public virtual InventoryItem? CurrentInventoryItem { get; set; } 
public virtual Lot? Lot { get; set; } 
 public virtual SerialStatus? Status { get; set; } 

    public static SerialNumber FromRequest(SerialNumberRequest request) {
        return new SerialNumber {
            Id = request.Id,
            Serial = request.Serial,
            ActivationDate = request.ActivationDate,
            Status = request.Status,
        };
    }
}
