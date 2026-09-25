
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Domain;

public class PaymentCard
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? PaymentcardId { get; set; } 
 public virtual CardPAN? CardNumber { get; set; } 
 public virtual string? EmbossedName { get; set; } 
 public virtual int? ExpiryMonth { get; set; } 
 public virtual int? ExpiryYear { get; set; } 
public virtual Bank? Bank { get; set; } 
public virtual Account? Account { get; set; } 
public virtual Customer? Customer { get; set; } 
public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
 public virtual CardType? CardType { get; set; } 
 public virtual CardStatus? CardStatus { get; set; } 
 public virtual CardNetwork? Network { get; set; } 

    public static PaymentCard FromRequest(PaymentCardRequest request) {
        return new PaymentCard {
            Id = request.Id,
            CardNumber = request.CardNumber,
            EmbossedName = request.EmbossedName,
            ExpiryMonth = request.ExpiryMonth,
            ExpiryYear = request.ExpiryYear,
            CardType = request.CardType,
            CardStatus = request.CardStatus,
            Network = request.Network,
        };
    }
}
