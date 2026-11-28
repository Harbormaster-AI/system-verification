/*
* A standard contract for the exchange of payloads for the RESTful APIs
*/
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

using treasuryonaspdotnet.Domain;

namespace treasuryonaspdotnet.Contracts;

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

public class TreasuryUnitRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Name { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Region { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string BookingLocation { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string BaseCurrency { get; set; }
}

public class TreasuryUnitResponse : TreasuryUnitRequest
{
    public static TreasuryUnitResponse FromModel(TreasuryUnit model)
    {
        return new TreasuryUnitResponse
        {
            Id = model.Id,
            Name = model.Name,
            Region = model.Region,
            BookingLocation = model.BookingLocation,
            BaseCurrency = model.BaseCurrency,
        };
    }
}

public class TradingBookRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Name { get; set; }
    public virtual BookCategory? BookCategory { get; set; }
}

public class TradingBookResponse : TradingBookRequest
{
    public static TradingBookResponse FromModel(TradingBook model)
    {
        return new TradingBookResponse
        {
            Id = model.Id,
            Name = model.Name,
            BookCategory = model.BookCategory,
        };
    }
}

public class PortfolioRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Name { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Strategy { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string BaseCurrency { get; set; }
}

public class PortfolioResponse : PortfolioRequest
{
    public static PortfolioResponse FromModel(Portfolio model)
    {
        return new PortfolioResponse
        {
            Id = model.Id,
            Name = model.Name,
            Strategy = model.Strategy,
            BaseCurrency = model.BaseCurrency,
        };
    }
}

public class CounterpartyRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string LegalName { get; set; }
    [Required]
    public required virtual LegalEntityIdentifier Lei { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Sector { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string DomicileCountry { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string CreditRating { get; set; }
}

public class CounterpartyResponse : CounterpartyRequest
{
    public static CounterpartyResponse FromModel(Counterparty model)
    {
        return new CounterpartyResponse
        {
            Id = model.Id,
            LegalName = model.LegalName,
            Lei = model.Lei,
            Sector = model.Sector,
            DomicileCountry = model.DomicileCountry,
            CreditRating = model.CreditRating,
        };
    }
}

public class NettingAgreementRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    public required virtual DateOnly AgreementDate { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string GoverningLaw { get; set; }
    public virtual NettingAgreementType? AgreementType { get; set; }
}

public class NettingAgreementResponse : NettingAgreementRequest
{
    public static NettingAgreementResponse FromModel(NettingAgreement model)
    {
        return new NettingAgreementResponse
        {
            Id = model.Id,
            AgreementDate = model.AgreementDate,
            GoverningLaw = model.GoverningLaw,
            AgreementType = model.AgreementType,
        };
    }
}

public class CollateralAgreementRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    public required virtual Money Threshold { get; set; }
    [Required]
    public required virtual Money MinimumTransferAmount { get; set; }
    [Required]
    public required virtual Money IndependentAmount { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string MarginFrequency { get; set; }
    public virtual CollateralAgreementType? AgreementType { get; set; }
    public virtual CollateralType? EligibleCollateral { get; set; }
}

public class CollateralAgreementResponse : CollateralAgreementRequest
{
    public static CollateralAgreementResponse FromModel(CollateralAgreement model)
    {
        return new CollateralAgreementResponse
        {
            Id = model.Id,
            Threshold = model.Threshold,
            MinimumTransferAmount = model.MinimumTransferAmount,
            IndependentAmount = model.IndependentAmount,
            MarginFrequency = model.MarginFrequency,
            AgreementType = model.AgreementType,
            EligibleCollateral = model.EligibleCollateral,
        };
    }
}

public class CollateralAccountRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string AccountName { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string CustodyLocation { get; set; }
    public virtual CollateralType? CollateralType { get; set; }
}

public class CollateralAccountResponse : CollateralAccountRequest
{
    public static CollateralAccountResponse FromModel(CollateralAccount model)
    {
        return new CollateralAccountResponse
        {
            Id = model.Id,
            AccountName = model.AccountName,
            CustodyLocation = model.CustodyLocation,
            CollateralType = model.CollateralType,
        };
    }
}

public class MarginCallRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    public required virtual DateOnly CallDate { get; set; }
    [Required]
    public required virtual Money RequiredAmount { get; set; }
    public virtual MarginDirection? Direction { get; set; }
    public virtual MarginStatus? Status { get; set; }
}

public class MarginCallResponse : MarginCallRequest
{
    public static MarginCallResponse FromModel(MarginCall model)
    {
        return new MarginCallResponse
        {
            Id = model.Id,
            CallDate = model.CallDate,
            RequiredAmount = model.RequiredAmount,
            Direction = model.Direction,
            Status = model.Status,
        };
    }
}

public class BankAccountRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string AccountName { get; set; }
    [Required]
    public required virtual AccountIdentifier AccountIdentifier { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Currency { get; set; }
    [Required]
    public required virtual BIC BankBic { get; set; }
}

public class BankAccountResponse : BankAccountRequest
{
    public static BankAccountResponse FromModel(BankAccount model)
    {
        return new BankAccountResponse
        {
            Id = model.Id,
            AccountName = model.AccountName,
            AccountIdentifier = model.AccountIdentifier,
            Currency = model.Currency,
            BankBic = model.BankBic,
        };
    }
}

public class CashPositionRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    public required virtual DateOnly PositionDate { get; set; }
    [Required]
    public required virtual Money OpeningBalance { get; set; }
    [Required]
    public required virtual Money ClosingBalance { get; set; }
    [Required]
    public required virtual Money AvailableBalance { get; set; }
}

public class CashPositionResponse : CashPositionRequest
{
    public static CashPositionResponse FromModel(CashPosition model)
    {
        return new CashPositionResponse
        {
            Id = model.Id,
            PositionDate = model.PositionDate,
            OpeningBalance = model.OpeningBalance,
            ClosingBalance = model.ClosingBalance,
            AvailableBalance = model.AvailableBalance,
        };
    }
}

public class CashFlowRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    public required virtual DateOnly FlowDate { get; set; }
    [Required]
    public required virtual Money Amount { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Description { get; set; }
    public virtual CashFlowType? FlowType { get; set; }
}

public class CashFlowResponse : CashFlowRequest
{
    public static CashFlowResponse FromModel(CashFlow model)
    {
        return new CashFlowResponse
        {
            Id = model.Id,
            FlowDate = model.FlowDate,
            Amount = model.Amount,
            Description = model.Description,
            FlowType = model.FlowType,
        };
    }
}

public class TradeRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string TradeNumber { get; set; }
    [Required]
    public required virtual DateOnly TradeDate { get; set; }
    [Required]
    public required virtual DateOnly ValueDate { get; set; }
    [Required]
    public required virtual DateOnly MaturityDate { get; set; }
    [Required]
    public required virtual Money Notional { get; set; }
    [Required]
    public required virtual Rate FixedRate { get; set; }
    public virtual InstrumentType? InstrumentType { get; set; }
    public virtual Side? Side { get; set; }
    public virtual TradeStatus? Status { get; set; }
    public virtual ClearingStatus? ClearingStatus { get; set; }
}

public class TradeResponse : TradeRequest
{
    public static TradeResponse FromModel(Trade model)
    {
        return new TradeResponse
        {
            Id = model.Id,
            TradeNumber = model.TradeNumber,
            TradeDate = model.TradeDate,
            ValueDate = model.ValueDate,
            MaturityDate = model.MaturityDate,
            Notional = model.Notional,
            FixedRate = model.FixedRate,
            InstrumentType = model.InstrumentType,
            Side = model.Side,
            Status = model.Status,
            ClearingStatus = model.ClearingStatus,
        };
    }
}

public class SettlementInstructionRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string PaymentSystem { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string SettlementCurrency { get; set; }
    [Required]
    public required virtual AccountIdentifier BeneficiaryAccount { get; set; }
    [Required]
    public required virtual BIC IntermediaryBankBic { get; set; }
}

public class SettlementInstructionResponse : SettlementInstructionRequest
{
    public static SettlementInstructionResponse FromModel(SettlementInstruction model)
    {
        return new SettlementInstructionResponse
        {
            Id = model.Id,
            PaymentSystem = model.PaymentSystem,
            SettlementCurrency = model.SettlementCurrency,
            BeneficiaryAccount = model.BeneficiaryAccount,
            IntermediaryBankBic = model.IntermediaryBankBic,
        };
    }
}

public class FundingProgramRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string ProgramName { get; set; }
    [Required]
    public required virtual Money LimitAmount { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Rating { get; set; }
    public virtual FundingInstrumentType? InstrumentFamily { get; set; }
}

public class FundingProgramResponse : FundingProgramRequest
{
    public static FundingProgramResponse FromModel(FundingProgram model)
    {
        return new FundingProgramResponse
        {
            Id = model.Id,
            ProgramName = model.ProgramName,
            LimitAmount = model.LimitAmount,
            Rating = model.Rating,
            InstrumentFamily = model.InstrumentFamily,
        };
    }
}

public class IssuanceRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string IssueName { get; set; }
    [Required]
    public required virtual ISIN Isin { get; set; }
    [Required]
    public required virtual DateOnly IssueDate { get; set; }
    [Required]
    public required virtual DateOnly MaturityDate { get; set; }
    [Required]
    public required virtual Rate CouponRate { get; set; }
    [Required]
    public required virtual Money Amount { get; set; }
    public virtual InstrumentType? InstrumentType { get; set; }
    public virtual IssuanceStatus? Status { get; set; }
}

