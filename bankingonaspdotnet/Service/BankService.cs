using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Persistence;
using bankingonaspdotnet.Contracts;
using bankingonaspdotnet.Telemetry;

namespace bankingonaspdotnet.Service;

public interface IBankService {

    Task Create(Bank model , CancellationToken cancellationToken);
    Task<bool> Update(Bank model, CancellationToken cancellationToken);
    Task<Bank?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<Bank>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);

    // ------------------------------
    // Single Associations
    // -------------------------------

    Task<bool> AddToBranches(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromBranches(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToProducts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromProducts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToCustomers(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromCustomers(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToPaymentCards(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromPaymentCards(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToLoanAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromLoanAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToExchangeRates(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromExchangeRates(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToConsents(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromConsents(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToThirdPartyProviders(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromThirdPartyProviders(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class BankService : IBankService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IBankRepository _repository;
    private readonly ILogger<BankService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public BankService(
        ApplicationTelemetry telemetry,
        IBankRepository repository,
        ILogger<BankService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(Bank model, CancellationToken cancellationToken)
    {
        try
        {
            return await telemetry.Execute(
                "Bank",
                "CreateBank",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
        }
    }

    public async Task<bool> Update(Bank model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.Name = model.Name;
            existing.LegalName = model.LegalName;
            existing.SwiftBic = model.SwiftBic;
            existing.HeadquartersCountry = model.HeadquartersCountry;
            existing.Website = model.Website;

            return await telemetry.Execute(
                "Bank",
                "UpdateBank",
                () => _repository.UpdateAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public Task<Bank?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<Bank>> GetAll(CancellationToken cancellationToken)
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
                "Bank",
                "UpdateBank",
                () => _repository.DeleteAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }


    public async Task<bool> AddToBranches(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "Bank",
                "AddToBranches",
                () => _repository.AddToBranchesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromBranches(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "Bank",
                "RemoveFromBranches",
                () => _repository.RemoveFromBranchesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AddToProducts(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "Bank",
                "AddToProducts",
                () => _repository.AddToProductsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromProducts(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "Bank",
                "RemoveFromProducts",
                () => _repository.RemoveFromProductsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AddToCustomers(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "Bank",
                "AddToCustomers",
                () => _repository.AddToCustomersAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromCustomers(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "Bank",
                "RemoveFromCustomers",
                () => _repository.RemoveFromCustomersAsync(request, cancellationToken));
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
                "Bank",
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
                "Bank",
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

    public async Task<bool> AddToPaymentCards(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "Bank",
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
                "Bank",
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

    public async Task<bool> AddToLoanAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "Bank",
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
                "Bank",
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

    public async Task<bool> AddToExchangeRates(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "Bank",
                "AddToExchangeRates",
                () => _repository.AddToExchangeRatesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromExchangeRates(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "Bank",
                "RemoveFromExchangeRates",
                () => _repository.RemoveFromExchangeRatesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AddToConsents(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "Bank",
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

    public async Task<bool> RemoveFromConsents(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "Bank",
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

    public async Task<bool> AddToThirdPartyProviders(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "Bank",
                "AddToThirdPartyProviders",
                () => _repository.AddToThirdPartyProvidersAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromThirdPartyProviders(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "Bank",
                "RemoveFromThirdPartyProviders",
                () => _repository.RemoveFromThirdPartyProvidersAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }



}
