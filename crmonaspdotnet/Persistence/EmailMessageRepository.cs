
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace crmonaspdotnet.Persistence;

public class EmailMessageRepository : IEmailMessageRepository
{
    private readonly ApplicationDbContext _db;

    public EmailMessageRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<EmailMessage?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.EmailMessages
            .Include(x => x.Organization)
            .Include(x => x.Owner)
            .Include(x => x.Account)
            .Include(x => x.Contact)
            .Include(x => x.Lead)
            .Include(x => x.Case_)
            .Include(x => x.Opportunity)
            .Include(x => x.Campaign)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<EmailMessage>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.EmailMessages
            .AsNoTracking()
            .Include(x => x.Organization)
            .Include(x => x.Owner)
            .Include(x => x.Account)
            .Include(x => x.Contact)
            .Include(x => x.Lead)
            .Include(x => x.Case_)
            .Include(x => x.Opportunity)
            .Include(x => x.Campaign)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(EmailMessage emailMessage, CancellationToken cancellationToken)
    {
        _db.EmailMessages.Add(emailMessage);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(EmailMessage emailMessage, CancellationToken cancellationToken)
    {
        _db.EmailMessages.Update(emailMessage);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(EmailMessage emailMessage, CancellationToken cancellationToken)
    {
        _db.EmailMessages.Remove(emailMessage);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
