using bankingonaspdotnet.Service;
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Api;

public static class ATMEndpoints
{
    public static IEndpointRouteBuilder MapATMEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/aTM").WithTags("ATMs");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignBranch", AssignBranch);
        group.MapPut("/unassignBranch", UnassignBranch);


        return app;
    }

    private static async Task<IResult> Create(
        ATMRequest request,
        IATMService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToATM(request);

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
        ATMRequest request,
        IATMService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToATM(request);

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
        IATMService service,
        CancellationToken cancellationToken)
    {

        var aTM = await service.Get(identifier, cancellationToken);
        return aTM is null ? Results.NotFound() : Results.Ok(aTM);
    }


    private static async Task<IResult> GetAll(
        IATMService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(ATMResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IATMService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignBranch(
        AssociationRequest request,
        IATMService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignBranch(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignBranch(
    AssociationRequest request,
    IATMService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignBranch(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static ATM mapRequestToATM(ATMRequest request)
    {
        var model = new ATM
        {
            Id = request.Id,
            TerminalId = request.TerminalId,
            Location = request.Location,
            Status = request.Status,
        };
        return model;
    }

}
