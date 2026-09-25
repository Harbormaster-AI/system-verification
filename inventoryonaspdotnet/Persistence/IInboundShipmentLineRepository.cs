using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Persistence;

public interface IInboundShipmentLineRepository
{
    Task<InboundShipmentLine?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<InboundShipmentLine>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(InboundShipmentLine inboundShipmentLine, CancellationToken cancellationToken);
    Task UpdateAsync(InboundShipmentLine inboundShipmentLine, CancellationToken cancellationToken);
    Task DeleteAsync(InboundShipmentLine inboundShipmentLine, CancellationToken cancellationToken);

    Task AddToSerialNumbersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromSerialNumbersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
