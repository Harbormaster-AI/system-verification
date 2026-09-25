using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Persistence;

public interface ITransferOrderLineRepository
{
    Task<TransferOrderLine?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<TransferOrderLine>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(TransferOrderLine transferOrderLine, CancellationToken cancellationToken);
    Task UpdateAsync(TransferOrderLine transferOrderLine, CancellationToken cancellationToken);
    Task DeleteAsync(TransferOrderLine transferOrderLine, CancellationToken cancellationToken);

    Task AddToSerialNumbersAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromSerialNumbersAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
