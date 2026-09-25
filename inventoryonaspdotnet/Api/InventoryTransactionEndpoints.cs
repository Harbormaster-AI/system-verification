
using inventoryonaspdotnet.Service;
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Api;

public static class InventoryTransactionEndpoints
{
    public static IEndpointRouteBuilder MapInventoryTransactionEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/inventoryTransaction").WithTags("InventoryTransactions");

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
        group.MapPut("/assignLot", AssignLot);
        group.MapPut("/unassignLot", UnassignLot);
        group.MapPut("/assignRelatedReservation", AssignRelatedReservation);
        group.MapPut("/unassignRelatedReservation", UnassignRelatedReservation);
        group.MapPut("/assignTransferOrder", AssignTransferOrder);
        group.MapPut("/unassignTransferOrder", UnassignTransferOrder);
        group.MapPut("/assignAdjustment", AssignAdjustment);
        group.MapPut("/unassignAdjustment", UnassignAdjustment);
        group.MapPut("/assignCycleCount", AssignCycleCount);
        group.MapPut("/unassignCycleCount", UnassignCycleCount);

        group.MapPut("/addToSerialNumbers", AddToSerialNumbers);
        group.MapPut("/removeFromSerialNumbers", RemoveFromSerialNumbers);


        return app;
    }

    private static async Task<IResult> Create(
        InventoryTransactionRequest request,
        IInventoryTransactionService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToInventoryTransaction(request);

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
        InventoryTransactionRequest request,
        IInventoryTransactionService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToInventoryTransaction(request);

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
        IInventoryTransactionService service,
        CancellationToken cancellationToken)
    {

        var inventoryTransaction = await service.Get(identifier, cancellationToken);
        return inventoryTransaction is null ? Results.NotFound() : Results.Ok(inventoryTransaction);
    }


    private static async Task<IResult> GetAll(
        IInventoryTransactionService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(InventoryTransactionResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IInventoryTransactionService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignSku(
        AssociationRequest request,
        IInventoryTransactionService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignSku(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignSku(
    AssociationRequest request,
    IInventoryTransactionService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignSku(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignWarehouse(
        AssociationRequest request,
        IInventoryTransactionService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignWarehouse(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignWarehouse(
    AssociationRequest request,
    IInventoryTransactionService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignWarehouse(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignLocation(
        AssociationRequest request,
        IInventoryTransactionService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignLocation(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignLocation(
    AssociationRequest request,
    IInventoryTransactionService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignLocation(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignLot(
        AssociationRequest request,
        IInventoryTransactionService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignLot(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignLot(
    AssociationRequest request,
    IInventoryTransactionService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignLot(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignRelatedReservation(
        AssociationRequest request,
        IInventoryTransactionService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignRelatedReservation(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignRelatedReservation(
    AssociationRequest request,
    IInventoryTransactionService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignRelatedReservation(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignTransferOrder(
        AssociationRequest request,
        IInventoryTransactionService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignTransferOrder(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignTransferOrder(
    AssociationRequest request,
    IInventoryTransactionService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignTransferOrder(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignAdjustment(
        AssociationRequest request,
        IInventoryTransactionService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignAdjustment(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignAdjustment(
    AssociationRequest request,
    IInventoryTransactionService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignAdjustment(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignCycleCount(
        AssociationRequest request,
        IInventoryTransactionService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignCycleCount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignCycleCount(
    AssociationRequest request,
    IInventoryTransactionService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignCycleCount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToSerialNumbers(
        MultipleAssociationRequest request,
        IInventoryTransactionService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToSerialNumbers(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromSerialNumbers(
        MultipleAssociationRequest request,
        IInventoryTransactionService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromSerialNumbers(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static InventoryTransaction mapRequestToInventoryTransaction(InventoryTransactionRequest request)
    {
        var model = new InventoryTransaction
        {
            Id = request.Id,
            TransactionNumber = request.TransactionNumber,
            Quantity = request.Quantity,
            UnitCost = request.UnitCost,
            TransactionDate = request.TransactionDate,
            ReasonCode = request.ReasonCode,
            TransactionType = request.TransactionType,
            UnitOfMeasure = request.UnitOfMeasure,
            Status = request.Status,
        };
        return model;
    }

}
