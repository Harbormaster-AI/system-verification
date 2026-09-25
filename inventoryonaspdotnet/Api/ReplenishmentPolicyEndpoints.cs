
using inventoryonaspdotnet.Service;
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Api;

public static class ReplenishmentPolicyEndpoints
{
    public static IEndpointRouteBuilder MapReplenishmentPolicyEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/replenishmentPolicy").WithTags("ReplenishmentPolicys");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignSku", AssignSku);
        group.MapPut("/unassignSku", UnassignSku);
        group.MapPut("/assignWarehouse", AssignWarehouse);
        group.MapPut("/unassignWarehouse", UnassignWarehouse);
        group.MapPut("/assignLocation", AssignLocation);
        group.MapPut("/unassignLocation", UnassignLocation);


        return app;
    }

    private static async Task<IResult> Create(
        ReplenishmentPolicyRequest request,
        IReplenishmentPolicyService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToReplenishmentPolicy(request);

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
        ReplenishmentPolicyRequest request,
        IReplenishmentPolicyService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToReplenishmentPolicy(request);

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
        IReplenishmentPolicyService service,
        CancellationToken cancellationToken)
    {

        var replenishmentPolicy = await service.Get(identifier, cancellationToken);
        return replenishmentPolicy is null ? Results.NotFound() : Results.Ok(replenishmentPolicy);
    }


    private static async Task<IResult> GetAll(
        IReplenishmentPolicyService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(ReplenishmentPolicyResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IReplenishmentPolicyService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignSku(
        AssociationRequest request,
        IReplenishmentPolicyService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignSku(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignSku(
    AssociationRequest request,
    IReplenishmentPolicyService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignSku(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignWarehouse(
        AssociationRequest request,
        IReplenishmentPolicyService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignWarehouse(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignWarehouse(
    AssociationRequest request,
    IReplenishmentPolicyService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignWarehouse(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignLocation(
        AssociationRequest request,
        IReplenishmentPolicyService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignLocation(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignLocation(
    AssociationRequest request,
    IReplenishmentPolicyService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignLocation(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static ReplenishmentPolicy mapRequestToReplenishmentPolicy(ReplenishmentPolicyRequest request)
    {
        var model = new ReplenishmentPolicy
        {
            Id = request.Id,
            MinLevel = request.MinLevel,
            MaxLevel = request.MaxLevel,
            ReorderPoint = request.ReorderPoint,
            ReorderQuantity = request.ReorderQuantity,
            LeadTimeDays = request.LeadTimeDays,
            ReviewPeriodDays = request.ReviewPeriodDays,
            PolicyType = request.PolicyType,
        };
        return model;
    }

}
