using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Domain;

public class KycProfile
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? KycprofileId { get; set; } 
 public virtual string? ProfileId { get; set; } 
 public virtual DateOnly? LastReviewedOn { get; set; } 
public virtual Customer? Customer { get; set; } 
public virtual ICollection<IdentityDocument> IdentityDocuments { get; set; } = new List<IdentityDocument>();
public virtual ICollection<RiskAssessment> RiskAssessments { get; set; } = new List<RiskAssessment>();
public virtual ICollection<ScreeningResult> Screenings { get; set; } = new List<ScreeningResult>();
 public virtual KycStatus? Status { get; set; } 

    public static KycProfile FromRequest(KycProfileRequest request) {
        return new KycProfile {
            Id = request.Id,
            ProfileId = request.ProfileId,
            LastReviewedOn = request.LastReviewedOn,
            Status = request.Status,
        };
    }
}
