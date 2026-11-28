
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class SettlementInstructionEndpoints
{
    public static IEndpointRouteBuilder MapSettlementInstructionEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/settlementInstruction").WithTags("SettlementInstructions");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignTrade", AssignTrade);
        group.MapPut("/unassignTrade", UnassignTrade);
        group.MapPut("/assignCounterparty", AssignCounterparty);
        group.MapPut("/unassignCounterparty", UnassignCounterparty);
        group.MapPut("/assignBankAccount", AssignBankAccount);
        group.MapPut("/unassignBankAccount", UnassignBankAccount);


        return app;
    }

    private static async Task<IResult> Create(
        SettlementInstructionRequest request,
        ISettlementInstructionService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToSettlementInstruction( request );

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
        SettlementInstructionRequest request,
        ISettlementInstructionService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToSettlementInstruction( request );

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
        ISettlementInstructionService service,
        CancellationToken cancellationToken) {

        var settlementInstruction = await service.Get(identifier, cancellationToken);
        return settlementInstruction is null ? Results.NotFound() : Results.Ok( settlementInstruction );
    }


    private static async Task<IResult> GetAll(
        ISettlementInstructionService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( SettlementInstructionResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ISettlementInstructionService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignTrade(
        AssociationRequest request,
        ISettlementInstructionService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignTrade(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignTrade(
    AssociationRequest request,
    ISettlementInstructionService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignTrade(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignCounterparty(
        AssociationRequest request,
        ISettlementInstructionService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignCounterparty(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignCounterparty(
    AssociationRequest request,
    ISettlementInstructionService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignCounterparty(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignBankAccount(
        AssociationRequest request,
        ISettlementInstructionService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignBankAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignBankAccount(
    AssociationRequest request,
    ISettlementInstructionService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignBankAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static SettlementInstruction mapRequestToSettlementInstruction( SettlementInstructionRequest request ) {
        var model = new SettlementInstruction
        {
            Id = request.Id,
            PaymentSystem = request.PaymentSystem,
            SettlementCurrency = request.SettlementCurrency,
            BeneficiaryAccount = request.BeneficiaryAccount,
            IntermediaryBankBic = request.IntermediaryBankBic,
        };
        return model;
    }

}
