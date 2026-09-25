
using bankingonaspdotnet.Contracts;
using bankingonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace bankingonaspdotnet.Persistence;

public class RepaymentScheduleRepository : IRepaymentScheduleRepository
{
    private readonly ApplicationDbContext _db;

    public RepaymentScheduleRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<RepaymentSchedule?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.RepaymentSchedules
            .Include(x => x.LoanAccount)
            .Include(x => x.Payment)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<RepaymentSchedule>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.RepaymentSchedules
            .AsNoTracking()
            .Include(x => x.LoanAccount)
            .Include(x => x.Payment)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(RepaymentSchedule repaymentSchedule, CancellationToken cancellationToken)
    {
        _db.RepaymentSchedules.Add(repaymentSchedule);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(RepaymentSchedule repaymentSchedule, CancellationToken cancellationToken)
    {
        _db.RepaymentSchedules.Update(repaymentSchedule);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(RepaymentSchedule repaymentSchedule, CancellationToken cancellationToken)
    {
        _db.RepaymentSchedules.Remove(repaymentSchedule);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
