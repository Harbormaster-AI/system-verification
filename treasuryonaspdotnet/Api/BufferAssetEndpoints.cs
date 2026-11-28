
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class BufferAssetEndpoints
{
    public static IEndpointRouteBuilder MapBufferAssetEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/bufferAsset").WithTags("BufferAssets");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignLiquidityBuffer", AssignLiquidityBuffer);
        group.MapPut("/unassignLiquidityBuffer", UnassignLiquidityBuffer);
        group.MapPut("/assignPortfolio", AssignPortfolio);
        group.MapPut("/unassignPortfolio", UnassignPortfolio);


        return app;
    }

    private static async Task<IResult> Create(
        BufferAssetRequest request,
        IBufferAssetService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToBufferAsset(request);

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
        BufferAssetRequest request,
        IBufferAssetService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToBufferAsset(request);

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
        IBufferAssetService service,
        CancellationToken cancellationToken)
    {

        var bufferAsset = await service.Get(identifier, cancellationToken);
        return bufferAsset is null ? Results.NotFound() : Results.Ok(bufferAsset);
    }


    private static async Task<IResult> GetAll(
        IBufferAssetService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(BufferAssetResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IBufferAssetService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignLiquidityBuffer(
        AssociationRequest request,
        IBufferAssetService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignLiquidityBuffer(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignLiquidityBuffer(
    AssociationRequest request,
    IBufferAssetService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignLiquidityBuffer(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignPortfolio(
        AssociationRequest request,
        IBufferAssetService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignPortfolio(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignPortfolio(
    AssociationRequest request,
    IBufferAssetService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignPortfolio(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static BufferAsset mapRequestToBufferAsset(BufferAssetRequest request)
    {
        var model = new BufferAsset
        {
            Id = request.Id,
            SecurityName = request.SecurityName,
            Isin = request.Isin,
            MarketValue = request.MarketValue,
            HqlaClass = request.HqlaClass,
        };
        return model;
    }

}
