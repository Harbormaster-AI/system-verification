const { paginateResults } = require('./utils');


interface ResolverContext {
backend: BackendAPI;
}

export interface PaginationOptions {
pageSize?: number;
after?: string | null;
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

    banks: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)) => {
    const all = await backend.bank.findAll();

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

    branchs: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)) => {
    const all = await backend.branch.findAll();

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

    aTMs: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)) => {
    const all = await backend.aTM.findAll();

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

    customers: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)) => {
    const all = await backend.customer.findAll();

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

    kycProfiles: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)) => {
    const all = await backend.kycProfile.findAll();

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

    identityDocuments: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)) => {
    const all = await backend.identityDocument.findAll();

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

    riskAssessments: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)) => {
    const all = await backend.riskAssessment.findAll();

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

    screeningResults: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)) => {
    const all = await backend.screeningResult.findAll();

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

    bankingProducts: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)) => {
    const all = await backend.bankingProduct.findAll();

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

    accounts: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)) => {
    const all = await backend.account.findAll();

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

    accountStatements: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)) => {
    const all = await backend.accountStatement.findAll();

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

    transactions: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)) => {
    const all = await backend.transaction.findAll();

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

    externalAccounts: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)) => {
    const all = await backend.externalAccount.findAll();

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

    fundsTransfers: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)) => {
    const all = await backend.fundsTransfer.findAll();

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

    standingInstructions: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)) => {
    const all = await backend.standingInstruction.findAll();

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

    paymentCards: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)) => {
    const all = await backend.paymentCard.findAll();

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

    loanAccounts: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)) => {
    const all = await backend.loanAccount.findAll();

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

    repaymentSchedules: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)) => {
    const all = await backend.repaymentSchedule.findAll();

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

    loanPayments: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)) => {
    const all = await backend.loanPayment.findAll();

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

    collaterals: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)) => {
    const all = await backend.collateral.findAll();

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

    feeCharges: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)) => {
    const all = await backend.feeCharge.findAll();

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

    exchangeRates: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)) => {
    const all = await backend.exchangeRate.findAll();

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

    fXTrades: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)) => {
    const all = await backend.fXTrade.findAll();

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

    disputes: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)) => {
    const all = await backend.dispute.findAll();

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

    consents: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)) => {
    const all = await backend.consent.findAll();

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

    thirdPartyProviders: async (_ : ResolverParent, { pageSize = 25, after }: PaginationOptions, { backend }: ResolverContext)) => {
    const all = await backend.thirdPartyProvider.findAll();

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
    addBank: async ( _: ResolverParent, args : Bank, { backend }: ResolverContext) => {
        return await backend.bank.add( args );
    },

    updateBank: async ( _: ResolverParent, args : Bank, { backend }: ResolverContext) => {
        return await backend.bank.update( args );
    },

    removeBank: async ( _: ResolverParent { id }, { backend }: ResolverContext) => {
        return await backend.bank.remove( { id } );
    },
        //////////////////////////
// Branch
//////////////////////////
    addBranch: async ( _: ResolverParent, args : Branch, { backend }: ResolverContext) => {
        return await backend.branch.add( args );
    },

    updateBranch: async ( _: ResolverParent, args : Branch, { backend }: ResolverContext) => {
        return await backend.branch.update( args );
    },

    removeBranch: async ( _: ResolverParent { id }, { backend }: ResolverContext) => {
        return await backend.branch.remove( { id } );
    },
        //////////////////////////
// ATM
//////////////////////////
    addATM: async ( _: ResolverParent, args : ATM, { backend }: ResolverContext) => {
        return await backend.aTM.add( args );
    },

    updateATM: async ( _: ResolverParent, args : ATM, { backend }: ResolverContext) => {
        return await backend.aTM.update( args );
    },

    removeATM: async ( _: ResolverParent { id }, { backend }: ResolverContext) => {
        return await backend.aTM.remove( { id } );
    },
        //////////////////////////
// Customer
//////////////////////////
    addCustomer: async ( _: ResolverParent, args : Customer, { backend }: ResolverContext) => {
        return await backend.customer.add( args );
    },

    updateCustomer: async ( _: ResolverParent, args : Customer, { backend }: ResolverContext) => {
        return await backend.customer.update( args );
    },

    removeCustomer: async ( _: ResolverParent { id }, { backend }: ResolverContext) => {
        return await backend.customer.remove( { id } );
    },
        //////////////////////////
// KycProfile
//////////////////////////
    addKycProfile: async ( _: ResolverParent, args : KycProfile, { backend }: ResolverContext) => {
        return await backend.kycProfile.add( args );
    },

    updateKycProfile: async ( _: ResolverParent, args : KycProfile, { backend }: ResolverContext) => {
        return await backend.kycProfile.update( args );
    },

    removeKycProfile: async ( _: ResolverParent { id }, { backend }: ResolverContext) => {
        return await backend.kycProfile.remove( { id } );
    },
        //////////////////////////
// IdentityDocument
//////////////////////////
    addIdentityDocument: async ( _: ResolverParent, args : IdentityDocument, { backend }: ResolverContext) => {
        return await backend.identityDocument.add( args );
    },

    updateIdentityDocument: async ( _: ResolverParent, args : IdentityDocument, { backend }: ResolverContext) => {
        return await backend.identityDocument.update( args );
    },

    removeIdentityDocument: async ( _: ResolverParent { id }, { backend }: ResolverContext) => {
        return await backend.identityDocument.remove( { id } );
    },
        //////////////////////////
// RiskAssessment
//////////////////////////
    addRiskAssessment: async ( _: ResolverParent, args : RiskAssessment, { backend }: ResolverContext) => {
        return await backend.riskAssessment.add( args );
    },

    updateRiskAssessment: async ( _: ResolverParent, args : RiskAssessment, { backend }: ResolverContext) => {
        return await backend.riskAssessment.update( args );
    },

    removeRiskAssessment: async ( _: ResolverParent { id }, { backend }: ResolverContext) => {
        return await backend.riskAssessment.remove( { id } );
    },
        //////////////////////////
// ScreeningResult
//////////////////////////
    addScreeningResult: async ( _: ResolverParent, args : ScreeningResult, { backend }: ResolverContext) => {
        return await backend.screeningResult.add( args );
    },

    updateScreeningResult: async ( _: ResolverParent, args : ScreeningResult, { backend }: ResolverContext) => {
        return await backend.screeningResult.update( args );
    },

    removeScreeningResult: async ( _: ResolverParent { id }, { backend }: ResolverContext) => {
        return await backend.screeningResult.remove( { id } );
    },
        //////////////////////////
// BankingProduct
//////////////////////////
    addBankingProduct: async ( _: ResolverParent, args : BankingProduct, { backend }: ResolverContext) => {
        return await backend.bankingProduct.add( args );
    },

    updateBankingProduct: async ( _: ResolverParent, args : BankingProduct, { backend }: ResolverContext) => {
        return await backend.bankingProduct.update( args );
    },

    removeBankingProduct: async ( _: ResolverParent { id }, { backend }: ResolverContext) => {
        return await backend.bankingProduct.remove( { id } );
    },
        //////////////////////////
// Account
//////////////////////////
    addAccount: async ( _: ResolverParent, args : Account, { backend }: ResolverContext) => {
        return await backend.account.add( args );
    },

    updateAccount: async ( _: ResolverParent, args : Account, { backend }: ResolverContext) => {
        return await backend.account.update( args );
    },

    removeAccount: async ( _: ResolverParent { id }, { backend }: ResolverContext) => {
        return await backend.account.remove( { id } );
    },
        //////////////////////////
// AccountStatement
//////////////////////////
    addAccountStatement: async ( _: ResolverParent, args : AccountStatement, { backend }: ResolverContext) => {
        return await backend.accountStatement.add( args );
    },

    updateAccountStatement: async ( _: ResolverParent, args : AccountStatement, { backend }: ResolverContext) => {
        return await backend.accountStatement.update( args );
    },

    removeAccountStatement: async ( _: ResolverParent { id }, { backend }: ResolverContext) => {
        return await backend.accountStatement.remove( { id } );
    },
        //////////////////////////
// Transaction
//////////////////////////
    addTransaction: async ( _: ResolverParent, args : Transaction, { backend }: ResolverContext) => {
        return await backend.transaction.add( args );
    },

    updateTransaction: async ( _: ResolverParent, args : Transaction, { backend }: ResolverContext) => {
        return await backend.transaction.update( args );
    },

    removeTransaction: async ( _: ResolverParent { id }, { backend }: ResolverContext) => {
        return await backend.transaction.remove( { id } );
    },
        //////////////////////////
// ExternalAccount
//////////////////////////
    addExternalAccount: async ( _: ResolverParent, args : ExternalAccount, { backend }: ResolverContext) => {
        return await backend.externalAccount.add( args );
    },

    updateExternalAccount: async ( _: ResolverParent, args : ExternalAccount, { backend }: ResolverContext) => {
        return await backend.externalAccount.update( args );
    },

    removeExternalAccount: async ( _: ResolverParent { id }, { backend }: ResolverContext) => {
        return await backend.externalAccount.remove( { id } );
    },
        //////////////////////////
// FundsTransfer
//////////////////////////
    addFundsTransfer: async ( _: ResolverParent, args : FundsTransfer, { backend }: ResolverContext) => {
        return await backend.fundsTransfer.add( args );
    },

    updateFundsTransfer: async ( _: ResolverParent, args : FundsTransfer, { backend }: ResolverContext) => {
        return await backend.fundsTransfer.update( args );
    },

    removeFundsTransfer: async ( _: ResolverParent { id }, { backend }: ResolverContext) => {
        return await backend.fundsTransfer.remove( { id } );
    },
        //////////////////////////
// StandingInstruction
//////////////////////////
    addStandingInstruction: async ( _: ResolverParent, args : StandingInstruction, { backend }: ResolverContext) => {
        return await backend.standingInstruction.add( args );
    },

    updateStandingInstruction: async ( _: ResolverParent, args : StandingInstruction, { backend }: ResolverContext) => {
        return await backend.standingInstruction.update( args );
    },

    removeStandingInstruction: async ( _: ResolverParent { id }, { backend }: ResolverContext) => {
        return await backend.standingInstruction.remove( { id } );
    },
        //////////////////////////
// PaymentCard
//////////////////////////
    addPaymentCard: async ( _: ResolverParent, args : PaymentCard, { backend }: ResolverContext) => {
        return await backend.paymentCard.add( args );
    },

    updatePaymentCard: async ( _: ResolverParent, args : PaymentCard, { backend }: ResolverContext) => {
        return await backend.paymentCard.update( args );
    },

    removePaymentCard: async ( _: ResolverParent { id }, { backend }: ResolverContext) => {
        return await backend.paymentCard.remove( { id } );
    },
        //////////////////////////
// LoanAccount
//////////////////////////
    addLoanAccount: async ( _: ResolverParent, args : LoanAccount, { backend }: ResolverContext) => {
        return await backend.loanAccount.add( args );
    },

    updateLoanAccount: async ( _: ResolverParent, args : LoanAccount, { backend }: ResolverContext) => {
        return await backend.loanAccount.update( args );
    },

    removeLoanAccount: async ( _: ResolverParent { id }, { backend }: ResolverContext) => {
        return await backend.loanAccount.remove( { id } );
    },
        //////////////////////////
// RepaymentSchedule
//////////////////////////
    addRepaymentSchedule: async ( _: ResolverParent, args : RepaymentSchedule, { backend }: ResolverContext) => {
        return await backend.repaymentSchedule.add( args );
    },

    updateRepaymentSchedule: async ( _: ResolverParent, args : RepaymentSchedule, { backend }: ResolverContext) => {
        return await backend.repaymentSchedule.update( args );
    },

    removeRepaymentSchedule: async ( _: ResolverParent { id }, { backend }: ResolverContext) => {
        return await backend.repaymentSchedule.remove( { id } );
    },
        //////////////////////////
// LoanPayment
//////////////////////////
    addLoanPayment: async ( _: ResolverParent, args : LoanPayment, { backend }: ResolverContext) => {
        return await backend.loanPayment.add( args );
    },

    updateLoanPayment: async ( _: ResolverParent, args : LoanPayment, { backend }: ResolverContext) => {
        return await backend.loanPayment.update( args );
    },

    removeLoanPayment: async ( _: ResolverParent { id }, { backend }: ResolverContext) => {
        return await backend.loanPayment.remove( { id } );
    },
        //////////////////////////
// Collateral
//////////////////////////
    addCollateral: async ( _: ResolverParent, args : Collateral, { backend }: ResolverContext) => {
        return await backend.collateral.add( args );
    },

    updateCollateral: async ( _: ResolverParent, args : Collateral, { backend }: ResolverContext) => {
        return await backend.collateral.update( args );
    },

    removeCollateral: async ( _: ResolverParent { id }, { backend }: ResolverContext) => {
        return await backend.collateral.remove( { id } );
    },
        //////////////////////////
// FeeCharge
//////////////////////////
    addFeeCharge: async ( _: ResolverParent, args : FeeCharge, { backend }: ResolverContext) => {
        return await backend.feeCharge.add( args );
    },

    updateFeeCharge: async ( _: ResolverParent, args : FeeCharge, { backend }: ResolverContext) => {
        return await backend.feeCharge.update( args );
    },

    removeFeeCharge: async ( _: ResolverParent { id }, { backend }: ResolverContext) => {
        return await backend.feeCharge.remove( { id } );
    },
        //////////////////////////
// ExchangeRate
//////////////////////////
    addExchangeRate: async ( _: ResolverParent, args : ExchangeRate, { backend }: ResolverContext) => {
        return await backend.exchangeRate.add( args );
    },

    updateExchangeRate: async ( _: ResolverParent, args : ExchangeRate, { backend }: ResolverContext) => {
        return await backend.exchangeRate.update( args );
    },

    removeExchangeRate: async ( _: ResolverParent { id }, { backend }: ResolverContext) => {
        return await backend.exchangeRate.remove( { id } );
    },
        //////////////////////////
// FXTrade
//////////////////////////
    addFXTrade: async ( _: ResolverParent, args : FXTrade, { backend }: ResolverContext) => {
        return await backend.fXTrade.add( args );
    },

    updateFXTrade: async ( _: ResolverParent, args : FXTrade, { backend }: ResolverContext) => {
        return await backend.fXTrade.update( args );
    },

    removeFXTrade: async ( _: ResolverParent { id }, { backend }: ResolverContext) => {
        return await backend.fXTrade.remove( { id } );
    },
        //////////////////////////
// Dispute
//////////////////////////
    addDispute: async ( _: ResolverParent, args : Dispute, { backend }: ResolverContext) => {
        return await backend.dispute.add( args );
    },

    updateDispute: async ( _: ResolverParent, args : Dispute, { backend }: ResolverContext) => {
        return await backend.dispute.update( args );
    },

    removeDispute: async ( _: ResolverParent { id }, { backend }: ResolverContext) => {
        return await backend.dispute.remove( { id } );
    },
        //////////////////////////
// Consent
//////////////////////////
    addConsent: async ( _: ResolverParent, args : Consent, { backend }: ResolverContext) => {
        return await backend.consent.add( args );
    },

    updateConsent: async ( _: ResolverParent, args : Consent, { backend }: ResolverContext) => {
        return await backend.consent.update( args );
    },

    removeConsent: async ( _: ResolverParent { id }, { backend }: ResolverContext) => {
        return await backend.consent.remove( { id } );
    },
        //////////////////////////
// ThirdPartyProvider
//////////////////////////
    addThirdPartyProvider: async ( _: ResolverParent, args : ThirdPartyProvider, { backend }: ResolverContext) => {
        return await backend.thirdPartyProvider.add( args );
    },

    updateThirdPartyProvider: async ( _: ResolverParent, args : ThirdPartyProvider, { backend }: ResolverContext) => {
        return await backend.thirdPartyProvider.update( args );
    },

    removeThirdPartyProvider: async ( _: ResolverParent { id }, { backend }: ResolverContext) => {
        return await backend.thirdPartyProvider.remove( { id } );
    },
        },

