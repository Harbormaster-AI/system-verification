
using bankingonaspdotnet.Service;
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Api;

public static class LoanAccountEndpoints
{
    public static IEndpointRouteBuilder MapLoanAccountEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/loanAccount").WithTags("LoanAccounts");

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

        group.MapPut("/addToBorrowers", AddToBorrowers);
        group.MapPut("/removeFromBorrowers", RemoveFromBorrowers);

        group.MapPut("/addToRepaymentSchedule", AddToRepaymentSchedule);
        group.MapPut("/removeFromRepaymentSchedule", RemoveFromRepaymentSchedule);

        group.MapPut("/addToPayments", AddToPayments);
        group.MapPut("/removeFromPayments", RemoveFromPayments);

        group.MapPut("/addToCollateral", AddToCollateral);
        group.MapPut("/removeFromCollateral", RemoveFromCollateral);

        group.MapPut("/addToFeeCharges", AddToFeeCharges);
        group.MapPut("/removeFromFeeCharges", RemoveFromFeeCharges);


        return app;
    }

    private static async Task<IResult> Create(
        LoanAccountRequest request,
        ILoanAccountService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToLoanAccount(request);

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
        LoanAccountRequest request,
        ILoanAccountService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToLoanAccount(request);

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
        ILoanAccountService service,
        CancellationToken cancellationToken)
    {

        var loanAccount = await service.Get(identifier, cancellationToken);
        return loanAccount is null ? Results.NotFound() : Results.Ok(loanAccount);
    }


    private static async Task<IResult> GetAll(
        ILoanAccountService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(LoanAccountResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ILoanAccountService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignBank(
        AssociationRequest request,
        ILoanAccountService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignBank(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignBank(
    AssociationRequest request,
    ILoanAccountService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignBank(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignBranch(
        AssociationRequest request,
        ILoanAccountService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignBranch(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignBranch(
    AssociationRequest request,
    ILoanAccountService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignBranch(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignProduct(
        AssociationRequest request,
        ILoanAccountService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignProduct(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignProduct(
    AssociationRequest request,
    ILoanAccountService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignProduct(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToBorrowers(
        MultipleAssociationRequest request,
        ILoanAccountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToBorrowers(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromBorrowers(
        MultipleAssociationRequest request,
        ILoanAccountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromBorrowers(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToRepaymentSchedule(
        MultipleAssociationRequest request,
        ILoanAccountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToRepaymentSchedule(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromRepaymentSchedule(
        MultipleAssociationRequest request,
        ILoanAccountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromRepaymentSchedule(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToPayments(
        MultipleAssociationRequest request,
        ILoanAccountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToPayments(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromPayments(
        MultipleAssociationRequest request,
        ILoanAccountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromPayments(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToCollateral(
        MultipleAssociationRequest request,
        ILoanAccountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToCollateral(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromCollateral(
        MultipleAssociationRequest request,
        ILoanAccountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromCollateral(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToFeeCharges(
        MultipleAssociationRequest request,
        ILoanAccountService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToFeeCharges(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromFeeCharges(
        MultipleAssociationRequest request,
        ILoanAccountService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromFeeCharges(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static LoanAccount mapRequestToLoanAccount(LoanAccountRequest request)
    {
        var model = new LoanAccount
        {
            Id = request.Id,
            LoanNumber = request.LoanNumber,
            PrincipalAmount = request.PrincipalAmount,
            OutstandingPrincipal = request.OutstandingPrincipal,
            InterestRate = request.InterestRate,
            OriginationDate = request.OriginationDate,
            MaturityDate = request.MaturityDate,
            PaymentDayOfMonth = request.PaymentDayOfMonth,
            Currency = request.Currency,
            LoanType = request.LoanType,
            RateType = request.RateType,
            Compounding = request.Compounding,
            Status = request.Status,
        };
        return model;
    }

}
