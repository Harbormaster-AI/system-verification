
using inventoryonaspdotnet.Service;
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Api;

public static class DemandSignalEndpoints
{
    public static IEndpointRouteBuilder MapDemandSignalEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/demandSignal").WithTags("DemandSignals");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignSku", AssignSku);
        group.MapPut("/unassignSku", UnassignSku);

        group.MapPut("/addToReservations", AddToReservations);
        group.MapPut("/removeFromReservations", RemoveFromReservations);


        return app;
    }

    private static async Task<IResult> Create(
        DemandSignalRequest request,
        IDemandSignalService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToDemandSignal(request);

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
        DemandSignalRequest request,
        IDemandSignalService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToDemandSignal(request);

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
        IDemandSignalService service,
        CancellationToken cancellationToken)
    {

        var demandSignal = await service.Get(identifier, cancellationToken);
        return demandSignal is null ? Results.NotFound() : Results.Ok(demandSignal);
    }


    private static async Task<IResult> GetAll(
        IDemandSignalService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(DemandSignalResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IDemandSignalService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignSku(
        AssociationRequest request,
        IDemandSignalService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignSku(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignSku(
    AssociationRequest request,
    IDemandSignalService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignSku(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToReservations(
        MultipleAssociationRequest request,
        IDemandSignalService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToReservations(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromReservations(
        MultipleAssociationRequest request,
        IDemandSignalService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromReservations(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static DemandSignal mapRequestToDemandSignal(DemandSignalRequest request)
    {
        var model = new DemandSignal
        {
            Id = request.Id,
            ExternalReference = request.ExternalReference,
            RequestedDate = request.RequestedDate,
            Quantity = request.Quantity,
            DemandType = request.DemandType,
        };
        return model;
    }

}
