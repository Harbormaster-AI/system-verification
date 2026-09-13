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
        addToBranches(parentId: string,childIds: string[]): Promise<Bank>;
        removeFromBranches(parentId: string,childIds: string[]): Promise<Bank>;

        getProducts(parentId: string,options?: PaginationOptions): Promise<BankingProduct[]>;
        addToProducts(parentId: string,childIds: string[]): Promise<Bank>;
        removeFromProducts(parentId: string,childIds: string[]): Promise<Bank>;

        getCustomers(parentId: string,options?: PaginationOptions): Promise<Customer[]>;
        addToCustomers(parentId: string,childIds: string[]): Promise<Bank>;
        removeFromCustomers(parentId: string,childIds: string[]): Promise<Bank>;

        getAccounts(parentId: string,options?: PaginationOptions): Promise<Account[]>;
        addToAccounts(parentId: string,childIds: string[]): Promise<Bank>;
        removeFromAccounts(parentId: string,childIds: string[]): Promise<Bank>;

        getPaymentCards(parentId: string,options?: PaginationOptions): Promise<PaymentCard[]>;
        addToPaymentCards(parentId: string,childIds: string[]): Promise<Bank>;
        removeFromPaymentCards(parentId: string,childIds: string[]): Promise<Bank>;

        getLoanAccounts(parentId: string,options?: PaginationOptions): Promise<LoanAccount[]>;
        addToLoanAccounts(parentId: string,childIds: string[]): Promise<Bank>;
        removeFromLoanAccounts(parentId: string,childIds: string[]): Promise<Bank>;

        getExchangeRates(parentId: string,options?: PaginationOptions): Promise<ExchangeRate[]>;
        addToExchangeRates(parentId: string,childIds: string[]): Promise<Bank>;
        removeFromExchangeRates(parentId: string,childIds: string[]): Promise<Bank>;

        getConsents(parentId: string,options?: PaginationOptions): Promise<Consent[]>;
        addToConsents(parentId: string,childIds: string[]): Promise<Bank>;
        removeFromConsents(parentId: string,childIds: string[]): Promise<Bank>;

        getThirdPartyProviders(parentId: string,options?: PaginationOptions): Promise<ThirdPartyProvider[]>;
        addToThirdPartyProviders(parentId: string,childIds: string[]): Promise<Bank>;
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
        update(input: Branch): Promise<Branch>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getBank(parentId: string): Promise<Bank | null>;
        assignBank(parentId: string,childId: string): Promise<Branch>;
        unassignBank(parentId: string,childId: string): Promise<Branch>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getAccounts(parentId: string,options?: PaginationOptions): Promise<Account[]>;
        addToAccounts(parentId: string,childIds: string[]): Promise<Branch>;
        removeFromAccounts(parentId: string,childIds: string[]): Promise<Branch>;

        getLoanAccounts(parentId: string,options?: PaginationOptions): Promise<LoanAccount[]>;
        addToLoanAccounts(parentId: string,childIds: string[]): Promise<Branch>;
        removeFromLoanAccounts(parentId: string,childIds: string[]): Promise<Branch>;

        getAtms(parentId: string,options?: PaginationOptions): Promise<ATM[]>;
        addToAtms(parentId: string,childIds: string[]): Promise<Branch>;
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
        update(input: ATM): Promise<ATM>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getBranch(parentId: string): Promise<Branch | null>;
        assignBranch(parentId: string,childId: string): Promise<ATM>;
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
        update(input: Customer): Promise<Customer>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getBank(parentId: string): Promise<Bank | null>;
        assignBank(parentId: string,childId: string): Promise<Customer>;
        unassignBank(parentId: string,childId: string): Promise<Customer>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getAccounts(parentId: string,options?: PaginationOptions): Promise<Account[]>;
        addToAccounts(parentId: string,childIds: string[]): Promise<Customer>;
        removeFromAccounts(parentId: string,childIds: string[]): Promise<Customer>;

        getLoanAccounts(parentId: string,options?: PaginationOptions): Promise<LoanAccount[]>;
        addToLoanAccounts(parentId: string,childIds: string[]): Promise<Customer>;
        removeFromLoanAccounts(parentId: string,childIds: string[]): Promise<Customer>;

        getPaymentCards(parentId: string,options?: PaginationOptions): Promise<PaymentCard[]>;
        addToPaymentCards(parentId: string,childIds: string[]): Promise<Customer>;
        removeFromPaymentCards(parentId: string,childIds: string[]): Promise<Customer>;

        getExternalAccounts(parentId: string,options?: PaginationOptions): Promise<ExternalAccount[]>;
        addToExternalAccounts(parentId: string,childIds: string[]): Promise<Customer>;
        removeFromExternalAccounts(parentId: string,childIds: string[]): Promise<Customer>;

        getFundsTransfers(parentId: string,options?: PaginationOptions): Promise<FundsTransfer[]>;
        addToFundsTransfers(parentId: string,childIds: string[]): Promise<Customer>;
        removeFromFundsTransfers(parentId: string,childIds: string[]): Promise<Customer>;

        getDisputes(parentId: string,options?: PaginationOptions): Promise<Dispute[]>;
        addToDisputes(parentId: string,childIds: string[]): Promise<Customer>;
        removeFromDisputes(parentId: string,childIds: string[]): Promise<Customer>;

        getKycProfiles(parentId: string,options?: PaginationOptions): Promise<KycProfile[]>;
        addToKycProfiles(parentId: string,childIds: string[]): Promise<Customer>;
        removeFromKycProfiles(parentId: string,childIds: string[]): Promise<Customer>;

        getConsents(parentId: string,options?: PaginationOptions): Promise<Consent[]>;
        addToConsents(parentId: string,childIds: string[]): Promise<Customer>;
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
        update(input: KycProfile): Promise<KycProfile>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getCustomer(parentId: string): Promise<Customer | null>;
        assignCustomer(parentId: string,childId: string): Promise<KycProfile>;
        unassignCustomer(parentId: string,childId: string): Promise<KycProfile>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getIdentityDocuments(parentId: string,options?: PaginationOptions): Promise<IdentityDocument[]>;
        addToIdentityDocuments(parentId: string,childIds: string[]): Promise<KycProfile>;
        removeFromIdentityDocuments(parentId: string,childIds: string[]): Promise<KycProfile>;

        getRiskAssessments(parentId: string,options?: PaginationOptions): Promise<RiskAssessment[]>;
        addToRiskAssessments(parentId: string,childIds: string[]): Promise<KycProfile>;
        removeFromRiskAssessments(parentId: string,childIds: string[]): Promise<KycProfile>;

        getScreenings(parentId: string,options?: PaginationOptions): Promise<ScreeningResult[]>;
        addToScreenings(parentId: string,childIds: string[]): Promise<KycProfile>;
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
        update(input: IdentityDocument): Promise<IdentityDocument>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getKycProfile(parentId: string): Promise<KycProfile | null>;
        assignKycProfile(parentId: string,childId: string): Promise<IdentityDocument>;
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
        update(input: RiskAssessment): Promise<RiskAssessment>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getKycProfile(parentId: string): Promise<KycProfile | null>;
        assignKycProfile(parentId: string,childId: string): Promise<RiskAssessment>;
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
        update(input: ScreeningResult): Promise<ScreeningResult>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getKycProfile(parentId: string): Promise<KycProfile | null>;
        assignKycProfile(parentId: string,childId: string): Promise<ScreeningResult>;
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
        update(input: BankingProduct): Promise<BankingProduct>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getBank(parentId: string): Promise<Bank | null>;
        assignBank(parentId: string,childId: string): Promise<BankingProduct>;
        unassignBank(parentId: string,childId: string): Promise<BankingProduct>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getAccounts(parentId: string,options?: PaginationOptions): Promise<Account[]>;
        addToAccounts(parentId: string,childIds: string[]): Promise<BankingProduct>;
        removeFromAccounts(parentId: string,childIds: string[]): Promise<BankingProduct>;

        getLoanAccounts(parentId: string,options?: PaginationOptions): Promise<LoanAccount[]>;
        addToLoanAccounts(parentId: string,childIds: string[]): Promise<BankingProduct>;
        removeFromLoanAccounts(parentId: string,childIds: string[]): Promise<BankingProduct>;

        getPaymentCards(parentId: string,options?: PaginationOptions): Promise<PaymentCard[]>;
        addToPaymentCards(parentId: string,childIds: string[]): Promise<BankingProduct>;
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
        update(input: Account): Promise<Account>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getBank(parentId: string): Promise<Bank | null>;
        assignBank(parentId: string,childId: string): Promise<Account>;
        unassignBank(parentId: string,childId: string): Promise<Account>;
        getBranch(parentId: string): Promise<Branch | null>;
        assignBranch(parentId: string,childId: string): Promise<Account>;
        unassignBranch(parentId: string,childId: string): Promise<Account>;
        getProduct(parentId: string): Promise<BankingProduct | null>;
        assignProduct(parentId: string,childId: string): Promise<Account>;
        unassignProduct(parentId: string,childId: string): Promise<Account>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getOwners(parentId: string,options?: PaginationOptions): Promise<Customer[]>;
        addToOwners(parentId: string,childIds: string[]): Promise<Account>;
        removeFromOwners(parentId: string,childIds: string[]): Promise<Account>;

        getTransactions(parentId: string,options?: PaginationOptions): Promise<Transaction[]>;
        addToTransactions(parentId: string,childIds: string[]): Promise<Account>;
        removeFromTransactions(parentId: string,childIds: string[]): Promise<Account>;

        getStatements(parentId: string,options?: PaginationOptions): Promise<AccountStatement[]>;
        addToStatements(parentId: string,childIds: string[]): Promise<Account>;
        removeFromStatements(parentId: string,childIds: string[]): Promise<Account>;

        getStandingInstructions(parentId: string,options?: PaginationOptions): Promise<StandingInstruction[]>;
        addToStandingInstructions(parentId: string,childIds: string[]): Promise<Account>;
        removeFromStandingInstructions(parentId: string,childIds: string[]): Promise<Account>;

        getFeeCharges(parentId: string,options?: PaginationOptions): Promise<FeeCharge[]>;
        addToFeeCharges(parentId: string,childIds: string[]): Promise<Account>;
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
        update(input: AccountStatement): Promise<AccountStatement>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getAccount(parentId: string): Promise<Account | null>;
        assignAccount(parentId: string,childId: string): Promise<AccountStatement>;
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
        update(input: Transaction): Promise<Transaction>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getAccount(parentId: string): Promise<Account | null>;
        assignAccount(parentId: string,childId: string): Promise<Transaction>;
        unassignAccount(parentId: string,childId: string): Promise<Transaction>;
        getExternalCounterparty(parentId: string): Promise<ExternalAccount | null>;
        assignExternalCounterparty(parentId: string,childId: string): Promise<Transaction>;
        unassignExternalCounterparty(parentId: string,childId: string): Promise<Transaction>;
        getPaymentCard(parentId: string): Promise<PaymentCard | null>;
        assignPaymentCard(parentId: string,childId: string): Promise<Transaction>;
        unassignPaymentCard(parentId: string,childId: string): Promise<Transaction>;
        getFundsTransfer(parentId: string): Promise<FundsTransfer | null>;
        assignFundsTransfer(parentId: string,childId: string): Promise<Transaction>;
        unassignFundsTransfer(parentId: string,childId: string): Promise<Transaction>;
        getFxTrade(parentId: string): Promise<FXTrade | null>;
        assignFxTrade(parentId: string,childId: string): Promise<Transaction>;
        unassignFxTrade(parentId: string,childId: string): Promise<Transaction>;
        getDispute(parentId: string): Promise<Dispute | null>;
        assignDispute(parentId: string,childId: string): Promise<Transaction>;
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
        update(input: ExternalAccount): Promise<ExternalAccount>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getCustomer(parentId: string): Promise<Customer | null>;
        assignCustomer(parentId: string,childId: string): Promise<ExternalAccount>;
        unassignCustomer(parentId: string,childId: string): Promise<ExternalAccount>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getTransactions(parentId: string,options?: PaginationOptions): Promise<Transaction[]>;
        addToTransactions(parentId: string,childIds: string[]): Promise<ExternalAccount>;
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
        update(input: FundsTransfer): Promise<FundsTransfer>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getSourceAccount(parentId: string): Promise<Account | null>;
        assignSourceAccount(parentId: string,childId: string): Promise<FundsTransfer>;
        unassignSourceAccount(parentId: string,childId: string): Promise<FundsTransfer>;
        getDestinationAccount(parentId: string): Promise<Account | null>;
        assignDestinationAccount(parentId: string,childId: string): Promise<FundsTransfer>;
        unassignDestinationAccount(parentId: string,childId: string): Promise<FundsTransfer>;
        getExternalBeneficiary(parentId: string): Promise<ExternalAccount | null>;
        assignExternalBeneficiary(parentId: string,childId: string): Promise<FundsTransfer>;
        unassignExternalBeneficiary(parentId: string,childId: string): Promise<FundsTransfer>;
        getInitiatedBy(parentId: string): Promise<Customer | null>;
        assignInitiatedBy(parentId: string,childId: string): Promise<FundsTransfer>;
        unassignInitiatedBy(parentId: string,childId: string): Promise<FundsTransfer>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getTransactions(parentId: string,options?: PaginationOptions): Promise<Transaction[]>;
        addToTransactions(parentId: string,childIds: string[]): Promise<FundsTransfer>;
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
        update(input: StandingInstruction): Promise<StandingInstruction>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getAccount(parentId: string): Promise<Account | null>;
        assignAccount(parentId: string,childId: string): Promise<StandingInstruction>;
        unassignAccount(parentId: string,childId: string): Promise<StandingInstruction>;
        getBeneficiary(parentId: string): Promise<ExternalAccount | null>;
        assignBeneficiary(parentId: string,childId: string): Promise<StandingInstruction>;
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
        update(input: PaymentCard): Promise<PaymentCard>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getBank(parentId: string): Promise<Bank | null>;
        assignBank(parentId: string,childId: string): Promise<PaymentCard>;
        unassignBank(parentId: string,childId: string): Promise<PaymentCard>;
        getAccount(parentId: string): Promise<Account | null>;
        assignAccount(parentId: string,childId: string): Promise<PaymentCard>;
        unassignAccount(parentId: string,childId: string): Promise<PaymentCard>;
        getCustomer(parentId: string): Promise<Customer | null>;
        assignCustomer(parentId: string,childId: string): Promise<PaymentCard>;
        unassignCustomer(parentId: string,childId: string): Promise<PaymentCard>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getTransactions(parentId: string,options?: PaginationOptions): Promise<Transaction[]>;
        addToTransactions(parentId: string,childIds: string[]): Promise<PaymentCard>;
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
        update(input: LoanAccount): Promise<LoanAccount>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getBank(parentId: string): Promise<Bank | null>;
        assignBank(parentId: string,childId: string): Promise<LoanAccount>;
        unassignBank(parentId: string,childId: string): Promise<LoanAccount>;
        getBranch(parentId: string): Promise<Branch | null>;
        assignBranch(parentId: string,childId: string): Promise<LoanAccount>;
        unassignBranch(parentId: string,childId: string): Promise<LoanAccount>;
        getProduct(parentId: string): Promise<BankingProduct | null>;
        assignProduct(parentId: string,childId: string): Promise<LoanAccount>;
        unassignProduct(parentId: string,childId: string): Promise<LoanAccount>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getBorrowers(parentId: string,options?: PaginationOptions): Promise<Customer[]>;
        addToBorrowers(parentId: string,childIds: string[]): Promise<LoanAccount>;
        removeFromBorrowers(parentId: string,childIds: string[]): Promise<LoanAccount>;

        getRepaymentSchedule(parentId: string,options?: PaginationOptions): Promise<RepaymentSchedule[]>;
        addToRepaymentSchedule(parentId: string,childIds: string[]): Promise<LoanAccount>;
        removeFromRepaymentSchedule(parentId: string,childIds: string[]): Promise<LoanAccount>;

        getPayments(parentId: string,options?: PaginationOptions): Promise<LoanPayment[]>;
        addToPayments(parentId: string,childIds: string[]): Promise<LoanAccount>;
        removeFromPayments(parentId: string,childIds: string[]): Promise<LoanAccount>;

        getCollateral(parentId: string,options?: PaginationOptions): Promise<Collateral[]>;
        addToCollateral(parentId: string,childIds: string[]): Promise<LoanAccount>;
        removeFromCollateral(parentId: string,childIds: string[]): Promise<LoanAccount>;

        getFeeCharges(parentId: string,options?: PaginationOptions): Promise<FeeCharge[]>;
        addToFeeCharges(parentId: string,childIds: string[]): Promise<LoanAccount>;
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
        update(input: RepaymentSchedule): Promise<RepaymentSchedule>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getLoanAccount(parentId: string): Promise<LoanAccount | null>;
        assignLoanAccount(parentId: string,childId: string): Promise<RepaymentSchedule>;
        unassignLoanAccount(parentId: string,childId: string): Promise<RepaymentSchedule>;
        getPayment(parentId: string): Promise<LoanPayment | null>;
        assignPayment(parentId: string,childId: string): Promise<RepaymentSchedule>;
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
        update(input: LoanPayment): Promise<LoanPayment>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getLoanAccount(parentId: string): Promise<LoanAccount | null>;
        assignLoanAccount(parentId: string,childId: string): Promise<LoanPayment>;
        unassignLoanAccount(parentId: string,childId: string): Promise<LoanPayment>;
        getTransaction(parentId: string): Promise<Transaction | null>;
        assignTransaction(parentId: string,childId: string): Promise<LoanPayment>;
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
        update(input: Collateral): Promise<Collateral>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getLoanAccount(parentId: string): Promise<LoanAccount | null>;
        assignLoanAccount(parentId: string,childId: string): Promise<Collateral>;
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
        update(input: FeeCharge): Promise<FeeCharge>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getAccount(parentId: string): Promise<Account | null>;
        assignAccount(parentId: string,childId: string): Promise<FeeCharge>;
        unassignAccount(parentId: string,childId: string): Promise<FeeCharge>;
        getLoanAccount(parentId: string): Promise<LoanAccount | null>;
        assignLoanAccount(parentId: string,childId: string): Promise<FeeCharge>;
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
        update(input: ExchangeRate): Promise<ExchangeRate>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getBank(parentId: string): Promise<Bank | null>;
        assignBank(parentId: string,childId: string): Promise<ExchangeRate>;
        unassignBank(parentId: string,childId: string): Promise<ExchangeRate>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getFxTrades(parentId: string,options?: PaginationOptions): Promise<FXTrade[]>;
        addToFxTrades(parentId: string,childIds: string[]): Promise<ExchangeRate>;
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
        update(input: FXTrade): Promise<FXTrade>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getCustomer(parentId: string): Promise<Customer | null>;
        assignCustomer(parentId: string,childId: string): Promise<FXTrade>;
        unassignCustomer(parentId: string,childId: string): Promise<FXTrade>;
        getBank(parentId: string): Promise<Bank | null>;
        assignBank(parentId: string,childId: string): Promise<FXTrade>;
        unassignBank(parentId: string,childId: string): Promise<FXTrade>;
        getExchangeRate(parentId: string): Promise<ExchangeRate | null>;
        assignExchangeRate(parentId: string,childId: string): Promise<FXTrade>;
        unassignExchangeRate(parentId: string,childId: string): Promise<FXTrade>;
        getSourceAccount(parentId: string): Promise<Account | null>;
        assignSourceAccount(parentId: string,childId: string): Promise<FXTrade>;
        unassignSourceAccount(parentId: string,childId: string): Promise<FXTrade>;
        getDestinationAccount(parentId: string): Promise<Account | null>;
        assignDestinationAccount(parentId: string,childId: string): Promise<FXTrade>;
        unassignDestinationAccount(parentId: string,childId: string): Promise<FXTrade>;
        getTransaction(parentId: string): Promise<Transaction | null>;
        assignTransaction(parentId: string,childId: string): Promise<FXTrade>;
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
        update(input: Dispute): Promise<Dispute>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getTransaction(parentId: string): Promise<Transaction | null>;
        assignTransaction(parentId: string,childId: string): Promise<Dispute>;
        unassignTransaction(parentId: string,childId: string): Promise<Dispute>;
        getCustomer(parentId: string): Promise<Customer | null>;
        assignCustomer(parentId: string,childId: string): Promise<Dispute>;
        unassignCustomer(parentId: string,childId: string): Promise<Dispute>;
        getAccount(parentId: string): Promise<Account | null>;
        assignAccount(parentId: string,childId: string): Promise<Dispute>;
        unassignAccount(parentId: string,childId: string): Promise<Dispute>;
        getPaymentCard(parentId: string): Promise<PaymentCard | null>;
        assignPaymentCard(parentId: string,childId: string): Promise<Dispute>;
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
        update(input: Consent): Promise<Consent>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getCustomer(parentId: string): Promise<Customer | null>;
        assignCustomer(parentId: string,childId: string): Promise<Consent>;
        unassignCustomer(parentId: string,childId: string): Promise<Consent>;
        getBank(parentId: string): Promise<Bank | null>;
        assignBank(parentId: string,childId: string): Promise<Consent>;
        unassignBank(parentId: string,childId: string): Promise<Consent>;
        getThirdPartyProvider(parentId: string): Promise<ThirdPartyProvider | null>;
        assignThirdPartyProvider(parentId: string,childId: string): Promise<Consent>;
        unassignThirdPartyProvider(parentId: string,childId: string): Promise<Consent>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getAuthorizedAccounts(parentId: string,options?: PaginationOptions): Promise<Account[]>;
        addToAuthorizedAccounts(parentId: string,childIds: string[]): Promise<Consent>;
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
        update(input: ThirdPartyProvider): Promise<ThirdPartyProvider>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getBank(parentId: string): Promise<Bank | null>;
        assignBank(parentId: string,childId: string): Promise<ThirdPartyProvider>;
        unassignBank(parentId: string,childId: string): Promise<ThirdPartyProvider>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getConsents(parentId: string,options?: PaginationOptions): Promise<Consent[]>;
        addToConsents(parentId: string,childIds: string[]): Promise<ThirdPartyProvider>;
        removeFromConsents(parentId: string,childIds: string[]): Promise<ThirdPartyProvider>;

    };
}