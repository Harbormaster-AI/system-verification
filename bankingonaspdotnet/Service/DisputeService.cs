using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Persistence;
using bankingonaspdotnet.Contracts;

namespace bankingonaspdotnet.Service;

public interface IDisputeService
{

    Task Create(Dispute model, CancellationToken cancellationToken);
    Task<bool> Update(Dispute model, CancellationToken cancellationToken);
    Task<Dispute?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<Dispute>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);

    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignTransaction(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignTransaction(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignCustomer(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignCustomer(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignAccount(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignAccount(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignPaymentCard(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignPaymentCard(AssociationRequest request, CancellationToken cancellationToken);


}

public class DisputeService : IDisputeService
{
    private readonly IDisputeRepository _repository;
    private readonly ILogger<DisputeService> _logger;

    public DisputeService(
        IDisputeRepository repository, ILogger<DisputeService> logger)
    {
        _repository = repository;
        _logger = logger;
    }


    public async Task Create(Dispute model, CancellationToken cancellationToken)
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

    public async Task<bool> Update(Dispute model, CancellationToken cancellationToken)
    {
        try
        {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.DisputeReference = model.DisputeReference;
            existing.RaisedOn = model.RaisedOn;
            existing.Reason = model.Reason;
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

    public Task<Dispute?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<Dispute>> GetAll(CancellationToken cancellationToken)
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

    public async Task<bool> AssignTransaction(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> UnassignTransaction(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }

    public async Task<bool> AssignCustomer(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> UnassignCustomer(AssociationRequest request, CancellationToken cancellationToken)
    {
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

    public async Task<bool> AssignPaymentCard(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }
    public async Task<bool> UnassignPaymentCard(AssociationRequest request, CancellationToken cancellationToken)
    {
        return true;
    }




}
