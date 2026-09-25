
using inventoryonaspdotnet.Service;
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Api;

public static class InboundShipmentEndpoints
{
    public static IEndpointRouteBuilder MapInboundShipmentEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/inboundShipment").WithTags("InboundShipments");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignWarehouse", AssignWarehouse);
        group.MapPut("/unassignWarehouse", UnassignWarehouse);

    group.MapPut("/addToLines", AddToLines);
    group.MapPut("/removeFromLines", RemoveFromLines);

    group.MapPut("/addToTransactions", AddToTransactions);
    group.MapPut("/removeFromTransactions", RemoveFromTransactions);


        return app;
    }

    private static async Task<IResult> Create(
        InboundShipmentRequest request,
        IInboundShipmentService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToInboundShipment( request );

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
        InboundShipmentRequest request,
        IInboundShipmentService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToInboundShipment( request );

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
        IInboundShipmentService service,
        CancellationToken cancellationToken) {

        var inboundShipment = await service.Get(identifier, cancellationToken);
        return inboundShipment is null ? Results.NotFound() : Results.Ok( inboundShipment );
    }


    private static async Task<IResult> GetAll(
        IInboundShipmentService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( InboundShipmentResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IInboundShipmentService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignWarehouse(
        AssociationRequest request,
        IInboundShipmentService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignWarehouse(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignWarehouse(
    AssociationRequest request,
    IInboundShipmentService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignWarehouse(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToLines(
        MultipleAssociationRequest request,
        IInboundShipmentService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToLines(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromLines(
        MultipleAssociationRequest request,
        IInboundShipmentService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromLines(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToTransactions(
        MultipleAssociationRequest request,
        IInboundShipmentService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToTransactions(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromTransactions(
        MultipleAssociationRequest request,
        IInboundShipmentService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromTransactions(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static InboundShipment mapRequestToInboundShipment( InboundShipmentRequest request ) {
        var model = new InboundShipment
        {
            Id = request.Id,
            ShipmentNumber = request.ShipmentNumber,
            ExpectedArrivalDate = request.ExpectedArrivalDate,
            ArrivalDate = request.ArrivalDate,
            CarrierName = request.CarrierName,
            Status = request.Status,
        };
        return model;
    }

}
