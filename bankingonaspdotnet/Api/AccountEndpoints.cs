
using bankingonaspdotnet.Service;
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Api;

public static class AccountEndpoints
{
    public static IEndpointRouteBuilder MapAccountEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/account").WithTags("Accounts");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignBank", AssignBank);
        group.MapPut("/unassignBank", UnassignBank);
        group.MapPut("/assignBranch", AssignBranch);
        group.MapPut("/unassignBranch", UnassignBranch);
        group.MapPut("/assignProduct", AssignProduct);
        group.MapPut("/unassignProduct", UnassignProduct);

        group.MapPut("/addToOwners", AddToOwners);
        group.MapPut("/removeFromOwners", RemoveFromOwners);

        group.MapPut("/addToTransactions", AddToTransactions);
        group.MapPut("/removeFromTransactions", RemoveFromTransactions);

        group.MapPut("/addToStatements", AddToStatements);
        group.MapPut("/removeFromStatements", RemoveFromStatements);

        group.MapPut("/addToStandingInstructions", AddToStandingInstructions);
        group.MapPut("/removeFromStandingInstructions", RemoveFromStandingInstructions);

        group.MapPut("/addToFeeCharges", AddToFeeCharges);
        group.MapPut("/removeFromFeeCharges", RemoveFromFeeCharges);


        return app;
    }

    private static async Task<IResult> Create(
        AccountRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToAccount(request);

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
        AccountRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToAccount(request);

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
        IAccountService service,
        CancellationToken cancellationToken)
    {

        var account = await service.Get(identifier, cancellationToken);
        return account is null ? Results.NotFound() : Results.Ok(account);
    }


    private static async Task<IResult> GetAll(
        IAccountService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(AccountResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignBank(
        AssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignBank(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignBank(
    AssociationRequest request,
    IAccountService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignBank(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignBranch(
        AssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignBranch(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignBranch(
    AssociationRequest request,
    IAccountService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignBranch(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignProduct(
        AssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignProduct(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignProduct(
    AssociationRequest request,
    IAccountService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignProduct(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToOwners(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToOwners(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromOwners(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromOwners(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToTransactions(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToTransactions(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromTransactions(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromTransactions(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToStatements(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToStatements(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromStatements(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromStatements(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToStandingInstructions(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToStandingInstructions(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromStandingInstructions(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromStandingInstructions(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToFeeCharges(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToFeeCharges(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromFeeCharges(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromFeeCharges(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static Account mapRequestToAccount(AccountRequest request)
    {
        var model = new Account
        {
            Id = request.Id,
            AccountNumber = request.AccountNumber,
            Iban = request.Iban,
            AccountName = request.AccountName,
            Currency = request.Currency,
            OpenedOn = request.OpenedOn,
            ClosedOn = request.ClosedOn,
            AccountType = request.AccountType,
            OwnershipType = request.OwnershipType,
            Status = request.Status,
        };
        return model;
    }

}
