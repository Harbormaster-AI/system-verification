
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Domain;

public class EmailMessage
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? EmailmessageId { get; set; }
    public virtual string? Subject { get; set; }
    public virtual string? Body { get; set; }
    public virtual DateTime? SentAt { get; set; }
    public virtual string? MessageId { get; set; }
    public virtual Organization? Organization { get; set; }
    public virtual User? Owner { get; set; }
    public virtual Account? Account { get; set; }
    public virtual Contact? Contact { get; set; }
    public virtual Lead? Lead { get; set; }
    public virtual Case_? Case_ { get; set; }
    public virtual Opportunity? Opportunity { get; set; }
    public virtual Campaign? Campaign { get; set; }
    public virtual EmailDirection? Direction { get; set; }
    public virtual EmailStatus? Status { get; set; }

    public static EmailMessage FromRequest(EmailMessageRequest request)
    {
        return new EmailMessage
        {
            Id = request.Id,
            Subject = request.Subject,
            Body = request.Body,
            SentAt = request.SentAt,
            MessageId = request.MessageId,
            Direction = request.Direction,
            Status = request.Status,
        };
    }
}
