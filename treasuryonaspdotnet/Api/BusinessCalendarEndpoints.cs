
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class BusinessCalendarEndpoints
{
    public static IEndpointRouteBuilder MapBusinessCalendarEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/businessCalendar").WithTags("BusinessCalendars");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);


    group.MapPut("/addToHolidays", AddToHolidays);
    group.MapPut("/removeFromHolidays", RemoveFromHolidays);


        return app;
    }

    private static async Task<IResult> Create(
        BusinessCalendarRequest request,
        IBusinessCalendarService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToBusinessCalendar( request );

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
        BusinessCalendarRequest request,
        IBusinessCalendarService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToBusinessCalendar( request );

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
        IBusinessCalendarService service,
        CancellationToken cancellationToken) {

        var businessCalendar = await service.Get(identifier, cancellationToken);
        return businessCalendar is null ? Results.NotFound() : Results.Ok( businessCalendar );
    }


    private static async Task<IResult> GetAll(
        IBusinessCalendarService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( BusinessCalendarResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IBusinessCalendarService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToHolidays(
        MultipleAssociationRequest request,
        IBusinessCalendarService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToHolidays(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromHolidays(
        MultipleAssociationRequest request,
        IBusinessCalendarService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromHolidays(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static BusinessCalendar mapRequestToBusinessCalendar( BusinessCalendarRequest request ) {
        var model = new BusinessCalendar
        {
            Id = request.Id,
            Name = request.Name,
            Location = request.Location,
        };
        return model;
    }

}
