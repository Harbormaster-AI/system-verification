
using bankingonaspdotnet.Service;
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Api;

public static class DisputeEndpoints
{
    public static IEndpointRouteBuilder MapDisputeEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/dispute").WithTags("Disputes");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignTransaction", AssignTransaction);
        group.MapPut("/unassignTransaction", UnassignTransaction);
        group.MapPut("/assignCustomer", AssignCustomer);
        group.MapPut("/unassignCustomer", UnassignCustomer);
        group.MapPut("/assignAccount", AssignAccount);
        group.MapPut("/unassignAccount", UnassignAccount);
        group.MapPut("/assignPaymentCard", AssignPaymentCard);
        group.MapPut("/unassignPaymentCard", UnassignPaymentCard);


        return app;
    }

    private static async Task<IResult> Create(
        DisputeRequest request,
        IDisputeService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToDispute(request);

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
        DisputeRequest request,
        IDisputeService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToDispute(request);

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
        IDisputeService service,
        CancellationToken cancellationToken)
    {

        var dispute = await service.Get(identifier, cancellationToken);
        return dispute is null ? Results.NotFound() : Results.Ok(dispute);
    }


    private static async Task<IResult> GetAll(
        IDisputeService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(DisputeResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IDisputeService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignTransaction(
        AssociationRequest request,
        IDisputeService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignTransaction(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignTransaction(
    AssociationRequest request,
    IDisputeService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignTransaction(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignCustomer(
        AssociationRequest request,
        IDisputeService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignCustomer(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignCustomer(
    AssociationRequest request,
    IDisputeService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignCustomer(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignAccount(
        AssociationRequest request,
        IDisputeService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignAccount(
    AssociationRequest request,
    IDisputeService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignPaymentCard(
        AssociationRequest request,
        IDisputeService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignPaymentCard(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignPaymentCard(
    AssociationRequest request,
    IDisputeService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignPaymentCard(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static Dispute mapRequestToDispute(DisputeRequest request)
    {
        var model = new Dispute
        {
            Id = request.Id,
            DisputeReference = request.DisputeReference,
            RaisedOn = request.RaisedOn,
            Reason = request.Reason,
            Status = request.Status,
        };
        return model;
    }

}
