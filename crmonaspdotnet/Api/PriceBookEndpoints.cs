
using crmonaspdotnet.Service;
using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Api;

public static class PriceBookEndpoints
{
    public static IEndpointRouteBuilder MapPriceBookEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/priceBook").WithTags("PriceBooks");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignOrganization", AssignOrganization);
        group.MapPut("/unassignOrganization", UnassignOrganization);

        group.MapPut("/addToEntries", AddToEntries);
        group.MapPut("/removeFromEntries", RemoveFromEntries);

        group.MapPut("/addToQuotes", AddToQuotes);
        group.MapPut("/removeFromQuotes", RemoveFromQuotes);

        group.MapPut("/addToOrders", AddToOrders);
        group.MapPut("/removeFromOrders", RemoveFromOrders);


        return app;
    }

    private static async Task<IResult> Create(
        PriceBookRequest request,
        IPriceBookService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToPriceBook(request);

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
        PriceBookRequest request,
        IPriceBookService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToPriceBook(request);

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
        IPriceBookService service,
        CancellationToken cancellationToken)
    {

        var priceBook = await service.Get(identifier, cancellationToken);
        return priceBook is null ? Results.NotFound() : Results.Ok(priceBook);
    }


    private static async Task<IResult> GetAll(
        IPriceBookService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(PriceBookResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IPriceBookService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOrganization(
        AssociationRequest request,
        IPriceBookService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignOrganization(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOrganization(
    AssociationRequest request,
    IPriceBookService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignOrganization(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToEntries(
        MultipleAssociationRequest request,
        IPriceBookService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToEntries(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromEntries(
        MultipleAssociationRequest request,
        IPriceBookService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromEntries(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToQuotes(
        MultipleAssociationRequest request,
        IPriceBookService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToQuotes(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromQuotes(
        MultipleAssociationRequest request,
        IPriceBookService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromQuotes(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToOrders(
        MultipleAssociationRequest request,
        IPriceBookService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToOrders(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromOrders(
        MultipleAssociationRequest request,
        IPriceBookService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromOrders(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static PriceBook mapRequestToPriceBook(PriceBookRequest request)
    {
        var model = new PriceBook
        {
            Id = request.Id,
            Name = request.Name,
            AsActive = request.AsActive,
            Description = request.Description,
        };
        return model;
    }

}