public class IssuanceResponse : IssuanceRequest
{
    public static IssuanceResponse FromModel(Issuance model)
    {
        return new IssuanceResponse
        {
            Id = model.Id,
            IssueName = model.IssueName,
            Isin = model.Isin,
            IssueDate = model.IssueDate,
            MaturityDate = model.MaturityDate,
            CouponRate = model.CouponRate,
            Amount = model.Amount,
            InstrumentType = model.InstrumentType,
            Status = model.Status,
        };
    }
}

public class PositionRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    public required virtual DateOnly AsOfDate { get; set; }
    [Required]
    public required virtual decimal Quantity { get; set; }
    [Required]
    public required virtual Money MarketValue { get; set; }
    [Required]
    public required virtual Money Pnl { get; set; }
    public virtual PositionType? PositionType { get; set; }
}

public class PositionResponse : PositionRequest
{
    public static PositionResponse FromModel(Position model)
    {
        return new PositionResponse
        {
            Id = model.Id,
            AsOfDate = model.AsOfDate,
            Quantity = model.Quantity,
            MarketValue = model.MarketValue,
            Pnl = model.Pnl,
            PositionType = model.PositionType,
        };
    }
}

public class RiskLimitRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Name { get; set; }
    [Required]
    public required virtual decimal Threshold { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Currency { get; set; }
    [Required]
    public required virtual DateOnly EffectiveDate { get; set; }
    public virtual LimitType? LimitType { get; set; }
    public virtual RiskMeasureType? Measure { get; set; }
}

