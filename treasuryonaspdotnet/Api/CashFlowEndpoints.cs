
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class CashFlowEndpoints
{
    public static IEndpointRouteBuilder MapCashFlowEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/cashFlow").WithTags("CashFlows");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignTrade", AssignTrade);
        group.MapPut("/unassignTrade", UnassignTrade);
        group.MapPut("/assignCashPosition", AssignCashPosition);
        group.MapPut("/unassignCashPosition", UnassignCashPosition);
        group.MapPut("/assignMarginCall", AssignMarginCall);
        group.MapPut("/unassignMarginCall", UnassignMarginCall);
        group.MapPut("/assignBankAccount", AssignBankAccount);
        group.MapPut("/unassignBankAccount", UnassignBankAccount);


        return app;
    }

    private static async Task<IResult> Create(
        CashFlowRequest request,
        ICashFlowService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToCashFlow( request );

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
        CashFlowRequest request,
        ICashFlowService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToCashFlow( request );

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
        ICashFlowService service,
        CancellationToken cancellationToken) {

        var cashFlow = await service.Get(identifier, cancellationToken);
        return cashFlow is null ? Results.NotFound() : Results.Ok( cashFlow );
    }


    private static async Task<IResult> GetAll(
        ICashFlowService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( CashFlowResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ICashFlowService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignTrade(
        AssociationRequest request,
        ICashFlowService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignTrade(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignTrade(
    AssociationRequest request,
    ICashFlowService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignTrade(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignCashPosition(
        AssociationRequest request,
        ICashFlowService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignCashPosition(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignCashPosition(
    AssociationRequest request,
    ICashFlowService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignCashPosition(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignMarginCall(
        AssociationRequest request,
        ICashFlowService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignMarginCall(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignMarginCall(
    AssociationRequest request,
    ICashFlowService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignMarginCall(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignBankAccount(
        AssociationRequest request,
        ICashFlowService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignBankAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignBankAccount(
    AssociationRequest request,
    ICashFlowService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignBankAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static CashFlow mapRequestToCashFlow( CashFlowRequest request ) {
        var model = new CashFlow
        {
            Id = request.Id,
            FlowDate = request.FlowDate,
            Amount = request.Amount,
            Description = request.Description,
            FlowType = request.FlowType,
        };
        return model;
    }

}
