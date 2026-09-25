
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Domain;

public class StockKeepingUnit
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? StockkeepingunitId { get; set; }
    public virtual SKU? SkuCode { get; set; }
    public virtual string? Name { get; set; }
    public virtual decimal? Weight { get; set; }
    public virtual string? WeightUnit { get; set; }
    public virtual decimal? Volume { get; set; }
    public virtual string? VolumeUnit { get; set; }
    public virtual int? ShelfLifeDays { get; set; }
    public virtual bool? HazardousMaterial { get; set; }
    public virtual ICollection<InventoryItem> InventoryItems { get; set; } = new List<InventoryItem>();
    public virtual ICollection<UoMConversion> UomConversions { get; set; } = new List<UoMConversion>();
    public virtual ICollection<ReplenishmentPolicy> ReplenishmentPolicies { get; set; } = new List<ReplenishmentPolicy>();
    public virtual ICollection<Lot> Lots { get; set; } = new List<Lot>();
    public virtual ICollection<SerialNumber> SerialNumbers { get; set; } = new List<SerialNumber>();
    public virtual ItemType? ItemType { get; set; }
    public virtual UnitOfMeasure? UnitOfMeasure { get; set; }

    public static StockKeepingUnit FromRequest(StockKeepingUnitRequest request)
    {
        return new StockKeepingUnit
        {
            Id = request.Id,
            SkuCode = request.SkuCode,
            Name = request.Name,
            Weight = request.Weight,
            WeightUnit = request.WeightUnit,
            Volume = request.Volume,
            VolumeUnit = request.VolumeUnit,
            ShelfLifeDays = request.ShelfLifeDays,
            HazardousMaterial = request.HazardousMaterial,
            ItemType = request.ItemType,
            UnitOfMeasure = request.UnitOfMeasure,
        };
    }
}
