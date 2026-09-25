
using crmonaspdotnet.Domain;
using crmonaspdotnet.Persistence;
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Telemetry;

namespace crmonaspdotnet.Service;

public interface IOpportunityStageHistoryService {

    Task Create(OpportunityStageHistory model , CancellationToken cancellationToken);
    Task<bool> Update(OpportunityStageHistory model, CancellationToken cancellationToken);
    Task<OpportunityStageHistory?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<OpportunityStageHistory>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignOpportunity(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignOpportunity(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignChangedBy(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignChangedBy(AssociationRequest request, CancellationToken cancellationToken);


}

public class OpportunityStageHistoryService : IOpportunityStageHistoryService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IOpportunityStageHistoryRepository _repository;
    private readonly ILogger<OpportunityStageHistoryService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public OpportunityStageHistoryService(
        ApplicationTelemetry telemetry,
        IOpportunityStageHistoryRepository repository,
        ILogger<OpportunityStageHistoryService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(OpportunityStageHistory model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "OpportunityStageHistory",
                "CreateOpportunityStageHistory",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(OpportunityStageHistory model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.ChangedAt = model.ChangedAt;
            existing.Comment = model.Comment;
            existing.FromStage = model.FromStage;
            existing.ToStage = model.ToStage;

            await _telemetry.Execute(
                "OpportunityStageHistory",
                "UpdateOpportunityStageHistory",
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

    public Task<OpportunityStageHistory?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<OpportunityStageHistory>> GetAll(CancellationToken cancellationToken)
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
                "OpportunityStageHistory",
                "UpdateOpportunityStageHistory",
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

    public async Task<bool> AssignOpportunity(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No OpportunityStageHistory found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<OpportunityService>().Get(childRequest, cancellationToken);
            parent.Opportunity = child;
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

    public async Task<bool> UnassignOpportunity(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No OpportunityStageHistory found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Opportunity = null;
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

    public async Task<bool> AssignChangedBy(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No OpportunityStageHistory found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<UserService>().Get(childRequest, cancellationToken);
            parent.ChangedBy = child;
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

    public async Task<bool> UnassignChangedBy(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No OpportunityStageHistory found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.ChangedBy = null;
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
