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