public class RiskLimitResponse : RiskLimitRequest
{
    public static RiskLimitResponse FromModel(RiskLimit model)
    {
        return new RiskLimitResponse
        {
            Id = model.Id,
            Name = model.Name,
            Threshold = model.Threshold,
            Currency = model.Currency,
            EffectiveDate = model.EffectiveDate,
            LimitType = model.LimitType,
            Measure = model.Measure,
        };
    }
}

public class LimitBreachRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    public required virtual DateOnly BreachDate { get; set; }
    [Required]
    public required virtual decimal ObservedValue { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Severity { get; set; }
    public virtual LimitBreachStatus? Status { get; set; }
}

public class LimitBreachResponse : LimitBreachRequest
{
    public static LimitBreachResponse FromModel(LimitBreach model)
    {
        return new LimitBreachResponse
        {
            Id = model.Id,
            BreachDate = model.BreachDate,
            ObservedValue = model.ObservedValue,
            Severity = model.Severity,
            Status = model.Status,
        };
    }
}

public class ApprovalRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string ApproverName { get; set; }
    [Required]
    public required virtual DateOnly ApprovalDate { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Notes { get; set; }
    public virtual ApprovalDecision? Decision { get; set; }
}

public class ApprovalResponse : ApprovalRequest
{
    public static ApprovalResponse FromModel(Approval model)
    {
        return new ApprovalResponse
        {
            Id = model.Id,
            ApproverName = model.ApproverName,
            ApprovalDate = model.ApprovalDate,
            Notes = model.Notes,
            Decision = model.Decision,
        };
    }
}

public class TreasuryPolicyRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Name { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Version { get; set; }
    [Required]
    public required virtual DateOnly EffectiveFrom { get; set; }
    public virtual PolicyArea? Area { get; set; }
}

public class TreasuryPolicyResponse : TreasuryPolicyRequest
{
    public static TreasuryPolicyResponse FromModel(TreasuryPolicy model)
    {
        return new TreasuryPolicyResponse
        {
            Id = model.Id,
            Name = model.Name,
            Version = model.Version,
            EffectiveFrom = model.EffectiveFrom,
            Area = model.Area,
        };
    }
}

public class MarketDataSetRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Name { get; set; }
    [Required]
    public required virtual DateOnly ValuationDate { get; set; }
}

