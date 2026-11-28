
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class ApprovalEndpoints
{
    public static IEndpointRouteBuilder MapApprovalEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/approval").WithTags("Approvals");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignRiskLimit", AssignRiskLimit);
        group.MapPut("/unassignRiskLimit", UnassignRiskLimit);
        group.MapPut("/assignLimitBreach", AssignLimitBreach);
        group.MapPut("/unassignLimitBreach", UnassignLimitBreach);
        group.MapPut("/assignPolicy", AssignPolicy);
        group.MapPut("/unassignPolicy", UnassignPolicy);


        return app;
    }

    private static async Task<IResult> Create(
        ApprovalRequest request,
        IApprovalService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToApproval( request );

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
        ApprovalRequest request,
        IApprovalService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToApproval( request );

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
        IApprovalService service,
        CancellationToken cancellationToken) {

        var approval = await service.Get(identifier, cancellationToken);
        return approval is null ? Results.NotFound() : Results.Ok( approval );
    }


    private static async Task<IResult> GetAll(
        IApprovalService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( ApprovalResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IApprovalService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignRiskLimit(
        AssociationRequest request,
        IApprovalService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignRiskLimit(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignRiskLimit(
    AssociationRequest request,
    IApprovalService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignRiskLimit(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignLimitBreach(
        AssociationRequest request,
        IApprovalService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignLimitBreach(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignLimitBreach(
    AssociationRequest request,
    IApprovalService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignLimitBreach(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignPolicy(
        AssociationRequest request,
        IApprovalService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignPolicy(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignPolicy(
    AssociationRequest request,
    IApprovalService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignPolicy(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static Approval mapRequestToApproval( ApprovalRequest request ) {
        var model = new Approval
        {
            Id = request.Id,
            ApproverName = request.ApproverName,
            ApprovalDate = request.ApprovalDate,
            Notes = request.Notes,
            Decision = request.Decision,
        };
        return model;
    }

}
