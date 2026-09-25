
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace inventoryonaspdotnet.Persistence;

public class StockKeepingUnitRepository : IStockKeepingUnitRepository
{
    private readonly ApplicationDbContext _db;

    public StockKeepingUnitRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<StockKeepingUnit?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.StockKeepingUnits
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<StockKeepingUnit>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.StockKeepingUnits
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(StockKeepingUnit stockKeepingUnit, CancellationToken cancellationToken)
    {
        _db.StockKeepingUnits.Add(stockKeepingUnit);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(StockKeepingUnit stockKeepingUnit, CancellationToken cancellationToken)
    {
        _db.StockKeepingUnits.Update(stockKeepingUnit);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(StockKeepingUnit stockKeepingUnit, CancellationToken cancellationToken)
    {
        _db.StockKeepingUnits.Remove(stockKeepingUnit);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToInventoryItemsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.InventoryItems
            .Where(inventoryItem =>
                request.ChildIds.Contains(inventoryItem.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    inventoryItem =>
                        EF.Property<Guid?>(
                            inventoryItem,
                            "OutboundAllocation_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromInventoryItemsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.InventoryItems
            .Where(inventoryItem =>
                request.ChildIds.Contains(inventoryItem.Id) &&
                EF.Property<Guid?>(
                    inventoryItem,
                    "OutboundAllocation_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    inventoryItem =>
                        EF.Property<Guid?>(
                            inventoryItem,
                            "OutboundAllocation_Id"),
                    (Guid?)null));
    }


    public async Task AddToUomConversionsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.UoMConversions
            .Where(uoMConversion =>
                request.ChildIds.Contains(uoMConversion.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    uoMConversion =>
                        EF.Property<Guid?>(
                            uoMConversion,
                            "OutboundAllocation_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromUomConversionsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.UoMConversions
            .Where(uoMConversion =>
                request.ChildIds.Contains(uoMConversion.Id) &&
                EF.Property<Guid?>(
                    uoMConversion,
                    "OutboundAllocation_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    uoMConversion =>
                        EF.Property<Guid?>(
                            uoMConversion,
                            "OutboundAllocation_Id"),
                    (Guid?)null));
    }


    public async Task AddToReplenishmentPoliciesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.ReplenishmentPolicys
            .Where(replenishmentPolicy =>
                request.ChildIds.Contains(replenishmentPolicy.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    replenishmentPolicy =>
                        EF.Property<Guid?>(
                            replenishmentPolicy,
                            "OutboundAllocation_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromReplenishmentPoliciesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.ReplenishmentPolicys
            .Where(replenishmentPolicy =>
                request.ChildIds.Contains(replenishmentPolicy.Id) &&
                EF.Property<Guid?>(
                    replenishmentPolicy,
                    "OutboundAllocation_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    replenishmentPolicy =>
                        EF.Property<Guid?>(
                            replenishmentPolicy,
                            "OutboundAllocation_Id"),
                    (Guid?)null));
    }


    public async Task AddToLotsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Lots
            .Where(lot =>
                request.ChildIds.Contains(lot.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    lot =>
                        EF.Property<Guid?>(
                            lot,
                            "OutboundAllocation_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromLotsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Lots
            .Where(lot =>
                request.ChildIds.Contains(lot.Id) &&
                EF.Property<Guid?>(
                    lot,
                    "OutboundAllocation_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    lot =>
                        EF.Property<Guid?>(
                            lot,
                            "OutboundAllocation_Id"),
                    (Guid?)null));
    }


    public async Task AddToSerialNumbersAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.SerialNumbers
            .Where(serialNumber =>
                request.ChildIds.Contains(serialNumber.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    serialNumber =>
                        EF.Property<Guid?>(
                            serialNumber,
                            "OutboundAllocation_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromSerialNumbersAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.SerialNumbers
            .Where(serialNumber =>
                request.ChildIds.Contains(serialNumber.Id) &&
                EF.Property<Guid?>(
                    serialNumber,
                    "OutboundAllocation_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    serialNumber =>
                        EF.Property<Guid?>(
                            serialNumber,
                            "OutboundAllocation_Id"),
                    (Guid?)null));
    }

}
