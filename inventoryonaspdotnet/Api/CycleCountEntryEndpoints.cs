
using inventoryonaspdotnet.Service;
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Api;

public static class CycleCountEntryEndpoints
{
    public static IEndpointRouteBuilder MapCycleCountEntryEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/cycleCountEntry").WithTags("CycleCountEntrys");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignCycleCount", AssignCycleCount);
        group.MapPut("/unassignCycleCount", UnassignCycleCount);
        group.MapPut("/assignSku", AssignSku);
        group.MapPut("/unassignSku", UnassignSku);
        group.MapPut("/assignLot", AssignLot);
        group.MapPut("/unassignLot", UnassignLot);
        group.MapPut("/assignLocation", AssignLocation);
        group.MapPut("/unassignLocation", UnassignLocation);

        group.MapPut("/addToSerialNumbers", AddToSerialNumbers);
        group.MapPut("/removeFromSerialNumbers", RemoveFromSerialNumbers);


        return app;
    }

    private static async Task<IResult> Create(
        CycleCountEntryRequest request,
        ICycleCountEntryService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToCycleCountEntry(request);

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
        CycleCountEntryRequest request,
        ICycleCountEntryService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToCycleCountEntry(request);

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
        ICycleCountEntryService service,
        CancellationToken cancellationToken)
    {

        var cycleCountEntry = await service.Get(identifier, cancellationToken);
        return cycleCountEntry is null ? Results.NotFound() : Results.Ok(cycleCountEntry);
    }


    private static async Task<IResult> GetAll(
        ICycleCountEntryService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(CycleCountEntryResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ICycleCountEntryService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignCycleCount(
        AssociationRequest request,
        ICycleCountEntryService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignCycleCount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignCycleCount(
    AssociationRequest request,
    ICycleCountEntryService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignCycleCount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignSku(
        AssociationRequest request,
        ICycleCountEntryService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignSku(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignSku(
    AssociationRequest request,
    ICycleCountEntryService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignSku(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignLot(
        AssociationRequest request,
        ICycleCountEntryService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignLot(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignLot(
    AssociationRequest request,
    ICycleCountEntryService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignLot(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignLocation(
        AssociationRequest request,
        ICycleCountEntryService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignLocation(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignLocation(
    AssociationRequest request,
    ICycleCountEntryService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignLocation(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToSerialNumbers(
        MultipleAssociationRequest request,
        ICycleCountEntryService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToSerialNumbers(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromSerialNumbers(
        MultipleAssociationRequest request,
        ICycleCountEntryService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromSerialNumbers(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static CycleCountEntry mapRequestToCycleCountEntry(CycleCountEntryRequest request)
    {
        var model = new CycleCountEntry
        {
            Id = request.Id,
            LineNumber = request.LineNumber,
            SystemQuantity = request.SystemQuantity,
            CountedQuantity = request.CountedQuantity,
            VarianceQuantity = request.VarianceQuantity,
            RecountRequired = request.RecountRequired,
            StockStatus = request.StockStatus,
        };
        return model;
    }

}
