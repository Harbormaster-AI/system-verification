
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class FXRateEndpoints
{
    public static IEndpointRouteBuilder MapFXRateEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/fXRate").WithTags("FXRates");

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
        FXRateRequest request,
        IFXRateService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToFXRate( request );

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
        FXRateRequest request,
        IFXRateService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToFXRate( request );

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
        IFXRateService service,
        CancellationToken cancellationToken) {

        var fXRate = await service.Get(identifier, cancellationToken);
        return fXRate is null ? Results.NotFound() : Results.Ok( fXRate );
    }


    private static async Task<IResult> GetAll(
        IFXRateService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( FXRateResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IFXRateService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignMarketDataSet(
        AssociationRequest request,
        IFXRateService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignMarketDataSet(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignMarketDataSet(
    AssociationRequest request,
    IFXRateService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignMarketDataSet(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static FXRate mapRequestToFXRate( FXRateRequest request ) {
        var model = new FXRate
        {
            Id = request.Id,
            BaseCurrency = request.BaseCurrency,
            QuoteCurrency = request.QuoteCurrency,
            Rate = request.Rate,
        };
        return model;
    }

}
