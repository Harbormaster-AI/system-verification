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
    bank: async (_ : ResolverParent,  { id: string },  { backend }: ResolverContext) => {
        return await backend.bank.find( id );
    },

    banks: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)
    {
        const all = await backend.bank.findAll({ pageSize = 25, after });

        const bankPage = paginateResults({
            after,
            pageSize,
            results: all,
        });

        return { bankPage,
            cursor: bankPage.length ? bankPage[bankPage.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: bankPage.length
            ? bankPage[bankPage.length - 1].cursor !== all[all.length - 1].cursor
            : false,
        };
    },
    //////////////////////////
    // Branch
    //////////////////////////
    branch: async (_ : ResolverParent,  { id: string },  { backend }: ResolverContext) => {
        return await backend.branch.find( id );
    },

    branchs: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)
    {
        const all = await backend.branch.findAll({ pageSize = 25, after });

        const branchPage = paginateResults({
            after,
            pageSize,
            results: all,
        });

        return { branchPage,
            cursor: branchPage.length ? branchPage[branchPage.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: branchPage.length
            ? branchPage[branchPage.length - 1].cursor !== all[all.length - 1].cursor
            : false,
        };
    },
    //////////////////////////
    // ATM
    //////////////////////////
    aTM: async (_ : ResolverParent,  { id: string },  { backend }: ResolverContext) => {
        return await backend.aTM.find( id );
    },

    aTMs: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)
    {
        const all = await backend.aTM.findAll({ pageSize = 25, after });

        const aTMPage = paginateResults({
            after,
            pageSize,
            results: all,
        });

        return { aTMPage,
            cursor: aTMPage.length ? aTMPage[aTMPage.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: aTMPage.length
            ? aTMPage[aTMPage.length - 1].cursor !== all[all.length - 1].cursor
            : false,
        };
    },
    //////////////////////////
    // Customer
    //////////////////////////
    customer: async (_ : ResolverParent,  { id: string },  { backend }: ResolverContext) => {
        return await backend.customer.find( id );
    },

    customers: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)
    {
        const all = await backend.customer.findAll({ pageSize = 25, after });

        const customerPage = paginateResults({
            after,
            pageSize,
            results: all,
        });

        return { customerPage,
            cursor: customerPage.length ? customerPage[customerPage.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: customerPage.length
            ? customerPage[customerPage.length - 1].cursor !== all[all.length - 1].cursor
            : false,
        };
    },
    //////////////////////////
    // KycProfile
    //////////////////////////
    kycProfile: async (_ : ResolverParent,  { id: string },  { backend }: ResolverContext) => {
        return await backend.kycProfile.find( id );
    },

    kycProfiles: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)
    {
        const all = await backend.kycProfile.findAll({ pageSize = 25, after });

        const kycProfilePage = paginateResults({
            after,
            pageSize,
            results: all,
        });

        return { kycProfilePage,
            cursor: kycProfilePage.length ? kycProfilePage[kycProfilePage.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: kycProfilePage.length
            ? kycProfilePage[kycProfilePage.length - 1].cursor !== all[all.length - 1].cursor
            : false,
        };
    },
    //////////////////////////
    // IdentityDocument
    //////////////////////////
    identityDocument: async (_ : ResolverParent,  { id: string },  { backend }: ResolverContext) => {
        return await backend.identityDocument.find( id );
    },

    identityDocuments: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)
    {
        const all = await backend.identityDocument.findAll({ pageSize = 25, after });

        const identityDocumentPage = paginateResults({
            after,
            pageSize,
            results: all,
        });

        return { identityDocumentPage,
            cursor: identityDocumentPage.length ? identityDocumentPage[identityDocumentPage.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: identityDocumentPage.length
            ? identityDocumentPage[identityDocumentPage.length - 1].cursor !== all[all.length - 1].cursor
            : false,
        };
    },
    //////////////////////////
    // RiskAssessment
    //////////////////////////
    riskAssessment: async (_ : ResolverParent,  { id: string },  { backend }: ResolverContext) => {
        return await backend.riskAssessment.find( id );
    },

    riskAssessments: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)
    {
        const all = await backend.riskAssessment.findAll({ pageSize = 25, after });

        const riskAssessmentPage = paginateResults({
            after,
            pageSize,
            results: all,
        });

        return { riskAssessmentPage,
            cursor: riskAssessmentPage.length ? riskAssessmentPage[riskAssessmentPage.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: riskAssessmentPage.length
            ? riskAssessmentPage[riskAssessmentPage.length - 1].cursor !== all[all.length - 1].cursor
            : false,
        };
    },
    //////////////////////////
    // ScreeningResult
    //////////////////////////
    screeningResult: async (_ : ResolverParent,  { id: string },  { backend }: ResolverContext) => {
        return await backend.screeningResult.find( id );
    },

    screeningResults: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)
    {
        const all = await backend.screeningResult.findAll({ pageSize = 25, after });

        const screeningResultPage = paginateResults({
            after,
            pageSize,
            results: all,
        });

        return { screeningResultPage,
            cursor: screeningResultPage.length ? screeningResultPage[screeningResultPage.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: screeningResultPage.length
            ? screeningResultPage[screeningResultPage.length - 1].cursor !== all[all.length - 1].cursor
            : false,
        };
    },
    //////////////////////////
    // BankingProduct
    //////////////////////////
    bankingProduct: async (_ : ResolverParent,  { id: string },  { backend }: ResolverContext) => {
        return await backend.bankingProduct.find( id );
    },

    bankingProducts: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)
    {
        const all = await backend.bankingProduct.findAll({ pageSize = 25, after });

        const bankingProductPage = paginateResults({
            after,
            pageSize,
            results: all,
        });

        return { bankingProductPage,
            cursor: bankingProductPage.length ? bankingProductPage[bankingProductPage.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: bankingProductPage.length
            ? bankingProductPage[bankingProductPage.length - 1].cursor !== all[all.length - 1].cursor
            : false,
        };
    },
    //////////////////////////
    // Account
    //////////////////////////
    account: async (_ : ResolverParent,  { id: string },  { backend }: ResolverContext) => {
        return await backend.account.find( id );
    },

    accounts: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)
    {
        const all = await backend.account.findAll({ pageSize = 25, after });

        const accountPage = paginateResults({
            after,
            pageSize,
            results: all,
        });

        return { accountPage,
            cursor: accountPage.length ? accountPage[accountPage.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: accountPage.length
            ? accountPage[accountPage.length - 1].cursor !== all[all.length - 1].cursor
            : false,
        };
    },
    //////////////////////////
    // AccountStatement
    //////////////////////////
    accountStatement: async (_ : ResolverParent,  { id: string },  { backend }: ResolverContext) => {
        return await backend.accountStatement.find( id );
    },

    accountStatements: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)
    {
        const all = await backend.accountStatement.findAll({ pageSize = 25, after });

        const accountStatementPage = paginateResults({
            after,
            pageSize,
            results: all,
        });

        return { accountStatementPage,
            cursor: accountStatementPage.length ? accountStatementPage[accountStatementPage.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: accountStatementPage.length
            ? accountStatementPage[accountStatementPage.length - 1].cursor !== all[all.length - 1].cursor
            : false,
        };
    },
    //////////////////////////
    // Transaction
    //////////////////////////
    transaction: async (_ : ResolverParent,  { id: string },  { backend }: ResolverContext) => {
        return await backend.transaction.find( id );
    },

    transactions: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)
    {
        const all = await backend.transaction.findAll({ pageSize = 25, after });

        const transactionPage = paginateResults({
            after,
            pageSize,
            results: all,
        });

        return { transactionPage,
            cursor: transactionPage.length ? transactionPage[transactionPage.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: transactionPage.length
            ? transactionPage[transactionPage.length - 1].cursor !== all[all.length - 1].cursor
            : false,
        };
    },
    //////////////////////////
    // ExternalAccount
    //////////////////////////
    externalAccount: async (_ : ResolverParent,  { id: string },  { backend }: ResolverContext) => {
        return await backend.externalAccount.find( id );
    },

    externalAccounts: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)
    {
        const all = await backend.externalAccount.findAll({ pageSize = 25, after });

        const externalAccountPage = paginateResults({
            after,
            pageSize,
            results: all,
        });

        return { externalAccountPage,
            cursor: externalAccountPage.length ? externalAccountPage[externalAccountPage.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: externalAccountPage.length
            ? externalAccountPage[externalAccountPage.length - 1].cursor !== all[all.length - 1].cursor
            : false,
        };
    },
    //////////////////////////
    // FundsTransfer
    //////////////////////////
    fundsTransfer: async (_ : ResolverParent,  { id: string },  { backend }: ResolverContext) => {
        return await backend.fundsTransfer.find( id );
    },

    fundsTransfers: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)
    {
        const all = await backend.fundsTransfer.findAll({ pageSize = 25, after });

        const fundsTransferPage = paginateResults({
            after,
            pageSize,
            results: all,
        });

        return { fundsTransferPage,
            cursor: fundsTransferPage.length ? fundsTransferPage[fundsTransferPage.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: fundsTransferPage.length
            ? fundsTransferPage[fundsTransferPage.length - 1].cursor !== all[all.length - 1].cursor
            : false,
        };
    },
    //////////////////////////
    // StandingInstruction
    //////////////////////////
    standingInstruction: async (_ : ResolverParent,  { id: string },  { backend }: ResolverContext) => {
        return await backend.standingInstruction.find( id );
    },

    standingInstructions: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)
    {
        const all = await backend.standingInstruction.findAll({ pageSize = 25, after });

        const standingInstructionPage = paginateResults({
            after,
            pageSize,
            results: all,
        });

        return { standingInstructionPage,
            cursor: standingInstructionPage.length ? standingInstructionPage[standingInstructionPage.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: standingInstructionPage.length
            ? standingInstructionPage[standingInstructionPage.length - 1].cursor !== all[all.length - 1].cursor
            : false,
        };
    },
    //////////////////////////
    // PaymentCard
    //////////////////////////
    paymentCard: async (_ : ResolverParent,  { id: string },  { backend }: ResolverContext) => {
        return await backend.paymentCard.find( id );
    },

    paymentCards: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)
    {
        const all = await backend.paymentCard.findAll({ pageSize = 25, after });

        const paymentCardPage = paginateResults({
            after,
            pageSize,
            results: all,
        });

        return { paymentCardPage,
            cursor: paymentCardPage.length ? paymentCardPage[paymentCardPage.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: paymentCardPage.length
            ? paymentCardPage[paymentCardPage.length - 1].cursor !== all[all.length - 1].cursor
            : false,
        };
    },
    //////////////////////////
    // LoanAccount
    //////////////////////////
    loanAccount: async (_ : ResolverParent,  { id: string },  { backend }: ResolverContext) => {
        return await backend.loanAccount.find( id );
    },

    loanAccounts: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)
    {
        const all = await backend.loanAccount.findAll({ pageSize = 25, after });

        const loanAccountPage = paginateResults({
            after,
            pageSize,
            results: all,
        });

        return { loanAccountPage,
            cursor: loanAccountPage.length ? loanAccountPage[loanAccountPage.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: loanAccountPage.length
            ? loanAccountPage[loanAccountPage.length - 1].cursor !== all[all.length - 1].cursor
            : false,
        };
    },
    //////////////////////////
    // RepaymentSchedule
    //////////////////////////
    repaymentSchedule: async (_ : ResolverParent,  { id: string },  { backend }: ResolverContext) => {
        return await backend.repaymentSchedule.find( id );
    },

    repaymentSchedules: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)
    {
        const all = await backend.repaymentSchedule.findAll({ pageSize = 25, after });

        const repaymentSchedulePage = paginateResults({
            after,
            pageSize,
            results: all,
        });

        return { repaymentSchedulePage,
            cursor: repaymentSchedulePage.length ? repaymentSchedulePage[repaymentSchedulePage.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: repaymentSchedulePage.length
            ? repaymentSchedulePage[repaymentSchedulePage.length - 1].cursor !== all[all.length - 1].cursor
            : false,
        };
    },
    //////////////////////////
    // LoanPayment
    //////////////////////////
    loanPayment: async (_ : ResolverParent,  { id: string },  { backend }: ResolverContext) => {
        return await backend.loanPayment.find( id );
    },

    loanPayments: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)
    {
        const all = await backend.loanPayment.findAll({ pageSize = 25, after });

        const loanPaymentPage = paginateResults({
            after,
            pageSize,
            results: all,
        });

        return { loanPaymentPage,
            cursor: loanPaymentPage.length ? loanPaymentPage[loanPaymentPage.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: loanPaymentPage.length
            ? loanPaymentPage[loanPaymentPage.length - 1].cursor !== all[all.length - 1].cursor
            : false,
        };
    },
    //////////////////////////
    // Collateral
    //////////////////////////
    collateral: async (_ : ResolverParent,  { id: string },  { backend }: ResolverContext) => {
        return await backend.collateral.find( id );
    },

    collaterals: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)
    {
        const all = await backend.collateral.findAll({ pageSize = 25, after });

        const collateralPage = paginateResults({
            after,
            pageSize,
            results: all,
        });

        return { collateralPage,
            cursor: collateralPage.length ? collateralPage[collateralPage.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: collateralPage.length
            ? collateralPage[collateralPage.length - 1].cursor !== all[all.length - 1].cursor
            : false,
        };
    },
    //////////////////////////
    // FeeCharge
    //////////////////////////
    feeCharge: async (_ : ResolverParent,  { id: string },  { backend }: ResolverContext) => {
        return await backend.feeCharge.find( id );
    },

    feeCharges: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)
    {
        const all = await backend.feeCharge.findAll({ pageSize = 25, after });

        const feeChargePage = paginateResults({
            after,
            pageSize,
            results: all,
        });

        return { feeChargePage,
            cursor: feeChargePage.length ? feeChargePage[feeChargePage.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: feeChargePage.length
            ? feeChargePage[feeChargePage.length - 1].cursor !== all[all.length - 1].cursor
            : false,
        };
    },
    //////////////////////////
    // ExchangeRate
    //////////////////////////
    exchangeRate: async (_ : ResolverParent,  { id: string },  { backend }: ResolverContext) => {
        return await backend.exchangeRate.find( id );
    },

    exchangeRates: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)
    {
        const all = await backend.exchangeRate.findAll({ pageSize = 25, after });

        const exchangeRatePage = paginateResults({
            after,
            pageSize,
            results: all,
        });

        return { exchangeRatePage,
            cursor: exchangeRatePage.length ? exchangeRatePage[exchangeRatePage.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: exchangeRatePage.length
            ? exchangeRatePage[exchangeRatePage.length - 1].cursor !== all[all.length - 1].cursor
            : false,
        };
    },
    //////////////////////////
    // FXTrade
    //////////////////////////
    fXTrade: async (_ : ResolverParent,  { id: string },  { backend }: ResolverContext) => {
        return await backend.fXTrade.find( id );
    },

    fXTrades: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)
    {
        const all = await backend.fXTrade.findAll({ pageSize = 25, after });

        const fXTradePage = paginateResults({
            after,
            pageSize,
            results: all,
        });

        return { fXTradePage,
            cursor: fXTradePage.length ? fXTradePage[fXTradePage.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: fXTradePage.length
            ? fXTradePage[fXTradePage.length - 1].cursor !== all[all.length - 1].cursor
            : false,
        };
    },
    //////////////////////////
    // Dispute
    //////////////////////////
    dispute: async (_ : ResolverParent,  { id: string },  { backend }: ResolverContext) => {
        return await backend.dispute.find( id );
    },

    disputes: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)
    {
        const all = await backend.dispute.findAll({ pageSize = 25, after });

        const disputePage = paginateResults({
            after,
            pageSize,
            results: all,
        });

        return { disputePage,
            cursor: disputePage.length ? disputePage[disputePage.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: disputePage.length
            ? disputePage[disputePage.length - 1].cursor !== all[all.length - 1].cursor
            : false,
        };
    },
    //////////////////////////
    // Consent
    //////////////////////////
    consent: async (_ : ResolverParent,  { id: string },  { backend }: ResolverContext) => {
        return await backend.consent.find( id );
    },

    consents: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)
    {
        const all = await backend.consent.findAll({ pageSize = 25, after });

        const consentPage = paginateResults({
            after,
            pageSize,
            results: all,
        });

        return { consentPage,
            cursor: consentPage.length ? consentPage[consentPage.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: consentPage.length
            ? consentPage[consentPage.length - 1].cursor !== all[all.length - 1].cursor
            : false,
        };
    },
    //////////////////////////
    // ThirdPartyProvider
    //////////////////////////
    thirdPartyProvider: async (_ : ResolverParent,  { id: string },  { backend }: ResolverContext) => {
        return await backend.thirdPartyProvider.find( id );
    },

    thirdPartyProviders: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)
    {
        const all = await backend.thirdPartyProvider.findAll({ pageSize = 25, after });

        const thirdPartyProviderPage = paginateResults({
            after,
            pageSize,
            results: all,
        });

        return { thirdPartyProviderPage,
            cursor: thirdPartyProviderPage.length ? thirdPartyProviderPage[thirdPartyProviderPage.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: thirdPartyProviderPage.length
            ? thirdPartyProviderPage[thirdPartyProviderPage.length - 1].cursor !== all[all.length - 1].cursor
            : false,
        };
    },
},

