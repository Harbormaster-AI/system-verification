
using bankingonaspdotnet.Service;
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Api;

public static class ScreeningResultEndpoints
{
    public static IEndpointRouteBuilder MapScreeningResultEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/screeningResult").WithTags("ScreeningResults");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignKycProfile", AssignKycProfile);
        group.MapPut("/unassignKycProfile", UnassignKycProfile);


        return app;
    }

    private static async Task<IResult> Create(
        ScreeningResultRequest request,
        IScreeningResultService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToScreeningResult(request);

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
        ScreeningResultRequest request,
        IScreeningResultService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToScreeningResult(request);

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
        IScreeningResultService service,
        CancellationToken cancellationToken)
    {

        var screeningResult = await service.Get(identifier, cancellationToken);
        return screeningResult is null ? Results.NotFound() : Results.Ok(screeningResult);
    }


    private static async Task<IResult> GetAll(
        IScreeningResultService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(ScreeningResultResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IScreeningResultService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignKycProfile(
        AssociationRequest request,
        IScreeningResultService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignKycProfile(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignKycProfile(
    AssociationRequest request,
    IScreeningResultService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignKycProfile(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static ScreeningResult mapRequestToScreeningResult(ScreeningResultRequest request)
    {
        var model = new ScreeningResult
        {
            Id = request.Id,
            ScreeningDate = request.ScreeningDate,
            Provider = request.Provider,
            Outcome = request.Outcome,
        };
        return model;
    }

}
