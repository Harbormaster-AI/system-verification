using treasuryonaspdotnet.Domain;
using treasuryonaspdotnet.Contracts;

namespace treasuryonaspdotnet.Persistence;

public interface IFundingProgramRepository
{
    Task<FundingProgram?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<FundingProgram>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(FundingProgram fundingProgram, CancellationToken cancellationToken);
    Task UpdateAsync(FundingProgram fundingProgram, CancellationToken cancellationToken);
    Task DeleteAsync(FundingProgram fundingProgram, CancellationToken cancellationToken);

    Task AddToIssuancesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromIssuancesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
