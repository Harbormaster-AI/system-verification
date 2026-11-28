
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class CashPositionEndpoints
{
    public static IEndpointRouteBuilder MapCashPositionEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/cashPosition").WithTags("CashPositions");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignBankAccount", AssignBankAccount);
        group.MapPut("/unassignBankAccount", UnassignBankAccount);

        group.MapPut("/addToCashFlows", AddToCashFlows);
        group.MapPut("/removeFromCashFlows", RemoveFromCashFlows);


        return app;
    }

    private static async Task<IResult> Create(
        CashPositionRequest request,
        ICashPositionService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToCashPosition(request);

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
        CashPositionRequest request,
        ICashPositionService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToCashPosition(request);

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
        ICashPositionService service,
        CancellationToken cancellationToken)
    {

        var cashPosition = await service.Get(identifier, cancellationToken);
        return cashPosition is null ? Results.NotFound() : Results.Ok(cashPosition);
    }


    private static async Task<IResult> GetAll(
        ICashPositionService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(CashPositionResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ICashPositionService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignBankAccount(
        AssociationRequest request,
        ICashPositionService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignBankAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignBankAccount(
    AssociationRequest request,
    ICashPositionService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignBankAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToCashFlows(
        MultipleAssociationRequest request,
        ICashPositionService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToCashFlows(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromCashFlows(
        MultipleAssociationRequest request,
        ICashPositionService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromCashFlows(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static CashPosition mapRequestToCashPosition(CashPositionRequest request)
    {
        var model = new CashPosition
        {
            Id = request.Id,
            PositionDate = request.PositionDate,
            OpeningBalance = request.OpeningBalance,
            ClosingBalance = request.ClosingBalance,
            AvailableBalance = request.AvailableBalance,
        };
        return model;
    }

}
