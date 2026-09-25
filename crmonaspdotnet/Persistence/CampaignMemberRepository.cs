
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace crmonaspdotnet.Persistence;

public class CampaignMemberRepository : ICampaignMemberRepository
{
    private readonly ApplicationDbContext _db;

    public CampaignMemberRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<CampaignMember?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.CampaignMembers
            .Include(x => x.Campaign)
            .Include(x => x.Lead)
            .Include(x => x.Contact)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<CampaignMember>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.CampaignMembers
            .AsNoTracking()
            .Include(x => x.Campaign)
            .Include(x => x.Lead)
            .Include(x => x.Contact)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(CampaignMember campaignMember, CancellationToken cancellationToken)
    {
        _db.CampaignMembers.Add(campaignMember);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(CampaignMember campaignMember, CancellationToken cancellationToken)
    {
        _db.CampaignMembers.Update(campaignMember);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(CampaignMember campaignMember, CancellationToken cancellationToken)
    {
        _db.CampaignMembers.Remove(campaignMember);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
