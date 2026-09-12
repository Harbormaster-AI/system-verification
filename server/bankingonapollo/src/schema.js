const { gql } = require('apollo-server');
const typeDefs = gql`

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
      name: String!
      legalName: String!
      swiftBic: String!
      headquartersCountry: String!
      website: String!
    ): Bank
  
    updateBank(
      id: ID!
      name: String!
      legalName: String!
      swiftBic: String!
      headquartersCountry: String!
      website: String!
    ): Bank
    removeBank(id: ID!): Boolean
    addBranch(
      name: String!
      branchCode: String!
      address: String!
      phone: String!
      openingHours: String!
    ): Branch
  
    updateBranch(
      id: ID!
      name: String!
      branchCode: String!
      address: String!
      phone: String!
      openingHours: String!
    ): Branch
    removeBranch(id: ID!): Boolean
    addATM(
      terminalId: String!
      location: String!
      Status:  ATMStatus
    ): ATM
  
    updateATM(
      id: ID!
      terminalId: String!
      location: String!
      Status:  ATMStatus
    ): ATM
    removeATM(id: ID!): Boolean
    addCustomer(
      firstName: String!
      lastName: String!
      legalName: String!
      dateOfBirth: String!
      taxId: String!
      email: String!
      phone: String!
      address: String!
      CustomerType:  CustomerType
      RiskRating:  RiskRating
      KycStatus:  KycStatus
    ): Customer
  
    updateCustomer(
      id: ID!
      firstName: String!
      lastName: String!
      legalName: String!
      dateOfBirth: String!
      taxId: String!
      email: String!
      phone: String!
      address: String!
      CustomerType:  CustomerType
      RiskRating:  RiskRating
      KycStatus:  KycStatus
    ): Customer
    removeCustomer(id: ID!): Boolean
    addKycProfile(
      profileId: String!
      lastReviewedOn: String!
      Status:  KycStatus
    ): KycProfile
  
    updateKycProfile(
      id: ID!
      profileId: String!
      lastReviewedOn: String!
      Status:  KycStatus
    ): KycProfile
    removeKycProfile(id: ID!): Boolean
    addIdentityDocument(
      documentNumber: String!
      issuingCountry: String!
      expirationDate: String!
      DocumentType:  IdentityDocumentType
    ): IdentityDocument
  
    updateIdentityDocument(
      id: ID!
      documentNumber: String!
      issuingCountry: String!
      expirationDate: String!
      DocumentType:  IdentityDocumentType
    ): IdentityDocument
    removeIdentityDocument(id: ID!): Boolean
    addRiskAssessment(
      score: Int!
      assessedOn: String!
      Rating:  RiskRating
    ): RiskAssessment
  
    updateRiskAssessment(
      id: ID!
      score: Int!
      assessedOn: String!
      Rating:  RiskRating
    ): RiskAssessment
    removeRiskAssessment(id: ID!): Boolean
    addScreeningResult(
      screeningDate: String!
      provider: String!
      Outcome:  ScreeningOutcome
    ): ScreeningResult
  
    updateScreeningResult(
      id: ID!
      screeningDate: String!
      provider: String!
      Outcome:  ScreeningOutcome
    ): ScreeningResult
    removeScreeningResult(id: ID!): Boolean
    addBankingProduct(
      productCode: String!
      name: String!
      description: String!
      ProductCategory:  ProductCategory
    ): BankingProduct
  
    updateBankingProduct(
      id: ID!
      productCode: String!
      name: String!
      description: String!
      ProductCategory:  ProductCategory
    ): BankingProduct
    removeBankingProduct(id: ID!): Boolean
    addAccount(
      accountNumber: String!
      iban: String!
      accountName: String!
      currency: String!
      openedOn: String!
      closedOn: String!
      AccountType:  AccountType
      OwnershipType:  AccountOwnershipType
      Status:  AccountStatus
    ): Account
  
    updateAccount(
      id: ID!
      accountNumber: String!
      iban: String!
      accountName: String!
      currency: String!
      openedOn: String!
      closedOn: String!
      AccountType:  AccountType
      OwnershipType:  AccountOwnershipType
      Status:  AccountStatus
    ): Account
    removeAccount(id: ID!): Boolean
    addAccountStatement(
      statementNumber: String!
      periodStart: String!
      periodEnd: String!
      openingBalance: String!
      closingBalance: String!
      DeliveryMethod:  StatementDeliveryMethod
    ): AccountStatement
  
    updateAccountStatement(
      id: ID!
      statementNumber: String!
      periodStart: String!
      periodEnd: String!
      openingBalance: String!
      closingBalance: String!
      DeliveryMethod:  StatementDeliveryMethod
    ): AccountStatement
    removeAccountStatement(id: ID!): Boolean
    addTransaction(
      bookingDate: String!
      valueDate: String!
      amount: String!
      description: String!
      Direction:  TransactionDirection
      TransactionType:  TransactionType
      Status:  TransactionStatus
      Channel:  ChannelType
    ): Transaction
  
    updateTransaction(
      id: ID!
      bookingDate: String!
      valueDate: String!
      amount: String!
      description: String!
      Direction:  TransactionDirection
      TransactionType:  TransactionType
      Status:  TransactionStatus
      Channel:  ChannelType
    ): Transaction
    removeTransaction(id: ID!): Boolean
    addExternalAccount(
      name: String!
      iban: String!
      accountNumber: String!
      bic: String!
      bankName: String!
      country: String!
    ): ExternalAccount
  
    updateExternalAccount(
      id: ID!
      name: String!
      iban: String!
      accountNumber: String!
      bic: String!
      bankName: String!
      country: String!
    ): ExternalAccount
    removeExternalAccount(id: ID!): Boolean
    addFundsTransfer(
      transferReference: String!
      amount: String!
      requestedDate: String!
      executionDate: String!
      purpose: String!
      feeAmount: String!
      Method:  PaymentMethod
      Status:  PaymentStatus
    ): FundsTransfer
  
    updateFundsTransfer(
      id: ID!
      transferReference: String!
      amount: String!
      requestedDate: String!
      executionDate: String!
      purpose: String!
      feeAmount: String!
      Method:  PaymentMethod
      Status:  PaymentStatus
    ): FundsTransfer
    removeFundsTransfer(id: ID!): Boolean
    addStandingInstruction(
      instructionId: String!
      amount: String!
      nextExecutionDate: String!
      Frequency:  StandingInstructionFrequency
      Status:  StandingInstructionStatus
    ): StandingInstruction
  
    updateStandingInstruction(
      id: ID!
      instructionId: String!
      amount: String!
      nextExecutionDate: String!
      Frequency:  StandingInstructionFrequency
      Status:  StandingInstructionStatus
    ): StandingInstruction
    removeStandingInstruction(id: ID!): Boolean
    addPaymentCard(
      cardNumber: String!
      embossedName: String!
      expiryMonth: Int!
      expiryYear: Int!
      CardType:  CardType
      CardStatus:  CardStatus
      Network:  CardNetwork
    ): PaymentCard
  
    updatePaymentCard(
      id: ID!
      cardNumber: String!
      embossedName: String!
      expiryMonth: Int!
      expiryYear: Int!
      CardType:  CardType
      CardStatus:  CardStatus
      Network:  CardNetwork
    ): PaymentCard
    removePaymentCard(id: ID!): Boolean
    addLoanAccount(
      loanNumber: String!
      principalAmount: String!
      outstandingPrincipal: String!
      interestRate: String!
      originationDate: String!
      maturityDate: String!
      paymentDayOfMonth: Int!
      currency: String!
      LoanType:  LoanType
      RateType:  RateType
      Compounding:  InterestCompounding
      Status:  LoanStatus
    ): LoanAccount
  
    updateLoanAccount(
      id: ID!
      loanNumber: String!
      principalAmount: String!
      outstandingPrincipal: String!
      interestRate: String!
      originationDate: String!
      maturityDate: String!
      paymentDayOfMonth: Int!
      currency: String!
      LoanType:  LoanType
      RateType:  RateType
      Compounding:  InterestCompounding
      Status:  LoanStatus
    ): LoanAccount
    removeLoanAccount(id: ID!): Boolean
    addRepaymentSchedule(
      installmentNumber: Int!
      dueDate: String!
      principalDue: String!
      interestDue: String!
      totalDue: String!
      Status:  InstallmentStatus
    ): RepaymentSchedule
  
    updateRepaymentSchedule(
      id: ID!
      installmentNumber: Int!
      dueDate: String!
      principalDue: String!
      interestDue: String!
      totalDue: String!
      Status:  InstallmentStatus
    ): RepaymentSchedule
    removeRepaymentSchedule(id: ID!): Boolean
    addLoanPayment(
      paymentReference: String!
      amount: String!
      paymentDate: String!
      Method:  PaymentMethod
      Status:  PaymentStatus
    ): LoanPayment
  
    updateLoanPayment(
      id: ID!
      paymentReference: String!
      amount: String!
      paymentDate: String!
      Method:  PaymentMethod
      Status:  PaymentStatus
    ): LoanPayment
    removeLoanPayment(id: ID!): Boolean
    addCollateral(
      appraisedValue: String!
      description: String!
      location: String!
      CollateralType:  CollateralType
    ): Collateral
  
    updateCollateral(
      id: ID!
      appraisedValue: String!
      description: String!
      location: String!
      CollateralType:  CollateralType
    ): Collateral
    removeCollateral(id: ID!): Boolean
    addFeeCharge(
      feeCode: String!
      amount: String!
      appliedOn: String!
      FeeType:  FeeType
    ): FeeCharge
  
    updateFeeCharge(
      id: ID!
      feeCode: String!
      amount: String!
      appliedOn: String!
      FeeType:  FeeType
    ): FeeCharge
    removeFeeCharge(id: ID!): Boolean
    addExchangeRate(
      baseCurrency: String!
      counterCurrency: String!
      rate: String!
      asOf: String!
      source: String!
    ): ExchangeRate
  
    updateExchangeRate(
      id: ID!
      baseCurrency: String!
      counterCurrency: String!
      rate: String!
      asOf: String!
      source: String!
    ): ExchangeRate
    removeExchangeRate(id: ID!): Boolean
    addFXTrade(
      tradeReference: String!
      tradeDate: String!
      settlementDate: String!
      amountSold: String!
      amountBought: String!
      rate: String!
      Status:  TradeStatus
    ): FXTrade
  
    updateFXTrade(
      id: ID!
      tradeReference: String!
      tradeDate: String!
      settlementDate: String!
      amountSold: String!
      amountBought: String!
      rate: String!
      Status:  TradeStatus
    ): FXTrade
    removeFXTrade(id: ID!): Boolean
    addDispute(
      disputeReference: String!
      raisedOn: String!
      reason: String!
      Status:  DisputeStatus
    ): Dispute
  
    updateDispute(
      id: ID!
      disputeReference: String!
      raisedOn: String!
      reason: String!
      Status:  DisputeStatus
    ): Dispute
    removeDispute(id: ID!): Boolean
    addConsent(
      grantedOn: String!
      expiresOn: String!
      ConsentType:  ConsentType
      Status:  ConsentStatus
    ): Consent
  
    updateConsent(
      id: ID!
      grantedOn: String!
      expiresOn: String!
      ConsentType:  ConsentType
      Status:  ConsentStatus
    ): Consent
    removeConsent(id: ID!): Boolean
    addThirdPartyProvider(
      name: String!
      registrationId: String!
      website: String!
    ): ThirdPartyProvider
  
    updateThirdPartyProvider(
      id: ID!
      name: String!
      registrationId: String!
      website: String!
    ): ThirdPartyProvider
    removeThirdPartyProvider(id: ID!): Boolean
  }

"""
Bank
""" 
  type Bank {
    id: ID!  
    name: String!
    legalName: String!
    swiftBic: String!
    headquartersCountry: String!
    website: String!
    branches:  [Branch]
    products:  [BankingProduct]
    customers:  [Customer]
    accounts:  [Account]
    paymentCards:  [PaymentCard]
    loanAccounts:  [LoanAccount]
    exchangeRates:  [ExchangeRate]
    consents:  [Consent]
    thirdPartyProviders:  [ThirdPartyProvider]
    addToBranches(
      name: String!
      branchCode: String!
      address: String!
      phone: String!
      openingHours: String!
    ): Bank
    assignToBranches( branchesIds: [ID]! ): Bank
    addToProducts(
      productCode: String!
      name: String!
      description: String!
      ProductCategory:  ProductCategory
    ): Bank
    assignToProducts( productsIds: [ID]! ): Bank
    addToCustomers(
      firstName: String!
      lastName: String!
      legalName: String!
      dateOfBirth: String!
      taxId: String!
      email: String!
      phone: String!
      address: String!
      CustomerType:  CustomerType
      RiskRating:  RiskRating
      KycStatus:  KycStatus
    ): Bank
    assignToCustomers( customersIds: [ID]! ): Bank
    addToAccounts(
      accountNumber: String!
      iban: String!
      accountName: String!
      currency: String!
      openedOn: String!
      closedOn: String!
      AccountType:  AccountType
      OwnershipType:  AccountOwnershipType
      Status:  AccountStatus
    ): Bank
    assignToAccounts( accountsIds: [ID]! ): Bank
    addToPaymentCards(
      cardNumber: String!
      embossedName: String!
      expiryMonth: Int!
      expiryYear: Int!
      CardType:  CardType
      CardStatus:  CardStatus
      Network:  CardNetwork
    ): Bank
    assignToPaymentCards( paymentCardsIds: [ID]! ): Bank
    addToLoanAccounts(
      loanNumber: String!
      principalAmount: String!
      outstandingPrincipal: String!
      interestRate: String!
      originationDate: String!
      maturityDate: String!
      paymentDayOfMonth: Int!
      currency: String!
      LoanType:  LoanType
      RateType:  RateType
      Compounding:  InterestCompounding
      Status:  LoanStatus
    ): Bank
    assignToLoanAccounts( loanAccountsIds: [ID]! ): Bank
    addToExchangeRates(
      baseCurrency: String!
      counterCurrency: String!
      rate: String!
      asOf: String!
      source: String!
    ): Bank
    assignToExchangeRates( exchangeRatesIds: [ID]! ): Bank
    addToConsents(
      grantedOn: String!
      expiresOn: String!
      ConsentType:  ConsentType
      Status:  ConsentStatus
    ): Bank
    assignToConsents( consentsIds: [ID]! ): Bank
    addToThirdPartyProviders(
      name: String!
      registrationId: String!
      website: String!
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
    name: String!
    branchCode: String!
    address: String!
    phone: String!
    openingHours: String!
    bank: Bank
    accounts:  [Account]
    loanAccounts:  [LoanAccount]
    atms:  [ATM]
    addBank(
      name: String!
      legalName: String!
      swiftBic: String!
      headquartersCountry: String!
      website: String!
    ): Branch
    assignBank(  bankId: [ID]! ): Branch
    unassignBank( branchId: ID! ): Branch
    addToAccounts(
      accountNumber: String!
      iban: String!
      accountName: String!
      currency: String!
      openedOn: String!
      closedOn: String!
      AccountType:  AccountType
      OwnershipType:  AccountOwnershipType
      Status:  AccountStatus
    ): Branch
    assignToAccounts( accountsIds: [ID]! ): Branch
    addToLoanAccounts(
      loanNumber: String!
      principalAmount: String!
      outstandingPrincipal: String!
      interestRate: String!
      originationDate: String!
      maturityDate: String!
      paymentDayOfMonth: Int!
      currency: String!
      LoanType:  LoanType
      RateType:  RateType
      Compounding:  InterestCompounding
      Status:  LoanStatus
    ): Branch
    assignToLoanAccounts( loanAccountsIds: [ID]! ): Branch
    addToAtms(
      terminalId: String!
      location: String!
      Status:  ATMStatus
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
    terminalId: String!
    location: String!
    branch: Branch
    status:  ATMStatus
    addBranch(
      name: String!
      branchCode: String!
      address: String!
      phone: String!
      openingHours: String!
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
    firstName: String!
    lastName: String!
    legalName: String!
    dateOfBirth: String!
    taxId: String!
    email: String!
    phone: String!
    address: String!
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
    addBank(
      name: String!
      legalName: String!
      swiftBic: String!
      headquartersCountry: String!
      website: String!
    ): Customer
    assignBank(  bankId: [ID]! ): Customer
    unassignBank( customerId: ID! ): Customer
    addToAccounts(
      accountNumber: String!
      iban: String!
      accountName: String!
      currency: String!
      openedOn: String!
      closedOn: String!
      AccountType:  AccountType
      OwnershipType:  AccountOwnershipType
      Status:  AccountStatus
    ): Customer
    assignToAccounts( accountsIds: [ID]! ): Customer
    addToLoanAccounts(
      loanNumber: String!
      principalAmount: String!
      outstandingPrincipal: String!
      interestRate: String!
      originationDate: String!
      maturityDate: String!
      paymentDayOfMonth: Int!
      currency: String!
      LoanType:  LoanType
      RateType:  RateType
      Compounding:  InterestCompounding
      Status:  LoanStatus
    ): Customer
    assignToLoanAccounts( loanAccountsIds: [ID]! ): Customer
    addToPaymentCards(
      cardNumber: String!
      embossedName: String!
      expiryMonth: Int!
      expiryYear: Int!
      CardType:  CardType
      CardStatus:  CardStatus
      Network:  CardNetwork
    ): Customer
    assignToPaymentCards( paymentCardsIds: [ID]! ): Customer
    addToExternalAccounts(
      name: String!
      iban: String!
      accountNumber: String!
      bic: String!
      bankName: String!
      country: String!
    ): Customer
    assignToExternalAccounts( externalAccountsIds: [ID]! ): Customer
    addToFundsTransfers(
      transferReference: String!
      amount: String!
      requestedDate: String!
      executionDate: String!
      purpose: String!
      feeAmount: String!
      Method:  PaymentMethod
      Status:  PaymentStatus
    ): Customer
    assignToFundsTransfers( fundsTransfersIds: [ID]! ): Customer
    addToDisputes(
      disputeReference: String!
      raisedOn: String!
      reason: String!
      Status:  DisputeStatus
    ): Customer
    assignToDisputes( disputesIds: [ID]! ): Customer
    addToKycProfiles(
      profileId: String!
      lastReviewedOn: String!
      Status:  KycStatus
    ): Customer
    assignToKycProfiles( kycProfilesIds: [ID]! ): Customer
    addToConsents(
      grantedOn: String!
      expiresOn: String!
      ConsentType:  ConsentType
      Status:  ConsentStatus
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
    profileId: String!
    lastReviewedOn: String!
    customer: Customer
    identityDocuments:  [IdentityDocument]
    riskAssessments:  [RiskAssessment]
    screenings:  [ScreeningResult]
    status:  KycStatus
    addCustomer(
      firstName: String!
      lastName: String!
      legalName: String!
      dateOfBirth: String!
      taxId: String!
      email: String!
      phone: String!
      address: String!
      CustomerType:  CustomerType
      RiskRating:  RiskRating
      KycStatus:  KycStatus
    ): KycProfile
    assignCustomer(  customerId: [ID]! ): KycProfile
    unassignCustomer( kycProfileId: ID! ): KycProfile
    addToIdentityDocuments(
      documentNumber: String!
      issuingCountry: String!
      expirationDate: String!
      DocumentType:  IdentityDocumentType
    ): KycProfile
    assignToIdentityDocuments( identityDocumentsIds: [ID]! ): KycProfile
    addToRiskAssessments(
      score: Int!
      assessedOn: String!
      Rating:  RiskRating
    ): KycProfile
    assignToRiskAssessments( riskAssessmentsIds: [ID]! ): KycProfile
    addToScreenings(
      screeningDate: String!
      provider: String!
      Outcome:  ScreeningOutcome
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
    documentNumber: String!
    issuingCountry: String!
    expirationDate: String!
    kycProfile: KycProfile
    documentType:  IdentityDocumentType
    addKycProfile(
      profileId: String!
      lastReviewedOn: String!
      Status:  KycStatus
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
    score: Int!
    assessedOn: String!
    kycProfile: KycProfile
    rating:  RiskRating
    addKycProfile(
      profileId: String!
      lastReviewedOn: String!
      Status:  KycStatus
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
    screeningDate: String!
    provider: String!
    kycProfile: KycProfile
    outcome:  ScreeningOutcome
    addKycProfile(
      profileId: String!
      lastReviewedOn: String!
      Status:  KycStatus
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
    productCode: String!
    name: String!
    description: String!
    bank: Bank
    accounts:  [Account]
    loanAccounts:  [LoanAccount]
    paymentCards:  [PaymentCard]
    productCategory:  ProductCategory
    addBank(
      name: String!
      legalName: String!
      swiftBic: String!
      headquartersCountry: String!
      website: String!
    ): BankingProduct
    assignBank(  bankId: [ID]! ): BankingProduct
    unassignBank( bankingProductId: ID! ): BankingProduct
    addToAccounts(
      accountNumber: String!
      iban: String!
      accountName: String!
      currency: String!
      openedOn: String!
      closedOn: String!
      AccountType:  AccountType
      OwnershipType:  AccountOwnershipType
      Status:  AccountStatus
    ): BankingProduct
    assignToAccounts( accountsIds: [ID]! ): BankingProduct
    addToLoanAccounts(
      loanNumber: String!
      principalAmount: String!
      outstandingPrincipal: String!
      interestRate: String!
      originationDate: String!
      maturityDate: String!
      paymentDayOfMonth: Int!
      currency: String!
      LoanType:  LoanType
      RateType:  RateType
      Compounding:  InterestCompounding
      Status:  LoanStatus
    ): BankingProduct
    assignToLoanAccounts( loanAccountsIds: [ID]! ): BankingProduct
    addToPaymentCards(
      cardNumber: String!
      embossedName: String!
      expiryMonth: Int!
      expiryYear: Int!
      CardType:  CardType
      CardStatus:  CardStatus
      Network:  CardNetwork
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
    accountNumber: String!
    iban: String!
    accountName: String!
    currency: String!
    openedOn: String!
    closedOn: String!
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
    addBank(
      name: String!
      legalName: String!
      swiftBic: String!
      headquartersCountry: String!
      website: String!
    ): Account
    assignBank(  bankId: [ID]! ): Account
    unassignBank( accountId: ID! ): Account
    addBranch(
      name: String!
      branchCode: String!
      address: String!
      phone: String!
      openingHours: String!
    ): Account
    assignBranch(  branchId: [ID]! ): Account
    unassignBranch( accountId: ID! ): Account
    addProduct(
      productCode: String!
      name: String!
      description: String!
      ProductCategory:  ProductCategory
    ): Account
    assignProduct(  productId: [ID]! ): Account
    unassignProduct( accountId: ID! ): Account
    addToOwners(
      firstName: String!
      lastName: String!
      legalName: String!
      dateOfBirth: String!
      taxId: String!
      email: String!
      phone: String!
      address: String!
      CustomerType:  CustomerType
      RiskRating:  RiskRating
      KycStatus:  KycStatus
    ): Account
    assignToOwners( ownersIds: [ID]! ): Account
    addToTransactions(
      bookingDate: String!
      valueDate: String!
      amount: String!
      description: String!
      Direction:  TransactionDirection
      TransactionType:  TransactionType
      Status:  TransactionStatus
      Channel:  ChannelType
    ): Account
    assignToTransactions( transactionsIds: [ID]! ): Account
    addToStatements(
      statementNumber: String!
      periodStart: String!
      periodEnd: String!
      openingBalance: String!
      closingBalance: String!
      DeliveryMethod:  StatementDeliveryMethod
    ): Account
    assignToStatements( statementsIds: [ID]! ): Account
    addToStandingInstructions(
      instructionId: String!
      amount: String!
      nextExecutionDate: String!
      Frequency:  StandingInstructionFrequency
      Status:  StandingInstructionStatus
    ): Account
    assignToStandingInstructions( standingInstructionsIds: [ID]! ): Account
    addToFeeCharges(
      feeCode: String!
      amount: String!
      appliedOn: String!
      FeeType:  FeeType
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
    statementNumber: String!
    periodStart: String!
    periodEnd: String!
    openingBalance: String!
    closingBalance: String!
    account: Account
    deliveryMethod:  StatementDeliveryMethod
    addAccount(
      accountNumber: String!
      iban: String!
      accountName: String!
      currency: String!
      openedOn: String!
      closedOn: String!
      AccountType:  AccountType
      OwnershipType:  AccountOwnershipType
      Status:  AccountStatus
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
    bookingDate: String!
    valueDate: String!
    amount: String!
    description: String!
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
    addAccount(
      accountNumber: String!
      iban: String!
      accountName: String!
      currency: String!
      openedOn: String!
      closedOn: String!
      AccountType:  AccountType
      OwnershipType:  AccountOwnershipType
      Status:  AccountStatus
    ): Transaction
    assignAccount(  accountId: [ID]! ): Transaction
    unassignAccount( transactionId: ID! ): Transaction
    addExternalCounterparty(
      name: String!
      iban: String!
      accountNumber: String!
      bic: String!
      bankName: String!
      country: String!
    ): Transaction
    assignExternalCounterparty(  externalCounterpartyId: [ID]! ): Transaction
    unassignExternalCounterparty( transactionId: ID! ): Transaction
    addPaymentCard(
      cardNumber: String!
      embossedName: String!
      expiryMonth: Int!
      expiryYear: Int!
      CardType:  CardType
      CardStatus:  CardStatus
      Network:  CardNetwork
    ): Transaction
    assignPaymentCard(  paymentCardId: [ID]! ): Transaction
    unassignPaymentCard( transactionId: ID! ): Transaction
    addFundsTransfer(
      transferReference: String!
      amount: String!
      requestedDate: String!
      executionDate: String!
      purpose: String!
      feeAmount: String!
      Method:  PaymentMethod
      Status:  PaymentStatus
    ): Transaction
    assignFundsTransfer(  fundsTransferId: [ID]! ): Transaction
    unassignFundsTransfer( transactionId: ID! ): Transaction
    addFxTrade(
      tradeReference: String!
      tradeDate: String!
      settlementDate: String!
      amountSold: String!
      amountBought: String!
      rate: String!
      Status:  TradeStatus
    ): Transaction
    assignFxTrade(  fxTradeId: [ID]! ): Transaction
    unassignFxTrade( transactionId: ID! ): Transaction
    addDispute(
      disputeReference: String!
      raisedOn: String!
      reason: String!
      Status:  DisputeStatus
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
    name: String!
    iban: String!
    accountNumber: String!
    bic: String!
    bankName: String!
    country: String!
    customer: Customer
    transactions:  [Transaction]
    addCustomer(
      firstName: String!
      lastName: String!
      legalName: String!
      dateOfBirth: String!
      taxId: String!
      email: String!
      phone: String!
      address: String!
      CustomerType:  CustomerType
      RiskRating:  RiskRating
      KycStatus:  KycStatus
    ): ExternalAccount
    assignCustomer(  customerId: [ID]! ): ExternalAccount
    unassignCustomer( externalAccountId: ID! ): ExternalAccount
    addToTransactions(
      bookingDate: String!
      valueDate: String!
      amount: String!
      description: String!
      Direction:  TransactionDirection
      TransactionType:  TransactionType
      Status:  TransactionStatus
      Channel:  ChannelType
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
    transferReference: String!
    amount: String!
    requestedDate: String!
    executionDate: String!
    purpose: String!
    feeAmount: String!
    sourceAccount: Account
    destinationAccount: Account
    externalBeneficiary: ExternalAccount
    initiatedBy: Customer
    transactions:  [Transaction]
    method:  PaymentMethod
    status:  PaymentStatus
    addSourceAccount(
      accountNumber: String!
      iban: String!
      accountName: String!
      currency: String!
      openedOn: String!
      closedOn: String!
      AccountType:  AccountType
      OwnershipType:  AccountOwnershipType
      Status:  AccountStatus
    ): FundsTransfer
    assignSourceAccount(  sourceAccountId: [ID]! ): FundsTransfer
    unassignSourceAccount( fundsTransferId: ID! ): FundsTransfer
    addDestinationAccount(
      accountNumber: String!
      iban: String!
      accountName: String!
      currency: String!
      openedOn: String!
      closedOn: String!
      AccountType:  AccountType
      OwnershipType:  AccountOwnershipType
      Status:  AccountStatus
    ): FundsTransfer
    assignDestinationAccount(  destinationAccountId: [ID]! ): FundsTransfer
    unassignDestinationAccount( fundsTransferId: ID! ): FundsTransfer
    addExternalBeneficiary(
      name: String!
      iban: String!
      accountNumber: String!
      bic: String!
      bankName: String!
      country: String!
    ): FundsTransfer
    assignExternalBeneficiary(  externalBeneficiaryId: [ID]! ): FundsTransfer
    unassignExternalBeneficiary( fundsTransferId: ID! ): FundsTransfer
    addInitiatedBy(
      firstName: String!
      lastName: String!
      legalName: String!
      dateOfBirth: String!
      taxId: String!
      email: String!
      phone: String!
      address: String!
      CustomerType:  CustomerType
      RiskRating:  RiskRating
      KycStatus:  KycStatus
    ): FundsTransfer
    assignInitiatedBy(  initiatedById: [ID]! ): FundsTransfer
    unassignInitiatedBy( fundsTransferId: ID! ): FundsTransfer
    addToTransactions(
      bookingDate: String!
      valueDate: String!
      amount: String!
      description: String!
      Direction:  TransactionDirection
      TransactionType:  TransactionType
      Status:  TransactionStatus
      Channel:  ChannelType
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
    instructionId: String!
    amount: String!
    nextExecutionDate: String!
    account: Account
    beneficiary: ExternalAccount
    frequency:  StandingInstructionFrequency
    status:  StandingInstructionStatus
    addAccount(
      accountNumber: String!
      iban: String!
      accountName: String!
      currency: String!
      openedOn: String!
      closedOn: String!
      AccountType:  AccountType
      OwnershipType:  AccountOwnershipType
      Status:  AccountStatus
    ): StandingInstruction
    assignAccount(  accountId: [ID]! ): StandingInstruction
    unassignAccount( standingInstructionId: ID! ): StandingInstruction
    addBeneficiary(
      name: String!
      iban: String!
      accountNumber: String!
      bic: String!
      bankName: String!
      country: String!
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
    cardNumber: String!
    embossedName: String!
    expiryMonth: Int!
    expiryYear: Int!
    bank: Bank
    account: Account
    customer: Customer
    transactions:  [Transaction]
    cardType:  CardType
    cardStatus:  CardStatus
    network:  CardNetwork
    addBank(
      name: String!
      legalName: String!
      swiftBic: String!
      headquartersCountry: String!
      website: String!
    ): PaymentCard
    assignBank(  bankId: [ID]! ): PaymentCard
    unassignBank( paymentCardId: ID! ): PaymentCard
    addAccount(
      accountNumber: String!
      iban: String!
      accountName: String!
      currency: String!
      openedOn: String!
      closedOn: String!
      AccountType:  AccountType
      OwnershipType:  AccountOwnershipType
      Status:  AccountStatus
    ): PaymentCard
    assignAccount(  accountId: [ID]! ): PaymentCard
    unassignAccount( paymentCardId: ID! ): PaymentCard
    addCustomer(
      firstName: String!
      lastName: String!
      legalName: String!
      dateOfBirth: String!
      taxId: String!
      email: String!
      phone: String!
      address: String!
      CustomerType:  CustomerType
      RiskRating:  RiskRating
      KycStatus:  KycStatus
    ): PaymentCard
    assignCustomer(  customerId: [ID]! ): PaymentCard
    unassignCustomer( paymentCardId: ID! ): PaymentCard
    addToTransactions(
      bookingDate: String!
      valueDate: String!
      amount: String!
      description: String!
      Direction:  TransactionDirection
      TransactionType:  TransactionType
      Status:  TransactionStatus
      Channel:  ChannelType
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
    loanNumber: String!
    principalAmount: String!
    outstandingPrincipal: String!
    interestRate: String!
    originationDate: String!
    maturityDate: String!
    paymentDayOfMonth: Int!
    currency: String!
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
    addBank(
      name: String!
      legalName: String!
      swiftBic: String!
      headquartersCountry: String!
      website: String!
    ): LoanAccount
    assignBank(  bankId: [ID]! ): LoanAccount
    unassignBank( loanAccountId: ID! ): LoanAccount
    addBranch(
      name: String!
      branchCode: String!
      address: String!
      phone: String!
      openingHours: String!
    ): LoanAccount
    assignBranch(  branchId: [ID]! ): LoanAccount
    unassignBranch( loanAccountId: ID! ): LoanAccount
    addProduct(
      productCode: String!
      name: String!
      description: String!
      ProductCategory:  ProductCategory
    ): LoanAccount
    assignProduct(  productId: [ID]! ): LoanAccount
    unassignProduct( loanAccountId: ID! ): LoanAccount
    addToBorrowers(
      firstName: String!
      lastName: String!
      legalName: String!
      dateOfBirth: String!
      taxId: String!
      email: String!
      phone: String!
      address: String!
      CustomerType:  CustomerType
      RiskRating:  RiskRating
      KycStatus:  KycStatus
    ): LoanAccount
    assignToBorrowers( borrowersIds: [ID]! ): LoanAccount
    addToRepaymentSchedule(
      installmentNumber: Int!
      dueDate: String!
      principalDue: String!
      interestDue: String!
      totalDue: String!
      Status:  InstallmentStatus
    ): LoanAccount
    assignToRepaymentSchedule( repaymentScheduleIds: [ID]! ): LoanAccount
    addToPayments(
      paymentReference: String!
      amount: String!
      paymentDate: String!
      Method:  PaymentMethod
      Status:  PaymentStatus
    ): LoanAccount
    assignToPayments( paymentsIds: [ID]! ): LoanAccount
    addToCollateral(
      appraisedValue: String!
      description: String!
      location: String!
      CollateralType:  CollateralType
    ): LoanAccount
    assignToCollateral( collateralIds: [ID]! ): LoanAccount
    addToFeeCharges(
      feeCode: String!
      amount: String!
      appliedOn: String!
      FeeType:  FeeType
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
    installmentNumber: Int!
    dueDate: String!
    principalDue: String!
    interestDue: String!
    totalDue: String!
    loanAccount: LoanAccount
    payment: LoanPayment
    status:  InstallmentStatus
    addLoanAccount(
      loanNumber: String!
      principalAmount: String!
      outstandingPrincipal: String!
      interestRate: String!
      originationDate: String!
      maturityDate: String!
      paymentDayOfMonth: Int!
      currency: String!
      LoanType:  LoanType
      RateType:  RateType
      Compounding:  InterestCompounding
      Status:  LoanStatus
    ): RepaymentSchedule
    assignLoanAccount(  loanAccountId: [ID]! ): RepaymentSchedule
    unassignLoanAccount( repaymentScheduleId: ID! ): RepaymentSchedule
    addPayment(
      paymentReference: String!
      amount: String!
      paymentDate: String!
      Method:  PaymentMethod
      Status:  PaymentStatus
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
    paymentReference: String!
    amount: String!
    paymentDate: String!
    loanAccount: LoanAccount
    transaction: Transaction
    method:  PaymentMethod
    status:  PaymentStatus
    addLoanAccount(
      loanNumber: String!
      principalAmount: String!
      outstandingPrincipal: String!
      interestRate: String!
      originationDate: String!
      maturityDate: String!
      paymentDayOfMonth: Int!
      currency: String!
      LoanType:  LoanType
      RateType:  RateType
      Compounding:  InterestCompounding
      Status:  LoanStatus
    ): LoanPayment
    assignLoanAccount(  loanAccountId: [ID]! ): LoanPayment
    unassignLoanAccount( loanPaymentId: ID! ): LoanPayment
    addTransaction(
      bookingDate: String!
      valueDate: String!
      amount: String!
      description: String!
      Direction:  TransactionDirection
      TransactionType:  TransactionType
      Status:  TransactionStatus
      Channel:  ChannelType
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
    appraisedValue: String!
    description: String!
    location: String!
    loanAccount: LoanAccount
    collateralType:  CollateralType
    addLoanAccount(
      loanNumber: String!
      principalAmount: String!
      outstandingPrincipal: String!
      interestRate: String!
      originationDate: String!
      maturityDate: String!
      paymentDayOfMonth: Int!
      currency: String!
      LoanType:  LoanType
      RateType:  RateType
      Compounding:  InterestCompounding
      Status:  LoanStatus
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
    feeCode: String!
    amount: String!
    appliedOn: String!
    account: Account
    loanAccount: LoanAccount
    feeType:  FeeType
    addAccount(
      accountNumber: String!
      iban: String!
      accountName: String!
      currency: String!
      openedOn: String!
      closedOn: String!
      AccountType:  AccountType
      OwnershipType:  AccountOwnershipType
      Status:  AccountStatus
    ): FeeCharge
    assignAccount(  accountId: [ID]! ): FeeCharge
    unassignAccount( feeChargeId: ID! ): FeeCharge
    addLoanAccount(
      loanNumber: String!
      principalAmount: String!
      outstandingPrincipal: String!
      interestRate: String!
      originationDate: String!
      maturityDate: String!
      paymentDayOfMonth: Int!
      currency: String!
      LoanType:  LoanType
      RateType:  RateType
      Compounding:  InterestCompounding
      Status:  LoanStatus
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
    baseCurrency: String!
    counterCurrency: String!
    rate: String!
    asOf: String!
    source: String!
    bank: Bank
    fxTrades:  [FXTrade]
    addBank(
      name: String!
      legalName: String!
      swiftBic: String!
      headquartersCountry: String!
      website: String!
    ): ExchangeRate
    assignBank(  bankId: [ID]! ): ExchangeRate
    unassignBank( exchangeRateId: ID! ): ExchangeRate
    addToFxTrades(
      tradeReference: String!
      tradeDate: String!
      settlementDate: String!
      amountSold: String!
      amountBought: String!
      rate: String!
      Status:  TradeStatus
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
    tradeReference: String!
    tradeDate: String!
    settlementDate: String!
    amountSold: String!
    amountBought: String!
    rate: String!
    customer: Customer
    bank: Bank
    exchangeRate: ExchangeRate
    sourceAccount: Account
    destinationAccount: Account
    transaction: Transaction
    status:  TradeStatus
    addCustomer(
      firstName: String!
      lastName: String!
      legalName: String!
      dateOfBirth: String!
      taxId: String!
      email: String!
      phone: String!
      address: String!
      CustomerType:  CustomerType
      RiskRating:  RiskRating
      KycStatus:  KycStatus
    ): FXTrade
    assignCustomer(  customerId: [ID]! ): FXTrade
    unassignCustomer( fXTradeId: ID! ): FXTrade
    addBank(
      name: String!
      legalName: String!
      swiftBic: String!
      headquartersCountry: String!
      website: String!
    ): FXTrade
    assignBank(  bankId: [ID]! ): FXTrade
    unassignBank( fXTradeId: ID! ): FXTrade
    addExchangeRate(
      baseCurrency: String!
      counterCurrency: String!
      rate: String!
      asOf: String!
      source: String!
    ): FXTrade
    assignExchangeRate(  exchangeRateId: [ID]! ): FXTrade
    unassignExchangeRate( fXTradeId: ID! ): FXTrade
    addSourceAccount(
      accountNumber: String!
      iban: String!
      accountName: String!
      currency: String!
      openedOn: String!
      closedOn: String!
      AccountType:  AccountType
      OwnershipType:  AccountOwnershipType
      Status:  AccountStatus
    ): FXTrade
    assignSourceAccount(  sourceAccountId: [ID]! ): FXTrade
    unassignSourceAccount( fXTradeId: ID! ): FXTrade
    addDestinationAccount(
      accountNumber: String!
      iban: String!
      accountName: String!
      currency: String!
      openedOn: String!
      closedOn: String!
      AccountType:  AccountType
      OwnershipType:  AccountOwnershipType
      Status:  AccountStatus
    ): FXTrade
    assignDestinationAccount(  destinationAccountId: [ID]! ): FXTrade
    unassignDestinationAccount( fXTradeId: ID! ): FXTrade
    addTransaction(
      bookingDate: String!
      valueDate: String!
      amount: String!
      description: String!
      Direction:  TransactionDirection
      TransactionType:  TransactionType
      Status:  TransactionStatus
      Channel:  ChannelType
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
    disputeReference: String!
    raisedOn: String!
    reason: String!
    transaction: Transaction
    customer: Customer
    account: Account
    paymentCard: PaymentCard
    status:  DisputeStatus
    addTransaction(
      bookingDate: String!
      valueDate: String!
      amount: String!
      description: String!
      Direction:  TransactionDirection
      TransactionType:  TransactionType
      Status:  TransactionStatus
      Channel:  ChannelType
    ): Dispute
    assignTransaction(  transactionId: [ID]! ): Dispute
    unassignTransaction( disputeId: ID! ): Dispute
    addCustomer(
      firstName: String!
      lastName: String!
      legalName: String!
      dateOfBirth: String!
      taxId: String!
      email: String!
      phone: String!
      address: String!
      CustomerType:  CustomerType
      RiskRating:  RiskRating
      KycStatus:  KycStatus
    ): Dispute
    assignCustomer(  customerId: [ID]! ): Dispute
    unassignCustomer( disputeId: ID! ): Dispute
    addAccount(
      accountNumber: String!
      iban: String!
      accountName: String!
      currency: String!
      openedOn: String!
      closedOn: String!
      AccountType:  AccountType
      OwnershipType:  AccountOwnershipType
      Status:  AccountStatus
    ): Dispute
    assignAccount(  accountId: [ID]! ): Dispute
    unassignAccount( disputeId: ID! ): Dispute
    addPaymentCard(
      cardNumber: String!
      embossedName: String!
      expiryMonth: Int!
      expiryYear: Int!
      CardType:  CardType
      CardStatus:  CardStatus
      Network:  CardNetwork
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
    grantedOn: String!
    expiresOn: String!
    customer: Customer
    bank: Bank
    authorizedAccounts:  [Account]
    thirdPartyProvider: ThirdPartyProvider
    consentType:  ConsentType
    status:  ConsentStatus
    addCustomer(
      firstName: String!
      lastName: String!
      legalName: String!
      dateOfBirth: String!
      taxId: String!
      email: String!
      phone: String!
      address: String!
      CustomerType:  CustomerType
      RiskRating:  RiskRating
      KycStatus:  KycStatus
    ): Consent
    assignCustomer(  customerId: [ID]! ): Consent
    unassignCustomer( consentId: ID! ): Consent
    addBank(
      name: String!
      legalName: String!
      swiftBic: String!
      headquartersCountry: String!
      website: String!
    ): Consent
    assignBank(  bankId: [ID]! ): Consent
    unassignBank( consentId: ID! ): Consent
    addThirdPartyProvider(
      name: String!
      registrationId: String!
      website: String!
    ): Consent
    assignThirdPartyProvider(  thirdPartyProviderId: [ID]! ): Consent
    unassignThirdPartyProvider( consentId: ID! ): Consent
    addToAuthorizedAccounts(
      accountNumber: String!
      iban: String!
      accountName: String!
      currency: String!
      openedOn: String!
      closedOn: String!
      AccountType:  AccountType
      OwnershipType:  AccountOwnershipType
      Status:  AccountStatus
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
    name: String!
    registrationId: String!
    website: String!
    bank: Bank
    consents:  [Consent]
    addBank(
      name: String!
      legalName: String!
      swiftBic: String!
      headquartersCountry: String!
      website: String!
    ): ThirdPartyProvider
    assignBank(  bankId: [ID]! ): ThirdPartyProvider
    unassignBank( thirdPartyProviderId: ID! ): ThirdPartyProvider
    addToConsents(
      grantedOn: String!
      expiresOn: String!
      ConsentType:  ConsentType
      Status:  ConsentStatus
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
  
`;
module.exports = typeDefs;
