
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class PortfolioEndpoints
{
    public static IEndpointRouteBuilder MapPortfolioEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/portfolio").WithTags("Portfolios");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignTradingBook", AssignTradingBook);
        group.MapPut("/unassignTradingBook", UnassignTradingBook);

    group.MapPut("/addToPositions", AddToPositions);
    group.MapPut("/removeFromPositions", RemoveFromPositions);

    group.MapPut("/addToTrades", AddToTrades);
    group.MapPut("/removeFromTrades", RemoveFromTrades);

    group.MapPut("/addToRiskReports", AddToRiskReports);
    group.MapPut("/removeFromRiskReports", RemoveFromRiskReports);

    group.MapPut("/addToRiskLimits", AddToRiskLimits);
    group.MapPut("/removeFromRiskLimits", RemoveFromRiskLimits);

    group.MapPut("/addToLiquidityBuffers", AddToLiquidityBuffers);
    group.MapPut("/removeFromLiquidityBuffers", RemoveFromLiquidityBuffers);


        return app;
    }

    private static async Task<IResult> Create(
        PortfolioRequest request,
        IPortfolioService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToPortfolio( request );

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
        PortfolioRequest request,
        IPortfolioService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToPortfolio( request );

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
        IPortfolioService service,
        CancellationToken cancellationToken) {

        var portfolio = await service.Get(identifier, cancellationToken);
        return portfolio is null ? Results.NotFound() : Results.Ok( portfolio );
    }


    private static async Task<IResult> GetAll(
        IPortfolioService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( PortfolioResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IPortfolioService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignTradingBook(
        AssociationRequest request,
        IPortfolioService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignTradingBook(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignTradingBook(
    AssociationRequest request,
    IPortfolioService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignTradingBook(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToPositions(
        MultipleAssociationRequest request,
        IPortfolioService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToPositions(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromPositions(
        MultipleAssociationRequest request,
        IPortfolioService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromPositions(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToTrades(
        MultipleAssociationRequest request,
        IPortfolioService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToTrades(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromTrades(
        MultipleAssociationRequest request,
        IPortfolioService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromTrades(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToRiskReports(
        MultipleAssociationRequest request,
        IPortfolioService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToRiskReports(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromRiskReports(
        MultipleAssociationRequest request,
        IPortfolioService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromRiskReports(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToRiskLimits(
        MultipleAssociationRequest request,
        IPortfolioService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToRiskLimits(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromRiskLimits(
        MultipleAssociationRequest request,
        IPortfolioService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromRiskLimits(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToLiquidityBuffers(
        MultipleAssociationRequest request,
        IPortfolioService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToLiquidityBuffers(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromLiquidityBuffers(
        MultipleAssociationRequest request,
        IPortfolioService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromLiquidityBuffers(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static Portfolio mapRequestToPortfolio( PortfolioRequest request ) {
        var model = new Portfolio
        {
            Id = request.Id,
            Name = request.Name,
            Strategy = request.Strategy,
            BaseCurrency = request.BaseCurrency,
        };
        return model;
    }

}
