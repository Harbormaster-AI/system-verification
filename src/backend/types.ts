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
    name: String
    legalName: String
    swiftBic: String
    headquartersCountry: String
    website: String
}

export interface Branch {
    id: string;
    name: String
    branchCode: String
    address: String
    phone: String
    openingHours: String
}

export interface ATM {
    id: string;
    terminalId: String
    location: String
    Status:  ATMStatus
}

export interface Customer {
    id: string;
    firstName: String
    lastName: String
    legalName: String
    dateOfBirth: String
    taxId: String
    email: String
    phone: String
    address: String
    CustomerType:  CustomerType
    RiskRating:  RiskRating
    KycStatus:  KycStatus
}

export interface KycProfile {
    id: string;
    profileId: String
    lastReviewedOn: String
    Status:  KycStatus
}

export interface IdentityDocument {
    id: string;
    documentNumber: String
    issuingCountry: String
    expirationDate: String
    DocumentType:  IdentityDocumentType
}

export interface RiskAssessment {
    id: string;
    score: Int
    assessedOn: String
    Rating:  RiskRating
}

export interface ScreeningResult {
    id: string;
    screeningDate: String
    provider: String
    Outcome:  ScreeningOutcome
}

export interface BankingProduct {
    id: string;
    productCode: String
    name: String
    description: String
    ProductCategory:  ProductCategory
}

export interface Account {
    id: string;
    accountNumber: String
    iban: String
    accountName: String
    currency: String
    openedOn: String
    closedOn: String
    AccountType:  AccountType
    OwnershipType:  AccountOwnershipType
    Status:  AccountStatus
}

export interface AccountStatement {
    id: string;
    statementNumber: String
    periodStart: String
    periodEnd: String
    openingBalance: String
    closingBalance: String
    DeliveryMethod:  StatementDeliveryMethod
}

export interface Transaction {
    id: string;
    bookingDate: String
    valueDate: String
    amount: String
    description: String
    Direction:  TransactionDirection
    TransactionType:  TransactionType
    Status:  TransactionStatus
    Channel:  ChannelType
}

export interface ExternalAccount {
    id: string;
    name: String
    iban: String
    accountNumber: String
    bic: String
    bankName: String
    country: String
}

export interface FundsTransfer {
    id: string;
    transferReference: String
    amount: String
    requestedDate: String
    executionDate: String
    purpose: String
    feeAmount: String
    Method:  PaymentMethod
    Status:  PaymentStatus
}

export interface StandingInstruction {
    id: string;
    instructionId: String
    amount: String
    nextExecutionDate: String
    Frequency:  StandingInstructionFrequency
    Status:  StandingInstructionStatus
}

export interface PaymentCard {
    id: string;
    cardNumber: String
    embossedName: String
    expiryMonth: Int
    expiryYear: Int
    CardType:  CardType
    CardStatus:  CardStatus
    Network:  CardNetwork
}

export interface LoanAccount {
    id: string;
    loanNumber: String
    principalAmount: String
    outstandingPrincipal: String
    interestRate: String
    originationDate: String
    maturityDate: String
    paymentDayOfMonth: Int
    currency: String
    LoanType:  LoanType
    RateType:  RateType
    Compounding:  InterestCompounding
    Status:  LoanStatus
}

export interface RepaymentSchedule {
    id: string;
    installmentNumber: Int
    dueDate: String
    principalDue: String
    interestDue: String
    totalDue: String
    Status:  InstallmentStatus
}

export interface LoanPayment {
    id: string;
    paymentReference: String
    amount: String
    paymentDate: String
    Method:  PaymentMethod
    Status:  PaymentStatus
}

export interface Collateral {
    id: string;
    appraisedValue: String
    description: String
    location: String
    CollateralType:  CollateralType
}

export interface FeeCharge {
    id: string;
    feeCode: String
    amount: String
    appliedOn: String
    FeeType:  FeeType
}

export interface ExchangeRate {
    id: string;
    baseCurrency: String
    counterCurrency: String
    rate: String
    asOf: String
    source: String
}

export interface FXTrade {
    id: string;
    tradeReference: String
    tradeDate: String
    settlementDate: String
    amountSold: String
    amountBought: String
    rate: String
    Status:  TradeStatus
}

export interface Dispute {
    id: string;
    disputeReference: String
    raisedOn: String
    reason: String
    Status:  DisputeStatus
}

export interface Consent {
    id: string;
    grantedOn: String
    expiresOn: String
    ConsentType:  ConsentType
    Status:  ConsentStatus
}

export interface ThirdPartyProvider {
    id: string;
    name: String
    registrationId: String
    website: String
}

