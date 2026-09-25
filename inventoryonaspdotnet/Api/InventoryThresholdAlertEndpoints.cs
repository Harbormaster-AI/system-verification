
using inventoryonaspdotnet.Service;
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Api;

public static class InventoryThresholdAlertEndpoints
{
    public static IEndpointRouteBuilder MapInventoryThresholdAlertEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/inventoryThresholdAlert").WithTags("InventoryThresholdAlerts");

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
        group.MapPut("/assignRelatedPolicy", AssignRelatedPolicy);
        group.MapPut("/unassignRelatedPolicy", UnassignRelatedPolicy);


        return app;
    }

    private static async Task<IResult> Create(
        InventoryThresholdAlertRequest request,
        IInventoryThresholdAlertService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToInventoryThresholdAlert(request);

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
        InventoryThresholdAlertRequest request,
        IInventoryThresholdAlertService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToInventoryThresholdAlert(request);

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
        IInventoryThresholdAlertService service,
        CancellationToken cancellationToken)
    {

        var inventoryThresholdAlert = await service.Get(identifier, cancellationToken);
        return inventoryThresholdAlert is null ? Results.NotFound() : Results.Ok(inventoryThresholdAlert);
    }


    private static async Task<IResult> GetAll(
        IInventoryThresholdAlertService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(InventoryThresholdAlertResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IInventoryThresholdAlertService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignSku(
        AssociationRequest request,
        IInventoryThresholdAlertService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignSku(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignSku(
    AssociationRequest request,
    IInventoryThresholdAlertService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignSku(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignWarehouse(
        AssociationRequest request,
        IInventoryThresholdAlertService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignWarehouse(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignWarehouse(
    AssociationRequest request,
    IInventoryThresholdAlertService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignWarehouse(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignLocation(
        AssociationRequest request,
        IInventoryThresholdAlertService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignLocation(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignLocation(
    AssociationRequest request,
    IInventoryThresholdAlertService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignLocation(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignRelatedPolicy(
        AssociationRequest request,
        IInventoryThresholdAlertService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignRelatedPolicy(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignRelatedPolicy(
    AssociationRequest request,
    IInventoryThresholdAlertService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignRelatedPolicy(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static InventoryThresholdAlert mapRequestToInventoryThresholdAlert(InventoryThresholdAlertRequest request)
    {
        var model = new InventoryThresholdAlert
        {
            Id = request.Id,
            AlertNumber = request.AlertNumber,
            DetectedAt = request.DetectedAt,
            Message = request.Message,
            AlertType = request.AlertType,
            Status = request.Status,
        };
        return model;
    }

}
