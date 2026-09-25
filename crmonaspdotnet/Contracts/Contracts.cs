using crmonaspdotnet.Domain;

namespace crmonaspdotnet.Contracts;

public class IdentifierRequest
{
    public Guid Id { get; set; }
}

public class AssociationRequest
{
    public Guid ParentId { get; set; }
    public Guid ChildId { get; set; }
}

public class MultipleAssociationRequest
{
    public Guid ParentId { get; set; }
    public List<Guid> ChildIds { get; set; } = new();
}

public class OrganizationRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? Name { get; set; }
    public virtual string? DefaultCurrency { get; set; }
    public virtual _Locale? DefaultLocale { get; set; }
    public virtual URL? Website { get; set; }
}

public class OrganizationResponse : OrganizationRequest
{
    public static OrganizationResponse FromModel(Organization model)
    {
        return new OrganizationResponse
        {
            Id = model.Id,
            Name = model.Name,
            DefaultCurrency = model.DefaultCurrency,
            DefaultLocale = model.DefaultLocale,
            Website = model.Website,
        };
    }
}

public class UserRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? Username { get; set; }
    public virtual string? FullName { get; set; }
    public virtual EmailAddress? Email { get; set; }
    public virtual _Locale? Locale { get; set; }
    public virtual UserRole? Role { get; set; }
    public virtual UserStatus? Status { get; set; }
}

public class UserResponse : UserRequest
{
    public static UserResponse FromModel(User model)
    {
        return new UserResponse
        {
            Id = model.Id,
            Username = model.Username,
            FullName = model.FullName,
            Email = model.Email,
            Locale = model.Locale,
            Role = model.Role,
            Status = model.Status,
        };
    }
}

public class TeamRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? Name { get; set; }
    public virtual TeamType? TeamType { get; set; }
}

public class TeamResponse : TeamRequest
{
    public static TeamResponse FromModel(Team model)
    {
        return new TeamResponse
        {
            Id = model.Id,
            Name = model.Name,
            TeamType = model.TeamType,
        };
    }
}

public class TerritoryRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? Name { get; set; }
    public virtual string? Region { get; set; }
    public virtual TerritoryType? TerritoryType { get; set; }
}

public class TerritoryResponse : TerritoryRequest
{
    public static TerritoryResponse FromModel(Territory model)
    {
        return new TerritoryResponse
        {
            Id = model.Id,
            Name = model.Name,
            Region = model.Region,
            TerritoryType = model.TerritoryType,
        };
    }
}

public class AccountRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? Name { get; set; }
    public virtual string? AccountNumber { get; set; }
    public virtual string? Industry { get; set; }
    public virtual Address? BillingAddress { get; set; }
    public virtual Address? ShippingAddress { get; set; }
    public virtual URL? Website { get; set; }
    public virtual PhoneNumber? Phone { get; set; }
    public virtual bool? AsActive { get; set; }
    public virtual AccountType? AccountType { get; set; }
    public virtual AccountLifecycleStage? LifecycleStage { get; set; }
}

public class AccountResponse : AccountRequest
{
    public static AccountResponse FromModel(Account model)
    {
        return new AccountResponse
        {
            Id = model.Id,
            Name = model.Name,
            AccountNumber = model.AccountNumber,
            Industry = model.Industry,
            BillingAddress = model.BillingAddress,
            ShippingAddress = model.ShippingAddress,
            Website = model.Website,
            Phone = model.Phone,
            AsActive = model.AsActive,
            AccountType = model.AccountType,
            LifecycleStage = model.LifecycleStage,
        };
    }
}

public class ContactRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? FirstName { get; set; }
    public virtual string? LastName { get; set; }
    public virtual string? Title { get; set; }
    public virtual EmailAddress? Email { get; set; }
    public virtual PhoneNumber? Phone { get; set; }
    public virtual PhoneNumber? Mobile { get; set; }
    public virtual Address? MailingAddress { get; set; }
    public virtual ContactMethod? PreferredContactMethod { get; set; }
}

public class ContactResponse : ContactRequest
{
    public static ContactResponse FromModel(Contact model)
    {
        return new ContactResponse
        {
            Id = model.Id,
            FirstName = model.FirstName,
            LastName = model.LastName,
            Title = model.Title,
            Email = model.Email,
            Phone = model.Phone,
            Mobile = model.Mobile,
            MailingAddress = model.MailingAddress,
            PreferredContactMethod = model.PreferredContactMethod,
        };
    }
}

