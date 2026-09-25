
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Persistence;
using bankingonaspdotnet.Contracts;
using bankingonaspdotnet.Telemetry;

namespace bankingonaspdotnet.Service;

public interface IBankingProductService {

    Task Create(BankingProduct model , CancellationToken cancellationToken);
    Task<bool> Update(BankingProduct model, CancellationToken cancellationToken);
    Task<BankingProduct?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<BankingProduct>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignBank(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignBank(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToLoanAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromLoanAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToPaymentCards(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromPaymentCards(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class BankingProductService : IBankingProductService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IBankingProductRepository _repository;
    private readonly ILogger<BankingProductService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public BankingProductService(
        ApplicationTelemetry telemetry,
        IBankingProductRepository repository,
        ILogger<BankingProductService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(BankingProduct model, CancellationToken cancellationToken)
    {
        try
        {
            return await telemetry.Execute(
                "BankingProduct",
                "CreateBankingProduct",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
        }
    }

    public async Task<bool> Update(BankingProduct model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.ProductCode = model.ProductCode;
            existing.Name = model.Name;
            existing.Description = model.Description;
            existing.ProductCategory = model.ProductCategory;

            return await telemetry.Execute(
                "BankingProduct",
                "UpdateBankingProduct",
                () => _repository.UpdateAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public Task<BankingProduct?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<BankingProduct>> GetAll(CancellationToken cancellationToken)
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
                "BankingProduct",
                "UpdateBankingProduct",
                () => _repository.DeleteAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AssignBank(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No BankingProduct found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = serviceResolver.get(BankService).get( childRequest , cancellationToken );
            parent.Bank = child;
            Update( parent );
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> UnassignBank(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No BankingProduct found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Bank = null;
            Update( parent );
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }


    public async Task<bool> AddToAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "BankingProduct",
                "AddToAccounts",
                () => _repository.AddToAccountsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "BankingProduct",
                "RemoveFromAccounts",
                () => _repository.RemoveFromAccountsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AddToLoanAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "BankingProduct",
                "AddToLoanAccounts",
                () => _repository.AddToLoanAccountsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromLoanAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "BankingProduct",
                "RemoveFromLoanAccounts",
                () => _repository.RemoveFromLoanAccountsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AddToPaymentCards(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "BankingProduct",
                "AddToPaymentCards",
                () => _repository.AddToPaymentCardsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromPaymentCards(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "BankingProduct",
                "RemoveFromPaymentCards",
                () => _repository.RemoveFromPaymentCardsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }



}
