using bankingonaspdotnet.Domain;

namespace bankingonaspdotnet.Contracts;

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

public class BankRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? Name { get; set; }
    public virtual string? LegalName { get; set; }
    public virtual BIC? SwiftBic { get; set; }
    public virtual string? HeadquartersCountry { get; set; }
    public virtual string? Website { get; set; }
}

public class BankResponse : BankRequest
{
    public static BankResponse FromModel(Bank model)
    {
        return new BankResponse
        {
            Id = model.Id,
            Name = model.Name,
            LegalName = model.LegalName,
            SwiftBic = model.SwiftBic,
            HeadquartersCountry = model.HeadquartersCountry,
            Website = model.Website,
        };
    }
}

public class BranchRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? Name { get; set; }
    public virtual string? BranchCode { get; set; }
    public virtual Address? Address { get; set; }
    public virtual string? Phone { get; set; }
    public virtual string? OpeningHours { get; set; }
}

public class BranchResponse : BranchRequest
{
    public static BranchResponse FromModel(Branch model)
    {
        return new BranchResponse
        {
            Id = model.Id,
            Name = model.Name,
            BranchCode = model.BranchCode,
            Address = model.Address,
            Phone = model.Phone,
            OpeningHours = model.OpeningHours,
        };
    }
}

public class ATMRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? TerminalId { get; set; }
    public virtual Address? Location { get; set; }
    public virtual ATMStatus? Status { get; set; }
}

public class ATMResponse : ATMRequest
{
    public static ATMResponse FromModel(ATM model)
    {
        return new ATMResponse
        {
            Id = model.Id,
            TerminalId = model.TerminalId,
            Location = model.Location,
            Status = model.Status,
        };
    }
}

public class CustomerRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? FirstName { get; set; }
    public virtual string? LastName { get; set; }
    public virtual string? LegalName { get; set; }
    public virtual DateOnly? DateOfBirth { get; set; }
    public virtual string? TaxId { get; set; }
    public virtual string? Email { get; set; }
    public virtual string? Phone { get; set; }
    public virtual Address? Address { get; set; }
    public virtual CustomerType? CustomerType { get; set; }
    public virtual RiskRating? RiskRating { get; set; }
    public virtual KycStatus? KycStatus { get; set; }
}

public class CustomerResponse : CustomerRequest
{
    public static CustomerResponse FromModel(Customer model)
    {
        return new CustomerResponse
        {
            Id = model.Id,
            FirstName = model.FirstName,
            LastName = model.LastName,
            LegalName = model.LegalName,
            DateOfBirth = model.DateOfBirth,
            TaxId = model.TaxId,
            Email = model.Email,
            Phone = model.Phone,
            Address = model.Address,
            CustomerType = model.CustomerType,
            RiskRating = model.RiskRating,
            KycStatus = model.KycStatus,
        };
    }
}

public class KycProfileRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? ProfileId { get; set; }
    public virtual DateOnly? LastReviewedOn { get; set; }
    public virtual KycStatus? Status { get; set; }
}

public class KycProfileResponse : KycProfileRequest
{
    public static KycProfileResponse FromModel(KycProfile model)
    {
        return new KycProfileResponse
        {
            Id = model.Id,
            ProfileId = model.ProfileId,
            LastReviewedOn = model.LastReviewedOn,
            Status = model.Status,
        };
    }
}

public class IdentityDocumentRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? DocumentNumber { get; set; }
    public virtual string? IssuingCountry { get; set; }
    public virtual DateOnly? ExpirationDate { get; set; }
    public virtual IdentityDocumentType? DocumentType { get; set; }
}

public class IdentityDocumentResponse : IdentityDocumentRequest
{
    public static IdentityDocumentResponse FromModel(IdentityDocument model)
    {
        return new IdentityDocumentResponse
        {
            Id = model.Id,
            DocumentNumber = model.DocumentNumber,
            IssuingCountry = model.IssuingCountry,
            ExpirationDate = model.ExpirationDate,
            DocumentType = model.DocumentType,
        };
    }
}

public class RiskAssessmentRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual int? Score { get; set; }
    public virtual DateOnly? AssessedOn { get; set; }
    public virtual RiskRating? Rating { get; set; }
}

public class RiskAssessmentResponse : RiskAssessmentRequest
{
    public static RiskAssessmentResponse FromModel(RiskAssessment model)
    {
        return new RiskAssessmentResponse
        {
            Id = model.Id,
            Score = model.Score,
            AssessedOn = model.AssessedOn,
            Rating = model.Rating,
        };
    }
}

public class ScreeningResultRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual DateOnly? ScreeningDate { get; set; }
    public virtual string? Provider { get; set; }
    public virtual ScreeningOutcome? Outcome { get; set; }
}

