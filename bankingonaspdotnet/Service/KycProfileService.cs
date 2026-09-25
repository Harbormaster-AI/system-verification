
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Persistence;
using bankingonaspdotnet.Contracts;
using bankingonaspdotnet.Telemetry;

namespace bankingonaspdotnet.Service;

public interface IKycProfileService
{

    Task Create(KycProfile model, CancellationToken cancellationToken);
    Task<bool> Update(KycProfile model, CancellationToken cancellationToken);
    Task<KycProfile?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<KycProfile>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);

    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignCustomer(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignCustomer(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToIdentityDocuments(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromIdentityDocuments(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToRiskAssessments(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromRiskAssessments(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToScreenings(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromScreenings(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class KycProfileService : IKycProfileService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IKycProfileRepository _repository;
    private readonly ILogger<KycProfileService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public KycProfileService(
        ApplicationTelemetry telemetry,
        IKycProfileRepository repository,
        ILogger<KycProfileService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(KycProfile model, CancellationToken cancellationToken)
    {
        try
        {
            return await telemetry.Execute(
                "KycProfile",
                "CreateKycProfile",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
        }
    }

    public async Task<bool> Update(KycProfile model, CancellationToken cancellationToken)
    {
        try
        {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.ProfileId = model.ProfileId;
            existing.LastReviewedOn = model.LastReviewedOn;
            existing.Status = model.Status;

            return await telemetry.Execute(
                "KycProfile",
                "UpdateKycProfile",
                () => _repository.UpdateAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public Task<KycProfile?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<KycProfile>> GetAll(CancellationToken cancellationToken)
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
            return await telemetry.Execute(
                "KycProfile",
                "UpdateKycProfile",
                () => _repository.DeleteAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AssignCustomer(AssociationRequest request, CancellationToken cancellationToken)
    {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError($"No KycProfile found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = serviceResolver.get(CustomerService).get(childRequest, cancellationToken);
            parent.Customer = child;
            Update(parent);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> UnassignCustomer(AssociationRequest request, CancellationToken cancellationToken)
    {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError($"No KycProfile found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Customer = null;
            Update(parent);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }


    public async Task<bool> AddToIdentityDocuments(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "KycProfile",
                "AddToIdentityDocuments",
                () => _repository.AddToIdentityDocumentsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromIdentityDocuments(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "KycProfile",
                "RemoveFromIdentityDocuments",
                () => _repository.RemoveFromIdentityDocumentsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AddToRiskAssessments(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "KycProfile",
                "AddToRiskAssessments",
                () => _repository.AddToRiskAssessmentsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromRiskAssessments(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "KycProfile",
                "RemoveFromRiskAssessments",
                () => _repository.RemoveFromRiskAssessmentsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AddToScreenings(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "KycProfile",
                "AddToScreenings",
                () => _repository.AddToScreeningsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromScreenings(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "KycProfile",
                "RemoveFromScreenings",
                () => _repository.RemoveFromScreeningsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }



}
