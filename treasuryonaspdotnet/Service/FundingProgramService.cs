
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Persistence;
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Telemetry;

namespace treasuryonaspdotnet.Service;

public interface IFundingProgramService {

    Task Create(FundingProgram model , CancellationToken cancellationToken);
    Task<bool> Update(FundingProgram model, CancellationToken cancellationToken);
    Task<FundingProgram?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<FundingProgram>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignTreasuryUnit(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignTreasuryUnit(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToIssuances(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromIssuances(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class FundingProgramService : IFundingProgramService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IFundingProgramRepository _repository;
    private readonly ILogger<FundingProgramService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public FundingProgramService(
        ApplicationTelemetry telemetry,
        IFundingProgramRepository repository,
        ILogger<FundingProgramService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(FundingProgram model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "FundingProgram",
                "CreateFundingProgram",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(FundingProgram model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.ProgramName = model.ProgramName;
            existing.LimitAmount = model.LimitAmount;
            existing.Rating = model.Rating;
            existing.InstrumentFamily = model.InstrumentFamily;

            await _telemetry.Execute(
                "FundingProgram",
                "UpdateFundingProgram",
                () => _repository.UpdateAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public Task<FundingProgram?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<FundingProgram>> GetAll(CancellationToken cancellationToken)
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
            await _telemetry.Execute(
                "FundingProgram",
                "UpdateFundingProgram",
                () => _repository.DeleteAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> AssignTreasuryUnit(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No FundingProgram found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId,
            };

            var child = await _serviceResolver.Get<TreasuryUnitService>().Get(childRequest, cancellationToken);
            parent.TreasuryUnit = child;
            await Update( parent, cancellationToken );
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> UnassignTreasuryUnit(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError("No FundingProgram found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.TreasuryUnit = null;
            await Update( parent, cancellationToken );
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }


    public async Task<bool> AddToIssuances(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "FundingProgram",
                "AddToIssuances",
                () => _repository.AddToIssuancesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
           _logger.LogError(
                   ex,
                   "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromIssuances(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "FundingProgram",
                "RemoveFromIssuances",
                () => _repository.RemoveFromIssuancesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
            return false;
        }
        return true;
    }



}
