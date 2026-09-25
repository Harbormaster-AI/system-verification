
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Domain;

public class RepaymentSchedule
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? RepaymentscheduleId { get; set; } 
 public virtual int? InstallmentNumber { get; set; } 
 public virtual DateOnly? DueDate { get; set; } 
 public virtual Money? PrincipalDue { get; set; } 
 public virtual Money? InterestDue { get; set; } 
 public virtual Money? TotalDue { get; set; } 
public virtual LoanAccount? LoanAccount { get; set; } 
public virtual LoanPayment? Payment { get; set; } 
 public virtual InstallmentStatus? Status { get; set; } 

    public static RepaymentSchedule FromRequest(RepaymentScheduleRequest request) {
        return new RepaymentSchedule {
            Id = request.Id,
            InstallmentNumber = request.InstallmentNumber,
            DueDate = request.DueDate,
            PrincipalDue = request.PrincipalDue,
            InterestDue = request.InterestDue,
            TotalDue = request.TotalDue,
            Status = request.Status,
        };
    }
}
