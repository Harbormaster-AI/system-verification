using bankingonaspdotnet.Service;
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Api;

public static class CustomerEndpoints
{
    public static IEndpointRouteBuilder MapCustomerEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/customer").WithTags("Customers");

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

        group.MapPut("/addToExternalAccounts", AddToExternalAccounts);
        group.MapPut("/removeFromExternalAccounts", RemoveFromExternalAccounts);

        group.MapPut("/addToFundsTransfers", AddToFundsTransfers);
        group.MapPut("/removeFromFundsTransfers", RemoveFromFundsTransfers);

        group.MapPut("/addToDisputes", AddToDisputes);
        group.MapPut("/removeFromDisputes", RemoveFromDisputes);

        group.MapPut("/addToKycProfiles", AddToKycProfiles);
        group.MapPut("/removeFromKycProfiles", RemoveFromKycProfiles);

        group.MapPut("/addToConsents", AddToConsents);
        group.MapPut("/removeFromConsents", RemoveFromConsents);


        return app;
    }

    private static async Task<IResult> Create(
        CustomerRequest request,
        ICustomerService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToCustomer(request);

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
        CustomerRequest request,
        ICustomerService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToCustomer(request);

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
        ICustomerService service,
        CancellationToken cancellationToken)
    {

        var customer = await service.Get(identifier, cancellationToken);
        return customer is null ? Results.NotFound() : Results.Ok(customer);
    }


    private static async Task<IResult> GetAll(
        ICustomerService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(CustomerResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ICustomerService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignBank(
        AssociationRequest request,
        ICustomerService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignBank(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignBank(
    AssociationRequest request,
    ICustomerService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignBank(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToAccounts(
        MultipleAssociationRequest request,
        ICustomerService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToAccounts(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromAccounts(
        MultipleAssociationRequest request,
        ICustomerService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromAccounts(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToLoanAccounts(
        MultipleAssociationRequest request,
        ICustomerService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToLoanAccounts(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromLoanAccounts(
        MultipleAssociationRequest request,
        ICustomerService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromLoanAccounts(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToPaymentCards(
        MultipleAssociationRequest request,
        ICustomerService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToPaymentCards(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromPaymentCards(
        MultipleAssociationRequest request,
        ICustomerService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromPaymentCards(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToExternalAccounts(
        MultipleAssociationRequest request,
        ICustomerService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToExternalAccounts(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromExternalAccounts(
        MultipleAssociationRequest request,
        ICustomerService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromExternalAccounts(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToFundsTransfers(
        MultipleAssociationRequest request,
        ICustomerService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToFundsTransfers(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromFundsTransfers(
        MultipleAssociationRequest request,
        ICustomerService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromFundsTransfers(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToDisputes(
        MultipleAssociationRequest request,
        ICustomerService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToDisputes(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromDisputes(
        MultipleAssociationRequest request,
        ICustomerService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromDisputes(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToKycProfiles(
        MultipleAssociationRequest request,
        ICustomerService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToKycProfiles(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromKycProfiles(
        MultipleAssociationRequest request,
        ICustomerService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromKycProfiles(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToConsents(
        MultipleAssociationRequest request,
        ICustomerService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToConsents(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromConsents(
        MultipleAssociationRequest request,
        ICustomerService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromConsents(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static Customer mapRequestToCustomer(CustomerRequest request)
    {
        var model = new Customer
        {
            Id = request.Id,
            FirstName = request.FirstName,
            LastName = request.LastName,
            LegalName = request.LegalName,
            DateOfBirth = request.DateOfBirth,
            TaxId = request.TaxId,
            Email = request.Email,
            Phone = request.Phone,
            Address = request.Address,
            CustomerType = request.CustomerType,
            RiskRating = request.RiskRating,
            KycStatus = request.KycStatus,
        };
        return model;
    }

}