public class MarketDataSetResponse : MarketDataSetRequest
{
    public static MarketDataSetResponse FromModel(MarketDataSet model)
    {
        return new MarketDataSetResponse
        {
            Id = model.Id,
            Name = model.Name,
            ValuationDate = model.ValuationDate,
        };
    }
}

public class YieldCurveRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Currency { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string BuildMethod { get; set; }
    public virtual CurveType? CurveType { get; set; }
    public virtual DayCountConvention? DayCount { get; set; }
}

public class YieldCurveResponse : YieldCurveRequest
{
    public static YieldCurveResponse FromModel(YieldCurve model)
    {
        return new YieldCurveResponse
        {
            Id = model.Id,
            Currency = model.Currency,
            BuildMethod = model.BuildMethod,
            CurveType = model.CurveType,
            DayCount = model.DayCount,
        };
    }
}

public class CurveQuoteRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    public required virtual Tenor Tenor { get; set; }
    [Required]
    public required virtual Rate Rate { get; set; }
}

public class CurveQuoteResponse : CurveQuoteRequest
{
    public static CurveQuoteResponse FromModel(CurveQuote model)
    {
        return new CurveQuoteResponse
        {
            Id = model.Id,
            Tenor = model.Tenor,
            Rate = model.Rate,
        };
    }
}

public class FXRateRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string BaseCurrency { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string QuoteCurrency { get; set; }
    [Required]
    public required virtual decimal Rate { get; set; }
}

public class FXRateResponse : FXRateRequest
{
    public static FXRateResponse FromModel(FXRate model)
    {
        return new FXRateResponse
        {
            Id = model.Id,
            BaseCurrency = model.BaseCurrency,
            QuoteCurrency = model.QuoteCurrency,
            Rate = model.Rate,
        };
    }
}

public class VolSurfaceRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string AssetClass { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Currency { get; set; }
    public virtual PricingModel? Model { get; set; }
}

public class VolSurfaceResponse : VolSurfaceRequest
{
    public static VolSurfaceResponse FromModel(VolSurface model)
    {
        return new VolSurfaceResponse
        {
            Id = model.Id,
            AssetClass = model.AssetClass,
            Currency = model.Currency,
            Model = model.Model,
        };
    }
}

public class RiskReportRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    public required virtual DateOnly ReportDate { get; set; }
    public virtual RiskReportType? ReportType { get; set; }
    public virtual ReportStatus? Status { get; set; }
}

public class RiskReportResponse : RiskReportRequest
{
    public static RiskReportResponse FromModel(RiskReport model)
    {
        return new RiskReportResponse
        {
            Id = model.Id,
            ReportDate = model.ReportDate,
            ReportType = model.ReportType,
            Status = model.Status,
        };
    }
}

public class RegulatoryMetricRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    public required virtual decimal Value { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Currency { get; set; }
    public virtual RegMetricType? MetricType { get; set; }
    public virtual LiquidityHorizon? Horizon { get; set; }
}

public class RegulatoryMetricResponse : RegulatoryMetricRequest
{
    public static RegulatoryMetricResponse FromModel(RegulatoryMetric model)
    {
        return new RegulatoryMetricResponse
        {
            Id = model.Id,
            Value = model.Value,
            Currency = model.Currency,
            MetricType = model.MetricType,
            Horizon = model.Horizon,
        };
    }
}

public class LiquidityBufferRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Name { get; set; }
    [Required]
    public required virtual Money MarketValue { get; set; }
    public virtual HQLAClass? HqlaClass { get; set; }
}

public class LiquidityBufferResponse : LiquidityBufferRequest
{
    public static LiquidityBufferResponse FromModel(LiquidityBuffer model)
    {
        return new LiquidityBufferResponse
        {
            Id = model.Id,
            Name = model.Name,
            MarketValue = model.MarketValue,
            HqlaClass = model.HqlaClass,
        };
    }
}

public class BufferAssetRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string SecurityName { get; set; }
    [Required]
    public required virtual ISIN Isin { get; set; }
    [Required]
    public required virtual Money MarketValue { get; set; }
    public virtual HQLAClass? HqlaClass { get; set; }
}

public class BufferAssetResponse : BufferAssetRequest
{
    public static BufferAssetResponse FromModel(BufferAsset model)
    {
        return new BufferAssetResponse
        {
            Id = model.Id,
            SecurityName = model.SecurityName,
            Isin = model.Isin,
            MarketValue = model.MarketValue,
            HqlaClass = model.HqlaClass,
        };
    }
}

