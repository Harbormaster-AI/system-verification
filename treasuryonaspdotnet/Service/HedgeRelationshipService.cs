
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Persistence;
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Telemetry;

namespace treasuryonaspdotnet.Service;

public interface IHedgeRelationshipService {

    Task Create(HedgeRelationship model , CancellationToken cancellationToken);
    Task<bool> Update(HedgeRelationship model, CancellationToken cancellationToken);
    Task<HedgeRelationship?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<HedgeRelationship>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignHedgedItem(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignHedgedItem(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignHedgingInstrument(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignHedgingInstrument(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToAccountingEntries(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromAccountingEntries(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class HedgeRelationshipService : IHedgeRelationshipService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IHedgeRelationshipRepository _repository;
    private readonly ILogger<HedgeRelationshipService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public HedgeRelationshipService(
        ApplicationTelemetry telemetry,
        IHedgeRelationshipRepository repository,
        ILogger<HedgeRelationshipService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(HedgeRelationship model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "HedgeRelationship",
                "CreateHedgeRelationship",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(HedgeRelationship model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.Name = model.Name;
            existing.Objective = model.Objective;
            existing.DesignationStatus = model.DesignationStatus;

            await _telemetry.Execute(
                "HedgeRelationship",
                "UpdateHedgeRelationship",
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

    public Task<HedgeRelationship?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<HedgeRelationship>> GetAll(CancellationToken cancellationToken)
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
                "HedgeRelationship",
                "UpdateHedgeRelationship",
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

    public async Task<bool> AssignHedgedItem(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No HedgeRelationship found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<TradeService>().Get(childRequest, cancellationToken);
            parent.HedgedItem = child;
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

    public async Task<bool> UnassignHedgedItem(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No HedgeRelationship found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.HedgedItem = null;
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

    public async Task<bool> AssignHedgingInstrument(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No HedgeRelationship found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<TradeService>().Get(childRequest, cancellationToken);
            parent.HedgingInstrument = child;
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

    public async Task<bool> UnassignHedgingInstrument(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No HedgeRelationship found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.HedgingInstrument = null;
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


    public async Task<bool> AddToAccountingEntries(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "HedgeRelationship",
                "AddToAccountingEntries",
                () => _repository.AddToAccountingEntriesAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromAccountingEntries(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "HedgeRelationship",
                "RemoveFromAccountingEntries",
                () => _repository.RemoveFromAccountingEntriesAsync(request, cancellationToken));
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
