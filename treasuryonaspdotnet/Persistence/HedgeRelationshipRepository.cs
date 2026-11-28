
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class HedgeRelationshipRepository : IHedgeRelationshipRepository
{
    private readonly ApplicationDbContext _db;

    public HedgeRelationshipRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<HedgeRelationship?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.HedgeRelationships
            .Include(x => x.HedgedItem)
            .Include(x => x.HedgingInstrument)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<HedgeRelationship>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.HedgeRelationships
            .AsNoTracking()
            .Include(x => x.HedgedItem)
            .Include(x => x.HedgingInstrument)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(HedgeRelationship hedgeRelationship, CancellationToken cancellationToken)
    {
        _db.HedgeRelationships.Add(hedgeRelationship);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(HedgeRelationship hedgeRelationship, CancellationToken cancellationToken)
    {
        _db.HedgeRelationships.Update(hedgeRelationship);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(HedgeRelationship hedgeRelationship, CancellationToken cancellationToken)
    {
        _db.HedgeRelationships.Remove(hedgeRelationship);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToAccountingEntriesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.AccountingEntrys
            .Where(accountingEntry =>
                request.ChildIds.Contains(accountingEntry.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    accountingEntry =>
                        EF.Property<Guid?>(
                            accountingEntry,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromAccountingEntriesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.AccountingEntrys
            .Where(accountingEntry =>
                request.ChildIds.Contains(accountingEntry.Id) &&
                EF.Property<Guid?>(
                    accountingEntry,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    accountingEntry =>
                        EF.Property<Guid?>(
                            accountingEntry,
                            "Holiday_Id"),
                    (Guid?)null));
    }

}
