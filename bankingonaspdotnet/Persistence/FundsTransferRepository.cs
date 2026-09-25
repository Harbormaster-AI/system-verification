
using bankingonaspdotnet.Contracts;
using bankingonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace bankingonaspdotnet.Persistence;

public class FundsTransferRepository : IFundsTransferRepository
{
    private readonly ApplicationDbContext _db;

    public FundsTransferRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<FundsTransfer?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.FundsTransfers
            .Include(x => x.SourceAccount)
            .Include(x => x.DestinationAccount)
            .Include(x => x.ExternalBeneficiary)
            .Include(x => x.InitiatedBy)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<FundsTransfer>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.FundsTransfers
            .AsNoTracking()
            .Include(x => x.SourceAccount)
            .Include(x => x.DestinationAccount)
            .Include(x => x.ExternalBeneficiary)
            .Include(x => x.InitiatedBy)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(FundsTransfer fundsTransfer, CancellationToken cancellationToken)
    {
        _db.FundsTransfers.Add(fundsTransfer);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(FundsTransfer fundsTransfer, CancellationToken cancellationToken)
    {
        _db.FundsTransfers.Update(fundsTransfer);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(FundsTransfer fundsTransfer, CancellationToken cancellationToken)
    {
        _db.FundsTransfers.Remove(fundsTransfer);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task AddToTransactionsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.Transactions
            .Where(transaction => request.ChildIds.Contains(transaction.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    transaction => transaction.Transactions_Id,
                    request.ParentId));
    }

    public async Task RemoveFromTransactionsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        await _context.Transactions
            .Where(transaction =>
                request.ChildIds.Contains(transaction.Id) &&
                transaction.Transactions_Id == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    transaction => transaction.Transactions_Id,
                    (Guid?)null));
    }

}
