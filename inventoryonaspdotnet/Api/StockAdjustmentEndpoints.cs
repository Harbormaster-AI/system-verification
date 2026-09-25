
using inventoryonaspdotnet.Service;
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Api;

public static class StockAdjustmentEndpoints
{
    public static IEndpointRouteBuilder MapStockAdjustmentEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/stockAdjustment").WithTags("StockAdjustments");

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
        StockAdjustmentRequest request,
        IStockAdjustmentService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToStockAdjustment(request);

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
        StockAdjustmentRequest request,
        IStockAdjustmentService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToStockAdjustment(request);

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
        IStockAdjustmentService service,
        CancellationToken cancellationToken)
    {

        var stockAdjustment = await service.Get(identifier, cancellationToken);
        return stockAdjustment is null ? Results.NotFound() : Results.Ok(stockAdjustment);
    }


    private static async Task<IResult> GetAll(
        IStockAdjustmentService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(StockAdjustmentResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IStockAdjustmentService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignWarehouse(
        AssociationRequest request,
        IStockAdjustmentService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignWarehouse(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignWarehouse(
    AssociationRequest request,
    IStockAdjustmentService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignWarehouse(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToLines(
        MultipleAssociationRequest request,
        IStockAdjustmentService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToLines(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromLines(
        MultipleAssociationRequest request,
        IStockAdjustmentService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromLines(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToTransactions(
        MultipleAssociationRequest request,
        IStockAdjustmentService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToTransactions(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromTransactions(
        MultipleAssociationRequest request,
        IStockAdjustmentService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromTransactions(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static StockAdjustment mapRequestToStockAdjustment(StockAdjustmentRequest request)
    {
        var model = new StockAdjustment
        {
            Id = request.Id,
            AdjustmentNumber = request.AdjustmentNumber,
            Reason = request.Reason,
            AdjustmentDate = request.AdjustmentDate,
            AdjustmentType = request.AdjustmentType,
            Status = request.Status,
        };
        return model;
    }

}
