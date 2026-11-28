
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Persistence;
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Telemetry;

namespace treasuryonaspdotnet.Service;

public interface IMarketDataSetService
{

    Task Create(MarketDataSet model, CancellationToken cancellationToken);
    Task<bool> Update(MarketDataSet model, CancellationToken cancellationToken);
    Task<MarketDataSet?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<MarketDataSet>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------

    Task<bool> AddToYieldCurves(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromYieldCurves(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToFxRates(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromFxRates(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToVolSurfaces(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromVolSurfaces(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToStressScenarios(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromStressScenarios(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class MarketDataSetService : IMarketDataSetService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IMarketDataSetRepository _repository;
    private readonly ILogger<MarketDataSetService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public MarketDataSetService(
        ApplicationTelemetry telemetry,
        IMarketDataSetRepository repository,
        ILogger<MarketDataSetService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(MarketDataSet model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "MarketDataSet",
                "CreateMarketDataSet",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(MarketDataSet model, CancellationToken cancellationToken)
    {
        try
        {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.Name = model.Name;
            existing.ValuationDate = model.ValuationDate;

            await _telemetry.Execute(
                "MarketDataSet",
                "UpdateMarketDataSet",
                () => _repository.UpdateAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public Task<MarketDataSet?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<MarketDataSet>> GetAll(CancellationToken cancellationToken)
    => _repository.GetAllAsync(cancellationToken);

    public async Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken)
    {
        var existing = await _repository.GetByIdAsync(identifier.Id, cancellationToken);
        if (existing is null)
        {
            return false;
        }

        try
        {
            await _telemetry.Execute(
                "MarketDataSet",
                "UpdateMarketDataSet",
                () => _repository.DeleteAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }


    public async Task<bool> AddToYieldCurves(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "MarketDataSet",
                "AddToYieldCurves",
                () => _repository.AddToYieldCurvesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromYieldCurves(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "MarketDataSet",
                "RemoveFromYieldCurves",
                () => _repository.RemoveFromYieldCurvesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> AddToFxRates(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "MarketDataSet",
                "AddToFxRates",
                () => _repository.AddToFxRatesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromFxRates(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "MarketDataSet",
                "RemoveFromFxRates",
                () => _repository.RemoveFromFxRatesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> AddToVolSurfaces(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "MarketDataSet",
                "AddToVolSurfaces",
                () => _repository.AddToVolSurfacesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromVolSurfaces(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "MarketDataSet",
                "RemoveFromVolSurfaces",
                () => _repository.RemoveFromVolSurfacesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> AddToStressScenarios(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "MarketDataSet",
                "AddToStressScenarios",
                () => _repository.AddToStressScenariosAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromStressScenarios(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "MarketDataSet",
                "RemoveFromStressScenarios",
                () => _repository.RemoveFromStressScenariosAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }



}
