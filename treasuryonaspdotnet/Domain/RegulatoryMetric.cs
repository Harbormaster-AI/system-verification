
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class RegulatoryMetric : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

 [Required]
public required virtual decimal Value { get; set; } 
 [Required]
[Length(0, int.MaxValue)]
public required virtual string Currency { get; set; } 
public virtual RiskReport? RiskReport { get; set; } 
public virtual LiquidityBuffer? LiquidityBuffer { get; set; } 
 public virtual RegMetricType? MetricType { get; set; } 
 public virtual LiquidityHorizon? Horizon { get; set; } 

    public static RegulatoryMetric FromRequest(RegulatoryMetricRequest request) {
        return new RegulatoryMetric {
            Id = request.Id,
            Value = request.Value,
            Currency = request.Currency,
            MetricType = request.MetricType,
            Horizon = request.Horizon,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
