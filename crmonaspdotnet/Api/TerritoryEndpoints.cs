
using crmonaspdotnet.Service;
using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Api;

public static class TerritoryEndpoints
{
    public static IEndpointRouteBuilder MapTerritoryEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/territory").WithTags("Territorys");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignOrganization", AssignOrganization);
        group.MapPut("/unassignOrganization", UnassignOrganization);

    group.MapPut("/addToAccounts", AddToAccounts);
    group.MapPut("/removeFromAccounts", RemoveFromAccounts);

    group.MapPut("/addToUsers", AddToUsers);
    group.MapPut("/removeFromUsers", RemoveFromUsers);


        return app;
    }

    private static async Task<IResult> Create(
        TerritoryRequest request,
        ITerritoryService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToTerritory( request );

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
        TerritoryRequest request,
        ITerritoryService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToTerritory( request );

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
        ITerritoryService service,
        CancellationToken cancellationToken) {

        var territory = await service.Get(identifier, cancellationToken);
        return territory is null ? Results.NotFound() : Results.Ok( territory );
    }


    private static async Task<IResult> GetAll(
        ITerritoryService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( TerritoryResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ITerritoryService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOrganization(
        AssociationRequest request,
        ITerritoryService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignOrganization(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOrganization(
    AssociationRequest request,
    ITerritoryService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignOrganization(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToAccounts(
        MultipleAssociationRequest request,
        ITerritoryService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToAccounts(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromAccounts(
        MultipleAssociationRequest request,
        ITerritoryService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromAccounts(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToUsers(
        MultipleAssociationRequest request,
        ITerritoryService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToUsers(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromUsers(
        MultipleAssociationRequest request,
        ITerritoryService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromUsers(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static Territory mapRequestToTerritory( TerritoryRequest request ) {
        var model = new Territory
        {
            Id = request.Id,
            Name = request.Name,
            Region = request.Region,
            TerritoryType = request.TerritoryType,
        };
        return model;
    }

}
