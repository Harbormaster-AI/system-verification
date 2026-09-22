using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Persistence;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Service;

public interface IBankService
{

    Task Create(Bank model, CancellationToken cancellationToken);
    Task<bool> Update(Bank model, CancellationToken cancellationToken);
    Task<Bank?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<Bank>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);

    // ------------------------------
    // Single Associations
    // -------------------------------

    Task<bool> AddToBranches(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromBranches(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToProducts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromProducts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToCustomers(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromCustomers(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToPaymentCards(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromPaymentCards(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToLoanAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromLoanAccounts(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToExchangeRates(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromExchangeRates(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToConsents(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromConsents(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToThirdPartyProviders(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromThirdPartyProviders(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class BankService : IBankService
{
    private readonly IBankRepository _repository;
    private readonly ILogger<BankService> _logger;

    public BankService(
        IBankRepository repository, ILogger<BankService> logger)
    {
        _repository = repository;
        _logger = logger;
    }


    public async Task Create(Bank model, CancellationToken cancellationToken)
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

    public async Task<bool> Update(Bank model, CancellationToken cancellationToken)
    {
        try
        {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.Name = model.Name;
            existing.LegalName = model.LegalName;
            existing.SwiftBic = model.SwiftBic;
            existing.HeadquartersCountry = model.HeadquartersCountry;
            existing.Website = model.Website;

            await _repository.UpdateAsync(existing, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public Task<Bank?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<Bank>> GetAll(CancellationToken cancellationToken)
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


    public async Task<bool> AddToBranches(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> RemoveFromBranches(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }

    public async Task<bool> AddToProducts(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> RemoveFromProducts(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }

    public async Task<bool> AddToCustomers(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> RemoveFromCustomers(MultipleAssociationRequest request, CancellationToken cancellationToken)
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

    public async Task<bool> AddToPaymentCards(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> RemoveFromPaymentCards(MultipleAssociationRequest request, CancellationToken cancellationToken)
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

    public async Task<bool> AddToExchangeRates(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> RemoveFromExchangeRates(MultipleAssociationRequest request, CancellationToken cancellationToken)
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

    public async Task<bool> AddToThirdPartyProviders(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> RemoveFromThirdPartyProviders(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }



}
