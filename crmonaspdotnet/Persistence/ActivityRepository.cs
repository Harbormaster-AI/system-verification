
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace crmonaspdotnet.Persistence;

public class ActivityRepository : IActivityRepository
{
    private readonly ApplicationDbContext _db;

    public ActivityRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Activity?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Activitys
            .Include(x => x.Organization)
            .Include(x => x.Owner)
            .Include(x => x.Account)
            .Include(x => x.Contact)
            .Include(x => x.Lead)
            .Include(x => x.Opportunity)
            .Include(x => x.Case_)
            .Include(x => x.Campaign)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Activity>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Activitys
            .AsNoTracking()
            .Include(x => x.Organization)
            .Include(x => x.Owner)
            .Include(x => x.Account)
            .Include(x => x.Contact)
            .Include(x => x.Lead)
            .Include(x => x.Opportunity)
            .Include(x => x.Case_)
            .Include(x => x.Campaign)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Activity activity, CancellationToken cancellationToken)
    {
        _db.Activitys.Add(activity);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Activity activity, CancellationToken cancellationToken)
    {
        _db.Activitys.Update(activity);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Activity activity, CancellationToken cancellationToken)
    {
        _db.Activitys.Remove(activity);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
