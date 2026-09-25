
using bankingonaspdotnet.Service;
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Api;

public static class FXTradeEndpoints
{
    public static IEndpointRouteBuilder MapFXTradeEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/fXTrade").WithTags("FXTrades");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignCustomer", AssignCustomer);
        group.MapPut("/unassignCustomer", UnassignCustomer);
        group.MapPut("/assignBank", AssignBank);
        group.MapPut("/unassignBank", UnassignBank);
        group.MapPut("/assignExchangeRate", AssignExchangeRate);
        group.MapPut("/unassignExchangeRate", UnassignExchangeRate);
        group.MapPut("/assignSourceAccount", AssignSourceAccount);
        group.MapPut("/unassignSourceAccount", UnassignSourceAccount);
        group.MapPut("/assignDestinationAccount", AssignDestinationAccount);
        group.MapPut("/unassignDestinationAccount", UnassignDestinationAccount);
        group.MapPut("/assignTransaction", AssignTransaction);
        group.MapPut("/unassignTransaction", UnassignTransaction);


        return app;
    }

    private static async Task<IResult> Create(
        FXTradeRequest request,
        IFXTradeService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToFXTrade( request );

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
        FXTradeRequest request,
        IFXTradeService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToFXTrade( request );

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
        IFXTradeService service,
        CancellationToken cancellationToken) {

        var fXTrade = await service.Get(identifier, cancellationToken);
        return fXTrade is null ? Results.NotFound() : Results.Ok( fXTrade );
    }


    private static async Task<IResult> GetAll(
        IFXTradeService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( FXTradeResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IFXTradeService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignCustomer(
        AssociationRequest request,
        IFXTradeService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignCustomer(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignCustomer(
    AssociationRequest request,
    IFXTradeService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignCustomer(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignBank(
        AssociationRequest request,
        IFXTradeService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignBank(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignBank(
    AssociationRequest request,
    IFXTradeService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignBank(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignExchangeRate(
        AssociationRequest request,
        IFXTradeService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignExchangeRate(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignExchangeRate(
    AssociationRequest request,
    IFXTradeService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignExchangeRate(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignSourceAccount(
        AssociationRequest request,
        IFXTradeService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignSourceAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignSourceAccount(
    AssociationRequest request,
    IFXTradeService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignSourceAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignDestinationAccount(
        AssociationRequest request,
        IFXTradeService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignDestinationAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignDestinationAccount(
    AssociationRequest request,
    IFXTradeService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignDestinationAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignTransaction(
        AssociationRequest request,
        IFXTradeService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignTransaction(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignTransaction(
    AssociationRequest request,
    IFXTradeService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignTransaction(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static FXTrade mapRequestToFXTrade( FXTradeRequest request ) {
        var model = new FXTrade
        {
            Id = request.Id,
            TradeReference = request.TradeReference,
            TradeDate = request.TradeDate,
            SettlementDate = request.SettlementDate,
            AmountSold = request.AmountSold,
            AmountBought = request.AmountBought,
            Rate = request.Rate,
            Status = request.Status,
        };
        return model;
    }

}
