
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Persistence;
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Telemetry;

namespace treasuryonaspdotnet.Service;

public interface INettingAgreementService {

    Task Create(NettingAgreement model , CancellationToken cancellationToken);
    Task<bool> Update(NettingAgreement model, CancellationToken cancellationToken);
    Task<NettingAgreement?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<NettingAgreement>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignCounterparty(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignCounterparty(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToCollateralAgreements(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromCollateralAgreements(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToTrades(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromTrades(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class NettingAgreementService : INettingAgreementService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly INettingAgreementRepository _repository;
    private readonly ILogger<NettingAgreementService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public NettingAgreementService(
        ApplicationTelemetry telemetry,
        INettingAgreementRepository repository,
        ILogger<NettingAgreementService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(NettingAgreement model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "NettingAgreement",
                "CreateNettingAgreement",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(NettingAgreement model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.AgreementDate = model.AgreementDate;
            existing.GoverningLaw = model.GoverningLaw;
            existing.AgreementType = model.AgreementType;

            await _telemetry.Execute(
                "NettingAgreement",
                "UpdateNettingAgreement",
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

    public Task<NettingAgreement?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<NettingAgreement>> GetAll(CancellationToken cancellationToken)
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
                "NettingAgreement",
                "UpdateNettingAgreement",
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

    public async Task<bool> AssignCounterparty(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No NettingAgreement found using Id {ParentId}", request.ParentId);
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
            _logger.LogError("No NettingAgreement found using Id {ParentId}", request.ParentId);
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


    public async Task<bool> AddToCollateralAgreements(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "NettingAgreement",
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

    public async Task<bool> RemoveFromCollateralAgreements(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "NettingAgreement",
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

    public async Task<bool> AddToTrades(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "NettingAgreement",
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
                "NettingAgreement",
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



}