public class LeadRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? FirstName { get; set; }
    public virtual string? LastName { get; set; }
    public virtual string? Company { get; set; }
    public virtual EmailAddress? Email { get; set; }
    public virtual PhoneNumber? Phone { get; set; }
    public virtual bool? Converted { get; set; }
    public virtual LeadStatus? Status { get; set; }
    public virtual LeadSource? Source { get; set; }
    public virtual LeadRating? Rating { get; set; }
}

public class LeadResponse : LeadRequest
{
    public static LeadResponse FromModel(Lead model)
    {
        return new LeadResponse
        {
            Id = model.Id,
            FirstName = model.FirstName,
            LastName = model.LastName,
            Company = model.Company,
            Email = model.Email,
            Phone = model.Phone,
            Converted = model.Converted,
            Status = model.Status,
            Source = model.Source,
            Rating = model.Rating,
        };
    }
}

public class OpportunityRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? Name { get; set; }
    public virtual Money? Amount { get; set; }
    public virtual DateOnly? CloseDate { get; set; }
    public virtual decimal? Probability { get; set; }
    public virtual string? Description { get; set; }
    public virtual OpportunityStage? Stage { get; set; }
    public virtual OpportunityType? Type { get; set; }
    public virtual ForecastCategory? ForecastCategory { get; set; }
}

public class OpportunityResponse : OpportunityRequest
{
    public static OpportunityResponse FromModel(Opportunity model)
    {
        return new OpportunityResponse
        {
            Id = model.Id,
            Name = model.Name,
            Amount = model.Amount,
            CloseDate = model.CloseDate,
            Probability = model.Probability,
            Description = model.Description,
            Stage = model.Stage,
            Type = model.Type,
            ForecastCategory = model.ForecastCategory,
        };
    }
}

public class OpportunityLineItemRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual decimal? Quantity { get; set; }
    public virtual Money? UnitPrice { get; set; }
    public virtual decimal? DiscountPercent { get; set; }
    public virtual Money? TotalPrice { get; set; }
}

public class OpportunityLineItemResponse : OpportunityLineItemRequest
{
    public static OpportunityLineItemResponse FromModel(OpportunityLineItem model)
    {
        return new OpportunityLineItemResponse
        {
            Id = model.Id,
            Quantity = model.Quantity,
            UnitPrice = model.UnitPrice,
            DiscountPercent = model.DiscountPercent,
            TotalPrice = model.TotalPrice,
        };
    }
}

public class OpportunityStageHistoryRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual DateTime? ChangedAt { get; set; }
    public virtual string? Comment { get; set; }
    public virtual OpportunityStage? FromStage { get; set; }
    public virtual OpportunityStage? ToStage { get; set; }
}

public class OpportunityStageHistoryResponse : OpportunityStageHistoryRequest
{
    public static OpportunityStageHistoryResponse FromModel(OpportunityStageHistory model)
    {
        return new OpportunityStageHistoryResponse
        {
            Id = model.Id,
            ChangedAt = model.ChangedAt,
            Comment = model.Comment,
            FromStage = model.FromStage,
            ToStage = model.ToStage,
        };
    }
}

public class ProductRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? Sku { get; set; }
    public virtual string? Name { get; set; }
    public virtual bool? AsActive { get; set; }
    public virtual Money? StandardPrice { get; set; }
    public virtual string? Description { get; set; }
    public virtual ProductType? ProductType { get; set; }
    public virtual UnitOfMeasure? Uom { get; set; }
}

public class ProductResponse : ProductRequest
{
    public static ProductResponse FromModel(Product model)
    {
        return new ProductResponse
        {
            Id = model.Id,
            Sku = model.Sku,
            Name = model.Name,
            AsActive = model.AsActive,
            StandardPrice = model.StandardPrice,
            Description = model.Description,
            ProductType = model.ProductType,
            Uom = model.Uom,
        };
    }
}

public class PriceBookRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? Name { get; set; }
    public virtual bool? AsActive { get; set; }
    public virtual string? Description { get; set; }
}

public class PriceBookResponse : PriceBookRequest
{
    public static PriceBookResponse FromModel(PriceBook model)
    {
        return new PriceBookResponse
        {
            Id = model.Id,
            Name = model.Name,
            AsActive = model.AsActive,
            Description = model.Description,
        };
    }
}

public class PriceBookEntryRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual Money? UnitPrice { get; set; }
    public virtual DateOnly? EffectiveDate { get; set; }
    public virtual DateOnly? ExpirationDate { get; set; }
    public virtual bool? AsActive { get; set; }
}

