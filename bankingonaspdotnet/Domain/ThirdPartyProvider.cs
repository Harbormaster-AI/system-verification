
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Domain;

public class ThirdPartyProvider
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? ThirdpartyproviderId { get; set; }
    public virtual string? Name { get; set; }
    public virtual string? RegistrationId { get; set; }
    public virtual string? Website { get; set; }
    public virtual Bank? Bank { get; set; }
    public virtual ICollection<Consent> Consents { get; set; } = new List<Consent>();

    public static ThirdPartyProvider FromRequest(ThirdPartyProviderRequest request)
    {
        return new ThirdPartyProvider
        {
            Id = request.Id,
            Name = request.Name,
            RegistrationId = request.RegistrationId,
            Website = request.Website,
        };
    }
}
