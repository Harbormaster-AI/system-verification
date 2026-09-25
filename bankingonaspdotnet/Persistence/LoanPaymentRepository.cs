
using bankingonaspdotnet.Contracts;
using bankingonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace bankingonaspdotnet.Persistence;

public class LoanPaymentRepository : ILoanPaymentRepository
{
    private readonly ApplicationDbContext _db;

    public LoanPaymentRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<LoanPayment?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.LoanPayments
            .Include(x => x.LoanAccount)
            .Include(x => x.Transaction)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<LoanPayment>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.LoanPayments
            .AsNoTracking()
            .Include(x => x.LoanAccount)
            .Include(x => x.Transaction)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(LoanPayment loanPayment, CancellationToken cancellationToken)
    {
        _db.LoanPayments.Add(loanPayment);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(LoanPayment loanPayment, CancellationToken cancellationToken)
    {
        _db.LoanPayments.Update(loanPayment);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(LoanPayment loanPayment, CancellationToken cancellationToken)
    {
        _db.LoanPayments.Remove(loanPayment);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
