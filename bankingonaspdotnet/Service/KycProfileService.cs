using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Persistence;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Service;

public interface IKycProfileService {

    Task Create(KycProfile model , CancellationToken cancellationToken);
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
    private readonly IKycProfileRepository _repository;
    private readonly ILogger<KycProfileService> _logger;

    public KycProfileService(
        IKycProfileRepository repository, ILogger<KycProfileService> logger )
    {
        _repository = repository;
        _logger = logger;
    }


    public async Task Create(KycProfile model, CancellationToken cancellationToken)
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

    public async Task<bool> Update(KycProfile model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.ProfileId = model.ProfileId;
            existing.LastReviewedOn = model.LastReviewedOn;
            existing.Status = model.Status;

            await _repository.UpdateAsync(existing, cancellationToken);
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
            await _repository.DeleteAsync(existing, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;

    }

    public async Task<bool> AssignCustomer(AssociationRequest request, CancellationToken cancellationToken) {
        return true;
    }
    public async Task<bool> UnassignCustomer(AssociationRequest request, CancellationToken cancellationToken) {
        return true;
    }


    public async Task<bool> AddToIdentityDocuments(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        return true;
    }
    public async Task<bool> RemoveFromIdentityDocuments(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        return true;
    }

    public async Task<bool> AddToRiskAssessments(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        return true;
    }
    public async Task<bool> RemoveFromRiskAssessments(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        return true;
    }

    public async Task<bool> AddToScreenings(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        return true;
    }
    public async Task<bool> RemoveFromScreenings(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        return true;
    }



}
