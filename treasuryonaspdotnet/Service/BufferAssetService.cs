
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Persistence;
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Telemetry;

namespace treasuryonaspdotnet.Service;

public interface IBufferAssetService {

    Task Create(BufferAsset model , CancellationToken cancellationToken);
    Task<bool> Update(BufferAsset model, CancellationToken cancellationToken);
    Task<BufferAsset?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<BufferAsset>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignLiquidityBuffer(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignLiquidityBuffer(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignPortfolio(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignPortfolio(AssociationRequest request, CancellationToken cancellationToken);


}

public class BufferAssetService : IBufferAssetService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IBufferAssetRepository _repository;
    private readonly ILogger<BufferAssetService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public BufferAssetService(
        ApplicationTelemetry telemetry,
        IBufferAssetRepository repository,
        ILogger<BufferAssetService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(BufferAsset model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "BufferAsset",
                "CreateBufferAsset",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(BufferAsset model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.SecurityName = model.SecurityName;
            existing.Isin = model.Isin;
            existing.MarketValue = model.MarketValue;
            existing.HqlaClass = model.HqlaClass;

            await _telemetry.Execute(
                "BufferAsset",
                "UpdateBufferAsset",
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

    public Task<BufferAsset?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<BufferAsset>> GetAll(CancellationToken cancellationToken)
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
                "BufferAsset",
                "UpdateBufferAsset",
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

    public async Task<bool> AssignLiquidityBuffer(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No BufferAsset found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<LiquidityBufferService>().Get(childRequest, cancellationToken);
            parent.LiquidityBuffer = child;
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

    public async Task<bool> UnassignLiquidityBuffer(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No BufferAsset found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.LiquidityBuffer = null;
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

    public async Task<bool> AssignPortfolio(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No BufferAsset found using Id {ParentId}", request.ParentId);
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
            _logger.LogError("No BufferAsset found using Id {ParentId}", request.ParentId);
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




}
