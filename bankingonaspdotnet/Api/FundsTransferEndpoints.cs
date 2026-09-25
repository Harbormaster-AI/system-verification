
using bankingonaspdotnet.Service;
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Api;

public static class FundsTransferEndpoints
{
    public static IEndpointRouteBuilder MapFundsTransferEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/fundsTransfer").WithTags("FundsTransfers");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignSourceAccount", AssignSourceAccount);
        group.MapPut("/unassignSourceAccount", UnassignSourceAccount);
        group.MapPut("/assignDestinationAccount", AssignDestinationAccount);
        group.MapPut("/unassignDestinationAccount", UnassignDestinationAccount);
        group.MapPut("/assignExternalBeneficiary", AssignExternalBeneficiary);
        group.MapPut("/unassignExternalBeneficiary", UnassignExternalBeneficiary);
        group.MapPut("/assignInitiatedBy", AssignInitiatedBy);
        group.MapPut("/unassignInitiatedBy", UnassignInitiatedBy);

        group.MapPut("/addToTransactions", AddToTransactions);
        group.MapPut("/removeFromTransactions", RemoveFromTransactions);


        return app;
    }

    private static async Task<IResult> Create(
        FundsTransferRequest request,
        IFundsTransferService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToFundsTransfer(request);

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
        FundsTransferRequest request,
        IFundsTransferService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToFundsTransfer(request);

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
        IFundsTransferService service,
        CancellationToken cancellationToken)
    {

        var fundsTransfer = await service.Get(identifier, cancellationToken);
        return fundsTransfer is null ? Results.NotFound() : Results.Ok(fundsTransfer);
    }


    private static async Task<IResult> GetAll(
        IFundsTransferService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(FundsTransferResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        IFundsTransferService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignSourceAccount(
        AssociationRequest request,
        IFundsTransferService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignSourceAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignSourceAccount(
    AssociationRequest request,
    IFundsTransferService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignSourceAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignDestinationAccount(
        AssociationRequest request,
        IFundsTransferService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignDestinationAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignDestinationAccount(
    AssociationRequest request,
    IFundsTransferService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignDestinationAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignExternalBeneficiary(
        AssociationRequest request,
        IFundsTransferService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignExternalBeneficiary(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignExternalBeneficiary(
    AssociationRequest request,
    IFundsTransferService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignExternalBeneficiary(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignInitiatedBy(
        AssociationRequest request,
        IFundsTransferService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignInitiatedBy(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignInitiatedBy(
    AssociationRequest request,
    IFundsTransferService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignInitiatedBy(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static async Task<IResult> AddToTransactions(
        MultipleAssociationRequest request,
        IFundsTransferService service,
        CancellationToken cancellationToken)
    {
        var addTo = await service.AddToTransactions(request, cancellationToken);
        return addTo ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> RemoveFromTransactions(
        MultipleAssociationRequest request,
        IFundsTransferService service,
        CancellationToken cancellationToken)
    {
        var removeFrom = await service.RemoveFromTransactions(request, cancellationToken);
        return removeFrom ? Results.NoContent() : Results.NotFound();
    }
    private static FundsTransfer mapRequestToFundsTransfer(FundsTransferRequest request)
    {
        var model = new FundsTransfer
        {
            Id = request.Id,
            TransferReference = request.TransferReference,
            Amount = request.Amount,
            RequestedDate = request.RequestedDate,
            ExecutionDate = request.ExecutionDate,
            Purpose = request.Purpose,
            FeeAmount = request.FeeAmount,
            Method = request.Method,
            Status = request.Status,
        };
        return model;
    }

}
