using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface ITransferPricingRuleRepository
{
    Task<TransferPricingRule?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<TransferPricingRule>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(TransferPricingRule transferPricingRule, CancellationToken cancellationToken);
    Task UpdateAsync(TransferPricingRule transferPricingRule, CancellationToken cancellationToken);
    Task DeleteAsync(TransferPricingRule transferPricingRule, CancellationToken cancellationToken);

    Task AddToAppliedDealsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromAppliedDealsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
