import {
    BackendAPI,
    PaginationOptions
} from "../backend/api";

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
} from "../backend/types";

const { paginateResults } = require('./utils');

interface ResolverContext {
backend: BackendAPI;
}

interface ParentIdentifier {
    parentId: string;
}

interface ParentChildIdentifiers {
    parentId: string;
    childId: string;
}

interface ParentChildrenIdentifiers {
    parentId: string;
    childIds: string[];
}

type ResolverParent = unknown;

module.exports = {

Query: {

    health: () => "OK",

    //////////////////////////
    // Bank
    //////////////////////////
    bank: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.find( id );
    },

    banks: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.findAll({ pageSize, after });
    },
    //////////////////////////
    // Branch
    //////////////////////////
    branch: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.branch.find( id );
    },

    branchs: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.branch.findAll({ pageSize, after });
    },
    //////////////////////////
    // ATM
    //////////////////////////
    aTM: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.aTM.find( id );
    },

    aTMs: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.aTM.findAll({ pageSize, after });
    },
    //////////////////////////
    // Customer
    //////////////////////////
    customer: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.find( id );
    },

    customers: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.findAll({ pageSize, after });
    },
    //////////////////////////
    // KycProfile
    //////////////////////////
    kycProfile: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.kycProfile.find( id );
    },

    kycProfiles: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.kycProfile.findAll({ pageSize, after });
    },
    //////////////////////////
    // IdentityDocument
    //////////////////////////
    identityDocument: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.identityDocument.find( id );
    },

    identityDocuments: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.identityDocument.findAll({ pageSize, after });
    },
    //////////////////////////
    // RiskAssessment
    //////////////////////////
    riskAssessment: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.riskAssessment.find( id );
    },

    riskAssessments: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.riskAssessment.findAll({ pageSize, after });
    },
    //////////////////////////
    // ScreeningResult
    //////////////////////////
    screeningResult: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.screeningResult.find( id );
    },

    screeningResults: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.screeningResult.findAll({ pageSize, after });
    },
    //////////////////////////
    // BankingProduct
    //////////////////////////
    bankingProduct: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.bankingProduct.find( id );
    },

    bankingProducts: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.bankingProduct.findAll({ pageSize, after });
    },
    //////////////////////////
    // Account
    //////////////////////////
    account: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.account.find( id );
    },

    accounts: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.findAll({ pageSize, after });
    },
    //////////////////////////
    // AccountStatement
    //////////////////////////
    accountStatement: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.accountStatement.find( id );
    },

    accountStatements: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.accountStatement.findAll({ pageSize, after });
    },
    //////////////////////////
    // Transaction
    //////////////////////////
    transaction: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.transaction.find( id );
    },

    transactions: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.transaction.findAll({ pageSize, after });
    },
    //////////////////////////
    // ExternalAccount
    //////////////////////////
    externalAccount: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.externalAccount.find( id );
    },

    externalAccounts: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.externalAccount.findAll({ pageSize, after });
    },
    //////////////////////////
    // FundsTransfer
    //////////////////////////
    fundsTransfer: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.fundsTransfer.find( id );
    },

    fundsTransfers: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.fundsTransfer.findAll({ pageSize, after });
    },
    //////////////////////////
    // StandingInstruction
    //////////////////////////
    standingInstruction: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.standingInstruction.find( id );
    },

    standingInstructions: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.standingInstruction.findAll({ pageSize, after });
    },
    //////////////////////////
    // PaymentCard
    //////////////////////////
    paymentCard: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.paymentCard.find( id );
    },

    paymentCards: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.paymentCard.findAll({ pageSize, after });
    },
    //////////////////////////
    // LoanAccount
    //////////////////////////
    loanAccount: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.find( id );
    },

    loanAccounts: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.findAll({ pageSize, after });
    },
    //////////////////////////
    // RepaymentSchedule
    //////////////////////////
    repaymentSchedule: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.repaymentSchedule.find( id );
    },

    repaymentSchedules: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.repaymentSchedule.findAll({ pageSize, after });
    },
    //////////////////////////
    // LoanPayment
    //////////////////////////
    loanPayment: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.loanPayment.find( id );
    },

    loanPayments: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanPayment.findAll({ pageSize, after });
    },
    //////////////////////////
    // Collateral
    //////////////////////////
    collateral: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.collateral.find( id );
    },

    collaterals: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.collateral.findAll({ pageSize, after });
    },
    //////////////////////////
    // FeeCharge
    //////////////////////////
    feeCharge: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.feeCharge.find( id );
    },

    feeCharges: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.feeCharge.findAll({ pageSize, after });
    },
    //////////////////////////
    // ExchangeRate
    //////////////////////////
    exchangeRate: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.exchangeRate.find( id );
    },

    exchangeRates: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.exchangeRate.findAll({ pageSize, after });
    },
    //////////////////////////
    // FXTrade
    //////////////////////////
    fXTrade: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.fXTrade.find( id );
    },

    fXTrades: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.fXTrade.findAll({ pageSize, after });
    },
    //////////////////////////
    // Dispute
    //////////////////////////
    dispute: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.dispute.find( id );
    },

    disputes: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.dispute.findAll({ pageSize, after });
    },
    //////////////////////////
    // Consent
    //////////////////////////
    consent: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.consent.find( id );
    },

    consents: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.consent.findAll({ pageSize, after });
    },
    //////////////////////////
    // ThirdPartyProvider
    //////////////////////////
    thirdPartyProvider: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.thirdPartyProvider.find( id );
    },

    thirdPartyProviders: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.thirdPartyProvider.findAll({ pageSize, after });
    },
},

