
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class LimitBreachEndpoints
{
    public static IEndpointRouteBuilder MapLimitBreachEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/limitBreach").WithTags("LimitBreachs");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignRiskLimit", AssignRiskLimit);
        group.MapPut("/unassignRiskLimit", UnassignRiskLimit);
        group.MapPut("/assignPortfolio", AssignPortfolio);
        group.MapPut("/unassignPortfolio", UnassignPortfolio);

    group.MapPut("/addToApprovals", AddToApprovals);
    group.MapPut("/removeFromApprovals", RemoveFromApprovals);


        return app;
    }

    private static async Task<IResult> Create(
        LimitBreachRequest request,
        ILimitBreachService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToLimitBreach( request );

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
        LimitBreachRequest request,
        ILimitBreachService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToLimitBreach( request );

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
        ILimitBreachService service,
        CancellationToken cancellationToken) {

        var limitBreach = await service.Get(identifier, cancellationToken);
        return limitBreach is null ? Results.NotFound() : Results.Ok( limitBreach );
    }


    private static async Task<IResult> GetAll(
        ILimitBreachService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( LimitBreachResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ILimitBreachService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignRiskLimit(
        AssociationRequest request,
        ILimitBreachService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignRiskLimit(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignRiskLimit(
    AssociationRequest request,
    ILimitBreachService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignRiskLimit(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignPortfolio(
        AssociationRequest request,
        ILimitBreachService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignPortfolio(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignPortfolio(
    AssociationRequest request,
    ILimitBreachService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignPortfolio(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToApprovals(
        MultipleAssociationRequest request,
        ILimitBreachService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToApprovals(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromApprovals(
        MultipleAssociationRequest request,
        ILimitBreachService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromApprovals(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static LimitBreach mapRequestToLimitBreach( LimitBreachRequest request ) {
        var model = new LimitBreach
        {
            Id = request.Id,
            BreachDate = request.BreachDate,
            ObservedValue = request.ObservedValue,
            Severity = request.Severity,
            Status = request.Status,
        };
        return model;
    }

}
