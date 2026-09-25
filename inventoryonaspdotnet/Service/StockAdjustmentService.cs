
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Persistence;
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Telemetry;

namespace inventoryonaspdotnet.Service;

public interface IStockAdjustmentService {

    Task Create(StockAdjustment model , CancellationToken cancellationToken);
    Task<bool> Update(StockAdjustment model, CancellationToken cancellationToken);
    Task<StockAdjustment?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<StockAdjustment>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignWarehouse(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignWarehouse(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToLines(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromLines(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToTransactions(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromTransactions(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class StockAdjustmentService : IStockAdjustmentService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IStockAdjustmentRepository _repository;
    private readonly ILogger<StockAdjustmentService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public StockAdjustmentService(
        ApplicationTelemetry telemetry,
        IStockAdjustmentRepository repository,
        ILogger<StockAdjustmentService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(StockAdjustment model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "StockAdjustment",
                "CreateStockAdjustment",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(StockAdjustment model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.AdjustmentNumber = model.AdjustmentNumber;
            existing.Reason = model.Reason;
            existing.AdjustmentDate = model.AdjustmentDate;
            existing.AdjustmentType = model.AdjustmentType;
            existing.Status = model.Status;

            await _telemetry.Execute(
                "StockAdjustment",
                "UpdateStockAdjustment",
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

    public Task<StockAdjustment?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<StockAdjustment>> GetAll(CancellationToken cancellationToken)
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
                "StockAdjustment",
                "UpdateStockAdjustment",
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

    public async Task<bool> AssignWarehouse(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No StockAdjustment found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<WarehouseService>().Get(childRequest, cancellationToken);
            parent.Warehouse = child;
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

    public async Task<bool> UnassignWarehouse(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No StockAdjustment found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Warehouse = null;
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
                "StockAdjustment",
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
                "StockAdjustment",
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
                "StockAdjustment",
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
                "StockAdjustment",
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
