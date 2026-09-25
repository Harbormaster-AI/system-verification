using inventoryonaspdotnet.Domain;
using inventoryonaspdotnet.Contracts;

namespace inventoryonaspdotnet.Persistence;

public interface IUoMConversionRepository
{
    Task<UoMConversion?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<UoMConversion>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(UoMConversion uoMConversion, CancellationToken cancellationToken);
    Task UpdateAsync(UoMConversion uoMConversion, CancellationToken cancellationToken);
    Task DeleteAsync(UoMConversion uoMConversion, CancellationToken cancellationToken);


}
