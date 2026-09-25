
using bankingonaspdotnet.Domain;
using Microsoft.EntityFrameworkCore;

namespace bankingonaspdotnet.Persistence;

public class KycProfileRepository : IKycProfileRepository
{
    private readonly ApplicationDbContext _db;

    public KycProfileRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<KycProfile?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.KycProfiles
            .Include(x => x.Customer)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<KycProfile>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.KycProfiles
            .AsNoTracking()
            .Include(x => x.Customer)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(KycProfile kycProfile, CancellationToken cancellationToken)
    {
        _db.KycProfiles.Add(kycProfile);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(KycProfile kycProfile, CancellationToken cancellationToken)
    {
        _db.KycProfiles.Update(kycProfile);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(KycProfile kycProfile, CancellationToken cancellationToken)
    {
        _db.KycProfiles.Remove(kycProfile);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task AddToIdentityDocumentsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.IdentityDocuments
            .Where(identityDocument => request.ChildIds.Contains(identityDocument.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    identityDocument => identityDocument.IdentityDocuments_Id,
                    request.ParentId));
    }

    public async Task RemoveFromIdentityDocumentsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.IdentityDocuments
            .Where(identityDocument =>
                request.ChildIds.Contains(identityDocument.Id) &&
                identityDocument.IdentityDocuments_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    identityDocument => identityDocument.IdentityDocuments_Id,
                    (Guid?)null));
    }

    public async Task AddToRiskAssessmentsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.RiskAssessments
            .Where(riskAssessment => request.ChildIds.Contains(riskAssessment.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    riskAssessment => riskAssessment.RiskAssessments_Id,
                    request.ParentId));
    }

    public async Task RemoveFromRiskAssessmentsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.RiskAssessments
            .Where(riskAssessment =>
                request.ChildIds.Contains(riskAssessment.Id) &&
                riskAssessment.RiskAssessments_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    riskAssessment => riskAssessment.RiskAssessments_Id,
                    (Guid?)null));
    }

    public async Task AddToScreeningsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.Screenings
            .Where(screeningResult => request.ChildIds.Contains(screeningResult.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    screeningResult => screeningResult.Screenings_Id,
                    request.ParentId));
    }

    public async Task RemoveFromScreeningsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.Screenings
            .Where(screeningResult =>
                request.ChildIds.Contains(screeningResult.Id) &&
                screeningResult.Screenings_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    screeningResult => screeningResult.Screenings_Id,
                    (Guid?)null));
    }

}
