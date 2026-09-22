using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Persistence;
using bankingonaspdotnet.Contracts;

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
    private readonly IIdentityDocumentRepository _repository;
    private readonly ILogger<IdentityDocumentService> _logger;

    public IdentityDocumentService(
        IIdentityDocumentRepository repository, ILogger<IdentityDocumentService> logger )
    {
        _repository = repository;
        _logger = logger;
    }


    public async Task Create(IdentityDocument model, CancellationToken cancellationToken)
    {

         try
        {
            await _repository.AddAsync(model, cancellationToken);
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

            await _repository.UpdateAsync(existing, cancellationToken);
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
            await _repository.DeleteAsync(existing, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;

    }

    public async Task<bool> AssignKycProfile(AssociationRequest request, CancellationToken cancellationToken) {
        return true;
    }
    public async Task<bool> UnassignKycProfile(AssociationRequest request, CancellationToken cancellationToken) {
        return true;
    }




}
