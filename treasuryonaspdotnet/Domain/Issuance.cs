
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class Issuance : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

 [Required]
[Length(0, int.MaxValue)]
public required virtual string IssueName { get; set; } 
 [Required]
public required virtual ISIN Isin { get; set; } 
 [Required]
public required virtual DateOnly IssueDate { get; set; } 
 [Required]
public required virtual DateOnly MaturityDate { get; set; } 
 [Required]
public required virtual Rate CouponRate { get; set; } 
 [Required]
public required virtual Money Amount { get; set; } 
public virtual FundingProgram? FundingProgram { get; set; } 
public virtual ICollection<CashFlow> CashFlows { get; set; } = new List<CashFlow>();
public virtual Portfolio? Portfolio { get; set; } 
 public virtual InstrumentType? InstrumentType { get; set; } 
 public virtual IssuanceStatus? Status { get; set; } 

    public static Issuance FromRequest(IssuanceRequest request) {
        return new Issuance {
            Id = request.Id,
            IssueName = request.IssueName,
            Isin = request.Isin,
            IssueDate = request.IssueDate,
            MaturityDate = request.MaturityDate,
            CouponRate = request.CouponRate,
            Amount = request.Amount,
            InstrumentType = request.InstrumentType,
            Status = request.Status,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
