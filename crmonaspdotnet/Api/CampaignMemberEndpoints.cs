
using crmonaspdotnet.Service;
using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Api;

public static class CampaignMemberEndpoints
{
    public static IEndpointRouteBuilder MapCampaignMemberEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/campaignMember").WithTags("CampaignMembers");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignCampaign", AssignCampaign);
        group.MapPut("/unassignCampaign", UnassignCampaign);
        group.MapPut("/assignLead", AssignLead);
        group.MapPut("/unassignLead", UnassignLead);
        group.MapPut("/assignContact", AssignContact);
        group.MapPut("/unassignContact", UnassignContact);


        return app;
    }

    private static async Task<IResult> Create(
        CampaignMemberRequest request,
        ICampaignMemberService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToCampaignMember(request);

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
        CampaignMemberRequest request,
        ICampaignMemberService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToCampaignMember(request);

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
        ICampaignMemberService service,
        CancellationToken cancellationToken)
    {

        var campaignMember = await service.Get(identifier, cancellationToken);
        return campaignMember is null ? Results.NotFound() : Results.Ok(campaignMember);
    }


    private static async Task<IResult> GetAll(
        ICampaignMemberService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(CampaignMemberResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ICampaignMemberService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignCampaign(
        AssociationRequest request,
        ICampaignMemberService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignCampaign(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignCampaign(
    AssociationRequest request,
    ICampaignMemberService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignCampaign(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignLead(
        AssociationRequest request,
        ICampaignMemberService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignLead(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignLead(
    AssociationRequest request,
    ICampaignMemberService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignLead(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignContact(
        AssociationRequest request,
        ICampaignMemberService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignContact(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignContact(
    AssociationRequest request,
    ICampaignMemberService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignContact(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static CampaignMember mapRequestToCampaignMember(CampaignMemberRequest request)
    {
        var model = new CampaignMember
        {
            Id = request.Id,
            Responded = request.Responded,
            Status = request.Status,
            MemberType = request.MemberType,
        };
        return model;
    }

}
