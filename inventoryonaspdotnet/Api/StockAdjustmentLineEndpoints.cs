
using inventoryonaspdotnet.Service;
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Api;

public static class StockAdjustmentLineEndpoints
{
    public static IEndpointRouteBuilder MapStockAdjustmentLineEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/stockAdjustmentLine").WithTags("StockAdjustmentLines");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignAdjustment", AssignAdjustment);
        group.MapPut("/unassignAdjustment", UnassignAdjustment);
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
        StockAdjustmentLineRequest request,
        IStockAdjustmentLineService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToStockAdjustmentLine(request);

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
        StockAdjustmentLineRequest request,
        IStockAdjustmentLineService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToStockAdjustmentLine(request);

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
        IStockAdjustmentLineService service,
        CancellationToken cancellationToken)
    {

        var stockAdjustmentLine = await service.Get(identifier, cancellationToken);
        return stockAdjustmentLine is null ? Results.NotFound() : Results.Ok(stockAdjustmentLine);
    }


    private static async Task<IResult> GetAll(
        IStockAdjustmentLineService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(StockAdjustmentLineResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IStockAdjustmentLineService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignAdjustment(
        AssociationRequest request,
        IStockAdjustmentLineService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignAdjustment(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignAdjustment(
    AssociationRequest request,
    IStockAdjustmentLineService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignAdjustment(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignSku(
        AssociationRequest request,
        IStockAdjustmentLineService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignSku(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignSku(
    AssociationRequest request,
    IStockAdjustmentLineService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignSku(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignLot(
        AssociationRequest request,
        IStockAdjustmentLineService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignLot(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignLot(
    AssociationRequest request,
    IStockAdjustmentLineService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignLot(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignLocation(
        AssociationRequest request,
        IStockAdjustmentLineService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignLocation(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignLocation(
    AssociationRequest request,
    IStockAdjustmentLineService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignLocation(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToSerialNumbers(
        MultipleAssociationRequest request,
        IStockAdjustmentLineService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToSerialNumbers(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromSerialNumbers(
        MultipleAssociationRequest request,
        IStockAdjustmentLineService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromSerialNumbers(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static StockAdjustmentLine mapRequestToStockAdjustmentLine(StockAdjustmentLineRequest request)
    {
        var model = new StockAdjustmentLine
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
