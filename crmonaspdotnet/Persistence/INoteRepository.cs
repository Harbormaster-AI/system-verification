using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Persistence;

public interface INoteRepository
{
    Task<Note?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Note>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Note note, CancellationToken cancellationToken);
    Task UpdateAsync(Note note, CancellationToken cancellationToken);
    Task DeleteAsync(Note note, CancellationToken cancellationToken);


}
