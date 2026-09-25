
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Domain;

public class ExternalAccount
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? ExternalaccountId { get; set; }
    public virtual string? Name { get; set; }
    public virtual IBAN? Iban { get; set; }
    public virtual AccountNumber? AccountNumber { get; set; }
    public virtual BIC? Bic { get; set; }
    public virtual string? BankName { get; set; }
    public virtual string? Country { get; set; }
    public virtual Customer? Customer { get; set; }
    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();

    public static ExternalAccount FromRequest(ExternalAccountRequest request)
    {
        return new ExternalAccount
        {
            Id = request.Id,
            Name = request.Name,
            Iban = request.Iban,
            AccountNumber = request.AccountNumber,
            Bic = request.Bic,
            BankName = request.BankName,
            Country = request.Country,
        };
    }
}
