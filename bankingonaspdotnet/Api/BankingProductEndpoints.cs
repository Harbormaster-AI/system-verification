
using bankingonaspdotnet.Service;
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Api;

public static class BankingProductEndpoints
{
    public static IEndpointRouteBuilder MapBankingProductEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/bankingProduct").WithTags("BankingProducts");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignBank", AssignBank);
        group.MapPut("/unassignBank", UnassignBank);

    group.MapPut("/addToAccounts", AddToAccounts);
    group.MapPut("/removeFromAccounts", RemoveFromAccounts);

    group.MapPut("/addToLoanAccounts", AddToLoanAccounts);
    group.MapPut("/removeFromLoanAccounts", RemoveFromLoanAccounts);

    group.MapPut("/addToPaymentCards", AddToPaymentCards);
    group.MapPut("/removeFromPaymentCards", RemoveFromPaymentCards);


        return app;
    }

    private static async Task<IResult> Create(
        BankingProductRequest request,
        IBankingProductService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToBankingProduct( request );

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
        BankingProductRequest request,
        IBankingProductService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToBankingProduct( request );

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
        IBankingProductService service,
        CancellationToken cancellationToken) {

        var bankingProduct = await service.Get(identifier, cancellationToken);
        return bankingProduct is null ? Results.NotFound() : Results.Ok( bankingProduct );
    }


    private static async Task<IResult> GetAll(
        IBankingProductService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( BankingProductResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IBankingProductService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignBank(
        AssociationRequest request,
        IBankingProductService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignBank(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignBank(
    AssociationRequest request,
    IBankingProductService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignBank(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToAccounts(
        MultipleAssociationRequest request,
        IBankingProductService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToAccounts(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromAccounts(
        MultipleAssociationRequest request,
        IBankingProductService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromAccounts(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToLoanAccounts(
        MultipleAssociationRequest request,
        IBankingProductService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToLoanAccounts(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromLoanAccounts(
        MultipleAssociationRequest request,
        IBankingProductService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromLoanAccounts(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToPaymentCards(
        MultipleAssociationRequest request,
        IBankingProductService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToPaymentCards(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromPaymentCards(
        MultipleAssociationRequest request,
        IBankingProductService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromPaymentCards(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static BankingProduct mapRequestToBankingProduct( BankingProductRequest request ) {
        var model = new BankingProduct
        {
            Id = request.Id,
            ProductCode = request.ProductCode,
            Name = request.Name,
            Description = request.Description,
            ProductCategory = request.ProductCategory,
        };
        return model;
    }

}