Mutation: {

//////////////////////////
// Bank
//////////////////////////
    addBank: async ( _: ResolverParent, args : Bank, { backend }: ResolverContext)
    {
        return await backend.bank.add( args );
    },

    updateBank: async ( _: ResolverParent, args : Bank, { backend }: ResolverContext)
    {
        return await backend.bank.update( args );
    },

    removeBank: async ( _: ResolverParent, { id: string }, { backend }: ResolverContext)
    {
        return await backend.bank.remove( { id } );
    },
        //////////////////////////
// Branch
//////////////////////////
    addBranch: async ( _: ResolverParent, args : Branch, { backend }: ResolverContext)
    {
        return await backend.branch.add( args );
    },

    updateBranch: async ( _: ResolverParent, args : Branch, { backend }: ResolverContext)
    {
        return await backend.branch.update( args );
    },

    removeBranch: async ( _: ResolverParent, { id: string }, { backend }: ResolverContext)
    {
        return await backend.branch.remove( { id } );
    },
        //////////////////////////
// ATM
//////////////////////////
    addATM: async ( _: ResolverParent, args : ATM, { backend }: ResolverContext)
    {
        return await backend.aTM.add( args );
    },

    updateATM: async ( _: ResolverParent, args : ATM, { backend }: ResolverContext)
    {
        return await backend.aTM.update( args );
    },

    removeATM: async ( _: ResolverParent, { id: string }, { backend }: ResolverContext)
    {
        return await backend.aTM.remove( { id } );
    },
        //////////////////////////
// Customer
//////////////////////////
    addCustomer: async ( _: ResolverParent, args : Customer, { backend }: ResolverContext)
    {
        return await backend.customer.add( args );
    },

    updateCustomer: async ( _: ResolverParent, args : Customer, { backend }: ResolverContext)
    {
        return await backend.customer.update( args );
    },

    removeCustomer: async ( _: ResolverParent, { id: string }, { backend }: ResolverContext)
    {
        return await backend.customer.remove( { id } );
    },
        //////////////////////////
// KycProfile
//////////////////////////
    addKycProfile: async ( _: ResolverParent, args : KycProfile, { backend }: ResolverContext)
    {
        return await backend.kycProfile.add( args );
    },

    updateKycProfile: async ( _: ResolverParent, args : KycProfile, { backend }: ResolverContext)
    {
        return await backend.kycProfile.update( args );
    },

    removeKycProfile: async ( _: ResolverParent, { id: string }, { backend }: ResolverContext)
    {
        return await backend.kycProfile.remove( { id } );
    },
        //////////////////////////
// IdentityDocument
//////////////////////////
    addIdentityDocument: async ( _: ResolverParent, args : IdentityDocument, { backend }: ResolverContext)
    {
        return await backend.identityDocument.add( args );
    },

    updateIdentityDocument: async ( _: ResolverParent, args : IdentityDocument, { backend }: ResolverContext)
    {
        return await backend.identityDocument.update( args );
    },

    removeIdentityDocument: async ( _: ResolverParent, { id: string }, { backend }: ResolverContext)
    {
        return await backend.identityDocument.remove( { id } );
    },
        //////////////////////////
// RiskAssessment
//////////////////////////
    addRiskAssessment: async ( _: ResolverParent, args : RiskAssessment, { backend }: ResolverContext)
    {
        return await backend.riskAssessment.add( args );
    },

    updateRiskAssessment: async ( _: ResolverParent, args : RiskAssessment, { backend }: ResolverContext)
    {
        return await backend.riskAssessment.update( args );
    },

    removeRiskAssessment: async ( _: ResolverParent, { id: string }, { backend }: ResolverContext)
    {
        return await backend.riskAssessment.remove( { id } );
    },
        //////////////////////////
// ScreeningResult
//////////////////////////
    addScreeningResult: async ( _: ResolverParent, args : ScreeningResult, { backend }: ResolverContext)
    {
        return await backend.screeningResult.add( args );
    },

    updateScreeningResult: async ( _: ResolverParent, args : ScreeningResult, { backend }: ResolverContext)
    {
        return await backend.screeningResult.update( args );
    },

    removeScreeningResult: async ( _: ResolverParent, { id: string }, { backend }: ResolverContext)
    {
        return await backend.screeningResult.remove( { id } );
    },
        //////////////////////////
// BankingProduct
//////////////////////////
    addBankingProduct: async ( _: ResolverParent, args : BankingProduct, { backend }: ResolverContext)
    {
        return await backend.bankingProduct.add( args );
    },

    updateBankingProduct: async ( _: ResolverParent, args : BankingProduct, { backend }: ResolverContext)
    {
        return await backend.bankingProduct.update( args );
    },

    removeBankingProduct: async ( _: ResolverParent, { id: string }, { backend }: ResolverContext)
    {
        return await backend.bankingProduct.remove( { id } );
    },
        //////////////////////////
// Account
//////////////////////////
    addAccount: async ( _: ResolverParent, args : Account, { backend }: ResolverContext)
    {
        return await backend.account.add( args );
    },

    updateAccount: async ( _: ResolverParent, args : Account, { backend }: ResolverContext)
    {
        return await backend.account.update( args );
    },

    removeAccount: async ( _: ResolverParent, { id: string }, { backend }: ResolverContext)
    {
        return await backend.account.remove( { id } );
    },
        //////////////////////////
// AccountStatement
//////////////////////////
    addAccountStatement: async ( _: ResolverParent, args : AccountStatement, { backend }: ResolverContext)
    {
        return await backend.accountStatement.add( args );
    },

    updateAccountStatement: async ( _: ResolverParent, args : AccountStatement, { backend }: ResolverContext)
    {
        return await backend.accountStatement.update( args );
    },

    removeAccountStatement: async ( _: ResolverParent, { id: string }, { backend }: ResolverContext)
    {
        return await backend.accountStatement.remove( { id } );
    },
        //////////////////////////
// Transaction
//////////////////////////
    addTransaction: async ( _: ResolverParent, args : Transaction, { backend }: ResolverContext)
    {
        return await backend.transaction.add( args );
    },

    updateTransaction: async ( _: ResolverParent, args : Transaction, { backend }: ResolverContext)
    {
        return await backend.transaction.update( args );
    },

    removeTransaction: async ( _: ResolverParent, { id: string }, { backend }: ResolverContext)
    {
        return await backend.transaction.remove( { id } );
    },
        //////////////////////////
// ExternalAccount
//////////////////////////
    addExternalAccount: async ( _: ResolverParent, args : ExternalAccount, { backend }: ResolverContext)
    {
        return await backend.externalAccount.add( args );
    },

    updateExternalAccount: async ( _: ResolverParent, args : ExternalAccount, { backend }: ResolverContext)
    {
        return await backend.externalAccount.update( args );
    },

    removeExternalAccount: async ( _: ResolverParent, { id: string }, { backend }: ResolverContext)
    {
        return await backend.externalAccount.remove( { id } );
    },
        //////////////////////////
// FundsTransfer
//////////////////////////
    addFundsTransfer: async ( _: ResolverParent, args : FundsTransfer, { backend }: ResolverContext)
    {
        return await backend.fundsTransfer.add( args );
    },

    updateFundsTransfer: async ( _: ResolverParent, args : FundsTransfer, { backend }: ResolverContext)
    {
        return await backend.fundsTransfer.update( args );
    },

    removeFundsTransfer: async ( _: ResolverParent, { id: string }, { backend }: ResolverContext)
    {
        return await backend.fundsTransfer.remove( { id } );
    },
        //////////////////////////
// StandingInstruction
//////////////////////////
    addStandingInstruction: async ( _: ResolverParent, args : StandingInstruction, { backend }: ResolverContext)
    {
        return await backend.standingInstruction.add( args );
    },

    updateStandingInstruction: async ( _: ResolverParent, args : StandingInstruction, { backend }: ResolverContext)
    {
        return await backend.standingInstruction.update( args );
    },

    removeStandingInstruction: async ( _: ResolverParent, { id: string }, { backend }: ResolverContext)
    {
        return await backend.standingInstruction.remove( { id } );
    },
        //////////////////////////
// PaymentCard
//////////////////////////
    addPaymentCard: async ( _: ResolverParent, args : PaymentCard, { backend }: ResolverContext)
    {
        return await backend.paymentCard.add( args );
    },

    updatePaymentCard: async ( _: ResolverParent, args : PaymentCard, { backend }: ResolverContext)
    {
        return await backend.paymentCard.update( args );
    },

    removePaymentCard: async ( _: ResolverParent, { id: string }, { backend }: ResolverContext)
    {
        return await backend.paymentCard.remove( { id } );
    },
        //////////////////////////
// LoanAccount
//////////////////////////
    addLoanAccount: async ( _: ResolverParent, args : LoanAccount, { backend }: ResolverContext)
    {
        return await backend.loanAccount.add( args );
    },

    updateLoanAccount: async ( _: ResolverParent, args : LoanAccount, { backend }: ResolverContext)
    {
        return await backend.loanAccount.update( args );
    },

    removeLoanAccount: async ( _: ResolverParent, { id: string }, { backend }: ResolverContext)
    {
        return await backend.loanAccount.remove( { id } );
    },
        //////////////////////////
// RepaymentSchedule
//////////////////////////
    addRepaymentSchedule: async ( _: ResolverParent, args : RepaymentSchedule, { backend }: ResolverContext)
    {
        return await backend.repaymentSchedule.add( args );
    },

    updateRepaymentSchedule: async ( _: ResolverParent, args : RepaymentSchedule, { backend }: ResolverContext)
    {
        return await backend.repaymentSchedule.update( args );
    },

    removeRepaymentSchedule: async ( _: ResolverParent, { id: string }, { backend }: ResolverContext)
    {
        return await backend.repaymentSchedule.remove( { id } );
    },
        //////////////////////////
// LoanPayment
//////////////////////////
    addLoanPayment: async ( _: ResolverParent, args : LoanPayment, { backend }: ResolverContext)
    {
        return await backend.loanPayment.add( args );
    },

    updateLoanPayment: async ( _: ResolverParent, args : LoanPayment, { backend }: ResolverContext)
    {
        return await backend.loanPayment.update( args );
    },

    removeLoanPayment: async ( _: ResolverParent, { id: string }, { backend }: ResolverContext)
    {
        return await backend.loanPayment.remove( { id } );
    },
        //////////////////////////
// Collateral
//////////////////////////
    addCollateral: async ( _: ResolverParent, args : Collateral, { backend }: ResolverContext)
    {
        return await backend.collateral.add( args );
    },

    updateCollateral: async ( _: ResolverParent, args : Collateral, { backend }: ResolverContext)
    {
        return await backend.collateral.update( args );
    },

    removeCollateral: async ( _: ResolverParent, { id: string }, { backend }: ResolverContext)
    {
        return await backend.collateral.remove( { id } );
    },
        //////////////////////////
// FeeCharge
//////////////////////////
    addFeeCharge: async ( _: ResolverParent, args : FeeCharge, { backend }: ResolverContext)
    {
        return await backend.feeCharge.add( args );
    },

    updateFeeCharge: async ( _: ResolverParent, args : FeeCharge, { backend }: ResolverContext)
    {
        return await backend.feeCharge.update( args );
    },

    removeFeeCharge: async ( _: ResolverParent, { id: string }, { backend }: ResolverContext)
    {
        return await backend.feeCharge.remove( { id } );
    },
        //////////////////////////
// ExchangeRate
//////////////////////////
    addExchangeRate: async ( _: ResolverParent, args : ExchangeRate, { backend }: ResolverContext)
    {
        return await backend.exchangeRate.add( args );
    },

    updateExchangeRate: async ( _: ResolverParent, args : ExchangeRate, { backend }: ResolverContext)
    {
        return await backend.exchangeRate.update( args );
    },

    removeExchangeRate: async ( _: ResolverParent, { id: string }, { backend }: ResolverContext)
    {
        return await backend.exchangeRate.remove( { id } );
    },
        //////////////////////////
// FXTrade
//////////////////////////
    addFXTrade: async ( _: ResolverParent, args : FXTrade, { backend }: ResolverContext)
    {
        return await backend.fXTrade.add( args );
    },

    updateFXTrade: async ( _: ResolverParent, args : FXTrade, { backend }: ResolverContext)
    {
        return await backend.fXTrade.update( args );
    },

    removeFXTrade: async ( _: ResolverParent, { id: string }, { backend }: ResolverContext)
    {
        return await backend.fXTrade.remove( { id } );
    },
        //////////////////////////
// Dispute
//////////////////////////
    addDispute: async ( _: ResolverParent, args : Dispute, { backend }: ResolverContext)
    {
        return await backend.dispute.add( args );
    },

    updateDispute: async ( _: ResolverParent, args : Dispute, { backend }: ResolverContext)
    {
        return await backend.dispute.update( args );
    },

    removeDispute: async ( _: ResolverParent, { id: string }, { backend }: ResolverContext)
    {
        return await backend.dispute.remove( { id } );
    },
        //////////////////////////
// Consent
//////////////////////////
    addConsent: async ( _: ResolverParent, args : Consent, { backend }: ResolverContext)
    {
        return await backend.consent.add( args );
    },

    updateConsent: async ( _: ResolverParent, args : Consent, { backend }: ResolverContext)
    {
        return await backend.consent.update( args );
    },

    removeConsent: async ( _: ResolverParent, { id: string }, { backend }: ResolverContext)
    {
        return await backend.consent.remove( { id } );
    },
        //////////////////////////
// ThirdPartyProvider
//////////////////////////
    addThirdPartyProvider: async ( _: ResolverParent, args : ThirdPartyProvider, { backend }: ResolverContext)
    {
        return await backend.thirdPartyProvider.add( args );
    },

    updateThirdPartyProvider: async ( _: ResolverParent, args : ThirdPartyProvider, { backend }: ResolverContext)
    {
        return await backend.thirdPartyProvider.update( args );
    },

    removeThirdPartyProvider: async ( _: ResolverParent, { id: string }, { backend }: ResolverContext)
    {
        return await backend.thirdPartyProvider.remove( { id } );
    },
        },

