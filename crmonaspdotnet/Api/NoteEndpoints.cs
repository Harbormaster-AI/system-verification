
using crmonaspdotnet.Service;
using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Api;

public static class NoteEndpoints
{
    public static IEndpointRouteBuilder MapNoteEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/note").WithTags("Notes");

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
        group.MapPut("/assignOpportunity", AssignOpportunity);
        group.MapPut("/unassignOpportunity", UnassignOpportunity);
        group.MapPut("/assignCase_", AssignCase_);
        group.MapPut("/unassignCase_", UnassignCase_);
        group.MapPut("/assignLead", AssignLead);
        group.MapPut("/unassignLead", UnassignLead);


        return app;
    }

    private static async Task<IResult> Create(
        NoteRequest request,
        INoteService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToNote(request);

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
        NoteRequest request,
        INoteService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToNote(request);

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
        INoteService service,
        CancellationToken cancellationToken)
    {

        var note = await service.Get(identifier, cancellationToken);
        return note is null ? Results.NotFound() : Results.Ok(note);
    }


    private static async Task<IResult> GetAll(
        INoteService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(NoteResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        INoteService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOrganization(
        AssociationRequest request,
        INoteService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignOrganization(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOrganization(
    AssociationRequest request,
    INoteService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignOrganization(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOwner(
        AssociationRequest request,
        INoteService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignOwner(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOwner(
    AssociationRequest request,
    INoteService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignOwner(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignAccount(
        AssociationRequest request,
        INoteService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignAccount(
    AssociationRequest request,
    INoteService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignContact(
        AssociationRequest request,
        INoteService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignContact(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignContact(
    AssociationRequest request,
    INoteService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignContact(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOpportunity(
        AssociationRequest request,
        INoteService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignOpportunity(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOpportunity(
    AssociationRequest request,
    INoteService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignOpportunity(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignCase_(
        AssociationRequest request,
        INoteService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignCase_(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignCase_(
    AssociationRequest request,
    INoteService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignCase_(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignLead(
        AssociationRequest request,
        INoteService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignLead(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignLead(
    AssociationRequest request,
    INoteService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignLead(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static Note mapRequestToNote(NoteRequest request)
    {
        var model = new Note
        {
            Id = request.Id,
            Title = request.Title,
            Content = request.Content,
            CreatedAt = request.CreatedAt,
            UpdatedAt = request.UpdatedAt,
        };
        return model;
    }

}
