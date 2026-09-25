using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Persistence;

public interface IDemandSignalRepository
{
    Task<DemandSignal?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<DemandSignal>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(DemandSignal demandSignal, CancellationToken cancellationToken);
    Task UpdateAsync(DemandSignal demandSignal, CancellationToken cancellationToken);
    Task DeleteAsync(DemandSignal demandSignal, CancellationToken cancellationToken);

    Task AddToReservationsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromReservationsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
