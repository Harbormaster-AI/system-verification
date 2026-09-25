using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Persistence;

public interface ICycleCountRepository
{
    Task<CycleCount?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<CycleCount>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(CycleCount cycleCount, CancellationToken cancellationToken);
    Task UpdateAsync(CycleCount cycleCount, CancellationToken cancellationToken);
    Task DeleteAsync(CycleCount cycleCount, CancellationToken cancellationToken);

    Task AddToLocationsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromLocationsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToEntriesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromEntriesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToTransactionsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromTransactionsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
