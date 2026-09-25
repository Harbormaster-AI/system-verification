
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Domain;

public class RiskAssessment
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? RiskassessmentId { get; set; }
    public virtual int? Score { get; set; }
    public virtual DateOnly? AssessedOn { get; set; }
    public virtual KycProfile? KycProfile { get; set; }
    public virtual RiskRating? Rating { get; set; }

    public static RiskAssessment FromRequest(RiskAssessmentRequest request)
    {
        return new RiskAssessment
        {
            Id = request.Id,
            Score = request.Score,
            AssessedOn = request.AssessedOn,
            Rating = request.Rating,
        };
    }
}
