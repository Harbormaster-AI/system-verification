using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Domain;

public class Transaction
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? TransactionId { get; set; }
    public virtual DateOnly? BookingDate { get; set; }
    public virtual DateOnly? ValueDate { get; set; }
    public virtual Money? Amount { get; set; }
    public virtual string? Description { get; set; }
    public virtual Account? Account { get; set; }
    public virtual ExternalAccount? ExternalCounterparty { get; set; }
    public virtual PaymentCard? PaymentCard { get; set; }
    public virtual FundsTransfer? FundsTransfer { get; set; }
    public virtual FXTrade? FxTrade { get; set; }
    public virtual Dispute? Dispute { get; set; }
    public virtual TransactionDirection? Direction { get; set; }
    public virtual TransactionType? TransactionType { get; set; }
    public virtual TransactionStatus? Status { get; set; }
    public virtual ChannelType? Channel { get; set; }

    public static Transaction FromRequest(TransactionRequest request)
    {
        return new Transaction
        {
            Id = request.Id,
            BookingDate = request.BookingDate,
            ValueDate = request.ValueDate,
            Amount = request.Amount,
            Description = request.Description,
            Direction = request.Direction,
            TransactionType = request.TransactionType,
            Status = request.Status,
            Channel = request.Channel,
        };
    }
}
