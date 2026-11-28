
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Domain;

public class BusinessCalendar : IValidatableObject
{
    public Guid Id { get; set; } = Guid.NewGuid();

 [Required]
[Length(0, int.MaxValue)]
public required virtual string Name { get; set; } 
 [Required]
[Length(0, int.MaxValue)]
public required virtual string Location { get; set; } 
public virtual ICollection<Holiday> Holidays { get; set; } = new List<Holiday>();

    public static BusinessCalendar FromRequest(BusinessCalendarRequest request) {
        return new BusinessCalendar {
            Id = request.Id,
            Name = request.Name,
            Location = request.Location,
        };
    }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        // TODO: Add custom business validation rules here.

        yield break;
    }
}