Mutation: {

//////////////////////////
// Bank
//////////////////////////
    addBank: async (
        _: ResolverParent,
        args : Bank,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.add( args );
    },

    updateBank: async (
        _: ResolverParent,
        args : Bank,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.update( args );
    },

    removeBank: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.remove( { id } );
    },
//////////////////////////
// Branch
//////////////////////////
    addBranch: async (
        _: ResolverParent,
        args : Branch,
        { backend }: ResolverContext ) =>
    {
        return await backend.branch.add( args );
    },

    updateBranch: async (
        _: ResolverParent,
        args : Branch,
        { backend }: ResolverContext ) =>
    {
        return await backend.branch.update( args );
    },

    removeBranch: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.branch.remove( { id } );
    },
//////////////////////////
// ATM
//////////////////////////
    addATM: async (
        _: ResolverParent,
        args : ATM,
        { backend }: ResolverContext ) =>
    {
        return await backend.aTM.add( args );
    },

    updateATM: async (
        _: ResolverParent,
        args : ATM,
        { backend }: ResolverContext ) =>
    {
        return await backend.aTM.update( args );
    },

    removeATM: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.aTM.remove( { id } );
    },
//////////////////////////
// Customer
//////////////////////////
    addCustomer: async (
        _: ResolverParent,
        args : Customer,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.add( args );
    },

    updateCustomer: async (
        _: ResolverParent,
        args : Customer,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.update( args );
    },

    removeCustomer: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.remove( { id } );
    },
//////////////////////////
// KycProfile
//////////////////////////
    addKycProfile: async (
        _: ResolverParent,
        args : KycProfile,
        { backend }: ResolverContext ) =>
    {
        return await backend.kycProfile.add( args );
    },

    updateKycProfile: async (
        _: ResolverParent,
        args : KycProfile,
        { backend }: ResolverContext ) =>
    {
        return await backend.kycProfile.update( args );
    },

    removeKycProfile: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.kycProfile.remove( { id } );
    },
//////////////////////////
// IdentityDocument
//////////////////////////
    addIdentityDocument: async (
        _: ResolverParent,
        args : IdentityDocument,
        { backend }: ResolverContext ) =>
    {
        return await backend.identityDocument.add( args );
    },

    updateIdentityDocument: async (
        _: ResolverParent,
        args : IdentityDocument,
        { backend }: ResolverContext ) =>
    {
        return await backend.identityDocument.update( args );
    },

    removeIdentityDocument: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.identityDocument.remove( { id } );
    },
//////////////////////////
// RiskAssessment
//////////////////////////
    addRiskAssessment: async (
        _: ResolverParent,
        args : RiskAssessment,
        { backend }: ResolverContext ) =>
    {
        return await backend.riskAssessment.add( args );
    },

    updateRiskAssessment: async (
        _: ResolverParent,
        args : RiskAssessment,
        { backend }: ResolverContext ) =>
    {
        return await backend.riskAssessment.update( args );
    },

    removeRiskAssessment: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.riskAssessment.remove( { id } );
    },
//////////////////////////
// ScreeningResult
//////////////////////////
    addScreeningResult: async (
        _: ResolverParent,
        args : ScreeningResult,
        { backend }: ResolverContext ) =>
    {
        return await backend.screeningResult.add( args );
    },

    updateScreeningResult: async (
        _: ResolverParent,
        args : ScreeningResult,
        { backend }: ResolverContext ) =>
    {
        return await backend.screeningResult.update( args );
    },

    removeScreeningResult: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.screeningResult.remove( { id } );
    },
//////////////////////////
// BankingProduct
//////////////////////////
    addBankingProduct: async (
        _: ResolverParent,
        args : BankingProduct,
        { backend }: ResolverContext ) =>
    {
        return await backend.bankingProduct.add( args );
    },

    updateBankingProduct: async (
        _: ResolverParent,
        args : BankingProduct,
        { backend }: ResolverContext ) =>
    {
        return await backend.bankingProduct.update( args );
    },

    removeBankingProduct: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.bankingProduct.remove( { id } );
    },
//////////////////////////
// Account
//////////////////////////
    addAccount: async (
        _: ResolverParent,
        args : Account,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.add( args );
    },

    updateAccount: async (
        _: ResolverParent,
        args : Account,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.update( args );
    },

    removeAccount: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.account.remove( { id } );
    },
