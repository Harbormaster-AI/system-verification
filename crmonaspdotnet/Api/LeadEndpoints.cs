
using crmonaspdotnet.Service;
using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Api;

public static class LeadEndpoints
{
    public static IEndpointRouteBuilder MapLeadEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/lead").WithTags("Leads");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignOrganization", AssignOrganization);
        group.MapPut("/unassignOrganization", UnassignOrganization);
        group.MapPut("/assignOwner", AssignOwner);
        group.MapPut("/unassignOwner", UnassignOwner);
        group.MapPut("/assignConvertedAccount", AssignConvertedAccount);
        group.MapPut("/unassignConvertedAccount", UnassignConvertedAccount);
        group.MapPut("/assignConvertedContact", AssignConvertedContact);
        group.MapPut("/unassignConvertedContact", UnassignConvertedContact);
        group.MapPut("/assignConvertedOpportunity", AssignConvertedOpportunity);
        group.MapPut("/unassignConvertedOpportunity", UnassignConvertedOpportunity);

        group.MapPut("/addToActivities", AddToActivities);
        group.MapPut("/removeFromActivities", RemoveFromActivities);

        group.MapPut("/addToCampaigns", AddToCampaigns);
        group.MapPut("/removeFromCampaigns", RemoveFromCampaigns);

        group.MapPut("/addToNotes", AddToNotes);
        group.MapPut("/removeFromNotes", RemoveFromNotes);

        group.MapPut("/addToEmailMessages", AddToEmailMessages);
        group.MapPut("/removeFromEmailMessages", RemoveFromEmailMessages);


        return app;
    }

    private static async Task<IResult> Create(
        LeadRequest request,
        ILeadService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToLead(request);

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
        LeadRequest request,
        ILeadService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToLead(request);

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
        ILeadService service,
        CancellationToken cancellationToken)
    {

        var lead = await service.Get(identifier, cancellationToken);
        return lead is null ? Results.NotFound() : Results.Ok(lead);
    }


    private static async Task<IResult> GetAll(
        ILeadService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(LeadResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ILeadService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOrganization(
        AssociationRequest request,
        ILeadService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignOrganization(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOrganization(
    AssociationRequest request,
    ILeadService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignOrganization(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOwner(
        AssociationRequest request,
        ILeadService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignOwner(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOwner(
    AssociationRequest request,
    ILeadService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignOwner(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignConvertedAccount(
        AssociationRequest request,
        ILeadService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignConvertedAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignConvertedAccount(
    AssociationRequest request,
    ILeadService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignConvertedAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignConvertedContact(
        AssociationRequest request,
        ILeadService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignConvertedContact(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignConvertedContact(
    AssociationRequest request,
    ILeadService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignConvertedContact(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignConvertedOpportunity(
        AssociationRequest request,
        ILeadService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignConvertedOpportunity(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignConvertedOpportunity(
    AssociationRequest request,
    ILeadService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignConvertedOpportunity(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToActivities(
        MultipleAssociationRequest request,
        ILeadService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToActivities(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromActivities(
        MultipleAssociationRequest request,
        ILeadService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromActivities(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToCampaigns(
        MultipleAssociationRequest request,
        ILeadService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToCampaigns(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromCampaigns(
        MultipleAssociationRequest request,
        ILeadService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromCampaigns(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToNotes(
        MultipleAssociationRequest request,
        ILeadService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToNotes(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromNotes(
        MultipleAssociationRequest request,
        ILeadService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromNotes(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToEmailMessages(
        MultipleAssociationRequest request,
        ILeadService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToEmailMessages(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromEmailMessages(
        MultipleAssociationRequest request,
        ILeadService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromEmailMessages(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static Lead mapRequestToLead(LeadRequest request)
    {
        var model = new Lead
        {
            Id = request.Id,
            FirstName = request.FirstName,
            LastName = request.LastName,
            Company = request.Company,
            Email = request.Email,
            Phone = request.Phone,
            Converted = request.Converted,
            Status = request.Status,
            Source = request.Source,
            Rating = request.Rating,
        };
        return model;
    }

}
