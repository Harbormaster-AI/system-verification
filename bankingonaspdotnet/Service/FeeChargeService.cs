using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Persistence;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Service;

public interface IFeeChargeService
{

    Task Create(FeeCharge model, CancellationToken cancellationToken);
    Task<bool> Update(FeeCharge model, CancellationToken cancellationToken);
    Task<FeeCharge?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<FeeCharge>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);

    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignAccount(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignAccount(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignLoanAccount(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignLoanAccount(AssociationRequest request, CancellationToken cancellationToken);


}

public class FeeChargeService : IFeeChargeService
{
    private readonly IFeeChargeRepository _repository;
    private readonly ILogger<FeeChargeService> _logger;

    public FeeChargeService(
        IFeeChargeRepository repository, ILogger<FeeChargeService> logger)
    {
        _repository = repository;
        _logger = logger;
    }


    public async Task Create(FeeCharge model, CancellationToken cancellationToken)
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

    public async Task<bool> Update(FeeCharge model, CancellationToken cancellationToken)
    {
        try
        {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.FeeCode = model.FeeCode;
            existing.Amount = model.Amount;
            existing.AppliedOn = model.AppliedOn;
            existing.FeeType = model.FeeType;

            await _repository.UpdateAsync(existing, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public Task<FeeCharge?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<FeeCharge>> GetAll(CancellationToken cancellationToken)
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

    public async Task<bool> AssignAccount(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> UnassignAccount(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }

    public async Task<bool> AssignLoanAccount(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> UnassignLoanAccount(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }




}
