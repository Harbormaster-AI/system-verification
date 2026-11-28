
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class Counterparty : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string LegalName { get; set; }
    [Required]
    public required virtual LegalEntityIdentifier Lei { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Sector { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string DomicileCountry { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string CreditRating { get; set; }
    public virtual ICollection<NettingAgreement> NettingAgreements { get; set; } = new List<NettingAgreement>();
    public virtual ICollection<Trade> Trades { get; set; } = new List<Trade>();
    public virtual ICollection<CollateralAgreement> CollateralAgreements { get; set; } = new List<CollateralAgreement>();
    public virtual ICollection<RiskLimit> Limits { get; set; } = new List<RiskLimit>();
    public virtual ICollection<MarginCall> MarginCalls { get; set; } = new List<MarginCall>();
    public virtual ICollection<SettlementInstruction> SettlementInstructions { get; set; } = new List<SettlementInstruction>();

    public static Counterparty FromRequest(CounterpartyRequest request)
    {
        return new Counterparty
        {
            Id = request.Id,
            LegalName = request.LegalName,
            Lei = request.Lei,
            Sector = request.Sector,
            DomicileCountry = request.DomicileCountry,
            CreditRating = request.CreditRating,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
