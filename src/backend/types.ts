export enum CustomerType {
    Individual = "Individual",
    Business = "Business",
    NonProfit = "NonProfit",
    Government = "Government",
}
export enum AccountType {
    Checking = "Checking",
    Savings = "Savings",
    MoneyMarket = "MoneyMarket",
    TimeDeposit = "TimeDeposit",
}
export enum AccountStatus {
    Open = "Open",
    Frozen = "Frozen",
    Dormant = "Dormant",
    Closed = "Closed",
}
export enum AccountOwnershipType {
    Sole = "Sole",
    Joint = "Joint",
    Corporate = "Corporate",
    Trust = "Trust",
}
export enum StatementDeliveryMethod {
    Electronic = "Electronic",
    Paper = "Paper",
}
export enum TransactionType {
    Deposit = "Deposit",
    Withdrawal = "Withdrawal",
    Transfer = "Transfer",
    Payment = "Payment",
    Fee = "Fee",
    Interest = "Interest",
    Adjustment = "Adjustment",
    Chargeback = "Chargeback",
    Refund = "Refund",
    FXConversion = "FXConversion",
}
export enum TransactionStatus {
    Pending = "Pending",
    Posted = "Posted",
    Reversed = "Reversed",
    Failed = "Failed",
    Cancelled = "Cancelled",
}
export enum TransactionDirection {
    Credit = "Credit",
    Debit = "Debit",
}
export enum ChannelType {
    Branch = "Branch",
    Online = "Online",
    Mobile = "Mobile",
    ATM = "ATM",
    API = "API",
    CallCenter = "CallCenter",
}
export enum PaymentMethod {
    InternalTransfer = "InternalTransfer",
    ACH = "ACH",
    Wire = "Wire",
    SEPA = "SEPA",
    SWIFT = "SWIFT",
    Card = "Card",
    Cash = "Cash",
    Check = "Check",
    MobileWallet = "MobileWallet",
}
export enum PaymentStatus {
    Initiated = "Initiated",
    InProcess = "InProcess",
    Settled = "Settled",
    Failed = "Failed",
    Reversed = "Reversed",
    Cancelled = "Cancelled",
}
export enum StandingInstructionFrequency {
    OneTime = "OneTime",
    Weekly = "Weekly",
    BiWeekly = "BiWeekly",
    Monthly = "Monthly",
    Quarterly = "Quarterly",
    Annually = "Annually",
}
export enum StandingInstructionStatus {
    Active = "Active",
    Paused = "Paused",
    Cancelled = "Cancelled",
    Completed = "Completed",
}
export enum CardType {
    Debit = "Debit",
    Credit = "Credit",
    Prepaid = "Prepaid",
    Virtual = "Virtual",
}
export enum CardStatus {
    Active = "Active",
    Blocked = "Blocked",
    LostStolen = "LostStolen",
    Expired = "Expired",
    Closed = "Closed",
}
export enum CardNetwork {
    Visa = "Visa",
    Mastercard = "Mastercard",
    Amex = "Amex",
    Discover = "Discover",
    UnionPay = "UnionPay",
    Other = "Other",
}
export enum LoanType {
    Mortgage = "Mortgage",
    Personal = "Personal",
    Auto = "Auto",
    SmallBusiness = "SmallBusiness",
    CreditLine = "CreditLine",
    Student = "Student",
}
export enum LoanStatus {
    Applied = "Applied",
    Approved = "Approved",
    Active = "Active",
    Delinquent = "Delinquent",
    Defaulted = "Defaulted",
    Closed = "Closed",
}
export enum RateType {
    Fixed = "Fixed",
    Variable = "Variable",
}
export enum InterestCompounding {
    Daily = "Daily",
    Monthly = "Monthly",
    Quarterly = "Quarterly",
    Annually = "Annually",
}
export enum InstallmentStatus {
    Due = "Due",
    Paid = "Paid",
    Overdue = "Overdue",
    Deferred = "Deferred",
}
export enum FeeType {
    Maintenance = "Maintenance",
    Overdraft = "Overdraft",
    Wire = "Wire",
    ATM = "ATM",
    CardAnnual = "CardAnnual",
    LatePayment = "LatePayment",
    EarlyWithdrawal = "EarlyWithdrawal",
    ReplacementCard = "ReplacementCard",
}
export enum RiskRating {
    Low = "Low",
    Medium = "Medium",
    High = "High",
}
export enum KycStatus {
    Pending = "Pending",
    Verified = "Verified",
    Rejected = "Rejected",
    Expired = "Expired",
}
export enum IdentityDocumentType {
    Passport = "Passport",
    NationalID = "NationalID",
    DriverLicense = "DriverLicense",
    ResidencePermit = "ResidencePermit",
    BusinessRegistration = "BusinessRegistration",
    TaxCertificate = "TaxCertificate",
}
export enum ScreeningOutcome {
    Clear = "Clear",
    Match = "Match",
    Review = "Review",
}
export enum TradeStatus {
    Booked = "Booked",
    Settled = "Settled",
    Cancelled = "Cancelled",
}
export enum ATMStatus {
    InService = "InService",
    OutOfService = "OutOfService",
    Maintenance = "Maintenance",
}
export enum ConsentType {
    OpenBanking = "OpenBanking",
    PaymentInitiation = "PaymentInitiation",
    AccountInformation = "AccountInformation",
    Marketing = "Marketing",
    DataSharing = "DataSharing",
}
export enum ConsentStatus {
    Active = "Active",
    Revoked = "Revoked",
    Expired = "Expired",
}
export enum DisputeStatus {
    Open = "Open",
    UnderReview = "UnderReview",
    Resolved = "Resolved",
    Rejected = "Rejected",
    Withdrawn = "Withdrawn",
}
export enum ProductCategory {
    Deposit = "Deposit",
    Loan = "Loan",
    Card = "Card",
    PaymentService = "PaymentService",
    Investment = "Investment",
}
export enum CollateralType {
    RealEstate = "RealEstate",
    Vehicle = "Vehicle",
    Cash = "Cash",
    Securities = "Securities",
    Guarantee = "Guarantee",
    Equipment = "Equipment",
}

