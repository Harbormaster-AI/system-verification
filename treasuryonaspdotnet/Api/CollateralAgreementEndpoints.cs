
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class CollateralAgreementEndpoints
{
    public static IEndpointRouteBuilder MapCollateralAgreementEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/collateralAgreement").WithTags("CollateralAgreements");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignNettingAgreement", AssignNettingAgreement);
        group.MapPut("/unassignNettingAgreement", UnassignNettingAgreement);
        group.MapPut("/assignCounterparty", AssignCounterparty);
        group.MapPut("/unassignCounterparty", UnassignCounterparty);

        group.MapPut("/addToMarginCalls", AddToMarginCalls);
        group.MapPut("/removeFromMarginCalls", RemoveFromMarginCalls);

        group.MapPut("/addToCollateralAccounts", AddToCollateralAccounts);
        group.MapPut("/removeFromCollateralAccounts", RemoveFromCollateralAccounts);


        return app;
    }

    private static async Task<IResult> Create(
        CollateralAgreementRequest request,
        ICollateralAgreementService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToCollateralAgreement(request);

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
        CollateralAgreementRequest request,
        ICollateralAgreementService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToCollateralAgreement(request);

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
        ICollateralAgreementService service,
        CancellationToken cancellationToken)
    {

        var collateralAgreement = await service.Get(identifier, cancellationToken);
        return collateralAgreement is null ? Results.NotFound() : Results.Ok(collateralAgreement);
    }


    private static async Task<IResult> GetAll(
        ICollateralAgreementService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(CollateralAgreementResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ICollateralAgreementService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignNettingAgreement(
        AssociationRequest request,
        ICollateralAgreementService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignNettingAgreement(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignNettingAgreement(
    AssociationRequest request,
    ICollateralAgreementService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignNettingAgreement(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignCounterparty(
        AssociationRequest request,
        ICollateralAgreementService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignCounterparty(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignCounterparty(
    AssociationRequest request,
    ICollateralAgreementService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignCounterparty(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToMarginCalls(
        MultipleAssociationRequest request,
        ICollateralAgreementService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToMarginCalls(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromMarginCalls(
        MultipleAssociationRequest request,
        ICollateralAgreementService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromMarginCalls(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToCollateralAccounts(
        MultipleAssociationRequest request,
        ICollateralAgreementService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToCollateralAccounts(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromCollateralAccounts(
        MultipleAssociationRequest request,
        ICollateralAgreementService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromCollateralAccounts(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static CollateralAgreement mapRequestToCollateralAgreement(CollateralAgreementRequest request)
    {
        var model = new CollateralAgreement
        {
            Id = request.Id,
            Threshold = request.Threshold,
            MinimumTransferAmount = request.MinimumTransferAmount,
            IndependentAmount = request.IndependentAmount,
            MarginFrequency = request.MarginFrequency,
            AgreementType = request.AgreementType,
            EligibleCollateral = request.EligibleCollateral,
        };
        return model;
    }

}
