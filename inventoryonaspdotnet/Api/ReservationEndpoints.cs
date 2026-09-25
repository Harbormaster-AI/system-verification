
using inventoryonaspdotnet.Service;
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Api;

public static class ReservationEndpoints
{
    public static IEndpointRouteBuilder MapReservationEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/reservation").WithTags("Reservations");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignSku", AssignSku);
        group.MapPut("/unassignSku", UnassignSku);
        group.MapPut("/assignWarehouse", AssignWarehouse);
        group.MapPut("/unassignWarehouse", UnassignWarehouse);
        group.MapPut("/assignLocation", AssignLocation);
        group.MapPut("/unassignLocation", UnassignLocation);
        group.MapPut("/assignInventoryItem", AssignInventoryItem);
        group.MapPut("/unassignInventoryItem", UnassignInventoryItem);
        group.MapPut("/assignLot", AssignLot);
        group.MapPut("/unassignLot", UnassignLot);
        group.MapPut("/assignDemandSignal", AssignDemandSignal);
        group.MapPut("/unassignDemandSignal", UnassignDemandSignal);

    group.MapPut("/addToSerialNumbers", AddToSerialNumbers);
    group.MapPut("/removeFromSerialNumbers", RemoveFromSerialNumbers);


        return app;
    }

    private static async Task<IResult> Create(
        ReservationRequest request,
        IReservationService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToReservation( request );

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
        ReservationRequest request,
        IReservationService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToReservation( request );

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
        IReservationService service,
        CancellationToken cancellationToken) {

        var reservation = await service.Get(identifier, cancellationToken);
        return reservation is null ? Results.NotFound() : Results.Ok( reservation );
    }


    private static async Task<IResult> GetAll(
        IReservationService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( ReservationResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IReservationService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignSku(
        AssociationRequest request,
        IReservationService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignSku(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignSku(
    AssociationRequest request,
    IReservationService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignSku(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignWarehouse(
        AssociationRequest request,
        IReservationService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignWarehouse(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignWarehouse(
    AssociationRequest request,
    IReservationService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignWarehouse(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignLocation(
        AssociationRequest request,
        IReservationService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignLocation(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignLocation(
    AssociationRequest request,
    IReservationService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignLocation(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignInventoryItem(
        AssociationRequest request,
        IReservationService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignInventoryItem(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignInventoryItem(
    AssociationRequest request,
    IReservationService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignInventoryItem(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignLot(
        AssociationRequest request,
        IReservationService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignLot(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignLot(
    AssociationRequest request,
    IReservationService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignLot(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignDemandSignal(
        AssociationRequest request,
        IReservationService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignDemandSignal(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignDemandSignal(
    AssociationRequest request,
    IReservationService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignDemandSignal(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToSerialNumbers(
        MultipleAssociationRequest request,
        IReservationService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToSerialNumbers(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromSerialNumbers(
        MultipleAssociationRequest request,
        IReservationService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromSerialNumbers(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static Reservation mapRequestToReservation( ReservationRequest request ) {
        var model = new Reservation
        {
            Id = request.Id,
            ReferenceNumber = request.ReferenceNumber,
            ReservedQuantity = request.ReservedQuantity,
            PromisedDate = request.PromisedDate,
            ReservationStatus = request.ReservationStatus,
            ReservationType = request.ReservationType,
        };
        return model;
    }

}
