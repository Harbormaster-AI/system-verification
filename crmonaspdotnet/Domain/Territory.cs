
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Domain;

public class Territory
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public virtual long? TerritoryId { get; set; }
    public virtual string? Name { get; set; }
    public virtual string? Region { get; set; }
    public virtual Organization? Organization { get; set; }
    public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();
    public virtual ICollection<User> Users { get; set; } = new List<User>();
    public virtual TerritoryType? TerritoryType { get; set; }

    public static Territory FromRequest(TerritoryRequest request)
    {
        return new Territory
        {
            Id = request.Id,
            Name = request.Name,
            Region = request.Region,
            TerritoryType = request.TerritoryType,
        };
    }
}
