
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Domain;

public class Note
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? NoteId { get; set; } 
 public virtual string? Title { get; set; } 
 public virtual string? Content { get; set; } 
 public virtual DateTime? CreatedAt { get; set; } 
 public virtual DateTime? UpdatedAt { get; set; } 
public virtual Organization? Organization { get; set; } 
public virtual User? Owner { get; set; } 
public virtual Account? Account { get; set; } 
public virtual Contact? Contact { get; set; } 
public virtual Opportunity? Opportunity { get; set; } 
public virtual Case_? Case_ { get; set; } 
public virtual Lead? Lead { get; set; } 

    public static Note FromRequest(NoteRequest request) {
        return new Note {
            Id = request.Id,
            Title = request.Title,
            Content = request.Content,
            CreatedAt = request.CreatedAt,
            UpdatedAt = request.UpdatedAt,
        };
    }
}
