using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Persistence;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Service;

public interface ILoanPaymentService
{

    Task Create(LoanPayment model, CancellationToken cancellationToken);
    Task<bool> Update(LoanPayment model, CancellationToken cancellationToken);
    Task<LoanPayment?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<LoanPayment>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);

    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignLoanAccount(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignLoanAccount(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignTransaction(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignTransaction(AssociationRequest request, CancellationToken cancellationToken);


}

public class LoanPaymentService : ILoanPaymentService
{
    private readonly ILoanPaymentRepository _repository;
    private readonly ILogger<LoanPaymentService> _logger;

    public LoanPaymentService(
        ILoanPaymentRepository repository, ILogger<LoanPaymentService> logger)
    {
        _repository = repository;
        _logger = logger;
    }


    public async Task Create(LoanPayment model, CancellationToken cancellationToken)
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

    public async Task<bool> Update(LoanPayment model, CancellationToken cancellationToken)
    {
        try
        {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.PaymentReference = model.PaymentReference;
            existing.Amount = model.Amount;
            existing.PaymentDate = model.PaymentDate;
            existing.Method = model.Method;
            existing.Status = model.Status;

            await _repository.UpdateAsync(existing, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public Task<LoanPayment?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<LoanPayment>> GetAll(CancellationToken cancellationToken)
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

    public async Task<bool> AssignLoanAccount(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> UnassignLoanAccount(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }

    public async Task<bool> AssignTransaction(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> UnassignTransaction(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }




}
