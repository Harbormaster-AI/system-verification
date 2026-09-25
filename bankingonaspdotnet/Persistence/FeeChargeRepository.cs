using bankingonaspdotnet.Domain;
using Microsoft.EntityFrameworkCore;

namespace bankingonaspdotnet.Persistence;

public class FeeChargeRepository : IFeeChargeRepository
{
    private readonly ApplicationDbContext _db;

    public FeeChargeRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<FeeCharge?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.FeeCharges
            .Include(x => x.Account)
            .Include(x => x.LoanAccount)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<FeeCharge>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.FeeCharges
            .AsNoTracking()
            .Include(x => x.Account)
            .Include(x => x.LoanAccount)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(FeeCharge feeCharge, CancellationToken cancellationToken)
    {
        _db.FeeCharges.Add(feeCharge);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(FeeCharge feeCharge, CancellationToken cancellationToken)
    {
        _db.FeeCharges.Update(feeCharge);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(FeeCharge feeCharge, CancellationToken cancellationToken)
    {
        _db.FeeCharges.Remove(feeCharge);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