Bank: {
    
    branches: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.bank.getBranches(parentId);
    },

    assignToBranches: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.bank.assignToBranches( parentId, childIds );
    },

    unAssignToBranches: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.bank.unAssignToBranches( parentId, childIds );
    },

    
    products: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.bank.getProducts(parentId);
    },

    assignToProducts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.bank.assignToProducts( parentId, childIds );
    },

    unAssignToProducts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.bank.unAssignToProducts( parentId, childIds );
    },

    
    customers: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.bank.getCustomers(parentId);
    },

    assignToCustomers: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.bank.assignToCustomers( parentId, childIds );
    },

    unAssignToCustomers: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.bank.unAssignToCustomers( parentId, childIds );
    },

    
    accounts: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.bank.getAccounts(parentId);
    },

    assignToAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.bank.assignToAccounts( parentId, childIds );
    },

    unAssignToAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.bank.unAssignToAccounts( parentId, childIds );
    },

    
    paymentCards: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.bank.getPaymentCards(parentId);
    },

    assignToPaymentCards: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.bank.assignToPaymentCards( parentId, childIds );
    },

    unAssignToPaymentCards: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.bank.unAssignToPaymentCards( parentId, childIds );
    },

    
    loanAccounts: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.bank.getLoanAccounts(parentId);
    },

    assignToLoanAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.bank.assignToLoanAccounts( parentId, childIds );
    },

    unAssignToLoanAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.bank.unAssignToLoanAccounts( parentId, childIds );
    },

    
    exchangeRates: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.bank.getExchangeRates(parentId);
    },

    assignToExchangeRates: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.bank.assignToExchangeRates( parentId, childIds );
    },

    unAssignToExchangeRates: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.bank.unAssignToExchangeRates( parentId, childIds );
    },

    
    consents: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.bank.getConsents(parentId);
    },

    assignToConsents: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.bank.assignToConsents( parentId, childIds );
    },

    unAssignToConsents: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.bank.unAssignToConsents( parentId, childIds );
    },

    
    thirdPartyProviders: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.bank.getThirdPartyProviders(parentId);
    },

    assignToThirdPartyProviders: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.bank.assignToThirdPartyProviders( parentId, childIds );
    },

    unAssignToThirdPartyProviders: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.bank.unAssignToThirdPartyProviders( parentId, childIds );
    },

    },
