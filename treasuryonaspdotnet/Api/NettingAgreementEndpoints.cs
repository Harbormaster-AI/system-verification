
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class NettingAgreementEndpoints
{
    public static IEndpointRouteBuilder MapNettingAgreementEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/nettingAgreement").WithTags("NettingAgreements");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignCounterparty", AssignCounterparty);
        group.MapPut("/unassignCounterparty", UnassignCounterparty);

        group.MapPut("/addToCollateralAgreements", AddToCollateralAgreements);
        group.MapPut("/removeFromCollateralAgreements", RemoveFromCollateralAgreements);

        group.MapPut("/addToTrades", AddToTrades);
        group.MapPut("/removeFromTrades", RemoveFromTrades);


        return app;
    }

    private static async Task<IResult> Create(
        NettingAgreementRequest request,
        INettingAgreementService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToNettingAgreement(request);

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
        NettingAgreementRequest request,
        INettingAgreementService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToNettingAgreement(request);

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
        INettingAgreementService service,
        CancellationToken cancellationToken)
    {

        var nettingAgreement = await service.Get(identifier, cancellationToken);
        return nettingAgreement is null ? Results.NotFound() : Results.Ok(nettingAgreement);
    }


    private static async Task<IResult> GetAll(
        INettingAgreementService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(NettingAgreementResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        INettingAgreementService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignCounterparty(
        AssociationRequest request,
        INettingAgreementService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignCounterparty(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignCounterparty(
    AssociationRequest request,
    INettingAgreementService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignCounterparty(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToCollateralAgreements(
        MultipleAssociationRequest request,
        INettingAgreementService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToCollateralAgreements(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromCollateralAgreements(
        MultipleAssociationRequest request,
        INettingAgreementService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromCollateralAgreements(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToTrades(
        MultipleAssociationRequest request,
        INettingAgreementService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToTrades(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromTrades(
        MultipleAssociationRequest request,
        INettingAgreementService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromTrades(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static NettingAgreement mapRequestToNettingAgreement(NettingAgreementRequest request)
    {
        var model = new NettingAgreement
        {
            Id = request.Id,
            AgreementDate = request.AgreementDate,
            GoverningLaw = request.GoverningLaw,
            AgreementType = request.AgreementType,
        };
        return model;
    }

}
