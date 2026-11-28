
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class RiskReport : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public required virtual DateOnly ReportDate { get; set; }
    public virtual Portfolio? Portfolio { get; set; }
    public virtual ICollection<Position> Positions { get; set; } = new List<Position>();
    public virtual ICollection<RegulatoryMetric> RegulatoryMetrics { get; set; } = new List<RegulatoryMetric>();
    public virtual RiskReportType? ReportType { get; set; }
    public virtual ReportStatus? Status { get; set; }

    public static RiskReport FromRequest(RiskReportRequest request)
    {
        return new RiskReport
        {
            Id = request.Id,
            ReportDate = request.ReportDate,
            ReportType = request.ReportType,
            Status = request.Status,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
