package model


//==============================================================
// AdvisorRole Declaration
//==============================================================
type AdvisorRole int
const (
    AdvisorRoleLeadAdvisor AdvisorRole = iota
	AdvisorRoleAssociateAdvisor
	AdvisorRolePortfolioManager
	AdvisorRolePlanner
	AdvisorRoleClientService
)


//==============================================================
// AccountType Declaration
//==============================================================
type AccountType int
const (
    AccountTypeTaxable AccountType = iota
	AccountTypeTraditionalIRA
	AccountTypeRothIRA
	AccountTypeSEPIRA
	AccountTypeTrust
	AccountTypeFour_O_One_k
	AccountTypeFive_Twenty_Nine
	AccountTypeHSA
)


//==============================================================
// RegistrationType Declaration
//==============================================================
type RegistrationType int
const (
    RegistrationTypeIndividual RegistrationType = iota
	RegistrationTypeJointTenants
	RegistrationTypeTenantsInCommon
	RegistrationTypeCommunityProperty
	RegistrationTypeTrustRegistration
	RegistrationTypeEntity
)


//==============================================================
// AccountStatus Declaration
//==============================================================
type AccountStatus int
const (
    AccountStatusPending AccountStatus = iota
	AccountStatusOpen
	AccountStatusRestricted
	AccountStatusClosed
)


//==============================================================
// PortfolioType Declaration
//==============================================================
type PortfolioType int
const (
    PortfolioTypeDiscretionary PortfolioType = iota
	PortfolioTypeAdvisory
	PortfolioTypeUMA
	PortfolioTypeSMA
	PortfolioTypeModelOnly
)


//==============================================================
// RebalanceFrequency Declaration
//==============================================================
type RebalanceFrequency int
const (
    RebalanceFrequencyNone RebalanceFrequency = iota
	RebalanceFrequencyMonthly
	RebalanceFrequencyQuarterly
	RebalanceFrequencySemiAnnual
	RebalanceFrequencyAnnual
	RebalanceFrequencyDriftBased
)


//==============================================================
// RiskToleranceLevel Declaration
//==============================================================
type RiskToleranceLevel int
const (
    RiskToleranceLevelConservative RiskToleranceLevel = iota
	RiskToleranceLevelModeratelyConservative
	RiskToleranceLevelModerate
	RiskToleranceLevelModeratelyAggressive
	RiskToleranceLevelAggressive
)


//==============================================================
// SuitabilityStatus Declaration
//==============================================================
type SuitabilityStatus int
const (
    SuitabilityStatusApproved SuitabilityStatus = iota
	SuitabilityStatusConditionallyApproved
	SuitabilityStatusNotApproved
	SuitabilityStatusPendingReview
)


//==============================================================
// GoalType Declaration
//==============================================================
type GoalType int
const (
    GoalTypeRetirement GoalType = iota
	GoalTypeEducation
	GoalTypeWealthAccumulation
	GoalTypeLegacy
	GoalTypeMajorPurchase
	GoalTypeCharitable
)


//==============================================================
// SecurityType Declaration
//==============================================================
type SecurityType int
const (
    SecurityTypeEquity SecurityType = iota
	SecurityTypeMutualFund
	SecurityTypeETF
	SecurityTypeBond
	SecurityTypeCash
	SecurityTypeOption
	SecurityTypeAlternative
)


//==============================================================
// AssetClass Declaration
//==============================================================
type AssetClass int
const (
    AssetClassUSEquity AssetClass = iota
	AssetClassInternationalEquity
	AssetClassEmergingMarkets
	AssetClassUSFixedIncome
	AssetClassGlobalFixedIncome
	AssetClassRealAssets
	AssetClassAlternatives
	AssetClassCashEquivalent
)


//==============================================================
// PricingSourceType Declaration
//==============================================================
type PricingSourceType int
const (
    PricingSourceTypeExchangeClose PricingSourceType = iota
	PricingSourceTypeEvaluatedPrice
	PricingSourceTypeVendorComposite
	PricingSourceTypeInternalModel
)


//==============================================================
// CorporateActionType Declaration
//==============================================================
type CorporateActionType int
const (
    CorporateActionTypeDividend CorporateActionType = iota
	CorporateActionTypeStockSplit
	CorporateActionTypeSpinOff
	CorporateActionTypeMerger
	CorporateActionTypeRightsIssue
	CorporateActionTypeReturnOfCapital
)


