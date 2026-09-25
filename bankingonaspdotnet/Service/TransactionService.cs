using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Persistence;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Service;

public interface ITransactionService
{

    Task Create(Transaction model, CancellationToken cancellationToken);
    Task<bool> Update(Transaction model, CancellationToken cancellationToken);
    Task<Transaction?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<Transaction>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);

    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignAccount(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignAccount(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignExternalCounterparty(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignExternalCounterparty(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignPaymentCard(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignPaymentCard(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignFundsTransfer(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignFundsTransfer(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignFxTrade(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignFxTrade(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignDispute(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignDispute(AssociationRequest request, CancellationToken cancellationToken);


}

public class TransactionService : ITransactionService
{
    private readonly ITransactionRepository _repository;
    private readonly ILogger<TransactionService> _logger;

    public TransactionService(
        ITransactionRepository repository, ILogger<TransactionService> logger)
    {
        _repository = repository;
        _logger = logger;
    }


    public async Task Create(Transaction model, CancellationToken cancellationToken)
    {






        try
        {
            await _repository.AddAsync(model, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
        }
    }

    public async Task<bool> Update(Transaction model, CancellationToken cancellationToken)
    {
        try
        {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.BookingDate = model.BookingDate;
            existing.ValueDate = model.ValueDate;
            existing.Amount = model.Amount;
            existing.Description = model.Description;
            existing.Direction = model.Direction;
            existing.TransactionType = model.TransactionType;
            existing.Status = model.Status;
            existing.Channel = model.Channel;

            await _repository.UpdateAsync(existing, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public Task<Transaction?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<Transaction>> GetAll(CancellationToken cancellationToken)
    => _repository.GetAllAsync(cancellationToken);

    public async Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken)
    {
        var existing = await _repository.GetByIdAsync(identifier.Id, cancellationToken);
        if (existing is null)
        {
            return false;
        }

        try
        {
            await _repository.DeleteAsync(existing, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;

    }

    public async Task<bool> AssignAccount(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> UnassignAccount(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }

    public async Task<bool> AssignExternalCounterparty(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> UnassignExternalCounterparty(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }

    public async Task<bool> AssignPaymentCard(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> UnassignPaymentCard(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }

    public async Task<bool> AssignFundsTransfer(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> UnassignFundsTransfer(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }

    public async Task<bool> AssignFxTrade(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> UnassignFxTrade(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }

    public async Task<bool> AssignDispute(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> UnassignDispute(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }




}
