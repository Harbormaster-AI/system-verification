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


    bank: {
    find(id: string): Promise<Bank | null>;

    findAll(
        options?: PaginationOptions
    ): Promise<Bank[]>;

    add(
        input: BankInput
): Promise<Bank>;

    update(
        id: string,
        input: BankInput
): Promise<Bank>;

    remove(
        id: string
): Promise<boolean>;

};


    branch: {
    find(id: string): Promise<Branch | null>;

    findAll(
        options?: PaginationOptions
    ): Promise<Branch[]>;

    add(
        input: BranchInput
): Promise<Branch>;

    update(
        id: string,
        input: BranchInput
): Promise<Branch>;

    remove(
        id: string
): Promise<boolean>;

};


    aTM: {
    find(id: string): Promise<ATM | null>;

    findAll(
        options?: PaginationOptions
    ): Promise<ATM[]>;

    add(
        input: ATMInput
): Promise<ATM>;

    update(
        id: string,
        input: ATMInput
): Promise<ATM>;

    remove(
        id: string
): Promise<boolean>;

};


    customer: {
    find(id: string): Promise<Customer | null>;

    findAll(
        options?: PaginationOptions
    ): Promise<Customer[]>;

    add(
        input: CustomerInput
): Promise<Customer>;

    update(
        id: string,
        input: CustomerInput
): Promise<Customer>;

    remove(
        id: string
): Promise<boolean>;

};


    kycProfile: {
    find(id: string): Promise<KycProfile | null>;

    findAll(
        options?: PaginationOptions
    ): Promise<KycProfile[]>;

    add(
        input: KycProfileInput
): Promise<KycProfile>;

    update(
        id: string,
        input: KycProfileInput
): Promise<KycProfile>;

    remove(
        id: string
): Promise<boolean>;

};


    identityDocument: {
    find(id: string): Promise<IdentityDocument | null>;

    findAll(
        options?: PaginationOptions
    ): Promise<IdentityDocument[]>;

    add(
        input: IdentityDocumentInput
): Promise<IdentityDocument>;

    update(
        id: string,
        input: IdentityDocumentInput
): Promise<IdentityDocument>;

    remove(
        id: string
): Promise<boolean>;

};


    riskAssessment: {
    find(id: string): Promise<RiskAssessment | null>;

    findAll(
        options?: PaginationOptions
    ): Promise<RiskAssessment[]>;

    add(
        input: RiskAssessmentInput
): Promise<RiskAssessment>;

    update(
        id: string,
        input: RiskAssessmentInput
): Promise<RiskAssessment>;

    remove(
        id: string
): Promise<boolean>;

};


    screeningResult: {
    find(id: string): Promise<ScreeningResult | null>;

    findAll(
        options?: PaginationOptions
    ): Promise<ScreeningResult[]>;

    add(
        input: ScreeningResultInput
): Promise<ScreeningResult>;

    update(
        id: string,
        input: ScreeningResultInput
): Promise<ScreeningResult>;

    remove(
        id: string
): Promise<boolean>;

};


    bankingProduct: {
    find(id: string): Promise<BankingProduct | null>;

    findAll(
        options?: PaginationOptions
    ): Promise<BankingProduct[]>;

    add(
        input: BankingProductInput
): Promise<BankingProduct>;

    update(
        id: string,
        input: BankingProductInput
): Promise<BankingProduct>;

    remove(
        id: string
): Promise<boolean>;

};


    account: {
    find(id: string): Promise<Account | null>;

    findAll(
        options?: PaginationOptions
    ): Promise<Account[]>;

    add(
        input: AccountInput
): Promise<Account>;

    update(
        id: string,
        input: AccountInput
): Promise<Account>;

    remove(
        id: string
): Promise<boolean>;

};


    accountStatement: {
    find(id: string): Promise<AccountStatement | null>;

    findAll(
        options?: PaginationOptions
    ): Promise<AccountStatement[]>;

    add(
        input: AccountStatementInput
): Promise<AccountStatement>;

    update(
        id: string,
        input: AccountStatementInput
): Promise<AccountStatement>;

    remove(
        id: string
): Promise<boolean>;

};


    transaction: {
    find(id: string): Promise<Transaction | null>;

    findAll(
        options?: PaginationOptions
    ): Promise<Transaction[]>;

    add(
        input: TransactionInput
): Promise<Transaction>;

    update(
        id: string,
        input: TransactionInput
): Promise<Transaction>;

    remove(
        id: string
): Promise<boolean>;

};


    externalAccount: {
    find(id: string): Promise<ExternalAccount | null>;

    findAll(
        options?: PaginationOptions
    ): Promise<ExternalAccount[]>;

    add(
        input: ExternalAccountInput
): Promise<ExternalAccount>;

    update(
        id: string,
        input: ExternalAccountInput
): Promise<ExternalAccount>;

    remove(
        id: string
): Promise<boolean>;

};


    fundsTransfer: {
    find(id: string): Promise<FundsTransfer | null>;

    findAll(
        options?: PaginationOptions
    ): Promise<FundsTransfer[]>;

    add(
        input: FundsTransferInput
): Promise<FundsTransfer>;

    update(
        id: string,
        input: FundsTransferInput
): Promise<FundsTransfer>;

    remove(
        id: string
): Promise<boolean>;

};


    standingInstruction: {
    find(id: string): Promise<StandingInstruction | null>;

    findAll(
        options?: PaginationOptions
    ): Promise<StandingInstruction[]>;

    add(
        input: StandingInstructionInput
): Promise<StandingInstruction>;

    update(
        id: string,
        input: StandingInstructionInput
): Promise<StandingInstruction>;

    remove(
        id: string
): Promise<boolean>;

};


    paymentCard: {
    find(id: string): Promise<PaymentCard | null>;

    findAll(
        options?: PaginationOptions
    ): Promise<PaymentCard[]>;

    add(
        input: PaymentCardInput
): Promise<PaymentCard>;

    update(
        id: string,
        input: PaymentCardInput
): Promise<PaymentCard>;

    remove(
        id: string
): Promise<boolean>;

};


    loanAccount: {
    find(id: string): Promise<LoanAccount | null>;

    findAll(
        options?: PaginationOptions
    ): Promise<LoanAccount[]>;

    add(
        input: LoanAccountInput
): Promise<LoanAccount>;

    update(
        id: string,
        input: LoanAccountInput
): Promise<LoanAccount>;

    remove(
        id: string
): Promise<boolean>;

};


    repaymentSchedule: {
    find(id: string): Promise<RepaymentSchedule | null>;

    findAll(
        options?: PaginationOptions
    ): Promise<RepaymentSchedule[]>;

    add(
        input: RepaymentScheduleInput
): Promise<RepaymentSchedule>;

    update(
        id: string,
        input: RepaymentScheduleInput
): Promise<RepaymentSchedule>;

    remove(
        id: string
): Promise<boolean>;

};


    loanPayment: {
    find(id: string): Promise<LoanPayment | null>;

    findAll(
        options?: PaginationOptions
    ): Promise<LoanPayment[]>;

    add(
        input: LoanPaymentInput
): Promise<LoanPayment>;

    update(
        id: string,
        input: LoanPaymentInput
): Promise<LoanPayment>;

    remove(
        id: string
): Promise<boolean>;

};


    collateral: {
    find(id: string): Promise<Collateral | null>;

    findAll(
        options?: PaginationOptions
    ): Promise<Collateral[]>;

    add(
        input: CollateralInput
): Promise<Collateral>;

    update(
        id: string,
        input: CollateralInput
): Promise<Collateral>;

    remove(
        id: string
): Promise<boolean>;

};


    feeCharge: {
    find(id: string): Promise<FeeCharge | null>;

    findAll(
        options?: PaginationOptions
    ): Promise<FeeCharge[]>;

    add(
        input: FeeChargeInput
): Promise<FeeCharge>;

    update(
        id: string,
        input: FeeChargeInput
): Promise<FeeCharge>;

    remove(
        id: string
): Promise<boolean>;

};


    exchangeRate: {
    find(id: string): Promise<ExchangeRate | null>;

    findAll(
        options?: PaginationOptions
    ): Promise<ExchangeRate[]>;

    add(
        input: ExchangeRateInput
): Promise<ExchangeRate>;

    update(
        id: string,
        input: ExchangeRateInput
): Promise<ExchangeRate>;

    remove(
        id: string
): Promise<boolean>;

};


    fXTrade: {
    find(id: string): Promise<FXTrade | null>;

    findAll(
        options?: PaginationOptions
    ): Promise<FXTrade[]>;

    add(
        input: FXTradeInput
): Promise<FXTrade>;

    update(
        id: string,
        input: FXTradeInput
): Promise<FXTrade>;

    remove(
        id: string
): Promise<boolean>;

};


    dispute: {
    find(id: string): Promise<Dispute | null>;

    findAll(
        options?: PaginationOptions
    ): Promise<Dispute[]>;

    add(
        input: DisputeInput
): Promise<Dispute>;

    update(
        id: string,
        input: DisputeInput
): Promise<Dispute>;

    remove(
        id: string
): Promise<boolean>;

};


    consent: {
    find(id: string): Promise<Consent | null>;

    findAll(
        options?: PaginationOptions
    ): Promise<Consent[]>;

    add(
        input: ConsentInput
): Promise<Consent>;

    update(
        id: string,
        input: ConsentInput
): Promise<Consent>;

    remove(
        id: string
): Promise<boolean>;

};


    thirdPartyProvider: {
    find(id: string): Promise<ThirdPartyProvider | null>;

    findAll(
        options?: PaginationOptions
    ): Promise<ThirdPartyProvider[]>;

    add(
        input: ThirdPartyProviderInput
): Promise<ThirdPartyProvider>;

    update(
        id: string,
        input: ThirdPartyProviderInput
): Promise<ThirdPartyProvider>;

    remove(
        id: string
): Promise<boolean>;

};

}