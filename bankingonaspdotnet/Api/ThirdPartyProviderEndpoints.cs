
using bankingonaspdotnet.Service;
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Api;

public static class ThirdPartyProviderEndpoints
{
    public static IEndpointRouteBuilder MapThirdPartyProviderEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/thirdPartyProvider").WithTags("ThirdPartyProviders");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignBank", AssignBank);
        group.MapPut("/unassignBank", UnassignBank);

        group.MapPut("/addToConsents", AddToConsents);
        group.MapPut("/removeFromConsents", RemoveFromConsents);


        return app;
    }

    private static async Task<IResult> Create(
        ThirdPartyProviderRequest request,
        IThirdPartyProviderService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToThirdPartyProvider(request);

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
        ThirdPartyProviderRequest request,
        IThirdPartyProviderService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToThirdPartyProvider(request);

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
        IThirdPartyProviderService service,
        CancellationToken cancellationToken)
    {

        var thirdPartyProvider = await service.Get(identifier, cancellationToken);
        return thirdPartyProvider is null ? Results.NotFound() : Results.Ok(thirdPartyProvider);
    }


    private static async Task<IResult> GetAll(
        IThirdPartyProviderService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(ThirdPartyProviderResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IThirdPartyProviderService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignBank(
        AssociationRequest request,
        IThirdPartyProviderService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignBank(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignBank(
    AssociationRequest request,
    IThirdPartyProviderService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignBank(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToConsents(
        MultipleAssociationRequest request,
        IThirdPartyProviderService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToConsents(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromConsents(
        MultipleAssociationRequest request,
        IThirdPartyProviderService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromConsents(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static ThirdPartyProvider mapRequestToThirdPartyProvider(ThirdPartyProviderRequest request)
    {
        var model = new ThirdPartyProvider
        {
            Id = request.Id,
            Name = request.Name,
            RegistrationId = request.RegistrationId,
            Website = request.Website,
        };
        return model;
    }

}
