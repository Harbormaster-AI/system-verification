using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Persistence;

public interface IOutboundAllocationRepository
{
    Task<OutboundAllocation?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<OutboundAllocation>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(OutboundAllocation outboundAllocation, CancellationToken cancellationToken);
    Task UpdateAsync(OutboundAllocation outboundAllocation, CancellationToken cancellationToken);
    Task DeleteAsync(OutboundAllocation outboundAllocation, CancellationToken cancellationToken);

    Task AddToSerialNumbersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromSerialNumbersAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
