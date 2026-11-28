
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class TradingBook : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

 [Required]
[Length(0, int.MaxValue)]
public required virtual string Name { get; set; } 
public virtual TreasuryUnit? TreasuryUnit { get; set; } 
public virtual ICollection<Portfolio> Portfolios { get; set; } = new List<Portfolio>();
public virtual ICollection<RiskLimit> Limits { get; set; } = new List<RiskLimit>();
public virtual ICollection<Trade> Trades { get; set; } = new List<Trade>();
 public virtual BookCategory? BookCategory { get; set; } 

    public static TradingBook FromRequest(TradingBookRequest request) {
        return new TradingBook {
            Id = request.Id,
            Name = request.Name,
            BookCategory = request.BookCategory,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