Branch: {

    bank: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.branch.getBank( id );
    },

    assignBank: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.branch.assignToBank( parentId, childId );
    },

    unassignBank: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.branch.unassignFromBank( parentId, childId );
    },
        
    accounts: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.branch.getAccounts(parentId);
    },

    assignToAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.branch.assignToAccounts( parentId, childIds );
    },

    unAssignToAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.branch.unAssignToAccounts( parentId, childIds );
    },

    
    loanAccounts: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.branch.getLoanAccounts(parentId);
    },

    assignToLoanAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.branch.assignToLoanAccounts( parentId, childIds );
    },

    unAssignToLoanAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.branch.unAssignToLoanAccounts( parentId, childIds );
    },

    
    atms: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.branch.getAtms(parentId);
    },

    assignToAtms: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.branch.assignToAtms( parentId, childIds );
    },

    unAssignToAtms: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.branch.unAssignToAtms( parentId, childIds );
    },

    },
ATM: {

    branch: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.aTM.getBranch( id );
    },

    assignBranch: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.aTM.assignToBranch( parentId, childId );
    },

    unassignBranch: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.aTM.unassignFromBranch( parentId, childId );
    },
        },
Customer: {

    bank: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.customer.getBank( id );
    },

    assignBank: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.customer.assignToBank( parentId, childId );
    },

    unassignBank: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.customer.unassignFromBank( parentId, childId );
    },
        
    accounts: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.customer.getAccounts(parentId);
    },

    assignToAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.customer.assignToAccounts( parentId, childIds );
    },

    unAssignToAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.customer.unAssignToAccounts( parentId, childIds );
    },

    
    loanAccounts: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.customer.getLoanAccounts(parentId);
    },

    assignToLoanAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.customer.assignToLoanAccounts( parentId, childIds );
    },

    unAssignToLoanAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.customer.unAssignToLoanAccounts( parentId, childIds );
    },

    
    paymentCards: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.customer.getPaymentCards(parentId);
    },

    assignToPaymentCards: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.customer.assignToPaymentCards( parentId, childIds );
    },

    unAssignToPaymentCards: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.customer.unAssignToPaymentCards( parentId, childIds );
    },

    
    externalAccounts: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.customer.getExternalAccounts(parentId);
    },

    assignToExternalAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.customer.assignToExternalAccounts( parentId, childIds );
    },

    unAssignToExternalAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.customer.unAssignToExternalAccounts( parentId, childIds );
    },

    
    fundsTransfers: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.customer.getFundsTransfers(parentId);
    },

    assignToFundsTransfers: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.customer.assignToFundsTransfers( parentId, childIds );
    },

    unAssignToFundsTransfers: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.customer.unAssignToFundsTransfers( parentId, childIds );
    },

    
    disputes: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.customer.getDisputes(parentId);
    },

    assignToDisputes: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.customer.assignToDisputes( parentId, childIds );
    },

    unAssignToDisputes: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.customer.unAssignToDisputes( parentId, childIds );
    },

    
    kycProfiles: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.customer.getKycProfiles(parentId);
    },

    assignToKycProfiles: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.customer.assignToKycProfiles( parentId, childIds );
    },

    unAssignToKycProfiles: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.customer.unAssignToKycProfiles( parentId, childIds );
    },

    
    consents: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.customer.getConsents(parentId);
    },

    assignToConsents: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.customer.assignToConsents( parentId, childIds );
    },

    unAssignToConsents: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.customer.unAssignToConsents( parentId, childIds );
    },

    },
