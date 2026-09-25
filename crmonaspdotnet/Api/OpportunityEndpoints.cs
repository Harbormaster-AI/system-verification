
using crmonaspdotnet.Service;
using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Api;

public static class OpportunityEndpoints
{
    public static IEndpointRouteBuilder MapOpportunityEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/opportunity").WithTags("Opportunitys");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignOrganization", AssignOrganization);
        group.MapPut("/unassignOrganization", UnassignOrganization);
        group.MapPut("/assignAccount", AssignAccount);
        group.MapPut("/unassignAccount", UnassignAccount);
        group.MapPut("/assignOwner", AssignOwner);
        group.MapPut("/unassignOwner", UnassignOwner);

    group.MapPut("/addToContacts", AddToContacts);
    group.MapPut("/removeFromContacts", RemoveFromContacts);

    group.MapPut("/addToLineItems", AddToLineItems);
    group.MapPut("/removeFromLineItems", RemoveFromLineItems);

    group.MapPut("/addToStageHistory", AddToStageHistory);
    group.MapPut("/removeFromStageHistory", RemoveFromStageHistory);

    group.MapPut("/addToQuotes", AddToQuotes);
    group.MapPut("/removeFromQuotes", RemoveFromQuotes);

    group.MapPut("/addToOrders", AddToOrders);
    group.MapPut("/removeFromOrders", RemoveFromOrders);

    group.MapPut("/addToCampaigns", AddToCampaigns);
    group.MapPut("/removeFromCampaigns", RemoveFromCampaigns);

    group.MapPut("/addToActivities", AddToActivities);
    group.MapPut("/removeFromActivities", RemoveFromActivities);

    group.MapPut("/addToTeams", AddToTeams);
    group.MapPut("/removeFromTeams", RemoveFromTeams);


        return app;
    }

    private static async Task<IResult> Create(
        OpportunityRequest request,
        IOpportunityService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToOpportunity( request );

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
        OpportunityRequest request,
        IOpportunityService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToOpportunity( request );

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
        IOpportunityService service,
        CancellationToken cancellationToken) {

        var opportunity = await service.Get(identifier, cancellationToken);
        return opportunity is null ? Results.NotFound() : Results.Ok( opportunity );
    }


    private static async Task<IResult> GetAll(
        IOpportunityService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( OpportunityResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IOpportunityService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOrganization(
        AssociationRequest request,
        IOpportunityService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignOrganization(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOrganization(
    AssociationRequest request,
    IOpportunityService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignOrganization(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignAccount(
        AssociationRequest request,
        IOpportunityService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignAccount(
    AssociationRequest request,
    IOpportunityService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOwner(
        AssociationRequest request,
        IOpportunityService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignOwner(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOwner(
    AssociationRequest request,
    IOpportunityService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignOwner(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToContacts(
        MultipleAssociationRequest request,
        IOpportunityService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToContacts(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromContacts(
        MultipleAssociationRequest request,
        IOpportunityService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromContacts(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToLineItems(
        MultipleAssociationRequest request,
        IOpportunityService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToLineItems(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromLineItems(
        MultipleAssociationRequest request,
        IOpportunityService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromLineItems(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToStageHistory(
        MultipleAssociationRequest request,
        IOpportunityService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToStageHistory(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromStageHistory(
        MultipleAssociationRequest request,
        IOpportunityService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromStageHistory(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToQuotes(
        MultipleAssociationRequest request,
        IOpportunityService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToQuotes(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromQuotes(
        MultipleAssociationRequest request,
        IOpportunityService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromQuotes(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToOrders(
        MultipleAssociationRequest request,
        IOpportunityService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToOrders(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromOrders(
        MultipleAssociationRequest request,
        IOpportunityService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromOrders(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToCampaigns(
        MultipleAssociationRequest request,
        IOpportunityService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToCampaigns(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromCampaigns(
        MultipleAssociationRequest request,
        IOpportunityService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromCampaigns(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToActivities(
        MultipleAssociationRequest request,
        IOpportunityService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToActivities(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromActivities(
        MultipleAssociationRequest request,
        IOpportunityService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromActivities(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToTeams(
        MultipleAssociationRequest request,
        IOpportunityService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToTeams(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromTeams(
        MultipleAssociationRequest request,
        IOpportunityService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromTeams(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static Opportunity mapRequestToOpportunity( OpportunityRequest request ) {
        var model = new Opportunity
        {
            Id = request.Id,
            Name = request.Name,
            Amount = request.Amount,
            CloseDate = request.CloseDate,
            Probability = request.Probability,
            Description = request.Description,
            Stage = request.Stage,
            Type = request.Type,
            ForecastCategory = request.ForecastCategory,
        };
        return model;
    }

}
