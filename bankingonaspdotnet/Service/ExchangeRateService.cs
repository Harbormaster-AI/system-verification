
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Persistence;
using bankingonaspdotnet.Contracts;
using bankingonaspdotnet.Telemetry;

namespace bankingonaspdotnet.Service;

public interface IExchangeRateService {

    Task Create(ExchangeRate model , CancellationToken cancellationToken);
    Task<bool> Update(ExchangeRate model, CancellationToken cancellationToken);
    Task<ExchangeRate?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<ExchangeRate>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);

    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignBank(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignBank(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToFxTrades(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromFxTrades(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class ExchangeRateService : IExchangeRateService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IExchangeRateRepository _repository;
    private readonly ILogger<ExchangeRateService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public ExchangeRateService(
        ApplicationTelemetry telemetry,
        IExchangeRateRepository repository,
        ILogger<ExchangeRateService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(ExchangeRate model, CancellationToken cancellationToken)
    {
        try
        {
            return await telemetry.Execute(
                "ExchangeRate",
                "CreateExchangeRate",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
        }
    }

    public async Task<bool> Update(ExchangeRate model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.BaseCurrency = model.BaseCurrency;
            existing.CounterCurrency = model.CounterCurrency;
            existing.Rate = model.Rate;
            existing.AsOf = model.AsOf;
            existing.Source = model.Source;

            return await telemetry.Execute(
                "ExchangeRate",
                "UpdateExchangeRate",
                () => _repository.UpdateAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public Task<ExchangeRate?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<ExchangeRate>> GetAll(CancellationToken cancellationToken)
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
                "ExchangeRate",
                "UpdateExchangeRate",
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
            _logger.LogError($"No ExchangeRate found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId;
            };

            var child = serviceResolver.get(BankService).get( childRequest , cancellationToken )
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
            _logger.LogError($"No ExchangeRate found using Id {ParentId}", request.ParentId);
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


    public async Task<bool> AddToFxTrades(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "ExchangeRate",
                "AddToFxTrades",
                () => _repository.AddToFxTradesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromFxTrades(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "ExchangeRate",
                "RemoveFromFxTrades",
                () => _repository.RemoveFromFxTradesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }



}
