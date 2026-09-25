
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Domain;

public class ReplenishmentPolicy
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? ReplenishmentpolicyId { get; set; } 
 public virtual decimal? MinLevel { get; set; } 
 public virtual decimal? MaxLevel { get; set; } 
 public virtual decimal? ReorderPoint { get; set; } 
 public virtual decimal? ReorderQuantity { get; set; } 
 public virtual int? LeadTimeDays { get; set; } 
 public virtual int? ReviewPeriodDays { get; set; } 
public virtual StockKeepingUnit? Sku { get; set; } 
public virtual Warehouse? Warehouse { get; set; } 
public virtual StorageLocation? Location { get; set; } 
 public virtual ReplenishmentPolicyType? PolicyType { get; set; } 

    public static ReplenishmentPolicy FromRequest(ReplenishmentPolicyRequest request) {
        return new ReplenishmentPolicy {
            Id = request.Id,
            MinLevel = request.MinLevel,
            MaxLevel = request.MaxLevel,
            ReorderPoint = request.ReorderPoint,
            ReorderQuantity = request.ReorderQuantity,
            LeadTimeDays = request.LeadTimeDays,
            ReviewPeriodDays = request.ReviewPeriodDays,
            PolicyType = request.PolicyType,
        };
    }
}
