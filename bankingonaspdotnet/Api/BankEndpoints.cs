using bankingonaspdotnet.Service;
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Api;

public static class BankEndpoints
{
    public static IEndpointRouteBuilder MapBankEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/bank").WithTags("Banks");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);


    group.MapPut("/addToBranches", AddToBranches);
    group.MapPut("/removeFromBranches", RemoveFromBranches);

    group.MapPut("/addToProducts", AddToProducts);
    group.MapPut("/removeFromProducts", RemoveFromProducts);

    group.MapPut("/addToCustomers", AddToCustomers);
    group.MapPut("/removeFromCustomers", RemoveFromCustomers);

    group.MapPut("/addToAccounts", AddToAccounts);
    group.MapPut("/removeFromAccounts", RemoveFromAccounts);

    group.MapPut("/addToPaymentCards", AddToPaymentCards);
    group.MapPut("/removeFromPaymentCards", RemoveFromPaymentCards);

    group.MapPut("/addToLoanAccounts", AddToLoanAccounts);
    group.MapPut("/removeFromLoanAccounts", RemoveFromLoanAccounts);

    group.MapPut("/addToExchangeRates", AddToExchangeRates);
    group.MapPut("/removeFromExchangeRates", RemoveFromExchangeRates);

    group.MapPut("/addToConsents", AddToConsents);
    group.MapPut("/removeFromConsents", RemoveFromConsents);

    group.MapPut("/addToThirdPartyProviders", AddToThirdPartyProviders);
    group.MapPut("/removeFromThirdPartyProviders", RemoveFromThirdPartyProviders);


        return app;
    }

    private static async Task<IResult> Create(
        BankRequest request,
        IBankService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToBank( request );

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
        BankRequest request,
        IBankService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToBank( request );

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
        IBankService service,
        CancellationToken cancellationToken) {

        var bank = await service.Get(identifier, cancellationToken);
        return bank is null ? Results.NotFound() : Results.Ok( bank );
    }


    private static async Task<IResult> GetAll(
        IBankService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( BankResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IBankService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToBranches(
        MultipleAssociationRequest request,
        IBankService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToBranches(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromBranches(
        MultipleAssociationRequest request,
        IBankService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromBranches(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToProducts(
        MultipleAssociationRequest request,
        IBankService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToProducts(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromProducts(
        MultipleAssociationRequest request,
        IBankService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromProducts(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToCustomers(
        MultipleAssociationRequest request,
        IBankService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToCustomers(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromCustomers(
        MultipleAssociationRequest request,
        IBankService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromCustomers(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToAccounts(
        MultipleAssociationRequest request,
        IBankService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToAccounts(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromAccounts(
        MultipleAssociationRequest request,
        IBankService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromAccounts(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToPaymentCards(
        MultipleAssociationRequest request,
        IBankService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToPaymentCards(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromPaymentCards(
        MultipleAssociationRequest request,
        IBankService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromPaymentCards(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToLoanAccounts(
        MultipleAssociationRequest request,
        IBankService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToLoanAccounts(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromLoanAccounts(
        MultipleAssociationRequest request,
        IBankService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromLoanAccounts(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToExchangeRates(
        MultipleAssociationRequest request,
        IBankService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToExchangeRates(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromExchangeRates(
        MultipleAssociationRequest request,
        IBankService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromExchangeRates(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToConsents(
        MultipleAssociationRequest request,
        IBankService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToConsents(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromConsents(
        MultipleAssociationRequest request,
        IBankService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromConsents(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToThirdPartyProviders(
        MultipleAssociationRequest request,
        IBankService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToThirdPartyProviders(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromThirdPartyProviders(
        MultipleAssociationRequest request,
        IBankService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromThirdPartyProviders(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static Bank mapRequestToBank( BankRequest request ) {
        var model = new Bank
        {
            Id = request.Id,
            Name = request.Name,
            LegalName = request.LegalName,
            SwiftBic = request.SwiftBic,
            HeadquartersCountry = request.HeadquartersCountry,
            Website = request.Website,
        };
        return model;
    }

}
