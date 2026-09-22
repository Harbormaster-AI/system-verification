using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Domain;

public class BankingProduct
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? BankingproductId { get; set; }
    public virtual string? ProductCode { get; set; }
    public virtual string? Name { get; set; }
    public virtual string? Description { get; set; }
    public virtual Bank? Bank { get; set; }
    public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();
    public virtual ICollection<LoanAccount> LoanAccounts { get; set; } = new List<LoanAccount>();
    public virtual ICollection<PaymentCard> PaymentCards { get; set; } = new List<PaymentCard>();
    public virtual ProductCategory? ProductCategory { get; set; }

    public static BankingProduct FromRequest(BankingProductRequest request)
    {
        return new BankingProduct
        {
            Id = request.Id,
            ProductCode = request.ProductCode,
            Name = request.Name,
            Description = request.Description,
            ProductCategory = request.ProductCategory,
        };
    }
}
