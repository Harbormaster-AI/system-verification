
using crmonaspdotnet.Service;
using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Api;

public static class TeamEndpoints
{
    public static IEndpointRouteBuilder MapTeamEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/team").WithTags("Teams");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignOrganization", AssignOrganization);
        group.MapPut("/unassignOrganization", UnassignOrganization);

    group.MapPut("/addToUsers", AddToUsers);
    group.MapPut("/removeFromUsers", RemoveFromUsers);

    group.MapPut("/addToAccounts", AddToAccounts);
    group.MapPut("/removeFromAccounts", RemoveFromAccounts);

    group.MapPut("/addToOpportunities", AddToOpportunities);
    group.MapPut("/removeFromOpportunities", RemoveFromOpportunities);

    group.MapPut("/addToCases", AddToCases);
    group.MapPut("/removeFromCases", RemoveFromCases);

    group.MapPut("/addToCampaigns", AddToCampaigns);
    group.MapPut("/removeFromCampaigns", RemoveFromCampaigns);


        return app;
    }

    private static async Task<IResult> Create(
        TeamRequest request,
        ITeamService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToTeam( request );

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
        TeamRequest request,
        ITeamService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToTeam( request );

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
        ITeamService service,
        CancellationToken cancellationToken) {

        var team = await service.Get(identifier, cancellationToken);
        return team is null ? Results.NotFound() : Results.Ok( team );
    }


    private static async Task<IResult> GetAll(
        ITeamService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( TeamResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ITeamService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOrganization(
        AssociationRequest request,
        ITeamService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignOrganization(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOrganization(
    AssociationRequest request,
    ITeamService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignOrganization(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToUsers(
        MultipleAssociationRequest request,
        ITeamService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToUsers(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromUsers(
        MultipleAssociationRequest request,
        ITeamService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromUsers(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToAccounts(
        MultipleAssociationRequest request,
        ITeamService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToAccounts(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromAccounts(
        MultipleAssociationRequest request,
        ITeamService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromAccounts(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToOpportunities(
        MultipleAssociationRequest request,
        ITeamService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToOpportunities(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromOpportunities(
        MultipleAssociationRequest request,
        ITeamService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromOpportunities(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToCases(
        MultipleAssociationRequest request,
        ITeamService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToCases(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromCases(
        MultipleAssociationRequest request,
        ITeamService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromCases(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToCampaigns(
        MultipleAssociationRequest request,
        ITeamService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToCampaigns(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromCampaigns(
        MultipleAssociationRequest request,
        ITeamService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromCampaigns(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static Team mapRequestToTeam( TeamRequest request ) {
        var model = new Team
        {
            Id = request.Id,
            Name = request.Name,
            TeamType = request.TeamType,
        };
        return model;
    }

}
