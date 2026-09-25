
using bankingonaspdotnet.Contracts;
using bankingonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace bankingonaspdotnet.Persistence;

public class ThirdPartyProviderRepository : IThirdPartyProviderRepository
{
    private readonly ApplicationDbContext _db;

    public ThirdPartyProviderRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<ThirdPartyProvider?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.ThirdPartyProviders
            .Include(x => x.Bank)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<ThirdPartyProvider>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.ThirdPartyProviders
            .AsNoTracking()
            .Include(x => x.Bank)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(ThirdPartyProvider thirdPartyProvider, CancellationToken cancellationToken)
    {
        _db.ThirdPartyProviders.Add(thirdPartyProvider);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(ThirdPartyProvider thirdPartyProvider, CancellationToken cancellationToken)
    {
        _db.ThirdPartyProviders.Update(thirdPartyProvider);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(ThirdPartyProvider thirdPartyProvider, CancellationToken cancellationToken)
    {
        _db.ThirdPartyProviders.Remove(thirdPartyProvider);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToConsentsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Consents
            .Where(consent =>
                request.ChildIds.Contains(consent.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    consent =>
                        EF.Property<Guid?>(
                            consent,
                            "ThirdPartyProvider_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromConsentsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Consents
            .Where(consent =>
                request.ChildIds.Contains(consent.Id) &&
                EF.Property<Guid?>(
                    consent,
                    "ThirdPartyProvider_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    consent =>
                        EF.Property<Guid?>(
                            consent,
                            "ThirdPartyProvider_Id"),
                    (Guid?)null));
    }

}
