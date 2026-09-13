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
        update(input: Bank): Promise<Bank>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------


        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getBranches(parentId: string,options?: PaginationOptions): Promise<Branch[]>;
        addToBranches(parentId: string,childIds: string[]): Promise<void>;
        removeFromBranches(parentId: string,childIds: string[]): Promise<void>;

        getProducts(parentId: string,options?: PaginationOptions): Promise<BankingProduct[]>;
        addToProducts(parentId: string,childIds: string[]): Promise<void>;
        removeFromProducts(parentId: string,childIds: string[]): Promise<void>;

        getCustomers(parentId: string,options?: PaginationOptions): Promise<Customer[]>;
        addToCustomers(parentId: string,childIds: string[]): Promise<void>;
        removeFromCustomers(parentId: string,childIds: string[]): Promise<void>;

        getAccounts(parentId: string,options?: PaginationOptions): Promise<Account[]>;
        addToAccounts(parentId: string,childIds: string[]): Promise<void>;
        removeFromAccounts(parentId: string,childIds: string[]): Promise<void>;

        getPaymentCards(parentId: string,options?: PaginationOptions): Promise<PaymentCard[]>;
        addToPaymentCards(parentId: string,childIds: string[]): Promise<void>;
        removeFromPaymentCards(parentId: string,childIds: string[]): Promise<void>;

        getLoanAccounts(parentId: string,options?: PaginationOptions): Promise<LoanAccount[]>;
        addToLoanAccounts(parentId: string,childIds: string[]): Promise<void>;
        removeFromLoanAccounts(parentId: string,childIds: string[]): Promise<void>;

        getExchangeRates(parentId: string,options?: PaginationOptions): Promise<ExchangeRate[]>;
        addToExchangeRates(parentId: string,childIds: string[]): Promise<void>;
        removeFromExchangeRates(parentId: string,childIds: string[]): Promise<void>;

        getConsents(parentId: string,options?: PaginationOptions): Promise<Consent[]>;
        addToConsents(parentId: string,childIds: string[]): Promise<void>;
        removeFromConsents(parentId: string,childIds: string[]): Promise<void>;

        getThirdPartyProviders(parentId: string,options?: PaginationOptions): Promise<ThirdPartyProvider[]>;
        addToThirdPartyProviders(parentId: string,childIds: string[]): Promise<void>;
        removeFromThirdPartyProviders(parentId: string,childIds: string[]): Promise<void>;

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
        assignBank(parentId: string,childId: string): Promise<void>;
        unassignBank(parentId: string,childId: string): Promise<void>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getAccounts(parentId: string,options?: PaginationOptions): Promise<Account[]>;
        addToAccounts(parentId: string,childIds: string[]): Promise<void>;
        removeFromAccounts(parentId: string,childIds: string[]): Promise<void>;

        getLoanAccounts(parentId: string,options?: PaginationOptions): Promise<LoanAccount[]>;
        addToLoanAccounts(parentId: string,childIds: string[]): Promise<void>;
        removeFromLoanAccounts(parentId: string,childIds: string[]): Promise<void>;

        getAtms(parentId: string,options?: PaginationOptions): Promise<ATM[]>;
        addToAtms(parentId: string,childIds: string[]): Promise<void>;
        removeFromAtms(parentId: string,childIds: string[]): Promise<void>;

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
        assignBranch(parentId: string,childId: string): Promise<void>;
        unassignBranch(parentId: string,childId: string): Promise<void>;

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
        assignBank(parentId: string,childId: string): Promise<void>;
        unassignBank(parentId: string,childId: string): Promise<void>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getAccounts(parentId: string,options?: PaginationOptions): Promise<Account[]>;
        addToAccounts(parentId: string,childIds: string[]): Promise<void>;
        removeFromAccounts(parentId: string,childIds: string[]): Promise<void>;

        getLoanAccounts(parentId: string,options?: PaginationOptions): Promise<LoanAccount[]>;
        addToLoanAccounts(parentId: string,childIds: string[]): Promise<void>;
        removeFromLoanAccounts(parentId: string,childIds: string[]): Promise<void>;

        getPaymentCards(parentId: string,options?: PaginationOptions): Promise<PaymentCard[]>;
        addToPaymentCards(parentId: string,childIds: string[]): Promise<void>;
        removeFromPaymentCards(parentId: string,childIds: string[]): Promise<void>;

        getExternalAccounts(parentId: string,options?: PaginationOptions): Promise<ExternalAccount[]>;
        addToExternalAccounts(parentId: string,childIds: string[]): Promise<void>;
        removeFromExternalAccounts(parentId: string,childIds: string[]): Promise<void>;

        getFundsTransfers(parentId: string,options?: PaginationOptions): Promise<FundsTransfer[]>;
        addToFundsTransfers(parentId: string,childIds: string[]): Promise<void>;
        removeFromFundsTransfers(parentId: string,childIds: string[]): Promise<void>;

        getDisputes(parentId: string,options?: PaginationOptions): Promise<Dispute[]>;
        addToDisputes(parentId: string,childIds: string[]): Promise<void>;
        removeFromDisputes(parentId: string,childIds: string[]): Promise<void>;

        getKycProfiles(parentId: string,options?: PaginationOptions): Promise<KycProfile[]>;
        addToKycProfiles(parentId: string,childIds: string[]): Promise<void>;
        removeFromKycProfiles(parentId: string,childIds: string[]): Promise<void>;

        getConsents(parentId: string,options?: PaginationOptions): Promise<Consent[]>;
        addToConsents(parentId: string,childIds: string[]): Promise<void>;
        removeFromConsents(parentId: string,childIds: string[]): Promise<void>;

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
        assignCustomer(parentId: string,childId: string): Promise<void>;
        unassignCustomer(parentId: string,childId: string): Promise<void>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getIdentityDocuments(parentId: string,options?: PaginationOptions): Promise<IdentityDocument[]>;
        addToIdentityDocuments(parentId: string,childIds: string[]): Promise<void>;
        removeFromIdentityDocuments(parentId: string,childIds: string[]): Promise<void>;

        getRiskAssessments(parentId: string,options?: PaginationOptions): Promise<RiskAssessment[]>;
        addToRiskAssessments(parentId: string,childIds: string[]): Promise<void>;
        removeFromRiskAssessments(parentId: string,childIds: string[]): Promise<void>;

        getScreenings(parentId: string,options?: PaginationOptions): Promise<ScreeningResult[]>;
        addToScreenings(parentId: string,childIds: string[]): Promise<void>;
        removeFromScreenings(parentId: string,childIds: string[]): Promise<void>;

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
        assignKycProfile(parentId: string,childId: string): Promise<void>;
        unassignKycProfile(parentId: string,childId: string): Promise<void>;

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
        assignKycProfile(parentId: string,childId: string): Promise<void>;
        unassignKycProfile(parentId: string,childId: string): Promise<void>;

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
        assignKycProfile(parentId: string,childId: string): Promise<void>;
        unassignKycProfile(parentId: string,childId: string): Promise<void>;

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
        assignBank(parentId: string,childId: string): Promise<void>;
        unassignBank(parentId: string,childId: string): Promise<void>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getAccounts(parentId: string,options?: PaginationOptions): Promise<Account[]>;
        addToAccounts(parentId: string,childIds: string[]): Promise<void>;
        removeFromAccounts(parentId: string,childIds: string[]): Promise<void>;

        getLoanAccounts(parentId: string,options?: PaginationOptions): Promise<LoanAccount[]>;
        addToLoanAccounts(parentId: string,childIds: string[]): Promise<void>;
        removeFromLoanAccounts(parentId: string,childIds: string[]): Promise<void>;

        getPaymentCards(parentId: string,options?: PaginationOptions): Promise<PaymentCard[]>;
        addToPaymentCards(parentId: string,childIds: string[]): Promise<void>;
        removeFromPaymentCards(parentId: string,childIds: string[]): Promise<void>;

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
        assignBank(parentId: string,childId: string): Promise<void>;
        unassignBank(parentId: string,childId: string): Promise<void>;
        getBranch(parentId: string): Promise<Branch | null>;
        assignBranch(parentId: string,childId: string): Promise<void>;
        unassignBranch(parentId: string,childId: string): Promise<void>;
        getProduct(parentId: string): Promise<BankingProduct | null>;
        assignProduct(parentId: string,childId: string): Promise<void>;
        unassignProduct(parentId: string,childId: string): Promise<void>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getOwners(parentId: string,options?: PaginationOptions): Promise<Customer[]>;
        addToOwners(parentId: string,childIds: string[]): Promise<void>;
        removeFromOwners(parentId: string,childIds: string[]): Promise<void>;

        getTransactions(parentId: string,options?: PaginationOptions): Promise<Transaction[]>;
        addToTransactions(parentId: string,childIds: string[]): Promise<void>;
        removeFromTransactions(parentId: string,childIds: string[]): Promise<void>;

        getStatements(parentId: string,options?: PaginationOptions): Promise<AccountStatement[]>;
        addToStatements(parentId: string,childIds: string[]): Promise<void>;
        removeFromStatements(parentId: string,childIds: string[]): Promise<void>;

        getStandingInstructions(parentId: string,options?: PaginationOptions): Promise<StandingInstruction[]>;
        addToStandingInstructions(parentId: string,childIds: string[]): Promise<void>;
        removeFromStandingInstructions(parentId: string,childIds: string[]): Promise<void>;

        getFeeCharges(parentId: string,options?: PaginationOptions): Promise<FeeCharge[]>;
        addToFeeCharges(parentId: string,childIds: string[]): Promise<void>;
        removeFromFeeCharges(parentId: string,childIds: string[]): Promise<void>;

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
        assignAccount(parentId: string,childId: string): Promise<void>;
        unassignAccount(parentId: string,childId: string): Promise<void>;

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
        assignAccount(parentId: string,childId: string): Promise<void>;
        unassignAccount(parentId: string,childId: string): Promise<void>;
        getExternalCounterparty(parentId: string): Promise<ExternalAccount | null>;
        assignExternalCounterparty(parentId: string,childId: string): Promise<void>;
        unassignExternalCounterparty(parentId: string,childId: string): Promise<void>;
        getPaymentCard(parentId: string): Promise<PaymentCard | null>;
        assignPaymentCard(parentId: string,childId: string): Promise<void>;
        unassignPaymentCard(parentId: string,childId: string): Promise<void>;
        getFundsTransfer(parentId: string): Promise<FundsTransfer | null>;
        assignFundsTransfer(parentId: string,childId: string): Promise<void>;
        unassignFundsTransfer(parentId: string,childId: string): Promise<void>;
        getFxTrade(parentId: string): Promise<FXTrade | null>;
        assignFxTrade(parentId: string,childId: string): Promise<void>;
        unassignFxTrade(parentId: string,childId: string): Promise<void>;
        getDispute(parentId: string): Promise<Dispute | null>;
        assignDispute(parentId: string,childId: string): Promise<void>;
        unassignDispute(parentId: string,childId: string): Promise<void>;

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
        assignCustomer(parentId: string,childId: string): Promise<void>;
        unassignCustomer(parentId: string,childId: string): Promise<void>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getTransactions(parentId: string,options?: PaginationOptions): Promise<Transaction[]>;
        addToTransactions(parentId: string,childIds: string[]): Promise<void>;
        removeFromTransactions(parentId: string,childIds: string[]): Promise<void>;

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
        assignSourceAccount(parentId: string,childId: string): Promise<void>;
        unassignSourceAccount(parentId: string,childId: string): Promise<void>;
        getDestinationAccount(parentId: string): Promise<Account | null>;
        assignDestinationAccount(parentId: string,childId: string): Promise<void>;
        unassignDestinationAccount(parentId: string,childId: string): Promise<void>;
        getExternalBeneficiary(parentId: string): Promise<ExternalAccount | null>;
        assignExternalBeneficiary(parentId: string,childId: string): Promise<void>;
        unassignExternalBeneficiary(parentId: string,childId: string): Promise<void>;
        getInitiatedBy(parentId: string): Promise<Customer | null>;
        assignInitiatedBy(parentId: string,childId: string): Promise<void>;
        unassignInitiatedBy(parentId: string,childId: string): Promise<void>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getTransactions(parentId: string,options?: PaginationOptions): Promise<Transaction[]>;
        addToTransactions(parentId: string,childIds: string[]): Promise<void>;
        removeFromTransactions(parentId: string,childIds: string[]): Promise<void>;

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
        assignAccount(parentId: string,childId: string): Promise<void>;
        unassignAccount(parentId: string,childId: string): Promise<void>;
        getBeneficiary(parentId: string): Promise<ExternalAccount | null>;
        assignBeneficiary(parentId: string,childId: string): Promise<void>;
        unassignBeneficiary(parentId: string,childId: string): Promise<void>;

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
        assignBank(parentId: string,childId: string): Promise<void>;
        unassignBank(parentId: string,childId: string): Promise<void>;
        getAccount(parentId: string): Promise<Account | null>;
        assignAccount(parentId: string,childId: string): Promise<void>;
        unassignAccount(parentId: string,childId: string): Promise<void>;
        getCustomer(parentId: string): Promise<Customer | null>;
        assignCustomer(parentId: string,childId: string): Promise<void>;
        unassignCustomer(parentId: string,childId: string): Promise<void>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getTransactions(parentId: string,options?: PaginationOptions): Promise<Transaction[]>;
        addToTransactions(parentId: string,childIds: string[]): Promise<void>;
        removeFromTransactions(parentId: string,childIds: string[]): Promise<void>;

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
        assignBank(parentId: string,childId: string): Promise<void>;
        unassignBank(parentId: string,childId: string): Promise<void>;
        getBranch(parentId: string): Promise<Branch | null>;
        assignBranch(parentId: string,childId: string): Promise<void>;
        unassignBranch(parentId: string,childId: string): Promise<void>;
        getProduct(parentId: string): Promise<BankingProduct | null>;
        assignProduct(parentId: string,childId: string): Promise<void>;
        unassignProduct(parentId: string,childId: string): Promise<void>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getBorrowers(parentId: string,options?: PaginationOptions): Promise<Customer[]>;
        addToBorrowers(parentId: string,childIds: string[]): Promise<void>;
        removeFromBorrowers(parentId: string,childIds: string[]): Promise<void>;

        getRepaymentSchedule(parentId: string,options?: PaginationOptions): Promise<RepaymentSchedule[]>;
        addToRepaymentSchedule(parentId: string,childIds: string[]): Promise<void>;
        removeFromRepaymentSchedule(parentId: string,childIds: string[]): Promise<void>;

        getPayments(parentId: string,options?: PaginationOptions): Promise<LoanPayment[]>;
        addToPayments(parentId: string,childIds: string[]): Promise<void>;
        removeFromPayments(parentId: string,childIds: string[]): Promise<void>;

        getCollateral(parentId: string,options?: PaginationOptions): Promise<Collateral[]>;
        addToCollateral(parentId: string,childIds: string[]): Promise<void>;
        removeFromCollateral(parentId: string,childIds: string[]): Promise<void>;

        getFeeCharges(parentId: string,options?: PaginationOptions): Promise<FeeCharge[]>;
        addToFeeCharges(parentId: string,childIds: string[]): Promise<void>;
        removeFromFeeCharges(parentId: string,childIds: string[]): Promise<void>;

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
        assignLoanAccount(parentId: string,childId: string): Promise<void>;
        unassignLoanAccount(parentId: string,childId: string): Promise<void>;
        getPayment(parentId: string): Promise<LoanPayment | null>;
        assignPayment(parentId: string,childId: string): Promise<void>;
        unassignPayment(parentId: string,childId: string): Promise<void>;

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
        assignLoanAccount(parentId: string,childId: string): Promise<void>;
        unassignLoanAccount(parentId: string,childId: string): Promise<void>;
        getTransaction(parentId: string): Promise<Transaction | null>;
        assignTransaction(parentId: string,childId: string): Promise<void>;
        unassignTransaction(parentId: string,childId: string): Promise<void>;

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
        assignLoanAccount(parentId: string,childId: string): Promise<void>;
        unassignLoanAccount(parentId: string,childId: string): Promise<void>;

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
        assignAccount(parentId: string,childId: string): Promise<void>;
        unassignAccount(parentId: string,childId: string): Promise<void>;
        getLoanAccount(parentId: string): Promise<LoanAccount | null>;
        assignLoanAccount(parentId: string,childId: string): Promise<void>;
        unassignLoanAccount(parentId: string,childId: string): Promise<void>;

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
        assignBank(parentId: string,childId: string): Promise<void>;
        unassignBank(parentId: string,childId: string): Promise<void>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getFxTrades(parentId: string,options?: PaginationOptions): Promise<FXTrade[]>;
        addToFxTrades(parentId: string,childIds: string[]): Promise<void>;
        removeFromFxTrades(parentId: string,childIds: string[]): Promise<void>;

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
        assignCustomer(parentId: string,childId: string): Promise<void>;
        unassignCustomer(parentId: string,childId: string): Promise<void>;
        getBank(parentId: string): Promise<Bank | null>;
        assignBank(parentId: string,childId: string): Promise<void>;
        unassignBank(parentId: string,childId: string): Promise<void>;
        getExchangeRate(parentId: string): Promise<ExchangeRate | null>;
        assignExchangeRate(parentId: string,childId: string): Promise<void>;
        unassignExchangeRate(parentId: string,childId: string): Promise<void>;
        getSourceAccount(parentId: string): Promise<Account | null>;
        assignSourceAccount(parentId: string,childId: string): Promise<void>;
        unassignSourceAccount(parentId: string,childId: string): Promise<void>;
        getDestinationAccount(parentId: string): Promise<Account | null>;
        assignDestinationAccount(parentId: string,childId: string): Promise<void>;
        unassignDestinationAccount(parentId: string,childId: string): Promise<void>;
        getTransaction(parentId: string): Promise<Transaction | null>;
        assignTransaction(parentId: string,childId: string): Promise<void>;
        unassignTransaction(parentId: string,childId: string): Promise<void>;

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
        assignTransaction(parentId: string,childId: string): Promise<void>;
        unassignTransaction(parentId: string,childId: string): Promise<void>;
        getCustomer(parentId: string): Promise<Customer | null>;
        assignCustomer(parentId: string,childId: string): Promise<void>;
        unassignCustomer(parentId: string,childId: string): Promise<void>;
        getAccount(parentId: string): Promise<Account | null>;
        assignAccount(parentId: string,childId: string): Promise<void>;
        unassignAccount(parentId: string,childId: string): Promise<void>;
        getPaymentCard(parentId: string): Promise<PaymentCard | null>;
        assignPaymentCard(parentId: string,childId: string): Promise<void>;
        unassignPaymentCard(parentId: string,childId: string): Promise<void>;

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
        assignCustomer(parentId: string,childId: string): Promise<void>;
        unassignCustomer(parentId: string,childId: string): Promise<void>;
        getBank(parentId: string): Promise<Bank | null>;
        assignBank(parentId: string,childId: string): Promise<void>;
        unassignBank(parentId: string,childId: string): Promise<void>;
        getThirdPartyProvider(parentId: string): Promise<ThirdPartyProvider | null>;
        assignThirdPartyProvider(parentId: string,childId: string): Promise<void>;
        unassignThirdPartyProvider(parentId: string,childId: string): Promise<void>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getAuthorizedAccounts(parentId: string,options?: PaginationOptions): Promise<Account[]>;
        addToAuthorizedAccounts(parentId: string,childIds: string[]): Promise<void>;
        removeFromAuthorizedAccounts(parentId: string,childIds: string[]): Promise<void>;

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
        assignBank(parentId: string,childId: string): Promise<void>;
        unassignBank(parentId: string,childId: string): Promise<void>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getConsents(parentId: string,options?: PaginationOptions): Promise<Consent[]>;
        addToConsents(parentId: string,childIds: string[]): Promise<void>;
        removeFromConsents(parentId: string,childIds: string[]): Promise<void>;

    };
}