public class ScreeningResultResponse : ScreeningResultRequest
{
    public static ScreeningResultResponse FromModel(ScreeningResult model)
    {
        return new ScreeningResultResponse
        {
            Id = model.Id,
            ScreeningDate = model.ScreeningDate,
            Provider = model.Provider,
            Outcome = model.Outcome,
        };
    }
}

public class BankingProductRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? ProductCode { get; set; }
    public virtual string? Name { get; set; }
    public virtual string? Description { get; set; }
    public virtual ProductCategory? ProductCategory { get; set; }
}

public class BankingProductResponse : BankingProductRequest
{
    public static BankingProductResponse FromModel(BankingProduct model)
    {
        return new BankingProductResponse
        {
            Id = model.Id,
            ProductCode = model.ProductCode,
            Name = model.Name,
            Description = model.Description,
            ProductCategory = model.ProductCategory,
        };
    }
}

public class AccountRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual AccountNumber? AccountNumber { get; set; }
    public virtual IBAN? Iban { get; set; }
    public virtual string? AccountName { get; set; }
    public virtual string? Currency { get; set; }
    public virtual DateOnly? OpenedOn { get; set; }
    public virtual DateOnly? ClosedOn { get; set; }
    public virtual AccountType? AccountType { get; set; }
    public virtual AccountOwnershipType? OwnershipType { get; set; }
    public virtual AccountStatus? Status { get; set; }
}

public class AccountResponse : AccountRequest
{
    public static AccountResponse FromModel(Account model)
    {
        return new AccountResponse
        {
            Id = model.Id,
            AccountNumber = model.AccountNumber,
            Iban = model.Iban,
            AccountName = model.AccountName,
            Currency = model.Currency,
            OpenedOn = model.OpenedOn,
            ClosedOn = model.ClosedOn,
            AccountType = model.AccountType,
            OwnershipType = model.OwnershipType,
            Status = model.Status,
        };
    }
}

public class AccountStatementRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? StatementNumber { get; set; }
    public virtual DateOnly? PeriodStart { get; set; }
    public virtual DateOnly? PeriodEnd { get; set; }
    public virtual Money? OpeningBalance { get; set; }
    public virtual Money? ClosingBalance { get; set; }
    public virtual StatementDeliveryMethod? DeliveryMethod { get; set; }
}

public class AccountStatementResponse : AccountStatementRequest
{
    public static AccountStatementResponse FromModel(AccountStatement model)
    {
        return new AccountStatementResponse
        {
            Id = model.Id,
            StatementNumber = model.StatementNumber,
            PeriodStart = model.PeriodStart,
            PeriodEnd = model.PeriodEnd,
            OpeningBalance = model.OpeningBalance,
            ClosingBalance = model.ClosingBalance,
            DeliveryMethod = model.DeliveryMethod,
        };
    }
}

public class TransactionRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual DateOnly? BookingDate { get; set; }
    public virtual DateOnly? ValueDate { get; set; }
    public virtual Money? Amount { get; set; }
    public virtual string? Description { get; set; }
    public virtual TransactionDirection? Direction { get; set; }
    public virtual TransactionType? TransactionType { get; set; }
    public virtual TransactionStatus? Status { get; set; }
    public virtual ChannelType? Channel { get; set; }
}

public class TransactionResponse : TransactionRequest
{
    public static TransactionResponse FromModel(Transaction model)
    {
        return new TransactionResponse
        {
            Id = model.Id,
            BookingDate = model.BookingDate,
            ValueDate = model.ValueDate,
            Amount = model.Amount,
            Description = model.Description,
            Direction = model.Direction,
            TransactionType = model.TransactionType,
            Status = model.Status,
            Channel = model.Channel,
        };
    }
}

public class ExternalAccountRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? Name { get; set; }
    public virtual IBAN? Iban { get; set; }
    public virtual AccountNumber? AccountNumber { get; set; }
    public virtual BIC? Bic { get; set; }
    public virtual string? BankName { get; set; }
    public virtual string? Country { get; set; }
}

public class ExternalAccountResponse : ExternalAccountRequest
{
    public static ExternalAccountResponse FromModel(ExternalAccount model)
    {
        return new ExternalAccountResponse
        {
            Id = model.Id,
            Name = model.Name,
            Iban = model.Iban,
            AccountNumber = model.AccountNumber,
            Bic = model.Bic,
            BankName = model.BankName,
            Country = model.Country,
        };
    }
}

public class FundsTransferRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? TransferReference { get; set; }
    public virtual Money? Amount { get; set; }
    public virtual DateOnly? RequestedDate { get; set; }
    public virtual DateOnly? ExecutionDate { get; set; }
    public virtual string? Purpose { get; set; }
    public virtual Money? FeeAmount { get; set; }
    public virtual PaymentMethod? Method { get; set; }
    public virtual PaymentStatus? Status { get; set; }
}