KycProfile: {

    customer: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.kycProfile.getCustomer( id );
    },

    assignCustomer: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.kycProfile.assignToCustomer( parentId, childId );
    },

    unassignCustomer: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.kycProfile.unassignFromCustomer( parentId, childId );
    },
        
    identityDocuments: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.kycProfile.getIdentityDocuments(parentId);
    },

    assignToIdentityDocuments: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.kycProfile.assignToIdentityDocuments( parentId, childIds );
    },

    unAssignToIdentityDocuments: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.kycProfile.unAssignToIdentityDocuments( parentId, childIds );
    },

    
    riskAssessments: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.kycProfile.getRiskAssessments(parentId);
    },

    assignToRiskAssessments: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.kycProfile.assignToRiskAssessments( parentId, childIds );
    },

    unAssignToRiskAssessments: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.kycProfile.unAssignToRiskAssessments( parentId, childIds );
    },

    
    screenings: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.kycProfile.getScreenings(parentId);
    },

    assignToScreenings: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.kycProfile.assignToScreenings( parentId, childIds );
    },

    unAssignToScreenings: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.kycProfile.unAssignToScreenings( parentId, childIds );
    },

    },
IdentityDocument: {

    kycProfile: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.identityDocument.getKycProfile( id );
    },

    assignKycProfile: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.identityDocument.assignToKycProfile( parentId, childId );
    },

    unassignKycProfile: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.identityDocument.unassignFromKycProfile( parentId, childId );
    },
        },
