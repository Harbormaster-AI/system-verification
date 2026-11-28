
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class StressResultEndpoints
{
    public static IEndpointRouteBuilder MapStressResultEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/stressResult").WithTags("StressResults");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignStressScenario", AssignStressScenario);
        group.MapPut("/unassignStressScenario", UnassignStressScenario);
        group.MapPut("/assignPortfolio", AssignPortfolio);
        group.MapPut("/unassignPortfolio", UnassignPortfolio);


        return app;
    }

    private static async Task<IResult> Create(
        StressResultRequest request,
        IStressResultService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToStressResult(request);

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
        StressResultRequest request,
        IStressResultService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToStressResult(request);

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
        IStressResultService service,
        CancellationToken cancellationToken)
    {

        var stressResult = await service.Get(identifier, cancellationToken);
        return stressResult is null ? Results.NotFound() : Results.Ok(stressResult);
    }


    private static async Task<IResult> GetAll(
        IStressResultService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(StressResultResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IStressResultService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignStressScenario(
        AssociationRequest request,
        IStressResultService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignStressScenario(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignStressScenario(
    AssociationRequest request,
    IStressResultService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignStressScenario(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignPortfolio(
        AssociationRequest request,
        IStressResultService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignPortfolio(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignPortfolio(
    AssociationRequest request,
    IStressResultService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignPortfolio(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static StressResult mapRequestToStressResult(StressResultRequest request)
    {
        var model = new StressResult
        {
            Id = request.Id,
            Value = request.Value,
            Currency = request.Currency,
            Measure = request.Measure,
        };
        return model;
    }

}
