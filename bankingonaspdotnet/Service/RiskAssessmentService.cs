
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Persistence;
using bankingonaspdotnet.Contracts;
using bankingonaspdotnet.Telemetry;

namespace bankingonaspdotnet.Service;

public interface IRiskAssessmentService
{

    Task Create(RiskAssessment model, CancellationToken cancellationToken);
    Task<bool> Update(RiskAssessment model, CancellationToken cancellationToken);
    Task<RiskAssessment?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<RiskAssessment>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignKycProfile(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignKycProfile(AssociationRequest request, CancellationToken cancellationToken);


}

public class RiskAssessmentService : IRiskAssessmentService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IRiskAssessmentRepository _repository;
    private readonly ILogger<RiskAssessmentService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public RiskAssessmentService(
        ApplicationTelemetry telemetry,
        IRiskAssessmentRepository repository,
        ILogger<RiskAssessmentService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(RiskAssessment model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "RiskAssessment",
                "CreateRiskAssessment",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(RiskAssessment model, CancellationToken cancellationToken)
    {
        try
        {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.Score = model.Score;
            existing.AssessedOn = model.AssessedOn;
            existing.Rating = model.Rating;

            await _telemetry.Execute(
                "RiskAssessment",
                "UpdateRiskAssessment",
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

    public Task<RiskAssessment?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<RiskAssessment>> GetAll(CancellationToken cancellationToken)
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
            return await _telemetry.Execute(
                "RiskAssessment",
                "UpdateRiskAssessment",
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

    public async Task<bool> AssignKycProfile(AssociationRequest request, CancellationToken cancellationToken)
    {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No RiskAssessment found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = _serviceResolver.Get<KycProfileService>().Get(childRequest, cancellationToken);
            parent.KycProfile = child;
            Update(parent);
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

    public async Task<bool> UnassignKycProfile(AssociationRequest request, CancellationToken cancellationToken)
    {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No RiskAssessment found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.KycProfile = null;
            Update(parent);
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
