using bankingonaspdotnet.Service;
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Api;

public static class StandingInstructionEndpoints
{
    public static IEndpointRouteBuilder MapStandingInstructionEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/standingInstruction").WithTags("StandingInstructions");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignAccount", AssignAccount);
        group.MapPut("/unassignAccount", UnassignAccount);
        group.MapPut("/assignBeneficiary", AssignBeneficiary);
        group.MapPut("/unassignBeneficiary", UnassignBeneficiary);


        return app;
    }

    private static async Task<IResult> Create(
        StandingInstructionRequest request,
        IStandingInstructionService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToStandingInstruction( request );

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
        StandingInstructionRequest request,
        IStandingInstructionService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToStandingInstruction( request );

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
        IStandingInstructionService service,
        CancellationToken cancellationToken) {

        var standingInstruction = await service.Get(identifier, cancellationToken);
        return standingInstruction is null ? Results.NotFound() : Results.Ok( standingInstruction );
    }


    private static async Task<IResult> GetAll(
        IStandingInstructionService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( StandingInstructionResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IStandingInstructionService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignAccount(
        AssociationRequest request,
        IStandingInstructionService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignAccount(
    AssociationRequest request,
    IStandingInstructionService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignBeneficiary(
        AssociationRequest request,
        IStandingInstructionService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignBeneficiary(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignBeneficiary(
    AssociationRequest request,
    IStandingInstructionService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignBeneficiary(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static StandingInstruction mapRequestToStandingInstruction( StandingInstructionRequest request ) {
        var model = new StandingInstruction
        {
            Id = request.Id,
            InstructionId = request.InstructionId,
            Amount = request.Amount,
            NextExecutionDate = request.NextExecutionDate,
            Frequency = request.Frequency,
            Status = request.Status,
        };
        return model;
    }

}
