export interface Bank {
    id: string;
    name: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    legalName: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    swiftBic: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    headquartersCountry: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    website: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
}

export interface Branch {
    id: string;
    name: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    branchCode: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    address: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    phone: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    openingHours: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
}

export interface ATM {
    id: string;
    terminalId: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    location: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
}

export interface Customer {
    id: string;
    firstName: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    lastName: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    legalName: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    dateOfBirth: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    taxId: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    email: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    phone: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    address: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    CustomerType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    RiskRating: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    KycStatus: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
}

export interface KycProfile {
    id: string;
    profileId: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    lastReviewedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
}

export interface IdentityDocument {
    id: string;
    documentNumber: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    issuingCountry: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    expirationDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    DocumentType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
}

export interface RiskAssessment {
    id: string;
    score: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    assessedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    Rating: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
}

export interface ScreeningResult {
    id: string;
    screeningDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    provider: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    Outcome: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
}

export interface BankingProduct {
    id: string;
    productCode: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    name: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    description: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    ProductCategory: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
}

export interface Account {
    id: string;
    accountNumber: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    iban: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    accountName: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    currency: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    openedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    closedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    AccountType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    OwnershipType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
}

export interface AccountStatement {
    id: string;
    statementNumber: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    periodStart: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    periodEnd: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    openingBalance: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    closingBalance: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    DeliveryMethod: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
}

export interface Transaction {
    id: string;
    bookingDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    valueDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    amount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    description: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    Direction: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    TransactionType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    Channel: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
}

export interface ExternalAccount {
    id: string;
    name: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    iban: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    accountNumber: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    bic: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    bankName: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    country: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
}

export interface FundsTransfer {
    id: string;
    transferReference: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    amount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    requestedDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    executionDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    purpose: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    feeAmount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    Method: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
}

export interface StandingInstruction {
    id: string;
    instructionId: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    amount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    nextExecutionDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    Frequency: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
}

export interface PaymentCard {
    id: string;
    cardNumber: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    embossedName: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    expiryMonth: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    expiryYear: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    CardType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    CardStatus: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    Network: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
}

export interface LoanAccount {
    id: string;
    loanNumber: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    principalAmount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    outstandingPrincipal: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    interestRate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    originationDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    maturityDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    paymentDayOfMonth: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    currency: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    LoanType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    RateType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    Compounding: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
}

export interface RepaymentSchedule {
    id: string;
    installmentNumber: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    dueDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    principalDue: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    interestDue: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    totalDue: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
}

export interface LoanPayment {
    id: string;
    paymentReference: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    amount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    paymentDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    Method: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
}

export interface Collateral {
    id: string;
    appraisedValue: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    description: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    location: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    CollateralType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
}

export interface FeeCharge {
    id: string;
    feeCode: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    amount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    appliedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    FeeType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
}

export interface ExchangeRate {
    id: string;
    baseCurrency: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    counterCurrency: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    rate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    asOf: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    source: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
}

export interface FXTrade {
    id: string;
    tradeReference: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    tradeDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    settlementDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    amountSold: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    amountBought: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    rate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
}

export interface Dispute {
    id: string;
    disputeReference: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    raisedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    reason: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
}

export interface Consent {
    id: string;
    grantedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    expiresOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    ConsentType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
}

export interface ThirdPartyProvider {
    id: string;
    name: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    registrationId: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    website: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
}

