
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Domain;

public class Branch
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? BranchId { get; set; } 
 public virtual string? Name { get; set; } 
 public virtual string? BranchCode { get; set; } 
 public virtual Address? Address { get; set; } 
 public virtual string? Phone { get; set; } 
 public virtual string? OpeningHours { get; set; } 
public virtual Bank? Bank { get; set; } 
public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();
public virtual ICollection<LoanAccount> LoanAccounts { get; set; } = new List<LoanAccount>();
public virtual ICollection<ATM> Atms { get; set; } = new List<ATM>();

    public static Branch FromRequest(BranchRequest request) {
        return new Branch {
            Id = request.Id,
            Name = request.Name,
            BranchCode = request.BranchCode,
            Address = request.Address,
            Phone = request.Phone,
            OpeningHours = request.OpeningHours,
        };
    }
}