//==============================================================
// PositionType Declaration
//==============================================================
type PositionType int
const (
    PositionTypeLong PositionType = iota
	PositionTypeShort
	PositionTypeCash
)


//==============================================================
// TaxLotMethod Declaration
//==============================================================
type TaxLotMethod int
const (
    TaxLotMethodFIFO TaxLotMethod = iota
	TaxLotMethodLIFO
	TaxLotMethodHIFO
	TaxLotMethodSpecificLot
	TaxLotMethodAverageCost
)


//==============================================================
// TransactionType Declaration
//==============================================================
type TransactionType int
const (
    TransactionTypeBuy TransactionType = iota
	TransactionTypeSell
	TransactionTypeDividend
	TransactionTypeInterest
	TransactionTypeFee
	TransactionTypeTransferIn
	TransactionTypeTransferOut
	TransactionTypeCorporateAction
)


//==============================================================
// OrderType Declaration
//==============================================================
type OrderType int
const (
    OrderTypeMarket OrderType = iota
	OrderTypeLimit
	OrderTypeStop
	OrderTypeStopLimit
)


//==============================================================
// OrderSide Declaration
//==============================================================
type OrderSide int
const (
    OrderSideBuy OrderSide = iota
	OrderSideSell
	OrderSideSellShort
	OrderSideBuyToCover
)


//==============================================================
// PriceType Declaration
//==============================================================
type PriceType int
const (
    PriceTypeMarket PriceType = iota
	PriceTypeLimit
	PriceTypeStop
	PriceTypeStopLimit
)


//==============================================================
// TimeInForce Declaration
//==============================================================
type TimeInForce int
const (
    TimeInForceDay TimeInForce = iota
	TimeInForceGTC
	TimeInForceFOK
	TimeInForceIOC
)


//==============================================================
// OrderStatus Declaration
//==============================================================
type OrderStatus int
const (
    OrderStatusNew OrderStatus = iota
	OrderStatusRouted
	OrderStatusPartiallyFilled
	OrderStatusFilled
	OrderStatusCancelled
	OrderStatusRejected
)


//==============================================================
// TradeStatus Declaration
//==============================================================
type TradeStatus int
const (
    TradeStatusExecuted TradeStatus = iota
	TradeStatusCorrected
	TradeStatusCancelled
	TradeStatusSettled
)


//==============================================================
// RebalanceStatus Declaration
//==============================================================
type RebalanceStatus int
const (
    RebalanceStatusDraft RebalanceStatus = iota
	RebalanceStatusProposed
	RebalanceStatusApproved
	RebalanceStatusImplemented
	RebalanceStatusCancelled
)


//==============================================================
// RebalanceMethod Declaration
//==============================================================
type RebalanceMethod int
const (
    RebalanceMethodProRata RebalanceMethod = iota
	RebalanceMethodSellOverweightBuyUnderweight
	RebalanceMethodCashOnly
	RebalanceMethodTaxAware
)


//==============================================================
// PerformanceFrequency Declaration
//==============================================================
type PerformanceFrequency int
const (
    PerformanceFrequencyMonthly PerformanceFrequency = iota
	PerformanceFrequencyQuarterly
	PerformanceFrequencyAnnual
	PerformanceFrequencyTrailing
)


//==============================================================
// BenchmarkType Declaration
//==============================================================
type BenchmarkType int
const (
    BenchmarkTypeSingleIndex BenchmarkType = iota
	BenchmarkTypeBlended
	BenchmarkTypeCustom
)


//==============================================================
// FeeType Declaration
//==============================================================
type FeeType int
const (
    FeeTypeAUM FeeType = iota
	FeeTypeFlat
	FeeTypeSubscription
	FeeTypePerformanceBased
)


//==============================================================
// BillingMethod Declaration
//==============================================================
type BillingMethod int
const (
    BillingMethodAdvance BillingMethod = iota
	BillingMethodArrears
	BillingMethodAverageDailyBalance
	BillingMethodPeriodEndBalance
)


//==============================================================
// BillingRunStatus Declaration
//==============================================================
type BillingRunStatus int
const (
    BillingRunStatusPending BillingRunStatus = iota
	BillingRunStatusInProgress
	BillingRunStatusCompleted
	BillingRunStatusFailed
)


