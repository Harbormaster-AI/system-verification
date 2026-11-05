import {
    Bank,
    Branch,
    ATM,
    Customer,
    KycProfile,
    IdentityDocument,
    RiskAssessment,
    ScreeningResult,
    BankingProduct,
    Account,
    AccountStatement,
    Transaction,
    ExternalAccount,
    FundsTransfer,
    StandingInstruction,
    PaymentCard,
    LoanAccount,
    RepaymentSchedule,
    LoanPayment,
    Collateral,
    FeeCharge,
    ExchangeRate,
    FXTrade,
    Dispute,
    Consent,
    ThirdPartyProvider,
} from "../backend/types.js";


export const typeDefs = `
type Query {

    health: String!


# -----------------------------------------
# Bank
# -----------------------------------------
    bank(id: ID!): Bank
    banks: BankQueryResult


# -----------------------------------------
# Branch
# -----------------------------------------
    branch(id: ID!): Branch
    branchs: BranchQueryResult


# -----------------------------------------
# ATM
# -----------------------------------------
    aTM(id: ID!): ATM
    aTMs: ATMQueryResult


# -----------------------------------------
# Customer
# -----------------------------------------
    customer(id: ID!): Customer
    customers: CustomerQueryResult


# -----------------------------------------
# KycProfile
# -----------------------------------------
    kycProfile(id: ID!): KycProfile
    kycProfiles: KycProfileQueryResult


# -----------------------------------------
# IdentityDocument
# -----------------------------------------
    identityDocument(id: ID!): IdentityDocument
    identityDocuments: IdentityDocumentQueryResult


# -----------------------------------------
# RiskAssessment
# -----------------------------------------
    riskAssessment(id: ID!): RiskAssessment
    riskAssessments: RiskAssessmentQueryResult


# -----------------------------------------
# ScreeningResult
# -----------------------------------------
    screeningResult(id: ID!): ScreeningResult
    screeningResults: ScreeningResultQueryResult


# -----------------------------------------
# BankingProduct
# -----------------------------------------
    bankingProduct(id: ID!): BankingProduct
    bankingProducts: BankingProductQueryResult


# -----------------------------------------
# Account
# -----------------------------------------
    account(id: ID!): Account
    accounts: AccountQueryResult


# -----------------------------------------
# AccountStatement
# -----------------------------------------
    accountStatement(id: ID!): AccountStatement
    accountStatements: AccountStatementQueryResult


# -----------------------------------------
# Transaction
# -----------------------------------------
    transaction(id: ID!): Transaction
    transactions: TransactionQueryResult


# -----------------------------------------
# ExternalAccount
# -----------------------------------------
    externalAccount(id: ID!): ExternalAccount
    externalAccounts: ExternalAccountQueryResult


# -----------------------------------------
# FundsTransfer
# -----------------------------------------
    fundsTransfer(id: ID!): FundsTransfer
    fundsTransfers: FundsTransferQueryResult


# -----------------------------------------
# StandingInstruction
# -----------------------------------------
    standingInstruction(id: ID!): StandingInstruction
    standingInstructions: StandingInstructionQueryResult


# -----------------------------------------
# PaymentCard
# -----------------------------------------
    paymentCard(id: ID!): PaymentCard
    paymentCards: PaymentCardQueryResult


# -----------------------------------------
# LoanAccount
# -----------------------------------------
    loanAccount(id: ID!): LoanAccount
    loanAccounts: LoanAccountQueryResult


# -----------------------------------------
# RepaymentSchedule
# -----------------------------------------
    repaymentSchedule(id: ID!): RepaymentSchedule
    repaymentSchedules: RepaymentScheduleQueryResult


# -----------------------------------------
# LoanPayment
# -----------------------------------------
    loanPayment(id: ID!): LoanPayment
    loanPayments: LoanPaymentQueryResult


# -----------------------------------------
# Collateral
# -----------------------------------------
    collateral(id: ID!): Collateral
    collaterals: CollateralQueryResult


# -----------------------------------------
# FeeCharge
# -----------------------------------------
    feeCharge(id: ID!): FeeCharge
    feeCharges: FeeChargeQueryResult


# -----------------------------------------
# ExchangeRate
# -----------------------------------------
    exchangeRate(id: ID!): ExchangeRate
    exchangeRates: ExchangeRateQueryResult


# -----------------------------------------
# FXTrade
# -----------------------------------------
    fXTrade(id: ID!): FXTrade
    fXTrades: FXTradeQueryResult


# -----------------------------------------
# Dispute
# -----------------------------------------
    dispute(id: ID!): Dispute
    disputes: DisputeQueryResult


# -----------------------------------------
# Consent
# -----------------------------------------
    consent(id: ID!): Consent
    consents: ConsentQueryResult


# -----------------------------------------
# ThirdPartyProvider
# -----------------------------------------
    thirdPartyProvider(id: ID!): ThirdPartyProvider
    thirdPartyProviders: ThirdPartyProviderQueryResult

}

# -----------------------------------------
# Write Related Functions
# -----------------------------------------
type Mutation {

addBank(
        name: String
        legalName: String
        swiftBic: String
        headquartersCountry: String
        website: String
): Bank

updateBank(
id: ID!
        name: String
        legalName: String
        swiftBic: String
        headquartersCountry: String
        website: String
): Bank

removeBank(id: ID!): Boolean

addBranch(
        name: String
        branchCode: String
        address: String
        phone: String
        openingHours: String
): Branch

updateBranch(
id: ID!
        name: String
        branchCode: String
        address: String
        phone: String
        openingHours: String
): Branch

removeBranch(id: ID!): Boolean

addATM(
        terminalId: String
        location: String
        Status:  ATMStatus
): ATM

updateATM(
id: ID!
        terminalId: String
        location: String
        Status:  ATMStatus
): ATM

removeATM(id: ID!): Boolean

addCustomer(
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
): Customer

updateCustomer(
id: ID!
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
): Customer

removeCustomer(id: ID!): Boolean

addKycProfile(
        profileId: String
        lastReviewedOn: String
        Status:  KycStatus
): KycProfile

updateKycProfile(
id: ID!
        profileId: String
        lastReviewedOn: String
        Status:  KycStatus
): KycProfile

removeKycProfile(id: ID!): Boolean

addIdentityDocument(
        documentNumber: String
        issuingCountry: String
        expirationDate: String
        DocumentType:  IdentityDocumentType
): IdentityDocument

updateIdentityDocument(
id: ID!
        documentNumber: String
        issuingCountry: String
        expirationDate: String
        DocumentType:  IdentityDocumentType
): IdentityDocument

removeIdentityDocument(id: ID!): Boolean

addRiskAssessment(
        score: Int
        assessedOn: String
        Rating:  RiskRating
): RiskAssessment

updateRiskAssessment(
id: ID!
        score: Int
        assessedOn: String
        Rating:  RiskRating
): RiskAssessment

removeRiskAssessment(id: ID!): Boolean

addScreeningResult(
        screeningDate: String
        provider: String
        Outcome:  ScreeningOutcome
): ScreeningResult

updateScreeningResult(
id: ID!
        screeningDate: String
        provider: String
        Outcome:  ScreeningOutcome
): ScreeningResult

removeScreeningResult(id: ID!): Boolean

addBankingProduct(
        productCode: String
        name: String
        description: String
        ProductCategory:  ProductCategory
): BankingProduct

updateBankingProduct(
id: ID!
        productCode: String
        name: String
        description: String
        ProductCategory:  ProductCategory
): BankingProduct

removeBankingProduct(id: ID!): Boolean

addAccount(
        accountNumber: String
        iban: String
        accountName: String
        currency: String
        openedOn: String
        closedOn: String
        AccountType:  AccountType
        OwnershipType:  AccountOwnershipType
        Status:  AccountStatus
): Account

updateAccount(
id: ID!
        accountNumber: String
        iban: String
        accountName: String
        currency: String
        openedOn: String
        closedOn: String
        AccountType:  AccountType
        OwnershipType:  AccountOwnershipType
        Status:  AccountStatus
): Account

removeAccount(id: ID!): Boolean

addAccountStatement(
        statementNumber: String
        periodStart: String
        periodEnd: String
        openingBalance: String
        closingBalance: String
        DeliveryMethod:  StatementDeliveryMethod
): AccountStatement

updateAccountStatement(
id: ID!
        statementNumber: String
        periodStart: String
        periodEnd: String
        openingBalance: String
        closingBalance: String
        DeliveryMethod:  StatementDeliveryMethod
): AccountStatement

removeAccountStatement(id: ID!): Boolean

addTransaction(
        bookingDate: String
        valueDate: String
        amount: String
        description: String
        Direction:  TransactionDirection
        TransactionType:  TransactionType
        Status:  TransactionStatus
        Channel:  ChannelType
): Transaction

updateTransaction(
id: ID!
        bookingDate: String
        valueDate: String
        amount: String
        description: String
        Direction:  TransactionDirection
        TransactionType:  TransactionType
        Status:  TransactionStatus
        Channel:  ChannelType
): Transaction

removeTransaction(id: ID!): Boolean

addExternalAccount(
        name: String
        iban: String
        accountNumber: String
        bic: String
        bankName: String
        country: String
): ExternalAccount

updateExternalAccount(
id: ID!
        name: String
        iban: String
        accountNumber: String
        bic: String
        bankName: String
        country: String
): ExternalAccount

removeExternalAccount(id: ID!): Boolean

addFundsTransfer(
        transferReference: String
        amount: String
        requestedDate: String
        executionDate: String
        purpose: String
        feeAmount: String
        Method:  PaymentMethod
        Status:  PaymentStatus
): FundsTransfer

updateFundsTransfer(
id: ID!
        transferReference: String
        amount: String
        requestedDate: String
        executionDate: String
        purpose: String
        feeAmount: String
        Method:  PaymentMethod
        Status:  PaymentStatus
): FundsTransfer

removeFundsTransfer(id: ID!): Boolean

addStandingInstruction(
        instructionId: String
        amount: String
        nextExecutionDate: String
        Frequency:  StandingInstructionFrequency
        Status:  StandingInstructionStatus
): StandingInstruction

updateStandingInstruction(
id: ID!
        instructionId: String
        amount: String
        nextExecutionDate: String
        Frequency:  StandingInstructionFrequency
        Status:  StandingInstructionStatus
): StandingInstruction

removeStandingInstruction(id: ID!): Boolean

addPaymentCard(
        cardNumber: String
        embossedName: String
        expiryMonth: Int
        expiryYear: Int
        CardType:  CardType
        CardStatus:  CardStatus
        Network:  CardNetwork
): PaymentCard

updatePaymentCard(
id: ID!
        cardNumber: String
        embossedName: String
        expiryMonth: Int
        expiryYear: Int
        CardType:  CardType
        CardStatus:  CardStatus
        Network:  CardNetwork
): PaymentCard

removePaymentCard(id: ID!): Boolean

addLoanAccount(
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
): LoanAccount

updateLoanAccount(
id: ID!
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
): LoanAccount

removeLoanAccount(id: ID!): Boolean

addRepaymentSchedule(
        installmentNumber: Int
        dueDate: String
        principalDue: String
        interestDue: String
        totalDue: String
        Status:  InstallmentStatus
): RepaymentSchedule

updateRepaymentSchedule(
id: ID!
        installmentNumber: Int
        dueDate: String
        principalDue: String
        interestDue: String
        totalDue: String
        Status:  InstallmentStatus
): RepaymentSchedule

removeRepaymentSchedule(id: ID!): Boolean

addLoanPayment(
        paymentReference: String
        amount: String
        paymentDate: String
        Method:  PaymentMethod
        Status:  PaymentStatus
): LoanPayment

updateLoanPayment(
id: ID!
        paymentReference: String
        amount: String
        paymentDate: String
        Method:  PaymentMethod
        Status:  PaymentStatus
): LoanPayment

removeLoanPayment(id: ID!): Boolean

addCollateral(
        collateralIdentifier: String
        appraisedValue: String
        description: String
        location: String
        CollateralType:  CollateralType
): Collateral

updateCollateral(
id: ID!
        collateralIdentifier: String
        appraisedValue: String
        description: String
        location: String
        CollateralType:  CollateralType
): Collateral

removeCollateral(id: ID!): Boolean

addFeeCharge(
        feeCode: String
        amount: String
        appliedOn: String
        FeeType:  FeeType
): FeeCharge

updateFeeCharge(
id: ID!
        feeCode: String
        amount: String
        appliedOn: String
        FeeType:  FeeType
): FeeCharge

removeFeeCharge(id: ID!): Boolean

addExchangeRate(
        baseCurrency: String
        counterCurrency: String
        rate: Float
        asOf: String
        source: String
): ExchangeRate

updateExchangeRate(
id: ID!
        baseCurrency: String
        counterCurrency: String
        rate: Float
        asOf: String
        source: String
): ExchangeRate

removeExchangeRate(id: ID!): Boolean

addFXTrade(
        tradeReference: String
        tradeDate: String
        settlementDate: String
        amountSold: String
        amountBought: String
        rate: Float
        Status:  TradeStatus
): FXTrade

updateFXTrade(
id: ID!
        tradeReference: String
        tradeDate: String
        settlementDate: String
        amountSold: String
        amountBought: String
        rate: Float
        Status:  TradeStatus
): FXTrade

removeFXTrade(id: ID!): Boolean

addDispute(
        disputeReference: String
        raisedOn: String
        reason: String
        Status:  DisputeStatus
): Dispute

updateDispute(
id: ID!
        disputeReference: String
        raisedOn: String
        reason: String
        Status:  DisputeStatus
): Dispute

removeDispute(id: ID!): Boolean

addConsent(
        grantedOn: String
        expiresOn: String
        ConsentType:  ConsentType
        Status:  ConsentStatus
): Consent

updateConsent(
id: ID!
        grantedOn: String
        expiresOn: String
        ConsentType:  ConsentType
        Status:  ConsentStatus
): Consent

removeConsent(id: ID!): Boolean

addThirdPartyProvider(
        name: String
        registrationId: String
        website: String
): ThirdPartyProvider

updateThirdPartyProvider(
id: ID!
        name: String
        registrationId: String
        website: String
): ThirdPartyProvider

removeThirdPartyProvider(id: ID!): Boolean
}

# -----------------------------------------
# Bank
# -----------------------------------------
type Bank {
id: ID!
        name: String
        legalName: String
        swiftBic: String
        headquartersCountry: String
        website: String
        branches:  [Branch]
        products:  [BankingProduct]
        customers:  [Customer]
        accounts:  [Account]
        paymentCards:  [PaymentCard]
        loanAccounts:  [LoanAccount]
        exchangeRates:  [ExchangeRate]
        consents:  [Consent]
        thirdPartyProviders:  [ThirdPartyProvider]

    getBranches( parentId: ID! ): [Branch]!
    addToBranches( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromBranches( parentId: ID!, childIds: [ID]! ): Boolean!

    getProducts( parentId: ID! ): [BankingProduct]!
    addToProducts( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromProducts( parentId: ID!, childIds: [ID]! ): Boolean!

    getCustomers( parentId: ID! ): [Customer]!
    addToCustomers( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromCustomers( parentId: ID!, childIds: [ID]! ): Boolean!

    getAccounts( parentId: ID! ): [Account]!
    addToAccounts( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromAccounts( parentId: ID!, childIds: [ID]! ): Boolean!

    getPaymentCards( parentId: ID! ): [PaymentCard]!
    addToPaymentCards( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromPaymentCards( parentId: ID!, childIds: [ID]! ): Boolean!

    getLoanAccounts( parentId: ID! ): [LoanAccount]!
    addToLoanAccounts( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromLoanAccounts( parentId: ID!, childIds: [ID]! ): Boolean!

    getExchangeRates( parentId: ID! ): [ExchangeRate]!
    addToExchangeRates( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromExchangeRates( parentId: ID!, childIds: [ID]! ): Boolean!

    getConsents( parentId: ID! ): [Consent]!
    addToConsents( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromConsents( parentId: ID!, childIds: [ID]! ): Boolean!

    getThirdPartyProviders( parentId: ID! ): [ThirdPartyProvider]!
    addToThirdPartyProviders( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromThirdPartyProviders( parentId: ID!, childIds: [ID]! ): Boolean!

}

type BankQueryResult {
cursor: String
hasMore: Boolean!
    bankPage: [Bank]
}

# -----------------------------------------
# Branch
# -----------------------------------------
type Branch {
id: ID!
        name: String
        branchCode: String
        address: String
        phone: String
        openingHours: String
        bank: Bank
        accounts:  [Account]
        loanAccounts:  [LoanAccount]
        atms:  [ATM]

    getBank( parentId: ID! ): Branch
    assignBank( parentId: ID!, childId: ID! ): Boolean!
    unassignBank( parentId: ID!, childId: ID! ): Boolean!
    getAccounts( parentId: ID! ): [Account]!
    addToAccounts( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromAccounts( parentId: ID!, childIds: [ID]! ): Boolean!

    getLoanAccounts( parentId: ID! ): [LoanAccount]!
    addToLoanAccounts( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromLoanAccounts( parentId: ID!, childIds: [ID]! ): Boolean!

    getAtms( parentId: ID! ): [ATM]!
    addToAtms( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromAtms( parentId: ID!, childIds: [ID]! ): Boolean!

}

type BranchQueryResult {
cursor: String
hasMore: Boolean!
    branchPage: [Branch]
}

# -----------------------------------------
# ATM
# -----------------------------------------
type ATM {
id: ID!
        terminalId: String
        location: String
        branch: Branch
        status:  ATMStatus

    getBranch( parentId: ID! ): ATM
    assignBranch( parentId: ID!, childId: ID! ): Boolean!
    unassignBranch( parentId: ID!, childId: ID! ): Boolean!
}

type ATMQueryResult {
cursor: String
hasMore: Boolean!
    aTMPage: [ATM]
}

# -----------------------------------------
# Customer
# -----------------------------------------
type Customer {
id: ID!
        firstName: String
        lastName: String
        legalName: String
        dateOfBirth: String
        taxId: String
        email: String
        phone: String
        address: String
        bank: Bank
        accounts:  [Account]
        loanAccounts:  [LoanAccount]
        paymentCards:  [PaymentCard]
        externalAccounts:  [ExternalAccount]
        fundsTransfers:  [FundsTransfer]
        disputes:  [Dispute]
        kycProfiles:  [KycProfile]
        consents:  [Consent]
        customerType:  CustomerType
        riskRating:  RiskRating
        kycStatus:  KycStatus

    getBank( parentId: ID! ): Customer
    assignBank( parentId: ID!, childId: ID! ): Boolean!
    unassignBank( parentId: ID!, childId: ID! ): Boolean!
    getAccounts( parentId: ID! ): [Account]!
    addToAccounts( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromAccounts( parentId: ID!, childIds: [ID]! ): Boolean!

    getLoanAccounts( parentId: ID! ): [LoanAccount]!
    addToLoanAccounts( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromLoanAccounts( parentId: ID!, childIds: [ID]! ): Boolean!

    getPaymentCards( parentId: ID! ): [PaymentCard]!
    addToPaymentCards( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromPaymentCards( parentId: ID!, childIds: [ID]! ): Boolean!

    getExternalAccounts( parentId: ID! ): [ExternalAccount]!
    addToExternalAccounts( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromExternalAccounts( parentId: ID!, childIds: [ID]! ): Boolean!

    getFundsTransfers( parentId: ID! ): [FundsTransfer]!
    addToFundsTransfers( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromFundsTransfers( parentId: ID!, childIds: [ID]! ): Boolean!

    getDisputes( parentId: ID! ): [Dispute]!
    addToDisputes( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromDisputes( parentId: ID!, childIds: [ID]! ): Boolean!

    getKycProfiles( parentId: ID! ): [KycProfile]!
    addToKycProfiles( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromKycProfiles( parentId: ID!, childIds: [ID]! ): Boolean!

    getConsents( parentId: ID! ): [Consent]!
    addToConsents( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromConsents( parentId: ID!, childIds: [ID]! ): Boolean!

}

type CustomerQueryResult {
cursor: String
hasMore: Boolean!
    customerPage: [Customer]
}

# -----------------------------------------
# KycProfile
# -----------------------------------------
type KycProfile {
id: ID!
        profileId: String
        lastReviewedOn: String
        customer: Customer
        identityDocuments:  [IdentityDocument]
        riskAssessments:  [RiskAssessment]
        screenings:  [ScreeningResult]
        status:  KycStatus

    getCustomer( parentId: ID! ): KycProfile
    assignCustomer( parentId: ID!, childId: ID! ): Boolean!
    unassignCustomer( parentId: ID!, childId: ID! ): Boolean!
    getIdentityDocuments( parentId: ID! ): [IdentityDocument]!
    addToIdentityDocuments( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromIdentityDocuments( parentId: ID!, childIds: [ID]! ): Boolean!

    getRiskAssessments( parentId: ID! ): [RiskAssessment]!
    addToRiskAssessments( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromRiskAssessments( parentId: ID!, childIds: [ID]! ): Boolean!

    getScreenings( parentId: ID! ): [ScreeningResult]!
    addToScreenings( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromScreenings( parentId: ID!, childIds: [ID]! ): Boolean!

}

type KycProfileQueryResult {
cursor: String
hasMore: Boolean!
    kycProfilePage: [KycProfile]
}

# -----------------------------------------
# IdentityDocument
# -----------------------------------------
type IdentityDocument {
id: ID!
        documentNumber: String
        issuingCountry: String
        expirationDate: String
        kycProfile: KycProfile
        documentType:  IdentityDocumentType

    getKycProfile( parentId: ID! ): IdentityDocument
    assignKycProfile( parentId: ID!, childId: ID! ): Boolean!
    unassignKycProfile( parentId: ID!, childId: ID! ): Boolean!
}

type IdentityDocumentQueryResult {
cursor: String
hasMore: Boolean!
    identityDocumentPage: [IdentityDocument]
}

# -----------------------------------------
# RiskAssessment
# -----------------------------------------
type RiskAssessment {
id: ID!
        score: Int
        assessedOn: String
        kycProfile: KycProfile
        rating:  RiskRating

    getKycProfile( parentId: ID! ): RiskAssessment
    assignKycProfile( parentId: ID!, childId: ID! ): Boolean!
    unassignKycProfile( parentId: ID!, childId: ID! ): Boolean!
}

type RiskAssessmentQueryResult {
cursor: String
hasMore: Boolean!
    riskAssessmentPage: [RiskAssessment]
}

# -----------------------------------------
# ScreeningResult
# -----------------------------------------
type ScreeningResult {
id: ID!
        screeningDate: String
        provider: String
        kycProfile: KycProfile
        outcome:  ScreeningOutcome

    getKycProfile( parentId: ID! ): ScreeningResult
    assignKycProfile( parentId: ID!, childId: ID! ): Boolean!
    unassignKycProfile( parentId: ID!, childId: ID! ): Boolean!
}

type ScreeningResultQueryResult {
cursor: String
hasMore: Boolean!
    screeningResultPage: [ScreeningResult]
}

# -----------------------------------------
# BankingProduct
# -----------------------------------------
type BankingProduct {
id: ID!
        productCode: String
        name: String
        description: String
        bank: Bank
        accounts:  [Account]
        loanAccounts:  [LoanAccount]
        paymentCards:  [PaymentCard]
        productCategory:  ProductCategory

    getBank( parentId: ID! ): BankingProduct
    assignBank( parentId: ID!, childId: ID! ): Boolean!
    unassignBank( parentId: ID!, childId: ID! ): Boolean!
    getAccounts( parentId: ID! ): [Account]!
    addToAccounts( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromAccounts( parentId: ID!, childIds: [ID]! ): Boolean!

    getLoanAccounts( parentId: ID! ): [LoanAccount]!
    addToLoanAccounts( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromLoanAccounts( parentId: ID!, childIds: [ID]! ): Boolean!

    getPaymentCards( parentId: ID! ): [PaymentCard]!
    addToPaymentCards( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromPaymentCards( parentId: ID!, childIds: [ID]! ): Boolean!

}

type BankingProductQueryResult {
cursor: String
hasMore: Boolean!
    bankingProductPage: [BankingProduct]
}

# -----------------------------------------
# Account
# -----------------------------------------
type Account {
id: ID!
        accountNumber: String
        iban: String
        accountName: String
        currency: String
        openedOn: String
        closedOn: String
        bank: Bank
        branch: Branch
        product: BankingProduct
        owners:  [Customer]
        transactions:  [Transaction]
        statements:  [AccountStatement]
        standingInstructions:  [StandingInstruction]
        feeCharges:  [FeeCharge]
        accountType:  AccountType
        ownershipType:  AccountOwnershipType
        status:  AccountStatus

    getBank( parentId: ID! ): Account
    assignBank( parentId: ID!, childId: ID! ): Boolean!
    unassignBank( parentId: ID!, childId: ID! ): Boolean!
    getBranch( parentId: ID! ): Account
    assignBranch( parentId: ID!, childId: ID! ): Boolean!
    unassignBranch( parentId: ID!, childId: ID! ): Boolean!
    getProduct( parentId: ID! ): Account
    assignProduct( parentId: ID!, childId: ID! ): Boolean!
    unassignProduct( parentId: ID!, childId: ID! ): Boolean!
    getOwners( parentId: ID! ): [Customer]!
    addToOwners( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromOwners( parentId: ID!, childIds: [ID]! ): Boolean!

    getTransactions( parentId: ID! ): [Transaction]!
    addToTransactions( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromTransactions( parentId: ID!, childIds: [ID]! ): Boolean!

    getStatements( parentId: ID! ): [AccountStatement]!
    addToStatements( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromStatements( parentId: ID!, childIds: [ID]! ): Boolean!

    getStandingInstructions( parentId: ID! ): [StandingInstruction]!
    addToStandingInstructions( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromStandingInstructions( parentId: ID!, childIds: [ID]! ): Boolean!

    getFeeCharges( parentId: ID! ): [FeeCharge]!
    addToFeeCharges( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromFeeCharges( parentId: ID!, childIds: [ID]! ): Boolean!

}

type AccountQueryResult {
cursor: String
hasMore: Boolean!
    accountPage: [Account]
}

# -----------------------------------------
# AccountStatement
# -----------------------------------------
type AccountStatement {
id: ID!
        statementNumber: String
        periodStart: String
        periodEnd: String
        openingBalance: String
        closingBalance: String
        account: Account
        deliveryMethod:  StatementDeliveryMethod

    getAccount( parentId: ID! ): AccountStatement
    assignAccount( parentId: ID!, childId: ID! ): Boolean!
    unassignAccount( parentId: ID!, childId: ID! ): Boolean!
}

type AccountStatementQueryResult {
cursor: String
hasMore: Boolean!
    accountStatementPage: [AccountStatement]
}

# -----------------------------------------
# Transaction
# -----------------------------------------
type Transaction {
id: ID!
        bookingDate: String
        valueDate: String
        amount: String
        description: String
        account: Account
        externalCounterparty: ExternalAccount
        paymentCard: PaymentCard
        fundsTransfer: FundsTransfer
        fxTrade: FXTrade
        dispute: Dispute
        direction:  TransactionDirection
        transactionType:  TransactionType
        status:  TransactionStatus
        channel:  ChannelType

    getAccount( parentId: ID! ): Transaction
    assignAccount( parentId: ID!, childId: ID! ): Boolean!
    unassignAccount( parentId: ID!, childId: ID! ): Boolean!
    getExternalCounterparty( parentId: ID! ): Transaction
    assignExternalCounterparty( parentId: ID!, childId: ID! ): Boolean!
    unassignExternalCounterparty( parentId: ID!, childId: ID! ): Boolean!
    getPaymentCard( parentId: ID! ): Transaction
    assignPaymentCard( parentId: ID!, childId: ID! ): Boolean!
    unassignPaymentCard( parentId: ID!, childId: ID! ): Boolean!
    getFundsTransfer( parentId: ID! ): Transaction
    assignFundsTransfer( parentId: ID!, childId: ID! ): Boolean!
    unassignFundsTransfer( parentId: ID!, childId: ID! ): Boolean!
    getFxTrade( parentId: ID! ): Transaction
    assignFxTrade( parentId: ID!, childId: ID! ): Boolean!
    unassignFxTrade( parentId: ID!, childId: ID! ): Boolean!
    getDispute( parentId: ID! ): Transaction
    assignDispute( parentId: ID!, childId: ID! ): Boolean!
    unassignDispute( parentId: ID!, childId: ID! ): Boolean!
}

type TransactionQueryResult {
cursor: String
hasMore: Boolean!
    transactionPage: [Transaction]
}

# -----------------------------------------
# ExternalAccount
# -----------------------------------------
type ExternalAccount {
id: ID!
        name: String
        iban: String
        accountNumber: String
        bic: String
        bankName: String
        country: String
        customer: Customer
        transactions:  [Transaction]

    getCustomer( parentId: ID! ): ExternalAccount
    assignCustomer( parentId: ID!, childId: ID! ): Boolean!
    unassignCustomer( parentId: ID!, childId: ID! ): Boolean!
    getTransactions( parentId: ID! ): [Transaction]!
    addToTransactions( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromTransactions( parentId: ID!, childIds: [ID]! ): Boolean!

}

type ExternalAccountQueryResult {
cursor: String
hasMore: Boolean!
    externalAccountPage: [ExternalAccount]
}

# -----------------------------------------
# FundsTransfer
# -----------------------------------------
type FundsTransfer {
id: ID!
        transferReference: String
        amount: String
        requestedDate: String
        executionDate: String
        purpose: String
        feeAmount: String
        sourceAccount: Account
        destinationAccount: Account
        externalBeneficiary: ExternalAccount
        initiatedBy: Customer
        transactions:  [Transaction]
        method:  PaymentMethod
        status:  PaymentStatus

    getSourceAccount( parentId: ID! ): FundsTransfer
    assignSourceAccount( parentId: ID!, childId: ID! ): Boolean!
    unassignSourceAccount( parentId: ID!, childId: ID! ): Boolean!
    getDestinationAccount( parentId: ID! ): FundsTransfer
    assignDestinationAccount( parentId: ID!, childId: ID! ): Boolean!
    unassignDestinationAccount( parentId: ID!, childId: ID! ): Boolean!
    getExternalBeneficiary( parentId: ID! ): FundsTransfer
    assignExternalBeneficiary( parentId: ID!, childId: ID! ): Boolean!
    unassignExternalBeneficiary( parentId: ID!, childId: ID! ): Boolean!
    getInitiatedBy( parentId: ID! ): FundsTransfer
    assignInitiatedBy( parentId: ID!, childId: ID! ): Boolean!
    unassignInitiatedBy( parentId: ID!, childId: ID! ): Boolean!
    getTransactions( parentId: ID! ): [Transaction]!
    addToTransactions( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromTransactions( parentId: ID!, childIds: [ID]! ): Boolean!

}

type FundsTransferQueryResult {
cursor: String
hasMore: Boolean!
    fundsTransferPage: [FundsTransfer]
}

# -----------------------------------------
# StandingInstruction
# -----------------------------------------
type StandingInstruction {
id: ID!
        instructionId: String
        amount: String
        nextExecutionDate: String
        account: Account
        beneficiary: ExternalAccount
        frequency:  StandingInstructionFrequency
        status:  StandingInstructionStatus

    getAccount( parentId: ID! ): StandingInstruction
    assignAccount( parentId: ID!, childId: ID! ): Boolean!
    unassignAccount( parentId: ID!, childId: ID! ): Boolean!
    getBeneficiary( parentId: ID! ): StandingInstruction
    assignBeneficiary( parentId: ID!, childId: ID! ): Boolean!
    unassignBeneficiary( parentId: ID!, childId: ID! ): Boolean!
}

type StandingInstructionQueryResult {
cursor: String
hasMore: Boolean!
    standingInstructionPage: [StandingInstruction]
}

# -----------------------------------------
# PaymentCard
# -----------------------------------------
type PaymentCard {
id: ID!
        cardNumber: String
        embossedName: String
        expiryMonth: Int
        expiryYear: Int
        bank: Bank
        account: Account
        customer: Customer
        transactions:  [Transaction]
        cardType:  CardType
        cardStatus:  CardStatus
        network:  CardNetwork

    getBank( parentId: ID! ): PaymentCard
    assignBank( parentId: ID!, childId: ID! ): Boolean!
    unassignBank( parentId: ID!, childId: ID! ): Boolean!
    getAccount( parentId: ID! ): PaymentCard
    assignAccount( parentId: ID!, childId: ID! ): Boolean!
    unassignAccount( parentId: ID!, childId: ID! ): Boolean!
    getCustomer( parentId: ID! ): PaymentCard
    assignCustomer( parentId: ID!, childId: ID! ): Boolean!
    unassignCustomer( parentId: ID!, childId: ID! ): Boolean!
    getTransactions( parentId: ID! ): [Transaction]!
    addToTransactions( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromTransactions( parentId: ID!, childIds: [ID]! ): Boolean!

}

type PaymentCardQueryResult {
cursor: String
hasMore: Boolean!
    paymentCardPage: [PaymentCard]
}

# -----------------------------------------
# LoanAccount
# -----------------------------------------
type LoanAccount {
id: ID!
        loanNumber: String
        principalAmount: String
        outstandingPrincipal: String
        interestRate: String
        originationDate: String
        maturityDate: String
        paymentDayOfMonth: Int
        currency: String
        bank: Bank
        branch: Branch
        product: BankingProduct
        borrowers:  [Customer]
        repaymentSchedule:  [RepaymentSchedule]
        payments:  [LoanPayment]
        collateral:  [Collateral]
        feeCharges:  [FeeCharge]
        loanType:  LoanType
        rateType:  RateType
        compounding:  InterestCompounding
        status:  LoanStatus

    getBank( parentId: ID! ): LoanAccount
    assignBank( parentId: ID!, childId: ID! ): Boolean!
    unassignBank( parentId: ID!, childId: ID! ): Boolean!
    getBranch( parentId: ID! ): LoanAccount
    assignBranch( parentId: ID!, childId: ID! ): Boolean!
    unassignBranch( parentId: ID!, childId: ID! ): Boolean!
    getProduct( parentId: ID! ): LoanAccount
    assignProduct( parentId: ID!, childId: ID! ): Boolean!
    unassignProduct( parentId: ID!, childId: ID! ): Boolean!
    getBorrowers( parentId: ID! ): [Customer]!
    addToBorrowers( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromBorrowers( parentId: ID!, childIds: [ID]! ): Boolean!

    getRepaymentSchedule( parentId: ID! ): [RepaymentSchedule]!
    addToRepaymentSchedule( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromRepaymentSchedule( parentId: ID!, childIds: [ID]! ): Boolean!

    getPayments( parentId: ID! ): [LoanPayment]!
    addToPayments( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromPayments( parentId: ID!, childIds: [ID]! ): Boolean!

    getCollateral( parentId: ID! ): [Collateral]!
    addToCollateral( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromCollateral( parentId: ID!, childIds: [ID]! ): Boolean!

    getFeeCharges( parentId: ID! ): [FeeCharge]!
    addToFeeCharges( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromFeeCharges( parentId: ID!, childIds: [ID]! ): Boolean!

}

type LoanAccountQueryResult {
cursor: String
hasMore: Boolean!
    loanAccountPage: [LoanAccount]
}

# -----------------------------------------
# RepaymentSchedule
# -----------------------------------------
type RepaymentSchedule {
id: ID!
        installmentNumber: Int
        dueDate: String
        principalDue: String
        interestDue: String
        totalDue: String
        loanAccount: LoanAccount
        payment: LoanPayment
        status:  InstallmentStatus

    getLoanAccount( parentId: ID! ): RepaymentSchedule
    assignLoanAccount( parentId: ID!, childId: ID! ): Boolean!
    unassignLoanAccount( parentId: ID!, childId: ID! ): Boolean!
    getPayment( parentId: ID! ): RepaymentSchedule
    assignPayment( parentId: ID!, childId: ID! ): Boolean!
    unassignPayment( parentId: ID!, childId: ID! ): Boolean!
}

type RepaymentScheduleQueryResult {
cursor: String
hasMore: Boolean!
    repaymentSchedulePage: [RepaymentSchedule]
}

# -----------------------------------------
# LoanPayment
# -----------------------------------------
type LoanPayment {
id: ID!
        paymentReference: String
        amount: String
        paymentDate: String
        loanAccount: LoanAccount
        transaction: Transaction
        method:  PaymentMethod
        status:  PaymentStatus

    getLoanAccount( parentId: ID! ): LoanPayment
    assignLoanAccount( parentId: ID!, childId: ID! ): Boolean!
    unassignLoanAccount( parentId: ID!, childId: ID! ): Boolean!
    getTransaction( parentId: ID! ): LoanPayment
    assignTransaction( parentId: ID!, childId: ID! ): Boolean!
    unassignTransaction( parentId: ID!, childId: ID! ): Boolean!
}

type LoanPaymentQueryResult {
cursor: String
hasMore: Boolean!
    loanPaymentPage: [LoanPayment]
}

# -----------------------------------------
# Collateral
# -----------------------------------------
type Collateral {
id: ID!
        collateralIdentifier: String
        appraisedValue: String
        description: String
        location: String
        loanAccount: LoanAccount
        collateralType:  CollateralType

    getLoanAccount( parentId: ID! ): Collateral
    assignLoanAccount( parentId: ID!, childId: ID! ): Boolean!
    unassignLoanAccount( parentId: ID!, childId: ID! ): Boolean!
}

type CollateralQueryResult {
cursor: String
hasMore: Boolean!
    collateralPage: [Collateral]
}

# -----------------------------------------
# FeeCharge
# -----------------------------------------
type FeeCharge {
id: ID!
        feeCode: String
        amount: String
        appliedOn: String
        account: Account
        loanAccount: LoanAccount
        feeType:  FeeType

    getAccount( parentId: ID! ): FeeCharge
    assignAccount( parentId: ID!, childId: ID! ): Boolean!
    unassignAccount( parentId: ID!, childId: ID! ): Boolean!
    getLoanAccount( parentId: ID! ): FeeCharge
    assignLoanAccount( parentId: ID!, childId: ID! ): Boolean!
    unassignLoanAccount( parentId: ID!, childId: ID! ): Boolean!
}

type FeeChargeQueryResult {
cursor: String
hasMore: Boolean!
    feeChargePage: [FeeCharge]
}

# -----------------------------------------
# ExchangeRate
# -----------------------------------------
type ExchangeRate {
id: ID!
        baseCurrency: String
        counterCurrency: String
        rate: Float
        asOf: String
        source: String
        bank: Bank
        fxTrades:  [FXTrade]

    getBank( parentId: ID! ): ExchangeRate
    assignBank( parentId: ID!, childId: ID! ): Boolean!
    unassignBank( parentId: ID!, childId: ID! ): Boolean!
    getFxTrades( parentId: ID! ): [FXTrade]!
    addToFxTrades( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromFxTrades( parentId: ID!, childIds: [ID]! ): Boolean!

}

type ExchangeRateQueryResult {
cursor: String
hasMore: Boolean!
    exchangeRatePage: [ExchangeRate]
}

# -----------------------------------------
# FXTrade
# -----------------------------------------
type FXTrade {
id: ID!
        tradeReference: String
        tradeDate: String
        settlementDate: String
        amountSold: String
        amountBought: String
        rate: Float
        customer: Customer
        bank: Bank
        exchangeRate: ExchangeRate
        sourceAccount: Account
        destinationAccount: Account
        transaction: Transaction
        status:  TradeStatus

    getCustomer( parentId: ID! ): FXTrade
    assignCustomer( parentId: ID!, childId: ID! ): Boolean!
    unassignCustomer( parentId: ID!, childId: ID! ): Boolean!
    getBank( parentId: ID! ): FXTrade
    assignBank( parentId: ID!, childId: ID! ): Boolean!
    unassignBank( parentId: ID!, childId: ID! ): Boolean!
    getExchangeRate( parentId: ID! ): FXTrade
    assignExchangeRate( parentId: ID!, childId: ID! ): Boolean!
    unassignExchangeRate( parentId: ID!, childId: ID! ): Boolean!
    getSourceAccount( parentId: ID! ): FXTrade
    assignSourceAccount( parentId: ID!, childId: ID! ): Boolean!
    unassignSourceAccount( parentId: ID!, childId: ID! ): Boolean!
    getDestinationAccount( parentId: ID! ): FXTrade
    assignDestinationAccount( parentId: ID!, childId: ID! ): Boolean!
    unassignDestinationAccount( parentId: ID!, childId: ID! ): Boolean!
    getTransaction( parentId: ID! ): FXTrade
    assignTransaction( parentId: ID!, childId: ID! ): Boolean!
    unassignTransaction( parentId: ID!, childId: ID! ): Boolean!
}

type FXTradeQueryResult {
cursor: String
hasMore: Boolean!
    fXTradePage: [FXTrade]
}

# -----------------------------------------
# Dispute
# -----------------------------------------
type Dispute {
id: ID!
        disputeReference: String
        raisedOn: String
        reason: String
        transaction: Transaction
        customer: Customer
        account: Account
        paymentCard: PaymentCard
        status:  DisputeStatus

    getTransaction( parentId: ID! ): Dispute
    assignTransaction( parentId: ID!, childId: ID! ): Boolean!
    unassignTransaction( parentId: ID!, childId: ID! ): Boolean!
    getCustomer( parentId: ID! ): Dispute
    assignCustomer( parentId: ID!, childId: ID! ): Boolean!
    unassignCustomer( parentId: ID!, childId: ID! ): Boolean!
    getAccount( parentId: ID! ): Dispute
    assignAccount( parentId: ID!, childId: ID! ): Boolean!
    unassignAccount( parentId: ID!, childId: ID! ): Boolean!
    getPaymentCard( parentId: ID! ): Dispute
    assignPaymentCard( parentId: ID!, childId: ID! ): Boolean!
    unassignPaymentCard( parentId: ID!, childId: ID! ): Boolean!
}

type DisputeQueryResult {
cursor: String
hasMore: Boolean!
    disputePage: [Dispute]
}

# -----------------------------------------
# Consent
# -----------------------------------------
type Consent {
id: ID!
        grantedOn: String
        expiresOn: String
        customer: Customer
        bank: Bank
        authorizedAccounts:  [Account]
        thirdPartyProvider: ThirdPartyProvider
        consentType:  ConsentType
        status:  ConsentStatus

    getCustomer( parentId: ID! ): Consent
    assignCustomer( parentId: ID!, childId: ID! ): Boolean!
    unassignCustomer( parentId: ID!, childId: ID! ): Boolean!
    getBank( parentId: ID! ): Consent
    assignBank( parentId: ID!, childId: ID! ): Boolean!
    unassignBank( parentId: ID!, childId: ID! ): Boolean!
    getThirdPartyProvider( parentId: ID! ): Consent
    assignThirdPartyProvider( parentId: ID!, childId: ID! ): Boolean!
    unassignThirdPartyProvider( parentId: ID!, childId: ID! ): Boolean!
    getAuthorizedAccounts( parentId: ID! ): [Account]!
    addToAuthorizedAccounts( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromAuthorizedAccounts( parentId: ID!, childIds: [ID]! ): Boolean!

}

type ConsentQueryResult {
cursor: String
hasMore: Boolean!
    consentPage: [Consent]
}

# -----------------------------------------
# ThirdPartyProvider
# -----------------------------------------
type ThirdPartyProvider {
id: ID!
        name: String
        registrationId: String
        website: String
        bank: Bank
        consents:  [Consent]

    getBank( parentId: ID! ): ThirdPartyProvider
    assignBank( parentId: ID!, childId: ID! ): Boolean!
    unassignBank( parentId: ID!, childId: ID! ): Boolean!
    getConsents( parentId: ID! ): [Consent]!
    addToConsents( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromConsents( parentId: ID!, childIds: [ID]! ): Boolean!

}

type ThirdPartyProviderQueryResult {
cursor: String
hasMore: Boolean!
    thirdPartyProviderPage: [ThirdPartyProvider]
}


# -----------------------------------------
# CustomerType
# -----------------------------------------
enum CustomerType {

        Individual
        Business
        NonProfit
        Government
}
# -----------------------------------------
# AccountType
# -----------------------------------------
enum AccountType {

        Checking
        Savings
        MoneyMarket
        TimeDeposit
}
# -----------------------------------------
# AccountStatus
# -----------------------------------------
enum AccountStatus {

        Open
        Frozen
        Dormant
        Closed
}
# -----------------------------------------
# AccountOwnershipType
# -----------------------------------------
enum AccountOwnershipType {

        Sole
        Joint
        Corporate
        Trust
}
# -----------------------------------------
# StatementDeliveryMethod
# -----------------------------------------
enum StatementDeliveryMethod {

        Electronic
        Paper
}
# -----------------------------------------
# TransactionType
# -----------------------------------------
enum TransactionType {

        Deposit
        Withdrawal
        Transfer
        Payment
        Fee
        Interest
        Adjustment
        Chargeback
        Refund
        FXConversion
}
# -----------------------------------------
# TransactionStatus
# -----------------------------------------
enum TransactionStatus {

        Pending
        Posted
        Reversed
        Failed
        Cancelled
}
# -----------------------------------------
# TransactionDirection
# -----------------------------------------
enum TransactionDirection {

        Credit
        Debit
}
# -----------------------------------------
# ChannelType
# -----------------------------------------
enum ChannelType {

        Branch
        Online
        Mobile
        ATM
        API
        CallCenter
}
# -----------------------------------------
# PaymentMethod
# -----------------------------------------
enum PaymentMethod {

        InternalTransfer
        ACH
        Wire
        SEPA
        SWIFT
        Card
        Cash
        Check
        MobileWallet
}
# -----------------------------------------
# PaymentStatus
# -----------------------------------------
enum PaymentStatus {

        Initiated
        InProcess
        Settled
        Failed
        Reversed
        Cancelled
}
# -----------------------------------------
# StandingInstructionFrequency
# -----------------------------------------
enum StandingInstructionFrequency {

        OneTime
        Weekly
        BiWeekly
        Monthly
        Quarterly
        Annually
}
# -----------------------------------------
# StandingInstructionStatus
# -----------------------------------------
enum StandingInstructionStatus {

        Active
        Paused
        Cancelled
        Completed
}
# -----------------------------------------
# CardType
# -----------------------------------------
enum CardType {

        Debit
        Credit
        Prepaid
        Virtual
}
# -----------------------------------------
# CardStatus
# -----------------------------------------
enum CardStatus {

        Active
        Blocked
        LostStolen
        Expired
        Closed
}
# -----------------------------------------
# CardNetwork
# -----------------------------------------
enum CardNetwork {

        Visa
        Mastercard
        Amex
        Discover
        UnionPay
        Other
}
# -----------------------------------------
# LoanType
# -----------------------------------------
enum LoanType {

        Mortgage
        Personal
        Auto
        SmallBusiness
        CreditLine
        Student
}
# -----------------------------------------
# LoanStatus
# -----------------------------------------
enum LoanStatus {

        Applied
        Approved
        Active
        Delinquent
        Defaulted
        Closed
}
# -----------------------------------------
# RateType
# -----------------------------------------
enum RateType {

        Fixed
        Variable
}
# -----------------------------------------
# InterestCompounding
# -----------------------------------------
enum InterestCompounding {

        Daily
        Monthly
        Quarterly
        Annually
}
# -----------------------------------------
# InstallmentStatus
# -----------------------------------------
enum InstallmentStatus {

        Due
        Paid
        Overdue
        Deferred
}
# -----------------------------------------
# FeeType
# -----------------------------------------
enum FeeType {

        Maintenance
        Overdraft
        Wire
        ATM
        CardAnnual
        LatePayment
        EarlyWithdrawal
        ReplacementCard
}
# -----------------------------------------
# RiskRating
# -----------------------------------------
enum RiskRating {

        Low
        Medium
        High
}
# -----------------------------------------
# KycStatus
# -----------------------------------------
enum KycStatus {

        Pending
        Verified
        Rejected
        Expired
}
# -----------------------------------------
# IdentityDocumentType
# -----------------------------------------
enum IdentityDocumentType {

        Passport
        NationalID
        DriverLicense
        ResidencePermit
        BusinessRegistration
        TaxCertificate
}
# -----------------------------------------
# ScreeningOutcome
# -----------------------------------------
enum ScreeningOutcome {

        Clear
        Match
        Review
}
# -----------------------------------------
# TradeStatus
# -----------------------------------------
enum TradeStatus {

        Booked
        Settled
        Cancelled
}
# -----------------------------------------
# ATMStatus
# -----------------------------------------
enum ATMStatus {

        InService
        OutOfService
        Maintenance
}
# -----------------------------------------
# ConsentType
# -----------------------------------------
enum ConsentType {

        OpenBanking
        PaymentInitiation
        AccountInformation
        Marketing
        DataSharing
}
# -----------------------------------------
# ConsentStatus
# -----------------------------------------
enum ConsentStatus {

        Active
        Revoked
        Expired
}
# -----------------------------------------
# DisputeStatus
# -----------------------------------------
enum DisputeStatus {

        Open
        UnderReview
        Resolved
        Rejected
        Withdrawn
}
# -----------------------------------------
# ProductCategory
# -----------------------------------------
enum ProductCategory {

        Deposit
        Loan
        Card
        PaymentService
        Investment
}
# -----------------------------------------
# CollateralType
# -----------------------------------------
enum CollateralType {

        RealEstate
        Vehicle
        Cash
        Securities
        Guarantee
        Equipment
}

# -----------------------------------------
# Money
# -----------------------------------------
type Money {

        amount: Float
        currency: String
}
# -----------------------------------------
# Address
# -----------------------------------------
type Address {

        street: String
        city: String
        state: String
        postalCode: String
        country: String
}
# -----------------------------------------
# AccountNumber
# -----------------------------------------
type AccountNumber {

        value: String
}
# -----------------------------------------
# IBAN
# -----------------------------------------
type IBAN {

        value: String
}
# -----------------------------------------
# BIC
# -----------------------------------------
type BIC {

        value: String
}
# -----------------------------------------
# CardPAN
# -----------------------------------------
type CardPAN {

        value: String
}
# -----------------------------------------
# Percentage
# -----------------------------------------
type Percentage {

        value: Float
}
`;