RiskAssessment: {

    kycProfile: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.riskAssessment.getKycProfile( id );
    },

    assignKycProfile: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.riskAssessment.assignToKycProfile( parentId, childId );
    },

    unassignKycProfile: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.riskAssessment.unassignFromKycProfile( parentId, childId );
    },
        },
ScreeningResult: {

    kycProfile: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.screeningResult.getKycProfile( id );
    },

    assignKycProfile: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.screeningResult.assignToKycProfile( parentId, childId );
    },

    unassignKycProfile: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.screeningResult.unassignFromKycProfile( parentId, childId );
    },
        },
BankingProduct: {

    bank: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.bankingProduct.getBank( id );
    },

    assignBank: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.bankingProduct.assignToBank( parentId, childId );
    },

    unassignBank: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.bankingProduct.unassignFromBank( parentId, childId );
    },
        
    accounts: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.bankingProduct.getAccounts(parentId);
    },

    assignToAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.bankingProduct.assignToAccounts( parentId, childIds );
    },

    unAssignToAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.bankingProduct.unAssignToAccounts( parentId, childIds );
    },

    
    loanAccounts: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.bankingProduct.getLoanAccounts(parentId);
    },

    assignToLoanAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.bankingProduct.assignToLoanAccounts( parentId, childIds );
    },

    unAssignToLoanAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.bankingProduct.unAssignToLoanAccounts( parentId, childIds );
    },

    
    paymentCards: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.bankingProduct.getPaymentCards(parentId);
    },

    assignToPaymentCards: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.bankingProduct.assignToPaymentCards( parentId, childIds );
    },

    unAssignToPaymentCards: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.bankingProduct.unAssignToPaymentCards( parentId, childIds );
    },

    },
Account: {

    bank: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.account.getBank( id );
    },

    assignBank: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.account.assignToBank( parentId, childId );
    },

    unassignBank: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.account.unassignFromBank( parentId, childId );
    },
    
    branch: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.account.getBranch( id );
    },

    assignBranch: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.account.assignToBranch( parentId, childId );
    },

    unassignBranch: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.account.unassignFromBranch( parentId, childId );
    },
    
    product: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.account.getProduct( id );
    },

    assignProduct: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.account.assignToProduct( parentId, childId );
    },

    unassignProduct: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.account.unassignFromProduct( parentId, childId );
    },
        
    owners: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.account.getOwners(parentId);
    },

    assignToOwners: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.account.assignToOwners( parentId, childIds );
    },

    unAssignToOwners: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.account.unAssignToOwners( parentId, childIds );
    },

    
    transactions: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.account.getTransactions(parentId);
    },

    assignToTransactions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.account.assignToTransactions( parentId, childIds );
    },

    unAssignToTransactions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.account.unAssignToTransactions( parentId, childIds );
    },

    
    statements: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.account.getStatements(parentId);
    },

    assignToStatements: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.account.assignToStatements( parentId, childIds );
    },

    unAssignToStatements: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.account.unAssignToStatements( parentId, childIds );
    },

    
    standingInstructions: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.account.getStandingInstructions(parentId);
    },

    assignToStandingInstructions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.account.assignToStandingInstructions( parentId, childIds );
    },

    unAssignToStandingInstructions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.account.unAssignToStandingInstructions( parentId, childIds );
    },

    
    feeCharges: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.account.getFeeCharges(parentId);
    },

    assignToFeeCharges: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.account.assignToFeeCharges( parentId, childIds );
    },

    unAssignToFeeCharges: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.account.unAssignToFeeCharges( parentId, childIds );
    },

    },
AccountStatement: {

    account: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.accountStatement.getAccount( id );
    },

    assignAccount: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.accountStatement.assignToAccount( parentId, childId );
    },

    unassignAccount: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.accountStatement.unassignFromAccount( parentId, childId );
    },
        },
