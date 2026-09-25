
using crmonaspdotnet.Service;
using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Api;

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

        group.MapPut("/assignOrganization", AssignOrganization);
        group.MapPut("/unassignOrganization", UnassignOrganization);
        group.MapPut("/assignParentAccount", AssignParentAccount);
        group.MapPut("/unassignParentAccount", UnassignParentAccount);
        group.MapPut("/assignOwner", AssignOwner);
        group.MapPut("/unassignOwner", UnassignOwner);
        group.MapPut("/assignTerritory", AssignTerritory);
        group.MapPut("/unassignTerritory", UnassignTerritory);

        group.MapPut("/addToChildAccounts", AddToChildAccounts);
        group.MapPut("/removeFromChildAccounts", RemoveFromChildAccounts);

        group.MapPut("/addToContacts", AddToContacts);
        group.MapPut("/removeFromContacts", RemoveFromContacts);

        group.MapPut("/addToOpportunities", AddToOpportunities);
        group.MapPut("/removeFromOpportunities", RemoveFromOpportunities);

        group.MapPut("/addToCases", AddToCases);
        group.MapPut("/removeFromCases", RemoveFromCases);

        group.MapPut("/addToActivities", AddToActivities);
        group.MapPut("/removeFromActivities", RemoveFromActivities);

        group.MapPut("/addToCampaigns", AddToCampaigns);
        group.MapPut("/removeFromCampaigns", RemoveFromCampaigns);

        group.MapPut("/addToQuotes", AddToQuotes);
        group.MapPut("/removeFromQuotes", RemoveFromQuotes);

        group.MapPut("/addToOrders", AddToOrders);
        group.MapPut("/removeFromOrders", RemoveFromOrders);

        group.MapPut("/addToContracts", AddToContracts);
        group.MapPut("/removeFromContracts", RemoveFromContracts);

        group.MapPut("/addToNotes", AddToNotes);
        group.MapPut("/removeFromNotes", RemoveFromNotes);

        group.MapPut("/addToEmailMessages", AddToEmailMessages);
        group.MapPut("/removeFromEmailMessages", RemoveFromEmailMessages);


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

    private static async Task<IResult> AssignOrganization(
        AssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignOrganization(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOrganization(
    AssociationRequest request,
    IAccountService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignOrganization(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignParentAccount(
        AssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignParentAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignParentAccount(
    AssociationRequest request,
    IAccountService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignParentAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOwner(
        AssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignOwner(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOwner(
    AssociationRequest request,
    IAccountService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignOwner(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignTerritory(
        AssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignTerritory(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignTerritory(
    AssociationRequest request,
    IAccountService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignTerritory(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToChildAccounts(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToChildAccounts(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromChildAccounts(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromChildAccounts(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToContacts(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToContacts(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromContacts(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromContacts(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToOpportunities(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToOpportunities(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromOpportunities(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromOpportunities(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToCases(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToCases(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromCases(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromCases(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToActivities(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToActivities(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromActivities(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromActivities(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToCampaigns(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToCampaigns(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromCampaigns(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromCampaigns(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToQuotes(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToQuotes(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromQuotes(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromQuotes(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToOrders(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToOrders(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromOrders(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromOrders(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToContracts(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToContracts(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromContracts(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromContracts(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToNotes(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToNotes(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromNotes(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromNotes(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToEmailMessages(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToEmailMessages(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromEmailMessages(
        MultipleAssociationRequest request,
        IAccountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromEmailMessages(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static Account mapRequestToAccount(AccountRequest request)
    {
        var model = new Account
        {
            Id = request.Id,
            Name = request.Name,
            AccountNumber = request.AccountNumber,
            Industry = request.Industry,
            BillingAddress = request.BillingAddress,
            ShippingAddress = request.ShippingAddress,
            Website = request.Website,
            Phone = request.Phone,
            AsActive = request.AsActive,
            AccountType = request.AccountType,
            LifecycleStage = request.LifecycleStage,
        };
        return model;
    }

}
