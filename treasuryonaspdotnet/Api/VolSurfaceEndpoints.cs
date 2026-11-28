
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class VolSurfaceEndpoints
{
    public static IEndpointRouteBuilder MapVolSurfaceEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/volSurface").WithTags("VolSurfaces");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignMarketDataSet", AssignMarketDataSet);
        group.MapPut("/unassignMarketDataSet", UnassignMarketDataSet);


        return app;
    }

    private static async Task<IResult> Create(
        VolSurfaceRequest request,
        IVolSurfaceService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToVolSurface(request);

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
        VolSurfaceRequest request,
        IVolSurfaceService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToVolSurface(request);

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
        IVolSurfaceService service,
        CancellationToken cancellationToken)
    {

        var volSurface = await service.Get(identifier, cancellationToken);
        return volSurface is null ? Results.NotFound() : Results.Ok(volSurface);
    }


    private static async Task<IResult> GetAll(
        IVolSurfaceService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(VolSurfaceResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IVolSurfaceService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignMarketDataSet(
        AssociationRequest request,
        IVolSurfaceService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignMarketDataSet(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignMarketDataSet(
    AssociationRequest request,
    IVolSurfaceService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignMarketDataSet(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static VolSurface mapRequestToVolSurface(VolSurfaceRequest request)
    {
        var model = new VolSurface
        {
            Id = request.Id,
            AssetClass = request.AssetClass,
            Currency = request.Currency,
            Model = request.Model,
        };
        return model;
    }

}
