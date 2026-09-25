using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Persistence;

public interface ICampaignMemberRepository
{
    Task<CampaignMember?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<CampaignMember>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(CampaignMember campaignMember, CancellationToken cancellationToken);
    Task UpdateAsync(CampaignMember campaignMember, CancellationToken cancellationToken);
    Task DeleteAsync(CampaignMember campaignMember, CancellationToken cancellationToken);


}
