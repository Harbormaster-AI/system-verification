
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class CollateralAgreement : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

 [Required]
public required virtual Money Threshold { get; set; } 
 [Required]
public required virtual Money MinimumTransferAmount { get; set; } 
 [Required]
public required virtual Money IndependentAmount { get; set; } 
 [Required]
[Length(0, int.MaxValue)]
public required virtual string MarginFrequency { get; set; } 
public virtual NettingAgreement? NettingAgreement { get; set; } 
public virtual ICollection<MarginCall> MarginCalls { get; set; } = new List<MarginCall>();
public virtual ICollection<CollateralAccount> CollateralAccounts { get; set; } = new List<CollateralAccount>();
public virtual Counterparty? Counterparty { get; set; } 
 public virtual CollateralAgreementType? AgreementType { get; set; } 
 public virtual CollateralType? EligibleCollateral { get; set; } 

    public static CollateralAgreement FromRequest(CollateralAgreementRequest request) {
        return new CollateralAgreement {
            Id = request.Id,
            Threshold = request.Threshold,
            MinimumTransferAmount = request.MinimumTransferAmount,
            IndependentAmount = request.IndependentAmount,
            MarginFrequency = request.MarginFrequency,
            AgreementType = request.AgreementType,
            EligibleCollateral = request.EligibleCollateral,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
