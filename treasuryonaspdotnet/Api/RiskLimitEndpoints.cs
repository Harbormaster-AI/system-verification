
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class RiskLimitEndpoints
{
    public static IEndpointRouteBuilder MapRiskLimitEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/riskLimit").WithTags("RiskLimits");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignPortfolio", AssignPortfolio);
        group.MapPut("/unassignPortfolio", UnassignPortfolio);
        group.MapPut("/assignCounterparty", AssignCounterparty);
        group.MapPut("/unassignCounterparty", UnassignCounterparty);
        group.MapPut("/assignPolicy", AssignPolicy);
        group.MapPut("/unassignPolicy", UnassignPolicy);

        group.MapPut("/addToBreaches", AddToBreaches);
        group.MapPut("/removeFromBreaches", RemoveFromBreaches);

        group.MapPut("/addToApprovals", AddToApprovals);
        group.MapPut("/removeFromApprovals", RemoveFromApprovals);


        return app;
    }

    private static async Task<IResult> Create(
        RiskLimitRequest request,
        IRiskLimitService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToRiskLimit(request);

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
        RiskLimitRequest request,
        IRiskLimitService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToRiskLimit(request);

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
        IRiskLimitService service,
        CancellationToken cancellationToken)
    {

        var riskLimit = await service.Get(identifier, cancellationToken);
        return riskLimit is null ? Results.NotFound() : Results.Ok(riskLimit);
    }


    private static async Task<IResult> GetAll(
        IRiskLimitService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(RiskLimitResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IRiskLimitService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignPortfolio(
        AssociationRequest request,
        IRiskLimitService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignPortfolio(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignPortfolio(
    AssociationRequest request,
    IRiskLimitService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignPortfolio(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignCounterparty(
        AssociationRequest request,
        IRiskLimitService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignCounterparty(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignCounterparty(
    AssociationRequest request,
    IRiskLimitService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignCounterparty(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignPolicy(
        AssociationRequest request,
        IRiskLimitService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignPolicy(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignPolicy(
    AssociationRequest request,
    IRiskLimitService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignPolicy(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToBreaches(
        MultipleAssociationRequest request,
        IRiskLimitService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToBreaches(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromBreaches(
        MultipleAssociationRequest request,
        IRiskLimitService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromBreaches(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToApprovals(
        MultipleAssociationRequest request,
        IRiskLimitService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToApprovals(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromApprovals(
        MultipleAssociationRequest request,
        IRiskLimitService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromApprovals(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static RiskLimit mapRequestToRiskLimit(RiskLimitRequest request)
    {
        var model = new RiskLimit
        {
            Id = request.Id,
            Name = request.Name,
            Threshold = request.Threshold,
            Currency = request.Currency,
            EffectiveDate = request.EffectiveDate,
            LimitType = request.LimitType,
            Measure = request.Measure,
        };
        return model;
    }

}
