using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Domain;

public class Bank
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? BankId { get; set; }
    public virtual string? Name { get; set; }
    public virtual string? LegalName { get; set; }
    public virtual BIC? SwiftBic { get; set; }
    public virtual string? HeadquartersCountry { get; set; }
    public virtual string? Website { get; set; }
    public virtual ICollection<Branch> Branches { get; set; } = new List<Branch>();
    public virtual ICollection<BankingProduct> Products { get; set; } = new List<BankingProduct>();
    public virtual ICollection<Customer> Customers { get; set; } = new List<Customer>();
    public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();
    public virtual ICollection<PaymentCard> PaymentCards { get; set; } = new List<PaymentCard>();
    public virtual ICollection<LoanAccount> LoanAccounts { get; set; } = new List<LoanAccount>();
    public virtual ICollection<ExchangeRate> ExchangeRates { get; set; } = new List<ExchangeRate>();
    public virtual ICollection<Consent> Consents { get; set; } = new List<Consent>();
    public virtual ICollection<ThirdPartyProvider> ThirdPartyProviders { get; set; } = new List<ThirdPartyProvider>();

    public static Bank FromRequest(BankRequest request)
    {
        return new Bank
        {
            Id = request.Id,
            Name = request.Name,
            LegalName = request.LegalName,
            SwiftBic = request.SwiftBic,
            HeadquartersCountry = request.HeadquartersCountry,
            Website = request.Website,
        };
    }
}
