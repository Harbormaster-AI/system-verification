using crmonaspdotnet.Domain;
using crmonaspdotnet.Contracts;

namespace crmonaspdotnet.Persistence;

public interface IProductRepository
{
    Task<Product?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<Product>> GetAllAsync(CancellationToken cancellationToken);
    Task AddAsync(Product product, CancellationToken cancellationToken);
    Task UpdateAsync(Product product, CancellationToken cancellationToken);
    Task DeleteAsync(Product product, CancellationToken cancellationToken);

    Task AddToPriceBookEntriesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromPriceBookEntriesAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToOpportunityLineItemsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromOpportunityLineItemsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToQuoteLineItemsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromQuoteLineItemsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task AddToOrderItemsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);
    Task RemoveFromOrderItemsAsync(MultipleAssociationRequest request, CancellationToken cancellationToken);

}