Transaction: {

    account: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.transaction.getAccount( id );
    },

    assignAccount: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.transaction.assignToAccount( parentId, childId );
    },

    unassignAccount: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.transaction.unassignFromAccount( parentId, childId );
    },
    
    externalCounterparty: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.transaction.getExternalCounterparty( id );
    },

    assignExternalCounterparty: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.transaction.assignToExternalCounterparty( parentId, childId );
    },

    unassignExternalCounterparty: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.transaction.unassignFromExternalCounterparty( parentId, childId );
    },
    
    paymentCard: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.transaction.getPaymentCard( id );
    },

    assignPaymentCard: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.transaction.assignToPaymentCard( parentId, childId );
    },

    unassignPaymentCard: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.transaction.unassignFromPaymentCard( parentId, childId );
    },
    
    fundsTransfer: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.transaction.getFundsTransfer( id );
    },

    assignFundsTransfer: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.transaction.assignToFundsTransfer( parentId, childId );
    },

    unassignFundsTransfer: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.transaction.unassignFromFundsTransfer( parentId, childId );
    },
    
    fxTrade: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.transaction.getFxTrade( id );
    },

    assignFxTrade: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.transaction.assignToFxTrade( parentId, childId );
    },

    unassignFxTrade: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.transaction.unassignFromFxTrade( parentId, childId );
    },
    
    dispute: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.transaction.getDispute( id );
    },

    assignDispute: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.transaction.assignToDispute( parentId, childId );
    },

    unassignDispute: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.transaction.unassignFromDispute( parentId, childId );
    },
        },
ExternalAccount: {

    customer: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.externalAccount.getCustomer( id );
    },

    assignCustomer: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.externalAccount.assignToCustomer( parentId, childId );
    },

    unassignCustomer: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.externalAccount.unassignFromCustomer( parentId, childId );
    },
        
    transactions: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.externalAccount.getTransactions(parentId);
    },

    assignToTransactions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.externalAccount.assignToTransactions( parentId, childIds );
    },

    unAssignToTransactions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.externalAccount.unAssignToTransactions( parentId, childIds );
    },

    },
FundsTransfer: {

    sourceAccount: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.fundsTransfer.getSourceAccount( id );
    },

    assignSourceAccount: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.fundsTransfer.assignToSourceAccount( parentId, childId );
    },

    unassignSourceAccount: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.fundsTransfer.unassignFromSourceAccount( parentId, childId );
    },
    
    destinationAccount: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.fundsTransfer.getDestinationAccount( id );
    },

    assignDestinationAccount: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.fundsTransfer.assignToDestinationAccount( parentId, childId );
    },

    unassignDestinationAccount: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.fundsTransfer.unassignFromDestinationAccount( parentId, childId );
    },
    
    externalBeneficiary: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.fundsTransfer.getExternalBeneficiary( id );
    },

    assignExternalBeneficiary: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.fundsTransfer.assignToExternalBeneficiary( parentId, childId );
    },

    unassignExternalBeneficiary: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.fundsTransfer.unassignFromExternalBeneficiary( parentId, childId );
    },
    
    initiatedBy: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.fundsTransfer.getInitiatedBy( id );
    },

    assignInitiatedBy: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.fundsTransfer.assignToInitiatedBy( parentId, childId );
    },

    unassignInitiatedBy: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.fundsTransfer.unassignFromInitiatedBy( parentId, childId );
    },
        
    transactions: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.fundsTransfer.getTransactions(parentId);
    },

    assignToTransactions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.fundsTransfer.assignToTransactions( parentId, childIds );
    },

    unAssignToTransactions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.fundsTransfer.unAssignToTransactions( parentId, childIds );
    },

    },
StandingInstruction: {

    account: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.standingInstruction.getAccount( id );
    },

    assignAccount: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.standingInstruction.assignToAccount( parentId, childId );
    },

    unassignAccount: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.standingInstruction.unassignFromAccount( parentId, childId );
    },
    
    beneficiary: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.standingInstruction.getBeneficiary( id );
    },

    assignBeneficiary: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.standingInstruction.assignToBeneficiary( parentId, childId );
    },

    unassignBeneficiary: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.standingInstruction.unassignFromBeneficiary( parentId, childId );
    },
        },
PaymentCard: {

    bank: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.paymentCard.getBank( id );
    },

    assignBank: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.paymentCard.assignToBank( parentId, childId );
    },

    unassignBank: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.paymentCard.unassignFromBank( parentId, childId );
    },
    
    account: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.paymentCard.getAccount( id );
    },

    assignAccount: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.paymentCard.assignToAccount( parentId, childId );
    },

    unassignAccount: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.paymentCard.unassignFromAccount( parentId, childId );
    },
    
    customer: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.paymentCard.getCustomer( id );
    },

    assignCustomer: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.paymentCard.assignToCustomer( parentId, childId );
    },

    unassignCustomer: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.paymentCard.unassignFromCustomer( parentId, childId );
    },
        
    transactions: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.paymentCard.getTransactions(parentId);
    },

    assignToTransactions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.paymentCard.assignToTransactions( parentId, childIds );
    },

    unAssignToTransactions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.paymentCard.unAssignToTransactions( parentId, childIds );
    },

    },
LoanAccount: {

    bank: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.loanAccount.getBank( id );
    },

    assignBank: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.loanAccount.assignToBank( parentId, childId );
    },

    unassignBank: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.loanAccount.unassignFromBank( parentId, childId );
    },
    
    branch: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.loanAccount.getBranch( id );
    },

    assignBranch: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.loanAccount.assignToBranch( parentId, childId );
    },

    unassignBranch: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.loanAccount.unassignFromBranch( parentId, childId );
    },
    
    product: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.loanAccount.getProduct( id );
    },

    assignProduct: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.loanAccount.assignToProduct( parentId, childId );
    },

    unassignProduct: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.loanAccount.unassignFromProduct( parentId, childId );
    },
        
    borrowers: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.loanAccount.getBorrowers(parentId);
    },

    assignToBorrowers: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.loanAccount.assignToBorrowers( parentId, childIds );
    },

    unAssignToBorrowers: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.loanAccount.unAssignToBorrowers( parentId, childIds );
    },

    
    repaymentSchedule: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.loanAccount.getRepaymentSchedule(parentId);
    },

    assignToRepaymentSchedule: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.loanAccount.assignToRepaymentSchedule( parentId, childIds );
    },

    unAssignToRepaymentSchedule: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.loanAccount.unAssignToRepaymentSchedule( parentId, childIds );
    },

    
    payments: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.loanAccount.getPayments(parentId);
    },

    assignToPayments: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.loanAccount.assignToPayments( parentId, childIds );
    },

    unAssignToPayments: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.loanAccount.unAssignToPayments( parentId, childIds );
    },

    
    collateral: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.loanAccount.getCollateral(parentId);
    },

    assignToCollateral: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.loanAccount.assignToCollateral( parentId, childIds );
    },

    unAssignToCollateral: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.loanAccount.unAssignToCollateral( parentId, childIds );
    },

    
    feeCharges: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.loanAccount.getFeeCharges(parentId);
    },

    assignToFeeCharges: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.loanAccount.assignToFeeCharges( parentId, childIds );
    },

    unAssignToFeeCharges: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.loanAccount.unAssignToFeeCharges( parentId, childIds );
    },

    },
