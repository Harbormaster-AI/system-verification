
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class TransferPricingRuleEndpoints
{
    public static IEndpointRouteBuilder MapTransferPricingRuleEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/transferPricingRule").WithTags("TransferPricingRules");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignTreasuryUnit", AssignTreasuryUnit);
        group.MapPut("/unassignTreasuryUnit", UnassignTreasuryUnit);

        group.MapPut("/addToAppliedDeals", AddToAppliedDeals);
        group.MapPut("/removeFromAppliedDeals", RemoveFromAppliedDeals);


        return app;
    }

    private static async Task<IResult> Create(
        TransferPricingRuleRequest request,
        ITransferPricingRuleService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToTransferPricingRule(request);

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
        TransferPricingRuleRequest request,
        ITransferPricingRuleService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToTransferPricingRule(request);

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
        ITransferPricingRuleService service,
        CancellationToken cancellationToken)
    {

        var transferPricingRule = await service.Get(identifier, cancellationToken);
        return transferPricingRule is null ? Results.NotFound() : Results.Ok(transferPricingRule);
    }


    private static async Task<IResult> GetAll(
        ITransferPricingRuleService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(TransferPricingRuleResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ITransferPricingRuleService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignTreasuryUnit(
        AssociationRequest request,
        ITransferPricingRuleService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignTreasuryUnit(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignTreasuryUnit(
    AssociationRequest request,
    ITransferPricingRuleService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignTreasuryUnit(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToAppliedDeals(
        MultipleAssociationRequest request,
        ITransferPricingRuleService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToAppliedDeals(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromAppliedDeals(
        MultipleAssociationRequest request,
        ITransferPricingRuleService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromAppliedDeals(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static TransferPricingRule mapRequestToTransferPricingRule(TransferPricingRuleRequest request)
    {
        var model = new TransferPricingRule
        {
            Id = request.Id,
            Name = request.Name,
            Spread = request.Spread,
            EffectiveFrom = request.EffectiveFrom,
            Method = request.Method,
            CurveType = request.CurveType,
        };
        return model;
    }

}
