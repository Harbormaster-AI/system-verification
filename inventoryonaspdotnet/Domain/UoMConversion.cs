
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Domain;

public class UoMConversion
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? UomconversionId { get; set; }
    public virtual decimal? Factor { get; set; }
    public virtual int? Precision { get; set; }
    public virtual StockKeepingUnit? Sku { get; set; }
    public virtual UnitOfMeasure? FromUnit { get; set; }
    public virtual UnitOfMeasure? ToUnit { get; set; }

    public static UoMConversion FromRequest(UoMConversionRequest request)
    {
        return new UoMConversion
        {
            Id = request.Id,
            Factor = request.Factor,
            Precision = request.Precision,
            FromUnit = request.FromUnit,
            ToUnit = request.ToUnit,
        };
    }
}
