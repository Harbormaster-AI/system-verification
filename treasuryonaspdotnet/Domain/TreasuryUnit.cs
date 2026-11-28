
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class TreasuryUnit : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

 [Required]
[Length(0, int.MaxValue)]
public required virtual string Name { get; set; } 
 [Required]
[Length(0, int.MaxValue)]
public required virtual string Region { get; set; } 
 [Required]
[Length(0, int.MaxValue)]
public required virtual string BookingLocation { get; set; } 
 [Required]
[Length(0, int.MaxValue)]
public required virtual string BaseCurrency { get; set; } 
public virtual ICollection<TradingBook> TradingBooks { get; set; } = new List<TradingBook>();
public virtual ICollection<BankAccount> BankAccounts { get; set; } = new List<BankAccount>();
public virtual ICollection<TreasuryPolicy> Policies { get; set; } = new List<TreasuryPolicy>();
public virtual ICollection<TransferPricingRule> TransferPricingRules { get; set; } = new List<TransferPricingRule>();
public virtual ICollection<InternalDeal> InternalDealsOut { get; set; } = new List<InternalDeal>();
public virtual ICollection<InternalDeal> InternalDealsIn { get; set; } = new List<InternalDeal>();

    public static TreasuryUnit FromRequest(TreasuryUnitRequest request) {
        return new TreasuryUnit {
            Id = request.Id,
            Name = request.Name,
            Region = request.Region,
            BookingLocation = request.BookingLocation,
            BaseCurrency = request.BaseCurrency,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
