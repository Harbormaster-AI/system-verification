using bankingonaspdotnet.Service;
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Api;

public static class TransactionEndpoints
{
    public static IEndpointRouteBuilder MapTransactionEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/transaction").WithTags("Transactions");

        group.MapPost("/create", Create);
        group.MapPost("/get", Get);
        group.MapGet("/getAll", GetAll);
        group.MapPost("/update", Update);
        group.MapPost("/delete", Delete);

        group.MapPut("/assignAccount", AssignAccount);
        group.MapPut("/unassignAccount", UnassignAccount);
        group.MapPut("/assignExternalCounterparty", AssignExternalCounterparty);
        group.MapPut("/unassignExternalCounterparty", UnassignExternalCounterparty);
        group.MapPut("/assignPaymentCard", AssignPaymentCard);
        group.MapPut("/unassignPaymentCard", UnassignPaymentCard);
        group.MapPut("/assignFundsTransfer", AssignFundsTransfer);
        group.MapPut("/unassignFundsTransfer", UnassignFundsTransfer);
        group.MapPut("/assignFxTrade", AssignFxTrade);
        group.MapPut("/unassignFxTrade", UnassignFxTrade);
        group.MapPut("/assignDispute", AssignDispute);
        group.MapPut("/unassignDispute", UnassignDispute);


        return app;
    }

    private static async Task<IResult> Create(
        TransactionRequest request,
        ITransactionService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToTransaction(request);

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
        TransactionRequest request,
        ITransactionService service,
        CancellationToken cancellationToken)
    {

        var model = mapRequestToTransaction(request);

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
        ITransactionService service,
        CancellationToken cancellationToken)
    {

        var transaction = await service.Get(identifier, cancellationToken);
        return transaction is null ? Results.NotFound() : Results.Ok(transaction);
    }


    private static async Task<IResult> GetAll(
        ITransactionService service,
        CancellationToken cancellationToken)
    {

        var all = await service.GetAll(cancellationToken);
        return Results.Ok(all.Select(TransactionResponse.FromModel));
    }

    private static async Task<IResult> Delete(
        IdentifierRequest identifier,
        ITransactionService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.Delete(identifier, cancellationToken);
        return deleted ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignAccount(
        AssociationRequest request,
        ITransactionService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignAccount(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignAccount(
    AssociationRequest request,
    ITransactionService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignAccount(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignExternalCounterparty(
        AssociationRequest request,
        ITransactionService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignExternalCounterparty(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignExternalCounterparty(
    AssociationRequest request,
    ITransactionService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignExternalCounterparty(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignPaymentCard(
        AssociationRequest request,
        ITransactionService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignPaymentCard(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignPaymentCard(
    AssociationRequest request,
    ITransactionService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignPaymentCard(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignFundsTransfer(
        AssociationRequest request,
        ITransactionService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignFundsTransfer(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignFundsTransfer(
    AssociationRequest request,
    ITransactionService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignFundsTransfer(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignFxTrade(
        AssociationRequest request,
        ITransactionService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignFxTrade(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignFxTrade(
    AssociationRequest request,
    ITransactionService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignFxTrade(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> AssignDispute(
        AssociationRequest request,
        ITransactionService service,
        CancellationToken cancellationToken)
    {
        var assigned = await service.AssignDispute(request, cancellationToken);
        return assigned ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnassignDispute(
    AssociationRequest request,
    ITransactionService service,
    CancellationToken cancellationToken)
    {
        var unassigned = await service.UnassignDispute(request, cancellationToken);
        return unassigned ? Results.NoContent() : Results.NotFound();
    }


    private static Transaction mapRequestToTransaction(TransactionRequest request)
    {
        var model = new Transaction
        {
            Id = request.Id,
            BookingDate = request.BookingDate,
            ValueDate = request.ValueDate,
            Amount = request.Amount,
            Description = request.Description,
            Direction = request.Direction,
            TransactionType = request.TransactionType,
            Status = request.Status,
            Channel = request.Channel,
        };
        return model;
    }

}
