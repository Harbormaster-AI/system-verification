
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Domain;

public class CycleCount
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? CyclecountId { get; set; }
    public virtual string? CountNumber { get; set; }
    public virtual DateOnly? ScheduledDate { get; set; }
    public virtual DateOnly? PerformedDate { get; set; }
    public virtual string? ApprovedBy { get; set; }
    public virtual Warehouse? Warehouse { get; set; }
    public virtual ICollection<StorageLocation> Locations { get; set; } = new List<StorageLocation>();
    public virtual ICollection<CycleCountEntry> Entries { get; set; } = new List<CycleCountEntry>();
    public virtual ICollection<InventoryTransaction> Transactions { get; set; } = new List<InventoryTransaction>();
    public virtual CountStatus? Status { get; set; }

    public static CycleCount FromRequest(CycleCountRequest request)
    {
        return new CycleCount
        {
            Id = request.Id,
            CountNumber = request.CountNumber,
            ScheduledDate = request.ScheduledDate,
            PerformedDate = request.PerformedDate,
            ApprovedBy = request.ApprovedBy,
            Status = request.Status,
        };
    }
}