public class TransferPricingRuleRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Name { get; set; }
    [Required]
    public required virtual Rate Spread { get; set; }
    [Required]
    public required virtual DateOnly EffectiveFrom { get; set; }
    public virtual TransferPricingMethod? Method { get; set; }
    public virtual CurveType? CurveType { get; set; }
}

public class TransferPricingRuleResponse : TransferPricingRuleRequest
{
    public static TransferPricingRuleResponse FromModel(TransferPricingRule model)
    {
        return new TransferPricingRuleResponse
        {
            Id = model.Id,
            Name = model.Name,
            Spread = model.Spread,
            EffectiveFrom = model.EffectiveFrom,
            Method = model.Method,
            CurveType = model.CurveType,
        };
    }
}

public class InternalDealRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string DealNumber { get; set; }
    [Required]
    public required virtual DateOnly TradeDate { get; set; }
    [Required]
    public required virtual DateOnly ValueDate { get; set; }
    [Required]
    public required virtual DateOnly MaturityDate { get; set; }
    [Required]
    public required virtual Rate Rate { get; set; }
    [Required]
    public required virtual Money Notional { get; set; }
    public virtual InstrumentType? Product { get; set; }
    public virtual Side? Side { get; set; }
    public virtual TradeStatus? Status { get; set; }
}

public class InternalDealResponse : InternalDealRequest
{
    public static InternalDealResponse FromModel(InternalDeal model)
    {
        return new InternalDealResponse
        {
            Id = model.Id,
            DealNumber = model.DealNumber,
            TradeDate = model.TradeDate,
            ValueDate = model.ValueDate,
            MaturityDate = model.MaturityDate,
            Rate = model.Rate,
            Notional = model.Notional,
            Product = model.Product,
            Side = model.Side,
            Status = model.Status,
        };
    }
}

public class HedgeRelationshipRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Name { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Objective { get; set; }
    public virtual HedgeDesignationStatus? DesignationStatus { get; set; }
}

public class HedgeRelationshipResponse : HedgeRelationshipRequest
{
    public static HedgeRelationshipResponse FromModel(HedgeRelationship model)
    {
        return new HedgeRelationshipResponse
        {
            Id = model.Id,
            Name = model.Name,
            Objective = model.Objective,
            DesignationStatus = model.DesignationStatus,
        };
    }
}

public class AccountingEntryRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    public required virtual DateOnly PostingDate { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Account { get; set; }
    [Required]
    public required virtual Money Amount { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Narrative { get; set; }
    [Required]
    public required virtual AccountingTreatment Treatment { get; set; }
}

public class AccountingEntryResponse : AccountingEntryRequest
{
    public static AccountingEntryResponse FromModel(AccountingEntry model)
    {
        return new AccountingEntryResponse
        {
            Id = model.Id,
            PostingDate = model.PostingDate,
            Account = model.Account,
            Amount = model.Amount,
            Narrative = model.Narrative,
            Treatment = model.Treatment,
        };
    }
}

public class StressScenarioRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Name { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Severity { get; set; }
    public virtual LiquidityHorizon? Horizon { get; set; }
}

public class StressScenarioResponse : StressScenarioRequest
{
    public static StressScenarioResponse FromModel(StressScenario model)
    {
        return new StressScenarioResponse
        {
            Id = model.Id,
            Name = model.Name,
            Severity = model.Severity,
            Horizon = model.Horizon,
        };
    }
}

public class StressResultRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    public required virtual decimal Value { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Currency { get; set; }
    public virtual RiskMeasureType? Measure { get; set; }
}

public class StressResultResponse : StressResultRequest
{
    public static StressResultResponse FromModel(StressResult model)
    {
        return new StressResultResponse
        {
            Id = model.Id,
            Value = model.Value,
            Currency = model.Currency,
            Measure = model.Measure,
        };
    }
}

public class BusinessCalendarRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Name { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Location { get; set; }
}

public class BusinessCalendarResponse : BusinessCalendarRequest
{
    public static BusinessCalendarResponse FromModel(BusinessCalendar model)
    {
        return new BusinessCalendarResponse
        {
            Id = model.Id,
            Name = model.Name,
            Location = model.Location,
        };
    }
}

public class HolidayRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    public required virtual DateOnly Date { get; set; }
    [Required]
    [Length(0, int.MaxValue)]
    public required virtual string Description { get; set; }
}

public class HolidayResponse : HolidayRequest
{
    public static HolidayResponse FromModel(Holiday model)
    {
        return new HolidayResponse
        {
            Id = model.Id,
            Date = model.Date,
            Description = model.Description,
        };
    }
}

