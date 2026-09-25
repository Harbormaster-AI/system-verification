
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Domain;

public class Quote
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? QuoteId { get; set; }
    public virtual string? QuoteNumber { get; set; }
    public virtual DateOnly? ValidityStart { get; set; }
    public virtual DateOnly? ValidityEnd { get; set; }
    public virtual Money? TotalAmount { get; set; }
    public virtual decimal? DiscountPercent { get; set; }
    public virtual Money? TaxAmount { get; set; }
    public virtual Money? ShippingAmount { get; set; }
    public virtual Organization? Organization { get; set; }
    public virtual Account? Account { get; set; }
    public virtual Opportunity? Opportunity { get; set; }
    public virtual User? Owner { get; set; }
    public virtual ICollection<QuoteLineItem> LineItems { get; set; } = new List<QuoteLineItem>();
    public virtual PriceBook? PriceBook { get; set; }
    public virtual Order? Order { get; set; }
    public virtual QuoteStatus? Status { get; set; }

    public static Quote FromRequest(QuoteRequest request)
    {
        return new Quote
        {
            Id = request.Id,
            QuoteNumber = request.QuoteNumber,
            ValidityStart = request.ValidityStart,
            ValidityEnd = request.ValidityEnd,
            TotalAmount = request.TotalAmount,
            DiscountPercent = request.DiscountPercent,
            TaxAmount = request.TaxAmount,
            ShippingAmount = request.ShippingAmount,
            Status = request.Status,
        };
    }
}
