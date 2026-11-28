
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class TreasuryPolicyEndpoints
{
    public static IEndpointRouteBuilder MapTreasuryPolicyEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/treasuryPolicy").WithTags("TreasuryPolicys");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignTreasuryUnit", AssignTreasuryUnit);
        group.MapPut("/unassignTreasuryUnit", UnassignTreasuryUnit);

    group.MapPut("/addToLimits", AddToLimits);
    group.MapPut("/removeFromLimits", RemoveFromLimits);

    group.MapPut("/addToApprovals", AddToApprovals);
    group.MapPut("/removeFromApprovals", RemoveFromApprovals);


        return app;
    }

    private static async Task<IResult> Create(
        TreasuryPolicyRequest request,
        ITreasuryPolicyService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToTreasuryPolicy( request );

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
        TreasuryPolicyRequest request,
        ITreasuryPolicyService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToTreasuryPolicy( request );

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
        ITreasuryPolicyService service,
        CancellationToken cancellationToken) {

        var treasuryPolicy = await service.Get(identifier, cancellationToken);
        return treasuryPolicy is null ? Results.NotFound() : Results.Ok( treasuryPolicy );
    }


    private static async Task<IResult> GetAll(
        ITreasuryPolicyService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( TreasuryPolicyResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ITreasuryPolicyService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignTreasuryUnit(
        AssociationRequest request,
        ITreasuryPolicyService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignTreasuryUnit(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignTreasuryUnit(
    AssociationRequest request,
    ITreasuryPolicyService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignTreasuryUnit(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToLimits(
        MultipleAssociationRequest request,
        ITreasuryPolicyService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToLimits(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromLimits(
        MultipleAssociationRequest request,
        ITreasuryPolicyService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromLimits(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToApprovals(
        MultipleAssociationRequest request,
        ITreasuryPolicyService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToApprovals(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromApprovals(
        MultipleAssociationRequest request,
        ITreasuryPolicyService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromApprovals(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static TreasuryPolicy mapRequestToTreasuryPolicy( TreasuryPolicyRequest request ) {
        var model = new TreasuryPolicy
        {
            Id = request.Id,
            Name = request.Name,
            Version = request.Version,
            EffectiveFrom = request.EffectiveFrom,
            Area = request.Area,
        };
        return model;
    }

}
