using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Persistence;

public interface ISerialNumberRepository
{
    Task<SerialNumber?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<SerialNumber>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(SerialNumber serialNumber, CancellationToken cancellationToken);
    Task UpdateAsync(SerialNumber serialNumber, CancellationToken cancellationToken);
    Task DeleteAsync(SerialNumber serialNumber, CancellationToken cancellationToken);


}
