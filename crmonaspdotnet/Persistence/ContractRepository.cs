
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace crmonaspdotnet.Persistence;

public class ContractRepository : IContractRepository
{
    private readonly ApplicationDbContext _db;

    public ContractRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Contract?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Contracts
            .Include(x => x.Organization)
            .Include(x => x.Account)
            .Include(x => x.Owner)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Contract>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Contracts
            .AsNoTracking()
            .Include(x => x.Organization)
            .Include(x => x.Account)
            .Include(x => x.Owner)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Contract contract, CancellationToken cancellationToken)
    {
        _db.Contracts.Add(contract);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Contract contract, CancellationToken cancellationToken)
    {
        _db.Contracts.Update(contract);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Contract contract, CancellationToken cancellationToken)
    {
        _db.Contracts.Remove(contract);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToOrdersAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Orders
            .Where(order =>
                request.ChildIds.Contains(order.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    order =>
                        EF.Property<Guid?>(
                            order,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromOrdersAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Orders
            .Where(order =>
                request.ChildIds.Contains(order.Id) &&
                EF.Property<Guid?>(
                    order,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    order =>
                        EF.Property<Guid?>(
                            order,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }


    public async Task AddToCasesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Case_s
            .Where(case_ =>
                request.ChildIds.Contains(case_.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    case_ =>
                        EF.Property<Guid?>(
                            case_,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromCasesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Case_s
            .Where(case_ =>
                request.ChildIds.Contains(case_.Id) &&
                EF.Property<Guid?>(
                    case_,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    case_ =>
                        EF.Property<Guid?>(
                            case_,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }

}