//////////////////////////
// AccountStatement
//////////////////////////
    addAccountStatement: async (
        _: ResolverParent,
        args : AccountStatement,
        { backend }: ResolverContext ) =>
    {
        return await backend.accountStatement.add( args );
    },

    updateAccountStatement: async (
        _: ResolverParent,
        args : AccountStatement,
        { backend }: ResolverContext ) =>
    {
        return await backend.accountStatement.update( args );
    },

    removeAccountStatement: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.accountStatement.remove( { id } );
    },
//////////////////////////
// Transaction
//////////////////////////
    addTransaction: async (
        _: ResolverParent,
        args : Transaction,
        { backend }: ResolverContext ) =>
    {
        return await backend.transaction.add( args );
    },

    updateTransaction: async (
        _: ResolverParent,
        args : Transaction,
        { backend }: ResolverContext ) =>
    {
        return await backend.transaction.update( args );
    },

    removeTransaction: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.transaction.remove( { id } );
    },
//////////////////////////
// ExternalAccount
//////////////////////////
    addExternalAccount: async (
        _: ResolverParent,
        args : ExternalAccount,
        { backend }: ResolverContext ) =>
    {
        return await backend.externalAccount.add( args );
    },

    updateExternalAccount: async (
        _: ResolverParent,
        args : ExternalAccount,
        { backend }: ResolverContext ) =>
    {
        return await backend.externalAccount.update( args );
    },

    removeExternalAccount: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.externalAccount.remove( { id } );
    },
//////////////////////////
// FundsTransfer
//////////////////////////
    addFundsTransfer: async (
        _: ResolverParent,
        args : FundsTransfer,
        { backend }: ResolverContext ) =>
    {
        return await backend.fundsTransfer.add( args );
    },

    updateFundsTransfer: async (
        _: ResolverParent,
        args : FundsTransfer,
        { backend }: ResolverContext ) =>
    {
        return await backend.fundsTransfer.update( args );
    },

    removeFundsTransfer: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.fundsTransfer.remove( { id } );
    },
//////////////////////////
// StandingInstruction
//////////////////////////
    addStandingInstruction: async (
        _: ResolverParent,
        args : StandingInstruction,
        { backend }: ResolverContext ) =>
    {
        return await backend.standingInstruction.add( args );
    },

    updateStandingInstruction: async (
        _: ResolverParent,
        args : StandingInstruction,
        { backend }: ResolverContext ) =>
    {
        return await backend.standingInstruction.update( args );
    },

    removeStandingInstruction: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.standingInstruction.remove( { id } );
    },
//////////////////////////
// PaymentCard
//////////////////////////
    addPaymentCard: async (
        _: ResolverParent,
        args : PaymentCard,
        { backend }: ResolverContext ) =>
    {
        return await backend.paymentCard.add( args );
    },

    updatePaymentCard: async (
        _: ResolverParent,
        args : PaymentCard,
        { backend }: ResolverContext ) =>
    {
        return await backend.paymentCard.update( args );
    },

    removePaymentCard: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.paymentCard.remove( { id } );
    },
//////////////////////////
// LoanAccount
//////////////////////////
    addLoanAccount: async (
        _: ResolverParent,
        args : LoanAccount,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.add( args );
    },

    updateLoanAccount: async (
        _: ResolverParent,
        args : LoanAccount,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.update( args );
    },

    removeLoanAccount: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.remove( { id } );
    },
//////////////////////////
// RepaymentSchedule
//////////////////////////
    addRepaymentSchedule: async (
        _: ResolverParent,
        args : RepaymentSchedule,
        { backend }: ResolverContext ) =>
    {
        return await backend.repaymentSchedule.add( args );
    },

    updateRepaymentSchedule: async (
        _: ResolverParent,
        args : RepaymentSchedule,
        { backend }: ResolverContext ) =>
    {
        return await backend.repaymentSchedule.update( args );
    },

    removeRepaymentSchedule: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.repaymentSchedule.remove( { id } );
    },
//////////////////////////
// LoanPayment
//////////////////////////
    addLoanPayment: async (
        _: ResolverParent,
        args : LoanPayment,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanPayment.add( args );
    },

    updateLoanPayment: async (
        _: ResolverParent,
        args : LoanPayment,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanPayment.update( args );
    },

    removeLoanPayment: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.loanPayment.remove( { id } );
    },
//////////////////////////
// Collateral
//////////////////////////
    addCollateral: async (
        _: ResolverParent,
        args : Collateral,
        { backend }: ResolverContext ) =>
    {
        return await backend.collateral.add( args );
    },

    updateCollateral: async (
        _: ResolverParent,
        args : Collateral,
        { backend }: ResolverContext ) =>
    {
        return await backend.collateral.update( args );
    },

    removeCollateral: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.collateral.remove( { id } );
    },
//////////////////////////
// FeeCharge
//////////////////////////
    addFeeCharge: async (
        _: ResolverParent,
        args : FeeCharge,
        { backend }: ResolverContext ) =>
    {
        return await backend.feeCharge.add( args );
    },

    updateFeeCharge: async (
        _: ResolverParent,
        args : FeeCharge,
        { backend }: ResolverContext ) =>
    {
        return await backend.feeCharge.update( args );
    },

    removeFeeCharge: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.feeCharge.remove( { id } );
    },
