
using inventoryonaspdotnet.Service;
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Api;

public static class UoMConversionEndpoints
{
    public static IEndpointRouteBuilder MapUoMConversionEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/uoMConversion").WithTags("UoMConversions");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignSku", AssignSku);
        group.MapPut("/unassignSku", UnassignSku);


        return app;
    }

    private static async Task<IResult> Create(
        UoMConversionRequest request,
        IUoMConversionService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToUoMConversion( request );

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
        UoMConversionRequest request,
        IUoMConversionService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToUoMConversion( request );

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
        IUoMConversionService service,
        CancellationToken cancellationToken) {

        var uoMConversion = await service.Get(identifier, cancellationToken);
        return uoMConversion is null ? Results.NotFound() : Results.Ok( uoMConversion );
    }


    private static async Task<IResult> GetAll(
        IUoMConversionService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( UoMConversionResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IUoMConversionService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignSku(
        AssociationRequest request,
        IUoMConversionService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignSku(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignSku(
    AssociationRequest request,
    IUoMConversionService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignSku(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static UoMConversion mapRequestToUoMConversion( UoMConversionRequest request ) {
        var model = new UoMConversion
        {
            Id = request.Id,
            Factor = request.Factor,
            Precision = request.Precision,
            FromUnit = request.FromUnit,
            ToUnit = request.ToUnit,
        };
        return model;
    }

}
