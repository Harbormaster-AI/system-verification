
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Domain;

public class Contact
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? ContactId { get; set; }
    public virtual string? FirstName { get; set; }
    public virtual string? LastName { get; set; }
    public virtual string? Title { get; set; }
    public virtual EmailAddress? Email { get; set; }
    public virtual PhoneNumber? Phone { get; set; }
    public virtual PhoneNumber? Mobile { get; set; }
    public virtual Address? MailingAddress { get; set; }
    public virtual Organization? Organization { get; set; }
    public virtual Account? Account { get; set; }
    public virtual User? Owner { get; set; }
    public virtual ICollection<Activity> Activities { get; set; } = new List<Activity>();
    public virtual ICollection<Opportunity> Opportunities { get; set; } = new List<Opportunity>();
    public virtual ICollection<Case_> Cases { get; set; } = new List<Case_>();
    public virtual ICollection<Campaign> Campaigns { get; set; } = new List<Campaign>();
    public virtual ICollection<Note> Notes { get; set; } = new List<Note>();
    public virtual ICollection<EmailMessage> EmailMessages { get; set; } = new List<EmailMessage>();
    public virtual ContactMethod? PreferredContactMethod { get; set; }

    public static Contact FromRequest(ContactRequest request)
    {
        return new Contact
        {
            Id = request.Id,
            FirstName = request.FirstName,
            LastName = request.LastName,
            Title = request.Title,
            Email = request.Email,
            Phone = request.Phone,
            Mobile = request.Mobile,
            MailingAddress = request.MailingAddress,
            PreferredContactMethod = request.PreferredContactMethod,
        };
    }
}
