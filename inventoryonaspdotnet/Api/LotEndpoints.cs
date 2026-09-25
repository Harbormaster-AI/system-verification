
using inventoryonaspdotnet.Service;
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Api;

public static class LotEndpoints
{
    public static IEndpointRouteBuilder MapLotEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/lot").WithTags("Lots");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignSku", AssignSku);
        group.MapPut("/unassignSku", UnassignSku);

    group.MapPut("/addToInventoryItems", AddToInventoryItems);
    group.MapPut("/removeFromInventoryItems", RemoveFromInventoryItems);


        return app;
    }

    private static async Task<IResult> Create(
        LotRequest request,
        ILotService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToLot( request );

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
        LotRequest request,
        ILotService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToLot( request );

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
        ILotService service,
        CancellationToken cancellationToken) {

        var lot = await service.Get(identifier, cancellationToken);
        return lot is null ? Results.NotFound() : Results.Ok( lot );
    }


    private static async Task<IResult> GetAll(
        ILotService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( LotResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ILotService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignSku(
        AssociationRequest request,
        ILotService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignSku(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignSku(
    AssociationRequest request,
    ILotService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignSku(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToInventoryItems(
        MultipleAssociationRequest request,
        ILotService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToInventoryItems(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromInventoryItems(
        MultipleAssociationRequest request,
        ILotService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromInventoryItems(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static Lot mapRequestToLot( LotRequest request ) {
        var model = new Lot
        {
            Id = request.Id,
            BatchNumber = request.BatchNumber,
            ManufactureDate = request.ManufactureDate,
            ExpirationDate = request.ExpirationDate,
            LotStatus = request.LotStatus,
        };
        return model;
    }

}
