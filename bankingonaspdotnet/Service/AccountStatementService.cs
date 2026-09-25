
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Persistence;
using bankingonaspdotnet.Contracts;
using bankingonaspdotnet.Telemetry;

namespace bankingonaspdotnet.Service;

public interface IAccountStatementService {

    Task Create(AccountStatement model , CancellationToken cancellationToken);
    Task<bool> Update(AccountStatement model, CancellationToken cancellationToken);
    Task<AccountStatement?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<AccountStatement>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignAccount(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignAccount(AssociationRequest request, CancellationToken cancellationToken);


}

public class AccountStatementService : IAccountStatementService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IAccountStatementRepository _repository;
    private readonly ILogger<AccountStatementService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public AccountStatementService(
        ApplicationTelemetry telemetry,
        IAccountStatementRepository repository,
        ILogger<AccountStatementService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(AccountStatement model, CancellationToken cancellationToken)
    {
        try
        {
            return await telemetry.Execute(
                "AccountStatement",
                "CreateAccountStatement",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
        }
    }

    public async Task<bool> Update(AccountStatement model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.StatementNumber = model.StatementNumber;
            existing.PeriodStart = model.PeriodStart;
            existing.PeriodEnd = model.PeriodEnd;
            existing.OpeningBalance = model.OpeningBalance;
            existing.ClosingBalance = model.ClosingBalance;
            existing.DeliveryMethod = model.DeliveryMethod;

            return await telemetry.Execute(
                "AccountStatement",
                "UpdateAccountStatement",
                () => _repository.UpdateAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public Task<AccountStatement?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<AccountStatement>> GetAll(CancellationToken cancellationToken)
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
                "AccountStatement",
                "UpdateAccountStatement",
                () => _repository.DeleteAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AssignAccount(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No AccountStatement found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = serviceResolver.get(AccountService).get( childRequest , cancellationToken );
            parent.Account = child;
            Update( parent );
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> UnassignAccount(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No AccountStatement found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Account = null;
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
