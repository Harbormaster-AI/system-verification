using bankingonaspdotnet.Service;
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Api;

public static class BranchEndpoints
{
    public static IEndpointRouteBuilder MapBranchEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/branch").WithTags("Branchs");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignBank", AssignBank);
        group.MapPut("/unassignBank", UnassignBank);

        group.MapPut("/addToAccounts", AddToAccounts);
        group.MapPut("/removeFromAccounts", RemoveFromAccounts);

        group.MapPut("/addToLoanAccounts", AddToLoanAccounts);
        group.MapPut("/removeFromLoanAccounts", RemoveFromLoanAccounts);

        group.MapPut("/addToAtms", AddToAtms);
        group.MapPut("/removeFromAtms", RemoveFromAtms);


        return app;
    }

    private static async Task<IResult> Create(
        BranchRequest request,
        IBranchService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToBranch(request);

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
        BranchRequest request,
        IBranchService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToBranch(request);

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
        IBranchService service,
        CancellationToken cancellationToken)
    {

        var branch = await service.Get(identifier, cancellationToken);
        return branch is null ? Results.NotFound() : Results.Ok(branch);
    }


    private static async Task<IResult> GetAll(
        IBranchService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(BranchResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IBranchService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignBank(
        AssociationRequest request,
        IBranchService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignBank(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignBank(
    AssociationRequest request,
    IBranchService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignBank(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToAccounts(
        MultipleAssociationRequest request,
        IBranchService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToAccounts(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromAccounts(
        MultipleAssociationRequest request,
        IBranchService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromAccounts(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToLoanAccounts(
        MultipleAssociationRequest request,
        IBranchService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToLoanAccounts(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromLoanAccounts(
        MultipleAssociationRequest request,
        IBranchService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromLoanAccounts(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static async Task<IResult> AddToAtms(
        MultipleAssociationRequest request,
        IBranchService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToAtms(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromAtms(
        MultipleAssociationRequest request,
        IBranchService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromAtms(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static Branch mapRequestToBranch(BranchRequest request)
    {
        var model = new Branch
        {
            Id = request.Id,
            Name = request.Name,
            BranchCode = request.BranchCode,
            Address = request.Address,
            Phone = request.Phone,
            OpeningHours = request.OpeningHours,
        };
        return model;
    }

}