RepaymentSchedule: {

    loanAccount: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.repaymentSchedule.getLoanAccount( id );
    },

    assignLoanAccount: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.repaymentSchedule.assignToLoanAccount( parentId, childId );
    },

    unassignLoanAccount: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.repaymentSchedule.unassignFromLoanAccount( parentId, childId );
    },
    
    payment: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.repaymentSchedule.getPayment( id );
    },

    assignPayment: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.repaymentSchedule.assignToPayment( parentId, childId );
    },

    unassignPayment: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.repaymentSchedule.unassignFromPayment( parentId, childId );
    },
        },
LoanPayment: {

    loanAccount: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.loanPayment.getLoanAccount( id );
    },

    assignLoanAccount: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.loanPayment.assignToLoanAccount( parentId, childId );
    },

    unassignLoanAccount: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.loanPayment.unassignFromLoanAccount( parentId, childId );
    },
    
    transaction: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.loanPayment.getTransaction( id );
    },

    assignTransaction: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.loanPayment.assignToTransaction( parentId, childId );
    },

    unassignTransaction: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.loanPayment.unassignFromTransaction( parentId, childId );
    },
        },
Collateral: {

    loanAccount: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.collateral.getLoanAccount( id );
    },

    assignLoanAccount: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.collateral.assignToLoanAccount( parentId, childId );
    },

    unassignLoanAccount: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.collateral.unassignFromLoanAccount( parentId, childId );
    },
        },
FeeCharge: {

    account: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.feeCharge.getAccount( id );
    },

    assignAccount: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.feeCharge.assignToAccount( parentId, childId );
    },

    unassignAccount: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.feeCharge.unassignFromAccount( parentId, childId );
    },
    
    loanAccount: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.feeCharge.getLoanAccount( id );
    },

    assignLoanAccount: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.feeCharge.assignToLoanAccount( parentId, childId );
    },

    unassignLoanAccount: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.feeCharge.unassignFromLoanAccount( parentId, childId );
    },
        },
ExchangeRate: {

    bank: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.exchangeRate.getBank( id );
    },

    assignBank: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.exchangeRate.assignToBank( parentId, childId );
    },

    unassignBank: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.exchangeRate.unassignFromBank( parentId, childId );
    },
        
    fxTrades: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.exchangeRate.getFxTrades(parentId);
    },

    assignToFxTrades: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.exchangeRate.assignToFxTrades( parentId, childIds );
    },

    unAssignToFxTrades: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.exchangeRate.unAssignToFxTrades( parentId, childIds );
    },

    },
FXTrade: {

    customer: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.fXTrade.getCustomer( id );
    },

    assignCustomer: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.fXTrade.assignToCustomer( parentId, childId );
    },

    unassignCustomer: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.fXTrade.unassignFromCustomer( parentId, childId );
    },
    
    bank: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.fXTrade.getBank( id );
    },

    assignBank: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.fXTrade.assignToBank( parentId, childId );
    },

    unassignBank: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.fXTrade.unassignFromBank( parentId, childId );
    },
    
    exchangeRate: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.fXTrade.getExchangeRate( id );
    },

    assignExchangeRate: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.fXTrade.assignToExchangeRate( parentId, childId );
    },

    unassignExchangeRate: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.fXTrade.unassignFromExchangeRate( parentId, childId );
    },
    
    sourceAccount: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.fXTrade.getSourceAccount( id );
    },

    assignSourceAccount: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.fXTrade.assignToSourceAccount( parentId, childId );
    },

    unassignSourceAccount: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.fXTrade.unassignFromSourceAccount( parentId, childId );
    },
    
    destinationAccount: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.fXTrade.getDestinationAccount( id );
    },

    assignDestinationAccount: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.fXTrade.assignToDestinationAccount( parentId, childId );
    },

    unassignDestinationAccount: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.fXTrade.unassignFromDestinationAccount( parentId, childId );
    },
    
    transaction: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.fXTrade.getTransaction( id );
    },

    assignTransaction: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.fXTrade.assignToTransaction( parentId, childId );
    },

    unassignTransaction: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.fXTrade.unassignFromTransaction( parentId, childId );
    },
        },
Dispute: {

    transaction: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.dispute.getTransaction( id );
    },

    assignTransaction: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.dispute.assignToTransaction( parentId, childId );
    },

    unassignTransaction: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.dispute.unassignFromTransaction( parentId, childId );
    },
    
    customer: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.dispute.getCustomer( id );
    },

    assignCustomer: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.dispute.assignToCustomer( parentId, childId );
    },

    unassignCustomer: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.dispute.unassignFromCustomer( parentId, childId );
    },
    
    account: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.dispute.getAccount( id );
    },

    assignAccount: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.dispute.assignToAccount( parentId, childId );
    },

    unassignAccount: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.dispute.unassignFromAccount( parentId, childId );
    },
    
    paymentCard: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.dispute.getPaymentCard( id );
    },

    assignPaymentCard: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.dispute.assignToPaymentCard( parentId, childId );
    },

    unassignPaymentCard: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.dispute.unassignFromPaymentCard( parentId, childId );
    },
        },
Consent: {

    customer: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.consent.getCustomer( id );
    },

    assignCustomer: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.consent.assignToCustomer( parentId, childId );
    },

    unassignCustomer: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.consent.unassignFromCustomer( parentId, childId );
    },
    
    bank: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.consent.getBank( id );
    },

    assignBank: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.consent.assignToBank( parentId, childId );
    },

    unassignBank: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.consent.unassignFromBank( parentId, childId );
    },
    
    thirdPartyProvider: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.consent.getThirdPartyProvider( id );
    },

    assignThirdPartyProvider: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.consent.assignToThirdPartyProvider( parentId, childId );
    },

    unassignThirdPartyProvider: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.consent.unassignFromThirdPartyProvider( parentId, childId );
    },
        
    authorizedAccounts: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.consent.getAuthorizedAccounts(parentId);
    },

    assignToAuthorizedAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.consent.assignToAuthorizedAccounts( parentId, childIds );
    },

    unAssignToAuthorizedAccounts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.consent.unAssignToAuthorizedAccounts( parentId, childIds );
    },

    },
ThirdPartyProvider: {

    bank: async (
        _: ResolverParent,
        { id: string },
        { backend }: ResolverContext)
    {
            return await backend.thirdPartyProvider.getBank( id );
    },

    assignBank: async (
        _: ResolverParent,
        {parentId, childIds}: ParentChildIdentifiers,
        { backend }: ResolverContext)
    {
        return await backend.thirdPartyProvider.assignToBank( parentId, childId );
    },

    unassignBank: async (
            _: ResolverParent,
            {parentId, childId}: ParentChildIdentifiers,
            { backend }: ResolverContext)
    {
        return await backend.thirdPartyProvider.unassignFromBank( parentId, childId );
    },
        
    consents: async (
        _: ResolverParent,
        parentId: ParentIdentifier,
        { backend }: ResolverContext )
    {
        return await backend.thirdPartyProvider.getConsents(parentId);
    },

    assignToConsents: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.thirdPartyProvider.assignToConsents( parentId, childIds );
    },

    unAssignToConsents: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext )
    {
        return await backend.thirdPartyProvider.unAssignToConsents( parentId, childIds );
    },

    },
};

