
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Api;

public static class HolidayEndpoints
{
    public static IEndpointRouteBuilder MapHolidayEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/holiday").WithTags("Holidays");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignCalendar", AssignCalendar);
        group.MapPut("/unassignCalendar", UnassignCalendar);


        return app;
    }

    private static async Task<IResult> Create(
        HolidayRequest request,
        IHolidayService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToHoliday(request);

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
        HolidayRequest request,
        IHolidayService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToHoliday(request);

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
        IHolidayService service,
        CancellationToken cancellationToken)
    {

        var holiday = await service.Get(identifier, cancellationToken);
        return holiday is null ? Results.NotFound() : Results.Ok(holiday);
    }


    private static async Task<IResult> GetAll(
        IHolidayService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(HolidayResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IHolidayService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignCalendar(
        AssociationRequest request,
        IHolidayService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignCalendar(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignCalendar(
    AssociationRequest request,
    IHolidayService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignCalendar(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static Holiday mapRequestToHoliday(HolidayRequest request)
    {
        var model = new Holiday
        {
            Id = request.Id,
            Date = request.Date,
            Description = request.Description,
        };
        return model;
    }

}
