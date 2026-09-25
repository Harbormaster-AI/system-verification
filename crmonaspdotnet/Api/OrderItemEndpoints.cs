
using crmonaspdotnet.Service;
using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Api;

public static class OrderItemEndpoints
{
    public static IEndpointRouteBuilder MapOrderItemEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/orderItem").WithTags("OrderItems");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignOrder", AssignOrder);
        group.MapPut("/unassignOrder", UnassignOrder);
        group.MapPut("/assignProduct", AssignProduct);
        group.MapPut("/unassignProduct", UnassignProduct);
        group.MapPut("/assignPriceBookEntry", AssignPriceBookEntry);
        group.MapPut("/unassignPriceBookEntry", UnassignPriceBookEntry);


        return app;
    }

    private static async Task<IResult> Create(
        OrderItemRequest request,
        IOrderItemService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToOrderItem(request);

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
        OrderItemRequest request,
        IOrderItemService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToOrderItem(request);

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
        IOrderItemService service,
        CancellationToken cancellationToken)
    {

        var orderItem = await service.Get(identifier, cancellationToken);
        return orderItem is null ? Results.NotFound() : Results.Ok(orderItem);
    }


    private static async Task<IResult> GetAll(
        IOrderItemService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(OrderItemResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IOrderItemService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOrder(
        AssociationRequest request,
        IOrderItemService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignOrder(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOrder(
    AssociationRequest request,
    IOrderItemService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignOrder(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignProduct(
        AssociationRequest request,
        IOrderItemService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignProduct(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignProduct(
    AssociationRequest request,
    IOrderItemService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignProduct(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignPriceBookEntry(
        AssociationRequest request,
        IOrderItemService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignPriceBookEntry(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignPriceBookEntry(
    AssociationRequest request,
    IOrderItemService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignPriceBookEntry(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static OrderItem mapRequestToOrderItem(OrderItemRequest request)
    {
        var model = new OrderItem
        {
            Id = request.Id,
            Quantity = request.Quantity,
            UnitPrice = request.UnitPrice,
            DiscountAmount = request.DiscountAmount,
            TaxAmount = request.TaxAmount,
            TotalAmount = request.TotalAmount,
        };
        return model;
    }

}
