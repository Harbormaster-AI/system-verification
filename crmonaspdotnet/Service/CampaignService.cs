
using crmonaspdotnet.Domain;
using crmonaspdotnet.Persistence;
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Telemetry;

namespace crmonaspdotnet.Service;

public interface ICampaignService
{

    Task Create(Campaign model, CancellationToken cancellationToken);
    Task<bool> Update(Campaign model, CancellationToken cancellationToken);
    Task<Campaign?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<Campaign>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignOrganization(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignOrganization(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignParentCampaign(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignParentCampaign(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToChildCampaigns(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromChildCampaigns(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToMembers(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromMembers(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToOpportunities(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromOpportunities(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToLeads(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromLeads(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToContacts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromContacts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToTeams(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromTeams(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToActivities(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromActivities(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class CampaignService : ICampaignService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly ICampaignRepository _repository;
    private readonly ILogger<CampaignService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public CampaignService(
        ApplicationTelemetry telemetry,
        ICampaignRepository repository,
        ILogger<CampaignService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(Campaign model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Campaign",
                "CreateCampaign",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(Campaign model, CancellationToken cancellationToken)
    {
        try
        {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.Name = model.Name;
            existing.StartDate = model.StartDate;
            existing.EndDate = model.EndDate;
            existing.Budget = model.Budget;
            existing.ActualCost = model.ActualCost;
            existing.ExpectedRevenue = model.ExpectedRevenue;
            existing.Status = model.Status;
            existing.Type = model.Type;

            await _telemetry.Execute(
                "Campaign",
                "UpdateCampaign",
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

    public Task<Campaign?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<Campaign>> GetAll(CancellationToken cancellationToken)
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
                "Campaign",
                "UpdateCampaign",
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

    public async Task<bool> AssignOrganization(AssociationRequest request, CancellationToken cancellationToken)
    {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No Campaign found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<OrganizationService>().Get(childRequest, cancellationToken);
            parent.Organization = child;
            await Update(parent, cancellationToken);
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

    public async Task<bool> UnassignOrganization(AssociationRequest request, CancellationToken cancellationToken)
    {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No Campaign found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Organization = null;
            await Update(parent, cancellationToken);
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

    public async Task<bool> AssignParentCampaign(AssociationRequest request, CancellationToken cancellationToken)
    {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No Campaign found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<CampaignService>().Get(childRequest, cancellationToken);
            parent.ParentCampaign = child;
            await Update(parent, cancellationToken);
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

    public async Task<bool> UnassignParentCampaign(AssociationRequest request, CancellationToken cancellationToken)
    {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No Campaign found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.ParentCampaign = null;
            await Update(parent, cancellationToken);
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


    public async Task<bool> AddToChildCampaigns(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Campaign",
                "AddToChildCampaigns",
                () => _repository.AddToChildCampaignsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromChildCampaigns(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Campaign",
                "RemoveFromChildCampaigns",
                () => _repository.RemoveFromChildCampaignsAsync(request, cancellationToken));
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

    public async Task<bool> AddToMembers(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Campaign",
                "AddToMembers",
                () => _repository.AddToMembersAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromMembers(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Campaign",
                "RemoveFromMembers",
                () => _repository.RemoveFromMembersAsync(request, cancellationToken));
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

    public async Task<bool> AddToOpportunities(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Campaign",
                "AddToOpportunities",
                () => _repository.AddToOpportunitiesAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromOpportunities(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Campaign",
                "RemoveFromOpportunities",
                () => _repository.RemoveFromOpportunitiesAsync(request, cancellationToken));
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

    public async Task<bool> AddToAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Campaign",
                "AddToAccounts",
                () => _repository.AddToAccountsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Campaign",
                "RemoveFromAccounts",
                () => _repository.RemoveFromAccountsAsync(request, cancellationToken));
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

    public async Task<bool> AddToLeads(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Campaign",
                "AddToLeads",
                () => _repository.AddToLeadsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromLeads(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Campaign",
                "RemoveFromLeads",
                () => _repository.RemoveFromLeadsAsync(request, cancellationToken));
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

    public async Task<bool> AddToContacts(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Campaign",
                "AddToContacts",
                () => _repository.AddToContactsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromContacts(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Campaign",
                "RemoveFromContacts",
                () => _repository.RemoveFromContactsAsync(request, cancellationToken));
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

    public async Task<bool> AddToTeams(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Campaign",
                "AddToTeams",
                () => _repository.AddToTeamsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromTeams(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Campaign",
                "RemoveFromTeams",
                () => _repository.RemoveFromTeamsAsync(request, cancellationToken));
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

    public async Task<bool> AddToActivities(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Campaign",
                "AddToActivities",
                () => _repository.AddToActivitiesAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromActivities(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "Campaign",
                "RemoveFromActivities",
                () => _repository.RemoveFromActivitiesAsync(request, cancellationToken));
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