public class PriceBookEntryResponse : PriceBookEntryRequest
{
    public static PriceBookEntryResponse FromModel(PriceBookEntry model)
    {
        return new PriceBookEntryResponse
        {
            Id = model.Id,
            UnitPrice = model.UnitPrice,
            EffectiveDate = model.EffectiveDate,
            ExpirationDate = model.ExpirationDate,
            AsActive = model.AsActive,
        };
    }
}

public class QuoteRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? QuoteNumber { get; set; }
    public virtual DateOnly? ValidityStart { get; set; }
    public virtual DateOnly? ValidityEnd { get; set; }
    public virtual Money? TotalAmount { get; set; }
    public virtual decimal? DiscountPercent { get; set; }
    public virtual Money? TaxAmount { get; set; }
    public virtual Money? ShippingAmount { get; set; }
    public virtual QuoteStatus? Status { get; set; }
}

public class QuoteResponse : QuoteRequest
{
    public static QuoteResponse FromModel(Quote model)
    {
        return new QuoteResponse
        {
            Id = model.Id,
            QuoteNumber = model.QuoteNumber,
            ValidityStart = model.ValidityStart,
            ValidityEnd = model.ValidityEnd,
            TotalAmount = model.TotalAmount,
            DiscountPercent = model.DiscountPercent,
            TaxAmount = model.TaxAmount,
            ShippingAmount = model.ShippingAmount,
            Status = model.Status,
        };
    }
}

public class QuoteLineItemRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual decimal? Quantity { get; set; }
    public virtual Money? UnitPrice { get; set; }
    public virtual Money? DiscountAmount { get; set; }
    public virtual Money? TaxAmount { get; set; }
    public virtual Money? TotalAmount { get; set; }
}

public class QuoteLineItemResponse : QuoteLineItemRequest
{
    public static QuoteLineItemResponse FromModel(QuoteLineItem model)
    {
        return new QuoteLineItemResponse
        {
            Id = model.Id,
            Quantity = model.Quantity,
            UnitPrice = model.UnitPrice,
            DiscountAmount = model.DiscountAmount,
            TaxAmount = model.TaxAmount,
            TotalAmount = model.TotalAmount,
        };
    }
}

public class OrderRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? OrderNumber { get; set; }
    public virtual DateOnly? OrderDate { get; set; }
    public virtual Money? TotalAmount { get; set; }
    public virtual Money? TaxAmount { get; set; }
    public virtual Money? ShippingAmount { get; set; }
    public virtual OrderStatus? Status { get; set; }
}

public class OrderResponse : OrderRequest
{
    public static OrderResponse FromModel(Order model)
    {
        return new OrderResponse
        {
            Id = model.Id,
            OrderNumber = model.OrderNumber,
            OrderDate = model.OrderDate,
            TotalAmount = model.TotalAmount,
            TaxAmount = model.TaxAmount,
            ShippingAmount = model.ShippingAmount,
            Status = model.Status,
        };
    }
}

public class OrderItemRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual decimal? Quantity { get; set; }
    public virtual Money? UnitPrice { get; set; }
    public virtual Money? DiscountAmount { get; set; }
    public virtual Money? TaxAmount { get; set; }
    public virtual Money? TotalAmount { get; set; }
}

public class OrderItemResponse : OrderItemRequest
{
    public static OrderItemResponse FromModel(OrderItem model)
    {
        return new OrderItemResponse
        {
            Id = model.Id,
            Quantity = model.Quantity,
            UnitPrice = model.UnitPrice,
            DiscountAmount = model.DiscountAmount,
            TaxAmount = model.TaxAmount,
            TotalAmount = model.TotalAmount,
        };
    }
}

public class ContractRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? ContractNumber { get; set; }
    public virtual DateOnly? StartDate { get; set; }
    public virtual DateOnly? EndDate { get; set; }
    public virtual int? RenewalTermMonths { get; set; }
    public virtual bool? AutoRenew { get; set; }
    public virtual ContractStatus? Status { get; set; }
}

public class ContractResponse : ContractRequest
{
    public static ContractResponse FromModel(Contract model)
    {
        return new ContractResponse
        {
            Id = model.Id,
            ContractNumber = model.ContractNumber,
            StartDate = model.StartDate,
            EndDate = model.EndDate,
            RenewalTermMonths = model.RenewalTermMonths,
            AutoRenew = model.AutoRenew,
            Status = model.Status,
        };
    }
}

