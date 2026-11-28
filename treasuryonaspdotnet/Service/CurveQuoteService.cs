
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Persistence;
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Telemetry;

namespace treasuryonaspdotnet.Service;

public interface ICurveQuoteService {

    Task Create(CurveQuote model , CancellationToken cancellationToken);
    Task<bool> Update(CurveQuote model, CancellationToken cancellationToken);
    Task<CurveQuote?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<CurveQuote>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignYieldCurve(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignYieldCurve(AssociationRequest request, CancellationToken cancellationToken);


}

public class CurveQuoteService : ICurveQuoteService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly ICurveQuoteRepository _repository;
    private readonly ILogger<CurveQuoteService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public CurveQuoteService(
        ApplicationTelemetry telemetry,
        ICurveQuoteRepository repository,
        ILogger<CurveQuoteService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(CurveQuote model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "CurveQuote",
                "CreateCurveQuote",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(CurveQuote model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.Tenor = model.Tenor;
            existing.Rate = model.Rate;

            await _telemetry.Execute(
                "CurveQuote",
                "UpdateCurveQuote",
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

    public Task<CurveQuote?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<CurveQuote>> GetAll(CancellationToken cancellationToken)
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
                "CurveQuote",
                "UpdateCurveQuote",
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

    public async Task<bool> AssignYieldCurve(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No CurveQuote found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<YieldCurveService>().Get(childRequest, cancellationToken);
            parent.YieldCurve = child;
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

    public async Task<bool> UnassignYieldCurve(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No CurveQuote found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.YieldCurve = null;
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
