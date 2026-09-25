
using crmonaspdotnet.Service;
using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Api;

public static class CampaignEndpoints
{
    public static IEndpointRouteBuilder MapCampaignEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/campaign").WithTags("Campaigns");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignOrganization", AssignOrganization);
        group.MapPut("/unassignOrganization", UnassignOrganization);
        group.MapPut("/assignParentCampaign", AssignParentCampaign);
        group.MapPut("/unassignParentCampaign", UnassignParentCampaign);

        group.MapPut("/addToChildCampaigns", AddToChildCampaigns);
        group.MapPut("/removeFromChildCampaigns", RemoveFromChildCampaigns);

        group.MapPut("/addToMembers", AddToMembers);
        group.MapPut("/removeFromMembers", RemoveFromMembers);

        group.MapPut("/addToOpportunities", AddToOpportunities);
        group.MapPut("/removeFromOpportunities", RemoveFromOpportunities);

        group.MapPut("/addToAccounts", AddToAccounts);
        group.MapPut("/removeFromAccounts", RemoveFromAccounts);

        group.MapPut("/addToLeads", AddToLeads);
        group.MapPut("/removeFromLeads", RemoveFromLeads);

        group.MapPut("/addToContacts", AddToContacts);
        group.MapPut("/removeFromContacts", RemoveFromContacts);

        group.MapPut("/addToTeams", AddToTeams);
        group.MapPut("/removeFromTeams", RemoveFromTeams);

        group.MapPut("/addToActivities", AddToActivities);
        group.MapPut("/removeFromActivities", RemoveFromActivities);


        return app;
    }

    private static async Task<IResult> Create(
        CampaignRequest request,
        ICampaignService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToCampaign(request);

        try
        {
            await service.Create(model, cancellationToken);
        }
        catch (InvalidOperationException ex)
        {
            return Results.BadRequest(new { error = ex.Message });
        }

        return Results.NoContent();
    }

    private static async Task<IResult> Update(
        CampaignRequest request,
        ICampaignService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToCampaign(request);

        try
        {
            var updated = await service.Update(model, cancellationToken);
            return updated ? Results.NoContent() : Results.NotFound();
        }
        catch (InvalidOperationException ex)
        {
            return Results.BadRequest(new { error = ex.Message });
        }
    }


    private static async Task<IResult> Get(
        IdentifierRequest identifier,
        ICampaignService service,
        CancellationToken cancellationToken)
    {

        var campaign = await service.Get(identifier, cancellationToken);
        return campaign is null ? Results.NotFound() : Results.Ok(campaign);
    }


    private static async Task<IResult> GetAll(
        ICampaignService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(CampaignResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ICampaignService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOrganization(
        AssociationRequest request,
        ICampaignService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignOrganization(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOrganization(
    AssociationRequest request,
    ICampaignService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignOrganization(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignParentCampaign(
        AssociationRequest request,
        ICampaignService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignParentCampaign(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignParentCampaign(
    AssociationRequest request,
    ICampaignService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignParentCampaign(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToChildCampaigns(
        MultipleAssociationRequest request,
        ICampaignService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToChildCampaigns(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromChildCampaigns(
        MultipleAssociationRequest request,
        ICampaignService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromChildCampaigns(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToMembers(
        MultipleAssociationRequest request,
        ICampaignService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToMembers(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromMembers(
        MultipleAssociationRequest request,
        ICampaignService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromMembers(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToOpportunities(
        MultipleAssociationRequest request,
        ICampaignService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToOpportunities(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromOpportunities(
        MultipleAssociationRequest request,
        ICampaignService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromOpportunities(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToAccounts(
        MultipleAssociationRequest request,
        ICampaignService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToAccounts(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromAccounts(
        MultipleAssociationRequest request,
        ICampaignService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromAccounts(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToLeads(
        MultipleAssociationRequest request,
        ICampaignService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToLeads(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromLeads(
        MultipleAssociationRequest request,
        ICampaignService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromLeads(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToContacts(
        MultipleAssociationRequest request,
        ICampaignService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToContacts(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromContacts(
        MultipleAssociationRequest request,
        ICampaignService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromContacts(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToTeams(
        MultipleAssociationRequest request,
        ICampaignService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToTeams(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromTeams(
        MultipleAssociationRequest request,
        ICampaignService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromTeams(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToActivities(
        MultipleAssociationRequest request,
        ICampaignService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToActivities(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromActivities(
        MultipleAssociationRequest request,
        ICampaignService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromActivities(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static Campaign mapRequestToCampaign(CampaignRequest request)
    {
        var model = new Campaign
        {
            Id = request.Id,
            Name = request.Name,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            Budget = request.Budget,
            ActualCost = request.ActualCost,
            ExpectedRevenue = request.ExpectedRevenue,
            Status = request.Status,
            Type = request.Type,
        };
        return model;
    }

}
