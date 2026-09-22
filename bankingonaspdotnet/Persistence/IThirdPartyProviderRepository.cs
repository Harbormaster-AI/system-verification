using bankingonaspdotnet.Domain;

namespace bankingonaspdotnet.Persistence;

public interface IThirdPartyProviderRepository
{
    Task<ThirdPartyProvider?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<ThirdPartyProvider>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(ThirdPartyProvider thirdPartyProvider, CancellationToken cancellationToken);
    Task UpdateAsync(ThirdPartyProvider thirdPartyProvider, CancellationToken cancellationToken);
    Task DeleteAsync(ThirdPartyProvider thirdPartyProvider, CancellationToken cancellationToken);
}
