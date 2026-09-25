
using crmonaspdotnet.Service;
using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Api;

public static class ContractEndpoints
{
    public static IEndpointRouteBuilder MapContractEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/contract").WithTags("Contracts");

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

        group.MapPut("/addToOrders", AddToOrders);
        group.MapPut("/removeFromOrders", RemoveFromOrders);

        group.MapPut("/addToCases", AddToCases);
        group.MapPut("/removeFromCases", RemoveFromCases);


        return app;
    }

    private static async Task<IResult> Create(
        ContractRequest request,
        IContractService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToContract(request);

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
        ContractRequest request,
        IContractService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToContract(request);

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
        IContractService service,
        CancellationToken cancellationToken)
    {

        var contract = await service.Get(identifier, cancellationToken);
        return contract is null ? Results.NotFound() : Results.Ok(contract);
    }


    private static async Task<IResult> GetAll(
        IContractService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(ContractResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IContractService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOrganization(
        AssociationRequest request,
        IContractService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignOrganization(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOrganization(
    AssociationRequest request,
    IContractService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignOrganization(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignAccount(
        AssociationRequest request,
        IContractService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignAccount(
    AssociationRequest request,
    IContractService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignOwner(
        AssociationRequest request,
        IContractService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignOwner(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignOwner(
    AssociationRequest request,
    IContractService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignOwner(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToOrders(
        MultipleAssociationRequest request,
        IContractService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToOrders(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromOrders(
        MultipleAssociationRequest request,
        IContractService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromOrders(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToCases(
        MultipleAssociationRequest request,
        IContractService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToCases(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromCases(
        MultipleAssociationRequest request,
        IContractService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromCases(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static Contract mapRequestToContract(ContractRequest request)
    {
        var model = new Contract
        {
            Id = request.Id,
            ContractNumber = request.ContractNumber,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            RenewalTermMonths = request.RenewalTermMonths,
            AutoRenew = request.AutoRenew,
            Status = request.Status,
        };
        return model;
    }

}
