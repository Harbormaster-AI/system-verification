
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Domain;

public class CycleCountEntry
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? CyclecountentryId { get; set; }
    public virtual int? LineNumber { get; set; }
    public virtual decimal? SystemQuantity { get; set; }
    public virtual decimal? CountedQuantity { get; set; }
    public virtual decimal? VarianceQuantity { get; set; }
    public virtual bool? RecountRequired { get; set; }
    public virtual CycleCount? CycleCount { get; set; }
    public virtual StockKeepingUnit? Sku { get; set; }
    public virtual Lot? Lot { get; set; }
    public virtual StorageLocation? Location { get; set; }
    public virtual ICollection<SerialNumber> SerialNumbers { get; set; } = new List<SerialNumber>();
    public virtual StockStatus? StockStatus { get; set; }

    public static CycleCountEntry FromRequest(CycleCountEntryRequest request)
    {
        return new CycleCountEntry
        {
            Id = request.Id,
            LineNumber = request.LineNumber,
            SystemQuantity = request.SystemQuantity,
            CountedQuantity = request.CountedQuantity,
            VarianceQuantity = request.VarianceQuantity,
            RecountRequired = request.RecountRequired,
            StockStatus = request.StockStatus,
        };
    }
}
