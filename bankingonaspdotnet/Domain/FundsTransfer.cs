
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Domain;

public class FundsTransfer
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? FundstransferId { get; set; } 
 public virtual string? TransferReference { get; set; } 
 public virtual Money? Amount { get; set; } 
 public virtual DateOnly? RequestedDate { get; set; } 
 public virtual DateOnly? ExecutionDate { get; set; } 
 public virtual string? Purpose { get; set; } 
 public virtual Money? FeeAmount { get; set; } 
public virtual Account? SourceAccount { get; set; } 
public virtual Account? DestinationAccount { get; set; } 
public virtual ExternalAccount? ExternalBeneficiary { get; set; } 
public virtual Customer? InitiatedBy { get; set; } 
public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
 public virtual PaymentMethod? Method { get; set; } 
 public virtual PaymentStatus? Status { get; set; } 

    public static FundsTransfer FromRequest(FundsTransferRequest request) {
        return new FundsTransfer {
            Id = request.Id,
            TransferReference = request.TransferReference,
            Amount = request.Amount,
            RequestedDate = request.RequestedDate,
            ExecutionDate = request.ExecutionDate,
            Purpose = request.Purpose,
            FeeAmount = request.FeeAmount,
            Method = request.Method,
            Status = request.Status,
        };
    }
}
