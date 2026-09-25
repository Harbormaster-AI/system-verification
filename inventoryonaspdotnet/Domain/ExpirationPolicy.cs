
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Domain;

public class ExpirationPolicy
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? ExpirationpolicyId { get; set; }
    public virtual int? RejectIfDaysToExpireLessThan { get; set; }
    public virtual int? AutoQuarantineDaysToExpire { get; set; }
    public virtual StockKeepingUnit? Sku { get; set; }
    public virtual Warehouse? Warehouse { get; set; }
    public virtual RotationMethod? RotationMethod { get; set; }

    public static ExpirationPolicy FromRequest(ExpirationPolicyRequest request)
    {
        return new ExpirationPolicy
        {
            Id = request.Id,
            RejectIfDaysToExpireLessThan = request.RejectIfDaysToExpireLessThan,
            AutoQuarantineDaysToExpire = request.AutoQuarantineDaysToExpire,
            RotationMethod = request.RotationMethod,
        };
    }
}
