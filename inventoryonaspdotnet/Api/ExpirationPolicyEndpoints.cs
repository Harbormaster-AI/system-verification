
using inventoryonaspdotnet.Service;
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Api;

public static class ExpirationPolicyEndpoints
{
    public static IEndpointRouteBuilder MapExpirationPolicyEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/expirationPolicy").WithTags("ExpirationPolicys");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignSku", AssignSku);
        group.MapPut("/unassignSku", UnassignSku);
        group.MapPut("/assignWarehouse", AssignWarehouse);
        group.MapPut("/unassignWarehouse", UnassignWarehouse);


        return app;
    }

    private static async Task<IResult> Create(
        ExpirationPolicyRequest request,
        IExpirationPolicyService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToExpirationPolicy(request);

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
        ExpirationPolicyRequest request,
        IExpirationPolicyService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToExpirationPolicy(request);

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
        IExpirationPolicyService service,
        CancellationToken cancellationToken)
    {

        var expirationPolicy = await service.Get(identifier, cancellationToken);
        return expirationPolicy is null ? Results.NotFound() : Results.Ok(expirationPolicy);
    }


    private static async Task<IResult> GetAll(
        IExpirationPolicyService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(ExpirationPolicyResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IExpirationPolicyService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignSku(
        AssociationRequest request,
        IExpirationPolicyService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignSku(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignSku(
    AssociationRequest request,
    IExpirationPolicyService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignSku(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignWarehouse(
        AssociationRequest request,
        IExpirationPolicyService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignWarehouse(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignWarehouse(
    AssociationRequest request,
    IExpirationPolicyService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignWarehouse(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static ExpirationPolicy mapRequestToExpirationPolicy(ExpirationPolicyRequest request)
    {
        var model = new ExpirationPolicy
        {
            Id = request.Id,
            RejectIfDaysToExpireLessThan = request.RejectIfDaysToExpireLessThan,
            AutoQuarantineDaysToExpire = request.AutoQuarantineDaysToExpire,
            RotationMethod = request.RotationMethod,
        };
        return model;
    }

}
