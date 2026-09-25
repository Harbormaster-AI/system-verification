
using crmonaspdotnet.Service;
using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Api;

public static class ActivityEndpoints
{
    public static IEndpointRouteBuilder MapActivityEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/activity").WithTags("Activitys");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignOrganization", AssignOrganization);
        group.MapPut("/unassignOrganization", UnassignOrganization);
        group.MapPut("/assignOwner", AssignOwner);
        group.MapPut("/unassignOwner", UnassignOwner);
        group.MapPut("/assignAccount", AssignAccount);
        group.MapPut("/unassignAccount", UnassignAccount);
        group.MapPut("/assignContact", AssignContact);
        group.MapPut("/unassignContact", UnassignContact);
        group.MapPut("/assignLead", AssignLead);
        group.MapPut("/unassignLead", UnassignLead);
        group.MapPut("/assignOpportunity", AssignOpportunity);
        group.MapPut("/unassignOpportunity", UnassignOpportunity);
        group.MapPut("/assignCase_", AssignCase_);
        group.MapPut("/unassignCase_", UnassignCase_);
        group.MapPut("/assignCampaign", AssignCampaign);
        group.MapPut("/unassignCampaign", UnassignCampaign);


        return app;
    }

    private static async Task<IResult> Create(
        ActivityRequest request,
        IActivityService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToActivity( request );

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
        ActivityRequest request,
        IActivityService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToActivity( request );

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
        IActivityService service,
        CancellationToken cancellationToken) {

        var activity = await service.Get(identifier, cancellationToken);
        return activity is null ? Results.NotFound() : Results.Ok( activity );
    }


    private static async Task<IResult> GetAll(
        IActivityService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( ActivityResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IActivityService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOrganization(
        AssociationRequest request,
        IActivityService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignOrganization(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOrganization(
    AssociationRequest request,
    IActivityService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignOrganization(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOwner(
        AssociationRequest request,
        IActivityService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignOwner(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOwner(
    AssociationRequest request,
    IActivityService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignOwner(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignAccount(
        AssociationRequest request,
        IActivityService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignAccount(
    AssociationRequest request,
    IActivityService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignContact(
        AssociationRequest request,
        IActivityService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignContact(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignContact(
    AssociationRequest request,
    IActivityService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignContact(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignLead(
        AssociationRequest request,
        IActivityService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignLead(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignLead(
    AssociationRequest request,
    IActivityService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignLead(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOpportunity(
        AssociationRequest request,
        IActivityService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignOpportunity(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOpportunity(
    AssociationRequest request,
    IActivityService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignOpportunity(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignCase_(
        AssociationRequest request,
        IActivityService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignCase_(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignCase_(
    AssociationRequest request,
    IActivityService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignCase_(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignCampaign(
        AssociationRequest request,
        IActivityService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignCampaign(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignCampaign(
    AssociationRequest request,
    IActivityService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignCampaign(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static Activity mapRequestToActivity( ActivityRequest request ) {
        var model = new Activity
        {
            Id = request.Id,
            Subject = request.Subject,
            DueDate = request.DueDate,
            StartAt = request.StartAt,
            EndAt = request.EndAt,
            Location = request.Location,
            ActivityType = request.ActivityType,
            Status = request.Status,
            Priority = request.Priority,
        };
        return model;
    }

}
