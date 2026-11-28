
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class CollateralAccountEndpoints
{
    public static IEndpointRouteBuilder MapCollateralAccountEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/collateralAccount").WithTags("CollateralAccounts");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignCollateralAgreement", AssignCollateralAgreement);
        group.MapPut("/unassignCollateralAgreement", UnassignCollateralAgreement);

    group.MapPut("/addToTrades", AddToTrades);
    group.MapPut("/removeFromTrades", RemoveFromTrades);

    group.MapPut("/addToMarginCalls", AddToMarginCalls);
    group.MapPut("/removeFromMarginCalls", RemoveFromMarginCalls);


        return app;
    }

    private static async Task<IResult> Create(
        CollateralAccountRequest request,
        ICollateralAccountService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToCollateralAccount( request );

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
        CollateralAccountRequest request,
        ICollateralAccountService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToCollateralAccount( request );

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
        ICollateralAccountService service,
        CancellationToken cancellationToken) {

        var collateralAccount = await service.Get(identifier, cancellationToken);
        return collateralAccount is null ? Results.NotFound() : Results.Ok( collateralAccount );
    }


    private static async Task<IResult> GetAll(
        ICollateralAccountService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( CollateralAccountResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ICollateralAccountService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignCollateralAgreement(
        AssociationRequest request,
        ICollateralAccountService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignCollateralAgreement(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignCollateralAgreement(
    AssociationRequest request,
    ICollateralAccountService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignCollateralAgreement(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToTrades(
        MultipleAssociationRequest request,
        ICollateralAccountService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToTrades(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromTrades(
        MultipleAssociationRequest request,
        ICollateralAccountService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromTrades(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToMarginCalls(
        MultipleAssociationRequest request,
        ICollateralAccountService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToMarginCalls(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromMarginCalls(
        MultipleAssociationRequest request,
        ICollateralAccountService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromMarginCalls(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static CollateralAccount mapRequestToCollateralAccount( CollateralAccountRequest request ) {
        var model = new CollateralAccount
        {
            Id = request.Id,
            AccountName = request.AccountName,
            CustodyLocation = request.CustodyLocation,
            CollateralType = request.CollateralType,
        };
        return model;
    }

}
