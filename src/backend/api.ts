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
} from "./types.js";

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
        update(input: Bank): Promise<Bank>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------


        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getBranches(parentId: string): Promise<Branch[]>;
        addToBranches(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromBranches(parentId: string,childIds: string[]): Promise<Boolean>;

        getProducts(parentId: string): Promise<BankingProduct[]>;
        addToProducts(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromProducts(parentId: string,childIds: string[]): Promise<Boolean>;

        getCustomers(parentId: string): Promise<Customer[]>;
        addToCustomers(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromCustomers(parentId: string,childIds: string[]): Promise<Boolean>;

        getAccounts(parentId: string): Promise<Account[]>;
        addToAccounts(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromAccounts(parentId: string,childIds: string[]): Promise<Boolean>;

        getPaymentCards(parentId: string): Promise<PaymentCard[]>;
        addToPaymentCards(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromPaymentCards(parentId: string,childIds: string[]): Promise<Boolean>;

        getLoanAccounts(parentId: string): Promise<LoanAccount[]>;
        addToLoanAccounts(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromLoanAccounts(parentId: string,childIds: string[]): Promise<Boolean>;

        getExchangeRates(parentId: string): Promise<ExchangeRate[]>;
        addToExchangeRates(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromExchangeRates(parentId: string,childIds: string[]): Promise<Boolean>;

        getConsents(parentId: string): Promise<Consent[]>;
        addToConsents(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromConsents(parentId: string,childIds: string[]): Promise<Boolean>;

        getThirdPartyProviders(parentId: string): Promise<ThirdPartyProvider[]>;
        addToThirdPartyProviders(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromThirdPartyProviders(parentId: string,childIds: string[]): Promise<Boolean>;

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
        update(input: Branch): Promise<Branch>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getBank(parentId: string): Promise<Bank | null>;
        assignBank(parentId: string,childId: string): Promise<Boolean>;
        unassignBank(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getAccounts(parentId: string): Promise<Account[]>;
        addToAccounts(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromAccounts(parentId: string,childIds: string[]): Promise<Boolean>;

        getLoanAccounts(parentId: string): Promise<LoanAccount[]>;
        addToLoanAccounts(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromLoanAccounts(parentId: string,childIds: string[]): Promise<Boolean>;

        getAtms(parentId: string): Promise<ATM[]>;
        addToAtms(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromAtms(parentId: string,childIds: string[]): Promise<Boolean>;

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
        update(input: ATM): Promise<ATM>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getBranch(parentId: string): Promise<Branch | null>;
        assignBranch(parentId: string,childId: string): Promise<Boolean>;
        unassignBranch(parentId: string,childId: string): Promise<Boolean>;

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
        update(input: Customer): Promise<Customer>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getBank(parentId: string): Promise<Bank | null>;
        assignBank(parentId: string,childId: string): Promise<Boolean>;
        unassignBank(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getAccounts(parentId: string): Promise<Account[]>;
        addToAccounts(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromAccounts(parentId: string,childIds: string[]): Promise<Boolean>;

        getLoanAccounts(parentId: string): Promise<LoanAccount[]>;
        addToLoanAccounts(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromLoanAccounts(parentId: string,childIds: string[]): Promise<Boolean>;

        getPaymentCards(parentId: string): Promise<PaymentCard[]>;
        addToPaymentCards(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromPaymentCards(parentId: string,childIds: string[]): Promise<Boolean>;

        getExternalAccounts(parentId: string): Promise<ExternalAccount[]>;
        addToExternalAccounts(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromExternalAccounts(parentId: string,childIds: string[]): Promise<Boolean>;

        getFundsTransfers(parentId: string): Promise<FundsTransfer[]>;
        addToFundsTransfers(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromFundsTransfers(parentId: string,childIds: string[]): Promise<Boolean>;

        getDisputes(parentId: string): Promise<Dispute[]>;
        addToDisputes(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromDisputes(parentId: string,childIds: string[]): Promise<Boolean>;

        getKycProfiles(parentId: string): Promise<KycProfile[]>;
        addToKycProfiles(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromKycProfiles(parentId: string,childIds: string[]): Promise<Boolean>;

        getConsents(parentId: string): Promise<Consent[]>;
        addToConsents(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromConsents(parentId: string,childIds: string[]): Promise<Boolean>;

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
        update(input: KycProfile): Promise<KycProfile>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getCustomer(parentId: string): Promise<Customer | null>;
        assignCustomer(parentId: string,childId: string): Promise<Boolean>;
        unassignCustomer(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getIdentityDocuments(parentId: string): Promise<IdentityDocument[]>;
        addToIdentityDocuments(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromIdentityDocuments(parentId: string,childIds: string[]): Promise<Boolean>;

        getRiskAssessments(parentId: string): Promise<RiskAssessment[]>;
        addToRiskAssessments(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromRiskAssessments(parentId: string,childIds: string[]): Promise<Boolean>;

        getScreenings(parentId: string): Promise<ScreeningResult[]>;
        addToScreenings(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromScreenings(parentId: string,childIds: string[]): Promise<Boolean>;

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
        update(input: IdentityDocument): Promise<IdentityDocument>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getKycProfile(parentId: string): Promise<KycProfile | null>;
        assignKycProfile(parentId: string,childId: string): Promise<Boolean>;
        unassignKycProfile(parentId: string,childId: string): Promise<Boolean>;

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
        update(input: RiskAssessment): Promise<RiskAssessment>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getKycProfile(parentId: string): Promise<KycProfile | null>;
        assignKycProfile(parentId: string,childId: string): Promise<Boolean>;
        unassignKycProfile(parentId: string,childId: string): Promise<Boolean>;

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
        update(input: ScreeningResult): Promise<ScreeningResult>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getKycProfile(parentId: string): Promise<KycProfile | null>;
        assignKycProfile(parentId: string,childId: string): Promise<Boolean>;
        unassignKycProfile(parentId: string,childId: string): Promise<Boolean>;

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
        update(input: BankingProduct): Promise<BankingProduct>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getBank(parentId: string): Promise<Bank | null>;
        assignBank(parentId: string,childId: string): Promise<Boolean>;
        unassignBank(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getAccounts(parentId: string): Promise<Account[]>;
        addToAccounts(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromAccounts(parentId: string,childIds: string[]): Promise<Boolean>;

        getLoanAccounts(parentId: string): Promise<LoanAccount[]>;
        addToLoanAccounts(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromLoanAccounts(parentId: string,childIds: string[]): Promise<Boolean>;

        getPaymentCards(parentId: string): Promise<PaymentCard[]>;
        addToPaymentCards(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromPaymentCards(parentId: string,childIds: string[]): Promise<Boolean>;

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
        update(input: Account): Promise<Account>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getBank(parentId: string): Promise<Bank | null>;
        assignBank(parentId: string,childId: string): Promise<Boolean>;
        unassignBank(parentId: string,childId: string): Promise<Boolean>;
        getBranch(parentId: string): Promise<Branch | null>;
        assignBranch(parentId: string,childId: string): Promise<Boolean>;
        unassignBranch(parentId: string,childId: string): Promise<Boolean>;
        getProduct(parentId: string): Promise<BankingProduct | null>;
        assignProduct(parentId: string,childId: string): Promise<Boolean>;
        unassignProduct(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getOwners(parentId: string): Promise<Customer[]>;
        addToOwners(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromOwners(parentId: string,childIds: string[]): Promise<Boolean>;

        getTransactions(parentId: string): Promise<Transaction[]>;
        addToTransactions(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromTransactions(parentId: string,childIds: string[]): Promise<Boolean>;

        getStatements(parentId: string): Promise<AccountStatement[]>;
        addToStatements(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromStatements(parentId: string,childIds: string[]): Promise<Boolean>;

        getStandingInstructions(parentId: string): Promise<StandingInstruction[]>;
        addToStandingInstructions(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromStandingInstructions(parentId: string,childIds: string[]): Promise<Boolean>;

        getFeeCharges(parentId: string): Promise<FeeCharge[]>;
        addToFeeCharges(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromFeeCharges(parentId: string,childIds: string[]): Promise<Boolean>;

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
        update(input: AccountStatement): Promise<AccountStatement>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getAccount(parentId: string): Promise<Account | null>;
        assignAccount(parentId: string,childId: string): Promise<Boolean>;
        unassignAccount(parentId: string,childId: string): Promise<Boolean>;

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
        update(input: Transaction): Promise<Transaction>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getAccount(parentId: string): Promise<Account | null>;
        assignAccount(parentId: string,childId: string): Promise<Boolean>;
        unassignAccount(parentId: string,childId: string): Promise<Boolean>;
        getExternalCounterparty(parentId: string): Promise<ExternalAccount | null>;
        assignExternalCounterparty(parentId: string,childId: string): Promise<Boolean>;
        unassignExternalCounterparty(parentId: string,childId: string): Promise<Boolean>;
        getPaymentCard(parentId: string): Promise<PaymentCard | null>;
        assignPaymentCard(parentId: string,childId: string): Promise<Boolean>;
        unassignPaymentCard(parentId: string,childId: string): Promise<Boolean>;
        getFundsTransfer(parentId: string): Promise<FundsTransfer | null>;
        assignFundsTransfer(parentId: string,childId: string): Promise<Boolean>;
        unassignFundsTransfer(parentId: string,childId: string): Promise<Boolean>;
        getFxTrade(parentId: string): Promise<FXTrade | null>;
        assignFxTrade(parentId: string,childId: string): Promise<Boolean>;
        unassignFxTrade(parentId: string,childId: string): Promise<Boolean>;
        getDispute(parentId: string): Promise<Dispute | null>;
        assignDispute(parentId: string,childId: string): Promise<Boolean>;
        unassignDispute(parentId: string,childId: string): Promise<Boolean>;

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
        update(input: ExternalAccount): Promise<ExternalAccount>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getCustomer(parentId: string): Promise<Customer | null>;
        assignCustomer(parentId: string,childId: string): Promise<Boolean>;
        unassignCustomer(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getTransactions(parentId: string): Promise<Transaction[]>;
        addToTransactions(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromTransactions(parentId: string,childIds: string[]): Promise<Boolean>;

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
        update(input: FundsTransfer): Promise<FundsTransfer>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getSourceAccount(parentId: string): Promise<Account | null>;
        assignSourceAccount(parentId: string,childId: string): Promise<Boolean>;
        unassignSourceAccount(parentId: string,childId: string): Promise<Boolean>;
        getDestinationAccount(parentId: string): Promise<Account | null>;
        assignDestinationAccount(parentId: string,childId: string): Promise<Boolean>;
        unassignDestinationAccount(parentId: string,childId: string): Promise<Boolean>;
        getExternalBeneficiary(parentId: string): Promise<ExternalAccount | null>;
        assignExternalBeneficiary(parentId: string,childId: string): Promise<Boolean>;
        unassignExternalBeneficiary(parentId: string,childId: string): Promise<Boolean>;
        getInitiatedBy(parentId: string): Promise<Customer | null>;
        assignInitiatedBy(parentId: string,childId: string): Promise<Boolean>;
        unassignInitiatedBy(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getTransactions(parentId: string): Promise<Transaction[]>;
        addToTransactions(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromTransactions(parentId: string,childIds: string[]): Promise<Boolean>;

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
        update(input: StandingInstruction): Promise<StandingInstruction>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getAccount(parentId: string): Promise<Account | null>;
        assignAccount(parentId: string,childId: string): Promise<Boolean>;
        unassignAccount(parentId: string,childId: string): Promise<Boolean>;
        getBeneficiary(parentId: string): Promise<ExternalAccount | null>;
        assignBeneficiary(parentId: string,childId: string): Promise<Boolean>;
        unassignBeneficiary(parentId: string,childId: string): Promise<Boolean>;

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
        update(input: PaymentCard): Promise<PaymentCard>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getBank(parentId: string): Promise<Bank | null>;
        assignBank(parentId: string,childId: string): Promise<Boolean>;
        unassignBank(parentId: string,childId: string): Promise<Boolean>;
        getAccount(parentId: string): Promise<Account | null>;
        assignAccount(parentId: string,childId: string): Promise<Boolean>;
        unassignAccount(parentId: string,childId: string): Promise<Boolean>;
        getCustomer(parentId: string): Promise<Customer | null>;
        assignCustomer(parentId: string,childId: string): Promise<Boolean>;
        unassignCustomer(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getTransactions(parentId: string): Promise<Transaction[]>;
        addToTransactions(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromTransactions(parentId: string,childIds: string[]): Promise<Boolean>;

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
        update(input: LoanAccount): Promise<LoanAccount>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getBank(parentId: string): Promise<Bank | null>;
        assignBank(parentId: string,childId: string): Promise<Boolean>;
        unassignBank(parentId: string,childId: string): Promise<Boolean>;
        getBranch(parentId: string): Promise<Branch | null>;
        assignBranch(parentId: string,childId: string): Promise<Boolean>;
        unassignBranch(parentId: string,childId: string): Promise<Boolean>;
        getProduct(parentId: string): Promise<BankingProduct | null>;
        assignProduct(parentId: string,childId: string): Promise<Boolean>;
        unassignProduct(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getBorrowers(parentId: string): Promise<Customer[]>;
        addToBorrowers(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromBorrowers(parentId: string,childIds: string[]): Promise<Boolean>;

        getRepaymentSchedule(parentId: string): Promise<RepaymentSchedule[]>;
        addToRepaymentSchedule(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromRepaymentSchedule(parentId: string,childIds: string[]): Promise<Boolean>;

        getPayments(parentId: string): Promise<LoanPayment[]>;
        addToPayments(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromPayments(parentId: string,childIds: string[]): Promise<Boolean>;

        getCollateral(parentId: string): Promise<Collateral[]>;
        addToCollateral(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromCollateral(parentId: string,childIds: string[]): Promise<Boolean>;

        getFeeCharges(parentId: string): Promise<FeeCharge[]>;
        addToFeeCharges(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromFeeCharges(parentId: string,childIds: string[]): Promise<Boolean>;

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
        update(input: RepaymentSchedule): Promise<RepaymentSchedule>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getLoanAccount(parentId: string): Promise<LoanAccount | null>;
        assignLoanAccount(parentId: string,childId: string): Promise<Boolean>;
        unassignLoanAccount(parentId: string,childId: string): Promise<Boolean>;
        getPayment(parentId: string): Promise<LoanPayment | null>;
        assignPayment(parentId: string,childId: string): Promise<Boolean>;
        unassignPayment(parentId: string,childId: string): Promise<Boolean>;

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
        update(input: LoanPayment): Promise<LoanPayment>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getLoanAccount(parentId: string): Promise<LoanAccount | null>;
        assignLoanAccount(parentId: string,childId: string): Promise<Boolean>;
        unassignLoanAccount(parentId: string,childId: string): Promise<Boolean>;
        getTransaction(parentId: string): Promise<Transaction | null>;
        assignTransaction(parentId: string,childId: string): Promise<Boolean>;
        unassignTransaction(parentId: string,childId: string): Promise<Boolean>;

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
        update(input: Collateral): Promise<Collateral>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getLoanAccount(parentId: string): Promise<LoanAccount | null>;
        assignLoanAccount(parentId: string,childId: string): Promise<Boolean>;
        unassignLoanAccount(parentId: string,childId: string): Promise<Boolean>;

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
        update(input: FeeCharge): Promise<FeeCharge>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getAccount(parentId: string): Promise<Account | null>;
        assignAccount(parentId: string,childId: string): Promise<Boolean>;
        unassignAccount(parentId: string,childId: string): Promise<Boolean>;
        getLoanAccount(parentId: string): Promise<LoanAccount | null>;
        assignLoanAccount(parentId: string,childId: string): Promise<Boolean>;
        unassignLoanAccount(parentId: string,childId: string): Promise<Boolean>;

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
        update(input: ExchangeRate): Promise<ExchangeRate>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getBank(parentId: string): Promise<Bank | null>;
        assignBank(parentId: string,childId: string): Promise<Boolean>;
        unassignBank(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getFxTrades(parentId: string): Promise<FXTrade[]>;
        addToFxTrades(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromFxTrades(parentId: string,childIds: string[]): Promise<Boolean>;

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
        update(input: FXTrade): Promise<FXTrade>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getCustomer(parentId: string): Promise<Customer | null>;
        assignCustomer(parentId: string,childId: string): Promise<Boolean>;
        unassignCustomer(parentId: string,childId: string): Promise<Boolean>;
        getBank(parentId: string): Promise<Bank | null>;
        assignBank(parentId: string,childId: string): Promise<Boolean>;
        unassignBank(parentId: string,childId: string): Promise<Boolean>;
        getExchangeRate(parentId: string): Promise<ExchangeRate | null>;
        assignExchangeRate(parentId: string,childId: string): Promise<Boolean>;
        unassignExchangeRate(parentId: string,childId: string): Promise<Boolean>;
        getSourceAccount(parentId: string): Promise<Account | null>;
        assignSourceAccount(parentId: string,childId: string): Promise<Boolean>;
        unassignSourceAccount(parentId: string,childId: string): Promise<Boolean>;
        getDestinationAccount(parentId: string): Promise<Account | null>;
        assignDestinationAccount(parentId: string,childId: string): Promise<Boolean>;
        unassignDestinationAccount(parentId: string,childId: string): Promise<Boolean>;
        getTransaction(parentId: string): Promise<Transaction | null>;
        assignTransaction(parentId: string,childId: string): Promise<Boolean>;
        unassignTransaction(parentId: string,childId: string): Promise<Boolean>;

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
        update(input: Dispute): Promise<Dispute>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getTransaction(parentId: string): Promise<Transaction | null>;
        assignTransaction(parentId: string,childId: string): Promise<Boolean>;
        unassignTransaction(parentId: string,childId: string): Promise<Boolean>;
        getCustomer(parentId: string): Promise<Customer | null>;
        assignCustomer(parentId: string,childId: string): Promise<Boolean>;
        unassignCustomer(parentId: string,childId: string): Promise<Boolean>;
        getAccount(parentId: string): Promise<Account | null>;
        assignAccount(parentId: string,childId: string): Promise<Boolean>;
        unassignAccount(parentId: string,childId: string): Promise<Boolean>;
        getPaymentCard(parentId: string): Promise<PaymentCard | null>;
        assignPaymentCard(parentId: string,childId: string): Promise<Boolean>;
        unassignPaymentCard(parentId: string,childId: string): Promise<Boolean>;

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
        update(input: Consent): Promise<Consent>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getCustomer(parentId: string): Promise<Customer | null>;
        assignCustomer(parentId: string,childId: string): Promise<Boolean>;
        unassignCustomer(parentId: string,childId: string): Promise<Boolean>;
        getBank(parentId: string): Promise<Bank | null>;
        assignBank(parentId: string,childId: string): Promise<Boolean>;
        unassignBank(parentId: string,childId: string): Promise<Boolean>;
        getThirdPartyProvider(parentId: string): Promise<ThirdPartyProvider | null>;
        assignThirdPartyProvider(parentId: string,childId: string): Promise<Boolean>;
        unassignThirdPartyProvider(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getAuthorizedAccounts(parentId: string): Promise<Account[]>;
        addToAuthorizedAccounts(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromAuthorizedAccounts(parentId: string,childIds: string[]): Promise<Boolean>;

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
        update(input: ThirdPartyProvider): Promise<ThirdPartyProvider>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getBank(parentId: string): Promise<Bank | null>;
        assignBank(parentId: string,childId: string): Promise<Boolean>;
        unassignBank(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getConsents(parentId: string): Promise<Consent[]>;
        addToConsents(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromConsents(parentId: string,childIds: string[]): Promise<Boolean>;

    };
}