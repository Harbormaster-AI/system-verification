
using inventoryonaspdotnet.Service;
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Api;

public static class QuarantineEndpoints
{
    public static IEndpointRouteBuilder MapQuarantineEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/quarantine").WithTags("Quarantines");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignWarehouse", AssignWarehouse);
        group.MapPut("/unassignWarehouse", UnassignWarehouse);
        group.MapPut("/assignLot", AssignLot);
        group.MapPut("/unassignLot", UnassignLot);

        group.MapPut("/addToItems", AddToItems);
        group.MapPut("/removeFromItems", RemoveFromItems);

        group.MapPut("/addToSerialNumbers", AddToSerialNumbers);
        group.MapPut("/removeFromSerialNumbers", RemoveFromSerialNumbers);


        return app;
    }

    private static async Task<IResult> Create(
        QuarantineRequest request,
        IQuarantineService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToQuarantine(request);

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
        QuarantineRequest request,
        IQuarantineService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToQuarantine(request);

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
        IQuarantineService service,
        CancellationToken cancellationToken)
    {

        var quarantine = await service.Get(identifier, cancellationToken);
        return quarantine is null ? Results.NotFound() : Results.Ok(quarantine);
    }


    private static async Task<IResult> GetAll(
        IQuarantineService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(QuarantineResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IQuarantineService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignWarehouse(
        AssociationRequest request,
        IQuarantineService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignWarehouse(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignWarehouse(
    AssociationRequest request,
    IQuarantineService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignWarehouse(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignLot(
        AssociationRequest request,
        IQuarantineService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignLot(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignLot(
    AssociationRequest request,
    IQuarantineService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignLot(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToItems(
        MultipleAssociationRequest request,
        IQuarantineService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToItems(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromItems(
        MultipleAssociationRequest request,
        IQuarantineService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromItems(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToSerialNumbers(
        MultipleAssociationRequest request,
        IQuarantineService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToSerialNumbers(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromSerialNumbers(
        MultipleAssociationRequest request,
        IQuarantineService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromSerialNumbers(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static Quarantine mapRequestToQuarantine(QuarantineRequest request)
    {
        var model = new Quarantine
        {
            Id = request.Id,
            Reason = request.Reason,
            StartedAt = request.StartedAt,
            ReleasedAt = request.ReleasedAt,
            Disposition = request.Disposition,
        };
        return model;
    }

}
