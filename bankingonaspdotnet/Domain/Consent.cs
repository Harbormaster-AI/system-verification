using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Domain;

public class Consent
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? ConsentId { get; set; }
    public virtual DateOnly? GrantedOn { get; set; }
    public virtual DateOnly? ExpiresOn { get; set; }
    public virtual Customer? Customer { get; set; }
    public virtual Bank? Bank { get; set; }
    public virtual ICollection<Account> AuthorizedAccounts { get; set; } = new List<Account>();
    public virtual ThirdPartyProvider? ThirdPartyProvider { get; set; }
    public virtual ConsentType? ConsentType { get; set; }
    public virtual ConsentStatus? Status { get; set; }

    public static Consent FromRequest(ConsentRequest request)
    {
        return new Consent
        {
            Id = request.Id,
            GrantedOn = request.GrantedOn,
            ExpiresOn = request.ExpiresOn,
            ConsentType = request.ConsentType,
            Status = request.Status,
        };
    }
}
