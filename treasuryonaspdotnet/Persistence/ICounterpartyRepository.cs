using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface ICounterpartyRepository
{
    Task<Counterparty?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Counterparty>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Counterparty counterparty, CancellationToken cancellationToken);
    Task UpdateAsync(Counterparty counterparty, CancellationToken cancellationToken);
    Task DeleteAsync(Counterparty counterparty, CancellationToken cancellationToken);

    Task AddToNettingAgreementsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromNettingAgreementsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToTradesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromTradesAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToCollateralAgreementsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromCollateralAgreementsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToLimitsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromLimitsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToMarginCallsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromMarginCallsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToSettlementInstructionsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromSettlementInstructionsAsync( MultipleAssociationRequest request, CancellationToken cancellationToken);

}
