
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Domain;

public class Collateral
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? CollateralId { get; set; } 
 public virtual string? CollateralIdentifier { get; set; } 
 public virtual Money? AppraisedValue { get; set; } 
 public virtual string? Description { get; set; } 
 public virtual Address? Location { get; set; } 
public virtual LoanAccount? LoanAccount { get; set; } 
 public virtual CollateralType? CollateralType { get; set; } 

    public static Collateral FromRequest(CollateralRequest request) {
        return new Collateral {
            Id = request.Id,
            CollateralIdentifier = request.CollateralIdentifier,
            AppraisedValue = request.AppraisedValue,
            Description = request.Description,
            Location = request.Location,
            CollateralType = request.CollateralType,
        };
    }
}
