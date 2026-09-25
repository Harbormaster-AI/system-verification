
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Persistence;
using bankingonaspdotnet.Contracts;
using bankingonaspdotnet.Telemetry;

namespace bankingonaspdotnet.Service;

public interface IThirdPartyProviderService
{

    Task Create(ThirdPartyProvider model, CancellationToken cancellationToken);
    Task<bool> Update(ThirdPartyProvider model, CancellationToken cancellationToken);
    Task<ThirdPartyProvider?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<ThirdPartyProvider>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);

    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignBank(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignBank(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToConsents(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromConsents(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class ThirdPartyProviderService : IThirdPartyProviderService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IThirdPartyProviderRepository _repository;
    private readonly ILogger<ThirdPartyProviderService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public ThirdPartyProviderService(
        ApplicationTelemetry telemetry,
        IThirdPartyProviderRepository repository,
        ILogger<ThirdPartyProviderService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(ThirdPartyProvider model, CancellationToken cancellationToken)
    {
        try
        {
            return await telemetry.Execute(
                "ThirdPartyProvider",
                "CreateThirdPartyProvider",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
        }
    }

    public async Task<bool> Update(ThirdPartyProvider model, CancellationToken cancellationToken)
    {
        try
        {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.Name = model.Name;
            existing.RegistrationId = model.RegistrationId;
            existing.Website = model.Website;

            return await telemetry.Execute(
                "ThirdPartyProvider",
                "UpdateThirdPartyProvider",
                () => _repository.UpdateAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public Task<ThirdPartyProvider?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<ThirdPartyProvider>> GetAll(CancellationToken cancellationToken)
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
                "ThirdPartyProvider",
                "UpdateThirdPartyProvider",
                () => _repository.DeleteAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AssignBank(AssociationRequest request, CancellationToken cancellationToken)
    {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError($"No ThirdPartyProvider found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = serviceResolver.get(BankService).get(childRequest, cancellationToken)
            parent.Bank = child;
            Update(parent);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> UnassignBank(AssociationRequest request, CancellationToken cancellationToken)
    {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError($"No ThirdPartyProvider found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Bank = null;
            Update(parent);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }


    public async Task<bool> AddToConsents(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "ThirdPartyProvider",
                "AddToConsents",
                () => _repository.AddToConsentsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromConsents(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "ThirdPartyProvider",
                "RemoveFromConsents",
                () => _repository.RemoveFromConsentsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }



}
