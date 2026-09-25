
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Domain;

public class ScreeningResult
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? ScreeningresultId { get; set; }
    public virtual DateOnly? ScreeningDate { get; set; }
    public virtual string? Provider { get; set; }
    public virtual KycProfile? KycProfile { get; set; }
    public virtual ScreeningOutcome? Outcome { get; set; }

    public static ScreeningResult FromRequest(ScreeningResultRequest request)
    {
        return new ScreeningResult
        {
            Id = request.Id,
            ScreeningDate = request.ScreeningDate,
            Provider = request.Provider,
            Outcome = request.Outcome,
        };
    }
}
