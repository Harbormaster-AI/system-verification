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
} from "./types";

export interface PaginationOptions {
    pageSize?: number;
    after?: string;
}

export interface BackendAPI {
    // -----------------------------------------
    // Bank interface
    // -----------------------------------------
    bank: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<Bank | null>;
        findAll(options?: PaginationOptions): Promise<Bank[]>;
        add(input: Bank): Promise<Bank>;
        update(id: string, input: Bank): Promise<Bank>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------


        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        branches(parentId: string,options?: PaginationOptions): Promise<Branch[]>;
        addBranchesToBank(parentId: string,input: Branch): Promise<Bank>;
        removeBranchesFromBank(parentId: string,childIds: string[]): Promise<Bank>;

        products(parentId: string,options?: PaginationOptions): Promise<BankingProduct[]>;
        addProductsToBank(parentId: string,input: BankingProduct): Promise<Bank>;
        removeProductsFromBank(parentId: string,childIds: string[]): Promise<Bank>;

        customers(parentId: string,options?: PaginationOptions): Promise<Customer[]>;
        addCustomersToBank(parentId: string,input: Customer): Promise<Bank>;
        removeCustomersFromBank(parentId: string,childIds: string[]): Promise<Bank>;

        accounts(parentId: string,options?: PaginationOptions): Promise<Account[]>;
        addAccountsToBank(parentId: string,input: Account): Promise<Bank>;
        removeAccountsFromBank(parentId: string,childIds: string[]): Promise<Bank>;

        paymentCards(parentId: string,options?: PaginationOptions): Promise<PaymentCard[]>;
        addPaymentCardsToBank(parentId: string,input: PaymentCard): Promise<Bank>;
        removePaymentCardsFromBank(parentId: string,childIds: string[]): Promise<Bank>;

        loanAccounts(parentId: string,options?: PaginationOptions): Promise<LoanAccount[]>;
        addLoanAccountsToBank(parentId: string,input: LoanAccount): Promise<Bank>;
        removeLoanAccountsFromBank(parentId: string,childIds: string[]): Promise<Bank>;

        exchangeRates(parentId: string,options?: PaginationOptions): Promise<ExchangeRate[]>;
        addExchangeRatesToBank(parentId: string,input: ExchangeRate): Promise<Bank>;
        removeExchangeRatesFromBank(parentId: string,childIds: string[]): Promise<Bank>;

        consents(parentId: string,options?: PaginationOptions): Promise<Consent[]>;
        addConsentsToBank(parentId: string,input: Consent): Promise<Bank>;
        removeConsentsFromBank(parentId: string,childIds: string[]): Promise<Bank>;

