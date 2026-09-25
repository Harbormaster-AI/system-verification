
using crmonaspdotnet.Service;
using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Api;

public static class ProductEndpoints
{
    public static IEndpointRouteBuilder MapProductEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/product").WithTags("Products");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignOrganization", AssignOrganization);
        group.MapPut("/unassignOrganization", UnassignOrganization);

        group.MapPut("/addToPriceBookEntries", AddToPriceBookEntries);
        group.MapPut("/removeFromPriceBookEntries", RemoveFromPriceBookEntries);

        group.MapPut("/addToOpportunityLineItems", AddToOpportunityLineItems);
        group.MapPut("/removeFromOpportunityLineItems", RemoveFromOpportunityLineItems);

        group.MapPut("/addToQuoteLineItems", AddToQuoteLineItems);
        group.MapPut("/removeFromQuoteLineItems", RemoveFromQuoteLineItems);

        group.MapPut("/addToOrderItems", AddToOrderItems);
        group.MapPut("/removeFromOrderItems", RemoveFromOrderItems);


        return app;
    }

    private static async Task<IResult> Create(
        ProductRequest request,
        IProductService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToProduct(request);

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
        ProductRequest request,
        IProductService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToProduct(request);

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
        IProductService service,
        CancellationToken cancellationToken)
    {

        var product = await service.Get(identifier, cancellationToken);
        return product is null ? Results.NotFound() : Results.Ok(product);
    }


    private static async Task<IResult> GetAll(
        IProductService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(ProductResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IProductService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOrganization(
        AssociationRequest request,
        IProductService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignOrganization(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOrganization(
    AssociationRequest request,
    IProductService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignOrganization(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToPriceBookEntries(
        MultipleAssociationRequest request,
        IProductService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToPriceBookEntries(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromPriceBookEntries(
        MultipleAssociationRequest request,
        IProductService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromPriceBookEntries(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToOpportunityLineItems(
        MultipleAssociationRequest request,
        IProductService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToOpportunityLineItems(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromOpportunityLineItems(
        MultipleAssociationRequest request,
        IProductService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromOpportunityLineItems(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToQuoteLineItems(
        MultipleAssociationRequest request,
        IProductService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToQuoteLineItems(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromQuoteLineItems(
        MultipleAssociationRequest request,
        IProductService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromQuoteLineItems(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToOrderItems(
        MultipleAssociationRequest request,
        IProductService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToOrderItems(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromOrderItems(
        MultipleAssociationRequest request,
        IProductService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromOrderItems(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static Product mapRequestToProduct(ProductRequest request)
    {
        var model = new Product
        {
            Id = request.Id,
            Sku = request.Sku,
            Name = request.Name,
            AsActive = request.AsActive,
            StandardPrice = request.StandardPrice,
            Description = request.Description,
            ProductType = request.ProductType,
            Uom = request.Uom,
        };
        return model;
    }

}
