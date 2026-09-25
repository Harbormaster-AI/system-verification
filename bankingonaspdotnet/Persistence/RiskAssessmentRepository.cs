
using bankingonaspdotnet.Domain;
using Microsoft.EntityFrameworkCore;

namespace bankingonaspdotnet.Persistence;

public class RiskAssessmentRepository : IRiskAssessmentRepository
{
    private readonly ApplicationDbContext _db;

    public RiskAssessmentRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<RiskAssessment?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.RiskAssessments
            .Include(x => x.KycProfile)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<RiskAssessment>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.RiskAssessments
            .AsNoTracking()
            .Include(x => x.KycProfile)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(RiskAssessment riskAssessment, CancellationToken cancellationToken)
    {
        _db.RiskAssessments.Add(riskAssessment);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(RiskAssessment riskAssessment, CancellationToken cancellationToken)
    {
        _db.RiskAssessments.Update(riskAssessment);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(RiskAssessment riskAssessment, CancellationToken cancellationToken)
    {
        _db.RiskAssessments.Remove(riskAssessment);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
