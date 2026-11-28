
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class NettingAgreement : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

 [Required]
public required virtual DateOnly AgreementDate { get; set; } 
 [Required]
[Length(0, int.MaxValue)]
public required virtual string GoverningLaw { get; set; } 
public virtual Counterparty? Counterparty { get; set; } 
public virtual ICollection<CollateralAgreement> CollateralAgreements { get; set; } = new List<CollateralAgreement>();
public virtual ICollection<Trade> Trades { get; set; } = new List<Trade>();
 public virtual NettingAgreementType? AgreementType { get; set; } 

    public static NettingAgreement FromRequest(NettingAgreementRequest request) {
        return new NettingAgreement {
            Id = request.Id,
            AgreementDate = request.AgreementDate,
            GoverningLaw = request.GoverningLaw,
            AgreementType = request.AgreementType,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
