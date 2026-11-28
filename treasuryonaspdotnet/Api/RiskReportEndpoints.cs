
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class RiskReportEndpoints
{
    public static IEndpointRouteBuilder MapRiskReportEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/riskReport").WithTags("RiskReports");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignPortfolio", AssignPortfolio);
        group.MapPut("/unassignPortfolio", UnassignPortfolio);

    group.MapPut("/addToPositions", AddToPositions);
    group.MapPut("/removeFromPositions", RemoveFromPositions);

    group.MapPut("/addToRegulatoryMetrics", AddToRegulatoryMetrics);
    group.MapPut("/removeFromRegulatoryMetrics", RemoveFromRegulatoryMetrics);


        return app;
    }

    private static async Task<IResult> Create(
        RiskReportRequest request,
        IRiskReportService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToRiskReport( request );

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
        RiskReportRequest request,
        IRiskReportService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToRiskReport( request );

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
        IRiskReportService service,
        CancellationToken cancellationToken) {

        var riskReport = await service.Get(identifier, cancellationToken);
        return riskReport is null ? Results.NotFound() : Results.Ok( riskReport );
    }


    private static async Task<IResult> GetAll(
        IRiskReportService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( RiskReportResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IRiskReportService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignPortfolio(
        AssociationRequest request,
        IRiskReportService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignPortfolio(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignPortfolio(
    AssociationRequest request,
    IRiskReportService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignPortfolio(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToPositions(
        MultipleAssociationRequest request,
        IRiskReportService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToPositions(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromPositions(
        MultipleAssociationRequest request,
        IRiskReportService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromPositions(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToRegulatoryMetrics(
        MultipleAssociationRequest request,
        IRiskReportService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToRegulatoryMetrics(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromRegulatoryMetrics(
        MultipleAssociationRequest request,
        IRiskReportService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromRegulatoryMetrics(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static RiskReport mapRequestToRiskReport( RiskReportRequest request ) {
        var model = new RiskReport
        {
            Id = request.Id,
            ReportDate = request.ReportDate,
            ReportType = request.ReportType,
            Status = request.Status,
        };
        return model;
    }

}
