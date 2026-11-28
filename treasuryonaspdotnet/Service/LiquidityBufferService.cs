
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Persistence;
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Telemetry;

namespace treasuryonaspdotnet.Service;

public interface ILiquidityBufferService {

    Task Create(LiquidityBuffer model , CancellationToken cancellationToken);
    Task<bool> Update(LiquidityBuffer model, CancellationToken cancellationToken);
    Task<LiquidityBuffer?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<LiquidityBuffer>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignPortfolio(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignPortfolio(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToAssets(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromAssets(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToRegulatoryMetrics(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromRegulatoryMetrics(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class LiquidityBufferService : ILiquidityBufferService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly ILiquidityBufferRepository _repository;
    private readonly ILogger<LiquidityBufferService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public LiquidityBufferService(
        ApplicationTelemetry telemetry,
        ILiquidityBufferRepository repository,
        ILogger<LiquidityBufferService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(LiquidityBuffer model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "LiquidityBuffer",
                "CreateLiquidityBuffer",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(LiquidityBuffer model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.Name = model.Name;
            existing.MarketValue = model.MarketValue;
            existing.HqlaClass = model.HqlaClass;

            await _telemetry.Execute(
                "LiquidityBuffer",
                "UpdateLiquidityBuffer",
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

    public Task<LiquidityBuffer?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<LiquidityBuffer>> GetAll(CancellationToken cancellationToken)
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
                "LiquidityBuffer",
                "UpdateLiquidityBuffer",
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

    public async Task<bool> AssignPortfolio(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No LiquidityBuffer found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<PortfolioService>().Get(childRequest, cancellationToken);
            parent.Portfolio = child;
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

    public async Task<bool> UnassignPortfolio(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No LiquidityBuffer found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Portfolio = null;
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


    public async Task<bool> AddToAssets(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "LiquidityBuffer",
                "AddToAssets",
                () => _repository.AddToAssetsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromAssets(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "LiquidityBuffer",
                "RemoveFromAssets",
                () => _repository.RemoveFromAssetsAsync(request, cancellationToken));
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

    public async Task<bool> AddToRegulatoryMetrics(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "LiquidityBuffer",
                "AddToRegulatoryMetrics",
                () => _repository.AddToRegulatoryMetricsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromRegulatoryMetrics(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "LiquidityBuffer",
                "RemoveFromRegulatoryMetrics",
                () => _repository.RemoveFromRegulatoryMetricsAsync(request, cancellationToken));
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
