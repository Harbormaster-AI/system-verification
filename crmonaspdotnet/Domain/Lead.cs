
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Domain;

public class Lead
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? LeadId { get; set; } 
 public virtual string? FirstName { get; set; } 
 public virtual string? LastName { get; set; } 
 public virtual string? Company { get; set; } 
 public virtual EmailAddress? Email { get; set; } 
 public virtual PhoneNumber? Phone { get; set; } 
 public virtual bool? Converted { get; set; } 
public virtual Organization? Organization { get; set; } 
public virtual User? Owner { get; set; } 
public virtual ICollection<Activity> Activities { get; set; } = new List<Activity>();
public virtual ICollection<Campaign> Campaigns { get; set; } = new List<Campaign>();
public virtual Account? ConvertedAccount { get; set; } 
public virtual Contact? ConvertedContact { get; set; } 
public virtual Opportunity? ConvertedOpportunity { get; set; } 
public virtual ICollection<Note> Notes { get; set; } = new List<Note>();
public virtual ICollection<EmailMessage> EmailMessages { get; set; } = new List<EmailMessage>();
 public virtual LeadStatus? Status { get; set; } 
 public virtual LeadSource? Source { get; set; } 
 public virtual LeadRating? Rating { get; set; } 

    public static Lead FromRequest(LeadRequest request) {
        return new Lead {
            Id = request.Id,
            FirstName = request.FirstName,
            LastName = request.LastName,
            Company = request.Company,
            Email = request.Email,
            Phone = request.Phone,
            Converted = request.Converted,
            Status = request.Status,
            Source = request.Source,
            Rating = request.Rating,
        };
    }
}
