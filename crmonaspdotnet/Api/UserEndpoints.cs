
using crmonaspdotnet.Service;
using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Api;

public static class UserEndpoints
{
    public static IEndpointRouteBuilder MapUserEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/user").WithTags("Users");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignOrganization", AssignOrganization);
        group.MapPut("/unassignOrganization", UnassignOrganization);

    group.MapPut("/addToTeams", AddToTeams);
    group.MapPut("/removeFromTeams", RemoveFromTeams);

    group.MapPut("/addToActivities", AddToActivities);
    group.MapPut("/removeFromActivities", RemoveFromActivities);

    group.MapPut("/addToOwnedAccounts", AddToOwnedAccounts);
    group.MapPut("/removeFromOwnedAccounts", RemoveFromOwnedAccounts);

    group.MapPut("/addToOwnedLeads", AddToOwnedLeads);
    group.MapPut("/removeFromOwnedLeads", RemoveFromOwnedLeads);

    group.MapPut("/addToOwnedOpportunities", AddToOwnedOpportunities);
    group.MapPut("/removeFromOwnedOpportunities", RemoveFromOwnedOpportunities);

    group.MapPut("/addToOwnedCases", AddToOwnedCases);
    group.MapPut("/removeFromOwnedCases", RemoveFromOwnedCases);

    group.MapPut("/addToQuotes", AddToQuotes);
    group.MapPut("/removeFromQuotes", RemoveFromQuotes);

    group.MapPut("/addToOrders", AddToOrders);
    group.MapPut("/removeFromOrders", RemoveFromOrders);

    group.MapPut("/addToContracts", AddToContracts);
    group.MapPut("/removeFromContracts", RemoveFromContracts);

    group.MapPut("/addToEmailMessages", AddToEmailMessages);
    group.MapPut("/removeFromEmailMessages", RemoveFromEmailMessages);


        return app;
    }

    private static async Task<IResult> Create(
        UserRequest request,
        IUserService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToUser( request );

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
        UserRequest request,
        IUserService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToUser( request );

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
        IUserService service,
        CancellationToken cancellationToken) {

        var user = await service.Get(identifier, cancellationToken);
        return user is null ? Results.NotFound() : Results.Ok( user );
    }


    private static async Task<IResult> GetAll(
        IUserService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( UserResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IUserService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOrganization(
        AssociationRequest request,
        IUserService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignOrganization(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOrganization(
    AssociationRequest request,
    IUserService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignOrganization(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToTeams(
        MultipleAssociationRequest request,
        IUserService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToTeams(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromTeams(
        MultipleAssociationRequest request,
        IUserService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromTeams(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToActivities(
        MultipleAssociationRequest request,
        IUserService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToActivities(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromActivities(
        MultipleAssociationRequest request,
        IUserService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromActivities(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToOwnedAccounts(
        MultipleAssociationRequest request,
        IUserService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToOwnedAccounts(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromOwnedAccounts(
        MultipleAssociationRequest request,
        IUserService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromOwnedAccounts(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToOwnedLeads(
        MultipleAssociationRequest request,
        IUserService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToOwnedLeads(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromOwnedLeads(
        MultipleAssociationRequest request,
        IUserService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromOwnedLeads(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToOwnedOpportunities(
        MultipleAssociationRequest request,
        IUserService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToOwnedOpportunities(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromOwnedOpportunities(
        MultipleAssociationRequest request,
        IUserService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromOwnedOpportunities(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToOwnedCases(
        MultipleAssociationRequest request,
        IUserService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToOwnedCases(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromOwnedCases(
        MultipleAssociationRequest request,
        IUserService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromOwnedCases(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToQuotes(
        MultipleAssociationRequest request,
        IUserService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToQuotes(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromQuotes(
        MultipleAssociationRequest request,
        IUserService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromQuotes(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToOrders(
        MultipleAssociationRequest request,
        IUserService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToOrders(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromOrders(
        MultipleAssociationRequest request,
        IUserService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromOrders(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToContracts(
        MultipleAssociationRequest request,
        IUserService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToContracts(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromContracts(
        MultipleAssociationRequest request,
        IUserService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromContracts(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToEmailMessages(
        MultipleAssociationRequest request,
        IUserService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToEmailMessages(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromEmailMessages(
        MultipleAssociationRequest request,
        IUserService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromEmailMessages(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static User mapRequestToUser( UserRequest request ) {
        var model = new User
        {
            Id = request.Id,
            Username = request.Username,
            FullName = request.FullName,
            Email = request.Email,
            Locale = request.Locale,
            Role = request.Role,
            Status = request.Status,
        };
        return model;
    }

}
