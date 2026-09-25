
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Domain;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? UserId { get; set; } 
 public virtual string? Username { get; set; } 
 public virtual string? FullName { get; set; } 
 public virtual EmailAddress? Email { get; set; } 
 public virtual _Locale? Locale { get; set; } 
public virtual Organization? Organization { get; set; } 
public virtual ICollection<Team> Teams { get; set; } = new List<Team>();
public virtual ICollection<Activity> Activities { get; set; } = new List<Activity>();
public virtual ICollection<Account> OwnedAccounts { get; set; } = new List<Account>();
public virtual ICollection<Lead> OwnedLeads { get; set; } = new List<Lead>();
public virtual ICollection<Opportunity> OwnedOpportunities { get; set; } = new List<Opportunity>();
public virtual ICollection<Case_> OwnedCases { get; set; } = new List<Case_>();
public virtual ICollection<Quote> Quotes { get; set; } = new List<Quote>();
public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
public virtual ICollection<Contract> Contracts { get; set; } = new List<Contract>();
public virtual ICollection<EmailMessage> EmailMessages { get; set; } = new List<EmailMessage>();
 public virtual UserRole? Role { get; set; } 
 public virtual UserStatus? Status { get; set; } 

    public static User FromRequest(UserRequest request) {
        return new User {
            Id = request.Id,
            Username = request.Username,
            FullName = request.FullName,
            Email = request.Email,
            Locale = request.Locale,
            Role = request.Role,
            Status = request.Status,
        };
    }
}
