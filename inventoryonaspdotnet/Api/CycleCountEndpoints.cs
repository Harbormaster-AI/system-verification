
using inventoryonaspdotnet.Service;
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Api;

public static class CycleCountEndpoints
{
    public static IEndpointRouteBuilder MapCycleCountEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/cycleCount").WithTags("CycleCounts");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignWarehouse", AssignWarehouse);
        group.MapPut("/unassignWarehouse", UnassignWarehouse);

        group.MapPut("/addToLocations", AddToLocations);
        group.MapPut("/removeFromLocations", RemoveFromLocations);

        group.MapPut("/addToEntries", AddToEntries);
        group.MapPut("/removeFromEntries", RemoveFromEntries);

        group.MapPut("/addToTransactions", AddToTransactions);
        group.MapPut("/removeFromTransactions", RemoveFromTransactions);


        return app;
    }

    private static async Task<IResult> Create(
        CycleCountRequest request,
        ICycleCountService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToCycleCount(request);

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
        CycleCountRequest request,
        ICycleCountService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToCycleCount(request);

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
        ICycleCountService service,
        CancellationToken cancellationToken)
    {

        var cycleCount = await service.Get(identifier, cancellationToken);
        return cycleCount is null ? Results.NotFound() : Results.Ok(cycleCount);
    }


    private static async Task<IResult> GetAll(
        ICycleCountService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(CycleCountResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ICycleCountService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignWarehouse(
        AssociationRequest request,
        ICycleCountService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignWarehouse(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignWarehouse(
    AssociationRequest request,
    ICycleCountService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignWarehouse(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToLocations(
        MultipleAssociationRequest request,
        ICycleCountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToLocations(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromLocations(
        MultipleAssociationRequest request,
        ICycleCountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromLocations(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToEntries(
        MultipleAssociationRequest request,
        ICycleCountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToEntries(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromEntries(
        MultipleAssociationRequest request,
        ICycleCountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromEntries(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToTransactions(
        MultipleAssociationRequest request,
        ICycleCountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToTransactions(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromTransactions(
        MultipleAssociationRequest request,
        ICycleCountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromTransactions(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static CycleCount mapRequestToCycleCount(CycleCountRequest request)
    {
        var model = new CycleCount
        {
            Id = request.Id,
            CountNumber = request.CountNumber,
            ScheduledDate = request.ScheduledDate,
            PerformedDate = request.PerformedDate,
            ApprovedBy = request.ApprovedBy,
            Status = request.Status,
        };
        return model;
    }

}
