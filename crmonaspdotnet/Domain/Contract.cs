
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Domain;

public class Contract
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? ContractId { get; set; }
    public virtual string? ContractNumber { get; set; }
    public virtual DateOnly? StartDate { get; set; }
    public virtual DateOnly? EndDate { get; set; }
    public virtual int? RenewalTermMonths { get; set; }
    public virtual bool? AutoRenew { get; set; }
    public virtual Organization? Organization { get; set; }
    public virtual Account? Account { get; set; }
    public virtual User? Owner { get; set; }
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
    public virtual ICollection<Case_> Cases { get; set; } = new List<Case_>();
    public virtual ContractStatus? Status { get; set; }

    public static Contract FromRequest(ContractRequest request)
    {
        return new Contract
        {
            Id = request.Id,
            ContractNumber = request.ContractNumber,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            RenewalTermMonths = request.RenewalTermMonths,
            AutoRenew = request.AutoRenew,
            Status = request.Status,
        };
    }
}
