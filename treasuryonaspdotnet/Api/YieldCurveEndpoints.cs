
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class YieldCurveEndpoints
{
    public static IEndpointRouteBuilder MapYieldCurveEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/yieldCurve").WithTags("YieldCurves");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignMarketDataSet", AssignMarketDataSet);
        group.MapPut("/unassignMarketDataSet", UnassignMarketDataSet);

        group.MapPut("/addToQuotes", AddToQuotes);
        group.MapPut("/removeFromQuotes", RemoveFromQuotes);


        return app;
    }

    private static async Task<IResult> Create(
        YieldCurveRequest request,
        IYieldCurveService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToYieldCurve(request);

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
        YieldCurveRequest request,
        IYieldCurveService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToYieldCurve(request);

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
        IYieldCurveService service,
        CancellationToken cancellationToken)
    {

        var yieldCurve = await service.Get(identifier, cancellationToken);
        return yieldCurve is null ? Results.NotFound() : Results.Ok(yieldCurve);
    }


    private static async Task<IResult> GetAll(
        IYieldCurveService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(YieldCurveResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IYieldCurveService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignMarketDataSet(
        AssociationRequest request,
        IYieldCurveService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignMarketDataSet(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignMarketDataSet(
    AssociationRequest request,
    IYieldCurveService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignMarketDataSet(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToQuotes(
        MultipleAssociationRequest request,
        IYieldCurveService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToQuotes(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromQuotes(
        MultipleAssociationRequest request,
        IYieldCurveService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromQuotes(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static YieldCurve mapRequestToYieldCurve(YieldCurveRequest request)
    {
        var model = new YieldCurve
        {
            Id = request.Id,
            Currency = request.Currency,
            BuildMethod = request.BuildMethod,
            CurveType = request.CurveType,
            DayCount = request.DayCount,
        };
        return model;
    }

}
