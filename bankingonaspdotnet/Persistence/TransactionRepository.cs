using bankingonaspdotnet.Domain;
using Microsoft.EntityFrameworkCore;

namespace bankingonaspdotnet.Persistence;

public class TransactionRepository : ITransactionRepository
{
    private readonly ApplicationDbContext _db;

    public TransactionRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Transaction?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Transactions
            .Include(x => x.Account)
            .Include(x => x.ExternalCounterparty)
            .Include(x => x.PaymentCard)
            .Include(x => x.FundsTransfer)
            .Include(x => x.FxTrade)
            .Include(x => x.Dispute)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Transaction>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Transactions
            .AsNoTracking()
            .Include(x => x.Account)
            .Include(x => x.ExternalCounterparty)
            .Include(x => x.PaymentCard)
            .Include(x => x.FundsTransfer)
            .Include(x => x.FxTrade)
            .Include(x => x.Dispute)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Transaction transaction, CancellationToken cancellationToken)
    {
        _db.Transactions.Add(transaction);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Transaction transaction, CancellationToken cancellationToken)
    {
        _db.Transactions.Update(transaction);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Transaction transaction, CancellationToken cancellationToken)
    {
        _db.Transactions.Remove(transaction);
        await _db.SaveChangesAsync(cancellationToken);
    }

}
