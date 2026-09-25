
using crmonaspdotnet.Service;
using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Api;

public static class PriceBookEntryEndpoints
{
    public static IEndpointRouteBuilder MapPriceBookEntryEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/priceBookEntry").WithTags("PriceBookEntrys");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignPriceBook", AssignPriceBook);
        group.MapPut("/unassignPriceBook", UnassignPriceBook);
        group.MapPut("/assignProduct", AssignProduct);
        group.MapPut("/unassignProduct", UnassignProduct);


        return app;
    }

    private static async Task<IResult> Create(
        PriceBookEntryRequest request,
        IPriceBookEntryService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToPriceBookEntry(request);

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
        PriceBookEntryRequest request,
        IPriceBookEntryService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToPriceBookEntry(request);

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
        IPriceBookEntryService service,
        CancellationToken cancellationToken)
    {

        var priceBookEntry = await service.Get(identifier, cancellationToken);
        return priceBookEntry is null ? Results.NotFound() : Results.Ok(priceBookEntry);
    }


    private static async Task<IResult> GetAll(
        IPriceBookEntryService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(PriceBookEntryResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IPriceBookEntryService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignPriceBook(
        AssociationRequest request,
        IPriceBookEntryService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignPriceBook(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignPriceBook(
    AssociationRequest request,
    IPriceBookEntryService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignPriceBook(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignProduct(
        AssociationRequest request,
        IPriceBookEntryService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignProduct(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignProduct(
    AssociationRequest request,
    IPriceBookEntryService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignProduct(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static PriceBookEntry mapRequestToPriceBookEntry(PriceBookEntryRequest request)
    {
        var model = new PriceBookEntry
        {
            Id = request.Id,
            UnitPrice = request.UnitPrice,
            EffectiveDate = request.EffectiveDate,
            ExpirationDate = request.ExpirationDate,
            AsActive = request.AsActive,
        };
        return model;
    }

}
