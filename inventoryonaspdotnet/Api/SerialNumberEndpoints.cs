
using inventoryonaspdotnet.Service;
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Api;

public static class SerialNumberEndpoints
{
    public static IEndpointRouteBuilder MapSerialNumberEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/serialNumber").WithTags("SerialNumbers");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignSku", AssignSku);
        group.MapPut("/unassignSku", UnassignSku);
        group.MapPut("/assignCurrentInventoryItem", AssignCurrentInventoryItem);
        group.MapPut("/unassignCurrentInventoryItem", UnassignCurrentInventoryItem);
        group.MapPut("/assignLot", AssignLot);
        group.MapPut("/unassignLot", UnassignLot);


        return app;
    }

    private static async Task<IResult> Create(
        SerialNumberRequest request,
        ISerialNumberService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToSerialNumber(request);

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
        SerialNumberRequest request,
        ISerialNumberService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToSerialNumber(request);

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
        ISerialNumberService service,
        CancellationToken cancellationToken)
    {

        var serialNumber = await service.Get(identifier, cancellationToken);
        return serialNumber is null ? Results.NotFound() : Results.Ok(serialNumber);
    }


    private static async Task<IResult> GetAll(
        ISerialNumberService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(SerialNumberResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ISerialNumberService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignSku(
        AssociationRequest request,
        ISerialNumberService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignSku(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignSku(
    AssociationRequest request,
    ISerialNumberService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignSku(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignCurrentInventoryItem(
        AssociationRequest request,
        ISerialNumberService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignCurrentInventoryItem(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignCurrentInventoryItem(
    AssociationRequest request,
    ISerialNumberService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignCurrentInventoryItem(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignLot(
        AssociationRequest request,
        ISerialNumberService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignLot(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignLot(
    AssociationRequest request,
    ISerialNumberService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignLot(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static SerialNumber mapRequestToSerialNumber(SerialNumberRequest request)
    {
        var model = new SerialNumber
        {
            Id = request.Id,
            Serial = request.Serial,
            ActivationDate = request.ActivationDate,
            Status = request.Status,
        };
        return model;
    }

}