public class Case_Request
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? CaseNumber { get; set; }
    public virtual string? Subject { get; set; }
    public virtual string? Description { get; set; }
    public virtual DateTime? SlaDue { get; set; }
    public virtual CaseStatus? Status { get; set; }
    public virtual CasePriority? Priority { get; set; }
    public virtual CaseOrigin? Origin { get; set; }
    public virtual CaseSeverity? Severity { get; set; }
}

public class Case_Response : Case_Request
{
    public static Case_Response FromModel(Case_ model)
    {
        return new Case_Response
        {
            Id = model.Id,
            CaseNumber = model.CaseNumber,
            Subject = model.Subject,
            Description = model.Description,
            SlaDue = model.SlaDue,
            Status = model.Status,
            Priority = model.Priority,
            Origin = model.Origin,
            Severity = model.Severity,
        };
    }
}

public class ActivityRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? Subject { get; set; }
    public virtual DateOnly? DueDate { get; set; }
    public virtual DateTime? StartAt { get; set; }
    public virtual DateTime? EndAt { get; set; }
    public virtual string? Location { get; set; }
    public virtual ActivityType? ActivityType { get; set; }
    public virtual ActivityStatus? Status { get; set; }
    public virtual ActivityPriority? Priority { get; set; }
}

public class ActivityResponse : ActivityRequest
{
    public static ActivityResponse FromModel(Activity model)
    {
        return new ActivityResponse
        {
            Id = model.Id,
            Subject = model.Subject,
            DueDate = model.DueDate,
            StartAt = model.StartAt,
            EndAt = model.EndAt,
            Location = model.Location,
            ActivityType = model.ActivityType,
            Status = model.Status,
            Priority = model.Priority,
        };
    }
}

public class CampaignRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? Name { get; set; }
    public virtual DateOnly? StartDate { get; set; }
    public virtual DateOnly? EndDate { get; set; }
    public virtual Money? Budget { get; set; }
    public virtual Money? ActualCost { get; set; }
    public virtual Money? ExpectedRevenue { get; set; }
    public virtual CampaignStatus? Status { get; set; }
    public virtual CampaignType? Type { get; set; }
}

public class CampaignResponse : CampaignRequest
{
    public static CampaignResponse FromModel(Campaign model)
    {
        return new CampaignResponse
        {
            Id = model.Id,
            Name = model.Name,
            StartDate = model.StartDate,
            EndDate = model.EndDate,
            Budget = model.Budget,
            ActualCost = model.ActualCost,
            ExpectedRevenue = model.ExpectedRevenue,
            Status = model.Status,
            Type = model.Type,
        };
    }
}

public class CampaignMemberRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual bool? Responded { get; set; }
    public virtual CampaignMemberStatus? Status { get; set; }
    public virtual CampaignMemberType? MemberType { get; set; }
}

public class CampaignMemberResponse : CampaignMemberRequest
{
    public static CampaignMemberResponse FromModel(CampaignMember model)
    {
        return new CampaignMemberResponse
        {
            Id = model.Id,
            Responded = model.Responded,
            Status = model.Status,
            MemberType = model.MemberType,
        };
    }
}

public class NoteRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? Title { get; set; }
    public virtual string? Content { get; set; }
    public virtual DateTime? CreatedAt { get; set; }
    public virtual DateTime? UpdatedAt { get; set; }
}

public class NoteResponse : NoteRequest
{
    public static NoteResponse FromModel(Note model)
    {
        return new NoteResponse
        {
            Id = model.Id,
            Title = model.Title,
            Content = model.Content,
            CreatedAt = model.CreatedAt,
            UpdatedAt = model.UpdatedAt,
        };
    }
}

public class EmailMessageRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? Subject { get; set; }
    public virtual string? Body { get; set; }
    public virtual DateTime? SentAt { get; set; }
    public virtual string? MessageId { get; set; }
    public virtual EmailDirection? Direction { get; set; }
    public virtual EmailStatus? Status { get; set; }
}

public class EmailMessageResponse : EmailMessageRequest
{
    public static EmailMessageResponse FromModel(EmailMessage model)
    {
        return new EmailMessageResponse
        {
            Id = model.Id,
            Subject = model.Subject,
            Body = model.Body,
            SentAt = model.SentAt,
            MessageId = model.MessageId,
            Direction = model.Direction,
            Status = model.Status,
        };
    }
}

