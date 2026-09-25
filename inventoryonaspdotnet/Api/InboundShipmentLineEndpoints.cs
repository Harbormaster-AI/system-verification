
using inventoryonaspdotnet.Service;
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Api;

public static class InboundShipmentLineEndpoints
{
    public static IEndpointRouteBuilder MapInboundShipmentLineEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/inboundShipmentLine").WithTags("InboundShipmentLines");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignInboundShipment", AssignInboundShipment);
        group.MapPut("/unassignInboundShipment", UnassignInboundShipment);
        group.MapPut("/assignSku", AssignSku);
        group.MapPut("/unassignSku", UnassignSku);
        group.MapPut("/assignLot", AssignLot);
        group.MapPut("/unassignLot", UnassignLot);
        group.MapPut("/assignDestinationLocation", AssignDestinationLocation);
        group.MapPut("/unassignDestinationLocation", UnassignDestinationLocation);

    group.MapPut("/addToSerialNumbers", AddToSerialNumbers);
    group.MapPut("/removeFromSerialNumbers", RemoveFromSerialNumbers);


        return app;
    }

    private static async Task<IResult> Create(
        InboundShipmentLineRequest request,
        IInboundShipmentLineService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToInboundShipmentLine( request );

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
        InboundShipmentLineRequest request,
        IInboundShipmentLineService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToInboundShipmentLine( request );

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
        IInboundShipmentLineService service,
        CancellationToken cancellationToken) {

        var inboundShipmentLine = await service.Get(identifier, cancellationToken);
        return inboundShipmentLine is null ? Results.NotFound() : Results.Ok( inboundShipmentLine );
    }


    private static async Task<IResult> GetAll(
        IInboundShipmentLineService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( InboundShipmentLineResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IInboundShipmentLineService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignInboundShipment(
        AssociationRequest request,
        IInboundShipmentLineService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignInboundShipment(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignInboundShipment(
    AssociationRequest request,
    IInboundShipmentLineService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignInboundShipment(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignSku(
        AssociationRequest request,
        IInboundShipmentLineService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignSku(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignSku(
    AssociationRequest request,
    IInboundShipmentLineService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignSku(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignLot(
        AssociationRequest request,
        IInboundShipmentLineService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignLot(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignLot(
    AssociationRequest request,
    IInboundShipmentLineService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignLot(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignDestinationLocation(
        AssociationRequest request,
        IInboundShipmentLineService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignDestinationLocation(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignDestinationLocation(
    AssociationRequest request,
    IInboundShipmentLineService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignDestinationLocation(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToSerialNumbers(
        MultipleAssociationRequest request,
        IInboundShipmentLineService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToSerialNumbers(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromSerialNumbers(
        MultipleAssociationRequest request,
        IInboundShipmentLineService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromSerialNumbers(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static InboundShipmentLine mapRequestToInboundShipmentLine( InboundShipmentLineRequest request ) {
        var model = new InboundShipmentLine
        {
            Id = request.Id,
            LineNumber = request.LineNumber,
            Quantity = request.Quantity,
            UnitOfMeasure = request.UnitOfMeasure,
            StockStatus = request.StockStatus,
        };
        return model;
    }

}
