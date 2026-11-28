
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Persistence;
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Telemetry;

namespace treasuryonaspdotnet.Service;

public interface IStressScenarioService {

    Task Create(StressScenario model , CancellationToken cancellationToken);
    Task<bool> Update(StressScenario model, CancellationToken cancellationToken);
    Task<StressScenario?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<StressScenario>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignMarketDataSet(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignMarketDataSet(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToStressResults(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromStressResults(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class StressScenarioService : IStressScenarioService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IStressScenarioRepository _repository;
    private readonly ILogger<StressScenarioService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public StressScenarioService(
        ApplicationTelemetry telemetry,
        IStressScenarioRepository repository,
        ILogger<StressScenarioService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(StressScenario model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "StressScenario",
                "CreateStressScenario",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(StressScenario model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.Name = model.Name;
            existing.Severity = model.Severity;
            existing.Horizon = model.Horizon;

            await _telemetry.Execute(
                "StressScenario",
                "UpdateStressScenario",
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

    public Task<StressScenario?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<StressScenario>> GetAll(CancellationToken cancellationToken)
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
                "StressScenario",
                "UpdateStressScenario",
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

    public async Task<bool> AssignMarketDataSet(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No StressScenario found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<MarketDataSetService>().Get(childRequest, cancellationToken);
            parent.MarketDataSet = child;
            await Update( parent, cancellationToken );
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

    public async Task<bool> UnassignMarketDataSet(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No StressScenario found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.MarketDataSet = null;
            await Update( parent, cancellationToken );
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


    public async Task<bool> AddToStressResults(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "StressScenario",
                "AddToStressResults",
                () => _repository.AddToStressResultsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromStressResults(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "StressScenario",
                "RemoveFromStressResults",
                () => _repository.RemoveFromStressResultsAsync(request, cancellationToken));
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
