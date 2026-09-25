using bankingonaspdotnet.Service;
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Api;

public static class IdentityDocumentEndpoints
{
    public static IEndpointRouteBuilder MapIdentityDocumentEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/identityDocument").WithTags("IdentityDocuments");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignKycProfile", AssignKycProfile);
        group.MapPut("/unassignKycProfile", UnassignKycProfile);


        return app;
    }

    private static async Task<IResult> Create(
        IdentityDocumentRequest request,
        IIdentityDocumentService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToIdentityDocument( request );

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
        IdentityDocumentRequest request,
        IIdentityDocumentService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToIdentityDocument( request );

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
        IIdentityDocumentService service,
        CancellationToken cancellationToken) {

        var identityDocument = await service.Get(identifier, cancellationToken);
        return identityDocument is null ? Results.NotFound() : Results.Ok( identityDocument );
    }


    private static async Task<IResult> GetAll(
        IIdentityDocumentService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( IdentityDocumentResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IIdentityDocumentService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignKycProfile(
        AssociationRequest request,
        IIdentityDocumentService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignKycProfile(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignKycProfile(
    AssociationRequest request,
    IIdentityDocumentService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignKycProfile(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static IdentityDocument mapRequestToIdentityDocument( IdentityDocumentRequest request ) {
        var model = new IdentityDocument
        {
            Id = request.Id,
            DocumentNumber = request.DocumentNumber,
            IssuingCountry = request.IssuingCountry,
            ExpirationDate = request.ExpirationDate,
            DocumentType = request.DocumentType,
        };
        return model;
    }

}
