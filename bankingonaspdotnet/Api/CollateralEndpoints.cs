using bankingonaspdotnet.Service;
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Api;

public static class CollateralEndpoints
{
    public static IEndpointRouteBuilder MapCollateralEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/collateral").WithTags("Collaterals");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignLoanAccount", AssignLoanAccount);
        group.MapPut("/unassignLoanAccount", UnassignLoanAccount);


        return app;
    }

    private static async Task<IResult> Create(
        CollateralRequest request,
        ICollateralService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToCollateral( request );

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
        CollateralRequest request,
        ICollateralService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToCollateral( request );

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
        ICollateralService service,
        CancellationToken cancellationToken) {

        var collateral = await service.Get(identifier, cancellationToken);
        return collateral is null ? Results.NotFound() : Results.Ok( collateral );
    }


    private static async Task<IResult> GetAll(
        ICollateralService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( CollateralResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ICollateralService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignLoanAccount(
        AssociationRequest request,
        ICollateralService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignLoanAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignLoanAccount(
    AssociationRequest request,
    ICollateralService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignLoanAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static Collateral mapRequestToCollateral( CollateralRequest request ) {
        var model = new Collateral
        {
            Id = request.Id,
            CollateralIdentifier = request.CollateralIdentifier,
            AppraisedValue = request.AppraisedValue,
            Description = request.Description,
            Location = request.Location,
            CollateralType = request.CollateralType,
        };
        return model;
    }

}
