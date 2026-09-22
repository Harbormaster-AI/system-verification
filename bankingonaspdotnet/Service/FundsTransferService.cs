using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Persistence;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Service;

public interface IFundsTransferService
{

    Task Create(FundsTransfer model, CancellationToken cancellationToken);
    Task<bool> Update(FundsTransfer model, CancellationToken cancellationToken);
    Task<FundsTransfer?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<FundsTransfer>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);

    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignSourceAccount(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignSourceAccount(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignDestinationAccount(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignDestinationAccount(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignExternalBeneficiary(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignExternalBeneficiary(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignInitiatedBy(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignInitiatedBy(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToTransactions(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromTransactions(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class FundsTransferService : IFundsTransferService
{
    private readonly IFundsTransferRepository _repository;
    private readonly ILogger<FundsTransferService> _logger;

    public FundsTransferService(
        IFundsTransferRepository repository, ILogger<FundsTransferService> logger)
    {
        _repository = repository;
        _logger = logger;
    }


    public async Task Create(FundsTransfer model, CancellationToken cancellationToken)
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

    public async Task<bool> Update(FundsTransfer model, CancellationToken cancellationToken)
    {
        try
        {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.TransferReference = model.TransferReference;
            existing.Amount = model.Amount;
            existing.RequestedDate = model.RequestedDate;
            existing.ExecutionDate = model.ExecutionDate;
            existing.Purpose = model.Purpose;
            existing.FeeAmount = model.FeeAmount;
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

    public Task<FundsTransfer?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<FundsTransfer>> GetAll(CancellationToken cancellationToken)
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

    public async Task<bool> AssignSourceAccount(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> UnassignSourceAccount(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }

    public async Task<bool> AssignDestinationAccount(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> UnassignDestinationAccount(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }

    public async Task<bool> AssignExternalBeneficiary(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> UnassignExternalBeneficiary(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }

    public async Task<bool> AssignInitiatedBy(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> UnassignInitiatedBy(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }


    public async Task<bool> AddToTransactions(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> RemoveFromTransactions(MultipleAssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }



}
