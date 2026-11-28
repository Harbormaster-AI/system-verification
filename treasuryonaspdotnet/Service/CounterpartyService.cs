
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Persistence;
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Telemetry;

namespace treasuryonaspdotnet.Service;

public interface ICounterpartyService
{

    Task Create(Counterparty model, CancellationToken cancellationToken);
    Task<bool> Update(Counterparty model, CancellationToken cancellationToken);
    Task<Counterparty?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<Counterparty>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------

    Task<bool> AddToNettingAgreements(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromNettingAgreements(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToTrades(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromTrades(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToCollateralAgreements(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromCollateralAgreements(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToLimits(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromLimits(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToMarginCalls(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromMarginCalls(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToSettlementInstructions(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromSettlementInstructions(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class CounterpartyService : ICounterpartyService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly ICounterpartyRepository _repository;
    private readonly ILogger<CounterpartyService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public CounterpartyService(
        ApplicationTelemetry telemetry,
        ICounterpartyRepository repository,
        ILogger<CounterpartyService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(Counterparty model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Counterparty",
                "CreateCounterparty",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(Counterparty model, CancellationToken cancellationToken)
    {
        try
        {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.LegalName = model.LegalName;
            existing.Lei = model.Lei;
            existing.Sector = model.Sector;
            existing.DomicileCountry = model.DomicileCountry;
            existing.CreditRating = model.CreditRating;

            await _telemetry.Execute(
                "Counterparty",
                "UpdateCounterparty",
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

    public Task<Counterparty?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<Counterparty>> GetAll(CancellationToken cancellationToken)
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
                "Counterparty",
                "UpdateCounterparty",
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


    public async Task<bool> AddToNettingAgreements(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Counterparty",
                "AddToNettingAgreements",
                () => _repository.AddToNettingAgreementsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromNettingAgreements(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Counterparty",
                "RemoveFromNettingAgreements",
                () => _repository.RemoveFromNettingAgreementsAsync(request, cancellationToken));
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

    public async Task<bool> AddToTrades(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Counterparty",
                "AddToTrades",
                () => _repository.AddToTradesAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromTrades(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Counterparty",
                "RemoveFromTrades",
                () => _repository.RemoveFromTradesAsync(request, cancellationToken));
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

    public async Task<bool> AddToCollateralAgreements(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Counterparty",
                "AddToCollateralAgreements",
                () => _repository.AddToCollateralAgreementsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromCollateralAgreements(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Counterparty",
                "RemoveFromCollateralAgreements",
                () => _repository.RemoveFromCollateralAgreementsAsync(request, cancellationToken));
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

    public async Task<bool> AddToLimits(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Counterparty",
                "AddToLimits",
                () => _repository.AddToLimitsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromLimits(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Counterparty",
                "RemoveFromLimits",
                () => _repository.RemoveFromLimitsAsync(request, cancellationToken));
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

    public async Task<bool> AddToMarginCalls(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Counterparty",
                "AddToMarginCalls",
                () => _repository.AddToMarginCallsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromMarginCalls(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Counterparty",
                "RemoveFromMarginCalls",
                () => _repository.RemoveFromMarginCallsAsync(request, cancellationToken));
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

    public async Task<bool> AddToSettlementInstructions(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Counterparty",
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

    public async Task<bool> RemoveFromSettlementInstructions(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Counterparty",
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
