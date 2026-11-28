
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class CounterpartyEndpoints
{
    public static IEndpointRouteBuilder MapCounterpartyEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/counterparty").WithTags("Counterpartys");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);


        group.MapPut("/addToNettingAgreements", AddToNettingAgreements);
        group.MapPut("/removeFromNettingAgreements", RemoveFromNettingAgreements);

        group.MapPut("/addToTrades", AddToTrades);
        group.MapPut("/removeFromTrades", RemoveFromTrades);

        group.MapPut("/addToCollateralAgreements", AddToCollateralAgreements);
        group.MapPut("/removeFromCollateralAgreements", RemoveFromCollateralAgreements);

        group.MapPut("/addToLimits", AddToLimits);
        group.MapPut("/removeFromLimits", RemoveFromLimits);

        group.MapPut("/addToMarginCalls", AddToMarginCalls);
        group.MapPut("/removeFromMarginCalls", RemoveFromMarginCalls);

        group.MapPut("/addToSettlementInstructions", AddToSettlementInstructions);
        group.MapPut("/removeFromSettlementInstructions", RemoveFromSettlementInstructions);


        return app;
    }

    private static async Task<IResult> Create(
        CounterpartyRequest request,
        ICounterpartyService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToCounterparty(request);

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
        CounterpartyRequest request,
        ICounterpartyService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToCounterparty(request);

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
        ICounterpartyService service,
        CancellationToken cancellationToken)
    {

        var counterparty = await service.Get(identifier, cancellationToken);
        return counterparty is null ? Results.NotFound() : Results.Ok(counterparty);
    }


    private static async Task<IResult> GetAll(
        ICounterpartyService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(CounterpartyResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ICounterpartyService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToNettingAgreements(
        MultipleAssociationRequest request,
        ICounterpartyService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToNettingAgreements(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromNettingAgreements(
        MultipleAssociationRequest request,
        ICounterpartyService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromNettingAgreements(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToTrades(
        MultipleAssociationRequest request,
        ICounterpartyService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToTrades(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromTrades(
        MultipleAssociationRequest request,
        ICounterpartyService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromTrades(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToCollateralAgreements(
        MultipleAssociationRequest request,
        ICounterpartyService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToCollateralAgreements(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromCollateralAgreements(
        MultipleAssociationRequest request,
        ICounterpartyService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromCollateralAgreements(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToLimits(
        MultipleAssociationRequest request,
        ICounterpartyService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToLimits(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromLimits(
        MultipleAssociationRequest request,
        ICounterpartyService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromLimits(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToMarginCalls(
        MultipleAssociationRequest request,
        ICounterpartyService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToMarginCalls(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromMarginCalls(
        MultipleAssociationRequest request,
        ICounterpartyService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromMarginCalls(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToSettlementInstructions(
        MultipleAssociationRequest request,
        ICounterpartyService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToSettlementInstructions(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromSettlementInstructions(
        MultipleAssociationRequest request,
        ICounterpartyService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromSettlementInstructions(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static Counterparty mapRequestToCounterparty(CounterpartyRequest request)
    {
        var model = new Counterparty
        {
            Id = request.Id,
            LegalName = request.LegalName,
            Lei = request.Lei,
            Sector = request.Sector,
            DomicileCountry = request.DomicileCountry,
            CreditRating = request.CreditRating,
        };
        return model;
    }

}
