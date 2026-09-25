
using inventoryonaspdotnet.Service;
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Api;

public static class StorageLocationEndpoints
{
    public static IEndpointRouteBuilder MapStorageLocationEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/storageLocation").WithTags("StorageLocations");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignWarehouse", AssignWarehouse);
        group.MapPut("/unassignWarehouse", UnassignWarehouse);
        group.MapPut("/assignParentLocation", AssignParentLocation);
        group.MapPut("/unassignParentLocation", UnassignParentLocation);

    group.MapPut("/addToChildLocations", AddToChildLocations);
    group.MapPut("/removeFromChildLocations", RemoveFromChildLocations);

    group.MapPut("/addToInventoryItems", AddToInventoryItems);
    group.MapPut("/removeFromInventoryItems", RemoveFromInventoryItems);


        return app;
    }

    private static async Task<IResult> Create(
        StorageLocationRequest request,
        IStorageLocationService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToStorageLocation( request );

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
        StorageLocationRequest request,
        IStorageLocationService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToStorageLocation( request );

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
        IStorageLocationService service,
        CancellationToken cancellationToken) {

        var storageLocation = await service.Get(identifier, cancellationToken);
        return storageLocation is null ? Results.NotFound() : Results.Ok( storageLocation );
    }


    private static async Task<IResult> GetAll(
        IStorageLocationService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( StorageLocationResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IStorageLocationService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignWarehouse(
        AssociationRequest request,
        IStorageLocationService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignWarehouse(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignWarehouse(
    AssociationRequest request,
    IStorageLocationService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignWarehouse(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignParentLocation(
        AssociationRequest request,
        IStorageLocationService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignParentLocation(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignParentLocation(
    AssociationRequest request,
    IStorageLocationService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignParentLocation(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToChildLocations(
        MultipleAssociationRequest request,
        IStorageLocationService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToChildLocations(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromChildLocations(
        MultipleAssociationRequest request,
        IStorageLocationService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromChildLocations(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToInventoryItems(
        MultipleAssociationRequest request,
        IStorageLocationService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToInventoryItems(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromInventoryItems(
        MultipleAssociationRequest request,
        IStorageLocationService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromInventoryItems(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static StorageLocation mapRequestToStorageLocation( StorageLocationRequest request ) {
        var model = new StorageLocation
        {
            Id = request.Id,
            Code = request.Code,
            TemperatureControlled = request.TemperatureControlled,
            Capacity = request.Capacity,
            CapacityUnit = request.CapacityUnit,
            LocationType = request.LocationType,
        };
        return model;
    }

}
