
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Domain;

public class Quarantine
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? QuarantineId { get; set; }
    public virtual string? Reason { get; set; }
    public virtual DateOnly? StartedAt { get; set; }
    public virtual DateOnly? ReleasedAt { get; set; }
    public virtual Warehouse? Warehouse { get; set; }
    public virtual ICollection<InventoryItem> Items { get; set; } = new List<InventoryItem>();
    public virtual Lot? Lot { get; set; }
    public virtual ICollection<SerialNumber> SerialNumbers { get; set; } = new List<SerialNumber>();
    public virtual Disposition? Disposition { get; set; }

    public static Quarantine FromRequest(QuarantineRequest request)
    {
        return new Quarantine
        {
            Id = request.Id,
            Reason = request.Reason,
            StartedAt = request.StartedAt,
            ReleasedAt = request.ReleasedAt,
            Disposition = request.Disposition,
        };
    }
}