public class FundsTransferResponse : FundsTransferRequest
{
    public static FundsTransferResponse FromModel(FundsTransfer model)
    {
        return new FundsTransferResponse
        {
            Id = model.Id,
            TransferReference = model.TransferReference,
            Amount = model.Amount,
            RequestedDate = model.RequestedDate,
            ExecutionDate = model.ExecutionDate,
            Purpose = model.Purpose,
            FeeAmount = model.FeeAmount,
            Method = model.Method,
            Status = model.Status,
        };
    }
}

public class StandingInstructionRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? InstructionId { get; set; }
    public virtual Money? Amount { get; set; }
    public virtual DateOnly? NextExecutionDate { get; set; }
    public virtual StandingInstructionFrequency? Frequency { get; set; }
    public virtual StandingInstructionStatus? Status { get; set; }
}

public class StandingInstructionResponse : StandingInstructionRequest
{
    public static StandingInstructionResponse FromModel(StandingInstruction model)
    {
        return new StandingInstructionResponse
        {
            Id = model.Id,
            InstructionId = model.InstructionId,
            Amount = model.Amount,
            NextExecutionDate = model.NextExecutionDate,
            Frequency = model.Frequency,
            Status = model.Status,
        };
    }
}

public class PaymentCardRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual CardPAN? CardNumber { get; set; }
    public virtual string? EmbossedName { get; set; }
    public virtual int? ExpiryMonth { get; set; }
    public virtual int? ExpiryYear { get; set; }
    public virtual CardType? CardType { get; set; }
    public virtual CardStatus? CardStatus { get; set; }
    public virtual CardNetwork? Network { get; set; }
}

public class PaymentCardResponse : PaymentCardRequest
{
    public static PaymentCardResponse FromModel(PaymentCard model)
    {
        return new PaymentCardResponse
        {
            Id = model.Id,
            CardNumber = model.CardNumber,
            EmbossedName = model.EmbossedName,
            ExpiryMonth = model.ExpiryMonth,
            ExpiryYear = model.ExpiryYear,
            CardType = model.CardType,
            CardStatus = model.CardStatus,
            Network = model.Network,
        };
    }
}

public class LoanAccountRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? LoanNumber { get; set; }
    public virtual Money? PrincipalAmount { get; set; }
    public virtual Money? OutstandingPrincipal { get; set; }
    public virtual Percentage? InterestRate { get; set; }
    public virtual DateOnly? OriginationDate { get; set; }
    public virtual DateOnly? MaturityDate { get; set; }
    public virtual int? PaymentDayOfMonth { get; set; }
    public virtual string? Currency { get; set; }
    public virtual LoanType? LoanType { get; set; }
    public virtual RateType? RateType { get; set; }
    public virtual InterestCompounding? Compounding { get; set; }
    public virtual LoanStatus? Status { get; set; }
}

public class LoanAccountResponse : LoanAccountRequest
{
    public static LoanAccountResponse FromModel(LoanAccount model)
    {
        return new LoanAccountResponse
        {
            Id = model.Id,
            LoanNumber = model.LoanNumber,
            PrincipalAmount = model.PrincipalAmount,
            OutstandingPrincipal = model.OutstandingPrincipal,
            InterestRate = model.InterestRate,
            OriginationDate = model.OriginationDate,
            MaturityDate = model.MaturityDate,
            PaymentDayOfMonth = model.PaymentDayOfMonth,
            Currency = model.Currency,
            LoanType = model.LoanType,
            RateType = model.RateType,
            Compounding = model.Compounding,
            Status = model.Status,
        };
    }
}

public class RepaymentScheduleRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual int? InstallmentNumber { get; set; }
    public virtual DateOnly? DueDate { get; set; }
    public virtual Money? PrincipalDue { get; set; }
    public virtual Money? InterestDue { get; set; }
    public virtual Money? TotalDue { get; set; }
    public virtual InstallmentStatus? Status { get; set; }
}

public class RepaymentScheduleResponse : RepaymentScheduleRequest
{
    public static RepaymentScheduleResponse FromModel(RepaymentSchedule model)
    {
        return new RepaymentScheduleResponse
        {
            Id = model.Id,
            InstallmentNumber = model.InstallmentNumber,
            DueDate = model.DueDate,
            PrincipalDue = model.PrincipalDue,
            InterestDue = model.InterestDue,
            TotalDue = model.TotalDue,
            Status = model.Status,
        };
    }
}

public class LoanPaymentRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? PaymentReference { get; set; }
    public virtual Money? Amount { get; set; }
    public virtual DateOnly? PaymentDate { get; set; }
    public virtual PaymentMethod? Method { get; set; }
    public virtual PaymentStatus? Status { get; set; }
}

