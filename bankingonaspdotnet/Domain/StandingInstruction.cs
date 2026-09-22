using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Domain;

public class StandingInstruction
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? StandinginstructionId { get; set; } 
 public virtual string? InstructionId { get; set; } 
 public virtual Money? Amount { get; set; } 
 public virtual DateOnly? NextExecutionDate { get; set; } 
public virtual Account? Account { get; set; } 
public virtual ExternalAccount? Beneficiary { get; set; } 
 public virtual StandingInstructionFrequency? Frequency { get; set; } 
 public virtual StandingInstructionStatus? Status { get; set; } 

    public static StandingInstruction FromRequest(StandingInstructionRequest request) {
        return new StandingInstruction {
            Id = request.Id,
            InstructionId = request.InstructionId,
            Amount = request.Amount,
            NextExecutionDate = request.NextExecutionDate,
            Frequency = request.Frequency,
            Status = request.Status,
        };
    }
}
