
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class CurveQuoteEndpoints
{
    public static IEndpointRouteBuilder MapCurveQuoteEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/curveQuote").WithTags("CurveQuotes");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignYieldCurve", AssignYieldCurve);
        group.MapPut("/unassignYieldCurve", UnassignYieldCurve);


        return app;
    }

    private static async Task<IResult> Create(
        CurveQuoteRequest request,
        ICurveQuoteService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToCurveQuote( request );

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
        CurveQuoteRequest request,
        ICurveQuoteService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToCurveQuote( request );

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
        ICurveQuoteService service,
        CancellationToken cancellationToken) {

        var curveQuote = await service.Get(identifier, cancellationToken);
        return curveQuote is null ? Results.NotFound() : Results.Ok( curveQuote );
    }


    private static async Task<IResult> GetAll(
        ICurveQuoteService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( CurveQuoteResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ICurveQuoteService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignYieldCurve(
        AssociationRequest request,
        ICurveQuoteService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignYieldCurve(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignYieldCurve(
    AssociationRequest request,
    ICurveQuoteService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignYieldCurve(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static CurveQuote mapRequestToCurveQuote( CurveQuoteRequest request ) {
        var model = new CurveQuote
        {
            Id = request.Id,
            Tenor = request.Tenor,
            Rate = request.Rate,
        };
        return model;
    }

}
