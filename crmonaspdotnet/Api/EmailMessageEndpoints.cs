
using crmonaspdotnet.Service;
using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Api;

public static class EmailMessageEndpoints
{
    public static IEndpointRouteBuilder MapEmailMessageEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/emailMessage").WithTags("EmailMessages");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignOrganization", AssignOrganization);
        group.MapPut("/unassignOrganization", UnassignOrganization);
        group.MapPut("/assignOwner", AssignOwner);
        group.MapPut("/unassignOwner", UnassignOwner);
        group.MapPut("/assignAccount", AssignAccount);
        group.MapPut("/unassignAccount", UnassignAccount);
        group.MapPut("/assignContact", AssignContact);
        group.MapPut("/unassignContact", UnassignContact);
        group.MapPut("/assignLead", AssignLead);
        group.MapPut("/unassignLead", UnassignLead);
        group.MapPut("/assignCase_", AssignCase_);
        group.MapPut("/unassignCase_", UnassignCase_);
        group.MapPut("/assignOpportunity", AssignOpportunity);
        group.MapPut("/unassignOpportunity", UnassignOpportunity);
        group.MapPut("/assignCampaign", AssignCampaign);
        group.MapPut("/unassignCampaign", UnassignCampaign);


        return app;
    }

    private static async Task<IResult> Create(
        EmailMessageRequest request,
        IEmailMessageService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToEmailMessage( request );

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
        EmailMessageRequest request,
        IEmailMessageService service,
        CancellationToken cancellationToken) {

        var model = mapRequestToEmailMessage( request );

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
        IEmailMessageService service,
        CancellationToken cancellationToken) {

        var emailMessage = await service.Get(identifier, cancellationToken);
        return emailMessage is null ? Results.NotFound() : Results.Ok( emailMessage );
    }


    private static async Task<IResult> GetAll(
        IEmailMessageService service,
        CancellationToken cancellationToken) {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok( all.Select( EmailMessageResponse.FromModel ) );
        }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IEmailMessageService service,
        CancellationToken cancellationToken) {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOrganization(
        AssociationRequest request,
        IEmailMessageService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignOrganization(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOrganization(
    AssociationRequest request,
    IEmailMessageService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignOrganization(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOwner(
        AssociationRequest request,
        IEmailMessageService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignOwner(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOwner(
    AssociationRequest request,
    IEmailMessageService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignOwner(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignAccount(
        AssociationRequest request,
        IEmailMessageService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignAccount(
    AssociationRequest request,
    IEmailMessageService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignContact(
        AssociationRequest request,
        IEmailMessageService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignContact(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignContact(
    AssociationRequest request,
    IEmailMessageService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignContact(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignLead(
        AssociationRequest request,
        IEmailMessageService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignLead(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignLead(
    AssociationRequest request,
    IEmailMessageService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignLead(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignCase_(
        AssociationRequest request,
        IEmailMessageService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignCase_(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignCase_(
    AssociationRequest request,
    IEmailMessageService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignCase_(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOpportunity(
        AssociationRequest request,
        IEmailMessageService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignOpportunity(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOpportunity(
    AssociationRequest request,
    IEmailMessageService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignOpportunity(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignCampaign(
        AssociationRequest request,
        IEmailMessageService service,
        CancellationToken cancellationToken) {
        var assigned = await service.AssignCampaign(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignCampaign(
    AssociationRequest request,
    IEmailMessageService service,
    CancellationToken cancellationToken) {
        var unassigned = await service.UnassignCampaign(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static EmailMessage mapRequestToEmailMessage( EmailMessageRequest request ) {
        var model = new EmailMessage
        {
            Id = request.Id,
            Subject = request.Subject,
            Body = request.Body,
            SentAt = request.SentAt,
            MessageId = request.MessageId,
            Direction = request.Direction,
            Status = request.Status,
        };
        return model;
    }

}
