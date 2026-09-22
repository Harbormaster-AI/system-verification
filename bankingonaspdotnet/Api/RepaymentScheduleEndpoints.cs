using bankingonaspdotnet.Service;
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Api;

public static class RepaymentScheduleEndpoints
{
    public static IEndpointRouteBuilder MapRepaymentScheduleEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/repaymentSchedule").WithTags("RepaymentSchedules");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignLoanAccount", AssignLoanAccount);
        group.MapPut("/unassignLoanAccount", UnassignLoanAccount);
        group.MapPut("/assignPayment", AssignPayment);
        group.MapPut("/unassignPayment", UnassignPayment);


        return app;
    }

    private static async Task<IResult> Create(
        RepaymentScheduleRequest request,
        IRepaymentScheduleService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToRepaymentSchedule( request );

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
        RepaymentScheduleRequest request,
        IRepaymentScheduleService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToRepaymentSchedule( request );

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
        IRepaymentScheduleService service,
        CancellationToken cancellationToken) {

        var repaymentSchedule = await service.Get(identifier, cancellationToken);
        return repaymentSchedule is null ? Results.NotFound() : Results.Ok( repaymentSchedule );
    }


    private static async Task<IResult> GetAll(
        IRepaymentScheduleService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( RepaymentScheduleResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IRepaymentScheduleService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignLoanAccount(
        AssociationRequest request,
        IRepaymentScheduleService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignLoanAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignLoanAccount(
    AssociationRequest request,
    IRepaymentScheduleService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignLoanAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignPayment(
        AssociationRequest request,
        IRepaymentScheduleService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignPayment(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignPayment(
    AssociationRequest request,
    IRepaymentScheduleService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignPayment(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static RepaymentSchedule mapRequestToRepaymentSchedule( RepaymentScheduleRequest request ) {
        var model = new RepaymentSchedule
        {
            Id = request.Id,
            InstallmentNumber = request.InstallmentNumber,
            DueDate = request.DueDate,
            PrincipalDue = request.PrincipalDue,
            InterestDue = request.InterestDue,
            TotalDue = request.TotalDue,
            Status = request.Status,
        };
        return model;
    }

}
