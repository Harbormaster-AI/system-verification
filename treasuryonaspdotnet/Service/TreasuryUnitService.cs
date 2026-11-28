
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Persistence;
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Telemetry;

namespace treasuryonaspdotnet.Service;

public interface ITreasuryUnitService {

    Task Create(TreasuryUnit model , CancellationToken cancellationToken);
    Task<bool> Update(TreasuryUnit model, CancellationToken cancellationToken);
    Task<TreasuryUnit?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<TreasuryUnit>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------

    Task<bool> AddToTradingBooks(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromTradingBooks(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToBankAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromBankAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToPolicies(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromPolicies(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToTransferPricingRules(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromTransferPricingRules(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToInternalDealsOut(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromInternalDealsOut(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToInternalDealsIn(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromInternalDealsIn(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class TreasuryUnitService : ITreasuryUnitService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly ITreasuryUnitRepository _repository;
    private readonly ILogger<TreasuryUnitService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public TreasuryUnitService(
        ApplicationTelemetry telemetry,
        ITreasuryUnitRepository repository,
        ILogger<TreasuryUnitService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(TreasuryUnit model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "TreasuryUnit",
                "CreateTreasuryUnit",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(TreasuryUnit model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.Name = model.Name;
            existing.Region = model.Region;
            existing.BookingLocation = model.BookingLocation;
            existing.BaseCurrency = model.BaseCurrency;

            await _telemetry.Execute(
                "TreasuryUnit",
                "UpdateTreasuryUnit",
                () => _repository.UpdateAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public Task<TreasuryUnit?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<TreasuryUnit>> GetAll(CancellationToken cancellationToken)
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
            await _telemetry.Execute(
                "TreasuryUnit",
                "UpdateTreasuryUnit",
                () => _repository.DeleteAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }


    public async Task<bool> AddToTradingBooks(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "TreasuryUnit",
                "AddToTradingBooks",
                () => _repository.AddToTradingBooksAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
           _logger.LogError(
                   ex,
                   "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromTradingBooks(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "TreasuryUnit",
                "RemoveFromTradingBooks",
                () => _repository.RemoveFromTradingBooksAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> AddToBankAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "TreasuryUnit",
                "AddToBankAccounts",
                () => _repository.AddToBankAccountsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
           _logger.LogError(
                   ex,
                   "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromBankAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "TreasuryUnit",
                "RemoveFromBankAccounts",
                () => _repository.RemoveFromBankAccountsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> AddToPolicies(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "TreasuryUnit",
                "AddToPolicies",
                () => _repository.AddToPoliciesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
           _logger.LogError(
                   ex,
                   "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromPolicies(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "TreasuryUnit",
                "RemoveFromPolicies",
                () => _repository.RemoveFromPoliciesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> AddToTransferPricingRules(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "TreasuryUnit",
                "AddToTransferPricingRules",
                () => _repository.AddToTransferPricingRulesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
           _logger.LogError(
                   ex,
                   "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromTransferPricingRules(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "TreasuryUnit",
                "RemoveFromTransferPricingRules",
                () => _repository.RemoveFromTransferPricingRulesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> AddToInternalDealsOut(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "TreasuryUnit",
                "AddToInternalDealsOut",
                () => _repository.AddToInternalDealsOutAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
           _logger.LogError(
                   ex,
                   "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromInternalDealsOut(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "TreasuryUnit",
                "RemoveFromInternalDealsOut",
                () => _repository.RemoveFromInternalDealsOutAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> AddToInternalDealsIn(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "TreasuryUnit",
                "AddToInternalDealsIn",
                () => _repository.AddToInternalDealsInAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
           _logger.LogError(
                   ex,
                   "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromInternalDealsIn(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "TreasuryUnit",
                "RemoveFromInternalDealsIn",
                () => _repository.RemoveFromInternalDealsInAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }



}
