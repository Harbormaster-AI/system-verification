
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class HedgeRelationshipEndpoints
{
    public static IEndpointRouteBuilder MapHedgeRelationshipEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/hedgeRelationship").WithTags("HedgeRelationships");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignHedgedItem", AssignHedgedItem);
        group.MapPut("/unassignHedgedItem", UnassignHedgedItem);
        group.MapPut("/assignHedgingInstrument", AssignHedgingInstrument);
        group.MapPut("/unassignHedgingInstrument", UnassignHedgingInstrument);

        group.MapPut("/addToAccountingEntries", AddToAccountingEntries);
        group.MapPut("/removeFromAccountingEntries", RemoveFromAccountingEntries);


        return app;
    }

    private static async Task<IResult> Create(
        HedgeRelationshipRequest request,
        IHedgeRelationshipService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToHedgeRelationship(request);

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
        HedgeRelationshipRequest request,
        IHedgeRelationshipService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToHedgeRelationship(request);

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
        IHedgeRelationshipService service,
        CancellationToken cancellationToken)
    {

        var hedgeRelationship = await service.Get(identifier, cancellationToken);
        return hedgeRelationship is null ? Results.NotFound() : Results.Ok(hedgeRelationship);
    }


    private static async Task<IResult> GetAll(
        IHedgeRelationshipService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(HedgeRelationshipResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IHedgeRelationshipService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignHedgedItem(
        AssociationRequest request,
        IHedgeRelationshipService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignHedgedItem(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignHedgedItem(
    AssociationRequest request,
    IHedgeRelationshipService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignHedgedItem(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignHedgingInstrument(
        AssociationRequest request,
        IHedgeRelationshipService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignHedgingInstrument(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignHedgingInstrument(
    AssociationRequest request,
    IHedgeRelationshipService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignHedgingInstrument(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToAccountingEntries(
        MultipleAssociationRequest request,
        IHedgeRelationshipService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToAccountingEntries(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromAccountingEntries(
        MultipleAssociationRequest request,
        IHedgeRelationshipService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromAccountingEntries(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static HedgeRelationship mapRequestToHedgeRelationship(HedgeRelationshipRequest request)
    {
        var model = new HedgeRelationship
        {
            Id = request.Id,
            Name = request.Name,
            Objective = request.Objective,
            DesignationStatus = request.DesignationStatus,
        };
        return model;
    }

}
