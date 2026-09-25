using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Persistence;

public interface IInboundShipmentRepository
{
    Task<InboundShipment?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<InboundShipment>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(InboundShipment inboundShipment, CancellationToken cancellationToken);
    Task UpdateAsync(InboundShipment inboundShipment, CancellationToken cancellationToken);
    Task DeleteAsync(InboundShipment inboundShipment, CancellationToken cancellationToken);

    Task AddToLinesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromLinesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToTransactionsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromTransactionsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
