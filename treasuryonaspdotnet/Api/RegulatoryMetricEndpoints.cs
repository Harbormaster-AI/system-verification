
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class RegulatoryMetricEndpoints
{
    public static IEndpointRouteBuilder MapRegulatoryMetricEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/regulatoryMetric").WithTags("RegulatoryMetrics");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignRiskReport", AssignRiskReport);
        group.MapPut("/unassignRiskReport", UnassignRiskReport);
        group.MapPut("/assignLiquidityBuffer", AssignLiquidityBuffer);
        group.MapPut("/unassignLiquidityBuffer", UnassignLiquidityBuffer);


        return app;
    }

    private static async Task<IResult> Create(
        RegulatoryMetricRequest request,
        IRegulatoryMetricService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToRegulatoryMetric( request );

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
        RegulatoryMetricRequest request,
        IRegulatoryMetricService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToRegulatoryMetric( request );

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
        IRegulatoryMetricService service,
        CancellationToken cancellationToken) {

        var regulatoryMetric = await service.Get(identifier, cancellationToken);
        return regulatoryMetric is null ? Results.NotFound() : Results.Ok( regulatoryMetric );
    }


    private static async Task<IResult> GetAll(
        IRegulatoryMetricService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( RegulatoryMetricResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IRegulatoryMetricService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignRiskReport(
        AssociationRequest request,
        IRegulatoryMetricService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignRiskReport(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignRiskReport(
    AssociationRequest request,
    IRegulatoryMetricService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignRiskReport(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignLiquidityBuffer(
        AssociationRequest request,
        IRegulatoryMetricService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignLiquidityBuffer(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignLiquidityBuffer(
    AssociationRequest request,
    IRegulatoryMetricService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignLiquidityBuffer(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static RegulatoryMetric mapRequestToRegulatoryMetric( RegulatoryMetricRequest request ) {
        var model = new RegulatoryMetric
        {
            Id = request.Id,
            Value = request.Value,
            Currency = request.Currency,
            MetricType = request.MetricType,
            Horizon = request.Horizon,
        };
        return model;
    }

}
