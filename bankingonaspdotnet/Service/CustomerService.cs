using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Persistence;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Service;

public interface ICustomerService
{

    Task Create(Customer model, CancellationToken cancellationToken);
    Task<bool> Update(Customer model, CancellationToken cancellationToken);
    Task<Customer?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<Customer>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);

    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignBank(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignBank(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToLoanAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromLoanAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToPaymentCards(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromPaymentCards(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToExternalAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromExternalAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToFundsTransfers(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromFundsTransfers(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToDisputes(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromDisputes(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToKycProfiles(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromKycProfiles(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToConsents(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromConsents(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class CustomerService : ICustomerService
{
    private readonly ICustomerRepository _repository;
    private readonly ILogger<CustomerService> _logger;

    public CustomerService(
        ICustomerRepository repository, ILogger<CustomerService> logger)
    {
        _repository = repository;
        _logger = logger;
    }


    public async Task Create(Customer model, CancellationToken cancellationToken)
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

    public async Task<bool> Update(Customer model, CancellationToken cancellationToken)
    {
        try
        {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.FirstName = model.FirstName;
            existing.LastName = model.LastName;
            existing.LegalName = model.LegalName;
            existing.DateOfBirth = model.DateOfBirth;
            existing.TaxId = model.TaxId;
            existing.Email = model.Email;
            existing.Phone = model.Phone;
            existing.Address = model.Address;
            existing.CustomerType = model.CustomerType;
            existing.RiskRating = model.RiskRating;
            existing.KycStatus = model.KycStatus;

            await _repository.UpdateAsync(existing, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public Task<Customer?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<Customer>> GetAll(CancellationToken cancellationToken)
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

    public async Task<bool> AssignBank(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> UnassignBank(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }


    public async Task<bool> AddToAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> RemoveFromAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }

    public async Task<bool> AddToLoanAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> RemoveFromLoanAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }

    public async Task<bool> AddToPaymentCards(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> RemoveFromPaymentCards(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }

    public async Task<bool> AddToExternalAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> RemoveFromExternalAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }

    public async Task<bool> AddToFundsTransfers(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> RemoveFromFundsTransfers(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }

    public async Task<bool> AddToDisputes(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> RemoveFromDisputes(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }

    public async Task<bool> AddToKycProfiles(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> RemoveFromKycProfiles(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }

    public async Task<bool> AddToConsents(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> RemoveFromConsents(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }



}
