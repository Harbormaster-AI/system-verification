
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class AccountingEntryEndpoints
{
    public static IEndpointRouteBuilder MapAccountingEntryEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/accountingEntry").WithTags("AccountingEntrys");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignTrade", AssignTrade);
        group.MapPut("/unassignTrade", UnassignTrade);
        group.MapPut("/assignHedgeRelationship", AssignHedgeRelationship);
        group.MapPut("/unassignHedgeRelationship", UnassignHedgeRelationship);
        group.MapPut("/assignPortfolio", AssignPortfolio);
        group.MapPut("/unassignPortfolio", UnassignPortfolio);


        return app;
    }

    private static async Task<IResult> Create(
        AccountingEntryRequest request,
        IAccountingEntryService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToAccountingEntry(request);

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
        AccountingEntryRequest request,
        IAccountingEntryService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToAccountingEntry(request);

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
        IAccountingEntryService service,
        CancellationToken cancellationToken)
    {

        var accountingEntry = await service.Get(identifier, cancellationToken);
        return accountingEntry is null ? Results.NotFound() : Results.Ok(accountingEntry);
    }


    private static async Task<IResult> GetAll(
        IAccountingEntryService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(AccountingEntryResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IAccountingEntryService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignTrade(
        AssociationRequest request,
        IAccountingEntryService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignTrade(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignTrade(
    AssociationRequest request,
    IAccountingEntryService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignTrade(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignHedgeRelationship(
        AssociationRequest request,
        IAccountingEntryService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignHedgeRelationship(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignHedgeRelationship(
    AssociationRequest request,
    IAccountingEntryService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignHedgeRelationship(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignPortfolio(
        AssociationRequest request,
        IAccountingEntryService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignPortfolio(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignPortfolio(
    AssociationRequest request,
    IAccountingEntryService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignPortfolio(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static AccountingEntry mapRequestToAccountingEntry(AccountingEntryRequest request)
    {
        var model = new AccountingEntry
        {
            Id = request.Id,
            PostingDate = request.PostingDate,
            Account = request.Account,
            Amount = request.Amount,
            Narrative = request.Narrative,
            Treatment = request.Treatment,
        };
        return model;
    }

}
