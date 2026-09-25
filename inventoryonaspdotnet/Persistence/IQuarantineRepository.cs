using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Persistence;

public interface IQuarantineRepository
{
    Task<Quarantine?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Quarantine>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Quarantine quarantine, CancellationToken cancellationToken);
    Task UpdateAsync(Quarantine quarantine, CancellationToken cancellationToken);
    Task DeleteAsync(Quarantine quarantine, CancellationToken cancellationToken);

    Task AddToItemsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromItemsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToSerialNumbersAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromSerialNumbersAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