export interface Bank {
    id: string;
    name: string
    legalName: string
    swiftBic: string
    headquartersCountry: string
    website: string
}

export interface Branch {
    id: string;
    name: string
    branchCode: string
    address: string
    phone: string
    openingHours: string
}

export interface ATM {
    id: string;
    terminalId: string
    location: string
    Status:  ATMStatus
}

export interface Customer {
    id: string;
    firstName: string
    lastName: string
    legalName: string
    dateOfBirth: string
    taxId: string
    email: string
    phone: string
    address: string
    CustomerType:  CustomerType
    RiskRating:  RiskRating
    KycStatus:  KycStatus
}

export interface KycProfile {
    id: string;
    profileId: string
    lastReviewedOn: string
    Status:  KycStatus
}

export interface IdentityDocument {
    id: string;
    documentNumber: string
    issuingCountry: string
    expirationDate: string
    DocumentType:  IdentityDocumentType
}

export interface RiskAssessment {
    id: string;
    score: number
    assessedOn: string
    Rating:  RiskRating
}

export interface ScreeningResult {
    id: string;
    screeningDate: string
    provider: string
    Outcome:  ScreeningOutcome
}

export interface BankingProduct {
    id: string;
    productCode: string
    name: string
    description: string
    ProductCategory:  ProductCategory
}

export interface Account {
    id: string;
    accountNumber: string
    iban: string
    accountName: string
    currency: string
    openedOn: string
    closedOn: string
    AccountType:  AccountType
    OwnershipType:  AccountOwnershipType
    Status:  AccountStatus
}

export interface AccountStatement {
    id: string;
    statementNumber: string
    periodStart: string
    periodEnd: string
    openingBalance: string
    closingBalance: string
    DeliveryMethod:  StatementDeliveryMethod
}

export interface Transaction {
    id: string;
    bookingDate: string
    valueDate: string
    amount: string
    description: string
    Direction:  TransactionDirection
    TransactionType:  TransactionType
    Status:  TransactionStatus
    Channel:  ChannelType
}

export interface ExternalAccount {
    id: string;
    name: string
    iban: string
    accountNumber: string
    bic: string
    bankName: string
    country: string
}

export interface FundsTransfer {
    id: string;
    transferReference: string
    amount: string
    requestedDate: string
    executionDate: string
    purpose: string
    feeAmount: string
    Method:  PaymentMethod
    Status:  PaymentStatus
}

export interface StandingInstruction {
    id: string;
    instructionId: string
    amount: string
    nextExecutionDate: string
    Frequency:  StandingInstructionFrequency
    Status:  StandingInstructionStatus
}

export interface PaymentCard {
    id: string;
    cardNumber: string
    embossedName: string
    expiryMonth: number
    expiryYear: number
    CardType:  CardType
    CardStatus:  CardStatus
    Network:  CardNetwork
}

export interface LoanAccount {
    id: string;
    loanNumber: string
    principalAmount: string
    outstandingPrincipal: string
    interestRate: string
    originationDate: string
    maturityDate: string
    paymentDayOfMonth: number
    currency: string
    LoanType:  LoanType
    RateType:  RateType
    Compounding:  InterestCompounding
    Status:  LoanStatus
}

export interface RepaymentSchedule {
    id: string;
    installmentNumber: number
    dueDate: string
    principalDue: string
    interestDue: string
    totalDue: string
    Status:  InstallmentStatus
}

export interface LoanPayment {
    id: string;
    paymentReference: string
    amount: string
    paymentDate: string
    Method:  PaymentMethod
    Status:  PaymentStatus
}

export interface Collateral {
    id: string;
    collateralIdentifier: string
    appraisedValue: string
    description: string
    location: string
    CollateralType:  CollateralType
}

export interface FeeCharge {
    id: string;
    feeCode: string
    amount: string
    appliedOn: string
    FeeType:  FeeType
}

export interface ExchangeRate {
    id: string;
    baseCurrency: string
    counterCurrency: string
    rate: number
    asOf: string
    source: string
}

export interface FXTrade {
    id: string;
    tradeReference: string
    tradeDate: string
    settlementDate: string
    amountSold: string
    amountBought: string
    rate: number
    Status:  TradeStatus
}

export interface Dispute {
    id: string;
    disputeReference: string
    raisedOn: string
    reason: string
    Status:  DisputeStatus
}

export interface Consent {
    id: string;
    grantedOn: string
    expiresOn: string
    ConsentType:  ConsentType
    Status:  ConsentStatus
}

export interface ThirdPartyProvider {
    id: string;
    name: string
    registrationId: string
    website: string
}

