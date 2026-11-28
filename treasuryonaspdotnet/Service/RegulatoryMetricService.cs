
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Persistence;
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Telemetry;

namespace treasuryonaspdotnet.Service;

public interface IRegulatoryMetricService
{

    Task Create(RegulatoryMetric model, CancellationToken cancellationToken);
    Task<bool> Update(RegulatoryMetric model, CancellationToken cancellationToken);
    Task<RegulatoryMetric?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<RegulatoryMetric>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignRiskReport(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignRiskReport(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignLiquidityBuffer(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignLiquidityBuffer(AssociationRequest request, CancellationToken cancellationToken);


}

public class RegulatoryMetricService : IRegulatoryMetricService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IRegulatoryMetricRepository _repository;
    private readonly ILogger<RegulatoryMetricService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public RegulatoryMetricService(
        ApplicationTelemetry telemetry,
        IRegulatoryMetricRepository repository,
        ILogger<RegulatoryMetricService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(RegulatoryMetric model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "RegulatoryMetric",
                "CreateRegulatoryMetric",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(RegulatoryMetric model, CancellationToken cancellationToken)
    {
        try
        {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.Value = model.Value;
            existing.Currency = model.Currency;
            existing.MetricType = model.MetricType;
            existing.Horizon = model.Horizon;

            await _telemetry.Execute(
                "RegulatoryMetric",
                "UpdateRegulatoryMetric",
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

    public Task<RegulatoryMetric?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<RegulatoryMetric>> GetAll(CancellationToken cancellationToken)
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
                "RegulatoryMetric",
                "UpdateRegulatoryMetric",
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

    public async Task<bool> AssignRiskReport(AssociationRequest request, CancellationToken cancellationToken)
    {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No RegulatoryMetric found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<RiskReportService>().Get(childRequest, cancellationToken);
            parent.RiskReport = child;
            await Update(parent, cancellationToken);
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

    public async Task<bool> UnassignRiskReport(AssociationRequest request, CancellationToken cancellationToken)
    {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No RegulatoryMetric found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.RiskReport = null;
            await Update(parent, cancellationToken);
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

    public async Task<bool> AssignLiquidityBuffer(AssociationRequest request, CancellationToken cancellationToken)
    {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No RegulatoryMetric found using Id {ParentId}", request.ParentId);
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
            await Update(parent, cancellationToken);
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

    public async Task<bool> UnassignLiquidityBuffer(AssociationRequest request, CancellationToken cancellationToken)
    {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No RegulatoryMetric found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.LiquidityBuffer = null;
            await Update(parent, cancellationToken);
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
