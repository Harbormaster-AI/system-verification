
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Domain;

public class ExchangeRate
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? ExchangerateId { get; set; }
    public virtual string? BaseCurrency { get; set; }
    public virtual string? CounterCurrency { get; set; }
    public virtual decimal? Rate { get; set; }
    public virtual DateOnly? AsOf { get; set; }
    public virtual string? Source { get; set; }
    public virtual Bank? Bank { get; set; }
    public virtual ICollection<FXTrade> FxTrades { get; set; } = new List<FXTrade>();

    public static ExchangeRate FromRequest(ExchangeRateRequest request)
    {
        return new ExchangeRate
        {
            Id = request.Id,
            BaseCurrency = request.BaseCurrency,
            CounterCurrency = request.CounterCurrency,
            Rate = request.Rate,
            AsOf = request.AsOf,
            Source = request.Source,
        };
    }
}
