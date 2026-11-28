
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class FundingProgramEndpoints
{
    public static IEndpointRouteBuilder MapFundingProgramEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/fundingProgram").WithTags("FundingPrograms");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignTreasuryUnit", AssignTreasuryUnit);
        group.MapPut("/unassignTreasuryUnit", UnassignTreasuryUnit);

        group.MapPut("/addToIssuances", AddToIssuances);
        group.MapPut("/removeFromIssuances", RemoveFromIssuances);


        return app;
    }

    private static async Task<IResult> Create(
        FundingProgramRequest request,
        IFundingProgramService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToFundingProgram(request);

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
        FundingProgramRequest request,
        IFundingProgramService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToFundingProgram(request);

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
        IFundingProgramService service,
        CancellationToken cancellationToken)
    {

        var fundingProgram = await service.Get(identifier, cancellationToken);
        return fundingProgram is null ? Results.NotFound() : Results.Ok(fundingProgram);
    }


    private static async Task<IResult> GetAll(
        IFundingProgramService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(FundingProgramResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IFundingProgramService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignTreasuryUnit(
        AssociationRequest request,
        IFundingProgramService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignTreasuryUnit(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignTreasuryUnit(
    AssociationRequest request,
    IFundingProgramService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignTreasuryUnit(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToIssuances(
        MultipleAssociationRequest request,
        IFundingProgramService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToIssuances(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromIssuances(
        MultipleAssociationRequest request,
        IFundingProgramService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromIssuances(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static FundingProgram mapRequestToFundingProgram(FundingProgramRequest request)
    {
        var model = new FundingProgram
        {
            Id = request.Id,
            ProgramName = request.ProgramName,
            LimitAmount = request.LimitAmount,
            Rating = request.Rating,
            InstrumentFamily = request.InstrumentFamily,
        };
        return model;
    }

}
