
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class MarketDataSetEndpoints
{
    public static IEndpointRouteBuilder MapMarketDataSetEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/marketDataSet").WithTags("MarketDataSets");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);


        group.MapPut("/addToYieldCurves", AddToYieldCurves);
        group.MapPut("/removeFromYieldCurves", RemoveFromYieldCurves);

        group.MapPut("/addToFxRates", AddToFxRates);
        group.MapPut("/removeFromFxRates", RemoveFromFxRates);

        group.MapPut("/addToVolSurfaces", AddToVolSurfaces);
        group.MapPut("/removeFromVolSurfaces", RemoveFromVolSurfaces);

        group.MapPut("/addToStressScenarios", AddToStressScenarios);
        group.MapPut("/removeFromStressScenarios", RemoveFromStressScenarios);


        return app;
    }

    private static async Task<IResult> Create(
        MarketDataSetRequest request,
        IMarketDataSetService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToMarketDataSet(request);

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
        MarketDataSetRequest request,
        IMarketDataSetService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToMarketDataSet(request);

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
        IMarketDataSetService service,
        CancellationToken cancellationToken)
    {

        var marketDataSet = await service.Get(identifier, cancellationToken);
        return marketDataSet is null ? Results.NotFound() : Results.Ok(marketDataSet);
    }


    private static async Task<IResult> GetAll(
        IMarketDataSetService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(MarketDataSetResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IMarketDataSetService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToYieldCurves(
        MultipleAssociationRequest request,
        IMarketDataSetService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToYieldCurves(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromYieldCurves(
        MultipleAssociationRequest request,
        IMarketDataSetService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromYieldCurves(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToFxRates(
        MultipleAssociationRequest request,
        IMarketDataSetService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToFxRates(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromFxRates(
        MultipleAssociationRequest request,
        IMarketDataSetService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromFxRates(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToVolSurfaces(
        MultipleAssociationRequest request,
        IMarketDataSetService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToVolSurfaces(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromVolSurfaces(
        MultipleAssociationRequest request,
        IMarketDataSetService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromVolSurfaces(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToStressScenarios(
        MultipleAssociationRequest request,
        IMarketDataSetService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToStressScenarios(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromStressScenarios(
        MultipleAssociationRequest request,
        IMarketDataSetService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromStressScenarios(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static MarketDataSet mapRequestToMarketDataSet(MarketDataSetRequest request)
    {
        var model = new MarketDataSet
        {
            Id = request.Id,
            Name = request.Name,
            ValuationDate = request.ValuationDate,
        };
        return model;
    }

}
