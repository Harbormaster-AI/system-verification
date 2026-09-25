
using inventoryonaspdotnet.Service;
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Api;

public static class TransferOrderLineEndpoints
{
    public static IEndpointRouteBuilder MapTransferOrderLineEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/transferOrderLine").WithTags("TransferOrderLines");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignTransferOrder", AssignTransferOrder);
        group.MapPut("/unassignTransferOrder", UnassignTransferOrder);
        group.MapPut("/assignSku", AssignSku);
        group.MapPut("/unassignSku", UnassignSku);
        group.MapPut("/assignLot", AssignLot);
        group.MapPut("/unassignLot", UnassignLot);
        group.MapPut("/assignFromLocation", AssignFromLocation);
        group.MapPut("/unassignFromLocation", UnassignFromLocation);
        group.MapPut("/assignToLocation", AssignToLocation);
        group.MapPut("/unassignToLocation", UnassignToLocation);

        group.MapPut("/addToSerialNumbers", AddToSerialNumbers);
        group.MapPut("/removeFromSerialNumbers", RemoveFromSerialNumbers);


        return app;
    }

    private static async Task<IResult> Create(
        TransferOrderLineRequest request,
        ITransferOrderLineService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToTransferOrderLine(request);

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
        TransferOrderLineRequest request,
        ITransferOrderLineService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToTransferOrderLine(request);

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
        ITransferOrderLineService service,
        CancellationToken cancellationToken)
    {

        var transferOrderLine = await service.Get(identifier, cancellationToken);
        return transferOrderLine is null ? Results.NotFound() : Results.Ok(transferOrderLine);
    }


    private static async Task<IResult> GetAll(
        ITransferOrderLineService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(TransferOrderLineResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ITransferOrderLineService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignTransferOrder(
        AssociationRequest request,
        ITransferOrderLineService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignTransferOrder(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignTransferOrder(
    AssociationRequest request,
    ITransferOrderLineService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignTransferOrder(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignSku(
        AssociationRequest request,
        ITransferOrderLineService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignSku(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignSku(
    AssociationRequest request,
    ITransferOrderLineService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignSku(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignLot(
        AssociationRequest request,
        ITransferOrderLineService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignLot(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignLot(
    AssociationRequest request,
    ITransferOrderLineService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignLot(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignFromLocation(
        AssociationRequest request,
        ITransferOrderLineService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignFromLocation(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignFromLocation(
    AssociationRequest request,
    ITransferOrderLineService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignFromLocation(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignToLocation(
        AssociationRequest request,
        ITransferOrderLineService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignToLocation(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignToLocation(
    AssociationRequest request,
    ITransferOrderLineService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignToLocation(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToSerialNumbers(
        MultipleAssociationRequest request,
        ITransferOrderLineService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToSerialNumbers(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromSerialNumbers(
        MultipleAssociationRequest request,
        ITransferOrderLineService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromSerialNumbers(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static TransferOrderLine mapRequestToTransferOrderLine(TransferOrderLineRequest request)
    {
        var model = new TransferOrderLine
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
