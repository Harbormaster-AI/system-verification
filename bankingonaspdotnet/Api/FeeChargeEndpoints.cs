using bankingonaspdotnet.Service;
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Api;

public static class FeeChargeEndpoints
{
    public static IEndpointRouteBuilder MapFeeChargeEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/feeCharge").WithTags("FeeCharges");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignAccount", AssignAccount);
        group.MapPut("/unassignAccount", UnassignAccount);
        group.MapPut("/assignLoanAccount", AssignLoanAccount);
        group.MapPut("/unassignLoanAccount", UnassignLoanAccount);


        return app;
    }

    private static async Task<IResult> Create(
        FeeChargeRequest request,
        IFeeChargeService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToFeeCharge(request);

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
        FeeChargeRequest request,
        IFeeChargeService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToFeeCharge(request);

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
        IFeeChargeService service,
        CancellationToken cancellationToken)
    {

        var feeCharge = await service.Get(identifier, cancellationToken);
        return feeCharge is null ? Results.NotFound() : Results.Ok(feeCharge);
    }


    private static async Task<IResult> GetAll(
        IFeeChargeService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(FeeChargeResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IFeeChargeService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignAccount(
        AssociationRequest request,
        IFeeChargeService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignAccount(
    AssociationRequest request,
    IFeeChargeService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignLoanAccount(
        AssociationRequest request,
        IFeeChargeService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignLoanAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignLoanAccount(
    AssociationRequest request,
    IFeeChargeService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignLoanAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static FeeCharge mapRequestToFeeCharge(FeeChargeRequest request)
    {
        var model = new FeeCharge
        {
            Id = request.Id,
            FeeCode = request.FeeCode,
            Amount = request.Amount,
            AppliedOn = request.AppliedOn,
            FeeType = request.FeeType,
        };
        return model;
    }

}
