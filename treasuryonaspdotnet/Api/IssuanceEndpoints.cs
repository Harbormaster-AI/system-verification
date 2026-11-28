
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class IssuanceEndpoints
{
    public static IEndpointRouteBuilder MapIssuanceEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/issuance").WithTags("Issuances");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignFundingProgram", AssignFundingProgram);
        group.MapPut("/unassignFundingProgram", UnassignFundingProgram);
        group.MapPut("/assignPortfolio", AssignPortfolio);
        group.MapPut("/unassignPortfolio", UnassignPortfolio);

        group.MapPut("/addToCashFlows", AddToCashFlows);
        group.MapPut("/removeFromCashFlows", RemoveFromCashFlows);


        return app;
    }

    private static async Task<IResult> Create(
        IssuanceRequest request,
        IIssuanceService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToIssuance(request);

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
        IssuanceRequest request,
        IIssuanceService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToIssuance(request);

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
        IIssuanceService service,
        CancellationToken cancellationToken)
    {

        var issuance = await service.Get(identifier, cancellationToken);
        return issuance is null ? Results.NotFound() : Results.Ok(issuance);
    }


    private static async Task<IResult> GetAll(
        IIssuanceService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(IssuanceResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IIssuanceService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignFundingProgram(
        AssociationRequest request,
        IIssuanceService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignFundingProgram(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignFundingProgram(
    AssociationRequest request,
    IIssuanceService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignFundingProgram(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignPortfolio(
        AssociationRequest request,
        IIssuanceService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignPortfolio(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignPortfolio(
    AssociationRequest request,
    IIssuanceService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignPortfolio(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToCashFlows(
        MultipleAssociationRequest request,
        IIssuanceService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToCashFlows(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromCashFlows(
        MultipleAssociationRequest request,
        IIssuanceService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromCashFlows(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static Issuance mapRequestToIssuance(IssuanceRequest request)
    {
        var model = new Issuance
        {
            Id = request.Id,
            IssueName = request.IssueName,
            Isin = request.Isin,
            IssueDate = request.IssueDate,
            MaturityDate = request.MaturityDate,
            CouponRate = request.CouponRate,
            Amount = request.Amount,
            InstrumentType = request.InstrumentType,
            Status = request.Status,
        };
        return model;
    }

}
