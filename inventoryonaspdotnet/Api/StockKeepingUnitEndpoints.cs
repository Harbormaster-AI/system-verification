
using inventoryonaspdotnet.Service;
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Api;

public static class StockKeepingUnitEndpoints
{
    public static IEndpointRouteBuilder MapStockKeepingUnitEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/stockKeepingUnit").WithTags("StockKeepingUnits");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);


    group.MapPut("/addToInventoryItems", AddToInventoryItems);
    group.MapPut("/removeFromInventoryItems", RemoveFromInventoryItems);

    group.MapPut("/addToUomConversions", AddToUomConversions);
    group.MapPut("/removeFromUomConversions", RemoveFromUomConversions);

    group.MapPut("/addToReplenishmentPolicies", AddToReplenishmentPolicies);
    group.MapPut("/removeFromReplenishmentPolicies", RemoveFromReplenishmentPolicies);

    group.MapPut("/addToLots", AddToLots);
    group.MapPut("/removeFromLots", RemoveFromLots);

    group.MapPut("/addToSerialNumbers", AddToSerialNumbers);
    group.MapPut("/removeFromSerialNumbers", RemoveFromSerialNumbers);


        return app;
    }

    private static async Task<IResult> Create(
        StockKeepingUnitRequest request,
        IStockKeepingUnitService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToStockKeepingUnit( request );

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
        StockKeepingUnitRequest request,
        IStockKeepingUnitService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToStockKeepingUnit( request );

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
        IStockKeepingUnitService service,
        CancellationToken cancellationToken) {

        var stockKeepingUnit = await service.Get(identifier, cancellationToken);
        return stockKeepingUnit is null ? Results.NotFound() : Results.Ok( stockKeepingUnit );
    }


    private static async Task<IResult> GetAll(
        IStockKeepingUnitService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( StockKeepingUnitResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IStockKeepingUnitService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToInventoryItems(
        MultipleAssociationRequest request,
        IStockKeepingUnitService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToInventoryItems(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromInventoryItems(
        MultipleAssociationRequest request,
        IStockKeepingUnitService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromInventoryItems(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToUomConversions(
        MultipleAssociationRequest request,
        IStockKeepingUnitService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToUomConversions(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromUomConversions(
        MultipleAssociationRequest request,
        IStockKeepingUnitService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromUomConversions(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToReplenishmentPolicies(
        MultipleAssociationRequest request,
        IStockKeepingUnitService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToReplenishmentPolicies(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromReplenishmentPolicies(
        MultipleAssociationRequest request,
        IStockKeepingUnitService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromReplenishmentPolicies(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToLots(
        MultipleAssociationRequest request,
        IStockKeepingUnitService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToLots(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromLots(
        MultipleAssociationRequest request,
        IStockKeepingUnitService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromLots(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToSerialNumbers(
        MultipleAssociationRequest request,
        IStockKeepingUnitService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToSerialNumbers(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromSerialNumbers(
        MultipleAssociationRequest request,
        IStockKeepingUnitService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromSerialNumbers(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static StockKeepingUnit mapRequestToStockKeepingUnit( StockKeepingUnitRequest request ) {
        var model = new StockKeepingUnit
        {
            Id = request.Id,
            SkuCode = request.SkuCode,
            Name = request.Name,
            Weight = request.Weight,
            WeightUnit = request.WeightUnit,
            Volume = request.Volume,
            VolumeUnit = request.VolumeUnit,
            ShelfLifeDays = request.ShelfLifeDays,
            HazardousMaterial = request.HazardousMaterial,
            ItemType = request.ItemType,
            UnitOfMeasure = request.UnitOfMeasure,
        };
        return model;
    }

}
