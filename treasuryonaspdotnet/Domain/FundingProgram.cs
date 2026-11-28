
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class FundingProgram : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

 [Required]
[Length(0, int.MaxValue)]
public required virtual string ProgramName { get; set; } 
 [Required]
public required virtual Money LimitAmount { get; set; } 
 [Required]
[Length(0, int.MaxValue)]
public required virtual string Rating { get; set; } 
public virtual ICollection<Issuance> Issuances { get; set; } = new List<Issuance>();
public virtual TreasuryUnit? TreasuryUnit { get; set; } 
 public virtual FundingInstrumentType? InstrumentFamily { get; set; } 

    public static FundingProgram FromRequest(FundingProgramRequest request) {
        return new FundingProgram {
            Id = request.Id,
            ProgramName = request.ProgramName,
            LimitAmount = request.LimitAmount,
            Rating = request.Rating,
            InstrumentFamily = request.InstrumentFamily,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
