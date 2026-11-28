
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class TreasuryUnitEndpoints
{
    public static IEndpointRouteBuilder MapTreasuryUnitEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/treasuryUnit").WithTags("TreasuryUnits");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);


    group.MapPut("/addToTradingBooks", AddToTradingBooks);
    group.MapPut("/removeFromTradingBooks", RemoveFromTradingBooks);

    group.MapPut("/addToBankAccounts", AddToBankAccounts);
    group.MapPut("/removeFromBankAccounts", RemoveFromBankAccounts);

    group.MapPut("/addToPolicies", AddToPolicies);
    group.MapPut("/removeFromPolicies", RemoveFromPolicies);

    group.MapPut("/addToTransferPricingRules", AddToTransferPricingRules);
    group.MapPut("/removeFromTransferPricingRules", RemoveFromTransferPricingRules);

    group.MapPut("/addToInternalDealsOut", AddToInternalDealsOut);
    group.MapPut("/removeFromInternalDealsOut", RemoveFromInternalDealsOut);

    group.MapPut("/addToInternalDealsIn", AddToInternalDealsIn);
    group.MapPut("/removeFromInternalDealsIn", RemoveFromInternalDealsIn);


        return app;
    }

    private static async Task<IResult> Create(
        TreasuryUnitRequest request,
        ITreasuryUnitService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToTreasuryUnit( request );

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
        TreasuryUnitRequest request,
        ITreasuryUnitService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToTreasuryUnit( request );

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
        ITreasuryUnitService service,
        CancellationToken cancellationToken) {

        var treasuryUnit = await service.Get(identifier, cancellationToken);
        return treasuryUnit is null ? Results.NotFound() : Results.Ok( treasuryUnit );
    }


    private static async Task<IResult> GetAll(
        ITreasuryUnitService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( TreasuryUnitResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ITreasuryUnitService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToTradingBooks(
        MultipleAssociationRequest request,
        ITreasuryUnitService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToTradingBooks(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromTradingBooks(
        MultipleAssociationRequest request,
        ITreasuryUnitService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromTradingBooks(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToBankAccounts(
        MultipleAssociationRequest request,
        ITreasuryUnitService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToBankAccounts(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromBankAccounts(
        MultipleAssociationRequest request,
        ITreasuryUnitService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromBankAccounts(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToPolicies(
        MultipleAssociationRequest request,
        ITreasuryUnitService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToPolicies(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromPolicies(
        MultipleAssociationRequest request,
        ITreasuryUnitService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromPolicies(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToTransferPricingRules(
        MultipleAssociationRequest request,
        ITreasuryUnitService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToTransferPricingRules(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromTransferPricingRules(
        MultipleAssociationRequest request,
        ITreasuryUnitService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromTransferPricingRules(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToInternalDealsOut(
        MultipleAssociationRequest request,
        ITreasuryUnitService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToInternalDealsOut(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromInternalDealsOut(
        MultipleAssociationRequest request,
        ITreasuryUnitService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromInternalDealsOut(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToInternalDealsIn(
        MultipleAssociationRequest request,
        ITreasuryUnitService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToInternalDealsIn(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromInternalDealsIn(
        MultipleAssociationRequest request,
        ITreasuryUnitService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromInternalDealsIn(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static TreasuryUnit mapRequestToTreasuryUnit( TreasuryUnitRequest request ) {
        var model = new TreasuryUnit
        {
            Id = request.Id,
            Name = request.Name,
            Region = request.Region,
            BookingLocation = request.BookingLocation,
            BaseCurrency = request.BaseCurrency,
        };
        return model;
    }

}
