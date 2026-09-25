
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Domain;

public class Opportunity
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? OpportunityId { get; set; }
    public virtual string? Name { get; set; }
    public virtual Money? Amount { get; set; }
    public virtual DateOnly? CloseDate { get; set; }
    public virtual decimal? Probability { get; set; }
    public virtual string? Description { get; set; }
    public virtual Organization? Organization { get; set; }
    public virtual Account? Account { get; set; }
    public virtual User? Owner { get; set; }
    public virtual ICollection<Contact> Contacts { get; set; } = new List<Contact>();
    public virtual ICollection<OpportunityLineItem> LineItems { get; set; } = new List<OpportunityLineItem>();
    public virtual ICollection<OpportunityStageHistory> StageHistory { get; set; } = new List<OpportunityStageHistory>();
    public virtual ICollection<Quote> Quotes { get; set; } = new List<Quote>();
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
    public virtual ICollection<Campaign> Campaigns { get; set; } = new List<Campaign>();
    public virtual ICollection<Activity> Activities { get; set; } = new List<Activity>();
    public virtual ICollection<Team> Teams { get; set; } = new List<Team>();
    public virtual OpportunityStage? Stage { get; set; }
    public virtual OpportunityType? Type { get; set; }
    public virtual ForecastCategory? ForecastCategory { get; set; }

    public static Opportunity FromRequest(OpportunityRequest request)
    {
        return new Opportunity
        {
            Id = request.Id,
            Name = request.Name,
            Amount = request.Amount,
            CloseDate = request.CloseDate,
            Probability = request.Probability,
            Description = request.Description,
            Stage = request.Stage,
            Type = request.Type,
            ForecastCategory = request.ForecastCategory,
        };
    }
}
