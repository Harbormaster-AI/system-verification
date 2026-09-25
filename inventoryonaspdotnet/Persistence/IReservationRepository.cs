using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Persistence;

public interface IReservationRepository
{
    Task<Reservation?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Reservation>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Reservation reservation, CancellationToken cancellationToken);
    Task UpdateAsync(Reservation reservation, CancellationToken cancellationToken);
    Task DeleteAsync(Reservation reservation, CancellationToken cancellationToken);

    Task AddToSerialNumbersAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromSerialNumbersAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
