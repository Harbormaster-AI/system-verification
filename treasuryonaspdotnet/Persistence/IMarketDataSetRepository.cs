using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface IMarketDataSetRepository
{
    Task<MarketDataSet?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<MarketDataSet>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(MarketDataSet marketDataSet, CancellationToken cancellationToken);
    Task UpdateAsync(MarketDataSet marketDataSet, CancellationToken cancellationToken);
    Task DeleteAsync(MarketDataSet marketDataSet, CancellationToken cancellationToken);

    Task AddToYieldCurvesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromYieldCurvesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToFxRatesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromFxRatesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToVolSurfacesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromVolSurfacesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToStressScenariosAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromStressScenariosAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
