
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Domain;

public class PriceBookEntry
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? PricebookentryId { get; set; }
    public virtual Money? UnitPrice { get; set; }
    public virtual DateOnly? EffectiveDate { get; set; }
    public virtual DateOnly? ExpirationDate { get; set; }
    public virtual bool? AsActive { get; set; }
    public virtual PriceBook? PriceBook { get; set; }
    public virtual Product? Product { get; set; }

    public static PriceBookEntry FromRequest(PriceBookEntryRequest request)
    {
        return new PriceBookEntry
        {
            Id = request.Id,
            UnitPrice = request.UnitPrice,
            EffectiveDate = request.EffectiveDate,
            ExpirationDate = request.ExpirationDate,
            AsActive = request.AsActive,
        };
    }
}
