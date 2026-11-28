using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface IStressScenarioRepository
{
    Task<StressScenario?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<StressScenario>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(StressScenario stressScenario, CancellationToken cancellationToken);
    Task UpdateAsync(StressScenario stressScenario, CancellationToken cancellationToken);
    Task DeleteAsync(StressScenario stressScenario, CancellationToken cancellationToken);

    Task AddToStressResultsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromStressResultsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
