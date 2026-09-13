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
        addToBranches(parentId: string,input: Branch): Promise<Bank>;
        removeFromBranches(parentId: string,childIds: string[]): Promise<Bank>;

        products(parentId: string,options?: PaginationOptions): Promise<BankingProduct[]>;
        addToProducts(parentId: string,input: BankingProduct): Promise<Bank>;
        removeFromProducts(parentId: string,childIds: string[]): Promise<Bank>;

        customers(parentId: string,options?: PaginationOptions): Promise<Customer[]>;
        addToCustomers(parentId: string,input: Customer): Promise<Bank>;
        removeFromCustomers(parentId: string,childIds: string[]): Promise<Bank>;

        accounts(parentId: string,options?: PaginationOptions): Promise<Account[]>;
        addToAccounts(parentId: string,input: Account): Promise<Bank>;
        removeFromAccounts(parentId: string,childIds: string[]): Promise<Bank>;

        paymentCards(parentId: string,options?: PaginationOptions): Promise<PaymentCard[]>;
        addToPaymentCards(parentId: string,input: PaymentCard): Promise<Bank>;
        removeFromPaymentCards(parentId: string,childIds: string[]): Promise<Bank>;

        loanAccounts(parentId: string,options?: PaginationOptions): Promise<LoanAccount[]>;
        addToLoanAccounts(parentId: string,input: LoanAccount): Promise<Bank>;
        removeFromLoanAccounts(parentId: string,childIds: string[]): Promise<Bank>;

        exchangeRates(parentId: string,options?: PaginationOptions): Promise<ExchangeRate[]>;
        addToExchangeRates(parentId: string,input: ExchangeRate): Promise<Bank>;
        removeFromExchangeRates(parentId: string,childIds: string[]): Promise<Bank>;

        consents(parentId: string,options?: PaginationOptions): Promise<Consent[]>;
        addToConsents(parentId: string,input: Consent): Promise<Bank>;
        removeFromConsents(parentId: string,childIds: string[]): Promise<Bank>;

        thirdPartyProviders(parentId: string,options?: PaginationOptions): Promise<ThirdPartyProvider[]>;
        addToThirdPartyProviders(parentId: string,input: ThirdPartyProvider): Promise<Bank>;
        removeFromThirdPartyProviders(parentId: string,childIds: string[]): Promise<Bank>;

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
        assignToBank(parentId: string,childId: string): Promise<Branch>;
        unassignBank(parentId: string,childId: string): Promise<Branch>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        accounts(parentId: string,options?: PaginationOptions): Promise<Account[]>;
        addToAccounts(parentId: string,input: Account): Promise<Branch>;
        removeFromAccounts(parentId: string,childIds: string[]): Promise<Branch>;

        loanAccounts(parentId: string,options?: PaginationOptions): Promise<LoanAccount[]>;
        addToLoanAccounts(parentId: string,input: LoanAccount): Promise<Branch>;
        removeFromLoanAccounts(parentId: string,childIds: string[]): Promise<Branch>;

        atms(parentId: string,options?: PaginationOptions): Promise<ATM[]>;
        addToAtms(parentId: string,input: ATM): Promise<Branch>;
        removeFromAtms(parentId: string,childIds: string[]): Promise<Branch>;

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
        assignToBranch(parentId: string,childId: string): Promise<ATM>;
        unassignBranch(parentId: string,childId: string): Promise<ATM>;

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
        assignToBank(parentId: string,childId: string): Promise<Customer>;
        unassignBank(parentId: string,childId: string): Promise<Customer>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        accounts(parentId: string,options?: PaginationOptions): Promise<Account[]>;
        addToAccounts(parentId: string,input: Account): Promise<Customer>;
        removeFromAccounts(parentId: string,childIds: string[]): Promise<Customer>;

        loanAccounts(parentId: string,options?: PaginationOptions): Promise<LoanAccount[]>;
        addToLoanAccounts(parentId: string,input: LoanAccount): Promise<Customer>;
        removeFromLoanAccounts(parentId: string,childIds: string[]): Promise<Customer>;

        paymentCards(parentId: string,options?: PaginationOptions): Promise<PaymentCard[]>;
        addToPaymentCards(parentId: string,input: PaymentCard): Promise<Customer>;
        removeFromPaymentCards(parentId: string,childIds: string[]): Promise<Customer>;

        externalAccounts(parentId: string,options?: PaginationOptions): Promise<ExternalAccount[]>;
        addToExternalAccounts(parentId: string,input: ExternalAccount): Promise<Customer>;
        removeFromExternalAccounts(parentId: string,childIds: string[]): Promise<Customer>;

        fundsTransfers(parentId: string,options?: PaginationOptions): Promise<FundsTransfer[]>;
        addToFundsTransfers(parentId: string,input: FundsTransfer): Promise<Customer>;
        removeFromFundsTransfers(parentId: string,childIds: string[]): Promise<Customer>;

        disputes(parentId: string,options?: PaginationOptions): Promise<Dispute[]>;
        addToDisputes(parentId: string,input: Dispute): Promise<Customer>;
        removeFromDisputes(parentId: string,childIds: string[]): Promise<Customer>;

        kycProfiles(parentId: string,options?: PaginationOptions): Promise<KycProfile[]>;
        addToKycProfiles(parentId: string,input: KycProfile): Promise<Customer>;
        removeFromKycProfiles(parentId: string,childIds: string[]): Promise<Customer>;

        consents(parentId: string,options?: PaginationOptions): Promise<Consent[]>;
        addToConsents(parentId: string,input: Consent): Promise<Customer>;
        removeFromConsents(parentId: string,childIds: string[]): Promise<Customer>;

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
        assignToCustomer(parentId: string,childId: string): Promise<KycProfile>;
        unassignCustomer(parentId: string,childId: string): Promise<KycProfile>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        identityDocuments(parentId: string,options?: PaginationOptions): Promise<IdentityDocument[]>;
        addToIdentityDocuments(parentId: string,input: IdentityDocument): Promise<KycProfile>;
        removeFromIdentityDocuments(parentId: string,childIds: string[]): Promise<KycProfile>;

        riskAssessments(parentId: string,options?: PaginationOptions): Promise<RiskAssessment[]>;
        addToRiskAssessments(parentId: string,input: RiskAssessment): Promise<KycProfile>;
        removeFromRiskAssessments(parentId: string,childIds: string[]): Promise<KycProfile>;

        screenings(parentId: string,options?: PaginationOptions): Promise<ScreeningResult[]>;
        addToScreenings(parentId: string,input: ScreeningResult): Promise<KycProfile>;
        removeFromScreenings(parentId: string,childIds: string[]): Promise<KycProfile>;

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
        assignToKycProfile(parentId: string,childId: string): Promise<IdentityDocument>;
        unassignKycProfile(parentId: string,childId: string): Promise<IdentityDocument>;

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
        assignToKycProfile(parentId: string,childId: string): Promise<RiskAssessment>;
        unassignKycProfile(parentId: string,childId: string): Promise<RiskAssessment>;

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
        assignToKycProfile(parentId: string,childId: string): Promise<ScreeningResult>;
        unassignKycProfile(parentId: string,childId: string): Promise<ScreeningResult>;

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
        assignToBank(parentId: string,childId: string): Promise<BankingProduct>;
        unassignBank(parentId: string,childId: string): Promise<BankingProduct>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        accounts(parentId: string,options?: PaginationOptions): Promise<Account[]>;
        addToAccounts(parentId: string,input: Account): Promise<BankingProduct>;
        removeFromAccounts(parentId: string,childIds: string[]): Promise<BankingProduct>;

        loanAccounts(parentId: string,options?: PaginationOptions): Promise<LoanAccount[]>;
        addToLoanAccounts(parentId: string,input: LoanAccount): Promise<BankingProduct>;
        removeFromLoanAccounts(parentId: string,childIds: string[]): Promise<BankingProduct>;

        paymentCards(parentId: string,options?: PaginationOptions): Promise<PaymentCard[]>;
        addToPaymentCards(parentId: string,input: PaymentCard): Promise<BankingProduct>;
        removeFromPaymentCards(parentId: string,childIds: string[]): Promise<BankingProduct>;

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
        assignToBank(parentId: string,childId: string): Promise<Account>;
        unassignBank(parentId: string,childId: string): Promise<Account>;
        branch(parentId: string): Promise<Branch | null>;
        assignToBranch(parentId: string,childId: string): Promise<Account>;
        unassignBranch(parentId: string,childId: string): Promise<Account>;
        product(parentId: string): Promise<BankingProduct | null>;
        assignToProduct(parentId: string,childId: string): Promise<Account>;
        unassignProduct(parentId: string,childId: string): Promise<Account>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        owners(parentId: string,options?: PaginationOptions): Promise<Customer[]>;
        addToOwners(parentId: string,input: Customer): Promise<Account>;
        removeFromOwners(parentId: string,childIds: string[]): Promise<Account>;

        transactions(parentId: string,options?: PaginationOptions): Promise<Transaction[]>;
        addToTransactions(parentId: string,input: Transaction): Promise<Account>;
        removeFromTransactions(parentId: string,childIds: string[]): Promise<Account>;

        statements(parentId: string,options?: PaginationOptions): Promise<AccountStatement[]>;
        addToStatements(parentId: string,input: AccountStatement): Promise<Account>;
        removeFromStatements(parentId: string,childIds: string[]): Promise<Account>;

        standingInstructions(parentId: string,options?: PaginationOptions): Promise<StandingInstruction[]>;
        addToStandingInstructions(parentId: string,input: StandingInstruction): Promise<Account>;
        removeFromStandingInstructions(parentId: string,childIds: string[]): Promise<Account>;

        feeCharges(parentId: string,options?: PaginationOptions): Promise<FeeCharge[]>;
        addToFeeCharges(parentId: string,input: FeeCharge): Promise<Account>;
        removeFromFeeCharges(parentId: string,childIds: string[]): Promise<Account>;

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
        assignToAccount(parentId: string,childId: string): Promise<AccountStatement>;
        unassignAccount(parentId: string,childId: string): Promise<AccountStatement>;

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
        assignToAccount(parentId: string,childId: string): Promise<Transaction>;
        unassignAccount(parentId: string,childId: string): Promise<Transaction>;
        externalCounterparty(parentId: string): Promise<ExternalAccount | null>;
        assignToExternalCounterparty(parentId: string,childId: string): Promise<Transaction>;
        unassignExternalCounterparty(parentId: string,childId: string): Promise<Transaction>;
        paymentCard(parentId: string): Promise<PaymentCard | null>;
        assignToPaymentCard(parentId: string,childId: string): Promise<Transaction>;
        unassignPaymentCard(parentId: string,childId: string): Promise<Transaction>;
        fundsTransfer(parentId: string): Promise<FundsTransfer | null>;
        assignToFundsTransfer(parentId: string,childId: string): Promise<Transaction>;
        unassignFundsTransfer(parentId: string,childId: string): Promise<Transaction>;
        fxTrade(parentId: string): Promise<FXTrade | null>;
        assignToFxTrade(parentId: string,childId: string): Promise<Transaction>;
        unassignFxTrade(parentId: string,childId: string): Promise<Transaction>;
        dispute(parentId: string): Promise<Dispute | null>;
        assignToDispute(parentId: string,childId: string): Promise<Transaction>;
        unassignDispute(parentId: string,childId: string): Promise<Transaction>;

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
        assignToCustomer(parentId: string,childId: string): Promise<ExternalAccount>;
        unassignCustomer(parentId: string,childId: string): Promise<ExternalAccount>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        transactions(parentId: string,options?: PaginationOptions): Promise<Transaction[]>;
        addToTransactions(parentId: string,input: Transaction): Promise<ExternalAccount>;
        removeFromTransactions(parentId: string,childIds: string[]): Promise<ExternalAccount>;

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
        assignToSourceAccount(parentId: string,childId: string): Promise<FundsTransfer>;
        unassignSourceAccount(parentId: string,childId: string): Promise<FundsTransfer>;
        destinationAccount(parentId: string): Promise<Account | null>;
        assignToDestinationAccount(parentId: string,childId: string): Promise<FundsTransfer>;
        unassignDestinationAccount(parentId: string,childId: string): Promise<FundsTransfer>;
        externalBeneficiary(parentId: string): Promise<ExternalAccount | null>;
        assignToExternalBeneficiary(parentId: string,childId: string): Promise<FundsTransfer>;
        unassignExternalBeneficiary(parentId: string,childId: string): Promise<FundsTransfer>;
        initiatedBy(parentId: string): Promise<Customer | null>;
        assignToInitiatedBy(parentId: string,childId: string): Promise<FundsTransfer>;
        unassignInitiatedBy(parentId: string,childId: string): Promise<FundsTransfer>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        transactions(parentId: string,options?: PaginationOptions): Promise<Transaction[]>;
        addToTransactions(parentId: string,input: Transaction): Promise<FundsTransfer>;
        removeFromTransactions(parentId: string,childIds: string[]): Promise<FundsTransfer>;

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
        assignToAccount(parentId: string,childId: string): Promise<StandingInstruction>;
        unassignAccount(parentId: string,childId: string): Promise<StandingInstruction>;
        beneficiary(parentId: string): Promise<ExternalAccount | null>;
        assignToBeneficiary(parentId: string,childId: string): Promise<StandingInstruction>;
        unassignBeneficiary(parentId: string,childId: string): Promise<StandingInstruction>;

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
        assignToBank(parentId: string,childId: string): Promise<PaymentCard>;
        unassignBank(parentId: string,childId: string): Promise<PaymentCard>;
        account(parentId: string): Promise<Account | null>;
        assignToAccount(parentId: string,childId: string): Promise<PaymentCard>;
        unassignAccount(parentId: string,childId: string): Promise<PaymentCard>;
        customer(parentId: string): Promise<Customer | null>;
        assignToCustomer(parentId: string,childId: string): Promise<PaymentCard>;
        unassignCustomer(parentId: string,childId: string): Promise<PaymentCard>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        transactions(parentId: string,options?: PaginationOptions): Promise<Transaction[]>;
        addToTransactions(parentId: string,input: Transaction): Promise<PaymentCard>;
        removeFromTransactions(parentId: string,childIds: string[]): Promise<PaymentCard>;

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
        assignToBank(parentId: string,childId: string): Promise<LoanAccount>;
        unassignBank(parentId: string,childId: string): Promise<LoanAccount>;
        branch(parentId: string): Promise<Branch | null>;
        assignToBranch(parentId: string,childId: string): Promise<LoanAccount>;
        unassignBranch(parentId: string,childId: string): Promise<LoanAccount>;
        product(parentId: string): Promise<BankingProduct | null>;
        assignToProduct(parentId: string,childId: string): Promise<LoanAccount>;
        unassignProduct(parentId: string,childId: string): Promise<LoanAccount>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        borrowers(parentId: string,options?: PaginationOptions): Promise<Customer[]>;
        addToBorrowers(parentId: string,input: Customer): Promise<LoanAccount>;
        removeFromBorrowers(parentId: string,childIds: string[]): Promise<LoanAccount>;

        repaymentSchedule(parentId: string,options?: PaginationOptions): Promise<RepaymentSchedule[]>;
        addToRepaymentSchedule(parentId: string,input: RepaymentSchedule): Promise<LoanAccount>;
        removeFromRepaymentSchedule(parentId: string,childIds: string[]): Promise<LoanAccount>;

        payments(parentId: string,options?: PaginationOptions): Promise<LoanPayment[]>;
        addToPayments(parentId: string,input: LoanPayment): Promise<LoanAccount>;
        removeFromPayments(parentId: string,childIds: string[]): Promise<LoanAccount>;

        collateral(parentId: string,options?: PaginationOptions): Promise<Collateral[]>;
        addToCollateral(parentId: string,input: Collateral): Promise<LoanAccount>;
        removeFromCollateral(parentId: string,childIds: string[]): Promise<LoanAccount>;

        feeCharges(parentId: string,options?: PaginationOptions): Promise<FeeCharge[]>;
        addToFeeCharges(parentId: string,input: FeeCharge): Promise<LoanAccount>;
        removeFromFeeCharges(parentId: string,childIds: string[]): Promise<LoanAccount>;

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
        assignToLoanAccount(parentId: string,childId: string): Promise<RepaymentSchedule>;
        unassignLoanAccount(parentId: string,childId: string): Promise<RepaymentSchedule>;
        payment(parentId: string): Promise<LoanPayment | null>;
        assignToPayment(parentId: string,childId: string): Promise<RepaymentSchedule>;
        unassignPayment(parentId: string,childId: string): Promise<RepaymentSchedule>;

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
        assignToLoanAccount(parentId: string,childId: string): Promise<LoanPayment>;
        unassignLoanAccount(parentId: string,childId: string): Promise<LoanPayment>;
        transaction(parentId: string): Promise<Transaction | null>;
        assignToTransaction(parentId: string,childId: string): Promise<LoanPayment>;
        unassignTransaction(parentId: string,childId: string): Promise<LoanPayment>;

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
        assignToLoanAccount(parentId: string,childId: string): Promise<Collateral>;
        unassignLoanAccount(parentId: string,childId: string): Promise<Collateral>;

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
        assignToAccount(parentId: string,childId: string): Promise<FeeCharge>;
        unassignAccount(parentId: string,childId: string): Promise<FeeCharge>;
        loanAccount(parentId: string): Promise<LoanAccount | null>;
        assignToLoanAccount(parentId: string,childId: string): Promise<FeeCharge>;
        unassignLoanAccount(parentId: string,childId: string): Promise<FeeCharge>;

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
        assignToBank(parentId: string,childId: string): Promise<ExchangeRate>;
        unassignBank(parentId: string,childId: string): Promise<ExchangeRate>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        fxTrades(parentId: string,options?: PaginationOptions): Promise<FXTrade[]>;
        addToFxTrades(parentId: string,input: FXTrade): Promise<ExchangeRate>;
        removeFromFxTrades(parentId: string,childIds: string[]): Promise<ExchangeRate>;

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
        assignToCustomer(parentId: string,childId: string): Promise<FXTrade>;
        unassignCustomer(parentId: string,childId: string): Promise<FXTrade>;
        bank(parentId: string): Promise<Bank | null>;
        assignToBank(parentId: string,childId: string): Promise<FXTrade>;
        unassignBank(parentId: string,childId: string): Promise<FXTrade>;
        exchangeRate(parentId: string): Promise<ExchangeRate | null>;
        assignToExchangeRate(parentId: string,childId: string): Promise<FXTrade>;
        unassignExchangeRate(parentId: string,childId: string): Promise<FXTrade>;
        sourceAccount(parentId: string): Promise<Account | null>;
        assignToSourceAccount(parentId: string,childId: string): Promise<FXTrade>;
        unassignSourceAccount(parentId: string,childId: string): Promise<FXTrade>;
        destinationAccount(parentId: string): Promise<Account | null>;
        assignToDestinationAccount(parentId: string,childId: string): Promise<FXTrade>;
        unassignDestinationAccount(parentId: string,childId: string): Promise<FXTrade>;
        transaction(parentId: string): Promise<Transaction | null>;
        assignToTransaction(parentId: string,childId: string): Promise<FXTrade>;
        unassignTransaction(parentId: string,childId: string): Promise<FXTrade>;

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
        assignToTransaction(parentId: string,childId: string): Promise<Dispute>;
        unassignTransaction(parentId: string,childId: string): Promise<Dispute>;
        customer(parentId: string): Promise<Customer | null>;
        assignToCustomer(parentId: string,childId: string): Promise<Dispute>;
        unassignCustomer(parentId: string,childId: string): Promise<Dispute>;
        account(parentId: string): Promise<Account | null>;
        assignToAccount(parentId: string,childId: string): Promise<Dispute>;
        unassignAccount(parentId: string,childId: string): Promise<Dispute>;
        paymentCard(parentId: string): Promise<PaymentCard | null>;
        assignToPaymentCard(parentId: string,childId: string): Promise<Dispute>;
        unassignPaymentCard(parentId: string,childId: string): Promise<Dispute>;

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
        assignToCustomer(parentId: string,childId: string): Promise<Consent>;
        unassignCustomer(parentId: string,childId: string): Promise<Consent>;
        bank(parentId: string): Promise<Bank | null>;
        assignToBank(parentId: string,childId: string): Promise<Consent>;
        unassignBank(parentId: string,childId: string): Promise<Consent>;
        thirdPartyProvider(parentId: string): Promise<ThirdPartyProvider | null>;
        assignToThirdPartyProvider(parentId: string,childId: string): Promise<Consent>;
        unassignThirdPartyProvider(parentId: string,childId: string): Promise<Consent>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        authorizedAccounts(parentId: string,options?: PaginationOptions): Promise<Account[]>;
        addToAuthorizedAccounts(parentId: string,input: Account): Promise<Consent>;
        removeFromAuthorizedAccounts(parentId: string,childIds: string[]): Promise<Consent>;

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
        assignToBank(parentId: string,childId: string): Promise<ThirdPartyProvider>;
        unassignBank(parentId: string,childId: string): Promise<ThirdPartyProvider>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        consents(parentId: string,options?: PaginationOptions): Promise<Consent[]>;
        addToConsents(parentId: string,input: Consent): Promise<ThirdPartyProvider>;
        removeFromConsents(parentId: string,childIds: string[]): Promise<ThirdPartyProvider>;

    };
}