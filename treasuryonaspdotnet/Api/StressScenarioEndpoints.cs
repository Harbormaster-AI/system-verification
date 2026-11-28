
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class StressScenarioEndpoints
{
    public static IEndpointRouteBuilder MapStressScenarioEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/stressScenario").WithTags("StressScenarios");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignMarketDataSet", AssignMarketDataSet);
        group.MapPut("/unassignMarketDataSet", UnassignMarketDataSet);

        group.MapPut("/addToStressResults", AddToStressResults);
        group.MapPut("/removeFromStressResults", RemoveFromStressResults);


        return app;
    }

    private static async Task<IResult> Create(
        StressScenarioRequest request,
        IStressScenarioService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToStressScenario(request);

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
        StressScenarioRequest request,
        IStressScenarioService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToStressScenario(request);

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
        IStressScenarioService service,
        CancellationToken cancellationToken)
    {

        var stressScenario = await service.Get(identifier, cancellationToken);
        return stressScenario is null ? Results.NotFound() : Results.Ok(stressScenario);
    }


    private static async Task<IResult> GetAll(
        IStressScenarioService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(StressScenarioResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IStressScenarioService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignMarketDataSet(
        AssociationRequest request,
        IStressScenarioService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignMarketDataSet(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignMarketDataSet(
    AssociationRequest request,
    IStressScenarioService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignMarketDataSet(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToStressResults(
        MultipleAssociationRequest request,
        IStressScenarioService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToStressResults(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromStressResults(
        MultipleAssociationRequest request,
        IStressScenarioService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromStressResults(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static StressScenario mapRequestToStressScenario(StressScenarioRequest request)
    {
        var model = new StressScenario
        {
            Id = request.Id,
            Name = request.Name,
            Severity = request.Severity,
            Horizon = request.Horizon,
        };
        return model;
    }

}
