
using crmonaspdotnet.Service;
using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Api;

public static class OpportunityLineItemEndpoints
{
    public static IEndpointRouteBuilder MapOpportunityLineItemEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/opportunityLineItem").WithTags("OpportunityLineItems");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignOpportunity", AssignOpportunity);
        group.MapPut("/unassignOpportunity", UnassignOpportunity);
        group.MapPut("/assignProduct", AssignProduct);
        group.MapPut("/unassignProduct", UnassignProduct);
        group.MapPut("/assignPriceBookEntry", AssignPriceBookEntry);
        group.MapPut("/unassignPriceBookEntry", UnassignPriceBookEntry);


        return app;
    }

    private static async Task<IResult> Create(
        OpportunityLineItemRequest request,
        IOpportunityLineItemService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToOpportunityLineItem(request);

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
        OpportunityLineItemRequest request,
        IOpportunityLineItemService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToOpportunityLineItem(request);

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
        IOpportunityLineItemService service,
        CancellationToken cancellationToken)
    {

        var opportunityLineItem = await service.Get(identifier, cancellationToken);
        return opportunityLineItem is null ? Results.NotFound() : Results.Ok(opportunityLineItem);
    }


    private static async Task<IResult> GetAll(
        IOpportunityLineItemService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(OpportunityLineItemResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IOpportunityLineItemService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOpportunity(
        AssociationRequest request,
        IOpportunityLineItemService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignOpportunity(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOpportunity(
    AssociationRequest request,
    IOpportunityLineItemService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignOpportunity(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignProduct(
        AssociationRequest request,
        IOpportunityLineItemService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignProduct(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignProduct(
    AssociationRequest request,
    IOpportunityLineItemService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignProduct(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignPriceBookEntry(
        AssociationRequest request,
        IOpportunityLineItemService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignPriceBookEntry(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignPriceBookEntry(
    AssociationRequest request,
    IOpportunityLineItemService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignPriceBookEntry(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static OpportunityLineItem mapRequestToOpportunityLineItem(OpportunityLineItemRequest request)
    {
        var model = new OpportunityLineItem
        {
            Id = request.Id,
            Quantity = request.Quantity,
            UnitPrice = request.UnitPrice,
            DiscountPercent = request.DiscountPercent,
            TotalPrice = request.TotalPrice,
        };
        return model;
    }

}
