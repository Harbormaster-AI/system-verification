using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface IRiskReportRepository
{
    Task<RiskReport?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<RiskReport>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(RiskReport riskReport, CancellationToken cancellationToken);
    Task UpdateAsync(RiskReport riskReport, CancellationToken cancellationToken);
    Task DeleteAsync(RiskReport riskReport, CancellationToken cancellationToken);

    Task AddToPositionsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromPositionsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToRegulatoryMetricsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromRegulatoryMetricsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
