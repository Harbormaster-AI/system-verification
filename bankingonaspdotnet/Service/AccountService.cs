
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Persistence;
using bankingonaspdotnet.Contracts;
using bankingonaspdotnet.Telemetry;

namespace bankingonaspdotnet.Service;

public interface IAccountService
{

    Task Create(Account model, CancellationToken cancellationToken);
    Task<bool> Update(Account model, CancellationToken cancellationToken);
    Task<Account?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<Account>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);

    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignBank(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignBank(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignBranch(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignBranch(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignProduct(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignProduct(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToOwners(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromOwners(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToTransactions(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromTransactions(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToStatements(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromStatements(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToStandingInstructions(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromStandingInstructions(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToFeeCharges(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromFeeCharges(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class AccountService : IAccountService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IAccountRepository _repository;
    private readonly ILogger<AccountService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public AccountService(
        ApplicationTelemetry telemetry,
        IAccountRepository repository,
        ILogger<AccountService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(Account model, CancellationToken cancellationToken)
    {
        try
        {
            return await telemetry.Execute(
                "Account",
                "CreateAccount",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
        }
    }

    public async Task<bool> Update(Account model, CancellationToken cancellationToken)
    {
        try
        {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.AccountNumber = model.AccountNumber;
            existing.Iban = model.Iban;
            existing.AccountName = model.AccountName;
            existing.Currency = model.Currency;
            existing.OpenedOn = model.OpenedOn;
            existing.ClosedOn = model.ClosedOn;
            existing.AccountType = model.AccountType;
            existing.OwnershipType = model.OwnershipType;
            existing.Status = model.Status;

            return await telemetry.Execute(
                "Account",
                "UpdateAccount",
                () => _repository.UpdateAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public Task<Account?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<Account>> GetAll(CancellationToken cancellationToken)
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
                "Account",
                "UpdateAccount",
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
            _logger.LogError($"No Account found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId;
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
            _logger.LogError($"No Account found using Id {ParentId}", request.ParentId);
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

    public async Task<bool> AssignBranch(AssociationRequest request, CancellationToken cancellationToken)
    {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError($"No Account found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId;
            };

            var child = serviceResolver.get(BranchService).get(childRequest, cancellationToken)
            parent.Branch = child;
            Update(parent);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> UnassignBranch(AssociationRequest request, CancellationToken cancellationToken)
    {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError($"No Account found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Branch = null;
            Update(parent);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AssignProduct(AssociationRequest request, CancellationToken cancellationToken)
    {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError($"No Account found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId;
            };

            var child = serviceResolver.get(BankingProductService).get(childRequest, cancellationToken)
            parent.Product = child;
            Update(parent);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> UnassignProduct(AssociationRequest request, CancellationToken cancellationToken)
    {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError($"No Account found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Product = null;
            Update(parent);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }


    public async Task<bool> AddToOwners(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Account",
                "AddToOwners",
                () => _repository.AddToOwnersAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromOwners(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Account",
                "RemoveFromOwners",
                () => _repository.RemoveFromOwnersAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AddToTransactions(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Account",
                "AddToTransactions",
                () => _repository.AddToTransactionsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromTransactions(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Account",
                "RemoveFromTransactions",
                () => _repository.RemoveFromTransactionsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AddToStatements(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Account",
                "AddToStatements",
                () => _repository.AddToStatementsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromStatements(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Account",
                "RemoveFromStatements",
                () => _repository.RemoveFromStatementsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AddToStandingInstructions(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Account",
                "AddToStandingInstructions",
                () => _repository.AddToStandingInstructionsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromStandingInstructions(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Account",
                "RemoveFromStandingInstructions",
                () => _repository.RemoveFromStandingInstructionsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AddToFeeCharges(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Account",
                "AddToFeeCharges",
                () => _repository.AddToFeeChargesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromFeeCharges(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Account",
                "RemoveFromFeeCharges",
                () => _repository.RemoveFromFeeChargesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }



}
