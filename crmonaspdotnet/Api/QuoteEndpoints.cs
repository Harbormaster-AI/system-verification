
using crmonaspdotnet.Service;
using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Api;

public static class QuoteEndpoints
{
    public static IEndpointRouteBuilder MapQuoteEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/quote").WithTags("Quotes");

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
        group.MapPut("/assignOwner", AssignOwner);
        group.MapPut("/unassignOwner", UnassignOwner);
        group.MapPut("/assignPriceBook", AssignPriceBook);
        group.MapPut("/unassignPriceBook", UnassignPriceBook);
        group.MapPut("/assignOrder", AssignOrder);
        group.MapPut("/unassignOrder", UnassignOrder);

    group.MapPut("/addToLineItems", AddToLineItems);
    group.MapPut("/removeFromLineItems", RemoveFromLineItems);


        return app;
    }

    private static async Task<IResult> Create(
        QuoteRequest request,
        IQuoteService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToQuote( request );

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
        QuoteRequest request,
        IQuoteService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToQuote( request );

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
        IQuoteService service,
        CancellationToken cancellationToken) {

        var quote = await service.Get(identifier, cancellationToken);
        return quote is null ? Results.NotFound() : Results.Ok( quote );
    }


    private static async Task<IResult> GetAll(
        IQuoteService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( QuoteResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IQuoteService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOrganization(
        AssociationRequest request,
        IQuoteService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignOrganization(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOrganization(
    AssociationRequest request,
    IQuoteService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignOrganization(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignAccount(
        AssociationRequest request,
        IQuoteService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignAccount(
    AssociationRequest request,
    IQuoteService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOpportunity(
        AssociationRequest request,
        IQuoteService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignOpportunity(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOpportunity(
    AssociationRequest request,
    IQuoteService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignOpportunity(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOwner(
        AssociationRequest request,
        IQuoteService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignOwner(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOwner(
    AssociationRequest request,
    IQuoteService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignOwner(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignPriceBook(
        AssociationRequest request,
        IQuoteService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignPriceBook(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignPriceBook(
    AssociationRequest request,
    IQuoteService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignPriceBook(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOrder(
        AssociationRequest request,
        IQuoteService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignOrder(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOrder(
    AssociationRequest request,
    IQuoteService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignOrder(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToLineItems(
        MultipleAssociationRequest request,
        IQuoteService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToLineItems(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromLineItems(
        MultipleAssociationRequest request,
        IQuoteService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromLineItems(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static Quote mapRequestToQuote( QuoteRequest request ) {
        var model = new Quote
        {
            Id = request.Id,
            QuoteNumber = request.QuoteNumber,
            ValidityStart = request.ValidityStart,
            ValidityEnd = request.ValidityEnd,
            TotalAmount = request.TotalAmount,
            DiscountPercent = request.DiscountPercent,
            TaxAmount = request.TaxAmount,
            ShippingAmount = request.ShippingAmount,
            Status = request.Status,
        };
        return model;
    }

}
