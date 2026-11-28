
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class BankAccountEndpoints
{
    public static IEndpointRouteBuilder MapBankAccountEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/bankAccount").WithTags("BankAccounts");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignTreasuryUnit", AssignTreasuryUnit);
        group.MapPut("/unassignTreasuryUnit", UnassignTreasuryUnit);

        group.MapPut("/addToCashPositions", AddToCashPositions);
        group.MapPut("/removeFromCashPositions", RemoveFromCashPositions);

        group.MapPut("/addToCashFlows", AddToCashFlows);
        group.MapPut("/removeFromCashFlows", RemoveFromCashFlows);

        group.MapPut("/addToSettlementInstructions", AddToSettlementInstructions);
        group.MapPut("/removeFromSettlementInstructions", RemoveFromSettlementInstructions);


        return app;
    }

    private static async Task<IResult> Create(
        BankAccountRequest request,
        IBankAccountService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToBankAccount(request);

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
        BankAccountRequest request,
        IBankAccountService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToBankAccount(request);

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
        IBankAccountService service,
        CancellationToken cancellationToken)
    {

        var bankAccount = await service.Get(identifier, cancellationToken);
        return bankAccount is null ? Results.NotFound() : Results.Ok(bankAccount);
    }


    private static async Task<IResult> GetAll(
        IBankAccountService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(BankAccountResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IBankAccountService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignTreasuryUnit(
        AssociationRequest request,
        IBankAccountService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignTreasuryUnit(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignTreasuryUnit(
    AssociationRequest request,
    IBankAccountService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignTreasuryUnit(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToCashPositions(
        MultipleAssociationRequest request,
        IBankAccountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToCashPositions(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromCashPositions(
        MultipleAssociationRequest request,
        IBankAccountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromCashPositions(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToCashFlows(
        MultipleAssociationRequest request,
        IBankAccountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToCashFlows(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromCashFlows(
        MultipleAssociationRequest request,
        IBankAccountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromCashFlows(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToSettlementInstructions(
        MultipleAssociationRequest request,
        IBankAccountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToSettlementInstructions(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromSettlementInstructions(
        MultipleAssociationRequest request,
        IBankAccountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromSettlementInstructions(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static BankAccount mapRequestToBankAccount(BankAccountRequest request)
    {
        var model = new BankAccount
        {
            Id = request.Id,
            AccountName = request.AccountName,
            AccountIdentifier = request.AccountIdentifier,
            Currency = request.Currency,
            BankBic = request.BankBic,
        };
        return model;
    }

}
