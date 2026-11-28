
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class CollateralAccount : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

 [Required]
[Length(0, int.MaxValue)]
public required virtual string AccountName { get; set; } 
 [Required]
[Length(0, int.MaxValue)]
public required virtual string CustodyLocation { get; set; } 
public virtual CollateralAgreement? CollateralAgreement { get; set; } 
public virtual ICollection<Trade> Trades { get; set; } = new List<Trade>();
public virtual ICollection<MarginCall> MarginCalls { get; set; } = new List<MarginCall>();
 public virtual CollateralType? CollateralType { get; set; } 

    public static CollateralAccount FromRequest(CollateralAccountRequest request) {
        return new CollateralAccount {
            Id = request.Id,
            AccountName = request.AccountName,
            CustodyLocation = request.CustodyLocation,
            CollateralType = request.CollateralType,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