        thirdPartyProviders(parentId: string,options?: PaginationOptions): Promise<ThirdPartyProvider[]>;
        addThirdPartyProvidersToBank(parentId: string,input: ThirdPartyProvider): Promise<Bank>;
        removeThirdPartyProvidersFromBank(parentId: string,childIds: string[]): Promise<Bank>;

    };
    // -----------------------------------------
    // Branch interface
    // -----------------------------------------
    branch: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<Branch | null>;
        findAll(options?: PaginationOptions): Promise<Branch[]>;
        add(input: Branch): Promise<Branch>;
        update(id: string, input: Branch): Promise<Branch>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        bank(parentId: string): Promise<Bank | null>;
        assignBankToBranch(parentId: string,childId: string): Promise<Branch>;
        unassignBankFromBranch(parentId: string,childId: string): Promise<Branch>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        accounts(parentId: string,options?: PaginationOptions): Promise<Account[]>;
        addAccountsToBranch(parentId: string,input: Account): Promise<Branch>;
        removeAccountsFromBranch(parentId: string,childIds: string[]): Promise<Branch>;

        loanAccounts(parentId: string,options?: PaginationOptions): Promise<LoanAccount[]>;
        addLoanAccountsToBranch(parentId: string,input: LoanAccount): Promise<Branch>;
        removeLoanAccountsFromBranch(parentId: string,childIds: string[]): Promise<Branch>;

        atms(parentId: string,options?: PaginationOptions): Promise<ATM[]>;
        addAtmsToBranch(parentId: string,input: ATM): Promise<Branch>;
        removeAtmsFromBranch(parentId: string,childIds: string[]): Promise<Branch>;

    };
    // -----------------------------------------
    // ATM interface
    // -----------------------------------------
    aTM: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<ATM | null>;
        findAll(options?: PaginationOptions): Promise<ATM[]>;
        add(input: ATM): Promise<ATM>;
        update(id: string, input: ATM): Promise<ATM>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        branch(parentId: string): Promise<Branch | null>;
        assignBranchToATM(parentId: string,childId: string): Promise<ATM>;
        unassignBranchFromATM(parentId: string,childId: string): Promise<ATM>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
    // -----------------------------------------
    // Customer interface
    // -----------------------------------------
    customer: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<Customer | null>;
        findAll(options?: PaginationOptions): Promise<Customer[]>;
        add(input: Customer): Promise<Customer>;
        update(id: string, input: Customer): Promise<Customer>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        bank(parentId: string): Promise<Bank | null>;
        assignBankToCustomer(parentId: string,childId: string): Promise<Customer>;
        unassignBankFromCustomer(parentId: string,childId: string): Promise<Customer>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        accounts(parentId: string,options?: PaginationOptions): Promise<Account[]>;
        addAccountsToCustomer(parentId: string,input: Account): Promise<Customer>;
        removeAccountsFromCustomer(parentId: string,childIds: string[]): Promise<Customer>;

        loanAccounts(parentId: string,options?: PaginationOptions): Promise<LoanAccount[]>;
        addLoanAccountsToCustomer(parentId: string,input: LoanAccount): Promise<Customer>;
        removeLoanAccountsFromCustomer(parentId: string,childIds: string[]): Promise<Customer>;

        paymentCards(parentId: string,options?: PaginationOptions): Promise<PaymentCard[]>;
        addPaymentCardsToCustomer(parentId: string,input: PaymentCard): Promise<Customer>;
        removePaymentCardsFromCustomer(parentId: string,childIds: string[]): Promise<Customer>;

        externalAccounts(parentId: string,options?: PaginationOptions): Promise<ExternalAccount[]>;
        addExternalAccountsToCustomer(parentId: string,input: ExternalAccount): Promise<Customer>;
        removeExternalAccountsFromCustomer(parentId: string,childIds: string[]): Promise<Customer>;

        fundsTransfers(parentId: string,options?: PaginationOptions): Promise<FundsTransfer[]>;
        addFundsTransfersToCustomer(parentId: string,input: FundsTransfer): Promise<Customer>;
        removeFundsTransfersFromCustomer(parentId: string,childIds: string[]): Promise<Customer>;

        disputes(parentId: string,options?: PaginationOptions): Promise<Dispute[]>;
        addDisputesToCustomer(parentId: string,input: Dispute): Promise<Customer>;
        removeDisputesFromCustomer(parentId: string,childIds: string[]): Promise<Customer>;

        kycProfiles(parentId: string,options?: PaginationOptions): Promise<KycProfile[]>;
        addKycProfilesToCustomer(parentId: string,input: KycProfile): Promise<Customer>;
        removeKycProfilesFromCustomer(parentId: string,childIds: string[]): Promise<Customer>;

        consents(parentId: string,options?: PaginationOptions): Promise<Consent[]>;
        addConsentsToCustomer(parentId: string,input: Consent): Promise<Customer>;
        removeConsentsFromCustomer(parentId: string,childIds: string[]): Promise<Customer>;

    };
    // -----------------------------------------
    // KycProfile interface
    // -----------------------------------------
    kycProfile: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<KycProfile | null>;
        findAll(options?: PaginationOptions): Promise<KycProfile[]>;
        add(input: KycProfile): Promise<KycProfile>;
        update(id: string, input: KycProfile): Promise<KycProfile>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        customer(parentId: string): Promise<Customer | null>;
        assignCustomerToKycProfile(parentId: string,childId: string): Promise<KycProfile>;
        unassignCustomerFromKycProfile(parentId: string,childId: string): Promise<KycProfile>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        identityDocuments(parentId: string,options?: PaginationOptions): Promise<IdentityDocument[]>;
        addIdentityDocumentsToKycProfile(parentId: string,input: IdentityDocument): Promise<KycProfile>;
        removeIdentityDocumentsFromKycProfile(parentId: string,childIds: string[]): Promise<KycProfile>;

        riskAssessments(parentId: string,options?: PaginationOptions): Promise<RiskAssessment[]>;
        addRiskAssessmentsToKycProfile(parentId: string,input: RiskAssessment): Promise<KycProfile>;
        removeRiskAssessmentsFromKycProfile(parentId: string,childIds: string[]): Promise<KycProfile>;

        screenings(parentId: string,options?: PaginationOptions): Promise<ScreeningResult[]>;
        addScreeningsToKycProfile(parentId: string,input: ScreeningResult): Promise<KycProfile>;
        removeScreeningsFromKycProfile(parentId: string,childIds: string[]): Promise<KycProfile>;

    };
    // -----------------------------------------
    // IdentityDocument interface
    // -----------------------------------------
    identityDocument: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<IdentityDocument | null>;
        findAll(options?: PaginationOptions): Promise<IdentityDocument[]>;
        add(input: IdentityDocument): Promise<IdentityDocument>;
        update(id: string, input: IdentityDocument): Promise<IdentityDocument>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        kycProfile(parentId: string): Promise<KycProfile | null>;
        assignKycProfileToIdentityDocument(parentId: string,childId: string): Promise<IdentityDocument>;
        unassignKycProfileFromIdentityDocument(parentId: string,childId: string): Promise<IdentityDocument>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
    // -----------------------------------------
    // RiskAssessment interface
    // -----------------------------------------
    riskAssessment: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<RiskAssessment | null>;
        findAll(options?: PaginationOptions): Promise<RiskAssessment[]>;
        add(input: RiskAssessment): Promise<RiskAssessment>;
        update(id: string, input: RiskAssessment): Promise<RiskAssessment>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        kycProfile(parentId: string): Promise<KycProfile | null>;
        assignKycProfileToRiskAssessment(parentId: string,childId: string): Promise<RiskAssessment>;
        unassignKycProfileFromRiskAssessment(parentId: string,childId: string): Promise<RiskAssessment>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
    // -----------------------------------------
    // ScreeningResult interface
    // -----------------------------------------
    screeningResult: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<ScreeningResult | null>;
        findAll(options?: PaginationOptions): Promise<ScreeningResult[]>;
        add(input: ScreeningResult): Promise<ScreeningResult>;
        update(id: string, input: ScreeningResult): Promise<ScreeningResult>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        kycProfile(parentId: string): Promise<KycProfile | null>;
        assignKycProfileToScreeningResult(parentId: string,childId: string): Promise<ScreeningResult>;
        unassignKycProfileFromScreeningResult(parentId: string,childId: string): Promise<ScreeningResult>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
    // -----------------------------------------
    // BankingProduct interface
    // -----------------------------------------
    bankingProduct: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<BankingProduct | null>;
        findAll(options?: PaginationOptions): Promise<BankingProduct[]>;
        add(input: BankingProduct): Promise<BankingProduct>;
        update(id: string, input: BankingProduct): Promise<BankingProduct>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        bank(parentId: string): Promise<Bank | null>;
        assignBankToBankingProduct(parentId: string,childId: string): Promise<BankingProduct>;
        unassignBankFromBankingProduct(parentId: string,childId: string): Promise<BankingProduct>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        accounts(parentId: string,options?: PaginationOptions): Promise<Account[]>;
        addAccountsToBankingProduct(parentId: string,input: Account): Promise<BankingProduct>;
        removeAccountsFromBankingProduct(parentId: string,childIds: string[]): Promise<BankingProduct>;

        loanAccounts(parentId: string,options?: PaginationOptions): Promise<LoanAccount[]>;
        addLoanAccountsToBankingProduct(parentId: string,input: LoanAccount): Promise<BankingProduct>;
        removeLoanAccountsFromBankingProduct(parentId: string,childIds: string[]): Promise<BankingProduct>;

        paymentCards(parentId: string,options?: PaginationOptions): Promise<PaymentCard[]>;
        addPaymentCardsToBankingProduct(parentId: string,input: PaymentCard): Promise<BankingProduct>;
        removePaymentCardsFromBankingProduct(parentId: string,childIds: string[]): Promise<BankingProduct>;

    };
    // -----------------------------------------
    // Account interface
    // -----------------------------------------
    account: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<Account | null>;
        findAll(options?: PaginationOptions): Promise<Account[]>;
        add(input: Account): Promise<Account>;
        update(id: string, input: Account): Promise<Account>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        bank(parentId: string): Promise<Bank | null>;
        assignBankToAccount(parentId: string,childId: string): Promise<Account>;
        unassignBankFromAccount(parentId: string,childId: string): Promise<Account>;
        branch(parentId: string): Promise<Branch | null>;
        assignBranchToAccount(parentId: string,childId: string): Promise<Account>;
        unassignBranchFromAccount(parentId: string,childId: string): Promise<Account>;
        product(parentId: string): Promise<BankingProduct | null>;
        assignProductToAccount(parentId: string,childId: string): Promise<Account>;
        unassignProductFromAccount(parentId: string,childId: string): Promise<Account>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        owners(parentId: string,options?: PaginationOptions): Promise<Customer[]>;
        addOwnersToAccount(parentId: string,input: Customer): Promise<Account>;
        removeOwnersFromAccount(parentId: string,childIds: string[]): Promise<Account>;

        transactions(parentId: string,options?: PaginationOptions): Promise<Transaction[]>;
        addTransactionsToAccount(parentId: string,input: Transaction): Promise<Account>;
        removeTransactionsFromAccount(parentId: string,childIds: string[]): Promise<Account>;

        statements(parentId: string,options?: PaginationOptions): Promise<AccountStatement[]>;
        addStatementsToAccount(parentId: string,input: AccountStatement): Promise<Account>;
        removeStatementsFromAccount(parentId: string,childIds: string[]): Promise<Account>;

        standingInstructions(parentId: string,options?: PaginationOptions): Promise<StandingInstruction[]>;
        addStandingInstructionsToAccount(parentId: string,input: StandingInstruction): Promise<Account>;
        removeStandingInstructionsFromAccount(parentId: string,childIds: string[]): Promise<Account>;

        feeCharges(parentId: string,options?: PaginationOptions): Promise<FeeCharge[]>;
        addFeeChargesToAccount(parentId: string,input: FeeCharge): Promise<Account>;
        removeFeeChargesFromAccount(parentId: string,childIds: string[]): Promise<Account>;

    };
    // -----------------------------------------
    // AccountStatement interface
    // -----------------------------------------
    accountStatement: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<AccountStatement | null>;
        findAll(options?: PaginationOptions): Promise<AccountStatement[]>;
        add(input: AccountStatement): Promise<AccountStatement>;
        update(id: string, input: AccountStatement): Promise<AccountStatement>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        account(parentId: string): Promise<Account | null>;
        assignAccountToAccountStatement(parentId: string,childId: string): Promise<AccountStatement>;
        unassignAccountFromAccountStatement(parentId: string,childId: string): Promise<AccountStatement>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
    // -----------------------------------------
    // Transaction interface
    // -----------------------------------------
    transaction: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<Transaction | null>;
        findAll(options?: PaginationOptions): Promise<Transaction[]>;
        add(input: Transaction): Promise<Transaction>;
        update(id: string, input: Transaction): Promise<Transaction>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        account(parentId: string): Promise<Account | null>;
        assignAccountToTransaction(parentId: string,childId: string): Promise<Transaction>;
        unassignAccountFromTransaction(parentId: string,childId: string): Promise<Transaction>;
        externalCounterparty(parentId: string): Promise<ExternalAccount | null>;
        assignExternalCounterpartyToTransaction(parentId: string,childId: string): Promise<Transaction>;
        unassignExternalCounterpartyFromTransaction(parentId: string,childId: string): Promise<Transaction>;
        paymentCard(parentId: string): Promise<PaymentCard | null>;
        assignPaymentCardToTransaction(parentId: string,childId: string): Promise<Transaction>;
        unassignPaymentCardFromTransaction(parentId: string,childId: string): Promise<Transaction>;
        fundsTransfer(parentId: string): Promise<FundsTransfer | null>;
        assignFundsTransferToTransaction(parentId: string,childId: string): Promise<Transaction>;
        unassignFundsTransferFromTransaction(parentId: string,childId: string): Promise<Transaction>;
        fxTrade(parentId: string): Promise<FXTrade | null>;
        assignFxTradeToTransaction(parentId: string,childId: string): Promise<Transaction>;
        unassignFxTradeFromTransaction(parentId: string,childId: string): Promise<Transaction>;
        dispute(parentId: string): Promise<Dispute | null>;
        assignDisputeToTransaction(parentId: string,childId: string): Promise<Transaction>;
        unassignDisputeFromTransaction(parentId: string,childId: string): Promise<Transaction>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
    // -----------------------------------------
    // ExternalAccount interface
    // -----------------------------------------
    externalAccount: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<ExternalAccount | null>;
        findAll(options?: PaginationOptions): Promise<ExternalAccount[]>;
        add(input: ExternalAccount): Promise<ExternalAccount>;
        update(id: string, input: ExternalAccount): Promise<ExternalAccount>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        customer(parentId: string): Promise<Customer | null>;
        assignCustomerToExternalAccount(parentId: string,childId: string): Promise<ExternalAccount>;
        unassignCustomerFromExternalAccount(parentId: string,childId: string): Promise<ExternalAccount>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        transactions(parentId: string,options?: PaginationOptions): Promise<Transaction[]>;
        addTransactionsToExternalAccount(parentId: string,input: Transaction): Promise<ExternalAccount>;
        removeTransactionsFromExternalAccount(parentId: string,childIds: string[]): Promise<ExternalAccount>;

    };
    // -----------------------------------------
    // FundsTransfer interface
    // -----------------------------------------
    fundsTransfer: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<FundsTransfer | null>;
        findAll(options?: PaginationOptions): Promise<FundsTransfer[]>;
        add(input: FundsTransfer): Promise<FundsTransfer>;
        update(id: string, input: FundsTransfer): Promise<FundsTransfer>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        sourceAccount(parentId: string): Promise<Account | null>;
        assignSourceAccountToFundsTransfer(parentId: string,childId: string): Promise<FundsTransfer>;
        unassignSourceAccountFromFundsTransfer(parentId: string,childId: string): Promise<FundsTransfer>;
        destinationAccount(parentId: string): Promise<Account | null>;
        assignDestinationAccountToFundsTransfer(parentId: string,childId: string): Promise<FundsTransfer>;
        unassignDestinationAccountFromFundsTransfer(parentId: string,childId: string): Promise<FundsTransfer>;
        externalBeneficiary(parentId: string): Promise<ExternalAccount | null>;
        assignExternalBeneficiaryToFundsTransfer(parentId: string,childId: string): Promise<FundsTransfer>;
        unassignExternalBeneficiaryFromFundsTransfer(parentId: string,childId: string): Promise<FundsTransfer>;
        initiatedBy(parentId: string): Promise<Customer | null>;
        assignInitiatedByToFundsTransfer(parentId: string,childId: string): Promise<FundsTransfer>;
        unassignInitiatedByFromFundsTransfer(parentId: string,childId: string): Promise<FundsTransfer>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        transactions(parentId: string,options?: PaginationOptions): Promise<Transaction[]>;
        addTransactionsToFundsTransfer(parentId: string,input: Transaction): Promise<FundsTransfer>;
        removeTransactionsFromFundsTransfer(parentId: string,childIds: string[]): Promise<FundsTransfer>;

    };
    // -----------------------------------------
    // StandingInstruction interface
    // -----------------------------------------
    standingInstruction: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<StandingInstruction | null>;
        findAll(options?: PaginationOptions): Promise<StandingInstruction[]>;
        add(input: StandingInstruction): Promise<StandingInstruction>;
        update(id: string, input: StandingInstruction): Promise<StandingInstruction>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        account(parentId: string): Promise<Account | null>;
        assignAccountToStandingInstruction(parentId: string,childId: string): Promise<StandingInstruction>;
        unassignAccountFromStandingInstruction(parentId: string,childId: string): Promise<StandingInstruction>;
        beneficiary(parentId: string): Promise<ExternalAccount | null>;
        assignBeneficiaryToStandingInstruction(parentId: string,childId: string): Promise<StandingInstruction>;
        unassignBeneficiaryFromStandingInstruction(parentId: string,childId: string): Promise<StandingInstruction>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
    // -----------------------------------------
    // PaymentCard interface
    // -----------------------------------------
    paymentCard: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<PaymentCard | null>;
        findAll(options?: PaginationOptions): Promise<PaymentCard[]>;
        add(input: PaymentCard): Promise<PaymentCard>;
        update(id: string, input: PaymentCard): Promise<PaymentCard>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        bank(parentId: string): Promise<Bank | null>;
        assignBankToPaymentCard(parentId: string,childId: string): Promise<PaymentCard>;
        unassignBankFromPaymentCard(parentId: string,childId: string): Promise<PaymentCard>;
        account(parentId: string): Promise<Account | null>;
        assignAccountToPaymentCard(parentId: string,childId: string): Promise<PaymentCard>;
        unassignAccountFromPaymentCard(parentId: string,childId: string): Promise<PaymentCard>;
        customer(parentId: string): Promise<Customer | null>;
        assignCustomerToPaymentCard(parentId: string,childId: string): Promise<PaymentCard>;
        unassignCustomerFromPaymentCard(parentId: string,childId: string): Promise<PaymentCard>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        transactions(parentId: string,options?: PaginationOptions): Promise<Transaction[]>;
        addTransactionsToPaymentCard(parentId: string,input: Transaction): Promise<PaymentCard>;
        removeTransactionsFromPaymentCard(parentId: string,childIds: string[]): Promise<PaymentCard>;

    };
    // -----------------------------------------
    // LoanAccount interface
    // -----------------------------------------
    loanAccount: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<LoanAccount | null>;
        findAll(options?: PaginationOptions): Promise<LoanAccount[]>;
        add(input: LoanAccount): Promise<LoanAccount>;
        update(id: string, input: LoanAccount): Promise<LoanAccount>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        bank(parentId: string): Promise<Bank | null>;
        assignBankToLoanAccount(parentId: string,childId: string): Promise<LoanAccount>;
        unassignBankFromLoanAccount(parentId: string,childId: string): Promise<LoanAccount>;
        branch(parentId: string): Promise<Branch | null>;
        assignBranchToLoanAccount(parentId: string,childId: string): Promise<LoanAccount>;
        unassignBranchFromLoanAccount(parentId: string,childId: string): Promise<LoanAccount>;
        product(parentId: string): Promise<BankingProduct | null>;
        assignProductToLoanAccount(parentId: string,childId: string): Promise<LoanAccount>;
        unassignProductFromLoanAccount(parentId: string,childId: string): Promise<LoanAccount>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        borrowers(parentId: string,options?: PaginationOptions): Promise<Customer[]>;
        addBorrowersToLoanAccount(parentId: string,input: Customer): Promise<LoanAccount>;
        removeBorrowersFromLoanAccount(parentId: string,childIds: string[]): Promise<LoanAccount>;

        repaymentSchedule(parentId: string,options?: PaginationOptions): Promise<RepaymentSchedule[]>;
        addRepaymentScheduleToLoanAccount(parentId: string,input: RepaymentSchedule): Promise<LoanAccount>;
        removeRepaymentScheduleFromLoanAccount(parentId: string,childIds: string[]): Promise<LoanAccount>;

        payments(parentId: string,options?: PaginationOptions): Promise<LoanPayment[]>;
        addPaymentsToLoanAccount(parentId: string,input: LoanPayment): Promise<LoanAccount>;
        removePaymentsFromLoanAccount(parentId: string,childIds: string[]): Promise<LoanAccount>;

        collateral(parentId: string,options?: PaginationOptions): Promise<Collateral[]>;
        addCollateralToLoanAccount(parentId: string,input: Collateral): Promise<LoanAccount>;
        removeCollateralFromLoanAccount(parentId: string,childIds: string[]): Promise<LoanAccount>;

        feeCharges(parentId: string,options?: PaginationOptions): Promise<FeeCharge[]>;
        addFeeChargesToLoanAccount(parentId: string,input: FeeCharge): Promise<LoanAccount>;
        removeFeeChargesFromLoanAccount(parentId: string,childIds: string[]): Promise<LoanAccount>;

    };
    // -----------------------------------------
    // RepaymentSchedule interface
    // -----------------------------------------
    repaymentSchedule: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<RepaymentSchedule | null>;
        findAll(options?: PaginationOptions): Promise<RepaymentSchedule[]>;
        add(input: RepaymentSchedule): Promise<RepaymentSchedule>;
        update(id: string, input: RepaymentSchedule): Promise<RepaymentSchedule>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        loanAccount(parentId: string): Promise<LoanAccount | null>;
        assignLoanAccountToRepaymentSchedule(parentId: string,childId: string): Promise<RepaymentSchedule>;
        unassignLoanAccountFromRepaymentSchedule(parentId: string,childId: string): Promise<RepaymentSchedule>;
        payment(parentId: string): Promise<LoanPayment | null>;
        assignPaymentToRepaymentSchedule(parentId: string,childId: string): Promise<RepaymentSchedule>;
        unassignPaymentFromRepaymentSchedule(parentId: string,childId: string): Promise<RepaymentSchedule>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
    // -----------------------------------------
    // LoanPayment interface
    // -----------------------------------------
    loanPayment: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<LoanPayment | null>;
        findAll(options?: PaginationOptions): Promise<LoanPayment[]>;
        add(input: LoanPayment): Promise<LoanPayment>;
        update(id: string, input: LoanPayment): Promise<LoanPayment>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        loanAccount(parentId: string): Promise<LoanAccount | null>;
        assignLoanAccountToLoanPayment(parentId: string,childId: string): Promise<LoanPayment>;
        unassignLoanAccountFromLoanPayment(parentId: string,childId: string): Promise<LoanPayment>;
        transaction(parentId: string): Promise<Transaction | null>;
        assignTransactionToLoanPayment(parentId: string,childId: string): Promise<LoanPayment>;
        unassignTransactionFromLoanPayment(parentId: string,childId: string): Promise<LoanPayment>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
    // -----------------------------------------
    // Collateral interface
    // -----------------------------------------
    collateral: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<Collateral | null>;
        findAll(options?: PaginationOptions): Promise<Collateral[]>;
        add(input: Collateral): Promise<Collateral>;
        update(id: string, input: Collateral): Promise<Collateral>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        loanAccount(parentId: string): Promise<LoanAccount | null>;
        assignLoanAccountToCollateral(parentId: string,childId: string): Promise<Collateral>;
        unassignLoanAccountFromCollateral(parentId: string,childId: string): Promise<Collateral>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
    // -----------------------------------------
    // FeeCharge interface
    // -----------------------------------------
    feeCharge: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<FeeCharge | null>;
        findAll(options?: PaginationOptions): Promise<FeeCharge[]>;
        add(input: FeeCharge): Promise<FeeCharge>;
        update(id: string, input: FeeCharge): Promise<FeeCharge>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        account(parentId: string): Promise<Account | null>;
        assignAccountToFeeCharge(parentId: string,childId: string): Promise<FeeCharge>;
        unassignAccountFromFeeCharge(parentId: string,childId: string): Promise<FeeCharge>;
        loanAccount(parentId: string): Promise<LoanAccount | null>;
        assignLoanAccountToFeeCharge(parentId: string,childId: string): Promise<FeeCharge>;
        unassignLoanAccountFromFeeCharge(parentId: string,childId: string): Promise<FeeCharge>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
    // -----------------------------------------
    // ExchangeRate interface
    // -----------------------------------------
    exchangeRate: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<ExchangeRate | null>;
        findAll(options?: PaginationOptions): Promise<ExchangeRate[]>;
        add(input: ExchangeRate): Promise<ExchangeRate>;
        update(id: string, input: ExchangeRate): Promise<ExchangeRate>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        bank(parentId: string): Promise<Bank | null>;
        assignBankToExchangeRate(parentId: string,childId: string): Promise<ExchangeRate>;
        unassignBankFromExchangeRate(parentId: string,childId: string): Promise<ExchangeRate>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        fxTrades(parentId: string,options?: PaginationOptions): Promise<FXTrade[]>;
        addFxTradesToExchangeRate(parentId: string,input: FXTrade): Promise<ExchangeRate>;
        removeFxTradesFromExchangeRate(parentId: string,childIds: string[]): Promise<ExchangeRate>;

    };
    // -----------------------------------------
    // FXTrade interface
    // -----------------------------------------
    fXTrade: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<FXTrade | null>;
        findAll(options?: PaginationOptions): Promise<FXTrade[]>;
        add(input: FXTrade): Promise<FXTrade>;
        update(id: string, input: FXTrade): Promise<FXTrade>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        customer(parentId: string): Promise<Customer | null>;
        assignCustomerToFXTrade(parentId: string,childId: string): Promise<FXTrade>;
        unassignCustomerFromFXTrade(parentId: string,childId: string): Promise<FXTrade>;
        bank(parentId: string): Promise<Bank | null>;
        assignBankToFXTrade(parentId: string,childId: string): Promise<FXTrade>;
        unassignBankFromFXTrade(parentId: string,childId: string): Promise<FXTrade>;
        exchangeRate(parentId: string): Promise<ExchangeRate | null>;
        assignExchangeRateToFXTrade(parentId: string,childId: string): Promise<FXTrade>;
        unassignExchangeRateFromFXTrade(parentId: string,childId: string): Promise<FXTrade>;
        sourceAccount(parentId: string): Promise<Account | null>;
        assignSourceAccountToFXTrade(parentId: string,childId: string): Promise<FXTrade>;
        unassignSourceAccountFromFXTrade(parentId: string,childId: string): Promise<FXTrade>;
        destinationAccount(parentId: string): Promise<Account | null>;
        assignDestinationAccountToFXTrade(parentId: string,childId: string): Promise<FXTrade>;
        unassignDestinationAccountFromFXTrade(parentId: string,childId: string): Promise<FXTrade>;
        transaction(parentId: string): Promise<Transaction | null>;
        assignTransactionToFXTrade(parentId: string,childId: string): Promise<FXTrade>;
        unassignTransactionFromFXTrade(parentId: string,childId: string): Promise<FXTrade>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
    // -----------------------------------------
    // Dispute interface
    // -----------------------------------------
    dispute: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<Dispute | null>;
        findAll(options?: PaginationOptions): Promise<Dispute[]>;
        add(input: Dispute): Promise<Dispute>;
        update(id: string, input: Dispute): Promise<Dispute>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        transaction(parentId: string): Promise<Transaction | null>;
        assignTransactionToDispute(parentId: string,childId: string): Promise<Dispute>;
        unassignTransactionFromDispute(parentId: string,childId: string): Promise<Dispute>;
        customer(parentId: string): Promise<Customer | null>;
        assignCustomerToDispute(parentId: string,childId: string): Promise<Dispute>;
        unassignCustomerFromDispute(parentId: string,childId: string): Promise<Dispute>;
        account(parentId: string): Promise<Account | null>;
        assignAccountToDispute(parentId: string,childId: string): Promise<Dispute>;
        unassignAccountFromDispute(parentId: string,childId: string): Promise<Dispute>;
        paymentCard(parentId: string): Promise<PaymentCard | null>;
        assignPaymentCardToDispute(parentId: string,childId: string): Promise<Dispute>;
        unassignPaymentCardFromDispute(parentId: string,childId: string): Promise<Dispute>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
    // -----------------------------------------
    // Consent interface
    // -----------------------------------------
    consent: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<Consent | null>;
        findAll(options?: PaginationOptions): Promise<Consent[]>;
        add(input: Consent): Promise<Consent>;
        update(id: string, input: Consent): Promise<Consent>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        customer(parentId: string): Promise<Customer | null>;
        assignCustomerToConsent(parentId: string,childId: string): Promise<Consent>;
        unassignCustomerFromConsent(parentId: string,childId: string): Promise<Consent>;
        bank(parentId: string): Promise<Bank | null>;
        assignBankToConsent(parentId: string,childId: string): Promise<Consent>;
        unassignBankFromConsent(parentId: string,childId: string): Promise<Consent>;
        thirdPartyProvider(parentId: string): Promise<ThirdPartyProvider | null>;
        assignThirdPartyProviderToConsent(parentId: string,childId: string): Promise<Consent>;
        unassignThirdPartyProviderFromConsent(parentId: string,childId: string): Promise<Consent>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        authorizedAccounts(parentId: string,options?: PaginationOptions): Promise<Account[]>;
        addAuthorizedAccountsToConsent(parentId: string,input: Account): Promise<Consent>;
        removeAuthorizedAccountsFromConsent(parentId: string,childIds: string[]): Promise<Consent>;

    };
    // -----------------------------------------
    // ThirdPartyProvider interface
    // -----------------------------------------
    thirdPartyProvider: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<ThirdPartyProvider | null>;
        findAll(options?: PaginationOptions): Promise<ThirdPartyProvider[]>;
        add(input: ThirdPartyProvider): Promise<ThirdPartyProvider>;
        update(id: string, input: ThirdPartyProvider): Promise<ThirdPartyProvider>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        bank(parentId: string): Promise<Bank | null>;
        assignBankToThirdPartyProvider(parentId: string,childId: string): Promise<ThirdPartyProvider>;
        unassignBankFromThirdPartyProvider(parentId: string,childId: string): Promise<ThirdPartyProvider>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        consents(parentId: string,options?: PaginationOptions): Promise<Consent[]>;
        addConsentsToThirdPartyProvider(parentId: string,input: Consent): Promise<ThirdPartyProvider>;
        removeConsentsFromThirdPartyProvider(parentId: string,childIds: string[]): Promise<ThirdPartyProvider>;

    };
}