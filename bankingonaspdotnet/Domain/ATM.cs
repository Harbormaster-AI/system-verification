
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Domain;

public class ATM
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? AtmId { get; set; } 
 public virtual string? TerminalId { get; set; } 
 public virtual Address? Location { get; set; } 
public virtual Branch? Branch { get; set; } 
 public virtual ATMStatus? Status { get; set; } 

    public static ATM FromRequest(ATMRequest request) {
        return new ATM {
            Id = request.Id,
            TerminalId = request.TerminalId,
            Location = request.Location,
            Status = request.Status,
        };
    }
}
