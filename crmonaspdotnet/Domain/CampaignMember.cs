
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Domain;

public class CampaignMember
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? CampaignmemberId { get; set; }
    public virtual bool? Responded { get; set; }
    public virtual Campaign? Campaign { get; set; }
    public virtual Lead? Lead { get; set; }
    public virtual Contact? Contact { get; set; }
    public virtual CampaignMemberStatus? Status { get; set; }
    public virtual CampaignMemberType? MemberType { get; set; }

    public static CampaignMember FromRequest(CampaignMemberRequest request)
    {
        return new CampaignMember
        {
            Id = request.Id,
            Responded = request.Responded,
            Status = request.Status,
            MemberType = request.MemberType,
        };
    }
}
