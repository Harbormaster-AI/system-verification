
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Persistence;
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Telemetry;

namespace treasuryonaspdotnet.Service;

public interface IBankAccountService {

    Task Create(BankAccount model , CancellationToken cancellationToken);
    Task<bool> Update(BankAccount model, CancellationToken cancellationToken);
    Task<BankAccount?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<BankAccount>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignTreasuryUnit(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignTreasuryUnit(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToCashPositions(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromCashPositions(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToCashFlows(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromCashFlows(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToSettlementInstructions(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromSettlementInstructions(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class BankAccountService : IBankAccountService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IBankAccountRepository _repository;
    private readonly ILogger<BankAccountService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public BankAccountService(
        ApplicationTelemetry telemetry,
        IBankAccountRepository repository,
        ILogger<BankAccountService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(BankAccount model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "BankAccount",
                "CreateBankAccount",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(BankAccount model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.AccountName = model.AccountName;
            existing.AccountIdentifier = model.AccountIdentifier;
            existing.Currency = model.Currency;
            existing.BankBic = model.BankBic;

            await _telemetry.Execute(
                "BankAccount",
                "UpdateBankAccount",
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

    public Task<BankAccount?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<BankAccount>> GetAll(CancellationToken cancellationToken)
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
                "BankAccount",
                "UpdateBankAccount",
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

    public async Task<bool> AssignTreasuryUnit(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No BankAccount found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<TreasuryUnitService>().Get(childRequest, cancellationToken);
            parent.TreasuryUnit = child;
            await Update( parent, cancellationToken );
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

    public async Task<bool> UnassignTreasuryUnit(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No BankAccount found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.TreasuryUnit = null;
            await Update( parent, cancellationToken );
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


    public async Task<bool> AddToCashPositions(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "BankAccount",
                "AddToCashPositions",
                () => _repository.AddToCashPositionsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromCashPositions(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "BankAccount",
                "RemoveFromCashPositions",
                () => _repository.RemoveFromCashPositionsAsync(request, cancellationToken));
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

    public async Task<bool> AddToCashFlows(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "BankAccount",
                "AddToCashFlows",
                () => _repository.AddToCashFlowsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromCashFlows(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "BankAccount",
                "RemoveFromCashFlows",
                () => _repository.RemoveFromCashFlowsAsync(request, cancellationToken));
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

    public async Task<bool> AddToSettlementInstructions(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "BankAccount",
                "AddToSettlementInstructions",
                () => _repository.AddToSettlementInstructionsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromSettlementInstructions(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "BankAccount",
                "RemoveFromSettlementInstructions",
                () => _repository.RemoveFromSettlementInstructionsAsync(request, cancellationToken));
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
