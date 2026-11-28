
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class LiquidityBufferEndpoints
{
    public static IEndpointRouteBuilder MapLiquidityBufferEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/liquidityBuffer").WithTags("LiquidityBuffers");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignPortfolio", AssignPortfolio);
        group.MapPut("/unassignPortfolio", UnassignPortfolio);

        group.MapPut("/addToAssets", AddToAssets);
        group.MapPut("/removeFromAssets", RemoveFromAssets);

        group.MapPut("/addToRegulatoryMetrics", AddToRegulatoryMetrics);
        group.MapPut("/removeFromRegulatoryMetrics", RemoveFromRegulatoryMetrics);


        return app;
    }

    private static async Task<IResult> Create(
        LiquidityBufferRequest request,
        ILiquidityBufferService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToLiquidityBuffer(request);

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
        LiquidityBufferRequest request,
        ILiquidityBufferService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToLiquidityBuffer(request);

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
        ILiquidityBufferService service,
        CancellationToken cancellationToken)
    {

        var liquidityBuffer = await service.Get(identifier, cancellationToken);
        return liquidityBuffer is null ? Results.NotFound() : Results.Ok(liquidityBuffer);
    }


    private static async Task<IResult> GetAll(
        ILiquidityBufferService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(LiquidityBufferResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ILiquidityBufferService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignPortfolio(
        AssociationRequest request,
        ILiquidityBufferService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignPortfolio(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignPortfolio(
    AssociationRequest request,
    ILiquidityBufferService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignPortfolio(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToAssets(
        MultipleAssociationRequest request,
        ILiquidityBufferService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToAssets(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromAssets(
        MultipleAssociationRequest request,
        ILiquidityBufferService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromAssets(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToRegulatoryMetrics(
        MultipleAssociationRequest request,
        ILiquidityBufferService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToRegulatoryMetrics(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromRegulatoryMetrics(
        MultipleAssociationRequest request,
        ILiquidityBufferService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromRegulatoryMetrics(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static LiquidityBuffer mapRequestToLiquidityBuffer(LiquidityBufferRequest request)
    {
        var model = new LiquidityBuffer
        {
            Id = request.Id,
            Name = request.Name,
            MarketValue = request.MarketValue,
            HqlaClass = request.HqlaClass,
        };
        return model;
    }

}
