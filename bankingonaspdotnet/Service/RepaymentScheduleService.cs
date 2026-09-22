using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Persistence;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Service;

public interface IRepaymentScheduleService {

    Task Create(RepaymentSchedule model , CancellationToken cancellationToken);
    Task<bool> Update(RepaymentSchedule model, CancellationToken cancellationToken);
    Task<RepaymentSchedule?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<RepaymentSchedule>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);

    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignLoanAccount(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignLoanAccount(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignPayment(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignPayment(AssociationRequest request, CancellationToken cancellationToken);


}

public class RepaymentScheduleService : IRepaymentScheduleService
{
    private readonly IRepaymentScheduleRepository _repository;
    private readonly ILogger<RepaymentScheduleService> _logger;

    public RepaymentScheduleService(
        IRepaymentScheduleRepository repository, ILogger<RepaymentScheduleService> logger )
    {
        _repository = repository;
        _logger = logger;
    }


    public async Task Create(RepaymentSchedule model, CancellationToken cancellationToken)
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

    public async Task<bool> Update(RepaymentSchedule model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.InstallmentNumber = model.InstallmentNumber;
            existing.DueDate = model.DueDate;
            existing.PrincipalDue = model.PrincipalDue;
            existing.InterestDue = model.InterestDue;
            existing.TotalDue = model.TotalDue;
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

    public Task<RepaymentSchedule?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<RepaymentSchedule>> GetAll(CancellationToken cancellationToken)
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

    public async Task<bool> AssignLoanAccount(AssociationRequest request, CancellationToken cancellationToken) {
        return true;
    }
    public async Task<bool> UnassignLoanAccount(AssociationRequest request, CancellationToken cancellationToken) {
        return true;
    }

    public async Task<bool> AssignPayment(AssociationRequest request, CancellationToken cancellationToken) {
        return true;
    }
    public async Task<bool> UnassignPayment(AssociationRequest request, CancellationToken cancellationToken) {
        return true;
    }




}
