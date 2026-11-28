
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Persistence;
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Telemetry;

namespace treasuryonaspdotnet.Service;

public interface ISettlementInstructionService {

    Task Create(SettlementInstruction model , CancellationToken cancellationToken);
    Task<bool> Update(SettlementInstruction model, CancellationToken cancellationToken);
    Task<SettlementInstruction?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<SettlementInstruction>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignTrade(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignTrade(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignCounterparty(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignCounterparty(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignBankAccount(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignBankAccount(AssociationRequest request, CancellationToken cancellationToken);


}

public class SettlementInstructionService : ISettlementInstructionService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly ISettlementInstructionRepository _repository;
    private readonly ILogger<SettlementInstructionService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public SettlementInstructionService(
        ApplicationTelemetry telemetry,
        ISettlementInstructionRepository repository,
        ILogger<SettlementInstructionService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(SettlementInstruction model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "SettlementInstruction",
                "CreateSettlementInstruction",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(SettlementInstruction model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.PaymentSystem = model.PaymentSystem;
            existing.SettlementCurrency = model.SettlementCurrency;
            existing.BeneficiaryAccount = model.BeneficiaryAccount;
            existing.IntermediaryBankBic = model.IntermediaryBankBic;

            await _telemetry.Execute(
                "SettlementInstruction",
                "UpdateSettlementInstruction",
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

    public Task<SettlementInstruction?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<SettlementInstruction>> GetAll(CancellationToken cancellationToken)
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
                "SettlementInstruction",
                "UpdateSettlementInstruction",
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

    public async Task<bool> AssignTrade(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No SettlementInstruction found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<TradeService>().Get(childRequest, cancellationToken);
            parent.Trade = child;
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

    public async Task<bool> UnassignTrade(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No SettlementInstruction found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Trade = null;
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

    public async Task<bool> AssignCounterparty(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No SettlementInstruction found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<CounterpartyService>().Get(childRequest, cancellationToken);
            parent.Counterparty = child;
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

    public async Task<bool> UnassignCounterparty(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No SettlementInstruction found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Counterparty = null;
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

    public async Task<bool> AssignBankAccount(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No SettlementInstruction found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<BankAccountService>().Get(childRequest, cancellationToken);
            parent.BankAccount = child;
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

    public async Task<bool> UnassignBankAccount(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No SettlementInstruction found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.BankAccount = null;
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




}
