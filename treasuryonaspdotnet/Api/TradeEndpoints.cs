
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class TradeEndpoints
{
    public static IEndpointRouteBuilder MapTradeEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/trade").WithTags("Trades");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignCounterparty", AssignCounterparty);
        group.MapPut("/unassignCounterparty", UnassignCounterparty);
        group.MapPut("/assignPortfolio", AssignPortfolio);
        group.MapPut("/unassignPortfolio", UnassignPortfolio);
        group.MapPut("/assignSettlementInstruction", AssignSettlementInstruction);
        group.MapPut("/unassignSettlementInstruction", UnassignSettlementInstruction);
        group.MapPut("/assignCollateralAccount", AssignCollateralAccount);
        group.MapPut("/unassignCollateralAccount", UnassignCollateralAccount);
        group.MapPut("/assignHedgeRelationship", AssignHedgeRelationship);
        group.MapPut("/unassignHedgeRelationship", UnassignHedgeRelationship);

        group.MapPut("/addToCashFlows", AddToCashFlows);
        group.MapPut("/removeFromCashFlows", RemoveFromCashFlows);


        return app;
    }

    private static async Task<IResult> Create(
        TradeRequest request,
        ITradeService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToTrade(request);

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
        TradeRequest request,
        ITradeService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToTrade(request);

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
        ITradeService service,
        CancellationToken cancellationToken)
    {

        var trade = await service.Get(identifier, cancellationToken);
        return trade is null ? Results.NotFound() : Results.Ok(trade);
    }


    private static async Task<IResult> GetAll(
        ITradeService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(TradeResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ITradeService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignCounterparty(
        AssociationRequest request,
        ITradeService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignCounterparty(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignCounterparty(
    AssociationRequest request,
    ITradeService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignCounterparty(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignPortfolio(
        AssociationRequest request,
        ITradeService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignPortfolio(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignPortfolio(
    AssociationRequest request,
    ITradeService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignPortfolio(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignSettlementInstruction(
        AssociationRequest request,
        ITradeService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignSettlementInstruction(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignSettlementInstruction(
    AssociationRequest request,
    ITradeService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignSettlementInstruction(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignCollateralAccount(
        AssociationRequest request,
        ITradeService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignCollateralAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignCollateralAccount(
    AssociationRequest request,
    ITradeService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignCollateralAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignHedgeRelationship(
        AssociationRequest request,
        ITradeService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignHedgeRelationship(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignHedgeRelationship(
    AssociationRequest request,
    ITradeService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignHedgeRelationship(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToCashFlows(
        MultipleAssociationRequest request,
        ITradeService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToCashFlows(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromCashFlows(
        MultipleAssociationRequest request,
        ITradeService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromCashFlows(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static Trade mapRequestToTrade(TradeRequest request)
    {
        var model = new Trade
        {
            Id = request.Id,
            TradeNumber = request.TradeNumber,
            TradeDate = request.TradeDate,
            ValueDate = request.ValueDate,
            MaturityDate = request.MaturityDate,
            Notional = request.Notional,
            FixedRate = request.FixedRate,
            InstrumentType = request.InstrumentType,
            Side = request.Side,
            Status = request.Status,
            ClearingStatus = request.ClearingStatus,
        };
        return model;
    }

}
