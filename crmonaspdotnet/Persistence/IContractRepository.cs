using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Persistence;

public interface IContractRepository
{
    Task<Contract?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Contract>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Contract contract, CancellationToken cancellationToken);
    Task UpdateAsync(Contract contract, CancellationToken cancellationToken);
    Task DeleteAsync(Contract contract, CancellationToken cancellationToken);

    Task AddToOrdersAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromOrdersAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToCasesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromCasesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
