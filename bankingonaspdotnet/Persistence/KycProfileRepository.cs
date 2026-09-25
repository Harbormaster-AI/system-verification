
using bankingonaspdotnet.Contracts;
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


    public async Task AddToIdentityDocumentsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.IdentityDocuments
            .Where(identityDocument =>
                request.ChildIds.Contains(identityDocument.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    identityDocument =>
                        EF.Property<Guid?>(
                            identityDocument,
                            "ThirdPartyProvider_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromIdentityDocumentsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.IdentityDocuments
            .Where(identityDocument =>
                request.ChildIds.Contains(identityDocument.Id) &&
                EF.Property<Guid?>(
                    identityDocument,
                    "ThirdPartyProvider_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    identityDocument =>
                        EF.Property<Guid?>(
                            identityDocument,
                            "ThirdPartyProvider_Id"),
                    (Guid?)null));
    }


    public async Task AddToRiskAssessmentsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.RiskAssessments
            .Where(riskAssessment =>
                request.ChildIds.Contains(riskAssessment.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    riskAssessment =>
                        EF.Property<Guid?>(
                            riskAssessment,
                            "ThirdPartyProvider_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromRiskAssessmentsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.RiskAssessments
            .Where(riskAssessment =>
                request.ChildIds.Contains(riskAssessment.Id) &&
                EF.Property<Guid?>(
                    riskAssessment,
                    "ThirdPartyProvider_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    riskAssessment =>
                        EF.Property<Guid?>(
                            riskAssessment,
                            "ThirdPartyProvider_Id"),
                    (Guid?)null));
    }


    public async Task AddToScreeningsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Screenings
            .Where(screeningResult =>
                request.ChildIds.Contains(screeningResult.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    screeningResult =>
                        EF.Property<Guid?>(
                            screeningResult,
                            "ThirdPartyProvider_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromScreeningsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Screenings
            .Where(screeningResult =>
                request.ChildIds.Contains(screeningResult.Id) &&
                EF.Property<Guid?>(
                    screeningResult,
                    "ThirdPartyProvider_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    screeningResult =>
                        EF.Property<Guid?>(
                            screeningResult,
                            "ThirdPartyProvider_Id"),
                    (Guid?)null));
    }

}
