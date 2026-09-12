import { gql } from "graphql-tag";
export const typeDefs = gql`

# read related functions
type Query {

"""
    Bank
"""
    bank(id: ID!): Bank
    banks: BankQueryResult

"""
    Branch
"""
    branch(id: ID!): Branch
    branchs: BranchQueryResult

"""
    ATM
"""
    aTM(id: ID!): ATM
    aTMs: ATMQueryResult

"""
    Customer
"""
    customer(id: ID!): Customer
    customers: CustomerQueryResult

"""
    KycProfile
"""
    kycProfile(id: ID!): KycProfile
    kycProfiles: KycProfileQueryResult

"""
    IdentityDocument
"""
    identityDocument(id: ID!): IdentityDocument
    identityDocuments: IdentityDocumentQueryResult

"""
    RiskAssessment
"""
    riskAssessment(id: ID!): RiskAssessment
    riskAssessments: RiskAssessmentQueryResult

"""
    ScreeningResult
"""
    screeningResult(id: ID!): ScreeningResult
    screeningResults: ScreeningResultQueryResult

"""
    BankingProduct
"""
    bankingProduct(id: ID!): BankingProduct
    bankingProducts: BankingProductQueryResult

"""
    Account
"""
    account(id: ID!): Account
    accounts: AccountQueryResult

"""
    AccountStatement
"""
    accountStatement(id: ID!): AccountStatement
    accountStatements: AccountStatementQueryResult

"""
    Transaction
"""
    transaction(id: ID!): Transaction
    transactions: TransactionQueryResult

"""
    ExternalAccount
"""
    externalAccount(id: ID!): ExternalAccount
    externalAccounts: ExternalAccountQueryResult

"""
    FundsTransfer
"""
    fundsTransfer(id: ID!): FundsTransfer
    fundsTransfers: FundsTransferQueryResult

"""
    StandingInstruction
"""
    standingInstruction(id: ID!): StandingInstruction
    standingInstructions: StandingInstructionQueryResult

"""
    PaymentCard
"""
    paymentCard(id: ID!): PaymentCard
    paymentCards: PaymentCardQueryResult

"""
    LoanAccount
"""
    loanAccount(id: ID!): LoanAccount
    loanAccounts: LoanAccountQueryResult

"""
    RepaymentSchedule
"""
    repaymentSchedule(id: ID!): RepaymentSchedule
    repaymentSchedules: RepaymentScheduleQueryResult

"""
    LoanPayment
"""
    loanPayment(id: ID!): LoanPayment
    loanPayments: LoanPaymentQueryResult

"""
    Collateral
"""
    collateral(id: ID!): Collateral
    collaterals: CollateralQueryResult

"""
    FeeCharge
"""
    feeCharge(id: ID!): FeeCharge
    feeCharges: FeeChargeQueryResult

"""
    ExchangeRate
"""
    exchangeRate(id: ID!): ExchangeRate
    exchangeRates: ExchangeRateQueryResult

"""
    FXTrade
"""
    fXTrade(id: ID!): FXTrade
    fXTrades: FXTradeQueryResult

"""
    Dispute
"""
    dispute(id: ID!): Dispute
    disputes: DisputeQueryResult

"""
    Consent
"""
    consent(id: ID!): Consent
    consents: ConsentQueryResult

"""
    ThirdPartyProvider
"""
    thirdPartyProvider(id: ID!): ThirdPartyProvider
    thirdPartyProviders: ThirdPartyProviderQueryResult

}

# update related functions
type Mutation {

addBank(
        name: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        legalName: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        swiftBic: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        headquartersCountry: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        website: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): Bank

updateBank(
id: ID!
        name: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        legalName: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        swiftBic: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        headquartersCountry: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        website: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): Bank
removeBank(id: ID!): Boolean
addBranch(
        name: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        branchCode: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        address: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        phone: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        openingHours: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): Branch

updateBranch(
id: ID!
        name: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        branchCode: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        address: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        phone: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        openingHours: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): Branch
removeBranch(id: ID!): Boolean
addATM(
        terminalId: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        location: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): ATM

updateATM(
id: ID!
        terminalId: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        location: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): ATM
removeATM(id: ID!): Boolean
addCustomer(
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
): Customer

updateCustomer(
id: ID!
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
): Customer
removeCustomer(id: ID!): Boolean
addKycProfile(
        profileId: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        lastReviewedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): KycProfile

updateKycProfile(
id: ID!
        profileId: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        lastReviewedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): KycProfile
removeKycProfile(id: ID!): Boolean
addIdentityDocument(
        documentNumber: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        issuingCountry: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        expirationDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        DocumentType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): IdentityDocument

updateIdentityDocument(
id: ID!
        documentNumber: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        issuingCountry: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        expirationDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        DocumentType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): IdentityDocument
removeIdentityDocument(id: ID!): Boolean
addRiskAssessment(
        score: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        assessedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Rating: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): RiskAssessment

updateRiskAssessment(
id: ID!
        score: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        assessedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Rating: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): RiskAssessment
removeRiskAssessment(id: ID!): Boolean
addScreeningResult(
        screeningDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        provider: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Outcome: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): ScreeningResult

updateScreeningResult(
id: ID!
        screeningDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        provider: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Outcome: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): ScreeningResult
removeScreeningResult(id: ID!): Boolean
addBankingProduct(
        productCode: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        name: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        description: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        ProductCategory: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): BankingProduct

updateBankingProduct(
id: ID!
        productCode: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        name: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        description: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        ProductCategory: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): BankingProduct
removeBankingProduct(id: ID!): Boolean
addAccount(
        accountNumber: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        iban: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        accountName: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        currency: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        openedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        closedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        AccountType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        OwnershipType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): Account

updateAccount(
id: ID!
        accountNumber: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        iban: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        accountName: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        currency: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        openedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        closedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        AccountType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        OwnershipType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): Account
removeAccount(id: ID!): Boolean
addAccountStatement(
        statementNumber: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        periodStart: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        periodEnd: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        openingBalance: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        closingBalance: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        DeliveryMethod: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): AccountStatement

updateAccountStatement(
id: ID!
        statementNumber: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        periodStart: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        periodEnd: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        openingBalance: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        closingBalance: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        DeliveryMethod: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): AccountStatement
removeAccountStatement(id: ID!): Boolean
addTransaction(
        bookingDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        valueDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        amount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        description: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Direction: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        TransactionType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Channel: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): Transaction

updateTransaction(
id: ID!
        bookingDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        valueDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        amount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        description: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Direction: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        TransactionType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Channel: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): Transaction
removeTransaction(id: ID!): Boolean
addExternalAccount(
        name: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        iban: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        accountNumber: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        bic: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        bankName: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        country: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): ExternalAccount

updateExternalAccount(
id: ID!
        name: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        iban: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        accountNumber: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        bic: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        bankName: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        country: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): ExternalAccount
removeExternalAccount(id: ID!): Boolean
addFundsTransfer(
        transferReference: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        amount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        requestedDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        executionDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        purpose: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        feeAmount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Method: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): FundsTransfer

updateFundsTransfer(
id: ID!
        transferReference: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        amount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        requestedDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        executionDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        purpose: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        feeAmount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Method: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): FundsTransfer
removeFundsTransfer(id: ID!): Boolean
addStandingInstruction(
        instructionId: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        amount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        nextExecutionDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Frequency: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): StandingInstruction

updateStandingInstruction(
id: ID!
        instructionId: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        amount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        nextExecutionDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Frequency: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): StandingInstruction
removeStandingInstruction(id: ID!): Boolean
addPaymentCard(
        cardNumber: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        embossedName: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        expiryMonth: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        expiryYear: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        CardType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        CardStatus: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Network: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): PaymentCard

updatePaymentCard(
id: ID!
        cardNumber: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        embossedName: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        expiryMonth: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        expiryYear: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        CardType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        CardStatus: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Network: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): PaymentCard
removePaymentCard(id: ID!): Boolean
addLoanAccount(
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
): LoanAccount

updateLoanAccount(
id: ID!
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
): LoanAccount
removeLoanAccount(id: ID!): Boolean
addRepaymentSchedule(
        installmentNumber: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        dueDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        principalDue: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        interestDue: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        totalDue: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): RepaymentSchedule

updateRepaymentSchedule(
id: ID!
        installmentNumber: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        dueDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        principalDue: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        interestDue: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        totalDue: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): RepaymentSchedule
removeRepaymentSchedule(id: ID!): Boolean
addLoanPayment(
        paymentReference: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        amount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        paymentDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Method: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): LoanPayment

updateLoanPayment(
id: ID!
        paymentReference: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        amount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        paymentDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Method: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): LoanPayment
removeLoanPayment(id: ID!): Boolean
addCollateral(
        appraisedValue: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        description: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        location: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        CollateralType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): Collateral

updateCollateral(
id: ID!
        appraisedValue: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        description: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        location: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        CollateralType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): Collateral
removeCollateral(id: ID!): Boolean
addFeeCharge(
        feeCode: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        amount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        appliedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        FeeType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): FeeCharge

updateFeeCharge(
id: ID!
        feeCode: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        amount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        appliedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        FeeType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): FeeCharge
removeFeeCharge(id: ID!): Boolean
addExchangeRate(
        baseCurrency: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        counterCurrency: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        rate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        asOf: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        source: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): ExchangeRate

updateExchangeRate(
id: ID!
        baseCurrency: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        counterCurrency: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        rate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        asOf: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        source: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): ExchangeRate
removeExchangeRate(id: ID!): Boolean
addFXTrade(
        tradeReference: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        tradeDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        settlementDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        amountSold: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        amountBought: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        rate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): FXTrade

updateFXTrade(
id: ID!
        tradeReference: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        tradeDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        settlementDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        amountSold: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        amountBought: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        rate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): FXTrade
removeFXTrade(id: ID!): Boolean
addDispute(
        disputeReference: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        raisedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        reason: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): Dispute

updateDispute(
id: ID!
        disputeReference: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        raisedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        reason: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): Dispute
removeDispute(id: ID!): Boolean
addConsent(
        grantedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        expiresOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        ConsentType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): Consent

updateConsent(
id: ID!
        grantedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        expiresOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        ConsentType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        Status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): Consent
removeConsent(id: ID!): Boolean
addThirdPartyProvider(
        name: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        registrationId: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        website: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): ThirdPartyProvider

updateThirdPartyProvider(
id: ID!
        name: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        registrationId: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        website: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
): ThirdPartyProvider
removeThirdPartyProvider(id: ID!): Boolean
}

"""
    Bank
"""
type Bank {
id: ID!
        name: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        legalName: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        swiftBic: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        headquartersCountry: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        website: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        branches: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        products: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        customers: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        accounts: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        paymentCards: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        loanAccounts: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        exchangeRates: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        consents: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        thirdPartyProviders: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    addToBranches(
            name: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            branchCode: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            address: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            phone: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            openingHours: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Bank
    assignToBranches( branchesIds: [ID]! ): Bank
    addToProducts(
            productCode: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            name: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            description: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            ProductCategory: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Bank
    assignToProducts( productsIds: [ID]! ): Bank
    addToCustomers(
            firstName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            lastName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            legalName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            dateOfBirth: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            taxId: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            email: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            phone: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            address: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            CustomerType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            RiskRating: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            KycStatus: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Bank
    assignToCustomers( customersIds: [ID]! ): Bank
    addToAccounts(
            accountNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            iban: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            accountName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            currency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            openedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            closedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            AccountType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            OwnershipType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Bank
    assignToAccounts( accountsIds: [ID]! ): Bank
    addToPaymentCards(
            cardNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            embossedName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            expiryMonth: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            expiryYear: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            CardType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            CardStatus: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Network: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Bank
    assignToPaymentCards( paymentCardsIds: [ID]! ): Bank
    addToLoanAccounts(
            loanNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            principalAmount: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            outstandingPrincipal: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            interestRate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            originationDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            maturityDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            paymentDayOfMonth: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            currency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            LoanType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            RateType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Compounding: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Bank
    assignToLoanAccounts( loanAccountsIds: [ID]! ): Bank
    addToExchangeRates(
            baseCurrency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            counterCurrency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            rate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            asOf: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            source: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Bank
    assignToExchangeRates( exchangeRatesIds: [ID]! ): Bank
    addToConsents(
            grantedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            expiresOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            ConsentType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Bank
    assignToConsents( consentsIds: [ID]! ): Bank
    addToThirdPartyProviders(
            name: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            registrationId: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            website: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Bank
    assignToThirdPartyProviders( thirdPartyProvidersIds: [ID]! ): Bank

}

type BankQueryResult {
cursor: String
hasMore: Boolean!
    bankPage: [Bank]
}

"""
    Branch
"""
type Branch {
id: ID!
        name: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        branchCode: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        address: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        phone: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        openingHours: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        bank: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        accounts: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        loanAccounts: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        atms: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    addBank(
            name: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            legalName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            swiftBic: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            headquartersCountry: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            website: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Branch
    assignBank(  bankId: [ID]! ): Branch
    unassignBank( branchId: ID! ): Branch
    addToAccounts(
            accountNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            iban: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            accountName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            currency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            openedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            closedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            AccountType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            OwnershipType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Branch
    assignToAccounts( accountsIds: [ID]! ): Branch
    addToLoanAccounts(
            loanNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            principalAmount: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            outstandingPrincipal: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            interestRate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            originationDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            maturityDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            paymentDayOfMonth: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            currency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            LoanType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            RateType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Compounding: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Branch
    assignToLoanAccounts( loanAccountsIds: [ID]! ): Branch
    addToAtms(
            terminalId: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            location: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Branch
    assignToAtms( atmsIds: [ID]! ): Branch

}

type BranchQueryResult {
cursor: String
hasMore: Boolean!
    branchPage: [Branch]
}

"""
    ATM
"""
type ATM {
id: ID!
        terminalId: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        location: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        branch: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    addBranch(
            name: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            branchCode: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            address: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            phone: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            openingHours: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): ATM
    assignBranch(  branchId: [ID]! ): ATM
    unassignBranch( aTMId: ID! ): ATM

}

type ATMQueryResult {
cursor: String
hasMore: Boolean!
    aTMPage: [ATM]
}

"""
    Customer
"""
type Customer {
id: ID!
        firstName: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        lastName: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        legalName: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        dateOfBirth: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        taxId: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        email: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        phone: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        address: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        bank: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        accounts: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        loanAccounts: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        paymentCards: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        externalAccounts: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        fundsTransfers: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        disputes: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        kycProfiles: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        consents: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        customerType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        riskRating: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        kycStatus: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    addBank(
            name: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            legalName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            swiftBic: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            headquartersCountry: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            website: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Customer
    assignBank(  bankId: [ID]! ): Customer
    unassignBank( customerId: ID! ): Customer
    addToAccounts(
            accountNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            iban: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            accountName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            currency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            openedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            closedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            AccountType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            OwnershipType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Customer
    assignToAccounts( accountsIds: [ID]! ): Customer
    addToLoanAccounts(
            loanNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            principalAmount: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            outstandingPrincipal: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            interestRate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            originationDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            maturityDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            paymentDayOfMonth: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            currency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            LoanType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            RateType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Compounding: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Customer
    assignToLoanAccounts( loanAccountsIds: [ID]! ): Customer
    addToPaymentCards(
            cardNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            embossedName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            expiryMonth: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            expiryYear: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            CardType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            CardStatus: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Network: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Customer
    assignToPaymentCards( paymentCardsIds: [ID]! ): Customer
    addToExternalAccounts(
            name: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            iban: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            accountNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            bic: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            bankName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            country: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Customer
    assignToExternalAccounts( externalAccountsIds: [ID]! ): Customer
    addToFundsTransfers(
            transferReference: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            amount: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            requestedDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            executionDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            purpose: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            feeAmount: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Method: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Customer
    assignToFundsTransfers( fundsTransfersIds: [ID]! ): Customer
    addToDisputes(
            disputeReference: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            raisedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            reason: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Customer
    assignToDisputes( disputesIds: [ID]! ): Customer
    addToKycProfiles(
            profileId: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            lastReviewedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Customer
    assignToKycProfiles( kycProfilesIds: [ID]! ): Customer
    addToConsents(
            grantedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            expiresOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            ConsentType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Customer
    assignToConsents( consentsIds: [ID]! ): Customer

}

type CustomerQueryResult {
cursor: String
hasMore: Boolean!
    customerPage: [Customer]
}

"""
    KycProfile
"""
type KycProfile {
id: ID!
        profileId: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        lastReviewedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        customer: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        identityDocuments: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        riskAssessments: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        screenings: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    addCustomer(
            firstName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            lastName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            legalName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            dateOfBirth: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            taxId: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            email: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            phone: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            address: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            CustomerType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            RiskRating: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            KycStatus: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): KycProfile
    assignCustomer(  customerId: [ID]! ): KycProfile
    unassignCustomer( kycProfileId: ID! ): KycProfile
    addToIdentityDocuments(
            documentNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            issuingCountry: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            expirationDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            DocumentType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): KycProfile
    assignToIdentityDocuments( identityDocumentsIds: [ID]! ): KycProfile
    addToRiskAssessments(
            score: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            assessedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Rating: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): KycProfile
    assignToRiskAssessments( riskAssessmentsIds: [ID]! ): KycProfile
    addToScreenings(
            screeningDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            provider: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Outcome: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): KycProfile
    assignToScreenings( screeningsIds: [ID]! ): KycProfile

}

type KycProfileQueryResult {
cursor: String
hasMore: Boolean!
    kycProfilePage: [KycProfile]
}

"""
    IdentityDocument
"""
type IdentityDocument {
id: ID!
        documentNumber: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        issuingCountry: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        expirationDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        kycProfile: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        documentType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    addKycProfile(
            profileId: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            lastReviewedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): IdentityDocument
    assignKycProfile(  kycProfileId: [ID]! ): IdentityDocument
    unassignKycProfile( identityDocumentId: ID! ): IdentityDocument

}

type IdentityDocumentQueryResult {
cursor: String
hasMore: Boolean!
    identityDocumentPage: [IdentityDocument]
}

"""
    RiskAssessment
"""
type RiskAssessment {
id: ID!
        score: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        assessedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        kycProfile: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        rating: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    addKycProfile(
            profileId: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            lastReviewedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): RiskAssessment
    assignKycProfile(  kycProfileId: [ID]! ): RiskAssessment
    unassignKycProfile( riskAssessmentId: ID! ): RiskAssessment

}

type RiskAssessmentQueryResult {
cursor: String
hasMore: Boolean!
    riskAssessmentPage: [RiskAssessment]
}

"""
    ScreeningResult
"""
type ScreeningResult {
id: ID!
        screeningDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        provider: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        kycProfile: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        outcome: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    addKycProfile(
            profileId: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            lastReviewedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): ScreeningResult
    assignKycProfile(  kycProfileId: [ID]! ): ScreeningResult
    unassignKycProfile( screeningResultId: ID! ): ScreeningResult

}

type ScreeningResultQueryResult {
cursor: String
hasMore: Boolean!
    screeningResultPage: [ScreeningResult]
}

"""
    BankingProduct
"""
type BankingProduct {
id: ID!
        productCode: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        name: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        description: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        bank: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        accounts: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        loanAccounts: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        paymentCards: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        productCategory: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    addBank(
            name: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            legalName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            swiftBic: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            headquartersCountry: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            website: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): BankingProduct
    assignBank(  bankId: [ID]! ): BankingProduct
    unassignBank( bankingProductId: ID! ): BankingProduct
    addToAccounts(
            accountNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            iban: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            accountName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            currency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            openedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            closedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            AccountType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            OwnershipType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): BankingProduct
    assignToAccounts( accountsIds: [ID]! ): BankingProduct
    addToLoanAccounts(
            loanNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            principalAmount: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            outstandingPrincipal: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            interestRate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            originationDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            maturityDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            paymentDayOfMonth: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            currency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            LoanType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            RateType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Compounding: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): BankingProduct
    assignToLoanAccounts( loanAccountsIds: [ID]! ): BankingProduct
    addToPaymentCards(
            cardNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            embossedName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            expiryMonth: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            expiryYear: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            CardType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            CardStatus: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Network: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): BankingProduct
    assignToPaymentCards( paymentCardsIds: [ID]! ): BankingProduct

}

type BankingProductQueryResult {
cursor: String
hasMore: Boolean!
    bankingProductPage: [BankingProduct]
}

"""
    Account
"""
type Account {
id: ID!
        accountNumber: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        iban: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        accountName: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        currency: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        openedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        closedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        bank: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        branch: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        product: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        owners: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        transactions: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        statements: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        standingInstructions: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        feeCharges: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        accountType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        ownershipType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    addBank(
            name: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            legalName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            swiftBic: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            headquartersCountry: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            website: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Account
    assignBank(  bankId: [ID]! ): Account
    unassignBank( accountId: ID! ): Account
    addBranch(
            name: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            branchCode: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            address: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            phone: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            openingHours: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Account
    assignBranch(  branchId: [ID]! ): Account
    unassignBranch( accountId: ID! ): Account
    addProduct(
            productCode: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            name: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            description: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            ProductCategory: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Account
    assignProduct(  productId: [ID]! ): Account
    unassignProduct( accountId: ID! ): Account
    addToOwners(
            firstName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            lastName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            legalName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            dateOfBirth: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            taxId: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            email: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            phone: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            address: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            CustomerType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            RiskRating: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            KycStatus: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Account
    assignToOwners( ownersIds: [ID]! ): Account
    addToTransactions(
            bookingDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            valueDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            amount: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            description: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Direction: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            TransactionType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Channel: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Account
    assignToTransactions( transactionsIds: [ID]! ): Account
    addToStatements(
            statementNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            periodStart: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            periodEnd: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            openingBalance: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            closingBalance: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            DeliveryMethod: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Account
    assignToStatements( statementsIds: [ID]! ): Account
    addToStandingInstructions(
            instructionId: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            amount: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            nextExecutionDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Frequency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Account
    assignToStandingInstructions( standingInstructionsIds: [ID]! ): Account
    addToFeeCharges(
            feeCode: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            amount: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            appliedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            FeeType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Account
    assignToFeeCharges( feeChargesIds: [ID]! ): Account

}

type AccountQueryResult {
cursor: String
hasMore: Boolean!
    accountPage: [Account]
}

"""
    AccountStatement
"""
type AccountStatement {
id: ID!
        statementNumber: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        periodStart: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        periodEnd: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        openingBalance: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        closingBalance: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        account: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        deliveryMethod: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    addAccount(
            accountNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            iban: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            accountName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            currency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            openedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            closedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            AccountType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            OwnershipType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): AccountStatement
    assignAccount(  accountId: [ID]! ): AccountStatement
    unassignAccount( accountStatementId: ID! ): AccountStatement

}

type AccountStatementQueryResult {
cursor: String
hasMore: Boolean!
    accountStatementPage: [AccountStatement]
}

"""
    Transaction
"""
type Transaction {
id: ID!
        bookingDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        valueDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        amount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        description: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        account: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        externalCounterparty: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        paymentCard: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        fundsTransfer: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        fxTrade: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        dispute: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        direction: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        transactionType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        channel: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    addAccount(
            accountNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            iban: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            accountName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            currency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            openedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            closedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            AccountType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            OwnershipType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Transaction
    assignAccount(  accountId: [ID]! ): Transaction
    unassignAccount( transactionId: ID! ): Transaction
    addExternalCounterparty(
            name: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            iban: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            accountNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            bic: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            bankName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            country: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Transaction
    assignExternalCounterparty(  externalCounterpartyId: [ID]! ): Transaction
    unassignExternalCounterparty( transactionId: ID! ): Transaction
    addPaymentCard(
            cardNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            embossedName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            expiryMonth: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            expiryYear: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            CardType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            CardStatus: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Network: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Transaction
    assignPaymentCard(  paymentCardId: [ID]! ): Transaction
    unassignPaymentCard( transactionId: ID! ): Transaction
    addFundsTransfer(
            transferReference: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            amount: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            requestedDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            executionDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            purpose: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            feeAmount: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Method: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Transaction
    assignFundsTransfer(  fundsTransferId: [ID]! ): Transaction
    unassignFundsTransfer( transactionId: ID! ): Transaction
    addFxTrade(
            tradeReference: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            tradeDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            settlementDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            amountSold: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            amountBought: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            rate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Transaction
    assignFxTrade(  fxTradeId: [ID]! ): Transaction
    unassignFxTrade( transactionId: ID! ): Transaction
    addDispute(
            disputeReference: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            raisedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            reason: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Transaction
    assignDispute(  disputeId: [ID]! ): Transaction
    unassignDispute( transactionId: ID! ): Transaction

}

type TransactionQueryResult {
cursor: String
hasMore: Boolean!
    transactionPage: [Transaction]
}

"""
    ExternalAccount
"""
type ExternalAccount {
id: ID!
        name: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        iban: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        accountNumber: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        bic: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        bankName: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        country: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        customer: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        transactions: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    addCustomer(
            firstName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            lastName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            legalName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            dateOfBirth: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            taxId: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            email: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            phone: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            address: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            CustomerType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            RiskRating: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            KycStatus: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): ExternalAccount
    assignCustomer(  customerId: [ID]! ): ExternalAccount
    unassignCustomer( externalAccountId: ID! ): ExternalAccount
    addToTransactions(
            bookingDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            valueDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            amount: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            description: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Direction: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            TransactionType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Channel: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): ExternalAccount
    assignToTransactions( transactionsIds: [ID]! ): ExternalAccount

}

type ExternalAccountQueryResult {
cursor: String
hasMore: Boolean!
    externalAccountPage: [ExternalAccount]
}

"""
    FundsTransfer
"""
type FundsTransfer {
id: ID!
        transferReference: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        amount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        requestedDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        executionDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        purpose: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        feeAmount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        sourceAccount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        destinationAccount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        externalBeneficiary: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        initiatedBy: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        transactions: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        method: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    addSourceAccount(
            accountNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            iban: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            accountName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            currency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            openedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            closedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            AccountType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            OwnershipType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): FundsTransfer
    assignSourceAccount(  sourceAccountId: [ID]! ): FundsTransfer
    unassignSourceAccount( fundsTransferId: ID! ): FundsTransfer
    addDestinationAccount(
            accountNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            iban: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            accountName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            currency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            openedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            closedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            AccountType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            OwnershipType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): FundsTransfer
    assignDestinationAccount(  destinationAccountId: [ID]! ): FundsTransfer
    unassignDestinationAccount( fundsTransferId: ID! ): FundsTransfer
    addExternalBeneficiary(
            name: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            iban: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            accountNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            bic: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            bankName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            country: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): FundsTransfer
    assignExternalBeneficiary(  externalBeneficiaryId: [ID]! ): FundsTransfer
    unassignExternalBeneficiary( fundsTransferId: ID! ): FundsTransfer
    addInitiatedBy(
            firstName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            lastName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            legalName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            dateOfBirth: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            taxId: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            email: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            phone: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            address: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            CustomerType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            RiskRating: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            KycStatus: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): FundsTransfer
    assignInitiatedBy(  initiatedById: [ID]! ): FundsTransfer
    unassignInitiatedBy( fundsTransferId: ID! ): FundsTransfer
    addToTransactions(
            bookingDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            valueDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            amount: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            description: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Direction: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            TransactionType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Channel: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): FundsTransfer
    assignToTransactions( transactionsIds: [ID]! ): FundsTransfer

}

type FundsTransferQueryResult {
cursor: String
hasMore: Boolean!
    fundsTransferPage: [FundsTransfer]
}

"""
    StandingInstruction
"""
type StandingInstruction {
id: ID!
        instructionId: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        amount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        nextExecutionDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        account: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        beneficiary: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        frequency: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    addAccount(
            accountNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            iban: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            accountName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            currency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            openedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            closedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            AccountType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            OwnershipType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): StandingInstruction
    assignAccount(  accountId: [ID]! ): StandingInstruction
    unassignAccount( standingInstructionId: ID! ): StandingInstruction
    addBeneficiary(
            name: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            iban: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            accountNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            bic: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            bankName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            country: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): StandingInstruction
    assignBeneficiary(  beneficiaryId: [ID]! ): StandingInstruction
    unassignBeneficiary( standingInstructionId: ID! ): StandingInstruction

}

type StandingInstructionQueryResult {
cursor: String
hasMore: Boolean!
    standingInstructionPage: [StandingInstruction]
}

"""
    PaymentCard
"""
type PaymentCard {
id: ID!
        cardNumber: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        embossedName: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        expiryMonth: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        expiryYear: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        bank: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        account: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        customer: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        transactions: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        cardType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        cardStatus: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        network: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    addBank(
            name: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            legalName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            swiftBic: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            headquartersCountry: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            website: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): PaymentCard
    assignBank(  bankId: [ID]! ): PaymentCard
    unassignBank( paymentCardId: ID! ): PaymentCard
    addAccount(
            accountNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            iban: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            accountName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            currency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            openedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            closedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            AccountType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            OwnershipType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): PaymentCard
    assignAccount(  accountId: [ID]! ): PaymentCard
    unassignAccount( paymentCardId: ID! ): PaymentCard
    addCustomer(
            firstName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            lastName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            legalName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            dateOfBirth: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            taxId: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            email: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            phone: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            address: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            CustomerType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            RiskRating: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            KycStatus: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): PaymentCard
    assignCustomer(  customerId: [ID]! ): PaymentCard
    unassignCustomer( paymentCardId: ID! ): PaymentCard
    addToTransactions(
            bookingDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            valueDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            amount: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            description: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Direction: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            TransactionType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Channel: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): PaymentCard
    assignToTransactions( transactionsIds: [ID]! ): PaymentCard

}

type PaymentCardQueryResult {
cursor: String
hasMore: Boolean!
    paymentCardPage: [PaymentCard]
}

"""
    LoanAccount
"""
type LoanAccount {
id: ID!
        loanNumber: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        principalAmount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        outstandingPrincipal: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        interestRate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        originationDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        maturityDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        paymentDayOfMonth: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        currency: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        bank: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        branch: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        product: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        borrowers: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        repaymentSchedule: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        payments: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        collateral: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        feeCharges: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        loanType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        rateType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        compounding: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    addBank(
            name: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            legalName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            swiftBic: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            headquartersCountry: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            website: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): LoanAccount
    assignBank(  bankId: [ID]! ): LoanAccount
    unassignBank( loanAccountId: ID! ): LoanAccount
    addBranch(
            name: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            branchCode: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            address: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            phone: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            openingHours: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): LoanAccount
    assignBranch(  branchId: [ID]! ): LoanAccount
    unassignBranch( loanAccountId: ID! ): LoanAccount
    addProduct(
            productCode: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            name: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            description: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            ProductCategory: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): LoanAccount
    assignProduct(  productId: [ID]! ): LoanAccount
    unassignProduct( loanAccountId: ID! ): LoanAccount
    addToBorrowers(
            firstName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            lastName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            legalName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            dateOfBirth: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            taxId: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            email: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            phone: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            address: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            CustomerType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            RiskRating: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            KycStatus: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): LoanAccount
    assignToBorrowers( borrowersIds: [ID]! ): LoanAccount
    addToRepaymentSchedule(
            installmentNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            dueDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            principalDue: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            interestDue: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            totalDue: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): LoanAccount
    assignToRepaymentSchedule( repaymentScheduleIds: [ID]! ): LoanAccount
    addToPayments(
            paymentReference: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            amount: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            paymentDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Method: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): LoanAccount
    assignToPayments( paymentsIds: [ID]! ): LoanAccount
    addToCollateral(
            appraisedValue: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            description: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            location: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            CollateralType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): LoanAccount
    assignToCollateral( collateralIds: [ID]! ): LoanAccount
    addToFeeCharges(
            feeCode: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            amount: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            appliedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            FeeType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): LoanAccount
    assignToFeeCharges( feeChargesIds: [ID]! ): LoanAccount

}

type LoanAccountQueryResult {
cursor: String
hasMore: Boolean!
    loanAccountPage: [LoanAccount]
}

"""
    RepaymentSchedule
"""
type RepaymentSchedule {
id: ID!
        installmentNumber: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        dueDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        principalDue: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        interestDue: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        totalDue: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        loanAccount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        payment: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    addLoanAccount(
            loanNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            principalAmount: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            outstandingPrincipal: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            interestRate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            originationDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            maturityDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            paymentDayOfMonth: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            currency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            LoanType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            RateType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Compounding: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): RepaymentSchedule
    assignLoanAccount(  loanAccountId: [ID]! ): RepaymentSchedule
    unassignLoanAccount( repaymentScheduleId: ID! ): RepaymentSchedule
    addPayment(
            paymentReference: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            amount: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            paymentDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Method: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): RepaymentSchedule
    assignPayment(  paymentId: [ID]! ): RepaymentSchedule
    unassignPayment( repaymentScheduleId: ID! ): RepaymentSchedule

}

type RepaymentScheduleQueryResult {
cursor: String
hasMore: Boolean!
    repaymentSchedulePage: [RepaymentSchedule]
}

"""
    LoanPayment
"""
type LoanPayment {
id: ID!
        paymentReference: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        amount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        paymentDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        loanAccount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        transaction: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        method: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    addLoanAccount(
            loanNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            principalAmount: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            outstandingPrincipal: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            interestRate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            originationDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            maturityDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            paymentDayOfMonth: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            currency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            LoanType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            RateType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Compounding: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): LoanPayment
    assignLoanAccount(  loanAccountId: [ID]! ): LoanPayment
    unassignLoanAccount( loanPaymentId: ID! ): LoanPayment
    addTransaction(
            bookingDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            valueDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            amount: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            description: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Direction: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            TransactionType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Channel: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): LoanPayment
    assignTransaction(  transactionId: [ID]! ): LoanPayment
    unassignTransaction( loanPaymentId: ID! ): LoanPayment

}

type LoanPaymentQueryResult {
cursor: String
hasMore: Boolean!
    loanPaymentPage: [LoanPayment]
}

"""
    Collateral
"""
type Collateral {
id: ID!
        appraisedValue: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        description: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        location: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        loanAccount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        collateralType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    addLoanAccount(
            loanNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            principalAmount: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            outstandingPrincipal: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            interestRate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            originationDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            maturityDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            paymentDayOfMonth: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            currency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            LoanType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            RateType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Compounding: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Collateral
    assignLoanAccount(  loanAccountId: [ID]! ): Collateral
    unassignLoanAccount( collateralId: ID! ): Collateral

}

type CollateralQueryResult {
cursor: String
hasMore: Boolean!
    collateralPage: [Collateral]
}

"""
    FeeCharge
"""
type FeeCharge {
id: ID!
        feeCode: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        amount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        appliedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        account: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        loanAccount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        feeType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    addAccount(
            accountNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            iban: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            accountName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            currency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            openedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            closedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            AccountType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            OwnershipType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): FeeCharge
    assignAccount(  accountId: [ID]! ): FeeCharge
    unassignAccount( feeChargeId: ID! ): FeeCharge
    addLoanAccount(
            loanNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            principalAmount: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            outstandingPrincipal: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            interestRate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            originationDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            maturityDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            paymentDayOfMonth: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            currency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            LoanType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            RateType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Compounding: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): FeeCharge
    assignLoanAccount(  loanAccountId: [ID]! ): FeeCharge
    unassignLoanAccount( feeChargeId: ID! ): FeeCharge

}

type FeeChargeQueryResult {
cursor: String
hasMore: Boolean!
    feeChargePage: [FeeCharge]
}

"""
    ExchangeRate
"""
type ExchangeRate {
id: ID!
        baseCurrency: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        counterCurrency: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        rate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        asOf: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        source: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        bank: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        fxTrades: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    addBank(
            name: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            legalName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            swiftBic: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            headquartersCountry: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            website: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): ExchangeRate
    assignBank(  bankId: [ID]! ): ExchangeRate
    unassignBank( exchangeRateId: ID! ): ExchangeRate
    addToFxTrades(
            tradeReference: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            tradeDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            settlementDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            amountSold: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            amountBought: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            rate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): ExchangeRate
    assignToFxTrades( fxTradesIds: [ID]! ): ExchangeRate

}

type ExchangeRateQueryResult {
cursor: String
hasMore: Boolean!
    exchangeRatePage: [ExchangeRate]
}

"""
    FXTrade
"""
type FXTrade {
id: ID!
        tradeReference: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        tradeDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        settlementDate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        amountSold: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        amountBought: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        rate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        customer: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        bank: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        exchangeRate: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        sourceAccount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        destinationAccount: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        transaction: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    addCustomer(
            firstName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            lastName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            legalName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            dateOfBirth: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            taxId: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            email: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            phone: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            address: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            CustomerType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            RiskRating: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            KycStatus: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): FXTrade
    assignCustomer(  customerId: [ID]! ): FXTrade
    unassignCustomer( fXTradeId: ID! ): FXTrade
    addBank(
            name: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            legalName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            swiftBic: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            headquartersCountry: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            website: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): FXTrade
    assignBank(  bankId: [ID]! ): FXTrade
    unassignBank( fXTradeId: ID! ): FXTrade
    addExchangeRate(
            baseCurrency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            counterCurrency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            rate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            asOf: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            source: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): FXTrade
    assignExchangeRate(  exchangeRateId: [ID]! ): FXTrade
    unassignExchangeRate( fXTradeId: ID! ): FXTrade
    addSourceAccount(
            accountNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            iban: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            accountName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            currency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            openedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            closedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            AccountType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            OwnershipType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): FXTrade
    assignSourceAccount(  sourceAccountId: [ID]! ): FXTrade
    unassignSourceAccount( fXTradeId: ID! ): FXTrade
    addDestinationAccount(
            accountNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            iban: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            accountName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            currency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            openedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            closedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            AccountType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            OwnershipType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): FXTrade
    assignDestinationAccount(  destinationAccountId: [ID]! ): FXTrade
    unassignDestinationAccount( fXTradeId: ID! ): FXTrade
    addTransaction(
            bookingDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            valueDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            amount: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            description: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Direction: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            TransactionType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Channel: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): FXTrade
    assignTransaction(  transactionId: [ID]! ): FXTrade
    unassignTransaction( fXTradeId: ID! ): FXTrade

}

type FXTradeQueryResult {
cursor: String
hasMore: Boolean!
    fXTradePage: [FXTrade]
}

"""
    Dispute
"""
type Dispute {
id: ID!
        disputeReference: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        raisedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        reason: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        transaction: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        customer: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        account: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        paymentCard: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    addTransaction(
            bookingDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            valueDate: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            amount: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            description: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Direction: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            TransactionType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Channel: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Dispute
    assignTransaction(  transactionId: [ID]! ): Dispute
    unassignTransaction( disputeId: ID! ): Dispute
    addCustomer(
            firstName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            lastName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            legalName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            dateOfBirth: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            taxId: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            email: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            phone: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            address: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            CustomerType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            RiskRating: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            KycStatus: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Dispute
    assignCustomer(  customerId: [ID]! ): Dispute
    unassignCustomer( disputeId: ID! ): Dispute
    addAccount(
            accountNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            iban: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            accountName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            currency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            openedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            closedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            AccountType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            OwnershipType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Dispute
    assignAccount(  accountId: [ID]! ): Dispute
    unassignAccount( disputeId: ID! ): Dispute
    addPaymentCard(
            cardNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            embossedName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            expiryMonth: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            expiryYear: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            CardType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            CardStatus: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Network: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Dispute
    assignPaymentCard(  paymentCardId: [ID]! ): Dispute
    unassignPaymentCard( disputeId: ID! ): Dispute

}

type DisputeQueryResult {
cursor: String
hasMore: Boolean!
    disputePage: [Dispute]
}

"""
    Consent
"""
type Consent {
id: ID!
        grantedOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        expiresOn: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        customer: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        bank: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        authorizedAccounts: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        thirdPartyProvider: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        consentType: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        status: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    addCustomer(
            firstName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            lastName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            legalName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            dateOfBirth: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            taxId: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            email: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            phone: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            address: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            CustomerType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            RiskRating: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            KycStatus: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Consent
    assignCustomer(  customerId: [ID]! ): Consent
    unassignCustomer( consentId: ID! ): Consent
    addBank(
            name: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            legalName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            swiftBic: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            headquartersCountry: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            website: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Consent
    assignBank(  bankId: [ID]! ): Consent
    unassignBank( consentId: ID! ): Consent
    addThirdPartyProvider(
            name: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            registrationId: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            website: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Consent
    assignThirdPartyProvider(  thirdPartyProviderId: [ID]! ): Consent
    unassignThirdPartyProvider( consentId: ID! ): Consent
    addToAuthorizedAccounts(
            accountNumber: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            iban: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            accountName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            currency: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            openedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            closedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            AccountType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            OwnershipType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): Consent
    assignToAuthorizedAccounts( authorizedAccountsIds: [ID]! ): Consent

}

type ConsentQueryResult {
cursor: String
hasMore: Boolean!
    consentPage: [Consent]
}

"""
    ThirdPartyProvider
"""
type ThirdPartyProvider {
id: ID!
        name: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        registrationId: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        website: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        bank: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
        consents: #attributeTypeDeclaration(${attribute}, ${class}, ${outputTheAttributeType})
    addBank(
            name: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            legalName: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            swiftBic: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            headquartersCountry: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            website: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): ThirdPartyProvider
    assignBank(  bankId: [ID]! ): ThirdPartyProvider
    unassignBank( thirdPartyProviderId: ID! ): ThirdPartyProvider
    addToConsents(
            grantedOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            expiresOn: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            ConsentType: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
            Status: #attributeTypeDeclaration(${attribute}, ${childClass}, ${outputTheAttributeType})
    ): ThirdPartyProvider
    assignToConsents( consentsIds: [ID]! ): ThirdPartyProvider

}

type ThirdPartyProviderQueryResult {
cursor: String
hasMore: Boolean!
    thirdPartyProviderPage: [ThirdPartyProvider]
}


"""
    CustomerType
"""
enum CustomerType {
                Individual
            Business
            NonProfit
            Government
    }

"""
    AccountType
"""
enum AccountType {
                Checking
            Savings
            MoneyMarket
            TimeDeposit
    }

"""
    AccountStatus
"""
enum AccountStatus {
                Open
            Frozen
            Dormant
            Closed
    }

"""
    AccountOwnershipType
"""
enum AccountOwnershipType {
                Sole
            Joint
            Corporate
            Trust
    }

"""
    StatementDeliveryMethod
"""
enum StatementDeliveryMethod {
                Electronic
            Paper
    }

"""
    TransactionType
"""
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

"""
    TransactionStatus
"""
enum TransactionStatus {
                Pending
            Posted
            Reversed
            Failed
            Cancelled
    }

"""
    TransactionDirection
"""
enum TransactionDirection {
                Credit
            Debit
    }

"""
    ChannelType
"""
enum ChannelType {
                Branch
            Online
            Mobile
            ATM
            API
            CallCenter
    }

"""
    PaymentMethod
"""
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

"""
    PaymentStatus
"""
enum PaymentStatus {
                Initiated
            InProcess
            Settled
            Failed
            Reversed
            Cancelled
    }

"""
    StandingInstructionFrequency
"""
enum StandingInstructionFrequency {
                OneTime
            Weekly
            BiWeekly
            Monthly
            Quarterly
            Annually
    }

"""
    StandingInstructionStatus
"""
enum StandingInstructionStatus {
                Active
            Paused
            Cancelled
            Completed
    }

"""
    CardType
"""
enum CardType {
                Debit
            Credit
            Prepaid
            Virtual
    }

"""
    CardStatus
"""
enum CardStatus {
                Active
            Blocked
            LostStolen
            Expired
            Closed
    }

"""
    CardNetwork
"""
enum CardNetwork {
                Visa
            Mastercard
            Amex
            Discover
            UnionPay
            Other
    }

"""
    LoanType
"""
enum LoanType {
                Mortgage
            Personal
            Auto
            SmallBusiness
            CreditLine
            Student
    }

"""
    LoanStatus
"""
enum LoanStatus {
                Applied
            Approved
            Active
            Delinquent
            Defaulted
            Closed
    }

"""
    RateType
"""
enum RateType {
                Fixed
            Variable
    }

"""
    InterestCompounding
"""
enum InterestCompounding {
                Daily
            Monthly
            Quarterly
            Annually
    }

"""
    InstallmentStatus
"""
enum InstallmentStatus {
                Due
            Paid
            Overdue
            Deferred
    }

"""
    FeeType
"""
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

"""
    RiskRating
"""
enum RiskRating {
                Low
            Medium
            High
    }

"""
    KycStatus
"""
enum KycStatus {
                Pending
            Verified
            Rejected
            Expired
    }

"""
    IdentityDocumentType
"""
enum IdentityDocumentType {
                Passport
            NationalID
            DriverLicense
            ResidencePermit
            BusinessRegistration
            TaxCertificate
    }

"""
    ScreeningOutcome
"""
enum ScreeningOutcome {
                Clear
            Match
            Review
    }

"""
    TradeStatus
"""
enum TradeStatus {
                Booked
            Settled
            Cancelled
    }

"""
    ATMStatus
"""
enum ATMStatus {
                InService
            OutOfService
            Maintenance
    }

"""
    ConsentType
"""
enum ConsentType {
                OpenBanking
            PaymentInitiation
            AccountInformation
            Marketing
            DataSharing
    }

"""
    ConsentStatus
"""
enum ConsentStatus {
                Active
            Revoked
            Expired
    }

"""
    DisputeStatus
"""
enum DisputeStatus {
                Open
            UnderReview
            Resolved
            Rejected
            Withdrawn
    }

"""
    ProductCategory
"""
enum ProductCategory {
                Deposit
            Loan
            Card
            PaymentService
            Investment
    }

"""
    CollateralType
"""
enum CollateralType {
                RealEstate
            Vehicle
            Cash
            Securities
            Guarantee
            Equipment
    }


"""
    Money
"""
type Money {
                amount: #attributeTypeDeclaration(${attribute}, ${valueObject}, ${outputTheAttributeType})
            currency: #attributeTypeDeclaration(${attribute}, ${valueObject}, ${outputTheAttributeType})
    }
"""
    Address
"""
type Address {
                street: #attributeTypeDeclaration(${attribute}, ${valueObject}, ${outputTheAttributeType})
            city: #attributeTypeDeclaration(${attribute}, ${valueObject}, ${outputTheAttributeType})
            state: #attributeTypeDeclaration(${attribute}, ${valueObject}, ${outputTheAttributeType})
            postalCode: #attributeTypeDeclaration(${attribute}, ${valueObject}, ${outputTheAttributeType})
            country: #attributeTypeDeclaration(${attribute}, ${valueObject}, ${outputTheAttributeType})
    }
"""
    AccountNumber
"""
type AccountNumber {
                value: #attributeTypeDeclaration(${attribute}, ${valueObject}, ${outputTheAttributeType})
    }
"""
    IBAN
"""
type IBAN {
                value: #attributeTypeDeclaration(${attribute}, ${valueObject}, ${outputTheAttributeType})
    }
"""
    BIC
"""
type BIC {
                value: #attributeTypeDeclaration(${attribute}, ${valueObject}, ${outputTheAttributeType})
    }
"""
    CardPAN
"""
type CardPAN {
                value: #attributeTypeDeclaration(${attribute}, ${valueObject}, ${outputTheAttributeType})
    }
"""
    Percentage
"""
type Percentage {
                value: #attributeTypeDeclaration(${attribute}, ${valueObject}, ${outputTheAttributeType})
    }
`;
module.exports = typeDefs;
