using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Persistence;

public interface IEmailMessageRepository
{
    Task<EmailMessage?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<EmailMessage>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(EmailMessage emailMessage, CancellationToken cancellationToken);
    Task UpdateAsync(EmailMessage emailMessage, CancellationToken cancellationToken);
    Task DeleteAsync(EmailMessage emailMessage, CancellationToken cancellationToken);


}
