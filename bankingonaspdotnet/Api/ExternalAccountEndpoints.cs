
using bankingonaspdotnet.Service;
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Api;

public static class ExternalAccountEndpoints
{
    public static IEndpointRouteBuilder MapExternalAccountEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/externalAccount").WithTags("ExternalAccounts");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignCustomer", AssignCustomer);
        group.MapPut("/unassignCustomer", UnassignCustomer);

        group.MapPut("/addToTransactions", AddToTransactions);
        group.MapPut("/removeFromTransactions", RemoveFromTransactions);


        return app;
    }

    private static async Task<IResult> Create(
        ExternalAccountRequest request,
        IExternalAccountService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToExternalAccount(request);

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
        ExternalAccountRequest request,
        IExternalAccountService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToExternalAccount(request);

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
        IExternalAccountService service,
        CancellationToken cancellationToken)
    {

        var externalAccount = await service.Get(identifier, cancellationToken);
        return externalAccount is null ? Results.NotFound() : Results.Ok(externalAccount);
    }


    private static async Task<IResult> GetAll(
        IExternalAccountService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(ExternalAccountResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IExternalAccountService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignCustomer(
        AssociationRequest request,
        IExternalAccountService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignCustomer(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignCustomer(
    AssociationRequest request,
    IExternalAccountService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignCustomer(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToTransactions(
        MultipleAssociationRequest request,
        IExternalAccountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToTransactions(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromTransactions(
        MultipleAssociationRequest request,
        IExternalAccountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromTransactions(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static ExternalAccount mapRequestToExternalAccount(ExternalAccountRequest request)
    {
        var model = new ExternalAccount
        {
            Id = request.Id,
            Name = request.Name,
            Iban = request.Iban,
            AccountNumber = request.AccountNumber,
            Bic = request.Bic,
            BankName = request.BankName,
            Country = request.Country,
        };
        return model;
    }

}
