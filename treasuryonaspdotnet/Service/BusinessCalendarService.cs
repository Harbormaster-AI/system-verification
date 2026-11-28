
using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Persistence;
using treasuryonaspdotnet.Contracts;
using treasuryonaspdotnet.Telemetry;

namespace treasuryonaspdotnet.Service;

public interface IBusinessCalendarService {

    Task Create(BusinessCalendar model , CancellationToken cancellationToken);
    Task<bool> Update(BusinessCalendar model, CancellationToken cancellationToken);
    Task<BusinessCalendar?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<BusinessCalendar>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);
    // ------------------------------
    // Single Associations
    // -------------------------------

    Task<bool> AddToHolidays(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromHolidays(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class BusinessCalendarService : IBusinessCalendarService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly IBusinessCalendarRepository _repository;
    private readonly ILogger<BusinessCalendarService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public BusinessCalendarService(
        ApplicationTelemetry telemetry,
        IBusinessCalendarRepository repository,
        ILogger<BusinessCalendarService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(BusinessCalendar model, CancellationToken cancellationToken)
    {
        try
        {
            await _telemetry.Execute(
                "BusinessCalendar",
                "CreateBusinessCalendar",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                    ex,
                    "Unexpected error while creating Transaction.");
        }
    }

    public async Task<bool> Update(BusinessCalendar model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.Name = model.Name;
            existing.Location = model.Location;

            await _telemetry.Execute(
                "BusinessCalendar",
                "UpdateBusinessCalendar",
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

    public Task<BusinessCalendar?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<BusinessCalendar>> GetAll(CancellationToken cancellationToken)
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
                "BusinessCalendar",
                "UpdateBusinessCalendar",
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


    public async Task<bool> AddToHolidays(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "BusinessCalendar",
                "AddToHolidays",
                () => _repository.AddToHolidaysAsync(request, cancellationToken));
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

    public async Task<bool> RemoveFromHolidays(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "BusinessCalendar",
                "RemoveFromHolidays",
                () => _repository.RemoveFromHolidaysAsync(request, cancellationToken));
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
