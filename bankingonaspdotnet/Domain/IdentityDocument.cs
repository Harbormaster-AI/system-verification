using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Domain;

public class IdentityDocument
{
    public Guid Id { get; set; } = Guid.NewGuid();

 public virtual long? IdentitydocumentId { get; set; } 
 public virtual string? DocumentNumber { get; set; } 
 public virtual string? IssuingCountry { get; set; } 
 public virtual DateOnly? ExpirationDate { get; set; } 
public virtual KycProfile? KycProfile { get; set; } 
 public virtual IdentityDocumentType? DocumentType { get; set; } 

    public static IdentityDocument FromRequest(IdentityDocumentRequest request) {
        return new IdentityDocument {
            Id = request.Id,
            DocumentNumber = request.DocumentNumber,
            IssuingCountry = request.IssuingCountry,
            ExpirationDate = request.ExpirationDate,
            DocumentType = request.DocumentType,
        };
    }
}
