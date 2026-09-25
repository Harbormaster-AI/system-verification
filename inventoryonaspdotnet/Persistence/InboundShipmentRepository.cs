
using inventoryonaspdotnet.Contracts;
using inventoryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace inventoryonaspdotnet.Persistence;

public class InboundShipmentRepository : IInboundShipmentRepository
{
    private readonly ApplicationDbContext _db;

    public InboundShipmentRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<InboundShipment?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.InboundShipments
            .Include(x => x.Warehouse)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<InboundShipment>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.InboundShipments
            .AsNoTracking()
            .Include(x => x.Warehouse)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(InboundShipment inboundShipment, CancellationToken cancellationToken)
    {
        _db.InboundShipments.Add(inboundShipment);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(InboundShipment inboundShipment, CancellationToken cancellationToken)
    {
        _db.InboundShipments.Update(inboundShipment);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(InboundShipment inboundShipment, CancellationToken cancellationToken)
    {
        _db.InboundShipments.Remove(inboundShipment);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToLinesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.InboundShipmentLines
            .Where(inboundShipmentLine =>
                request.ChildIds.Contains(inboundShipmentLine.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    inboundShipmentLine =>
                        EF.Property<Guid?>(
                            inboundShipmentLine,
                            "OutboundAllocation_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromLinesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.InboundShipmentLines
            .Where(inboundShipmentLine =>
                request.ChildIds.Contains(inboundShipmentLine.Id) &&
                EF.Property<Guid?>(
                    inboundShipmentLine,
                    "OutboundAllocation_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    inboundShipmentLine =>
                        EF.Property<Guid?>(
                            inboundShipmentLine,
                            "OutboundAllocation_Id"),
                    (Guid?)null));
    }


    public async Task AddToTransactionsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.InventoryTransactions
            .Where(inventoryTransaction =>
                request.ChildIds.Contains(inventoryTransaction.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    inventoryTransaction =>
                        EF.Property<Guid?>(
                            inventoryTransaction,
                            "OutboundAllocation_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromTransactionsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.InventoryTransactions
            .Where(inventoryTransaction =>
                request.ChildIds.Contains(inventoryTransaction.Id) &&
                EF.Property<Guid?>(
                    inventoryTransaction,
                    "OutboundAllocation_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    inventoryTransaction =>
                        EF.Property<Guid?>(
                            inventoryTransaction,
                            "OutboundAllocation_Id"),
                    (Guid?)null));
    }

}