//==============================================================
// InvoiceStatus Declaration
//==============================================================
type InvoiceStatus int
const (
    InvoiceStatusOpen InvoiceStatus = iota
	InvoiceStatusPaid
	InvoiceStatusPartiallyPaid
	InvoiceStatusVoid
)


//==============================================================
// DocumentType Declaration
//==============================================================
type DocumentType int
const (
    DocumentTypeIdentification DocumentType = iota
	DocumentTypeTaxForm
	DocumentTypeStatement
	DocumentTypeAgreement
	DocumentTypeMeetingNotes
	DocumentTypeMiscellaneous
)


//==============================================================
// AgreementType Declaration
//==============================================================
type AgreementType int
const (
    AgreementTypeAdvisoryAgreement AgreementType = iota
	AgreementTypeDiscretionaryMandate
	AgreementTypeMarginAgreement
	AgreementTypeOptionsAgreement
	AgreementTypePrivacyNoticeAcknowledgment
)


//==============================================================
// AgreementStatus Declaration
//==============================================================
type AgreementStatus int
const (
    AgreementStatusDraft AgreementStatus = iota
	AgreementStatusExecuted
	AgreementStatusAmended
	AgreementStatusTerminated
)


//==============================================================
// KycStatus Declaration
//==============================================================
type KycStatus int
const (
    KycStatusNotStarted KycStatus = iota
	KycStatusInProgress
	KycStatusVerified
	KycStatusEscalated
	KycStatusExpired
)


//==============================================================
// ComplianceStatus Declaration
//==============================================================
type ComplianceStatus int
const (
    ComplianceStatusOpen ComplianceStatus = iota
	ComplianceStatusUnderReview
	ComplianceStatusResolved
	ComplianceStatusDismissed
)


//==============================================================
// AlertSeverity Declaration
//==============================================================
type AlertSeverity int
const (
    AlertSeverityLow AlertSeverity = iota
	AlertSeverityMedium
	AlertSeverityHigh
	AlertSeverityCritical
)


//==============================================================
// ProposalStatus Declaration
//==============================================================
type ProposalStatus int
const (
    ProposalStatusDraft ProposalStatus = iota
	ProposalStatusPresented
	ProposalStatusAccepted
	ProposalStatusRejected
	ProposalStatusWithdrawn
)


//==============================================================
// TransferType Declaration
//==============================================================
type TransferType int
const (
    TransferTypeACATIn TransferType = iota
	TransferTypeACATOut
	TransferTypeInternalJournal
	TransferTypeInKind
	TransferTypeCashOnly
)


//==============================================================
// TransferStatus Declaration
//==============================================================
type TransferStatus int
const (
    TransferStatusRequested TransferStatus = iota
	TransferStatusInTransit
	TransferStatusCompleted
	TransferStatusFailed
	TransferStatusCancelled
)


//==============================================================
// InstructionType Declaration
//==============================================================
type InstructionType int
const (
    InstructionTypeCashSweep InstructionType = iota
	InstructionTypePeriodicContribution
	InstructionTypePeriodicWithdrawal
	InstructionTypeDividendReinvestment
	InstructionTypeScheduledRebalance
)


//==============================================================
// InstructionFrequency Declaration
//==============================================================
type InstructionFrequency int
const (
    InstructionFrequencyWeekly InstructionFrequency = iota
	InstructionFrequencyBiWeekly
	InstructionFrequencyMonthly
	InstructionFrequencyQuarterly
	InstructionFrequencyAnnually
	InstructionFrequencyOnEvent
)


//==============================================================
// CashMovementType Declaration
//==============================================================
type CashMovementType int
const (
    CashMovementTypeDeposit CashMovementType = iota
	CashMovementTypeWithdrawal
	CashMovementTypeDividend
	CashMovementTypeInterest
	CashMovementTypeFee
	CashMovementTypeTransfer
)


//==============================================================
// AnalystRating Declaration
//==============================================================
type AnalystRating int
const (
    AnalystRatingStrongBuy AnalystRating = iota
	AnalystRatingBuy
	AnalystRatingHold
	AnalystRatingSell
	AnalystRatingStrongSell
)