//////////////////////////
// ExchangeRate
//////////////////////////
    addExchangeRate: async (
        _: ResolverParent,
        args : ExchangeRate,
        { backend }: ResolverContext ) =>
    {
        return await backend.exchangeRate.add( args );
    },

    updateExchangeRate: async (
        _: ResolverParent,
        args : ExchangeRate,
        { backend }: ResolverContext ) =>
    {
        return await backend.exchangeRate.update( args );
    },

    removeExchangeRate: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.exchangeRate.remove( { id } );
    },
//////////////////////////
// FXTrade
//////////////////////////
    addFXTrade: async (
        _: ResolverParent,
        args : FXTrade,
        { backend }: ResolverContext ) =>
    {
        return await backend.fXTrade.add( args );
    },

    updateFXTrade: async (
        _: ResolverParent,
        args : FXTrade,
        { backend }: ResolverContext ) =>
    {
        return await backend.fXTrade.update( args );
    },

    removeFXTrade: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.fXTrade.remove( { id } );
    },
//////////////////////////
// Dispute
//////////////////////////
    addDispute: async (
        _: ResolverParent,
        args : Dispute,
        { backend }: ResolverContext ) =>
    {
        return await backend.dispute.add( args );
    },

    updateDispute: async (
        _: ResolverParent,
        args : Dispute,
        { backend }: ResolverContext ) =>
    {
        return await backend.dispute.update( args );
    },

    removeDispute: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.dispute.remove( { id } );
    },
//////////////////////////
// Consent
//////////////////////////
    addConsent: async (
        _: ResolverParent,
        args : Consent,
        { backend }: ResolverContext ) =>
    {
        return await backend.consent.add( args );
    },

    updateConsent: async (
        _: ResolverParent,
        args : Consent,
        { backend }: ResolverContext ) =>
    {
        return await backend.consent.update( args );
    },

    removeConsent: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.consent.remove( { id } );
    },
