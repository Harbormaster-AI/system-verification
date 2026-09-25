
using bankingonaspdotnet.Domain;
using bankingonaspdotnet.Persistence;
using bankingonaspdotnet.Contracts;
using bankingonaspdotnet.Telemetry;

namespace bankingonaspdotnet.Service;

public interface ILoanAccountService {

    Task Create(LoanAccount model , CancellationToken cancellationToken);
    Task<bool> Update(LoanAccount model, CancellationToken cancellationToken);
    Task<LoanAccount?> Get(IdentifierRequest identifier, CancellationToken cancellationToken);
    Task<IReadOnlyList<LoanAccount>> GetAll(CancellationToken cancellationToken);
    Task<bool> Delete(IdentifierRequest identifier, CancellationToken cancellationToken);

    // ------------------------------
    // Single Associations
    // -------------------------------
    Task<bool> AssignBank(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignBank(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignBranch(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignBranch(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AssignProduct(AssociationRequest request, CancellationToken cancellationToken);
    Task<bool> UnassignProduct(AssociationRequest request, CancellationToken cancellationToken);

    Task<bool> AddToBorrowers(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromBorrowers(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToRepaymentSchedule(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromRepaymentSchedule(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToPayments(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromPayments(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToCollateral(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromCollateral(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> AddToFeeCharges(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task<bool> RemoveFromFeeCharges(MultipleAssociationRequest request, CancellationToken cancellationToken);

}

public class LoanAccountService : ILoanAccountService
{
    private readonly ApplicationTelemetry _telemetry;
    private readonly ILoanAccountRepository _repository;
    private readonly ILogger<LoanAccountService> _logger;
    private readonly IServiceResolver _serviceResolver;


    public LoanAccountService(
        ApplicationTelemetry telemetry,
        ILoanAccountRepository repository,
        ILogger<LoanAccountService> logger,
        IServiceResolver serviceResolver)
    {
        _telemetry = telemetry;
        _repository = repository;
        _logger = logger;
        _serviceResolver = serviceResolver;
    }

    public async Task Create(LoanAccount model, CancellationToken cancellationToken)
    {
        try
        {
            return await telemetry.Execute(
                "LoanAccount",
                "CreateLoanAccount",
                () => _repository.AddAsync(model, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
        }
    }

    public async Task<bool> Update(LoanAccount model, CancellationToken cancellationToken)
    {
        try {
            var existing = await _repository.GetByIdAsync(model.Id, cancellationToken);
            if (existing is null)
            {
                return false;
            }
            existing.LoanNumber = model.LoanNumber;
            existing.PrincipalAmount = model.PrincipalAmount;
            existing.OutstandingPrincipal = model.OutstandingPrincipal;
            existing.InterestRate = model.InterestRate;
            existing.OriginationDate = model.OriginationDate;
            existing.MaturityDate = model.MaturityDate;
            existing.PaymentDayOfMonth = model.PaymentDayOfMonth;
            existing.Currency = model.Currency;
            existing.LoanType = model.LoanType;
            existing.RateType = model.RateType;
            existing.Compounding = model.Compounding;
            existing.Status = model.Status;

            return await telemetry.Execute(
                "LoanAccount",
                "UpdateLoanAccount",
                () => _repository.UpdateAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public Task<LoanAccount?> Get(IdentifierRequest identifier, CancellationToken cancellationToken)
    => _repository.GetByIdAsync(identifier.Id, cancellationToken);

    public Task<IReadOnlyList<LoanAccount>> GetAll(CancellationToken cancellationToken)
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
                "LoanAccount",
                "UpdateLoanAccount",
                () => _repository.DeleteAsync(existing, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AssignBank(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError($"No LoanAccount found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId;
            };

            var child = serviceResolver.get(BankService).get( childRequest , cancellationToken )
            parent.Bank = child;
            Update( parent );
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> UnassignBank(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError($"No LoanAccount found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Bank = null;
            Update( parent );
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AssignBranch(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError($"No LoanAccount found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId;
            };

            var child = serviceResolver.get(BranchService).get( childRequest , cancellationToken )
            parent.Branch = child;
            Update( parent );
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> UnassignBranch(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError($"No LoanAccount found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Branch = null;
            Update( parent );
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AssignProduct(AssociationRequest request, CancellationToken cancellationToken) {

        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError($"No LoanAccount found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            var childRequest = new IdentifierRequest
            {
                Id = request.ChildId;
            };

            var child = serviceResolver.get(BankingProductService).get( childRequest , cancellationToken )
            parent.Product = child;
            Update( parent );
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> UnassignProduct(AssociationRequest request, CancellationToken cancellationToken) {
        var parent = await _repository.GetByIdAsync(request.ParentId, cancellationToken);
        if (parent is null)
        {
            _logger.LogError($"No LoanAccount found using Id {ParentId}", request.ParentId);
            return false;
        }

        try
        {
            parent.Product = null;
            Update( parent );
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }


    public async Task<bool> AddToBorrowers(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "LoanAccount",
                "AddToBorrowers",
                () => _repository.AddToBorrowersAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromBorrowers(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "LoanAccount",
                "RemoveFromBorrowers",
                () => _repository.RemoveFromBorrowersAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AddToRepaymentSchedule(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "LoanAccount",
                "AddToRepaymentSchedule",
                () => _repository.AddToRepaymentScheduleAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromRepaymentSchedule(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "LoanAccount",
                "RemoveFromRepaymentSchedule",
                () => _repository.RemoveFromRepaymentScheduleAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AddToPayments(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "LoanAccount",
                "AddToPayments",
                () => _repository.AddToPaymentsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromPayments(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "LoanAccount",
                "RemoveFromPayments",
                () => _repository.RemoveFromPaymentsAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AddToCollateral(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "LoanAccount",
                "AddToCollateral",
                () => _repository.AddToCollateralAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromCollateral(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "LoanAccount",
                "RemoveFromCollateral",
                () => _repository.RemoveFromCollateralAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> AddToFeeCharges(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "LoanAccount",
                "AddToFeeCharges",
                () => _repository.AddToFeeChargesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }

    public async Task<bool> RemoveFromFeeCharges(MultipleAssociationRequest request, CancellationToken cancellationToken) {
        try {
            await _telemetry.Execute(
                "LoanAccount",
                "RemoveFromFeeCharges",
                () => _repository.RemoveFromFeeChargesAsync(request, cancellationToken));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected Error: {ex.Message}");
            return false;
        }
        return true;
    }



}
