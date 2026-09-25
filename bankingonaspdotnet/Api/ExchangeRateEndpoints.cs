
using bankingonaspdotnet.Service;
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Api;

public static class ExchangeRateEndpoints
{
    public static IEndpointRouteBuilder MapExchangeRateEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/exchangeRate").WithTags("ExchangeRates");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignBank", AssignBank);
        group.MapPut("/unassignBank", UnassignBank);

        group.MapPut("/addToFxTrades", AddToFxTrades);
        group.MapPut("/removeFromFxTrades", RemoveFromFxTrades);


        return app;
    }

    private static async Task<IResult> Create(
        ExchangeRateRequest request,
        IExchangeRateService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToExchangeRate(request);

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
        ExchangeRateRequest request,
        IExchangeRateService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToExchangeRate(request);

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
        IExchangeRateService service,
        CancellationToken cancellationToken)
    {

        var exchangeRate = await service.Get(identifier, cancellationToken);
        return exchangeRate is null ? Results.NotFound() : Results.Ok(exchangeRate);
    }


    private static async Task<IResult> GetAll(
        IExchangeRateService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(ExchangeRateResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IExchangeRateService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignBank(
        AssociationRequest request,
        IExchangeRateService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignBank(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignBank(
    AssociationRequest request,
    IExchangeRateService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignBank(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToFxTrades(
        MultipleAssociationRequest request,
        IExchangeRateService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToFxTrades(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromFxTrades(
        MultipleAssociationRequest request,
        IExchangeRateService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromFxTrades(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static ExchangeRate mapRequestToExchangeRate(ExchangeRateRequest request)
    {
        var model = new ExchangeRate
        {
            Id = request.Id,
            BaseCurrency = request.BaseCurrency,
            CounterCurrency = request.CounterCurrency,
            Rate = request.Rate,
            AsOf = request.AsOf,
            Source = request.Source,
        };
        return model;
    }

}