//////////////////////////
// ThirdPartyProvider
//////////////////////////
    addThirdPartyProvider: async (
        _: ResolverParent,
        args : ThirdPartyProvider,
        { backend }: ResolverContext ) =>
    {
        return await backend.thirdPartyProvider.add( args );
    },

    updateThirdPartyProvider: async (
        _: ResolverParent,
        args : ThirdPartyProvider,
        { backend }: ResolverContext ) =>
    {
        return await backend.thirdPartyProvider.update( args );
    },

    removeThirdPartyProvider: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.thirdPartyProvider.remove( { id } );
    },
},
Bank: {
    branches: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.getBranches(parentId);
    },

    addToBranches: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.addToBranches(parentId,childIds);
    },

    removeFromBranches: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.removeFromBranches(parentId,childIds);
    },
    products: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.getProducts(parentId);
    },

    addToProducts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.addToProducts(parentId,childIds);
    },

    removeFromProducts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.removeFromProducts(parentId,childIds);
    },
    customers: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.getCustomers(parentId);
    },

    addToCustomers: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.addToCustomers(parentId,childIds);
    },

    removeFromCustomers: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.removeFromCustomers(parentId,childIds);
    },
    accounts: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.getAccounts(parentId);
    },

    addToAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.addToAccounts(parentId,childIds);
    },

    removeFromAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.removeFromAccounts(parentId,childIds);
    },
    paymentCards: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.getPaymentCards(parentId);
    },

    addToPaymentCards: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.addToPaymentCards(parentId,childIds);
    },

    removeFromPaymentCards: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.removeFromPaymentCards(parentId,childIds);
    },
    loanAccounts: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.getLoanAccounts(parentId);
    },

    addToLoanAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.addToLoanAccounts(parentId,childIds);
    },

    removeFromLoanAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.removeFromLoanAccounts(parentId,childIds);
    },
    exchangeRates: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.getExchangeRates(parentId);
    },

    addToExchangeRates: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.addToExchangeRates(parentId,childIds);
    },

    removeFromExchangeRates: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.removeFromExchangeRates(parentId,childIds);
    },
    consents: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.getConsents(parentId);
    },

    addToConsents: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.addToConsents(parentId,childIds);
    },

    removeFromConsents: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.removeFromConsents(parentId,childIds);
    },
    thirdPartyProviders: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.getThirdPartyProviders(parentId);
    },

    addToThirdPartyProviders: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.addToThirdPartyProviders(parentId,childIds);
    },

    removeFromThirdPartyProviders: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.removeFromThirdPartyProviders(parentId,childIds);
    },
},
Branch: {
    bank: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.branch.getBank(id);
    },

    assignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.branch.assignBank(parentId,childId);
    },

    unassignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.branch.unassignBank(parentId,childId);
    },
    accounts: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.branch.getAccounts(parentId);
    },

    addToAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.branch.addToAccounts(parentId,childIds);
    },

    removeFromAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.branch.removeFromAccounts(parentId,childIds);
    },
    loanAccounts: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.branch.getLoanAccounts(parentId);
    },

    addToLoanAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.branch.addToLoanAccounts(parentId,childIds);
    },

    removeFromLoanAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.branch.removeFromLoanAccounts(parentId,childIds);
    },
    atms: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.branch.getAtms(parentId);
    },

    addToAtms: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.branch.addToAtms(parentId,childIds);
    },

    removeFromAtms: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.branch.removeFromAtms(parentId,childIds);
    },
},
ATM: {
    branch: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.aTM.getBranch(id);
    },

    assignBranch: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.aTM.assignBranch(parentId,childId);
    },

    unassignBranch: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.aTM.unassignBranch(parentId,childId);
    },
},
Customer: {
    bank: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.customer.getBank(id);
    },

    assignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.assignBank(parentId,childId);
    },

    unassignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.customer.unassignBank(parentId,childId);
    },
    accounts: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.getAccounts(parentId);
    },

    addToAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.addToAccounts(parentId,childIds);
    },

    removeFromAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.removeFromAccounts(parentId,childIds);
    },
    loanAccounts: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.getLoanAccounts(parentId);
    },

    addToLoanAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.addToLoanAccounts(parentId,childIds);
    },

    removeFromLoanAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.removeFromLoanAccounts(parentId,childIds);
    },
    paymentCards: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.getPaymentCards(parentId);
    },

    addToPaymentCards: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.addToPaymentCards(parentId,childIds);
    },

    removeFromPaymentCards: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.removeFromPaymentCards(parentId,childIds);
    },
    externalAccounts: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.getExternalAccounts(parentId);
    },

    addToExternalAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.addToExternalAccounts(parentId,childIds);
    },

    removeFromExternalAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.removeFromExternalAccounts(parentId,childIds);
    },
    fundsTransfers: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.getFundsTransfers(parentId);
    },

    addToFundsTransfers: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.addToFundsTransfers(parentId,childIds);
    },

    removeFromFundsTransfers: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.removeFromFundsTransfers(parentId,childIds);
    },
    disputes: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.getDisputes(parentId);
    },

    addToDisputes: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.addToDisputes(parentId,childIds);
    },

    removeFromDisputes: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.removeFromDisputes(parentId,childIds);
    },
    kycProfiles: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.getKycProfiles(parentId);
    },

    addToKycProfiles: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.addToKycProfiles(parentId,childIds);
    },

    removeFromKycProfiles: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.removeFromKycProfiles(parentId,childIds);
    },
    consents: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.getConsents(parentId);
    },

    addToConsents: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.addToConsents(parentId,childIds);
    },

    removeFromConsents: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.removeFromConsents(parentId,childIds);
    },
},
KycProfile: {
    customer: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.kycProfile.getCustomer(id);
    },

    assignCustomer: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.kycProfile.assignCustomer(parentId,childId);
    },

    unassignCustomer: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.kycProfile.unassignCustomer(parentId,childId);
    },
    identityDocuments: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.kycProfile.getIdentityDocuments(parentId);
    },

    addToIdentityDocuments: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.kycProfile.addToIdentityDocuments(parentId,childIds);
    },

    removeFromIdentityDocuments: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.kycProfile.removeFromIdentityDocuments(parentId,childIds);
    },
    riskAssessments: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.kycProfile.getRiskAssessments(parentId);
    },

    addToRiskAssessments: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.kycProfile.addToRiskAssessments(parentId,childIds);
    },

    removeFromRiskAssessments: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.kycProfile.removeFromRiskAssessments(parentId,childIds);
    },
    screenings: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.kycProfile.getScreenings(parentId);
    },

    addToScreenings: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.kycProfile.addToScreenings(parentId,childIds);
    },

    removeFromScreenings: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.kycProfile.removeFromScreenings(parentId,childIds);
    },
},
IdentityDocument: {
    kycProfile: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.identityDocument.getKycProfile(id);
    },

    assignKycProfile: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.identityDocument.assignKycProfile(parentId,childId);
    },

    unassignKycProfile: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.identityDocument.unassignKycProfile(parentId,childId);
    },
},
RiskAssessment: {
    kycProfile: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.riskAssessment.getKycProfile(id);
    },

    assignKycProfile: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.riskAssessment.assignKycProfile(parentId,childId);
    },

    unassignKycProfile: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.riskAssessment.unassignKycProfile(parentId,childId);
    },
},
ScreeningResult: {
    kycProfile: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.screeningResult.getKycProfile(id);
    },

    assignKycProfile: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.screeningResult.assignKycProfile(parentId,childId);
    },

    unassignKycProfile: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.screeningResult.unassignKycProfile(parentId,childId);
    },
},
BankingProduct: {
    bank: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.bankingProduct.getBank(id);
    },

    assignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bankingProduct.assignBank(parentId,childId);
    },

    unassignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.bankingProduct.unassignBank(parentId,childId);
    },
    accounts: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.bankingProduct.getAccounts(parentId);
    },

    addToAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bankingProduct.addToAccounts(parentId,childIds);
    },

    removeFromAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bankingProduct.removeFromAccounts(parentId,childIds);
    },
    loanAccounts: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.bankingProduct.getLoanAccounts(parentId);
    },

    addToLoanAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bankingProduct.addToLoanAccounts(parentId,childIds);
    },

    removeFromLoanAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bankingProduct.removeFromLoanAccounts(parentId,childIds);
    },
    paymentCards: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.bankingProduct.getPaymentCards(parentId);
    },

    addToPaymentCards: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bankingProduct.addToPaymentCards(parentId,childIds);
    },

    removeFromPaymentCards: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bankingProduct.removeFromPaymentCards(parentId,childIds);
    },
},
Account: {
    bank: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.account.getBank(id);
    },

    assignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.assignBank(parentId,childId);
    },

    unassignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.account.unassignBank(parentId,childId);
    },
    branch: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.account.getBranch(id);
    },

    assignBranch: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.assignBranch(parentId,childId);
    },

    unassignBranch: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.account.unassignBranch(parentId,childId);
    },
    product: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.account.getProduct(id);
    },

    assignProduct: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.assignProduct(parentId,childId);
    },

    unassignProduct: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.account.unassignProduct(parentId,childId);
    },
    owners: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.getOwners(parentId);
    },

    addToOwners: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.addToOwners(parentId,childIds);
    },

    removeFromOwners: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.removeFromOwners(parentId,childIds);
    },
    transactions: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.getTransactions(parentId);
    },

    addToTransactions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.addToTransactions(parentId,childIds);
    },

    removeFromTransactions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.removeFromTransactions(parentId,childIds);
    },
    statements: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.getStatements(parentId);
    },

    addToStatements: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.addToStatements(parentId,childIds);
    },

    removeFromStatements: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.removeFromStatements(parentId,childIds);
    },
    standingInstructions: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.getStandingInstructions(parentId);
    },

    addToStandingInstructions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.addToStandingInstructions(parentId,childIds);
    },

    removeFromStandingInstructions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.removeFromStandingInstructions(parentId,childIds);
    },
    feeCharges: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.getFeeCharges(parentId);
    },

    addToFeeCharges: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.addToFeeCharges(parentId,childIds);
    },

    removeFromFeeCharges: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.removeFromFeeCharges(parentId,childIds);
    },
},
AccountStatement: {
    account: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.accountStatement.getAccount(id);
    },

    assignAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.accountStatement.assignAccount(parentId,childId);
    },

    unassignAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.accountStatement.unassignAccount(parentId,childId);
    },
},
Transaction: {
    account: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.transaction.getAccount(id);
    },

    assignAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.transaction.assignAccount(parentId,childId);
    },

    unassignAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.transaction.unassignAccount(parentId,childId);
    },
    externalCounterparty: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.transaction.getExternalCounterparty(id);
    },

    assignExternalCounterparty: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.transaction.assignExternalCounterparty(parentId,childId);
    },

    unassignExternalCounterparty: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.transaction.unassignExternalCounterparty(parentId,childId);
    },
    paymentCard: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.transaction.getPaymentCard(id);
    },

    assignPaymentCard: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.transaction.assignPaymentCard(parentId,childId);
    },

    unassignPaymentCard: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.transaction.unassignPaymentCard(parentId,childId);
    },
    fundsTransfer: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.transaction.getFundsTransfer(id);
    },

    assignFundsTransfer: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.transaction.assignFundsTransfer(parentId,childId);
    },

    unassignFundsTransfer: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.transaction.unassignFundsTransfer(parentId,childId);
    },
    fxTrade: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.transaction.getFxTrade(id);
    },

    assignFxTrade: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.transaction.assignFxTrade(parentId,childId);
    },

    unassignFxTrade: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.transaction.unassignFxTrade(parentId,childId);
    },
    dispute: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.transaction.getDispute(id);
    },

    assignDispute: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.transaction.assignDispute(parentId,childId);
    },

    unassignDispute: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.transaction.unassignDispute(parentId,childId);
    },
},
ExternalAccount: {
    customer: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.externalAccount.getCustomer(id);
    },

    assignCustomer: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.externalAccount.assignCustomer(parentId,childId);
    },

    unassignCustomer: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.externalAccount.unassignCustomer(parentId,childId);
    },
    transactions: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.externalAccount.getTransactions(parentId);
    },

    addToTransactions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.externalAccount.addToTransactions(parentId,childIds);
    },

    removeFromTransactions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.externalAccount.removeFromTransactions(parentId,childIds);
    },
},
FundsTransfer: {
    sourceAccount: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.fundsTransfer.getSourceAccount(id);
    },

    assignSourceAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.fundsTransfer.assignSourceAccount(parentId,childId);
    },

    unassignSourceAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.fundsTransfer.unassignSourceAccount(parentId,childId);
    },
    destinationAccount: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.fundsTransfer.getDestinationAccount(id);
    },

    assignDestinationAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.fundsTransfer.assignDestinationAccount(parentId,childId);
    },

    unassignDestinationAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.fundsTransfer.unassignDestinationAccount(parentId,childId);
    },
    externalBeneficiary: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.fundsTransfer.getExternalBeneficiary(id);
    },

    assignExternalBeneficiary: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.fundsTransfer.assignExternalBeneficiary(parentId,childId);
    },

    unassignExternalBeneficiary: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.fundsTransfer.unassignExternalBeneficiary(parentId,childId);
    },
    initiatedBy: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.fundsTransfer.getInitiatedBy(id);
    },

    assignInitiatedBy: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.fundsTransfer.assignInitiatedBy(parentId,childId);
    },

    unassignInitiatedBy: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.fundsTransfer.unassignInitiatedBy(parentId,childId);
    },
    transactions: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.fundsTransfer.getTransactions(parentId);
    },

    addToTransactions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.fundsTransfer.addToTransactions(parentId,childIds);
    },

    removeFromTransactions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.fundsTransfer.removeFromTransactions(parentId,childIds);
    },
},
StandingInstruction: {
    account: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.standingInstruction.getAccount(id);
    },

    assignAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.standingInstruction.assignAccount(parentId,childId);
    },

    unassignAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.standingInstruction.unassignAccount(parentId,childId);
    },
    beneficiary: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.standingInstruction.getBeneficiary(id);
    },

    assignBeneficiary: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.standingInstruction.assignBeneficiary(parentId,childId);
    },

    unassignBeneficiary: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.standingInstruction.unassignBeneficiary(parentId,childId);
    },
},
PaymentCard: {
    bank: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.paymentCard.getBank(id);
    },

    assignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.paymentCard.assignBank(parentId,childId);
    },

    unassignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.paymentCard.unassignBank(parentId,childId);
    },
    account: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.paymentCard.getAccount(id);
    },

    assignAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.paymentCard.assignAccount(parentId,childId);
    },

    unassignAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.paymentCard.unassignAccount(parentId,childId);
    },
    customer: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.paymentCard.getCustomer(id);
    },

    assignCustomer: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.paymentCard.assignCustomer(parentId,childId);
    },

    unassignCustomer: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.paymentCard.unassignCustomer(parentId,childId);
    },
    transactions: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.paymentCard.getTransactions(parentId);
    },

    addToTransactions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.paymentCard.addToTransactions(parentId,childIds);
    },

    removeFromTransactions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.paymentCard.removeFromTransactions(parentId,childIds);
    },
},
LoanAccount: {
    bank: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.loanAccount.getBank(id);
    },

    assignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.assignBank(parentId,childId);
    },

    unassignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.loanAccount.unassignBank(parentId,childId);
    },
    branch: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.loanAccount.getBranch(id);
    },

    assignBranch: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.assignBranch(parentId,childId);
    },

    unassignBranch: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.loanAccount.unassignBranch(parentId,childId);
    },
    product: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.loanAccount.getProduct(id);
    },

    assignProduct: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.assignProduct(parentId,childId);
    },

    unassignProduct: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.loanAccount.unassignProduct(parentId,childId);
    },
    borrowers: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.getBorrowers(parentId);
    },

    addToBorrowers: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.addToBorrowers(parentId,childIds);
    },

    removeFromBorrowers: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.removeFromBorrowers(parentId,childIds);
    },
    repaymentSchedule: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.getRepaymentSchedule(parentId);
    },

    addToRepaymentSchedule: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.addToRepaymentSchedule(parentId,childIds);
    },

    removeFromRepaymentSchedule: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.removeFromRepaymentSchedule(parentId,childIds);
    },
    payments: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.getPayments(parentId);
    },

    addToPayments: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.addToPayments(parentId,childIds);
    },

    removeFromPayments: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.removeFromPayments(parentId,childIds);
    },
    collateral: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.getCollateral(parentId);
    },

    addToCollateral: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.addToCollateral(parentId,childIds);
    },

    removeFromCollateral: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.removeFromCollateral(parentId,childIds);
    },
    feeCharges: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.getFeeCharges(parentId);
    },

    addToFeeCharges: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.addToFeeCharges(parentId,childIds);
    },

    removeFromFeeCharges: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.removeFromFeeCharges(parentId,childIds);
    },
},
RepaymentSchedule: {
    loanAccount: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.repaymentSchedule.getLoanAccount(id);
    },

    assignLoanAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.repaymentSchedule.assignLoanAccount(parentId,childId);
    },

    unassignLoanAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.repaymentSchedule.unassignLoanAccount(parentId,childId);
    },
    payment: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.repaymentSchedule.getPayment(id);
    },

    assignPayment: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.repaymentSchedule.assignPayment(parentId,childId);
    },

    unassignPayment: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.repaymentSchedule.unassignPayment(parentId,childId);
    },
},
LoanPayment: {
    loanAccount: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.loanPayment.getLoanAccount(id);
    },

    assignLoanAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanPayment.assignLoanAccount(parentId,childId);
    },

    unassignLoanAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.loanPayment.unassignLoanAccount(parentId,childId);
    },
    transaction: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.loanPayment.getTransaction(id);
    },

    assignTransaction: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanPayment.assignTransaction(parentId,childId);
    },

    unassignTransaction: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.loanPayment.unassignTransaction(parentId,childId);
    },
},
Collateral: {
    loanAccount: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.collateral.getLoanAccount(id);
    },

    assignLoanAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.collateral.assignLoanAccount(parentId,childId);
    },

    unassignLoanAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.collateral.unassignLoanAccount(parentId,childId);
    },
},
FeeCharge: {
    account: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.feeCharge.getAccount(id);
    },

    assignAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.feeCharge.assignAccount(parentId,childId);
    },

    unassignAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.feeCharge.unassignAccount(parentId,childId);
    },
    loanAccount: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.feeCharge.getLoanAccount(id);
    },

    assignLoanAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.feeCharge.assignLoanAccount(parentId,childId);
    },

    unassignLoanAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.feeCharge.unassignLoanAccount(parentId,childId);
    },
},
ExchangeRate: {
    bank: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.exchangeRate.getBank(id);
    },

    assignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.exchangeRate.assignBank(parentId,childId);
    },

    unassignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.exchangeRate.unassignBank(parentId,childId);
    },
    fxTrades: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.exchangeRate.getFxTrades(parentId);
    },

    addToFxTrades: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.exchangeRate.addToFxTrades(parentId,childIds);
    },

    removeFromFxTrades: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.exchangeRate.removeFromFxTrades(parentId,childIds);
    },
},
FXTrade: {
    customer: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.fXTrade.getCustomer(id);
    },

    assignCustomer: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.fXTrade.assignCustomer(parentId,childId);
    },

    unassignCustomer: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.fXTrade.unassignCustomer(parentId,childId);
    },
    bank: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.fXTrade.getBank(id);
    },

    assignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.fXTrade.assignBank(parentId,childId);
    },

    unassignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.fXTrade.unassignBank(parentId,childId);
    },
    exchangeRate: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.fXTrade.getExchangeRate(id);
    },

    assignExchangeRate: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.fXTrade.assignExchangeRate(parentId,childId);
    },

    unassignExchangeRate: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.fXTrade.unassignExchangeRate(parentId,childId);
    },
    sourceAccount: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.fXTrade.getSourceAccount(id);
    },

    assignSourceAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.fXTrade.assignSourceAccount(parentId,childId);
    },

    unassignSourceAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.fXTrade.unassignSourceAccount(parentId,childId);
    },
    destinationAccount: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.fXTrade.getDestinationAccount(id);
    },

    assignDestinationAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.fXTrade.assignDestinationAccount(parentId,childId);
    },

    unassignDestinationAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.fXTrade.unassignDestinationAccount(parentId,childId);
    },
    transaction: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.fXTrade.getTransaction(id);
    },

    assignTransaction: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.fXTrade.assignTransaction(parentId,childId);
    },

    unassignTransaction: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.fXTrade.unassignTransaction(parentId,childId);
    },
},
Dispute: {
    transaction: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.dispute.getTransaction(id);
    },

    assignTransaction: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.dispute.assignTransaction(parentId,childId);
    },

    unassignTransaction: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.dispute.unassignTransaction(parentId,childId);
    },
    customer: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.dispute.getCustomer(id);
    },

    assignCustomer: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.dispute.assignCustomer(parentId,childId);
    },

    unassignCustomer: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.dispute.unassignCustomer(parentId,childId);
    },
    account: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.dispute.getAccount(id);
    },

    assignAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.dispute.assignAccount(parentId,childId);
    },

    unassignAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.dispute.unassignAccount(parentId,childId);
    },
    paymentCard: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.dispute.getPaymentCard(id);
    },

    assignPaymentCard: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.dispute.assignPaymentCard(parentId,childId);
    },

    unassignPaymentCard: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.dispute.unassignPaymentCard(parentId,childId);
    },
},
Consent: {
    customer: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.consent.getCustomer(id);
    },

    assignCustomer: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.consent.assignCustomer(parentId,childId);
    },

    unassignCustomer: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.consent.unassignCustomer(parentId,childId);
    },
    bank: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.consent.getBank(id);
    },

    assignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.consent.assignBank(parentId,childId);
    },

    unassignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.consent.unassignBank(parentId,childId);
    },
    thirdPartyProvider: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.consent.getThirdPartyProvider(id);
    },

    assignThirdPartyProvider: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.consent.assignThirdPartyProvider(parentId,childId);
    },

    unassignThirdPartyProvider: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.consent.unassignThirdPartyProvider(parentId,childId);
    },
    authorizedAccounts: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.consent.getAuthorizedAccounts(parentId);
    },

    addToAuthorizedAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.consent.addToAuthorizedAccounts(parentId,childIds);
    },

    removeFromAuthorizedAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.consent.removeFromAuthorizedAccounts(parentId,childIds);
    },
},
ThirdPartyProvider: {
    bank: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.thirdPartyProvider.getBank(id);
    },

    assignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.thirdPartyProvider.assignBank(parentId,childId);
    },

    unassignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.thirdPartyProvider.unassignBank(parentId,childId);
    },
    consents: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.thirdPartyProvider.getConsents(parentId);
    },

    addToConsents: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.thirdPartyProvider.addToConsents(parentId,childIds);
    },

    removeFromConsents: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.thirdPartyProvider.removeFromConsents(parentId,childIds);
    },
},
};