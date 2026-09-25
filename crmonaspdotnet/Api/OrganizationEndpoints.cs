
using crmonaspdotnet.Service;
using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Api;

public static class OrganizationEndpoints
{
    public static IEndpointRouteBuilder MapOrganizationEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/organization").WithTags("Organizations");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);


        group.MapPut("/addToUsers", AddToUsers);
        group.MapPut("/removeFromUsers", RemoveFromUsers);

        group.MapPut("/addToAccounts", AddToAccounts);
        group.MapPut("/removeFromAccounts", RemoveFromAccounts);

        group.MapPut("/addToTeams", AddToTeams);
        group.MapPut("/removeFromTeams", RemoveFromTeams);

        group.MapPut("/addToTerritories", AddToTerritories);
        group.MapPut("/removeFromTerritories", RemoveFromTerritories);

        group.MapPut("/addToProducts", AddToProducts);
        group.MapPut("/removeFromProducts", RemoveFromProducts);

        group.MapPut("/addToPriceBooks", AddToPriceBooks);
        group.MapPut("/removeFromPriceBooks", RemoveFromPriceBooks);

        group.MapPut("/addToCampaigns", AddToCampaigns);
        group.MapPut("/removeFromCampaigns", RemoveFromCampaigns);


        return app;
    }

    private static async Task<IResult> Create(
        OrganizationRequest request,
        IOrganizationService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToOrganization(request);

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
        OrganizationRequest request,
        IOrganizationService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToOrganization(request);

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
        IOrganizationService service,
        CancellationToken cancellationToken)
    {

        var organization = await service.Get(identifier, cancellationToken);
        return organization is null ? Results.NotFound() : Results.Ok(organization);
    }


    private static async Task<IResult> GetAll(
        IOrganizationService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(OrganizationResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IOrganizationService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToUsers(
        MultipleAssociationRequest request,
        IOrganizationService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToUsers(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromUsers(
        MultipleAssociationRequest request,
        IOrganizationService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromUsers(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToAccounts(
        MultipleAssociationRequest request,
        IOrganizationService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToAccounts(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromAccounts(
        MultipleAssociationRequest request,
        IOrganizationService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromAccounts(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToTeams(
        MultipleAssociationRequest request,
        IOrganizationService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToTeams(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromTeams(
        MultipleAssociationRequest request,
        IOrganizationService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromTeams(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToTerritories(
        MultipleAssociationRequest request,
        IOrganizationService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToTerritories(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromTerritories(
        MultipleAssociationRequest request,
        IOrganizationService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromTerritories(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToProducts(
        MultipleAssociationRequest request,
        IOrganizationService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToProducts(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromProducts(
        MultipleAssociationRequest request,
        IOrganizationService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromProducts(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToPriceBooks(
        MultipleAssociationRequest request,
        IOrganizationService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToPriceBooks(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromPriceBooks(
        MultipleAssociationRequest request,
        IOrganizationService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromPriceBooks(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToCampaigns(
        MultipleAssociationRequest request,
        IOrganizationService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToCampaigns(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromCampaigns(
        MultipleAssociationRequest request,
        IOrganizationService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromCampaigns(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static Organization mapRequestToOrganization(OrganizationRequest request)
    {
        var model = new Organization
        {
            Id = request.Id,
            Name = request.Name,
            DefaultCurrency = request.DefaultCurrency,
            DefaultLocale = request.DefaultLocale,
            Website = request.Website,
        };
        return model;
    }

}
