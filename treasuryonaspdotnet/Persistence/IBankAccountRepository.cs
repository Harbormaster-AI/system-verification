using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface IBankAccountRepository
{
    Task<BankAccount?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<BankAccount>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(BankAccount bankAccount, CancellationToken cancellationToken);
    Task UpdateAsync(BankAccount bankAccount, CancellationToken cancellationToken);
    Task DeleteAsync(BankAccount bankAccount, CancellationToken cancellationToken);

    Task AddToCashPositionsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromCashPositionsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToCashFlowsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromCashFlowsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToSettlementInstructionsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromSettlementInstructionsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
