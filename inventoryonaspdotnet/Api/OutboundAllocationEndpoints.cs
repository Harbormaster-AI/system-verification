
using inventoryonaspdotnet.Service;
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Api;

public static class OutboundAllocationEndpoints
{
    public static IEndpointRouteBuilder MapOutboundAllocationEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/outboundAllocation").WithTags("OutboundAllocations");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignWarehouse", AssignWarehouse);
        group.MapPut("/unassignWarehouse", UnassignWarehouse);
        group.MapPut("/assignSku", AssignSku);
        group.MapPut("/unassignSku", UnassignSku);
        group.MapPut("/assignInventoryItem", AssignInventoryItem);
        group.MapPut("/unassignInventoryItem", UnassignInventoryItem);
        group.MapPut("/assignReservation", AssignReservation);
        group.MapPut("/unassignReservation", UnassignReservation);
        group.MapPut("/assignLot", AssignLot);
        group.MapPut("/unassignLot", UnassignLot);
        group.MapPut("/assignSourceLocation", AssignSourceLocation);
        group.MapPut("/unassignSourceLocation", UnassignSourceLocation);

        group.MapPut("/addToSerialNumbers", AddToSerialNumbers);
        group.MapPut("/removeFromSerialNumbers", RemoveFromSerialNumbers);


        return app;
    }

    private static async Task<IResult> Create(
        OutboundAllocationRequest request,
        IOutboundAllocationService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToOutboundAllocation(request);

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
        OutboundAllocationRequest request,
        IOutboundAllocationService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToOutboundAllocation(request);

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
        IOutboundAllocationService service,
        CancellationToken cancellationToken)
    {

        var outboundAllocation = await service.Get(identifier, cancellationToken);
        return outboundAllocation is null ? Results.NotFound() : Results.Ok(outboundAllocation);
    }


    private static async Task<IResult> GetAll(
        IOutboundAllocationService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(OutboundAllocationResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IOutboundAllocationService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignWarehouse(
        AssociationRequest request,
        IOutboundAllocationService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignWarehouse(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignWarehouse(
    AssociationRequest request,
    IOutboundAllocationService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignWarehouse(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignSku(
        AssociationRequest request,
        IOutboundAllocationService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignSku(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignSku(
    AssociationRequest request,
    IOutboundAllocationService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignSku(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignInventoryItem(
        AssociationRequest request,
        IOutboundAllocationService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignInventoryItem(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignInventoryItem(
    AssociationRequest request,
    IOutboundAllocationService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignInventoryItem(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignReservation(
        AssociationRequest request,
        IOutboundAllocationService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignReservation(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignReservation(
    AssociationRequest request,
    IOutboundAllocationService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignReservation(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignLot(
        AssociationRequest request,
        IOutboundAllocationService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignLot(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignLot(
    AssociationRequest request,
    IOutboundAllocationService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignLot(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignSourceLocation(
        AssociationRequest request,
        IOutboundAllocationService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignSourceLocation(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignSourceLocation(
    AssociationRequest request,
    IOutboundAllocationService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignSourceLocation(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToSerialNumbers(
        MultipleAssociationRequest request,
        IOutboundAllocationService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToSerialNumbers(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromSerialNumbers(
        MultipleAssociationRequest request,
        IOutboundAllocationService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromSerialNumbers(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static OutboundAllocation mapRequestToOutboundAllocation(OutboundAllocationRequest request)
    {
        var model = new OutboundAllocation
        {
            Id = request.Id,
            AllocationNumber = request.AllocationNumber,
            AllocatedQuantity = request.AllocatedQuantity,
            AllocationDate = request.AllocationDate,
            Status = request.Status,
        };
        return model;
    }

}
