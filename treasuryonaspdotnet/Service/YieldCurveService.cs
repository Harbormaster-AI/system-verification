
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Persistence;
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Telemetry;

namespace treasuryonaspdotnet.Service;

public interface IYieldCurveService {

    Task Create(YieldCurve model , CancellationToken cancellationToken);
    Task<bool> Update(YieldCurve model, CancellationToken cancellationToken);
    Task<YieldCurve?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<YieldCurve>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignMarketDataSet(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignMarketDataSet(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToQuotes(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromQuotes(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class YieldCurveService : IYieldCurveService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IYieldCurveRepository _repository;
    private readonly ILogger<YieldCurveService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public YieldCurveService(
        ApplicationTelemetry telemetry,
        IYieldCurveRepository repository,
        ILogger<YieldCurveService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(YieldCurve model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "YieldCurve",
                "CreateYieldCurve",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(YieldCurve model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.Currency = model.Currency;
            existing.BuildMethod = model.BuildMethod;
            existing.CurveType = model.CurveType;
            existing.DayCount = model.DayCount;

            await _telemetry.Execute(
                "YieldCurve",
                "UpdateYieldCurve",
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

    public Task<YieldCurve?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<YieldCurve>> GetAll(CancellationToken cancellationToken)
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
                "YieldCurve",
                "UpdateYieldCurve",
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
            _logger.LogError("No YieldCurve found using Id {ParentId}", request.ParentId);
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
            _logger.LogError("No YieldCurve found using Id {ParentId}", request.ParentId);
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


    public async Task<bool> AddToQuotes(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "YieldCurve",
                "AddToQuotes",
                () => _repository.AddToQuotesAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromQuotes(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "YieldCurve",
                "RemoveFromQuotes",
                () => _repository.RemoveFromQuotesAsync(request, cancellationToken));
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
