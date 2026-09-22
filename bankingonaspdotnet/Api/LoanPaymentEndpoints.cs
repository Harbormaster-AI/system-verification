using bankingonaspdotnet.Service;
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Api;

public static class LoanPaymentEndpoints
{
    public static IEndpointRouteBuilder MapLoanPaymentEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/loanPayment").WithTags("LoanPayments");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignLoanAccount", AssignLoanAccount);
        group.MapPut("/unassignLoanAccount", UnassignLoanAccount);
        group.MapPut("/assignTransaction", AssignTransaction);
        group.MapPut("/unassignTransaction", UnassignTransaction);


        return app;
    }

    private static async Task<IResult> Create(
        LoanPaymentRequest request,
        ILoanPaymentService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToLoanPayment(request);

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
        LoanPaymentRequest request,
        ILoanPaymentService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToLoanPayment(request);

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
        ILoanPaymentService service,
        CancellationToken cancellationToken)
    {

        var loanPayment = await service.Get(identifier, cancellationToken);
        return loanPayment is null ? Results.NotFound() : Results.Ok(loanPayment);
    }


    private static async Task<IResult> GetAll(
        ILoanPaymentService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(LoanPaymentResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ILoanPaymentService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignLoanAccount(
        AssociationRequest request,
        ILoanPaymentService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignLoanAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignLoanAccount(
    AssociationRequest request,
    ILoanPaymentService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignLoanAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignTransaction(
        AssociationRequest request,
        ILoanPaymentService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignTransaction(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignTransaction(
    AssociationRequest request,
    ILoanPaymentService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignTransaction(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static LoanPayment mapRequestToLoanPayment(LoanPaymentRequest request)
    {
        var model = new LoanPayment
        {
            Id = request.Id,
            PaymentReference = request.PaymentReference,
            Amount = request.Amount,
            PaymentDate = request.PaymentDate,
            Method = request.Method,
            Status = request.Status,
        };
        return model;
    }

}
