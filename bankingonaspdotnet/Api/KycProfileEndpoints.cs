
using bankingonaspdotnet.Service;
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Api;

public static class KycProfileEndpoints
{
    public static IEndpointRouteBuilder MapKycProfileEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/kycProfile").WithTags("KycProfiles");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignCustomer", AssignCustomer);
        group.MapPut("/unassignCustomer", UnassignCustomer);

    group.MapPut("/addToIdentityDocuments", AddToIdentityDocuments);
    group.MapPut("/removeFromIdentityDocuments", RemoveFromIdentityDocuments);

    group.MapPut("/addToRiskAssessments", AddToRiskAssessments);
    group.MapPut("/removeFromRiskAssessments", RemoveFromRiskAssessments);

    group.MapPut("/addToScreenings", AddToScreenings);
    group.MapPut("/removeFromScreenings", RemoveFromScreenings);


        return app;
    }

    private static async Task<IResult> Create(
        KycProfileRequest request,
        IKycProfileService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToKycProfile( request );

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
        KycProfileRequest request,
        IKycProfileService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToKycProfile( request );

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
        IKycProfileService service,
        CancellationToken cancellationToken) {

        var kycProfile = await service.Get(identifier, cancellationToken);
        return kycProfile is null ? Results.NotFound() : Results.Ok( kycProfile );
    }


    private static async Task<IResult> GetAll(
        IKycProfileService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( KycProfileResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IKycProfileService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignCustomer(
        AssociationRequest request,
        IKycProfileService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignCustomer(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignCustomer(
    AssociationRequest request,
    IKycProfileService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignCustomer(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToIdentityDocuments(
        MultipleAssociationRequest request,
        IKycProfileService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToIdentityDocuments(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromIdentityDocuments(
        MultipleAssociationRequest request,
        IKycProfileService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromIdentityDocuments(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToRiskAssessments(
        MultipleAssociationRequest request,
        IKycProfileService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToRiskAssessments(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromRiskAssessments(
        MultipleAssociationRequest request,
        IKycProfileService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromRiskAssessments(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToScreenings(
        MultipleAssociationRequest request,
        IKycProfileService service,
        CancellationToken cancellationToken) {
        var addTo = await service.AddToScreenings(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromScreenings(
        MultipleAssociationRequest request,
        IKycProfileService service,
        CancellationToken cancellationToken) {
        var removeFrom = await service.RemoveFromScreenings(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static KycProfile mapRequestToKycProfile( KycProfileRequest request ) {
        var model = new KycProfile
        {
            Id = request.Id,
            ProfileId = request.ProfileId,
            LastReviewedOn = request.LastReviewedOn,
            Status = request.Status,
        };
        return model;
    }

}
