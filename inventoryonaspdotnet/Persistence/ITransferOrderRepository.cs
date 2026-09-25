using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Persistence;

public interface ITransferOrderRepository
{
    Task<TransferOrder?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<TransferOrder>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(TransferOrder transferOrder, CancellationToken cancellationToken);
    Task UpdateAsync(TransferOrder transferOrder, CancellationToken cancellationToken);
    Task DeleteAsync(TransferOrder transferOrder, CancellationToken cancellationToken);

    Task AddToLinesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromLinesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToTransactionsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromTransactionsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
