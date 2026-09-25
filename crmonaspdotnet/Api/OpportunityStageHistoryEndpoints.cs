
using crmonaspdotnet.Service;
using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Api;

public static class OpportunityStageHistoryEndpoints
{
    public static IEndpointRouteBuilder MapOpportunityStageHistoryEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/opportunityStageHistory").WithTags("OpportunityStageHistorys");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignOpportunity", AssignOpportunity);
        group.MapPut("/unassignOpportunity", UnassignOpportunity);
        group.MapPut("/assignChangedBy", AssignChangedBy);
        group.MapPut("/unassignChangedBy", UnassignChangedBy);


        return app;
    }

    private static async Task<IResult> Create(
        OpportunityStageHistoryRequest request,
        IOpportunityStageHistoryService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToOpportunityStageHistory( request );

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
        OpportunityStageHistoryRequest request,
        IOpportunityStageHistoryService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToOpportunityStageHistory( request );

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
        IOpportunityStageHistoryService service,
        CancellationToken cancellationToken) {

        var opportunityStageHistory = await service.Get(identifier, cancellationToken);
        return opportunityStageHistory is null ? Results.NotFound() : Results.Ok( opportunityStageHistory );
    }


    private static async Task<IResult> GetAll(
        IOpportunityStageHistoryService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( OpportunityStageHistoryResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IOpportunityStageHistoryService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOpportunity(
        AssociationRequest request,
        IOpportunityStageHistoryService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignOpportunity(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOpportunity(
    AssociationRequest request,
    IOpportunityStageHistoryService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignOpportunity(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignChangedBy(
        AssociationRequest request,
        IOpportunityStageHistoryService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignChangedBy(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignChangedBy(
    AssociationRequest request,
    IOpportunityStageHistoryService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignChangedBy(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static OpportunityStageHistory mapRequestToOpportunityStageHistory( OpportunityStageHistoryRequest request ) {
        var model = new OpportunityStageHistory
        {
            Id = request.Id,
            ChangedAt = request.ChangedAt,
            Comment = request.Comment,
            FromStage = request.FromStage,
            ToStage = request.ToStage,
        };
        return model;
    }

}
