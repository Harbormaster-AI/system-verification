const { paginateResults } = require('./utils');

interface ResolverContext {
backend: BackendAPI;
}

export interface PaginationOptions {
pageSize?: number;
after?: string | null;
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
    childrenIds: string[];
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
        return await backend.bank.findAll({ pageSize = 25, after });
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
        return await backend.branch.findAll({ pageSize = 25, after });
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
        return await backend.aTM.findAll({ pageSize = 25, after });
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
        return await backend.customer.findAll({ pageSize = 25, after });
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
        return await backend.kycProfile.findAll({ pageSize = 25, after });
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
        return await backend.identityDocument.findAll({ pageSize = 25, after });
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
        return await backend.riskAssessment.findAll({ pageSize = 25, after });
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
        return await backend.screeningResult.findAll({ pageSize = 25, after });
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
        return await backend.bankingProduct.findAll({ pageSize = 25, after });
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
        return await backend.account.findAll({ pageSize = 25, after });
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
        return await backend.accountStatement.findAll({ pageSize = 25, after });
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
        return await backend.transaction.findAll({ pageSize = 25, after });
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
        return await backend.externalAccount.findAll({ pageSize = 25, after });
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
        return await backend.fundsTransfer.findAll({ pageSize = 25, after });
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
        return await backend.standingInstruction.findAll({ pageSize = 25, after });
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
        return await backend.paymentCard.findAll({ pageSize = 25, after });
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
        return await backend.loanAccount.findAll({ pageSize = 25, after });
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
        return await backend.repaymentSchedule.findAll({ pageSize = 25, after });
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
        return await backend.loanPayment.findAll({ pageSize = 25, after });
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
        return await backend.collateral.findAll({ pageSize = 25, after });
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
        return await backend.feeCharge.findAll({ pageSize = 25, after });
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
        return await backend.exchangeRate.findAll({ pageSize = 25, after });
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
        return await backend.fXTrade.findAll({ pageSize = 25, after });
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
        return await backend.dispute.findAll({ pageSize = 25, after });
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
        return await backend.consent.findAll({ pageSize = 25, after });
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
        return await backend.thirdPartyProvider.findAll({ pageSize = 25, after });
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
