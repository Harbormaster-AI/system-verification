
using crmonaspdotnet.Service;
using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Api;

public static class OrderEndpoints
{
    public static IEndpointRouteBuilder MapOrderEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/order").WithTags("Orders");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignOrganization", AssignOrganization);
        group.MapPut("/unassignOrganization", UnassignOrganization);
        group.MapPut("/assignAccount", AssignAccount);
        group.MapPut("/unassignAccount", UnassignAccount);
        group.MapPut("/assignOpportunity", AssignOpportunity);
        group.MapPut("/unassignOpportunity", UnassignOpportunity);
        group.MapPut("/assignQuote", AssignQuote);
        group.MapPut("/unassignQuote", UnassignQuote);
        group.MapPut("/assignOwner", AssignOwner);
        group.MapPut("/unassignOwner", UnassignOwner);
        group.MapPut("/assignContract", AssignContract);
        group.MapPut("/unassignContract", UnassignContract);
        group.MapPut("/assignPriceBook", AssignPriceBook);
        group.MapPut("/unassignPriceBook", UnassignPriceBook);

    group.MapPut("/addToItems", AddToItems);
    group.MapPut("/removeFromItems", RemoveFromItems);


        return app;
    }

    private static async Task<IResult> Create(
        OrderRequest request,
        IOrderService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToOrder( request );

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
        OrderRequest request,
        IOrderService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToOrder( request );

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
        IOrderService service,
        CancellationToken cancellationToken) {

        var order = await service.Get(identifier, cancellationToken);
        return order is null ? Results.NotFound() : Results.Ok( order );
    }


    private static async Task<IResult> GetAll(
        IOrderService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( OrderResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IOrderService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOrganization(
        AssociationRequest request,
        IOrderService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignOrganization(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOrganization(
    AssociationRequest request,
    IOrderService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignOrganization(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignAccount(
        AssociationRequest request,
        IOrderService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignAccount(
    AssociationRequest request,
    IOrderService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOpportunity(
        AssociationRequest request,
        IOrderService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignOpportunity(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOpportunity(
    AssociationRequest request,
    IOrderService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignOpportunity(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignQuote(
        AssociationRequest request,
        IOrderService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignQuote(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignQuote(
    AssociationRequest request,
    IOrderService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignQuote(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOwner(
        AssociationRequest request,
        IOrderService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignOwner(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOwner(
    AssociationRequest request,
    IOrderService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignOwner(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignContract(
        AssociationRequest request,
        IOrderService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignContract(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignContract(
    AssociationRequest request,
    IOrderService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignContract(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignPriceBook(
        AssociationRequest request,
        IOrderService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignPriceBook(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignPriceBook(
    AssociationRequest request,
    IOrderService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignPriceBook(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToItems(
        MultipleAssociationRequest request,
        IOrderService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToItems(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromItems(
        MultipleAssociationRequest request,
        IOrderService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromItems(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static Order mapRequestToOrder( OrderRequest request ) {
        var model = new Order
        {
            Id = request.Id,
            OrderNumber = request.OrderNumber,
            OrderDate = request.OrderDate,
            TotalAmount = request.TotalAmount,
            TaxAmount = request.TaxAmount,
            ShippingAmount = request.ShippingAmount,
            Status = request.Status,
        };
        return model;
    }

}
