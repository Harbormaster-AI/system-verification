
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class InternalDealEndpoints
{
    public static IEndpointRouteBuilder MapInternalDealEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/internalDeal").WithTags("InternalDeals");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignTransferPricingRule", AssignTransferPricingRule);
        group.MapPut("/unassignTransferPricingRule", UnassignTransferPricingRule);
        group.MapPut("/assignFromUnit", AssignFromUnit);
        group.MapPut("/unassignFromUnit", UnassignFromUnit);
        group.MapPut("/assignToUnit", AssignToUnit);
        group.MapPut("/unassignToUnit", UnassignToUnit);
        group.MapPut("/assignPortfolio", AssignPortfolio);
        group.MapPut("/unassignPortfolio", UnassignPortfolio);

        group.MapPut("/addToCashFlows", AddToCashFlows);
        group.MapPut("/removeFromCashFlows", RemoveFromCashFlows);


        return app;
    }

    private static async Task<IResult> Create(
        InternalDealRequest request,
        IInternalDealService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToInternalDeal(request);

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
        InternalDealRequest request,
        IInternalDealService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToInternalDeal(request);

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
        IInternalDealService service,
        CancellationToken cancellationToken)
    {

        var internalDeal = await service.Get(identifier, cancellationToken);
        return internalDeal is null ? Results.NotFound() : Results.Ok(internalDeal);
    }


    private static async Task<IResult> GetAll(
        IInternalDealService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(InternalDealResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IInternalDealService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignTransferPricingRule(
        AssociationRequest request,
        IInternalDealService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignTransferPricingRule(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignTransferPricingRule(
    AssociationRequest request,
    IInternalDealService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignTransferPricingRule(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignFromUnit(
        AssociationRequest request,
        IInternalDealService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignFromUnit(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignFromUnit(
    AssociationRequest request,
    IInternalDealService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignFromUnit(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignToUnit(
        AssociationRequest request,
        IInternalDealService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignToUnit(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignToUnit(
    AssociationRequest request,
    IInternalDealService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignToUnit(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignPortfolio(
        AssociationRequest request,
        IInternalDealService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignPortfolio(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignPortfolio(
    AssociationRequest request,
    IInternalDealService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignPortfolio(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToCashFlows(
        MultipleAssociationRequest request,
        IInternalDealService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToCashFlows(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromCashFlows(
        MultipleAssociationRequest request,
        IInternalDealService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromCashFlows(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static InternalDeal mapRequestToInternalDeal(InternalDealRequest request)
    {
        var model = new InternalDeal
        {
            Id = request.Id,
            DealNumber = request.DealNumber,
            TradeDate = request.TradeDate,
            ValueDate = request.ValueDate,
            MaturityDate = request.MaturityDate,
            Rate = request.Rate,
            Notional = request.Notional,
            Product = request.Product,
            Side = request.Side,
            Status = request.Status,
        };
        return model;
    }

}
