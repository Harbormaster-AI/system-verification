
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Persistence;
using bankingonaspdotnet.Contracts;
using bankingonaspdotnet.Telemetry;

namespace bankingonaspdotnet.Service;

public interface IStandingInstructionService {

    Task Create(StandingInstruction model , CancellationToken cancellationToken);
    Task<bool> Update(StandingInstruction model, CancellationToken cancellationToken);
    Task<StandingInstruction?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<StandingInstruction>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);

    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignAccount(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignAccount(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignBeneficiary(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignBeneficiary(AssociationRequest request, CancellationToken cancellationToken);


}

public class StandingInstructionService : IStandingInstructionService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IStandingInstructionRepository _repository;
    private readonly ILogger<StandingInstructionService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public StandingInstructionService(
        ApplicationTelemetry telemetry,
        IStandingInstructionRepository repository,
        ILogger<StandingInstructionService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(StandingInstruction model, CancellationToken cancellationToken)
    {
        try
        {
            return await telemetry.Execute(
                "StandingInstruction",
                "CreateStandingInstruction",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
        }
    }

    public async Task<bool> Update(StandingInstruction model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.InstructionId = model.InstructionId;
            existing.Amount = model.Amount;
            existing.NextExecutionDate = model.NextExecutionDate;
            existing.Frequency = model.Frequency;
            existing.Status = model.Status;

            return await telemetry.Execute(
                "StandingInstruction",
                "UpdateStandingInstruction",
                () => _repository.UpdateAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public Task<StandingInstruction?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<StandingInstruction>> GetAll(CancellationToken cancellationToken)
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
            return await telemetry.Execute(
                "StandingInstruction",
                "UpdateStandingInstruction",
                () => _repository.DeleteAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AssignAccount(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError($"No StandingInstruction found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId;
            };

            var child = serviceResolver.get(AccountService).get( childRequest , cancellationToken )
            parent.Account = child;
            Update( parent );
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> UnassignAccount(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError($"No StandingInstruction found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Account = null;
            Update( parent );
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AssignBeneficiary(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError($"No StandingInstruction found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId;
            };

            var child = serviceResolver.get(ExternalAccountService).get( childRequest , cancellationToken )
            parent.Beneficiary = child;
            Update( parent );
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> UnassignBeneficiary(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError($"No StandingInstruction found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Beneficiary = null;
            Update( parent );
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }




}