Bank: {
        
    branches: async (bank, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.getBranches( bank.id ).then(branches => {
                resolve(branches);
            })
        })
    },

    addToBranches: async (bank, args: Bank, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.addToBranches( bank.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToBranches: async (bank, { branchesIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.assignToBranches( bank.id, branchesIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    products: async (bank, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.getProducts( bank.id ).then(products => {
                resolve(products);
            })
        })
    },

    addToProducts: async (bank, args: Bank, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.addToProducts( bank.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToProducts: async (bank, { productsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.assignToProducts( bank.id, productsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    customers: async (bank, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.getCustomers( bank.id ).then(customers => {
                resolve(customers);
            })
        })
    },

    addToCustomers: async (bank, args: Bank, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.addToCustomers( bank.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToCustomers: async (bank, { customersIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.assignToCustomers( bank.id, customersIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    accounts: async (bank, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.getAccounts( bank.id ).then(accounts => {
                resolve(accounts);
            })
        })
    },

    addToAccounts: async (bank, args: Bank, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.addToAccounts( bank.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToAccounts: async (bank, { accountsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.assignToAccounts( bank.id, accountsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    paymentCards: async (bank, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.getPaymentCards( bank.id ).then(paymentCards => {
                resolve(paymentCards);
            })
        })
    },

    addToPaymentCards: async (bank, args: Bank, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.addToPaymentCards( bank.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToPaymentCards: async (bank, { paymentCardsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.assignToPaymentCards( bank.id, paymentCardsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    loanAccounts: async (bank, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.getLoanAccounts( bank.id ).then(loanAccounts => {
                resolve(loanAccounts);
            })
        })
    },

    addToLoanAccounts: async (bank, args: Bank, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.addToLoanAccounts( bank.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToLoanAccounts: async (bank, { loanAccountsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.assignToLoanAccounts( bank.id, loanAccountsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    exchangeRates: async (bank, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.getExchangeRates( bank.id ).then(exchangeRates => {
                resolve(exchangeRates);
            })
        })
    },

    addToExchangeRates: async (bank, args: Bank, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.addToExchangeRates( bank.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToExchangeRates: async (bank, { exchangeRatesIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.assignToExchangeRates( bank.id, exchangeRatesIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    consents: async (bank, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.getConsents( bank.id ).then(consents => {
                resolve(consents);
            })
        })
    },

    addToConsents: async (bank, args: Bank, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.addToConsents( bank.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToConsents: async (bank, { consentsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.assignToConsents( bank.id, consentsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    thirdPartyProviders: async (bank, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.getThirdPartyProviders( bank.id ).then(thirdPartyProviders => {
                resolve(thirdPartyProviders);
            })
        })
    },

    addToThirdPartyProviders: async (bank, args: Bank, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.addToThirdPartyProviders( bank.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToThirdPartyProviders: async (bank, { thirdPartyProvidersIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bank.assignToThirdPartyProviders( bank.id, thirdPartyProvidersIds ).then( result => {
                resolve ( result );
            })
        })
    },

    },
Branch: {
    
    bank: async (branch, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.branch.getBank( branch.id ).then(bank => {
                resolve(bank);
            })
        })
    },

    assignBank: async (branch, { bankId }, { backend }: ResolverContext) => {
        return await backend.branch.assignToBank( branch.id, bankId );
    },

    unassignBank: async ( _: ResolverParent { branchId }, { backend }: ResolverContext) => {
        return await backend.branch.unassignFromBank( branchId );
    },
        
    accounts: async (branch, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.branch.getAccounts( branch.id ).then(accounts => {
                resolve(accounts);
            })
        })
    },

    addToAccounts: async (branch, args: Branch, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.branch.addToAccounts( branch.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToAccounts: async (branch, { accountsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.branch.assignToAccounts( branch.id, accountsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    loanAccounts: async (branch, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.branch.getLoanAccounts( branch.id ).then(loanAccounts => {
                resolve(loanAccounts);
            })
        })
    },

    addToLoanAccounts: async (branch, args: Branch, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.branch.addToLoanAccounts( branch.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToLoanAccounts: async (branch, { loanAccountsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.branch.assignToLoanAccounts( branch.id, loanAccountsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    atms: async (branch, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.branch.getAtms( branch.id ).then(atms => {
                resolve(atms);
            })
        })
    },

    addToAtms: async (branch, args: Branch, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.branch.addToAtms( branch.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToAtms: async (branch, { atmsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.branch.assignToAtms( branch.id, atmsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    },
ATM: {
    
    branch: async (aTM, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.aTM.getBranch( aTM.id ).then(branch => {
                resolve(branch);
            })
        })
    },

    assignBranch: async (aTM, { branchId }, { backend }: ResolverContext) => {
        return await backend.aTM.assignToBranch( aTM.id, branchId );
    },

    unassignBranch: async ( _: ResolverParent { aTMId }, { backend }: ResolverContext) => {
        return await backend.aTM.unassignFromBranch( aTMId );
    },
        },
Customer: {
    
    bank: async (customer, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.customer.getBank( customer.id ).then(bank => {
                resolve(bank);
            })
        })
    },

    assignBank: async (customer, { bankId }, { backend }: ResolverContext) => {
        return await backend.customer.assignToBank( customer.id, bankId );
    },

    unassignBank: async ( _: ResolverParent { customerId }, { backend }: ResolverContext) => {
        return await backend.customer.unassignFromBank( customerId );
    },
        
    accounts: async (customer, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.customer.getAccounts( customer.id ).then(accounts => {
                resolve(accounts);
            })
        })
    },

    addToAccounts: async (customer, args: Customer, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.customer.addToAccounts( customer.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToAccounts: async (customer, { accountsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.customer.assignToAccounts( customer.id, accountsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    loanAccounts: async (customer, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.customer.getLoanAccounts( customer.id ).then(loanAccounts => {
                resolve(loanAccounts);
            })
        })
    },

    addToLoanAccounts: async (customer, args: Customer, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.customer.addToLoanAccounts( customer.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToLoanAccounts: async (customer, { loanAccountsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.customer.assignToLoanAccounts( customer.id, loanAccountsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    paymentCards: async (customer, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.customer.getPaymentCards( customer.id ).then(paymentCards => {
                resolve(paymentCards);
            })
        })
    },

    addToPaymentCards: async (customer, args: Customer, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.customer.addToPaymentCards( customer.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToPaymentCards: async (customer, { paymentCardsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.customer.assignToPaymentCards( customer.id, paymentCardsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    externalAccounts: async (customer, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.customer.getExternalAccounts( customer.id ).then(externalAccounts => {
                resolve(externalAccounts);
            })
        })
    },

    addToExternalAccounts: async (customer, args: Customer, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.customer.addToExternalAccounts( customer.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToExternalAccounts: async (customer, { externalAccountsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.customer.assignToExternalAccounts( customer.id, externalAccountsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    fundsTransfers: async (customer, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.customer.getFundsTransfers( customer.id ).then(fundsTransfers => {
                resolve(fundsTransfers);
            })
        })
    },

    addToFundsTransfers: async (customer, args: Customer, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.customer.addToFundsTransfers( customer.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToFundsTransfers: async (customer, { fundsTransfersIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.customer.assignToFundsTransfers( customer.id, fundsTransfersIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    disputes: async (customer, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.customer.getDisputes( customer.id ).then(disputes => {
                resolve(disputes);
            })
        })
    },

    addToDisputes: async (customer, args: Customer, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.customer.addToDisputes( customer.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToDisputes: async (customer, { disputesIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.customer.assignToDisputes( customer.id, disputesIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    kycProfiles: async (customer, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.customer.getKycProfiles( customer.id ).then(kycProfiles => {
                resolve(kycProfiles);
            })
        })
    },

    addToKycProfiles: async (customer, args: Customer, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.customer.addToKycProfiles( customer.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToKycProfiles: async (customer, { kycProfilesIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.customer.assignToKycProfiles( customer.id, kycProfilesIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    consents: async (customer, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.customer.getConsents( customer.id ).then(consents => {
                resolve(consents);
            })
        })
    },

    addToConsents: async (customer, args: Customer, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.customer.addToConsents( customer.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToConsents: async (customer, { consentsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.customer.assignToConsents( customer.id, consentsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    },
KycProfile: {
    
    customer: async (kycProfile, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.kycProfile.getCustomer( kycProfile.id ).then(customer => {
                resolve(customer);
            })
        })
    },

    assignCustomer: async (kycProfile, { customerId }, { backend }: ResolverContext) => {
        return await backend.kycProfile.assignToCustomer( kycProfile.id, customerId );
    },

    unassignCustomer: async ( _: ResolverParent { kycProfileId }, { backend }: ResolverContext) => {
        return await backend.kycProfile.unassignFromCustomer( kycProfileId );
    },
        
    identityDocuments: async (kycProfile, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.kycProfile.getIdentityDocuments( kycProfile.id ).then(identityDocuments => {
                resolve(identityDocuments);
            })
        })
    },

    addToIdentityDocuments: async (kycProfile, args: KycProfile, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.kycProfile.addToIdentityDocuments( kycProfile.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToIdentityDocuments: async (kycProfile, { identityDocumentsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.kycProfile.assignToIdentityDocuments( kycProfile.id, identityDocumentsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    riskAssessments: async (kycProfile, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.kycProfile.getRiskAssessments( kycProfile.id ).then(riskAssessments => {
                resolve(riskAssessments);
            })
        })
    },

    addToRiskAssessments: async (kycProfile, args: KycProfile, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.kycProfile.addToRiskAssessments( kycProfile.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToRiskAssessments: async (kycProfile, { riskAssessmentsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.kycProfile.assignToRiskAssessments( kycProfile.id, riskAssessmentsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    screenings: async (kycProfile, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.kycProfile.getScreenings( kycProfile.id ).then(screenings => {
                resolve(screenings);
            })
        })
    },

    addToScreenings: async (kycProfile, args: KycProfile, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.kycProfile.addToScreenings( kycProfile.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToScreenings: async (kycProfile, { screeningsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.kycProfile.assignToScreenings( kycProfile.id, screeningsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    },
IdentityDocument: {
    
    kycProfile: async (identityDocument, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.identityDocument.getKycProfile( identityDocument.id ).then(kycProfile => {
                resolve(kycProfile);
            })
        })
    },

    assignKycProfile: async (identityDocument, { kycProfileId }, { backend }: ResolverContext) => {
        return await backend.identityDocument.assignToKycProfile( identityDocument.id, kycProfileId );
    },

    unassignKycProfile: async ( _: ResolverParent { identityDocumentId }, { backend }: ResolverContext) => {
        return await backend.identityDocument.unassignFromKycProfile( identityDocumentId );
    },
        },
RiskAssessment: {
    
    kycProfile: async (riskAssessment, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.riskAssessment.getKycProfile( riskAssessment.id ).then(kycProfile => {
                resolve(kycProfile);
            })
        })
    },

    assignKycProfile: async (riskAssessment, { kycProfileId }, { backend }: ResolverContext) => {
        return await backend.riskAssessment.assignToKycProfile( riskAssessment.id, kycProfileId );
    },

    unassignKycProfile: async ( _: ResolverParent { riskAssessmentId }, { backend }: ResolverContext) => {
        return await backend.riskAssessment.unassignFromKycProfile( riskAssessmentId );
    },
        },
ScreeningResult: {
    
    kycProfile: async (screeningResult, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.screeningResult.getKycProfile( screeningResult.id ).then(kycProfile => {
                resolve(kycProfile);
            })
        })
    },

    assignKycProfile: async (screeningResult, { kycProfileId }, { backend }: ResolverContext) => {
        return await backend.screeningResult.assignToKycProfile( screeningResult.id, kycProfileId );
    },

    unassignKycProfile: async ( _: ResolverParent { screeningResultId }, { backend }: ResolverContext) => {
        return await backend.screeningResult.unassignFromKycProfile( screeningResultId );
    },
        },
BankingProduct: {
    
    bank: async (bankingProduct, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bankingProduct.getBank( bankingProduct.id ).then(bank => {
                resolve(bank);
            })
        })
    },

    assignBank: async (bankingProduct, { bankId }, { backend }: ResolverContext) => {
        return await backend.bankingProduct.assignToBank( bankingProduct.id, bankId );
    },

    unassignBank: async ( _: ResolverParent { bankingProductId }, { backend }: ResolverContext) => {
        return await backend.bankingProduct.unassignFromBank( bankingProductId );
    },
        
    accounts: async (bankingProduct, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bankingProduct.getAccounts( bankingProduct.id ).then(accounts => {
                resolve(accounts);
            })
        })
    },

    addToAccounts: async (bankingProduct, args: BankingProduct, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bankingProduct.addToAccounts( bankingProduct.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToAccounts: async (bankingProduct, { accountsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bankingProduct.assignToAccounts( bankingProduct.id, accountsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    loanAccounts: async (bankingProduct, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bankingProduct.getLoanAccounts( bankingProduct.id ).then(loanAccounts => {
                resolve(loanAccounts);
            })
        })
    },

    addToLoanAccounts: async (bankingProduct, args: BankingProduct, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bankingProduct.addToLoanAccounts( bankingProduct.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToLoanAccounts: async (bankingProduct, { loanAccountsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bankingProduct.assignToLoanAccounts( bankingProduct.id, loanAccountsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    paymentCards: async (bankingProduct, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bankingProduct.getPaymentCards( bankingProduct.id ).then(paymentCards => {
                resolve(paymentCards);
            })
        })
    },

    addToPaymentCards: async (bankingProduct, args: BankingProduct, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bankingProduct.addToPaymentCards( bankingProduct.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToPaymentCards: async (bankingProduct, { paymentCardsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.bankingProduct.assignToPaymentCards( bankingProduct.id, paymentCardsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    },
Account: {
    
    bank: async (account, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.account.getBank( account.id ).then(bank => {
                resolve(bank);
            })
        })
    },

    assignBank: async (account, { bankId }, { backend }: ResolverContext) => {
        return await backend.account.assignToBank( account.id, bankId );
    },

    unassignBank: async ( _: ResolverParent { accountId }, { backend }: ResolverContext) => {
        return await backend.account.unassignFromBank( accountId );
    },
    
    branch: async (account, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.account.getBranch( account.id ).then(branch => {
                resolve(branch);
            })
        })
    },

    assignBranch: async (account, { branchId }, { backend }: ResolverContext) => {
        return await backend.account.assignToBranch( account.id, branchId );
    },

    unassignBranch: async ( _: ResolverParent { accountId }, { backend }: ResolverContext) => {
        return await backend.account.unassignFromBranch( accountId );
    },
    
    product: async (account, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.account.getProduct( account.id ).then(bankingProduct => {
                resolve(bankingProduct);
            })
        })
    },

    assignProduct: async (account, { productId }, { backend }: ResolverContext) => {
        return await backend.account.assignToProduct( account.id, productId );
    },

    unassignProduct: async ( _: ResolverParent { accountId }, { backend }: ResolverContext) => {
        return await backend.account.unassignFromProduct( accountId );
    },
        
    owners: async (account, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.account.getOwners( account.id ).then(owners => {
                resolve(owners);
            })
        })
    },

    addToOwners: async (account, args: Account, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.account.addToOwners( account.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToOwners: async (account, { ownersIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.account.assignToOwners( account.id, ownersIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    transactions: async (account, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.account.getTransactions( account.id ).then(transactions => {
                resolve(transactions);
            })
        })
    },

    addToTransactions: async (account, args: Account, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.account.addToTransactions( account.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToTransactions: async (account, { transactionsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.account.assignToTransactions( account.id, transactionsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    statements: async (account, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.account.getStatements( account.id ).then(statements => {
                resolve(statements);
            })
        })
    },

    addToStatements: async (account, args: Account, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.account.addToStatements( account.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToStatements: async (account, { statementsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.account.assignToStatements( account.id, statementsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    standingInstructions: async (account, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.account.getStandingInstructions( account.id ).then(standingInstructions => {
                resolve(standingInstructions);
            })
        })
    },

    addToStandingInstructions: async (account, args: Account, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.account.addToStandingInstructions( account.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToStandingInstructions: async (account, { standingInstructionsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.account.assignToStandingInstructions( account.id, standingInstructionsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    feeCharges: async (account, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.account.getFeeCharges( account.id ).then(feeCharges => {
                resolve(feeCharges);
            })
        })
    },

    addToFeeCharges: async (account, args: Account, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.account.addToFeeCharges( account.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToFeeCharges: async (account, { feeChargesIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.account.assignToFeeCharges( account.id, feeChargesIds ).then( result => {
                resolve ( result );
            })
        })
    },

    },
AccountStatement: {
    
    account: async (accountStatement, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.accountStatement.getAccount( accountStatement.id ).then(account => {
                resolve(account);
            })
        })
    },

    assignAccount: async (accountStatement, { accountId }, { backend }: ResolverContext) => {
        return await backend.accountStatement.assignToAccount( accountStatement.id, accountId );
    },

    unassignAccount: async ( _: ResolverParent { accountStatementId }, { backend }: ResolverContext) => {
        return await backend.accountStatement.unassignFromAccount( accountStatementId );
    },
        },
Transaction: {
    
    account: async (transaction, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.transaction.getAccount( transaction.id ).then(account => {
                resolve(account);
            })
        })
    },

    assignAccount: async (transaction, { accountId }, { backend }: ResolverContext) => {
        return await backend.transaction.assignToAccount( transaction.id, accountId );
    },

    unassignAccount: async ( _: ResolverParent { transactionId }, { backend }: ResolverContext) => {
        return await backend.transaction.unassignFromAccount( transactionId );
    },
    
    externalCounterparty: async (transaction, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.transaction.getExternalCounterparty( transaction.id ).then(externalAccount => {
                resolve(externalAccount);
            })
        })
    },

    assignExternalCounterparty: async (transaction, { externalCounterpartyId }, { backend }: ResolverContext) => {
        return await backend.transaction.assignToExternalCounterparty( transaction.id, externalCounterpartyId );
    },

    unassignExternalCounterparty: async ( _: ResolverParent { transactionId }, { backend }: ResolverContext) => {
        return await backend.transaction.unassignFromExternalCounterparty( transactionId );
    },
    
    paymentCard: async (transaction, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.transaction.getPaymentCard( transaction.id ).then(paymentCard => {
                resolve(paymentCard);
            })
        })
    },

    assignPaymentCard: async (transaction, { paymentCardId }, { backend }: ResolverContext) => {
        return await backend.transaction.assignToPaymentCard( transaction.id, paymentCardId );
    },

    unassignPaymentCard: async ( _: ResolverParent { transactionId }, { backend }: ResolverContext) => {
        return await backend.transaction.unassignFromPaymentCard( transactionId );
    },
    
    fundsTransfer: async (transaction, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.transaction.getFundsTransfer( transaction.id ).then(fundsTransfer => {
                resolve(fundsTransfer);
            })
        })
    },

    assignFundsTransfer: async (transaction, { fundsTransferId }, { backend }: ResolverContext) => {
        return await backend.transaction.assignToFundsTransfer( transaction.id, fundsTransferId );
    },

    unassignFundsTransfer: async ( _: ResolverParent { transactionId }, { backend }: ResolverContext) => {
        return await backend.transaction.unassignFromFundsTransfer( transactionId );
    },
    
    fxTrade: async (transaction, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.transaction.getFxTrade( transaction.id ).then(fXTrade => {
                resolve(fXTrade);
            })
        })
    },

    assignFxTrade: async (transaction, { fxTradeId }, { backend }: ResolverContext) => {
        return await backend.transaction.assignToFxTrade( transaction.id, fxTradeId );
    },

    unassignFxTrade: async ( _: ResolverParent { transactionId }, { backend }: ResolverContext) => {
        return await backend.transaction.unassignFromFxTrade( transactionId );
    },
    
    dispute: async (transaction, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.transaction.getDispute( transaction.id ).then(dispute => {
                resolve(dispute);
            })
        })
    },

    assignDispute: async (transaction, { disputeId }, { backend }: ResolverContext) => {
        return await backend.transaction.assignToDispute( transaction.id, disputeId );
    },

    unassignDispute: async ( _: ResolverParent { transactionId }, { backend }: ResolverContext) => {
        return await backend.transaction.unassignFromDispute( transactionId );
    },
        },
ExternalAccount: {
    
    customer: async (externalAccount, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.externalAccount.getCustomer( externalAccount.id ).then(customer => {
                resolve(customer);
            })
        })
    },

    assignCustomer: async (externalAccount, { customerId }, { backend }: ResolverContext) => {
        return await backend.externalAccount.assignToCustomer( externalAccount.id, customerId );
    },

    unassignCustomer: async ( _: ResolverParent { externalAccountId }, { backend }: ResolverContext) => {
        return await backend.externalAccount.unassignFromCustomer( externalAccountId );
    },
        
    transactions: async (externalAccount, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.externalAccount.getTransactions( externalAccount.id ).then(transactions => {
                resolve(transactions);
            })
        })
    },

    addToTransactions: async (externalAccount, args: ExternalAccount, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.externalAccount.addToTransactions( externalAccount.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToTransactions: async (externalAccount, { transactionsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.externalAccount.assignToTransactions( externalAccount.id, transactionsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    },
FundsTransfer: {
    
    sourceAccount: async (fundsTransfer, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.fundsTransfer.getSourceAccount( fundsTransfer.id ).then(account => {
                resolve(account);
            })
        })
    },

    assignSourceAccount: async (fundsTransfer, { sourceAccountId }, { backend }: ResolverContext) => {
        return await backend.fundsTransfer.assignToSourceAccount( fundsTransfer.id, sourceAccountId );
    },

    unassignSourceAccount: async ( _: ResolverParent { fundsTransferId }, { backend }: ResolverContext) => {
        return await backend.fundsTransfer.unassignFromSourceAccount( fundsTransferId );
    },
    
    destinationAccount: async (fundsTransfer, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.fundsTransfer.getDestinationAccount( fundsTransfer.id ).then(account => {
                resolve(account);
            })
        })
    },

    assignDestinationAccount: async (fundsTransfer, { destinationAccountId }, { backend }: ResolverContext) => {
        return await backend.fundsTransfer.assignToDestinationAccount( fundsTransfer.id, destinationAccountId );
    },

    unassignDestinationAccount: async ( _: ResolverParent { fundsTransferId }, { backend }: ResolverContext) => {
        return await backend.fundsTransfer.unassignFromDestinationAccount( fundsTransferId );
    },
    
    externalBeneficiary: async (fundsTransfer, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.fundsTransfer.getExternalBeneficiary( fundsTransfer.id ).then(externalAccount => {
                resolve(externalAccount);
            })
        })
    },

    assignExternalBeneficiary: async (fundsTransfer, { externalBeneficiaryId }, { backend }: ResolverContext) => {
        return await backend.fundsTransfer.assignToExternalBeneficiary( fundsTransfer.id, externalBeneficiaryId );
    },

    unassignExternalBeneficiary: async ( _: ResolverParent { fundsTransferId }, { backend }: ResolverContext) => {
        return await backend.fundsTransfer.unassignFromExternalBeneficiary( fundsTransferId );
    },
    
    initiatedBy: async (fundsTransfer, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.fundsTransfer.getInitiatedBy( fundsTransfer.id ).then(customer => {
                resolve(customer);
            })
        })
    },

    assignInitiatedBy: async (fundsTransfer, { initiatedById }, { backend }: ResolverContext) => {
        return await backend.fundsTransfer.assignToInitiatedBy( fundsTransfer.id, initiatedById );
    },

    unassignInitiatedBy: async ( _: ResolverParent { fundsTransferId }, { backend }: ResolverContext) => {
        return await backend.fundsTransfer.unassignFromInitiatedBy( fundsTransferId );
    },
        
    transactions: async (fundsTransfer, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.fundsTransfer.getTransactions( fundsTransfer.id ).then(transactions => {
                resolve(transactions);
            })
        })
    },

    addToTransactions: async (fundsTransfer, args: FundsTransfer, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.fundsTransfer.addToTransactions( fundsTransfer.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToTransactions: async (fundsTransfer, { transactionsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.fundsTransfer.assignToTransactions( fundsTransfer.id, transactionsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    },
StandingInstruction: {
    
    account: async (standingInstruction, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.standingInstruction.getAccount( standingInstruction.id ).then(account => {
                resolve(account);
            })
        })
    },

    assignAccount: async (standingInstruction, { accountId }, { backend }: ResolverContext) => {
        return await backend.standingInstruction.assignToAccount( standingInstruction.id, accountId );
    },

    unassignAccount: async ( _: ResolverParent { standingInstructionId }, { backend }: ResolverContext) => {
        return await backend.standingInstruction.unassignFromAccount( standingInstructionId );
    },
    
    beneficiary: async (standingInstruction, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.standingInstruction.getBeneficiary( standingInstruction.id ).then(externalAccount => {
                resolve(externalAccount);
            })
        })
    },

    assignBeneficiary: async (standingInstruction, { beneficiaryId }, { backend }: ResolverContext) => {
        return await backend.standingInstruction.assignToBeneficiary( standingInstruction.id, beneficiaryId );
    },

    unassignBeneficiary: async ( _: ResolverParent { standingInstructionId }, { backend }: ResolverContext) => {
        return await backend.standingInstruction.unassignFromBeneficiary( standingInstructionId );
    },
        },
PaymentCard: {
    
    bank: async (paymentCard, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.paymentCard.getBank( paymentCard.id ).then(bank => {
                resolve(bank);
            })
        })
    },

    assignBank: async (paymentCard, { bankId }, { backend }: ResolverContext) => {
        return await backend.paymentCard.assignToBank( paymentCard.id, bankId );
    },

    unassignBank: async ( _: ResolverParent { paymentCardId }, { backend }: ResolverContext) => {
        return await backend.paymentCard.unassignFromBank( paymentCardId );
    },
    
    account: async (paymentCard, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.paymentCard.getAccount( paymentCard.id ).then(account => {
                resolve(account);
            })
        })
    },

    assignAccount: async (paymentCard, { accountId }, { backend }: ResolverContext) => {
        return await backend.paymentCard.assignToAccount( paymentCard.id, accountId );
    },

    unassignAccount: async ( _: ResolverParent { paymentCardId }, { backend }: ResolverContext) => {
        return await backend.paymentCard.unassignFromAccount( paymentCardId );
    },
    
    customer: async (paymentCard, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.paymentCard.getCustomer( paymentCard.id ).then(customer => {
                resolve(customer);
            })
        })
    },

    assignCustomer: async (paymentCard, { customerId }, { backend }: ResolverContext) => {
        return await backend.paymentCard.assignToCustomer( paymentCard.id, customerId );
    },

    unassignCustomer: async ( _: ResolverParent { paymentCardId }, { backend }: ResolverContext) => {
        return await backend.paymentCard.unassignFromCustomer( paymentCardId );
    },
        
    transactions: async (paymentCard, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.paymentCard.getTransactions( paymentCard.id ).then(transactions => {
                resolve(transactions);
            })
        })
    },

    addToTransactions: async (paymentCard, args: PaymentCard, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.paymentCard.addToTransactions( paymentCard.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToTransactions: async (paymentCard, { transactionsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.paymentCard.assignToTransactions( paymentCard.id, transactionsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    },
LoanAccount: {
    
    bank: async (loanAccount, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.getBank( loanAccount.id ).then(bank => {
                resolve(bank);
            })
        })
    },

    assignBank: async (loanAccount, { bankId }, { backend }: ResolverContext) => {
        return await backend.loanAccount.assignToBank( loanAccount.id, bankId );
    },

    unassignBank: async ( _: ResolverParent { loanAccountId }, { backend }: ResolverContext) => {
        return await backend.loanAccount.unassignFromBank( loanAccountId );
    },
    
    branch: async (loanAccount, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.getBranch( loanAccount.id ).then(branch => {
                resolve(branch);
            })
        })
    },

    assignBranch: async (loanAccount, { branchId }, { backend }: ResolverContext) => {
        return await backend.loanAccount.assignToBranch( loanAccount.id, branchId );
    },

    unassignBranch: async ( _: ResolverParent { loanAccountId }, { backend }: ResolverContext) => {
        return await backend.loanAccount.unassignFromBranch( loanAccountId );
    },
    
    product: async (loanAccount, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.getProduct( loanAccount.id ).then(bankingProduct => {
                resolve(bankingProduct);
            })
        })
    },

    assignProduct: async (loanAccount, { productId }, { backend }: ResolverContext) => {
        return await backend.loanAccount.assignToProduct( loanAccount.id, productId );
    },

    unassignProduct: async ( _: ResolverParent { loanAccountId }, { backend }: ResolverContext) => {
        return await backend.loanAccount.unassignFromProduct( loanAccountId );
    },
        
    borrowers: async (loanAccount, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.getBorrowers( loanAccount.id ).then(borrowers => {
                resolve(borrowers);
            })
        })
    },

    addToBorrowers: async (loanAccount, args: LoanAccount, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.addToBorrowers( loanAccount.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToBorrowers: async (loanAccount, { borrowersIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.assignToBorrowers( loanAccount.id, borrowersIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    repaymentSchedule: async (loanAccount, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.getRepaymentSchedule( loanAccount.id ).then(repaymentSchedule => {
                resolve(repaymentSchedule);
            })
        })
    },

    addToRepaymentSchedule: async (loanAccount, args: LoanAccount, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.addToRepaymentSchedule( loanAccount.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToRepaymentSchedule: async (loanAccount, { repaymentScheduleIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.assignToRepaymentSchedule( loanAccount.id, repaymentScheduleIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    payments: async (loanAccount, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.getPayments( loanAccount.id ).then(payments => {
                resolve(payments);
            })
        })
    },

    addToPayments: async (loanAccount, args: LoanAccount, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.addToPayments( loanAccount.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToPayments: async (loanAccount, { paymentsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.assignToPayments( loanAccount.id, paymentsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    collateral: async (loanAccount, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.getCollateral( loanAccount.id ).then(collateral => {
                resolve(collateral);
            })
        })
    },

    addToCollateral: async (loanAccount, args: LoanAccount, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.addToCollateral( loanAccount.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToCollateral: async (loanAccount, { collateralIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.assignToCollateral( loanAccount.id, collateralIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    feeCharges: async (loanAccount, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.getFeeCharges( loanAccount.id ).then(feeCharges => {
                resolve(feeCharges);
            })
        })
    },

    addToFeeCharges: async (loanAccount, args: LoanAccount, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.addToFeeCharges( loanAccount.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToFeeCharges: async (loanAccount, { feeChargesIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.assignToFeeCharges( loanAccount.id, feeChargesIds ).then( result => {
                resolve ( result );
            })
        })
    },

    },
RepaymentSchedule: {
    
    loanAccount: async (repaymentSchedule, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.repaymentSchedule.getLoanAccount( repaymentSchedule.id ).then(loanAccount => {
                resolve(loanAccount);
            })
        })
    },

    assignLoanAccount: async (repaymentSchedule, { loanAccountId }, { backend }: ResolverContext) => {
        return await backend.repaymentSchedule.assignToLoanAccount( repaymentSchedule.id, loanAccountId );
    },

    unassignLoanAccount: async ( _: ResolverParent { repaymentScheduleId }, { backend }: ResolverContext) => {
        return await backend.repaymentSchedule.unassignFromLoanAccount( repaymentScheduleId );
    },
    
    payment: async (repaymentSchedule, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.repaymentSchedule.getPayment( repaymentSchedule.id ).then(loanPayment => {
                resolve(loanPayment);
            })
        })
    },

    assignPayment: async (repaymentSchedule, { paymentId }, { backend }: ResolverContext) => {
        return await backend.repaymentSchedule.assignToPayment( repaymentSchedule.id, paymentId );
    },

    unassignPayment: async ( _: ResolverParent { repaymentScheduleId }, { backend }: ResolverContext) => {
        return await backend.repaymentSchedule.unassignFromPayment( repaymentScheduleId );
    },
        },
LoanPayment: {
    
    loanAccount: async (loanPayment, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.loanPayment.getLoanAccount( loanPayment.id ).then(loanAccount => {
                resolve(loanAccount);
            })
        })
    },

    assignLoanAccount: async (loanPayment, { loanAccountId }, { backend }: ResolverContext) => {
        return await backend.loanPayment.assignToLoanAccount( loanPayment.id, loanAccountId );
    },

    unassignLoanAccount: async ( _: ResolverParent { loanPaymentId }, { backend }: ResolverContext) => {
        return await backend.loanPayment.unassignFromLoanAccount( loanPaymentId );
    },
    
    transaction: async (loanPayment, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.loanPayment.getTransaction( loanPayment.id ).then(transaction => {
                resolve(transaction);
            })
        })
    },

    assignTransaction: async (loanPayment, { transactionId }, { backend }: ResolverContext) => {
        return await backend.loanPayment.assignToTransaction( loanPayment.id, transactionId );
    },

    unassignTransaction: async ( _: ResolverParent { loanPaymentId }, { backend }: ResolverContext) => {
        return await backend.loanPayment.unassignFromTransaction( loanPaymentId );
    },
        },
Collateral: {
    
    loanAccount: async (collateral, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.collateral.getLoanAccount( collateral.id ).then(loanAccount => {
                resolve(loanAccount);
            })
        })
    },

    assignLoanAccount: async (collateral, { loanAccountId }, { backend }: ResolverContext) => {
        return await backend.collateral.assignToLoanAccount( collateral.id, loanAccountId );
    },

    unassignLoanAccount: async ( _: ResolverParent { collateralId }, { backend }: ResolverContext) => {
        return await backend.collateral.unassignFromLoanAccount( collateralId );
    },
        },
FeeCharge: {
    
    account: async (feeCharge, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.feeCharge.getAccount( feeCharge.id ).then(account => {
                resolve(account);
            })
        })
    },

    assignAccount: async (feeCharge, { accountId }, { backend }: ResolverContext) => {
        return await backend.feeCharge.assignToAccount( feeCharge.id, accountId );
    },

    unassignAccount: async ( _: ResolverParent { feeChargeId }, { backend }: ResolverContext) => {
        return await backend.feeCharge.unassignFromAccount( feeChargeId );
    },
    
    loanAccount: async (feeCharge, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.feeCharge.getLoanAccount( feeCharge.id ).then(loanAccount => {
                resolve(loanAccount);
            })
        })
    },

    assignLoanAccount: async (feeCharge, { loanAccountId }, { backend }: ResolverContext) => {
        return await backend.feeCharge.assignToLoanAccount( feeCharge.id, loanAccountId );
    },

    unassignLoanAccount: async ( _: ResolverParent { feeChargeId }, { backend }: ResolverContext) => {
        return await backend.feeCharge.unassignFromLoanAccount( feeChargeId );
    },
        },
ExchangeRate: {
    
    bank: async (exchangeRate, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.exchangeRate.getBank( exchangeRate.id ).then(bank => {
                resolve(bank);
            })
        })
    },

    assignBank: async (exchangeRate, { bankId }, { backend }: ResolverContext) => {
        return await backend.exchangeRate.assignToBank( exchangeRate.id, bankId );
    },

    unassignBank: async ( _: ResolverParent { exchangeRateId }, { backend }: ResolverContext) => {
        return await backend.exchangeRate.unassignFromBank( exchangeRateId );
    },
        
    fxTrades: async (exchangeRate, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.exchangeRate.getFxTrades( exchangeRate.id ).then(fxTrades => {
                resolve(fxTrades);
            })
        })
    },

    addToFxTrades: async (exchangeRate, args: ExchangeRate, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.exchangeRate.addToFxTrades( exchangeRate.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToFxTrades: async (exchangeRate, { fxTradesIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.exchangeRate.assignToFxTrades( exchangeRate.id, fxTradesIds ).then( result => {
                resolve ( result );
            })
        })
    },

    },
FXTrade: {
    
    customer: async (fXTrade, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.fXTrade.getCustomer( fXTrade.id ).then(customer => {
                resolve(customer);
            })
        })
    },

    assignCustomer: async (fXTrade, { customerId }, { backend }: ResolverContext) => {
        return await backend.fXTrade.assignToCustomer( fXTrade.id, customerId );
    },

    unassignCustomer: async ( _: ResolverParent { fXTradeId }, { backend }: ResolverContext) => {
        return await backend.fXTrade.unassignFromCustomer( fXTradeId );
    },
    
    bank: async (fXTrade, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.fXTrade.getBank( fXTrade.id ).then(bank => {
                resolve(bank);
            })
        })
    },

    assignBank: async (fXTrade, { bankId }, { backend }: ResolverContext) => {
        return await backend.fXTrade.assignToBank( fXTrade.id, bankId );
    },

    unassignBank: async ( _: ResolverParent { fXTradeId }, { backend }: ResolverContext) => {
        return await backend.fXTrade.unassignFromBank( fXTradeId );
    },
    
    exchangeRate: async (fXTrade, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.fXTrade.getExchangeRate( fXTrade.id ).then(exchangeRate => {
                resolve(exchangeRate);
            })
        })
    },

    assignExchangeRate: async (fXTrade, { exchangeRateId }, { backend }: ResolverContext) => {
        return await backend.fXTrade.assignToExchangeRate( fXTrade.id, exchangeRateId );
    },

    unassignExchangeRate: async ( _: ResolverParent { fXTradeId }, { backend }: ResolverContext) => {
        return await backend.fXTrade.unassignFromExchangeRate( fXTradeId );
    },
    
    sourceAccount: async (fXTrade, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.fXTrade.getSourceAccount( fXTrade.id ).then(account => {
                resolve(account);
            })
        })
    },

    assignSourceAccount: async (fXTrade, { sourceAccountId }, { backend }: ResolverContext) => {
        return await backend.fXTrade.assignToSourceAccount( fXTrade.id, sourceAccountId );
    },

    unassignSourceAccount: async ( _: ResolverParent { fXTradeId }, { backend }: ResolverContext) => {
        return await backend.fXTrade.unassignFromSourceAccount( fXTradeId );
    },
    
    destinationAccount: async (fXTrade, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.fXTrade.getDestinationAccount( fXTrade.id ).then(account => {
                resolve(account);
            })
        })
    },

    assignDestinationAccount: async (fXTrade, { destinationAccountId }, { backend }: ResolverContext) => {
        return await backend.fXTrade.assignToDestinationAccount( fXTrade.id, destinationAccountId );
    },

    unassignDestinationAccount: async ( _: ResolverParent { fXTradeId }, { backend }: ResolverContext) => {
        return await backend.fXTrade.unassignFromDestinationAccount( fXTradeId );
    },
    
    transaction: async (fXTrade, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.fXTrade.getTransaction( fXTrade.id ).then(transaction => {
                resolve(transaction);
            })
        })
    },

    assignTransaction: async (fXTrade, { transactionId }, { backend }: ResolverContext) => {
        return await backend.fXTrade.assignToTransaction( fXTrade.id, transactionId );
    },

    unassignTransaction: async ( _: ResolverParent { fXTradeId }, { backend }: ResolverContext) => {
        return await backend.fXTrade.unassignFromTransaction( fXTradeId );
    },
        },
Dispute: {
    
    transaction: async (dispute, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.dispute.getTransaction( dispute.id ).then(transaction => {
                resolve(transaction);
            })
        })
    },

    assignTransaction: async (dispute, { transactionId }, { backend }: ResolverContext) => {
        return await backend.dispute.assignToTransaction( dispute.id, transactionId );
    },

    unassignTransaction: async ( _: ResolverParent { disputeId }, { backend }: ResolverContext) => {
        return await backend.dispute.unassignFromTransaction( disputeId );
    },
    
    customer: async (dispute, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.dispute.getCustomer( dispute.id ).then(customer => {
                resolve(customer);
            })
        })
    },

    assignCustomer: async (dispute, { customerId }, { backend }: ResolverContext) => {
        return await backend.dispute.assignToCustomer( dispute.id, customerId );
    },

    unassignCustomer: async ( _: ResolverParent { disputeId }, { backend }: ResolverContext) => {
        return await backend.dispute.unassignFromCustomer( disputeId );
    },
    
    account: async (dispute, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.dispute.getAccount( dispute.id ).then(account => {
                resolve(account);
            })
        })
    },

    assignAccount: async (dispute, { accountId }, { backend }: ResolverContext) => {
        return await backend.dispute.assignToAccount( dispute.id, accountId );
    },

    unassignAccount: async ( _: ResolverParent { disputeId }, { backend }: ResolverContext) => {
        return await backend.dispute.unassignFromAccount( disputeId );
    },
    
    paymentCard: async (dispute, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.dispute.getPaymentCard( dispute.id ).then(paymentCard => {
                resolve(paymentCard);
            })
        })
    },

    assignPaymentCard: async (dispute, { paymentCardId }, { backend }: ResolverContext) => {
        return await backend.dispute.assignToPaymentCard( dispute.id, paymentCardId );
    },

    unassignPaymentCard: async ( _: ResolverParent { disputeId }, { backend }: ResolverContext) => {
        return await backend.dispute.unassignFromPaymentCard( disputeId );
    },
        },
Consent: {
    
    customer: async (consent, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.consent.getCustomer( consent.id ).then(customer => {
                resolve(customer);
            })
        })
    },

    assignCustomer: async (consent, { customerId }, { backend }: ResolverContext) => {
        return await backend.consent.assignToCustomer( consent.id, customerId );
    },

    unassignCustomer: async ( _: ResolverParent { consentId }, { backend }: ResolverContext) => {
        return await backend.consent.unassignFromCustomer( consentId );
    },
    
    bank: async (consent, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.consent.getBank( consent.id ).then(bank => {
                resolve(bank);
            })
        })
    },

    assignBank: async (consent, { bankId }, { backend }: ResolverContext) => {
        return await backend.consent.assignToBank( consent.id, bankId );
    },

    unassignBank: async ( _: ResolverParent { consentId }, { backend }: ResolverContext) => {
        return await backend.consent.unassignFromBank( consentId );
    },
    
    thirdPartyProvider: async (consent, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.consent.getThirdPartyProvider( consent.id ).then(thirdPartyProvider => {
                resolve(thirdPartyProvider);
            })
        })
    },

    assignThirdPartyProvider: async (consent, { thirdPartyProviderId }, { backend }: ResolverContext) => {
        return await backend.consent.assignToThirdPartyProvider( consent.id, thirdPartyProviderId );
    },

    unassignThirdPartyProvider: async ( _: ResolverParent { consentId }, { backend }: ResolverContext) => {
        return await backend.consent.unassignFromThirdPartyProvider( consentId );
    },
        
    authorizedAccounts: async (consent, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.consent.getAuthorizedAccounts( consent.id ).then(authorizedAccounts => {
                resolve(authorizedAccounts);
            })
        })
    },

    addToAuthorizedAccounts: async (consent, args: Consent, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.consent.addToAuthorizedAccounts( consent.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToAuthorizedAccounts: async (consent, { authorizedAccountsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.consent.assignToAuthorizedAccounts( consent.id, authorizedAccountsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    },
ThirdPartyProvider: {
    
    bank: async (thirdPartyProvider, { id }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.thirdPartyProvider.getBank( thirdPartyProvider.id ).then(bank => {
                resolve(bank);
            })
        })
    },

    assignBank: async (thirdPartyProvider, { bankId }, { backend }: ResolverContext) => {
        return await backend.thirdPartyProvider.assignToBank( thirdPartyProvider.id, bankId );
    },

    unassignBank: async ( _: ResolverParent { thirdPartyProviderId }, { backend }: ResolverContext) => {
        return await backend.thirdPartyProvider.unassignFromBank( thirdPartyProviderId );
    },
        
    consents: async (thirdPartyProvider, {}, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.thirdPartyProvider.getConsents( thirdPartyProvider.id ).then(consents => {
                resolve(consents);
            })
        })
    },

    addToConsents: async (thirdPartyProvider, args: ThirdPartyProvider, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.thirdPartyProvider.addToConsents( thirdPartyProvider.id, args ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToConsents: async (thirdPartyProvider, { consentsIds }, { backend }: ResolverContext) => {
        return new Promise(function(resolve, reject) {
            backend.thirdPartyProvider.assignToConsents( thirdPartyProvider.id, consentsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    },
};

