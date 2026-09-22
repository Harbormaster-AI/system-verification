using bankingonaspdotnet.Domain;
using Microsoft.EntityFrameworkCore;

namespace bankingonaspdotnet.Persistence;

public class PaymentCardRepository : IPaymentCardRepository
{
    private readonly ApplicationDbContext _db;

    public PaymentCardRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<PaymentCard?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.PaymentCards
            .Include(x => x.Bank)
            .Include(x => x.Account)
            .Include(x => x.Customer)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<PaymentCard>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.PaymentCards
            .AsNoTracking()
            .Include(x => x.Bank)
            .Include(x => x.Account)
            .Include(x => x.Customer)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(PaymentCard paymentCard, CancellationToken cancellationToken)
    {
        _db.PaymentCards.Add(paymentCard);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(PaymentCard paymentCard, CancellationToken cancellationToken)
    {
        _db.PaymentCards.Update(paymentCard);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(PaymentCard paymentCard, CancellationToken cancellationToken)
    {
        _db.PaymentCards.Remove(paymentCard);
        await _db.SaveChangesAsync(cancellationToken);
    }
}
