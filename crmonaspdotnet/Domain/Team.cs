
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Domain;

public class Team
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? TeamId { get; set; } 
 public virtual string? Name { get; set; } 
public virtual Organization? Organization { get; set; } 
public virtual ICollection<User> Users { get; set; } = new List<User>();
public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();
public virtual ICollection<Opportunity> Opportunities { get; set; } = new List<Opportunity>();
public virtual ICollection<Case_> Cases { get; set; } = new List<Case_>();
public virtual ICollection<Campaign> Campaigns { get; set; } = new List<Campaign>();
 public virtual TeamType? TeamType { get; set; } 

    public static Team FromRequest(TeamRequest request) {
        return new Team {
            Id = request.Id,
            Name = request.Name,
            TeamType = request.TeamType,
        };
    }
}
