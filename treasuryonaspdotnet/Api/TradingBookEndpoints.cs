
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class TradingBookEndpoints
{
    public static IEndpointRouteBuilder MapTradingBookEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/tradingBook").WithTags("TradingBooks");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignTreasuryUnit", AssignTreasuryUnit);
        group.MapPut("/unassignTreasuryUnit", UnassignTreasuryUnit);

        group.MapPut("/addToPortfolios", AddToPortfolios);
        group.MapPut("/removeFromPortfolios", RemoveFromPortfolios);

        group.MapPut("/addToLimits", AddToLimits);
        group.MapPut("/removeFromLimits", RemoveFromLimits);

        group.MapPut("/addToTrades", AddToTrades);
        group.MapPut("/removeFromTrades", RemoveFromTrades);


        return app;
    }

    private static async Task<IResult> Create(
        TradingBookRequest request,
        ITradingBookService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToTradingBook(request);

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
        TradingBookRequest request,
        ITradingBookService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToTradingBook(request);

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
        ITradingBookService service,
        CancellationToken cancellationToken)
    {

        var tradingBook = await service.Get(identifier, cancellationToken);
        return tradingBook is null ? Results.NotFound() : Results.Ok(tradingBook);
    }


    private static async Task<IResult> GetAll(
        ITradingBookService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(TradingBookResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ITradingBookService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignTreasuryUnit(
        AssociationRequest request,
        ITradingBookService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignTreasuryUnit(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignTreasuryUnit(
    AssociationRequest request,
    ITradingBookService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignTreasuryUnit(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToPortfolios(
        MultipleAssociationRequest request,
        ITradingBookService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToPortfolios(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromPortfolios(
        MultipleAssociationRequest request,
        ITradingBookService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromPortfolios(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToLimits(
        MultipleAssociationRequest request,
        ITradingBookService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToLimits(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromLimits(
        MultipleAssociationRequest request,
        ITradingBookService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromLimits(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToTrades(
        MultipleAssociationRequest request,
        ITradingBookService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToTrades(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromTrades(
        MultipleAssociationRequest request,
        ITradingBookService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromTrades(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static TradingBook mapRequestToTradingBook(TradingBookRequest request)
    {
        var model = new TradingBook
        {
            Id = request.Id,
            Name = request.Name,
            BookCategory = request.BookCategory,
        };
        return model;
    }

}
