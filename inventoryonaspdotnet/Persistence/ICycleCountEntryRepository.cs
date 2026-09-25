using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Persistence;

public interface ICycleCountEntryRepository
{
    Task<CycleCountEntry?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<CycleCountEntry>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(CycleCountEntry cycleCountEntry, CancellationToken cancellationToken);
    Task UpdateAsync(CycleCountEntry cycleCountEntry, CancellationToken cancellationToken);
    Task DeleteAsync(CycleCountEntry cycleCountEntry, CancellationToken cancellationToken);

    Task AddToSerialNumbersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromSerialNumbersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
