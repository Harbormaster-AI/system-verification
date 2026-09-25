
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Persistence;
using bankingonaspdotnet.Contracts;
using bankingonaspdotnet.Telemetry;

namespace bankingonaspdotnet.Service;

public interface IIdentityDocumentService {

    Task Create(IdentityDocument model , CancellationToken cancellationToken);
    Task<bool> Update(IdentityDocument model, CancellationToken cancellationToken);
    Task<IdentityDocument?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<IdentityDocument>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignKycProfile(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignKycProfile(AssociationRequest request, CancellationToken cancellationToken);


}

public class IdentityDocumentService : IIdentityDocumentService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IIdentityDocumentRepository _repository;
    private readonly ILogger<IdentityDocumentService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public IdentityDocumentService(
        ApplicationTelemetry telemetry,
        IIdentityDocumentRepository repository,
        ILogger<IdentityDocumentService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(IdentityDocument model, CancellationToken cancellationToken)
    {
        try
        {
            return await _telemetry.Execute(
                "IdentityDocument",
                "CreateIdentityDocument",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
        }
    }

    public async Task<bool> Update(IdentityDocument model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.DocumentNumber = model.DocumentNumber;
            existing.IssuingCountry = model.IssuingCountry;
            existing.ExpirationDate = model.ExpirationDate;
            existing.DocumentType = model.DocumentType;

            return await _telemetry.Execute(
                "IdentityDocument",
                "UpdateIdentityDocument",
                () => _repository.UpdateAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public Task<IdentityDocument?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<IdentityDocument>> GetAll(CancellationToken cancellationToken)
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
                "IdentityDocument",
                "UpdateIdentityDocument",
                () => _repository.DeleteAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AssignKycProfile(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No IdentityDocument found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = _serviceResolver.get(KycProfileService).get( childRequest , cancellationToken );
            parent.KycProfile = child;
            Update( parent );
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> UnassignKycProfile(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No IdentityDocument found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.KycProfile = null;
            Update( parent );
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }




}
