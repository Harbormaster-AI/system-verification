using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface ITreasuryUnitRepository
{
    Task<TreasuryUnit?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<TreasuryUnit>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(TreasuryUnit treasuryUnit, CancellationToken cancellationToken);
    Task UpdateAsync(TreasuryUnit treasuryUnit, CancellationToken cancellationToken);
    Task DeleteAsync(TreasuryUnit treasuryUnit, CancellationToken cancellationToken);

    Task AddToTradingBooksAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromTradingBooksAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToBankAccountsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromBankAccountsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToPoliciesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromPoliciesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToTransferPricingRulesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromTransferPricingRulesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToInternalDealsOutAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromInternalDealsOutAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToInternalDealsInAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromInternalDealsInAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
