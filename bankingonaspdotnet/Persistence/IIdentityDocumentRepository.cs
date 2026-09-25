using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Persistence;

public interface IIdentityDocumentRepository
{
    Task<IdentityDocument?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<IdentityDocument>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(IdentityDocument identityDocument, CancellationToken cancellationToken);
    Task UpdateAsync(IdentityDocument identityDocument, CancellationToken cancellationToken);
    Task DeleteAsync(IdentityDocument identityDocument, CancellationToken cancellationToken);


}
