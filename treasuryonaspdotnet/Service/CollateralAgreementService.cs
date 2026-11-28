
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Persistence;
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Telemetry;

namespace treasuryonaspdotnet.Service;

public interface ICollateralAgreementService {

    Task Create(CollateralAgreement model , CancellationToken cancellationToken);
    Task<bool> Update(CollateralAgreement model, CancellationToken cancellationToken);
    Task<CollateralAgreement?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<CollateralAgreement>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignNettingAgreement(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignNettingAgreement(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignCounterparty(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignCounterparty(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToMarginCalls(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromMarginCalls(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToCollateralAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromCollateralAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class CollateralAgreementService : ICollateralAgreementService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly ICollateralAgreementRepository _repository;
    private readonly ILogger<CollateralAgreementService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public CollateralAgreementService(
        ApplicationTelemetry telemetry,
        ICollateralAgreementRepository repository,
        ILogger<CollateralAgreementService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(CollateralAgreement model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "CollateralAgreement",
                "CreateCollateralAgreement",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(CollateralAgreement model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.Threshold = model.Threshold;
            existing.MinimumTransferAmount = model.MinimumTransferAmount;
            existing.IndependentAmount = model.IndependentAmount;
            existing.MarginFrequency = model.MarginFrequency;
            existing.AgreementType = model.AgreementType;
            existing.EligibleCollateral = model.EligibleCollateral;

            await _telemetry.Execute(
                "CollateralAgreement",
                "UpdateCollateralAgreement",
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

    public Task<CollateralAgreement?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<CollateralAgreement>> GetAll(CancellationToken cancellationToken)
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
                "CollateralAgreement",
                "UpdateCollateralAgreement",
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

    public async Task<bool> AssignNettingAgreement(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No CollateralAgreement found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<NettingAgreementService>().Get(childRequest, cancellationToken);
            parent.NettingAgreement = child;
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

    public async Task<bool> UnassignNettingAgreement(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No CollateralAgreement found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.NettingAgreement = null;
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
            _logger.LogError("No CollateralAgreement found using Id {ParentId}", request.ParentId);
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
            _logger.LogError("No CollateralAgreement found using Id {ParentId}", request.ParentId);
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


    public async Task<bool> AddToMarginCalls(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "CollateralAgreement",
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
                "CollateralAgreement",
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

    public async Task<bool> AddToCollateralAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "CollateralAgreement",
                "AddToCollateralAccounts",
                () => _repository.AddToCollateralAccountsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromCollateralAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "CollateralAgreement",
                "RemoveFromCollateralAccounts",
                () => _repository.RemoveFromCollateralAccountsAsync(request, cancellationToken));
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
