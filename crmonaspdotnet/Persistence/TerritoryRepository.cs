
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace crmonaspdotnet.Persistence;

public class TerritoryRepository : ITerritoryRepository
{
    private readonly ApplicationDbContext _db;

    public TerritoryRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Territory?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Territorys
            .Include(x => x.Organization)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Territory>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Territorys
            .AsNoTracking()
            .Include(x => x.Organization)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Territory territory, CancellationToken cancellationToken)
    {
        _db.Territorys.Add(territory);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Territory territory, CancellationToken cancellationToken)
    {
        _db.Territorys.Update(territory);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Territory territory, CancellationToken cancellationToken)
    {
        _db.Territorys.Remove(territory);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToAccountsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Accounts
            .Where(account =>
                request.ChildIds.Contains(account.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    account =>
                        EF.Property<Guid?>(
                            account,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromAccountsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Accounts
            .Where(account =>
                request.ChildIds.Contains(account.Id) &&
                EF.Property<Guid?>(
                    account,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    account =>
                        EF.Property<Guid?>(
                            account,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }


    public async Task AddToUsersAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Users
            .Where(user =>
                request.ChildIds.Contains(user.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    user =>
                        EF.Property<Guid?>(
                            user,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromUsersAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Users
            .Where(user =>
                request.ChildIds.Contains(user.Id) &&
                EF.Property<Guid?>(
                    user,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    user =>
                        EF.Property<Guid?>(
                            user,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }

}
