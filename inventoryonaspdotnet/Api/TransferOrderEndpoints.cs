
using inventoryonaspdotnet.Service;
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Api;

public static class TransferOrderEndpoints
{
    public static IEndpointRouteBuilder MapTransferOrderEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/transferOrder").WithTags("TransferOrders");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignOriginWarehouse", AssignOriginWarehouse);
        group.MapPut("/unassignOriginWarehouse", UnassignOriginWarehouse);
        group.MapPut("/assignDestinationWarehouse", AssignDestinationWarehouse);
        group.MapPut("/unassignDestinationWarehouse", UnassignDestinationWarehouse);

        group.MapPut("/addToLines", AddToLines);
        group.MapPut("/removeFromLines", RemoveFromLines);

        group.MapPut("/addToTransactions", AddToTransactions);
        group.MapPut("/removeFromTransactions", RemoveFromTransactions);


        return app;
    }

    private static async Task<IResult> Create(
        TransferOrderRequest request,
        ITransferOrderService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToTransferOrder(request);

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
        TransferOrderRequest request,
        ITransferOrderService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToTransferOrder(request);

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
        ITransferOrderService service,
        CancellationToken cancellationToken)
    {

        var transferOrder = await service.Get(identifier, cancellationToken);
        return transferOrder is null ? Results.NotFound() : Results.Ok(transferOrder);
    }


    private static async Task<IResult> GetAll(
        ITransferOrderService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(TransferOrderResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ITransferOrderService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOriginWarehouse(
        AssociationRequest request,
        ITransferOrderService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignOriginWarehouse(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOriginWarehouse(
    AssociationRequest request,
    ITransferOrderService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignOriginWarehouse(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignDestinationWarehouse(
        AssociationRequest request,
        ITransferOrderService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignDestinationWarehouse(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignDestinationWarehouse(
    AssociationRequest request,
    ITransferOrderService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignDestinationWarehouse(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToLines(
        MultipleAssociationRequest request,
        ITransferOrderService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToLines(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromLines(
        MultipleAssociationRequest request,
        ITransferOrderService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromLines(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToTransactions(
        MultipleAssociationRequest request,
        ITransferOrderService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToTransactions(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromTransactions(
        MultipleAssociationRequest request,
        ITransferOrderService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromTransactions(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static TransferOrder mapRequestToTransferOrder(TransferOrderRequest request)
    {
        var model = new TransferOrder
        {
            Id = request.Id,
            OrderNumber = request.OrderNumber,
            RequestedShipDate = request.RequestedShipDate,
            RequestedReceiveDate = request.RequestedReceiveDate,
            ShippedDate = request.ShippedDate,
            ReceivedDate = request.ReceivedDate,
            Status = request.Status,
        };
        return model;
    }

}
