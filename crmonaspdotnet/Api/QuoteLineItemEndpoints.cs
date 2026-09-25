
using crmonaspdotnet.Service;
using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Api;

public static class QuoteLineItemEndpoints
{
    public static IEndpointRouteBuilder MapQuoteLineItemEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/quoteLineItem").WithTags("QuoteLineItems");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignQuote", AssignQuote);
        group.MapPut("/unassignQuote", UnassignQuote);
        group.MapPut("/assignProduct", AssignProduct);
        group.MapPut("/unassignProduct", UnassignProduct);
        group.MapPut("/assignPriceBookEntry", AssignPriceBookEntry);
        group.MapPut("/unassignPriceBookEntry", UnassignPriceBookEntry);
        group.MapPut("/assignOpportunityLineItem", AssignOpportunityLineItem);
        group.MapPut("/unassignOpportunityLineItem", UnassignOpportunityLineItem);


        return app;
    }

    private static async Task<IResult> Create(
        QuoteLineItemRequest request,
        IQuoteLineItemService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToQuoteLineItem(request);

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
        QuoteLineItemRequest request,
        IQuoteLineItemService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToQuoteLineItem(request);

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
        IQuoteLineItemService service,
        CancellationToken cancellationToken)
    {

        var quoteLineItem = await service.Get(identifier, cancellationToken);
        return quoteLineItem is null ? Results.NotFound() : Results.Ok(quoteLineItem);
    }


    private static async Task<IResult> GetAll(
        IQuoteLineItemService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(QuoteLineItemResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IQuoteLineItemService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignQuote(
        AssociationRequest request,
        IQuoteLineItemService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignQuote(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignQuote(
    AssociationRequest request,
    IQuoteLineItemService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignQuote(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignProduct(
        AssociationRequest request,
        IQuoteLineItemService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignProduct(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignProduct(
    AssociationRequest request,
    IQuoteLineItemService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignProduct(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignPriceBookEntry(
        AssociationRequest request,
        IQuoteLineItemService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignPriceBookEntry(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignPriceBookEntry(
    AssociationRequest request,
    IQuoteLineItemService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignPriceBookEntry(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOpportunityLineItem(
        AssociationRequest request,
        IQuoteLineItemService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignOpportunityLineItem(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOpportunityLineItem(
    AssociationRequest request,
    IQuoteLineItemService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignOpportunityLineItem(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static QuoteLineItem mapRequestToQuoteLineItem(QuoteLineItemRequest request)
    {
        var model = new QuoteLineItem
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
