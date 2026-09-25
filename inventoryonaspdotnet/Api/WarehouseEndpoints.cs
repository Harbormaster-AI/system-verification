
using inventoryonaspdotnet.Service;
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Api;

public static class WarehouseEndpoints
{
    public static IEndpointRouteBuilder MapWarehouseEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/warehouse").WithTags("Warehouses");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);


        group.MapPut("/addToStorageLocations", AddToStorageLocations);
        group.MapPut("/removeFromStorageLocations", RemoveFromStorageLocations);

        group.MapPut("/addToInventoryItems", AddToInventoryItems);
        group.MapPut("/removeFromInventoryItems", RemoveFromInventoryItems);

        group.MapPut("/addToInboundShipments", AddToInboundShipments);
        group.MapPut("/removeFromInboundShipments", RemoveFromInboundShipments);

        group.MapPut("/addToOutboundAllocations", AddToOutboundAllocations);
        group.MapPut("/removeFromOutboundAllocations", RemoveFromOutboundAllocations);

        group.MapPut("/addToOriginTransfers", AddToOriginTransfers);
        group.MapPut("/removeFromOriginTransfers", RemoveFromOriginTransfers);

        group.MapPut("/addToDestinationTransfers", AddToDestinationTransfers);
        group.MapPut("/removeFromDestinationTransfers", RemoveFromDestinationTransfers);

        group.MapPut("/addToCycleCounts", AddToCycleCounts);
        group.MapPut("/removeFromCycleCounts", RemoveFromCycleCounts);


        return app;
    }

    private static async Task<IResult> Create(
        WarehouseRequest request,
        IWarehouseService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToWarehouse(request);

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
        WarehouseRequest request,
        IWarehouseService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToWarehouse(request);

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
        IWarehouseService service,
        CancellationToken cancellationToken)
    {

        var warehouse = await service.Get(identifier, cancellationToken);
        return warehouse is null ? Results.NotFound() : Results.Ok(warehouse);
    }


    private static async Task<IResult> GetAll(
        IWarehouseService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(WarehouseResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IWarehouseService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToStorageLocations(
        MultipleAssociationRequest request,
        IWarehouseService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToStorageLocations(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromStorageLocations(
        MultipleAssociationRequest request,
        IWarehouseService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromStorageLocations(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToInventoryItems(
        MultipleAssociationRequest request,
        IWarehouseService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToInventoryItems(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromInventoryItems(
        MultipleAssociationRequest request,
        IWarehouseService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromInventoryItems(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToInboundShipments(
        MultipleAssociationRequest request,
        IWarehouseService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToInboundShipments(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromInboundShipments(
        MultipleAssociationRequest request,
        IWarehouseService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromInboundShipments(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToOutboundAllocations(
        MultipleAssociationRequest request,
        IWarehouseService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToOutboundAllocations(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromOutboundAllocations(
        MultipleAssociationRequest request,
        IWarehouseService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromOutboundAllocations(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToOriginTransfers(
        MultipleAssociationRequest request,
        IWarehouseService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToOriginTransfers(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromOriginTransfers(
        MultipleAssociationRequest request,
        IWarehouseService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromOriginTransfers(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToDestinationTransfers(
        MultipleAssociationRequest request,
        IWarehouseService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToDestinationTransfers(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromDestinationTransfers(
        MultipleAssociationRequest request,
        IWarehouseService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromDestinationTransfers(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToCycleCounts(
        MultipleAssociationRequest request,
        IWarehouseService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToCycleCounts(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromCycleCounts(
        MultipleAssociationRequest request,
        IWarehouseService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromCycleCounts(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static Warehouse mapRequestToWarehouse(WarehouseRequest request)
    {
        var model = new Warehouse
        {
            Id = request.Id,
            Name = request.Name,
            Code = request.Code,
            Address = request.Address,
            TimeZone = request.TimeZone,
            AllowsOverAllocation = request.AllowsOverAllocation,
        };
        return model;
    }

}
