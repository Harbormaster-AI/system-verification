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

    branches: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.getBranches(parentId);
    },

    assignToBranches: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.assignToBranches(parentId,childIds);
    },

    unassignFromBranches: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.unassignFromBranches(parentId,childIds);
    },

    products: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.getProducts(parentId);
    },

    assignToProducts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.assignToProducts(parentId,childIds);
    },

    unassignFromProducts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.unassignFromProducts(parentId,childIds);
    },

    customers: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.getCustomers(parentId);
    },

    assignToCustomers: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.assignToCustomers(parentId,childIds);
    },

    unassignFromCustomers: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.unassignFromCustomers(parentId,childIds);
    },

    accounts: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.getAccounts(parentId);
    },

    assignToAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.assignToAccounts(parentId,childIds);
    },

    unassignFromAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.unassignFromAccounts(parentId,childIds);
    },

    paymentCards: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.getPaymentCards(parentId);
    },

    assignToPaymentCards: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.assignToPaymentCards(parentId,childIds);
    },

    unassignFromPaymentCards: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.unassignFromPaymentCards(parentId,childIds);
    },

    loanAccounts: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.getLoanAccounts(parentId);
    },

    assignToLoanAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.assignToLoanAccounts(parentId,childIds);
    },

    unassignFromLoanAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.unassignFromLoanAccounts(parentId,childIds);
    },

    exchangeRates: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.getExchangeRates(parentId);
    },

    assignToExchangeRates: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.assignToExchangeRates(parentId,childIds);
    },

    unassignFromExchangeRates: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.unassignFromExchangeRates(parentId,childIds);
    },

    consents: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.getConsents(parentId);
    },

    assignToConsents: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.assignToConsents(parentId,childIds);
    },

    unassignFromConsents: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.unassignFromConsents(parentId,childIds);
    },

    thirdPartyProviders: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.getThirdPartyProviders(parentId);
    },

    assignToThirdPartyProviders: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.assignToThirdPartyProviders(parentId,childIds);
    },

    unassignFromThirdPartyProviders: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bank.unassignFromThirdPartyProviders(parentId,childIds);
    },

}

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
        return await backend.branch.assignToBank(parentId,childId);
    },

    unassignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.branch.unassignFromBank(parentId,childId);
    },
    accounts: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.branch.getAccounts(parentId);
    },

    assignToAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.branch.assignToAccounts(parentId,childIds);
    },

    unassignFromAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.branch.unassignFromAccounts(parentId,childIds);
    },

    loanAccounts: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.branch.getLoanAccounts(parentId);
    },

    assignToLoanAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.branch.assignToLoanAccounts(parentId,childIds);
    },

    unassignFromLoanAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.branch.unassignFromLoanAccounts(parentId,childIds);
    },

    atms: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.branch.getAtms(parentId);
    },

    assignToAtms: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.branch.assignToAtms(parentId,childIds);
    },

    unassignFromAtms: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.branch.unassignFromAtms(parentId,childIds);
    },

}

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
        return await backend.aTM.assignToBranch(parentId,childId);
    },

    unassignBranch: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.aTM.unassignFromBranch(parentId,childId);
    },
}

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
        return await backend.customer.assignToBank(parentId,childId);
    },

    unassignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.customer.unassignFromBank(parentId,childId);
    },
    accounts: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.getAccounts(parentId);
    },

    assignToAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.assignToAccounts(parentId,childIds);
    },

    unassignFromAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.unassignFromAccounts(parentId,childIds);
    },

    loanAccounts: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.getLoanAccounts(parentId);
    },

    assignToLoanAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.assignToLoanAccounts(parentId,childIds);
    },

    unassignFromLoanAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.unassignFromLoanAccounts(parentId,childIds);
    },

    paymentCards: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.getPaymentCards(parentId);
    },

    assignToPaymentCards: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.assignToPaymentCards(parentId,childIds);
    },

    unassignFromPaymentCards: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.unassignFromPaymentCards(parentId,childIds);
    },

    externalAccounts: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.getExternalAccounts(parentId);
    },

    assignToExternalAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.assignToExternalAccounts(parentId,childIds);
    },

    unassignFromExternalAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.unassignFromExternalAccounts(parentId,childIds);
    },

    fundsTransfers: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.getFundsTransfers(parentId);
    },

    assignToFundsTransfers: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.assignToFundsTransfers(parentId,childIds);
    },

    unassignFromFundsTransfers: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.unassignFromFundsTransfers(parentId,childIds);
    },

    disputes: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.getDisputes(parentId);
    },

    assignToDisputes: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.assignToDisputes(parentId,childIds);
    },

    unassignFromDisputes: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.unassignFromDisputes(parentId,childIds);
    },

    kycProfiles: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.getKycProfiles(parentId);
    },

    assignToKycProfiles: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.assignToKycProfiles(parentId,childIds);
    },

    unassignFromKycProfiles: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.unassignFromKycProfiles(parentId,childIds);
    },

    consents: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.getConsents(parentId);
    },

    assignToConsents: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.assignToConsents(parentId,childIds);
    },

    unassignFromConsents: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.customer.unassignFromConsents(parentId,childIds);
    },

}

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
        return await backend.kycProfile.assignToCustomer(parentId,childId);
    },

    unassignCustomer: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.kycProfile.unassignFromCustomer(parentId,childId);
    },
    identityDocuments: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.kycProfile.getIdentityDocuments(parentId);
    },

    assignToIdentityDocuments: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.kycProfile.assignToIdentityDocuments(parentId,childIds);
    },

    unassignFromIdentityDocuments: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.kycProfile.unassignFromIdentityDocuments(parentId,childIds);
    },

    riskAssessments: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.kycProfile.getRiskAssessments(parentId);
    },

    assignToRiskAssessments: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.kycProfile.assignToRiskAssessments(parentId,childIds);
    },

    unassignFromRiskAssessments: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.kycProfile.unassignFromRiskAssessments(parentId,childIds);
    },

    screenings: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.kycProfile.getScreenings(parentId);
    },

    assignToScreenings: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.kycProfile.assignToScreenings(parentId,childIds);
    },

    unassignFromScreenings: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.kycProfile.unassignFromScreenings(parentId,childIds);
    },

}

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
        return await backend.identityDocument.assignToKycProfile(parentId,childId);
    },

    unassignKycProfile: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.identityDocument.unassignFromKycProfile(parentId,childId);
    },
}

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
        return await backend.riskAssessment.assignToKycProfile(parentId,childId);
    },

    unassignKycProfile: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.riskAssessment.unassignFromKycProfile(parentId,childId);
    },
}

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
        return await backend.screeningResult.assignToKycProfile(parentId,childId);
    },

    unassignKycProfile: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.screeningResult.unassignFromKycProfile(parentId,childId);
    },
}

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
        return await backend.bankingProduct.assignToBank(parentId,childId);
    },

    unassignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.bankingProduct.unassignFromBank(parentId,childId);
    },
    accounts: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.bankingProduct.getAccounts(parentId);
    },

    assignToAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bankingProduct.assignToAccounts(parentId,childIds);
    },

    unassignFromAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bankingProduct.unassignFromAccounts(parentId,childIds);
    },

    loanAccounts: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.bankingProduct.getLoanAccounts(parentId);
    },

    assignToLoanAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bankingProduct.assignToLoanAccounts(parentId,childIds);
    },

    unassignFromLoanAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bankingProduct.unassignFromLoanAccounts(parentId,childIds);
    },

    paymentCards: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.bankingProduct.getPaymentCards(parentId);
    },

    assignToPaymentCards: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bankingProduct.assignToPaymentCards(parentId,childIds);
    },

    unassignFromPaymentCards: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.bankingProduct.unassignFromPaymentCards(parentId,childIds);
    },

}

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
        return await backend.account.assignToBank(parentId,childId);
    },

    unassignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.account.unassignFromBank(parentId,childId);
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
        return await backend.account.assignToBranch(parentId,childId);
    },

    unassignBranch: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.account.unassignFromBranch(parentId,childId);
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
        return await backend.account.assignToProduct(parentId,childId);
    },

    unassignProduct: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.account.unassignFromProduct(parentId,childId);
    },
    owners: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.getOwners(parentId);
    },

    assignToOwners: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.assignToOwners(parentId,childIds);
    },

    unassignFromOwners: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.unassignFromOwners(parentId,childIds);
    },

    transactions: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.getTransactions(parentId);
    },

    assignToTransactions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.assignToTransactions(parentId,childIds);
    },

    unassignFromTransactions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.unassignFromTransactions(parentId,childIds);
    },

    statements: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.getStatements(parentId);
    },

    assignToStatements: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.assignToStatements(parentId,childIds);
    },

    unassignFromStatements: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.unassignFromStatements(parentId,childIds);
    },

    standingInstructions: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.getStandingInstructions(parentId);
    },

    assignToStandingInstructions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.assignToStandingInstructions(parentId,childIds);
    },

    unassignFromStandingInstructions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.unassignFromStandingInstructions(parentId,childIds);
    },

    feeCharges: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.getFeeCharges(parentId);
    },

    assignToFeeCharges: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.assignToFeeCharges(parentId,childIds);
    },

    unassignFromFeeCharges: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.account.unassignFromFeeCharges(parentId,childIds);
    },

}

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
        return await backend.accountStatement.assignToAccount(parentId,childId);
    },

    unassignAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.accountStatement.unassignFromAccount(parentId,childId);
    },
}

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
        return await backend.transaction.assignToAccount(parentId,childId);
    },

    unassignAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.transaction.unassignFromAccount(parentId,childId);
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
        return await backend.transaction.assignToExternalCounterparty(parentId,childId);
    },

    unassignExternalCounterparty: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.transaction.unassignFromExternalCounterparty(parentId,childId);
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
        return await backend.transaction.assignToPaymentCard(parentId,childId);
    },

    unassignPaymentCard: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.transaction.unassignFromPaymentCard(parentId,childId);
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
        return await backend.transaction.assignToFundsTransfer(parentId,childId);
    },

    unassignFundsTransfer: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.transaction.unassignFromFundsTransfer(parentId,childId);
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
        return await backend.transaction.assignToFxTrade(parentId,childId);
    },

    unassignFxTrade: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.transaction.unassignFromFxTrade(parentId,childId);
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
        return await backend.transaction.assignToDispute(parentId,childId);
    },

    unassignDispute: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.transaction.unassignFromDispute(parentId,childId);
    },
}

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
        return await backend.externalAccount.assignToCustomer(parentId,childId);
    },

    unassignCustomer: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.externalAccount.unassignFromCustomer(parentId,childId);
    },
    transactions: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.externalAccount.getTransactions(parentId);
    },

    assignToTransactions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.externalAccount.assignToTransactions(parentId,childIds);
    },

    unassignFromTransactions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.externalAccount.unassignFromTransactions(parentId,childIds);
    },

}

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
        return await backend.fundsTransfer.assignToSourceAccount(parentId,childId);
    },

    unassignSourceAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.fundsTransfer.unassignFromSourceAccount(parentId,childId);
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
        return await backend.fundsTransfer.assignToDestinationAccount(parentId,childId);
    },

    unassignDestinationAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.fundsTransfer.unassignFromDestinationAccount(parentId,childId);
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
        return await backend.fundsTransfer.assignToExternalBeneficiary(parentId,childId);
    },

    unassignExternalBeneficiary: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.fundsTransfer.unassignFromExternalBeneficiary(parentId,childId);
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
        return await backend.fundsTransfer.assignToInitiatedBy(parentId,childId);
    },

    unassignInitiatedBy: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.fundsTransfer.unassignFromInitiatedBy(parentId,childId);
    },
    transactions: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.fundsTransfer.getTransactions(parentId);
    },

    assignToTransactions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.fundsTransfer.assignToTransactions(parentId,childIds);
    },

    unassignFromTransactions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.fundsTransfer.unassignFromTransactions(parentId,childIds);
    },

}

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
        return await backend.standingInstruction.assignToAccount(parentId,childId);
    },

    unassignAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.standingInstruction.unassignFromAccount(parentId,childId);
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
        return await backend.standingInstruction.assignToBeneficiary(parentId,childId);
    },

    unassignBeneficiary: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.standingInstruction.unassignFromBeneficiary(parentId,childId);
    },
}

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
        return await backend.paymentCard.assignToBank(parentId,childId);
    },

    unassignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.paymentCard.unassignFromBank(parentId,childId);
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
        return await backend.paymentCard.assignToAccount(parentId,childId);
    },

    unassignAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.paymentCard.unassignFromAccount(parentId,childId);
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
        return await backend.paymentCard.assignToCustomer(parentId,childId);
    },

    unassignCustomer: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.paymentCard.unassignFromCustomer(parentId,childId);
    },
    transactions: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.paymentCard.getTransactions(parentId);
    },

    assignToTransactions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.paymentCard.assignToTransactions(parentId,childIds);
    },

    unassignFromTransactions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.paymentCard.unassignFromTransactions(parentId,childIds);
    },

}

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
        return await backend.loanAccount.assignToBank(parentId,childId);
    },

    unassignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.loanAccount.unassignFromBank(parentId,childId);
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
        return await backend.loanAccount.assignToBranch(parentId,childId);
    },

    unassignBranch: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.loanAccount.unassignFromBranch(parentId,childId);
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
        return await backend.loanAccount.assignToProduct(parentId,childId);
    },

    unassignProduct: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.loanAccount.unassignFromProduct(parentId,childId);
    },
    borrowers: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.getBorrowers(parentId);
    },

    assignToBorrowers: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.assignToBorrowers(parentId,childIds);
    },

    unassignFromBorrowers: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.unassignFromBorrowers(parentId,childIds);
    },

    repaymentSchedule: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.getRepaymentSchedule(parentId);
    },

    assignToRepaymentSchedule: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.assignToRepaymentSchedule(parentId,childIds);
    },

    unassignFromRepaymentSchedule: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.unassignFromRepaymentSchedule(parentId,childIds);
    },

    payments: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.getPayments(parentId);
    },

    assignToPayments: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.assignToPayments(parentId,childIds);
    },

    unassignFromPayments: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.unassignFromPayments(parentId,childIds);
    },

    collateral: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.getCollateral(parentId);
    },

    assignToCollateral: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.assignToCollateral(parentId,childIds);
    },

    unassignFromCollateral: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.unassignFromCollateral(parentId,childIds);
    },

    feeCharges: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.getFeeCharges(parentId);
    },

    assignToFeeCharges: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.assignToFeeCharges(parentId,childIds);
    },

    unassignFromFeeCharges: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.loanAccount.unassignFromFeeCharges(parentId,childIds);
    },

}

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
        return await backend.repaymentSchedule.assignToLoanAccount(parentId,childId);
    },

    unassignLoanAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.repaymentSchedule.unassignFromLoanAccount(parentId,childId);
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
        return await backend.repaymentSchedule.assignToPayment(parentId,childId);
    },

    unassignPayment: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.repaymentSchedule.unassignFromPayment(parentId,childId);
    },
}

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
        return await backend.loanPayment.assignToLoanAccount(parentId,childId);
    },

    unassignLoanAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.loanPayment.unassignFromLoanAccount(parentId,childId);
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
        return await backend.loanPayment.assignToTransaction(parentId,childId);
    },

    unassignTransaction: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.loanPayment.unassignFromTransaction(parentId,childId);
    },
}

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
        return await backend.collateral.assignToLoanAccount(parentId,childId);
    },

    unassignLoanAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.collateral.unassignFromLoanAccount(parentId,childId);
    },
}

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
        return await backend.feeCharge.assignToAccount(parentId,childId);
    },

    unassignAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.feeCharge.unassignFromAccount(parentId,childId);
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
        return await backend.feeCharge.assignToLoanAccount(parentId,childId);
    },

    unassignLoanAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.feeCharge.unassignFromLoanAccount(parentId,childId);
    },
}

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
        return await backend.exchangeRate.assignToBank(parentId,childId);
    },

    unassignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.exchangeRate.unassignFromBank(parentId,childId);
    },
    fxTrades: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.exchangeRate.getFxTrades(parentId);
    },

    assignToFxTrades: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.exchangeRate.assignToFxTrades(parentId,childIds);
    },

    unassignFromFxTrades: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.exchangeRate.unassignFromFxTrades(parentId,childIds);
    },

}

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
        return await backend.fXTrade.assignToCustomer(parentId,childId);
    },

    unassignCustomer: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.fXTrade.unassignFromCustomer(parentId,childId);
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
        return await backend.fXTrade.assignToBank(parentId,childId);
    },

    unassignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.fXTrade.unassignFromBank(parentId,childId);
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
        return await backend.fXTrade.assignToExchangeRate(parentId,childId);
    },

    unassignExchangeRate: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.fXTrade.unassignFromExchangeRate(parentId,childId);
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
        return await backend.fXTrade.assignToSourceAccount(parentId,childId);
    },

    unassignSourceAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.fXTrade.unassignFromSourceAccount(parentId,childId);
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
        return await backend.fXTrade.assignToDestinationAccount(parentId,childId);
    },

    unassignDestinationAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.fXTrade.unassignFromDestinationAccount(parentId,childId);
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
        return await backend.fXTrade.assignToTransaction(parentId,childId);
    },

    unassignTransaction: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.fXTrade.unassignFromTransaction(parentId,childId);
    },
}

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
        return await backend.dispute.assignToTransaction(parentId,childId);
    },

    unassignTransaction: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.dispute.unassignFromTransaction(parentId,childId);
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
        return await backend.dispute.assignToCustomer(parentId,childId);
    },

    unassignCustomer: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.dispute.unassignFromCustomer(parentId,childId);
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
        return await backend.dispute.assignToAccount(parentId,childId);
    },

    unassignAccount: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.dispute.unassignFromAccount(parentId,childId);
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
        return await backend.dispute.assignToPaymentCard(parentId,childId);
    },

    unassignPaymentCard: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.dispute.unassignFromPaymentCard(parentId,childId);
    },
}

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
        return await backend.consent.assignToCustomer(parentId,childId);
    },

    unassignCustomer: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.consent.unassignFromCustomer(parentId,childId);
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
        return await backend.consent.assignToBank(parentId,childId);
    },

    unassignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.consent.unassignFromBank(parentId,childId);
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
        return await backend.consent.assignToThirdPartyProvider(parentId,childId);
    },

    unassignThirdPartyProvider: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.consent.unassignFromThirdPartyProvider(parentId,childId);
    },
    authorizedAccounts: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.consent.getAuthorizedAccounts(parentId);
    },

    assignToAuthorizedAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.consent.assignToAuthorizedAccounts(parentId,childIds);
    },

    unassignFromAuthorizedAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.consent.unassignFromAuthorizedAccounts(parentId,childIds);
    },

}

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
        return await backend.thirdPartyProvider.assignToBank(parentId,childId);
    },

    unassignBank: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.thirdPartyProvider.unassignFromBank(parentId,childId);
    },
    consents: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.thirdPartyProvider.getConsents(parentId);
    },

    assignToConsents: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.thirdPartyProvider.assignToConsents(parentId,childIds);
    },

    unassignFromConsents: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.thirdPartyProvider.unassignFromConsents(parentId,childIds);
    },

}

};

