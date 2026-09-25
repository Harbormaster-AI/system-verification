
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Persistence;
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Telemetry;

namespace inventoryonaspdotnet.Service;

public interface ITransferOrderService {

    Task Create(TransferOrder model , CancellationToken cancellationToken);
    Task<bool> Update(TransferOrder model, CancellationToken cancellationToken);
    Task<TransferOrder?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<TransferOrder>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignOriginWarehouse(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignOriginWarehouse(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignDestinationWarehouse(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignDestinationWarehouse(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToLines(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromLines(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToTransactions(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromTransactions(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class TransferOrderService : ITransferOrderService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly ITransferOrderRepository _repository;
    private readonly ILogger<TransferOrderService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public TransferOrderService(
        ApplicationTelemetry telemetry,
        ITransferOrderRepository repository,
        ILogger<TransferOrderService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(TransferOrder model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "TransferOrder",
                "CreateTransferOrder",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(TransferOrder model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.OrderNumber = model.OrderNumber;
            existing.RequestedShipDate = model.RequestedShipDate;
            existing.RequestedReceiveDate = model.RequestedReceiveDate;
            existing.ShippedDate = model.ShippedDate;
            existing.ReceivedDate = model.ReceivedDate;
            existing.Status = model.Status;

            await _telemetry.Execute(
                "TransferOrder",
                "UpdateTransferOrder",
                () => _repository.UpdateAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public Task<TransferOrder?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<TransferOrder>> GetAll(CancellationToken cancellationToken)
    => _repository.GetAllAsync(cancellationToken);

    public async Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken)
    {
        var existing = await _repository.GetByIdAsync(identifier.Id, cancellationToken);
        if (existing is null)
        {
            return false;
        }

        try
        {
            await _telemetry.Execute(
                "TransferOrder",
                "UpdateTransferOrder",
                () => _repository.DeleteAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> AssignOriginWarehouse(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No TransferOrder found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<WarehouseService>().Get(childRequest, cancellationToken);
            parent.OriginWarehouse = child;
            await Update( parent, cancellationToken );
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> UnassignOriginWarehouse(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No TransferOrder found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.OriginWarehouse = null;
            await Update( parent, cancellationToken );
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> AssignDestinationWarehouse(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No TransferOrder found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<WarehouseService>().Get(childRequest, cancellationToken);
            parent.DestinationWarehouse = child;
            await Update( parent, cancellationToken );
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> UnassignDestinationWarehouse(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No TransferOrder found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.DestinationWarehouse = null;
            await Update( parent, cancellationToken );
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }


    public async Task<bool> AddToLines(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "TransferOrder",
                "AddToLines",
                () => _repository.AddToLinesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
           _logger.LogError(
                   ex,
                   "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromLines(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "TransferOrder",
                "RemoveFromLines",
                () => _repository.RemoveFromLinesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> AddToTransactions(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "TransferOrder",
                "AddToTransactions",
                () => _repository.AddToTransactionsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
           _logger.LogError(
                   ex,
                   "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromTransactions(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "TransferOrder",
                "RemoveFromTransactions",
                () => _repository.RemoveFromTransactionsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }



}
