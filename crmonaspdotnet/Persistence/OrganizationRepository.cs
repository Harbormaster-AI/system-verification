
using crmonaspdotnet.Contracts;
using crmonaspdotnet.Domain;

using Microsoft.EntityFrameworkCore;

namespace crmonaspdotnet.Persistence;

public class OrganizationRepository : IOrganizationRepository
{
    private readonly ApplicationDbContext _db;

    public OrganizationRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Organization?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _db.Organizations
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Organization>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _db.Organizations
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Organization organization, CancellationToken cancellationToken)
    {
        _db.Organizations.Add(organization);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Organization organization, CancellationToken cancellationToken)
    {
        _db.Organizations.Update(organization);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Organization organization, CancellationToken cancellationToken)
    {
        _db.Organizations.Remove(organization);
        await _db.SaveChangesAsync(cancellationToken);
    }


    public async Task AddToUsersAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Users
            .Where(user =>
                request.ChildIds.Contains(user.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    user =>
                        EF.Property<Guid?>(
                            user,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromUsersAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Users
            .Where(user =>
                request.ChildIds.Contains(user.Id) &&
                EF.Property<Guid?>(
                    user,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    user =>
                        EF.Property<Guid?>(
                            user,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }


    public async Task AddToAccountsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Accounts
            .Where(account =>
                request.ChildIds.Contains(account.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    account =>
                        EF.Property<Guid?>(
                            account,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromAccountsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Accounts
            .Where(account =>
                request.ChildIds.Contains(account.Id) &&
                EF.Property<Guid?>(
                    account,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    account =>
                        EF.Property<Guid?>(
                            account,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }


    public async Task AddToTeamsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Teams
            .Where(team =>
                request.ChildIds.Contains(team.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    team =>
                        EF.Property<Guid?>(
                            team,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromTeamsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Teams
            .Where(team =>
                request.ChildIds.Contains(team.Id) &&
                EF.Property<Guid?>(
                    team,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    team =>
                        EF.Property<Guid?>(
                            team,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }


    public async Task AddToTerritoriesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Territorys
            .Where(territory =>
                request.ChildIds.Contains(territory.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    territory =>
                        EF.Property<Guid?>(
                            territory,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromTerritoriesAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Territorys
            .Where(territory =>
                request.ChildIds.Contains(territory.Id) &&
                EF.Property<Guid?>(
                    territory,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    territory =>
                        EF.Property<Guid?>(
                            territory,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }


    public async Task AddToProductsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Products
            .Where(product =>
                request.ChildIds.Contains(product.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    product =>
                        EF.Property<Guid?>(
                            product,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromProductsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Products
            .Where(product =>
                request.ChildIds.Contains(product.Id) &&
                EF.Property<Guid?>(
                    product,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    product =>
                        EF.Property<Guid?>(
                            product,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }


    public async Task AddToPriceBooksAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.PriceBooks
            .Where(priceBook =>
                request.ChildIds.Contains(priceBook.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    priceBook =>
                        EF.Property<Guid?>(
                            priceBook,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromPriceBooksAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.PriceBooks
            .Where(priceBook =>
                request.ChildIds.Contains(priceBook.Id) &&
                EF.Property<Guid?>(
                    priceBook,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    priceBook =>
                        EF.Property<Guid?>(
                            priceBook,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }


    public async Task AddToCampaignsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Campaigns
            .Where(campaign =>
                request.ChildIds.Contains(campaign.Id))
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    campaign =>
                        EF.Property<Guid?>(
                            campaign,
                            "EmailMessage_Id"),
                    request.ParentId));
    }

    public async Task RemoveFromCampaignsAsync(
        MultipleAssociationRequest request,
        CancellationToken cancellationToken)
    {
        await _db.Campaigns
            .Where(campaign =>
                request.ChildIds.Contains(campaign.Id) &&
                EF.Property<Guid?>(
                    campaign,
                    "EmailMessage_Id") == request.ParentId)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(
                    campaign =>
                        EF.Property<Guid?>(
                            campaign,
                            "EmailMessage_Id"),
                    (Guid?)null));
    }

}
