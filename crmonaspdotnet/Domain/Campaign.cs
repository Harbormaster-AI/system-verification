
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Domain;

public class Campaign
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? CampaignId { get; set; } 
 public virtual string? Name { get; set; } 
 public virtual DateOnly? StartDate { get; set; } 
 public virtual DateOnly? EndDate { get; set; } 
 public virtual Money? Budget { get; set; } 
 public virtual Money? ActualCost { get; set; } 
 public virtual Money? ExpectedRevenue { get; set; } 
public virtual Organization? Organization { get; set; } 
public virtual Campaign? ParentCampaign { get; set; } 
public virtual ICollection<Campaign> ChildCampaigns { get; set; } = new List<Campaign>();
public virtual ICollection<CampaignMember> Members { get; set; } = new List<CampaignMember>();
public virtual ICollection<Opportunity> Opportunities { get; set; } = new List<Opportunity>();
public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();
public virtual ICollection<Lead> Leads { get; set; } = new List<Lead>();
public virtual ICollection<Contact> Contacts { get; set; } = new List<Contact>();
public virtual ICollection<Team> Teams { get; set; } = new List<Team>();
public virtual ICollection<Activity> Activities { get; set; } = new List<Activity>();
 public virtual CampaignStatus? Status { get; set; } 
 public virtual CampaignType? Type { get; set; } 

    public static Campaign FromRequest(CampaignRequest request) {
        return new Campaign {
            Id = request.Id,
            Name = request.Name,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            Budget = request.Budget,
            ActualCost = request.ActualCost,
            ExpectedRevenue = request.ExpectedRevenue,
            Status = request.Status,
            Type = request.Type,
        };
    }
}