public class LoanPaymentResponse : LoanPaymentRequest
{
    public static LoanPaymentResponse FromModel(LoanPayment model)
    {
        return new LoanPaymentResponse
        {
            Id = model.Id,
            PaymentReference = model.PaymentReference,
            Amount = model.Amount,
            PaymentDate = model.PaymentDate,
            Method = model.Method,
            Status = model.Status,
        };
    }
}

public class CollateralRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? CollateralIdentifier { get; set; }
    public virtual Money? AppraisedValue { get; set; }
    public virtual string? Description { get; set; }
    public virtual Address? Location { get; set; }
    public virtual CollateralType? CollateralType { get; set; }
}

public class CollateralResponse : CollateralRequest
{
    public static CollateralResponse FromModel(Collateral model)
    {
        return new CollateralResponse
        {
            Id = model.Id,
            CollateralIdentifier = model.CollateralIdentifier,
            AppraisedValue = model.AppraisedValue,
            Description = model.Description,
            Location = model.Location,
            CollateralType = model.CollateralType,
        };
    }
}

public class FeeChargeRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? FeeCode { get; set; }
    public virtual Money? Amount { get; set; }
    public virtual DateOnly? AppliedOn { get; set; }
    public virtual FeeType? FeeType { get; set; }
}

public class FeeChargeResponse : FeeChargeRequest
{
    public static FeeChargeResponse FromModel(FeeCharge model)
    {
        return new FeeChargeResponse
        {
            Id = model.Id,
            FeeCode = model.FeeCode,
            Amount = model.Amount,
            AppliedOn = model.AppliedOn,
            FeeType = model.FeeType,
        };
    }
}

public class ExchangeRateRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? BaseCurrency { get; set; }
    public virtual string? CounterCurrency { get; set; }
    public virtual decimal? Rate { get; set; }
    public virtual DateOnly? AsOf { get; set; }
    public virtual string? Source { get; set; }
}

public class ExchangeRateResponse : ExchangeRateRequest
{
    public static ExchangeRateResponse FromModel(ExchangeRate model)
    {
        return new ExchangeRateResponse
        {
            Id = model.Id,
            BaseCurrency = model.BaseCurrency,
            CounterCurrency = model.CounterCurrency,
            Rate = model.Rate,
            AsOf = model.AsOf,
            Source = model.Source,
        };
    }
}

public class FXTradeRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? TradeReference { get; set; }
    public virtual DateOnly? TradeDate { get; set; }
    public virtual DateOnly? SettlementDate { get; set; }
    public virtual Money? AmountSold { get; set; }
    public virtual Money? AmountBought { get; set; }
    public virtual decimal? Rate { get; set; }
    public virtual TradeStatus? Status { get; set; }
}

public class FXTradeResponse : FXTradeRequest
{
    public static FXTradeResponse FromModel(FXTrade model)
    {
        return new FXTradeResponse
        {
            Id = model.Id,
            TradeReference = model.TradeReference,
            TradeDate = model.TradeDate,
            SettlementDate = model.SettlementDate,
            AmountSold = model.AmountSold,
            AmountBought = model.AmountBought,
            Rate = model.Rate,
            Status = model.Status,
        };
    }
}

public class DisputeRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? DisputeReference { get; set; }
    public virtual DateOnly? RaisedOn { get; set; }
    public virtual string? Reason { get; set; }
    public virtual DisputeStatus? Status { get; set; }
}

public class DisputeResponse : DisputeRequest
{
    public static DisputeResponse FromModel(Dispute model)
    {
        return new DisputeResponse
        {
            Id = model.Id,
            DisputeReference = model.DisputeReference,
            RaisedOn = model.RaisedOn,
            Reason = model.Reason,
            Status = model.Status,
        };
    }
}

public class ConsentRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual DateOnly? GrantedOn { get; set; }
    public virtual DateOnly? ExpiresOn { get; set; }
    public virtual ConsentType? ConsentType { get; set; }
    public virtual ConsentStatus? Status { get; set; }
}

public class ConsentResponse : ConsentRequest
{
    public static ConsentResponse FromModel(Consent model)
    {
        return new ConsentResponse
        {
            Id = model.Id,
            GrantedOn = model.GrantedOn,
            ExpiresOn = model.ExpiresOn,
            ConsentType = model.ConsentType,
            Status = model.Status,
        };
    }
}

public class ThirdPartyProviderRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? Name { get; set; }
    public virtual string? RegistrationId { get; set; }
    public virtual string? Website { get; set; }
}

public class ThirdPartyProviderResponse : ThirdPartyProviderRequest
{
    public static ThirdPartyProviderResponse FromModel(ThirdPartyProvider model)
    {
        return new ThirdPartyProviderResponse
        {
            Id = model.Id,
            Name = model.Name,
            RegistrationId = model.RegistrationId,
            Website = model.Website,
        };
    }
}

