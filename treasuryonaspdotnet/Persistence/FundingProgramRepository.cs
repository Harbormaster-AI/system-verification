
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace treasuryonaspdotnet.Persistence;

public class FundingProgramRepository : IFundingProgramRepository
{
    private readonly ApplicationDbContext _db;

    public FundingProgramRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<FundingProgram?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.FundingPrograms
            .Include(x => x.TreasuryUnit)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<FundingProgram>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.FundingPrograms
            .AsNoTracking()
            .Include(x => x.TreasuryUnit)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(FundingProgram fundingProgram, CancellationToken cancellationToken)
    {
        _db.FundingPrograms.Add(fundingProgram);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(FundingProgram fundingProgram, CancellationToken cancellationToken)
    {
        _db.FundingPrograms.Update(fundingProgram);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(FundingProgram fundingProgram, CancellationToken cancellationToken)
    {
        _db.FundingPrograms.Remove(fundingProgram);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToIssuancesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Issuances
            .Where(issuance =>
                request.ChildIds.Contains(issuance.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    issuance =>
                        EF.Property<Guid?>(
                            issuance,
                            "Holiday_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromIssuancesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Issuances
            .Where(issuance =>
                request.ChildIds.Contains(issuance.Id) &&
                EF.Property<Guid?>(
                    issuance,
                    "Holiday_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    issuance =>
                        EF.Property<Guid?>(
                            issuance,
                            "Holiday_Id"),
                    (Guid?)null));
    }

}
