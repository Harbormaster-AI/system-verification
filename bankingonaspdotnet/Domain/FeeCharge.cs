
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Domain;

public class FeeCharge
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? FeechargeId { get; set; }
    public virtual string? FeeCode { get; set; }
    public virtual Money? Amount { get; set; }
    public virtual DateOnly? AppliedOn { get; set; }
    public virtual Account? Account { get; set; }
    public virtual LoanAccount? LoanAccount { get; set; }
    public virtual FeeType? FeeType { get; set; }

    public static FeeCharge FromRequest(FeeChargeRequest request)
    {
        return new FeeCharge
        {
            Id = request.Id,
            FeeCode = request.FeeCode,
            Amount = request.Amount,
            AppliedOn = request.AppliedOn,
            FeeType = request.FeeType,
        };
    }
}
