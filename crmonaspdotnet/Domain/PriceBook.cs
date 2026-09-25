
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Domain;

public class PriceBook
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? PricebookId { get; set; }
    public virtual string? Name { get; set; }
    public virtual bool? AsActive { get; set; }
    public virtual string? Description { get; set; }
    public virtual Organization? Organization { get; set; }
    public virtual ICollection<PriceBookEntry> Entries { get; set; } = new List<PriceBookEntry>();
    public virtual ICollection<Quote> Quotes { get; set; } = new List<Quote>();
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public static PriceBook FromRequest(PriceBookRequest request)
    {
        return new PriceBook
        {
            Id = request.Id,
            Name = request.Name,
            AsActive = request.AsActive,
            Description = request.Description,
        };
    }
}
