
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Persistence;
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Telemetry;

namespace treasuryonaspdotnet.Service;

public interface ICollateralAccountService {

    Task Create(CollateralAccount model , CancellationToken cancellationToken);
    Task<bool> Update(CollateralAccount model, CancellationToken cancellationToken);
    Task<CollateralAccount?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<CollateralAccount>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignCollateralAgreement(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignCollateralAgreement(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToTrades(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromTrades(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToMarginCalls(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromMarginCalls(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class CollateralAccountService : ICollateralAccountService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly ICollateralAccountRepository _repository;
    private readonly ILogger<CollateralAccountService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public CollateralAccountService(
        ApplicationTelemetry telemetry,
        ICollateralAccountRepository repository,
        ILogger<CollateralAccountService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(CollateralAccount model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "CollateralAccount",
                "CreateCollateralAccount",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(CollateralAccount model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.AccountName = model.AccountName;
            existing.CustodyLocation = model.CustodyLocation;
            existing.CollateralType = model.CollateralType;

            await _telemetry.Execute(
                "CollateralAccount",
                "UpdateCollateralAccount",
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

    public Task<CollateralAccount?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<CollateralAccount>> GetAll(CancellationToken cancellationToken)
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
                "CollateralAccount",
                "UpdateCollateralAccount",
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

    public async Task<bool> AssignCollateralAgreement(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No CollateralAccount found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<CollateralAgreementService>().Get(childRequest, cancellationToken);
            parent.CollateralAgreement = child;
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

    public async Task<bool> UnassignCollateralAgreement(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No CollateralAccount found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.CollateralAgreement = null;
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


    public async Task<bool> AddToTrades(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "CollateralAccount",
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

    public async Task<bool> RemoveFromTrades(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "CollateralAccount",
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

    public async Task<bool> AddToMarginCalls(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "CollateralAccount",
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

    public async Task<bool> RemoveFromMarginCalls(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "CollateralAccount",
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



}
