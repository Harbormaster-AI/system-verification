
using crmonaspdotnet.Service;
using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Api;

public static class ContactEndpoints
{
    public static IEndpointRouteBuilder MapContactEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/contact").WithTags("Contacts");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignOrganization", AssignOrganization);
        group.MapPut("/unassignOrganization", UnassignOrganization);
        group.MapPut("/assignAccount", AssignAccount);
        group.MapPut("/unassignAccount", UnassignAccount);
        group.MapPut("/assignOwner", AssignOwner);
        group.MapPut("/unassignOwner", UnassignOwner);

        group.MapPut("/addToActivities", AddToActivities);
        group.MapPut("/removeFromActivities", RemoveFromActivities);

        group.MapPut("/addToOpportunities", AddToOpportunities);
        group.MapPut("/removeFromOpportunities", RemoveFromOpportunities);

        group.MapPut("/addToCases", AddToCases);
        group.MapPut("/removeFromCases", RemoveFromCases);

        group.MapPut("/addToCampaigns", AddToCampaigns);
        group.MapPut("/removeFromCampaigns", RemoveFromCampaigns);

        group.MapPut("/addToNotes", AddToNotes);
        group.MapPut("/removeFromNotes", RemoveFromNotes);

        group.MapPut("/addToEmailMessages", AddToEmailMessages);
        group.MapPut("/removeFromEmailMessages", RemoveFromEmailMessages);


        return app;
    }

    private static async Task<IResult> Create(
        ContactRequest request,
        IContactService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToContact(request);

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
        ContactRequest request,
        IContactService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToContact(request);

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
        IContactService service,
        CancellationToken cancellationToken)
    {

        var contact = await service.Get(identifier, cancellationToken);
        return contact is null ? Results.NotFound() : Results.Ok(contact);
    }


    private static async Task<IResult> GetAll(
        IContactService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(ContactResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IContactService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOrganization(
        AssociationRequest request,
        IContactService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignOrganization(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOrganization(
    AssociationRequest request,
    IContactService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignOrganization(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignAccount(
        AssociationRequest request,
        IContactService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignAccount(
    AssociationRequest request,
    IContactService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOwner(
        AssociationRequest request,
        IContactService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignOwner(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOwner(
    AssociationRequest request,
    IContactService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignOwner(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToActivities(
        MultipleAssociationRequest request,
        IContactService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToActivities(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromActivities(
        MultipleAssociationRequest request,
        IContactService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromActivities(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToOpportunities(
        MultipleAssociationRequest request,
        IContactService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToOpportunities(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromOpportunities(
        MultipleAssociationRequest request,
        IContactService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromOpportunities(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToCases(
        MultipleAssociationRequest request,
        IContactService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToCases(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromCases(
        MultipleAssociationRequest request,
        IContactService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromCases(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToCampaigns(
        MultipleAssociationRequest request,
        IContactService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToCampaigns(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromCampaigns(
        MultipleAssociationRequest request,
        IContactService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromCampaigns(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToNotes(
        MultipleAssociationRequest request,
        IContactService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToNotes(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromNotes(
        MultipleAssociationRequest request,
        IContactService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromNotes(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToEmailMessages(
        MultipleAssociationRequest request,
        IContactService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToEmailMessages(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromEmailMessages(
        MultipleAssociationRequest request,
        IContactService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromEmailMessages(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static Contact mapRequestToContact(ContactRequest request)
    {
        var model = new Contact
        {
            Id = request.Id,
            FirstName = request.FirstName,
            LastName = request.LastName,
            Title = request.Title,
            Email = request.Email,
            Phone = request.Phone,
            Mobile = request.Mobile,
            MailingAddress = request.MailingAddress,
            PreferredContactMethod = request.PreferredContactMethod,
        };
        return model;
    }

}
