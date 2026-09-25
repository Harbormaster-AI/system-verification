
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Domain;

public class LoanPayment
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? LoanpaymentId { get; set; } 
 public virtual string? PaymentReference { get; set; } 
 public virtual Money? Amount { get; set; } 
 public virtual DateOnly? PaymentDate { get; set; } 
public virtual LoanAccount? LoanAccount { get; set; } 
public virtual Transaction? Transaction { get; set; } 
 public virtual PaymentMethod? Method { get; set; } 
 public virtual PaymentStatus? Status { get; set; } 

    public static LoanPayment FromRequest(LoanPaymentRequest request) {
        return new LoanPayment {
            Id = request.Id,
            PaymentReference = request.PaymentReference,
            Amount = request.Amount,
            PaymentDate = request.PaymentDate,
            Method = request.Method,
            Status = request.Status,
        };
    }
}
