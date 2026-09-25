
using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Persistence;
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Telemetry;

namespace inventoryonaspdotnet.Service;

public interface IStockKeepingUnitService
{

    Task Create(StockKeepingUnit model, CancellationToken cancellationToken);
    Task<bool> Update(StockKeepingUnit model, CancellationToken cancellationToken);
    Task<StockKeepingUnit?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<StockKeepingUnit>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------

    Task<bool> AddToInventoryItems(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromInventoryItems(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToUomConversions(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromUomConversions(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToReplenishmentPolicies(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromReplenishmentPolicies(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToLots(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromLots(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToSerialNumbers(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromSerialNumbers(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class StockKeepingUnitService : IStockKeepingUnitService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IStockKeepingUnitRepository _repository;
    private readonly ILogger<StockKeepingUnitService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public StockKeepingUnitService(
        ApplicationTelemetry telemetry,
        IStockKeepingUnitRepository repository,
        ILogger<StockKeepingUnitService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(StockKeepingUnit model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "StockKeepingUnit",
                "CreateStockKeepingUnit",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(StockKeepingUnit model, CancellationToken cancellationToken)
    {
        try
        {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.SkuCode = model.SkuCode;
            existing.Name = model.Name;
            existing.Weight = model.Weight;
            existing.WeightUnit = model.WeightUnit;
            existing.Volume = model.Volume;
            existing.VolumeUnit = model.VolumeUnit;
            existing.ShelfLifeDays = model.ShelfLifeDays;
            existing.HazardousMaterial = model.HazardousMaterial;
            existing.ItemType = model.ItemType;
            existing.UnitOfMeasure = model.UnitOfMeasure;

            await _telemetry.Execute(
                "StockKeepingUnit",
                "UpdateStockKeepingUnit",
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

    public Task<StockKeepingUnit?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<StockKeepingUnit>> GetAll(CancellationToken cancellationToken)
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
                "StockKeepingUnit",
                "UpdateStockKeepingUnit",
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


    public async Task<bool> AddToInventoryItems(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "StockKeepingUnit",
                "AddToInventoryItems",
                () => _repository.AddToInventoryItemsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromInventoryItems(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "StockKeepingUnit",
                "RemoveFromInventoryItems",
                () => _repository.RemoveFromInventoryItemsAsync(request, cancellationToken));
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

    public async Task<bool> AddToUomConversions(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "StockKeepingUnit",
                "AddToUomConversions",
                () => _repository.AddToUomConversionsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromUomConversions(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "StockKeepingUnit",
                "RemoveFromUomConversions",
                () => _repository.RemoveFromUomConversionsAsync(request, cancellationToken));
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

    public async Task<bool> AddToReplenishmentPolicies(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "StockKeepingUnit",
                "AddToReplenishmentPolicies",
                () => _repository.AddToReplenishmentPoliciesAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromReplenishmentPolicies(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "StockKeepingUnit",
                "RemoveFromReplenishmentPolicies",
                () => _repository.RemoveFromReplenishmentPoliciesAsync(request, cancellationToken));
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

    public async Task<bool> AddToLots(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "StockKeepingUnit",
                "AddToLots",
                () => _repository.AddToLotsAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromLots(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "StockKeepingUnit",
                "RemoveFromLots",
                () => _repository.RemoveFromLotsAsync(request, cancellationToken));
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

    public async Task<bool> AddToSerialNumbers(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "StockKeepingUnit",
                "AddToSerialNumbers",
                () => _repository.AddToSerialNumbersAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromSerialNumbers(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "StockKeepingUnit",
                "RemoveFromSerialNumbers",
                () => _repository.RemoveFromSerialNumbersAsync(request, cancellationToken));
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
