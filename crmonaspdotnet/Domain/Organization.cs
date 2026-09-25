
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Domain;

public class Organization
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? OrganizationId { get; set; } 
 public virtual string? Name { get; set; } 
 public virtual string? DefaultCurrency { get; set; } 
 public virtual _Locale? DefaultLocale { get; set; } 
 public virtual URL? Website { get; set; } 
public virtual ICollection<User> Users { get; set; } = new List<User>();
public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();
public virtual ICollection<Team> Teams { get; set; } = new List<Team>();
public virtual ICollection<Territory> Territories { get; set; } = new List<Territory>();
public virtual ICollection<Product> Products { get; set; } = new List<Product>();
public virtual ICollection<PriceBook> PriceBooks { get; set; } = new List<PriceBook>();
public virtual ICollection<Campaign> Campaigns { get; set; } = new List<Campaign>();

    public static Organization FromRequest(OrganizationRequest request) {
        return new Organization {
            Id = request.Id,
            Name = request.Name,
            DefaultCurrency = request.DefaultCurrency,
            DefaultLocale = request.DefaultLocale,
            Website = request.Website,
        };
    }
}
