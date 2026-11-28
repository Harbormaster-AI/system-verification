
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class Holiday : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

 [Required]
public required virtual DateOnly Date { get; set; } 
 [Required]
[Length(0, int.MaxValue)]
public required virtual string Description { get; set; } 
public virtual BusinessCalendar? Calendar { get; set; } 

    public static Holiday FromRequest(HolidayRequest request) {
        return new Holiday {
            Id = request.Id,
            Date = request.Date,
            Description = request.Description,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
