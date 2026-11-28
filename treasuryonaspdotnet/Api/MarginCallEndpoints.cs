
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class MarginCallEndpoints
{
    public static IEndpointRouteBuilder MapMarginCallEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/marginCall").WithTags("MarginCalls");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignCollateralAgreement", AssignCollateralAgreement);
        group.MapPut("/unassignCollateralAgreement", UnassignCollateralAgreement);
        group.MapPut("/assignCollateralAccount", AssignCollateralAccount);
        group.MapPut("/unassignCollateralAccount", UnassignCollateralAccount);
        group.MapPut("/assignCounterparty", AssignCounterparty);
        group.MapPut("/unassignCounterparty", UnassignCounterparty);

        group.MapPut("/addToCashFlows", AddToCashFlows);
        group.MapPut("/removeFromCashFlows", RemoveFromCashFlows);


        return app;
    }

    private static async Task<IResult> Create(
        MarginCallRequest request,
        IMarginCallService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToMarginCall(request);

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
        MarginCallRequest request,
        IMarginCallService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToMarginCall(request);

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
        IMarginCallService service,
        CancellationToken cancellationToken)
    {

        var marginCall = await service.Get(identifier, cancellationToken);
        return marginCall is null ? Results.NotFound() : Results.Ok(marginCall);
    }


    private static async Task<IResult> GetAll(
        IMarginCallService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(MarginCallResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IMarginCallService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignCollateralAgreement(
        AssociationRequest request,
        IMarginCallService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignCollateralAgreement(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignCollateralAgreement(
    AssociationRequest request,
    IMarginCallService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignCollateralAgreement(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignCollateralAccount(
        AssociationRequest request,
        IMarginCallService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignCollateralAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignCollateralAccount(
    AssociationRequest request,
    IMarginCallService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignCollateralAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignCounterparty(
        AssociationRequest request,
        IMarginCallService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignCounterparty(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignCounterparty(
    AssociationRequest request,
    IMarginCallService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignCounterparty(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToCashFlows(
        MultipleAssociationRequest request,
        IMarginCallService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToCashFlows(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromCashFlows(
        MultipleAssociationRequest request,
        IMarginCallService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromCashFlows(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static MarginCall mapRequestToMarginCall(MarginCallRequest request)
    {
        var model = new MarginCall
        {
            Id = request.Id,
            CallDate = request.CallDate,
            RequiredAmount = request.RequiredAmount,
            Direction = request.Direction,
            Status = request.Status,
        };
        return model;
    }

}
