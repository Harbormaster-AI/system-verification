using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface IRegulatoryMetricRepository
{
    Task<RegulatoryMetric?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<RegulatoryMetric>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(RegulatoryMetric regulatoryMetric, CancellationToken cancellationToken);
    Task UpdateAsync(RegulatoryMetric regulatoryMetric, CancellationToken cancellationToken);
    Task DeleteAsync(RegulatoryMetric regulatoryMetric, CancellationToken cancellationToken);


}
