
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Domain;

public class Account
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? AccountId { get; set; } 
 public virtual string? Name { get; set; } 
 public virtual string? AccountNumber { get; set; } 
 public virtual string? Industry { get; set; } 
 public virtual Address? BillingAddress { get; set; } 
 public virtual Address? ShippingAddress { get; set; } 
 public virtual URL? Website { get; set; } 
 public virtual PhoneNumber? Phone { get; set; } 
 public virtual bool? AsActive { get; set; } 
public virtual Organization? Organization { get; set; } 
public virtual Account? ParentAccount { get; set; } 
public virtual ICollection<Account> ChildAccounts { get; set; } = new List<Account>();
public virtual ICollection<Contact> Contacts { get; set; } = new List<Contact>();
public virtual ICollection<Opportunity> Opportunities { get; set; } = new List<Opportunity>();
public virtual ICollection<Case_> Cases { get; set; } = new List<Case_>();
public virtual User? Owner { get; set; } 
public virtual Territory? Territory { get; set; } 
public virtual ICollection<Activity> Activities { get; set; } = new List<Activity>();
public virtual ICollection<Campaign> Campaigns { get; set; } = new List<Campaign>();
public virtual ICollection<Quote> Quotes { get; set; } = new List<Quote>();
public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
public virtual ICollection<Contract> Contracts { get; set; } = new List<Contract>();
public virtual ICollection<Note> Notes { get; set; } = new List<Note>();
public virtual ICollection<EmailMessage> EmailMessages { get; set; } = new List<EmailMessage>();
 public virtual AccountType? AccountType { get; set; } 
 public virtual AccountLifecycleStage? LifecycleStage { get; set; } 

    public static Account FromRequest(AccountRequest request) {
        return new Account {
            Id = request.Id,
            Name = request.Name,
            AccountNumber = request.AccountNumber,
            Industry = request.Industry,
            BillingAddress = request.BillingAddress,
            ShippingAddress = request.ShippingAddress,
            Website = request.Website,
            Phone = request.Phone,
            AsActive = request.AsActive,
            AccountType = request.AccountType,
            LifecycleStage = request.LifecycleStage,
        };
    }
}
