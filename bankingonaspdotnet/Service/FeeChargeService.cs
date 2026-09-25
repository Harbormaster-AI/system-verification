
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Persistence;
using bankingonaspdotnet.Contracts;
using bankingonaspdotnet.Telemetry;

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
    private readonly ApplicationTelemetry _telemetry;
    private readonly IFeeChargeRepository _repository;
    private readonly ILogger<FeeChargeService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public FeeChargeService(
        ApplicationTelemetry telemetry,
        IFeeChargeRepository repository,
        ILogger<FeeChargeService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(FeeCharge model, CancellationToken cancellationToken)
    {
        try
        {
            return await telemetry.Execute(
                "FeeCharge",
                "CreateFeeCharge",
                () => _repository.AddAsync(model, cancellationToken));
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

            return await telemetry.Execute(
                "FeeCharge",
                "UpdateFeeCharge",
                () => _repository.UpdateAsync(existing, cancellationToken));
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
            return await telemetry.Execute(
                "FeeCharge",
                "UpdateFeeCharge",
                () => _repository.DeleteAsync(existing, cancellationToken));
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

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError($"No FeeCharge found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = serviceResolver.get(AccountService).get(childRequest, cancellationToken)
            parent.Account = child;
            Update(parent);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> UnassignAccount(AssociationRequest request, CancellationToken cancellationToken)
    {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError($"No FeeCharge found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Account = null;
            Update(parent);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AssignLoanAccount(AssociationRequest request, CancellationToken cancellationToken)
    {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError($"No FeeCharge found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = serviceResolver.get(LoanAccountService).get(childRequest, cancellationToken)
            parent.LoanAccount = child;
            Update(parent);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> UnassignLoanAccount(AssociationRequest request, CancellationToken cancellationToken)
    {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError($"No FeeCharge found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.LoanAccount = null;
            Update(parent);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }




}
