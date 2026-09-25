
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Domain;

public class Lot
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? LotId { get; set; }
    public virtual BatchNumber? BatchNumber { get; set; }
    public virtual DateOnly? ManufactureDate { get; set; }
    public virtual DateOnly? ExpirationDate { get; set; }
    public virtual StockKeepingUnit? Sku { get; set; }
    public virtual ICollection<InventoryItem> InventoryItems { get; set; } = new List<InventoryItem>();
    public virtual LotStatus? LotStatus { get; set; }

    public static Lot FromRequest(LotRequest request)
    {
        return new Lot
        {
            Id = request.Id,
            BatchNumber = request.BatchNumber,
            ManufactureDate = request.ManufactureDate,
            ExpirationDate = request.ExpirationDate,
            LotStatus = request.LotStatus,
        };
    }
}
