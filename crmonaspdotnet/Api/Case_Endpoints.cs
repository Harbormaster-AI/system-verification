
using crmonaspdotnet.Service;
using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Api;

public static class Case_Endpoints
{
    public static IEndpointRouteBuilder MapCase_Endpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/case_").WithTags("Case_s");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignOrganization", AssignOrganization);
        group.MapPut("/unassignOrganization", UnassignOrganization);
        group.MapPut("/assignAccount", AssignAccount);
        group.MapPut("/unassignAccount", UnassignAccount);
        group.MapPut("/assignContact", AssignContact);
        group.MapPut("/unassignContact", UnassignContact);
        group.MapPut("/assignOwner", AssignOwner);
        group.MapPut("/unassignOwner", UnassignOwner);
        group.MapPut("/assignTeam", AssignTeam);
        group.MapPut("/unassignTeam", UnassignTeam);

        group.MapPut("/addToActivities", AddToActivities);
        group.MapPut("/removeFromActivities", RemoveFromActivities);

        group.MapPut("/addToCaseComments", AddToCaseComments);
        group.MapPut("/removeFromCaseComments", RemoveFromCaseComments);

        group.MapPut("/addToEmails", AddToEmails);
        group.MapPut("/removeFromEmails", RemoveFromEmails);

        group.MapPut("/addToRelatedOpportunities", AddToRelatedOpportunities);
        group.MapPut("/removeFromRelatedOpportunities", RemoveFromRelatedOpportunities);


        return app;
    }

    private static async Task<IResult> Create(
        Case_Request request,
        ICase_Service service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToCase_(request);

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
        Case_Request request,
        ICase_Service service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToCase_(request);

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
        ICase_Service service,
        CancellationToken cancellationToken)
    {

        var case_ = await service.Get(identifier, cancellationToken);
        return case_ is null ? Results.NotFound() : Results.Ok(case_);
    }


    private static async Task<IResult> GetAll(
        ICase_Service service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(Case_Response.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ICase_Service service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOrganization(
        AssociationRequest request,
        ICase_Service service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignOrganization(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOrganization(
    AssociationRequest request,
    ICase_Service service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignOrganization(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignAccount(
        AssociationRequest request,
        ICase_Service service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignAccount(
    AssociationRequest request,
    ICase_Service service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignContact(
        AssociationRequest request,
        ICase_Service service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignContact(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignContact(
    AssociationRequest request,
    ICase_Service service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignContact(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOwner(
        AssociationRequest request,
        ICase_Service service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignOwner(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOwner(
    AssociationRequest request,
    ICase_Service service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignOwner(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignTeam(
        AssociationRequest request,
        ICase_Service service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignTeam(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignTeam(
    AssociationRequest request,
    ICase_Service service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignTeam(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToActivities(
        MultipleAssociationRequest request,
        ICase_Service service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToActivities(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromActivities(
        MultipleAssociationRequest request,
        ICase_Service service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromActivities(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToCaseComments(
        MultipleAssociationRequest request,
        ICase_Service service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToCaseComments(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromCaseComments(
        MultipleAssociationRequest request,
        ICase_Service service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromCaseComments(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToEmails(
        MultipleAssociationRequest request,
        ICase_Service service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToEmails(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromEmails(
        MultipleAssociationRequest request,
        ICase_Service service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromEmails(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToRelatedOpportunities(
        MultipleAssociationRequest request,
        ICase_Service service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToRelatedOpportunities(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromRelatedOpportunities(
        MultipleAssociationRequest request,
        ICase_Service service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromRelatedOpportunities(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static Case_ mapRequestToCase_(Case_Request request)
    {
        var model = new Case_
        {
            Id = request.Id,
            CaseNumber = request.CaseNumber,
            Subject = request.Subject,
            Description = request.Description,
            SlaDue = request.SlaDue,
            Status = request.Status,
            Priority = request.Priority,
            Origin = request.Origin,
            Severity = request.Severity,
        };
        return model;
    }

}
