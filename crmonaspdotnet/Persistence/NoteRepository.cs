
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace crmonaspdotnet.Persistence;

public class NoteRepository : INoteRepository
{
    private readonly ApplicationDbContext _db;

    public NoteRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Note?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Notes
            .Include(x => x.Organization)
            .Include(x => x.Owner)
            .Include(x => x.Account)
            .Include(x => x.Contact)
            .Include(x => x.Opportunity)
            .Include(x => x.Case_)
            .Include(x => x.Lead)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Note>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Notes
            .AsNoTracking()
            .Include(x => x.Organization)
            .Include(x => x.Owner)
            .Include(x => x.Account)
            .Include(x => x.Contact)
            .Include(x => x.Opportunity)
            .Include(x => x.Case_)
            .Include(x => x.Lead)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Note note, CancellationToken cancellationToken)
    {
        _db.Notes.Add(note);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Note note, CancellationToken cancellationToken)
    {
        _db.Notes.Update(note);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Note note, CancellationToken cancellationToken)
    {
        _db.Notes.Remove(note);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
