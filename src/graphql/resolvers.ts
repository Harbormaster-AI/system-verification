const { paginateResults } = require('./utils');

module.exports = {

    Query: {

    //////////////////////////
    // Bank
    //////////////////////////
    bank: async (_, { id }, { backend }) => {
        return await backend.bank.find( id );
    },

    banks: async (_, { pageSize = 20, after }, { backend }) => {
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
    branch: async (_, { id }, { backend }) => {
        return await backend.branch.find( id );
    },

    branchs: async (_, { pageSize = 20, after }, { backend }) => {
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
    aTM: async (_, { id }, { backend }) => {
        return await backend.aTM.find( id );
    },

    aTMs: async (_, { pageSize = 20, after }, { backend }) => {
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
    customer: async (_, { id }, { backend }) => {
        return await backend.customer.find( id );
    },

    customers: async (_, { pageSize = 20, after }, { backend }) => {
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
    kycProfile: async (_, { id }, { backend }) => {
        return await backend.kycProfile.find( id );
    },

    kycProfiles: async (_, { pageSize = 20, after }, { backend }) => {
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
    identityDocument: async (_, { id }, { backend }) => {
        return await backend.identityDocument.find( id );
    },

    identityDocuments: async (_, { pageSize = 20, after }, { backend }) => {
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
    riskAssessment: async (_, { id }, { backend }) => {
        return await backend.riskAssessment.find( id );
    },

    riskAssessments: async (_, { pageSize = 20, after }, { backend }) => {
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
    screeningResult: async (_, { id }, { backend }) => {
        return await backend.screeningResult.find( id );
    },

    screeningResults: async (_, { pageSize = 20, after }, { backend }) => {
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
    bankingProduct: async (_, { id }, { backend }) => {
        return await backend.bankingProduct.find( id );
    },

    bankingProducts: async (_, { pageSize = 20, after }, { backend }) => {
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
    account: async (_, { id }, { backend }) => {
        return await backend.account.find( id );
    },

    accounts: async (_, { pageSize = 20, after }, { backend }) => {
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
    accountStatement: async (_, { id }, { backend }) => {
        return await backend.accountStatement.find( id );
    },

    accountStatements: async (_, { pageSize = 20, after }, { backend }) => {
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
    transaction: async (_, { id }, { backend }) => {
        return await backend.transaction.find( id );
    },

    transactions: async (_, { pageSize = 20, after }, { backend }) => {
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
    externalAccount: async (_, { id }, { backend }) => {
        return await backend.externalAccount.find( id );
    },

    externalAccounts: async (_, { pageSize = 20, after }, { backend }) => {
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
    fundsTransfer: async (_, { id }, { backend }) => {
        return await backend.fundsTransfer.find( id );
    },

    fundsTransfers: async (_, { pageSize = 20, after }, { backend }) => {
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
    standingInstruction: async (_, { id }, { backend }) => {
        return await backend.standingInstruction.find( id );
    },

    standingInstructions: async (_, { pageSize = 20, after }, { backend }) => {
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
    paymentCard: async (_, { id }, { backend }) => {
        return await backend.paymentCard.find( id );
    },

    paymentCards: async (_, { pageSize = 20, after }, { backend }) => {
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
    loanAccount: async (_, { id }, { backend }) => {
        return await backend.loanAccount.find( id );
    },

    loanAccounts: async (_, { pageSize = 20, after }, { backend }) => {
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
    repaymentSchedule: async (_, { id }, { backend }) => {
        return await backend.repaymentSchedule.find( id );
    },

    repaymentSchedules: async (_, { pageSize = 20, after }, { backend }) => {
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
    loanPayment: async (_, { id }, { backend }) => {
        return await backend.loanPayment.find( id );
    },

    loanPayments: async (_, { pageSize = 20, after }, { backend }) => {
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
    collateral: async (_, { id }, { backend }) => {
        return await backend.collateral.find( id );
    },

    collaterals: async (_, { pageSize = 20, after }, { backend }) => {
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
    feeCharge: async (_, { id }, { backend }) => {
        return await backend.feeCharge.find( id );
    },

    feeCharges: async (_, { pageSize = 20, after }, { backend }) => {
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
    exchangeRate: async (_, { id }, { backend }) => {
        return await backend.exchangeRate.find( id );
    },

    exchangeRates: async (_, { pageSize = 20, after }, { backend }) => {
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
    fXTrade: async (_, { id }, { backend }) => {
        return await backend.fXTrade.find( id );
    },

    fXTrades: async (_, { pageSize = 20, after }, { backend }) => {
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
    dispute: async (_, { id }, { backend }) => {
        return await backend.dispute.find( id );
    },

    disputes: async (_, { pageSize = 20, after }, { backend }) => {
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
    consent: async (_, { id }, { backend }) => {
        return await backend.consent.find( id );
    },

    consents: async (_, { pageSize = 20, after }, { backend }) => {
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
    thirdPartyProvider: async (_, { id }, { backend }) => {
        return await backend.thirdPartyProvider.find( id );
    },

    thirdPartyProviders: async (_, { pageSize = 20, after }, { backend }) => {
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
    addBank: async (_, { name, legalName, swiftBic, headquartersCountry, website }, { backend }) => {
        return await backend.bank.add( { name, legalName, swiftBic, headquartersCountry, website } );
    },

    updateBank: async (_, { name, legalName, swiftBic, headquartersCountry, website, id }, { backend }) => {
        return await backend.bank.update( { name, legalName, swiftBic, headquartersCountry, website }, id );
    },

    removeBank: async (_, { id }, { backend }) => {
        return await backend.bank.remove( { id } );
    },
        //////////////////////////
// Branch
//////////////////////////
    addBranch: async (_, { name, branchCode, address, phone, openingHours }, { backend }) => {
        return await backend.branch.add( { name, branchCode, address, phone, openingHours } );
    },

    updateBranch: async (_, { name, branchCode, address, phone, openingHours, id }, { backend }) => {
        return await backend.branch.update( { name, branchCode, address, phone, openingHours }, id );
    },

    removeBranch: async (_, { id }, { backend }) => {
        return await backend.branch.remove( { id } );
    },
        //////////////////////////
// ATM
//////////////////////////
    addATM: async (_, { terminalId, location, Status }, { backend }) => {
        return await backend.aTM.add( { terminalId, location, Status } );
    },

    updateATM: async (_, { terminalId, location, Status, id }, { backend }) => {
        return await backend.aTM.update( { terminalId, location, Status }, id );
    },

    removeATM: async (_, { id }, { backend }) => {
        return await backend.aTM.remove( { id } );
    },
        //////////////////////////
// Customer
//////////////////////////
    addCustomer: async (_, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus }, { backend }) => {
        return await backend.customer.add( { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } );
    },

    updateCustomer: async (_, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus, id }, { backend }) => {
        return await backend.customer.update( { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus }, id );
    },

    removeCustomer: async (_, { id }, { backend }) => {
        return await backend.customer.remove( { id } );
    },
        //////////////////////////
// KycProfile
//////////////////////////
    addKycProfile: async (_, { profileId, lastReviewedOn, Status }, { backend }) => {
        return await backend.kycProfile.add( { profileId, lastReviewedOn, Status } );
    },

    updateKycProfile: async (_, { profileId, lastReviewedOn, Status, id }, { backend }) => {
        return await backend.kycProfile.update( { profileId, lastReviewedOn, Status }, id );
    },

    removeKycProfile: async (_, { id }, { backend }) => {
        return await backend.kycProfile.remove( { id } );
    },
        //////////////////////////
// IdentityDocument
//////////////////////////
    addIdentityDocument: async (_, { documentNumber, issuingCountry, expirationDate, DocumentType }, { backend }) => {
        return await backend.identityDocument.add( { documentNumber, issuingCountry, expirationDate, DocumentType } );
    },

    updateIdentityDocument: async (_, { documentNumber, issuingCountry, expirationDate, DocumentType, id }, { backend }) => {
        return await backend.identityDocument.update( { documentNumber, issuingCountry, expirationDate, DocumentType }, id );
    },

    removeIdentityDocument: async (_, { id }, { backend }) => {
        return await backend.identityDocument.remove( { id } );
    },
        //////////////////////////
// RiskAssessment
//////////////////////////
    addRiskAssessment: async (_, { score, assessedOn, Rating }, { backend }) => {
        return await backend.riskAssessment.add( { score, assessedOn, Rating } );
    },

    updateRiskAssessment: async (_, { score, assessedOn, Rating, id }, { backend }) => {
        return await backend.riskAssessment.update( { score, assessedOn, Rating }, id );
    },

    removeRiskAssessment: async (_, { id }, { backend }) => {
        return await backend.riskAssessment.remove( { id } );
    },
        //////////////////////////
// ScreeningResult
//////////////////////////
    addScreeningResult: async (_, { screeningDate, provider, Outcome }, { backend }) => {
        return await backend.screeningResult.add( { screeningDate, provider, Outcome } );
    },

    updateScreeningResult: async (_, { screeningDate, provider, Outcome, id }, { backend }) => {
        return await backend.screeningResult.update( { screeningDate, provider, Outcome }, id );
    },

    removeScreeningResult: async (_, { id }, { backend }) => {
        return await backend.screeningResult.remove( { id } );
    },
        //////////////////////////
// BankingProduct
//////////////////////////
    addBankingProduct: async (_, { productCode, name, description, ProductCategory }, { backend }) => {
        return await backend.bankingProduct.add( { productCode, name, description, ProductCategory } );
    },

    updateBankingProduct: async (_, { productCode, name, description, ProductCategory, id }, { backend }) => {
        return await backend.bankingProduct.update( { productCode, name, description, ProductCategory }, id );
    },

    removeBankingProduct: async (_, { id }, { backend }) => {
        return await backend.bankingProduct.remove( { id } );
    },
        //////////////////////////
// Account
//////////////////////////
    addAccount: async (_, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { backend }) => {
        return await backend.account.add( { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } );
    },

    updateAccount: async (_, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status, id }, { backend }) => {
        return await backend.account.update( { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, id );
    },

    removeAccount: async (_, { id }, { backend }) => {
        return await backend.account.remove( { id } );
    },
        //////////////////////////
// AccountStatement
//////////////////////////
    addAccountStatement: async (_, { statementNumber, periodStart, periodEnd, openingBalance, closingBalance, DeliveryMethod }, { backend }) => {
        return await backend.accountStatement.add( { statementNumber, periodStart, periodEnd, openingBalance, closingBalance, DeliveryMethod } );
    },

    updateAccountStatement: async (_, { statementNumber, periodStart, periodEnd, openingBalance, closingBalance, DeliveryMethod, id }, { backend }) => {
        return await backend.accountStatement.update( { statementNumber, periodStart, periodEnd, openingBalance, closingBalance, DeliveryMethod }, id );
    },

    removeAccountStatement: async (_, { id }, { backend }) => {
        return await backend.accountStatement.remove( { id } );
    },
        //////////////////////////
// Transaction
//////////////////////////
    addTransaction: async (_, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel }, { backend }) => {
        return await backend.transaction.add( { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } );
    },

    updateTransaction: async (_, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel, id }, { backend }) => {
        return await backend.transaction.update( { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel }, id );
    },

    removeTransaction: async (_, { id }, { backend }) => {
        return await backend.transaction.remove( { id } );
    },
        //////////////////////////
// ExternalAccount
//////////////////////////
    addExternalAccount: async (_, { name, iban, accountNumber, bic, bankName, country }, { backend }) => {
        return await backend.externalAccount.add( { name, iban, accountNumber, bic, bankName, country } );
    },

    updateExternalAccount: async (_, { name, iban, accountNumber, bic, bankName, country, id }, { backend }) => {
        return await backend.externalAccount.update( { name, iban, accountNumber, bic, bankName, country }, id );
    },

    removeExternalAccount: async (_, { id }, { backend }) => {
        return await backend.externalAccount.remove( { id } );
    },
        //////////////////////////
// FundsTransfer
//////////////////////////
    addFundsTransfer: async (_, { transferReference, amount, requestedDate, executionDate, purpose, feeAmount, Method, Status }, { backend }) => {
        return await backend.fundsTransfer.add( { transferReference, amount, requestedDate, executionDate, purpose, feeAmount, Method, Status } );
    },

    updateFundsTransfer: async (_, { transferReference, amount, requestedDate, executionDate, purpose, feeAmount, Method, Status, id }, { backend }) => {
        return await backend.fundsTransfer.update( { transferReference, amount, requestedDate, executionDate, purpose, feeAmount, Method, Status }, id );
    },

    removeFundsTransfer: async (_, { id }, { backend }) => {
        return await backend.fundsTransfer.remove( { id } );
    },
        //////////////////////////
// StandingInstruction
//////////////////////////
    addStandingInstruction: async (_, { instructionId, amount, nextExecutionDate, Frequency, Status }, { backend }) => {
        return await backend.standingInstruction.add( { instructionId, amount, nextExecutionDate, Frequency, Status } );
    },

    updateStandingInstruction: async (_, { instructionId, amount, nextExecutionDate, Frequency, Status, id }, { backend }) => {
        return await backend.standingInstruction.update( { instructionId, amount, nextExecutionDate, Frequency, Status }, id );
    },

    removeStandingInstruction: async (_, { id }, { backend }) => {
        return await backend.standingInstruction.remove( { id } );
    },
        //////////////////////////
// PaymentCard
//////////////////////////
    addPaymentCard: async (_, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network }, { backend }) => {
        return await backend.paymentCard.add( { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network } );
    },

    updatePaymentCard: async (_, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network, id }, { backend }) => {
        return await backend.paymentCard.update( { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network }, id );
    },

    removePaymentCard: async (_, { id }, { backend }) => {
        return await backend.paymentCard.remove( { id } );
    },
        //////////////////////////
// LoanAccount
//////////////////////////
    addLoanAccount: async (_, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status }, { backend }) => {
        return await backend.loanAccount.add( { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } );
    },

    updateLoanAccount: async (_, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status, id }, { backend }) => {
        return await backend.loanAccount.update( { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status }, id );
    },

    removeLoanAccount: async (_, { id }, { backend }) => {
        return await backend.loanAccount.remove( { id } );
    },
        //////////////////////////
// RepaymentSchedule
//////////////////////////
    addRepaymentSchedule: async (_, { installmentNumber, dueDate, principalDue, interestDue, totalDue, Status }, { backend }) => {
        return await backend.repaymentSchedule.add( { installmentNumber, dueDate, principalDue, interestDue, totalDue, Status } );
    },

    updateRepaymentSchedule: async (_, { installmentNumber, dueDate, principalDue, interestDue, totalDue, Status, id }, { backend }) => {
        return await backend.repaymentSchedule.update( { installmentNumber, dueDate, principalDue, interestDue, totalDue, Status }, id );
    },

    removeRepaymentSchedule: async (_, { id }, { backend }) => {
        return await backend.repaymentSchedule.remove( { id } );
    },
        //////////////////////////
// LoanPayment
//////////////////////////
    addLoanPayment: async (_, { paymentReference, amount, paymentDate, Method, Status }, { backend }) => {
        return await backend.loanPayment.add( { paymentReference, amount, paymentDate, Method, Status } );
    },

    updateLoanPayment: async (_, { paymentReference, amount, paymentDate, Method, Status, id }, { backend }) => {
        return await backend.loanPayment.update( { paymentReference, amount, paymentDate, Method, Status }, id );
    },

    removeLoanPayment: async (_, { id }, { backend }) => {
        return await backend.loanPayment.remove( { id } );
    },
        //////////////////////////
// Collateral
//////////////////////////
    addCollateral: async (_, { appraisedValue, description, location, CollateralType }, { backend }) => {
        return await backend.collateral.add( { appraisedValue, description, location, CollateralType } );
    },

    updateCollateral: async (_, { appraisedValue, description, location, CollateralType, id }, { backend }) => {
        return await backend.collateral.update( { appraisedValue, description, location, CollateralType }, id );
    },

    removeCollateral: async (_, { id }, { backend }) => {
        return await backend.collateral.remove( { id } );
    },
        //////////////////////////
// FeeCharge
//////////////////////////
    addFeeCharge: async (_, { feeCode, amount, appliedOn, FeeType }, { backend }) => {
        return await backend.feeCharge.add( { feeCode, amount, appliedOn, FeeType } );
    },

    updateFeeCharge: async (_, { feeCode, amount, appliedOn, FeeType, id }, { backend }) => {
        return await backend.feeCharge.update( { feeCode, amount, appliedOn, FeeType }, id );
    },

    removeFeeCharge: async (_, { id }, { backend }) => {
        return await backend.feeCharge.remove( { id } );
    },
        //////////////////////////
// ExchangeRate
//////////////////////////
    addExchangeRate: async (_, { baseCurrency, counterCurrency, rate, asOf, source }, { backend }) => {
        return await backend.exchangeRate.add( { baseCurrency, counterCurrency, rate, asOf, source } );
    },

    updateExchangeRate: async (_, { baseCurrency, counterCurrency, rate, asOf, source, id }, { backend }) => {
        return await backend.exchangeRate.update( { baseCurrency, counterCurrency, rate, asOf, source }, id );
    },

    removeExchangeRate: async (_, { id }, { backend }) => {
        return await backend.exchangeRate.remove( { id } );
    },
        //////////////////////////
// FXTrade
//////////////////////////
    addFXTrade: async (_, { tradeReference, tradeDate, settlementDate, amountSold, amountBought, rate, Status }, { backend }) => {
        return await backend.fXTrade.add( { tradeReference, tradeDate, settlementDate, amountSold, amountBought, rate, Status } );
    },

    updateFXTrade: async (_, { tradeReference, tradeDate, settlementDate, amountSold, amountBought, rate, Status, id }, { backend }) => {
        return await backend.fXTrade.update( { tradeReference, tradeDate, settlementDate, amountSold, amountBought, rate, Status }, id );
    },

    removeFXTrade: async (_, { id }, { backend }) => {
        return await backend.fXTrade.remove( { id } );
    },
        //////////////////////////
// Dispute
//////////////////////////
    addDispute: async (_, { disputeReference, raisedOn, reason, Status }, { backend }) => {
        return await backend.dispute.add( { disputeReference, raisedOn, reason, Status } );
    },

    updateDispute: async (_, { disputeReference, raisedOn, reason, Status, id }, { backend }) => {
        return await backend.dispute.update( { disputeReference, raisedOn, reason, Status }, id );
    },

    removeDispute: async (_, { id }, { backend }) => {
        return await backend.dispute.remove( { id } );
    },
        //////////////////////////
// Consent
//////////////////////////
    addConsent: async (_, { grantedOn, expiresOn, ConsentType, Status }, { backend }) => {
        return await backend.consent.add( { grantedOn, expiresOn, ConsentType, Status } );
    },

    updateConsent: async (_, { grantedOn, expiresOn, ConsentType, Status, id }, { backend }) => {
        return await backend.consent.update( { grantedOn, expiresOn, ConsentType, Status }, id );
    },

    removeConsent: async (_, { id }, { backend }) => {
        return await backend.consent.remove( { id } );
    },
        //////////////////////////
// ThirdPartyProvider
//////////////////////////
    addThirdPartyProvider: async (_, { name, registrationId, website }, { backend }) => {
        return await backend.thirdPartyProvider.add( { name, registrationId, website } );
    },

    updateThirdPartyProvider: async (_, { name, registrationId, website, id }, { backend }) => {
        return await backend.thirdPartyProvider.update( { name, registrationId, website }, id );
    },

    removeThirdPartyProvider: async (_, { id }, { backend }) => {
        return await backend.thirdPartyProvider.remove( { id } );
    },
        },

Bank: {
        
    branches: async (bank, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.getBranches( bank.id ).then(branches => {
                resolve(branches);
            })
        })
    },

    addToBranches: async (bank, { name, branchCode, address, phone, openingHours }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.addToBranches( bank.id, { name, branchCode, address, phone, openingHours } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToBranches: async (bank, { branchesIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.assignToBranches( bank.id, branchesIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    products: async (bank, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.getProducts( bank.id ).then(products => {
                resolve(products);
            })
        })
    },

    addToProducts: async (bank, { productCode, name, description, ProductCategory }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.addToProducts( bank.id, { productCode, name, description, ProductCategory } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToProducts: async (bank, { productsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.assignToProducts( bank.id, productsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    customers: async (bank, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.getCustomers( bank.id ).then(customers => {
                resolve(customers);
            })
        })
    },

    addToCustomers: async (bank, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.addToCustomers( bank.id, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToCustomers: async (bank, { customersIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.assignToCustomers( bank.id, customersIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    accounts: async (bank, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.getAccounts( bank.id ).then(accounts => {
                resolve(accounts);
            })
        })
    },

    addToAccounts: async (bank, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.addToAccounts( bank.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToAccounts: async (bank, { accountsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.assignToAccounts( bank.id, accountsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    paymentCards: async (bank, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.getPaymentCards( bank.id ).then(paymentCards => {
                resolve(paymentCards);
            })
        })
    },

    addToPaymentCards: async (bank, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.addToPaymentCards( bank.id, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToPaymentCards: async (bank, { paymentCardsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.assignToPaymentCards( bank.id, paymentCardsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    loanAccounts: async (bank, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.getLoanAccounts( bank.id ).then(loanAccounts => {
                resolve(loanAccounts);
            })
        })
    },

    addToLoanAccounts: async (bank, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.addToLoanAccounts( bank.id, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToLoanAccounts: async (bank, { loanAccountsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.assignToLoanAccounts( bank.id, loanAccountsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    exchangeRates: async (bank, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.getExchangeRates( bank.id ).then(exchangeRates => {
                resolve(exchangeRates);
            })
        })
    },

    addToExchangeRates: async (bank, { baseCurrency, counterCurrency, rate, asOf, source }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.addToExchangeRates( bank.id, { baseCurrency, counterCurrency, rate, asOf, source } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToExchangeRates: async (bank, { exchangeRatesIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.assignToExchangeRates( bank.id, exchangeRatesIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    consents: async (bank, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.getConsents( bank.id ).then(consents => {
                resolve(consents);
            })
        })
    },

    addToConsents: async (bank, { grantedOn, expiresOn, ConsentType, Status }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.addToConsents( bank.id, { grantedOn, expiresOn, ConsentType, Status } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToConsents: async (bank, { consentsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.assignToConsents( bank.id, consentsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    thirdPartyProviders: async (bank, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.getThirdPartyProviders( bank.id ).then(thirdPartyProviders => {
                resolve(thirdPartyProviders);
            })
        })
    },

    addToThirdPartyProviders: async (bank, { name, registrationId, website }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.addToThirdPartyProviders( bank.id, { name, registrationId, website } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToThirdPartyProviders: async (bank, { thirdPartyProvidersIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bank.assignToThirdPartyProviders( bank.id, thirdPartyProvidersIds ).then( result => {
                resolve ( result );
            })
        })
    },

    },
Branch: {
    
    bank: async (branch, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.branch.getBank( branch.id ).then(bank => {
                resolve(bank);
            })
        })
    },

    addBank: async (branch, { name, legalName, swiftBic, headquartersCountry, website }, { backend }) => {
        return await backend.branch.addBank( branch.id, { name, legalName, swiftBic, headquartersCountry, website } );
    },

    assignBank: async (branch, { bankId }, { backend }) => {
        return await backend.branch.assignToBank( branch.id, bankId );
    },

    unassignBank: async (_, { branchId }, { backend }) => {
        return await backend.branch.unassignFromBank( branchId );
    },
        
    accounts: async (branch, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.branch.getAccounts( branch.id ).then(accounts => {
                resolve(accounts);
            })
        })
    },

    addToAccounts: async (branch, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.branch.addToAccounts( branch.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToAccounts: async (branch, { accountsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.branch.assignToAccounts( branch.id, accountsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    loanAccounts: async (branch, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.branch.getLoanAccounts( branch.id ).then(loanAccounts => {
                resolve(loanAccounts);
            })
        })
    },

    addToLoanAccounts: async (branch, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.branch.addToLoanAccounts( branch.id, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToLoanAccounts: async (branch, { loanAccountsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.branch.assignToLoanAccounts( branch.id, loanAccountsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    atms: async (branch, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.branch.getAtms( branch.id ).then(atms => {
                resolve(atms);
            })
        })
    },

    addToAtms: async (branch, { terminalId, location, Status }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.branch.addToAtms( branch.id, { terminalId, location, Status } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToAtms: async (branch, { atmsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.branch.assignToAtms( branch.id, atmsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    },
ATM: {
    
    branch: async (aTM, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.aTM.getBranch( aTM.id ).then(branch => {
                resolve(branch);
            })
        })
    },

    addBranch: async (aTM, { name, branchCode, address, phone, openingHours }, { backend }) => {
        return await backend.aTM.addBranch( aTM.id, { name, branchCode, address, phone, openingHours } );
    },

    assignBranch: async (aTM, { branchId }, { backend }) => {
        return await backend.aTM.assignToBranch( aTM.id, branchId );
    },

    unassignBranch: async (_, { aTMId }, { backend }) => {
        return await backend.aTM.unassignFromBranch( aTMId );
    },
        },
Customer: {
    
    bank: async (customer, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.customer.getBank( customer.id ).then(bank => {
                resolve(bank);
            })
        })
    },

    addBank: async (customer, { name, legalName, swiftBic, headquartersCountry, website }, { backend }) => {
        return await backend.customer.addBank( customer.id, { name, legalName, swiftBic, headquartersCountry, website } );
    },

    assignBank: async (customer, { bankId }, { backend }) => {
        return await backend.customer.assignToBank( customer.id, bankId );
    },

    unassignBank: async (_, { customerId }, { backend }) => {
        return await backend.customer.unassignFromBank( customerId );
    },
        
    accounts: async (customer, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.customer.getAccounts( customer.id ).then(accounts => {
                resolve(accounts);
            })
        })
    },

    addToAccounts: async (customer, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.customer.addToAccounts( customer.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToAccounts: async (customer, { accountsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.customer.assignToAccounts( customer.id, accountsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    loanAccounts: async (customer, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.customer.getLoanAccounts( customer.id ).then(loanAccounts => {
                resolve(loanAccounts);
            })
        })
    },

    addToLoanAccounts: async (customer, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.customer.addToLoanAccounts( customer.id, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToLoanAccounts: async (customer, { loanAccountsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.customer.assignToLoanAccounts( customer.id, loanAccountsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    paymentCards: async (customer, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.customer.getPaymentCards( customer.id ).then(paymentCards => {
                resolve(paymentCards);
            })
        })
    },

    addToPaymentCards: async (customer, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.customer.addToPaymentCards( customer.id, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToPaymentCards: async (customer, { paymentCardsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.customer.assignToPaymentCards( customer.id, paymentCardsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    externalAccounts: async (customer, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.customer.getExternalAccounts( customer.id ).then(externalAccounts => {
                resolve(externalAccounts);
            })
        })
    },

    addToExternalAccounts: async (customer, { name, iban, accountNumber, bic, bankName, country }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.customer.addToExternalAccounts( customer.id, { name, iban, accountNumber, bic, bankName, country } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToExternalAccounts: async (customer, { externalAccountsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.customer.assignToExternalAccounts( customer.id, externalAccountsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    fundsTransfers: async (customer, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.customer.getFundsTransfers( customer.id ).then(fundsTransfers => {
                resolve(fundsTransfers);
            })
        })
    },

    addToFundsTransfers: async (customer, { transferReference, amount, requestedDate, executionDate, purpose, feeAmount, Method, Status }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.customer.addToFundsTransfers( customer.id, { transferReference, amount, requestedDate, executionDate, purpose, feeAmount, Method, Status } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToFundsTransfers: async (customer, { fundsTransfersIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.customer.assignToFundsTransfers( customer.id, fundsTransfersIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    disputes: async (customer, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.customer.getDisputes( customer.id ).then(disputes => {
                resolve(disputes);
            })
        })
    },

    addToDisputes: async (customer, { disputeReference, raisedOn, reason, Status }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.customer.addToDisputes( customer.id, { disputeReference, raisedOn, reason, Status } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToDisputes: async (customer, { disputesIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.customer.assignToDisputes( customer.id, disputesIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    kycProfiles: async (customer, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.customer.getKycProfiles( customer.id ).then(kycProfiles => {
                resolve(kycProfiles);
            })
        })
    },

    addToKycProfiles: async (customer, { profileId, lastReviewedOn, Status }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.customer.addToKycProfiles( customer.id, { profileId, lastReviewedOn, Status } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToKycProfiles: async (customer, { kycProfilesIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.customer.assignToKycProfiles( customer.id, kycProfilesIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    consents: async (customer, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.customer.getConsents( customer.id ).then(consents => {
                resolve(consents);
            })
        })
    },

    addToConsents: async (customer, { grantedOn, expiresOn, ConsentType, Status }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.customer.addToConsents( customer.id, { grantedOn, expiresOn, ConsentType, Status } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToConsents: async (customer, { consentsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.customer.assignToConsents( customer.id, consentsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    },
KycProfile: {
    
    customer: async (kycProfile, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.kycProfile.getCustomer( kycProfile.id ).then(customer => {
                resolve(customer);
            })
        })
    },

    addCustomer: async (kycProfile, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus }, { backend }) => {
        return await backend.kycProfile.addCustomer( kycProfile.id, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } );
    },

    assignCustomer: async (kycProfile, { customerId }, { backend }) => {
        return await backend.kycProfile.assignToCustomer( kycProfile.id, customerId );
    },

    unassignCustomer: async (_, { kycProfileId }, { backend }) => {
        return await backend.kycProfile.unassignFromCustomer( kycProfileId );
    },
        
    identityDocuments: async (kycProfile, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.kycProfile.getIdentityDocuments( kycProfile.id ).then(identityDocuments => {
                resolve(identityDocuments);
            })
        })
    },

    addToIdentityDocuments: async (kycProfile, { documentNumber, issuingCountry, expirationDate, DocumentType }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.kycProfile.addToIdentityDocuments( kycProfile.id, { documentNumber, issuingCountry, expirationDate, DocumentType } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToIdentityDocuments: async (kycProfile, { identityDocumentsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.kycProfile.assignToIdentityDocuments( kycProfile.id, identityDocumentsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    riskAssessments: async (kycProfile, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.kycProfile.getRiskAssessments( kycProfile.id ).then(riskAssessments => {
                resolve(riskAssessments);
            })
        })
    },

    addToRiskAssessments: async (kycProfile, { score, assessedOn, Rating }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.kycProfile.addToRiskAssessments( kycProfile.id, { score, assessedOn, Rating } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToRiskAssessments: async (kycProfile, { riskAssessmentsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.kycProfile.assignToRiskAssessments( kycProfile.id, riskAssessmentsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    screenings: async (kycProfile, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.kycProfile.getScreenings( kycProfile.id ).then(screenings => {
                resolve(screenings);
            })
        })
    },

    addToScreenings: async (kycProfile, { screeningDate, provider, Outcome }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.kycProfile.addToScreenings( kycProfile.id, { screeningDate, provider, Outcome } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToScreenings: async (kycProfile, { screeningsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.kycProfile.assignToScreenings( kycProfile.id, screeningsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    },
IdentityDocument: {
    
    kycProfile: async (identityDocument, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.identityDocument.getKycProfile( identityDocument.id ).then(kycProfile => {
                resolve(kycProfile);
            })
        })
    },

    addKycProfile: async (identityDocument, { profileId, lastReviewedOn, Status }, { backend }) => {
        return await backend.identityDocument.addKycProfile( identityDocument.id, { profileId, lastReviewedOn, Status } );
    },

    assignKycProfile: async (identityDocument, { kycProfileId }, { backend }) => {
        return await backend.identityDocument.assignToKycProfile( identityDocument.id, kycProfileId );
    },

    unassignKycProfile: async (_, { identityDocumentId }, { backend }) => {
        return await backend.identityDocument.unassignFromKycProfile( identityDocumentId );
    },
        },
RiskAssessment: {
    
    kycProfile: async (riskAssessment, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.riskAssessment.getKycProfile( riskAssessment.id ).then(kycProfile => {
                resolve(kycProfile);
            })
        })
    },

    addKycProfile: async (riskAssessment, { profileId, lastReviewedOn, Status }, { backend }) => {
        return await backend.riskAssessment.addKycProfile( riskAssessment.id, { profileId, lastReviewedOn, Status } );
    },

    assignKycProfile: async (riskAssessment, { kycProfileId }, { backend }) => {
        return await backend.riskAssessment.assignToKycProfile( riskAssessment.id, kycProfileId );
    },

    unassignKycProfile: async (_, { riskAssessmentId }, { backend }) => {
        return await backend.riskAssessment.unassignFromKycProfile( riskAssessmentId );
    },
        },
ScreeningResult: {
    
    kycProfile: async (screeningResult, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.screeningResult.getKycProfile( screeningResult.id ).then(kycProfile => {
                resolve(kycProfile);
            })
        })
    },

    addKycProfile: async (screeningResult, { profileId, lastReviewedOn, Status }, { backend }) => {
        return await backend.screeningResult.addKycProfile( screeningResult.id, { profileId, lastReviewedOn, Status } );
    },

    assignKycProfile: async (screeningResult, { kycProfileId }, { backend }) => {
        return await backend.screeningResult.assignToKycProfile( screeningResult.id, kycProfileId );
    },

    unassignKycProfile: async (_, { screeningResultId }, { backend }) => {
        return await backend.screeningResult.unassignFromKycProfile( screeningResultId );
    },
        },
BankingProduct: {
    
    bank: async (bankingProduct, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bankingProduct.getBank( bankingProduct.id ).then(bank => {
                resolve(bank);
            })
        })
    },

    addBank: async (bankingProduct, { name, legalName, swiftBic, headquartersCountry, website }, { backend }) => {
        return await backend.bankingProduct.addBank( bankingProduct.id, { name, legalName, swiftBic, headquartersCountry, website } );
    },

    assignBank: async (bankingProduct, { bankId }, { backend }) => {
        return await backend.bankingProduct.assignToBank( bankingProduct.id, bankId );
    },

    unassignBank: async (_, { bankingProductId }, { backend }) => {
        return await backend.bankingProduct.unassignFromBank( bankingProductId );
    },
        
    accounts: async (bankingProduct, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bankingProduct.getAccounts( bankingProduct.id ).then(accounts => {
                resolve(accounts);
            })
        })
    },

    addToAccounts: async (bankingProduct, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bankingProduct.addToAccounts( bankingProduct.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToAccounts: async (bankingProduct, { accountsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bankingProduct.assignToAccounts( bankingProduct.id, accountsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    loanAccounts: async (bankingProduct, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bankingProduct.getLoanAccounts( bankingProduct.id ).then(loanAccounts => {
                resolve(loanAccounts);
            })
        })
    },

    addToLoanAccounts: async (bankingProduct, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bankingProduct.addToLoanAccounts( bankingProduct.id, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToLoanAccounts: async (bankingProduct, { loanAccountsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bankingProduct.assignToLoanAccounts( bankingProduct.id, loanAccountsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    paymentCards: async (bankingProduct, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bankingProduct.getPaymentCards( bankingProduct.id ).then(paymentCards => {
                resolve(paymentCards);
            })
        })
    },

    addToPaymentCards: async (bankingProduct, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bankingProduct.addToPaymentCards( bankingProduct.id, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToPaymentCards: async (bankingProduct, { paymentCardsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.bankingProduct.assignToPaymentCards( bankingProduct.id, paymentCardsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    },
Account: {
    
    bank: async (account, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.account.getBank( account.id ).then(bank => {
                resolve(bank);
            })
        })
    },

    addBank: async (account, { name, legalName, swiftBic, headquartersCountry, website }, { backend }) => {
        return await backend.account.addBank( account.id, { name, legalName, swiftBic, headquartersCountry, website } );
    },

    assignBank: async (account, { bankId }, { backend }) => {
        return await backend.account.assignToBank( account.id, bankId );
    },

    unassignBank: async (_, { accountId }, { backend }) => {
        return await backend.account.unassignFromBank( accountId );
    },
    
    branch: async (account, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.account.getBranch( account.id ).then(branch => {
                resolve(branch);
            })
        })
    },

    addBranch: async (account, { name, branchCode, address, phone, openingHours }, { backend }) => {
        return await backend.account.addBranch( account.id, { name, branchCode, address, phone, openingHours } );
    },

    assignBranch: async (account, { branchId }, { backend }) => {
        return await backend.account.assignToBranch( account.id, branchId );
    },

    unassignBranch: async (_, { accountId }, { backend }) => {
        return await backend.account.unassignFromBranch( accountId );
    },
    
    product: async (account, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.account.getProduct( account.id ).then(bankingProduct => {
                resolve(bankingProduct);
            })
        })
    },

    addProduct: async (account, { productCode, name, description, ProductCategory }, { backend }) => {
        return await backend.account.addProduct( account.id, { productCode, name, description, ProductCategory } );
    },

    assignProduct: async (account, { productId }, { backend }) => {
        return await backend.account.assignToProduct( account.id, productId );
    },

    unassignProduct: async (_, { accountId }, { backend }) => {
        return await backend.account.unassignFromProduct( accountId );
    },
        
    owners: async (account, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.account.getOwners( account.id ).then(owners => {
                resolve(owners);
            })
        })
    },

    addToOwners: async (account, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.account.addToOwners( account.id, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToOwners: async (account, { ownersIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.account.assignToOwners( account.id, ownersIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    transactions: async (account, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.account.getTransactions( account.id ).then(transactions => {
                resolve(transactions);
            })
        })
    },

    addToTransactions: async (account, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.account.addToTransactions( account.id, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToTransactions: async (account, { transactionsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.account.assignToTransactions( account.id, transactionsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    statements: async (account, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.account.getStatements( account.id ).then(statements => {
                resolve(statements);
            })
        })
    },

    addToStatements: async (account, { statementNumber, periodStart, periodEnd, openingBalance, closingBalance, DeliveryMethod }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.account.addToStatements( account.id, { statementNumber, periodStart, periodEnd, openingBalance, closingBalance, DeliveryMethod } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToStatements: async (account, { statementsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.account.assignToStatements( account.id, statementsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    standingInstructions: async (account, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.account.getStandingInstructions( account.id ).then(standingInstructions => {
                resolve(standingInstructions);
            })
        })
    },

    addToStandingInstructions: async (account, { instructionId, amount, nextExecutionDate, Frequency, Status }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.account.addToStandingInstructions( account.id, { instructionId, amount, nextExecutionDate, Frequency, Status } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToStandingInstructions: async (account, { standingInstructionsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.account.assignToStandingInstructions( account.id, standingInstructionsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    feeCharges: async (account, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.account.getFeeCharges( account.id ).then(feeCharges => {
                resolve(feeCharges);
            })
        })
    },

    addToFeeCharges: async (account, { feeCode, amount, appliedOn, FeeType }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.account.addToFeeCharges( account.id, { feeCode, amount, appliedOn, FeeType } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToFeeCharges: async (account, { feeChargesIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.account.assignToFeeCharges( account.id, feeChargesIds ).then( result => {
                resolve ( result );
            })
        })
    },

    },
AccountStatement: {
    
    account: async (accountStatement, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.accountStatement.getAccount( accountStatement.id ).then(account => {
                resolve(account);
            })
        })
    },

    addAccount: async (accountStatement, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { backend }) => {
        return await backend.accountStatement.addAccount( accountStatement.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } );
    },

    assignAccount: async (accountStatement, { accountId }, { backend }) => {
        return await backend.accountStatement.assignToAccount( accountStatement.id, accountId );
    },

    unassignAccount: async (_, { accountStatementId }, { backend }) => {
        return await backend.accountStatement.unassignFromAccount( accountStatementId );
    },
        },
Transaction: {
    
    account: async (transaction, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.transaction.getAccount( transaction.id ).then(account => {
                resolve(account);
            })
        })
    },

    addAccount: async (transaction, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { backend }) => {
        return await backend.transaction.addAccount( transaction.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } );
    },

    assignAccount: async (transaction, { accountId }, { backend }) => {
        return await backend.transaction.assignToAccount( transaction.id, accountId );
    },

    unassignAccount: async (_, { transactionId }, { backend }) => {
        return await backend.transaction.unassignFromAccount( transactionId );
    },
    
    externalCounterparty: async (transaction, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.transaction.getExternalCounterparty( transaction.id ).then(externalAccount => {
                resolve(externalAccount);
            })
        })
    },

    addExternalCounterparty: async (transaction, { name, iban, accountNumber, bic, bankName, country }, { backend }) => {
        return await backend.transaction.addExternalCounterparty( transaction.id, { name, iban, accountNumber, bic, bankName, country } );
    },

    assignExternalCounterparty: async (transaction, { externalCounterpartyId }, { backend }) => {
        return await backend.transaction.assignToExternalCounterparty( transaction.id, externalCounterpartyId );
    },

    unassignExternalCounterparty: async (_, { transactionId }, { backend }) => {
        return await backend.transaction.unassignFromExternalCounterparty( transactionId );
    },
    
    paymentCard: async (transaction, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.transaction.getPaymentCard( transaction.id ).then(paymentCard => {
                resolve(paymentCard);
            })
        })
    },

    addPaymentCard: async (transaction, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network }, { backend }) => {
        return await backend.transaction.addPaymentCard( transaction.id, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network } );
    },

    assignPaymentCard: async (transaction, { paymentCardId }, { backend }) => {
        return await backend.transaction.assignToPaymentCard( transaction.id, paymentCardId );
    },

    unassignPaymentCard: async (_, { transactionId }, { backend }) => {
        return await backend.transaction.unassignFromPaymentCard( transactionId );
    },
    
    fundsTransfer: async (transaction, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.transaction.getFundsTransfer( transaction.id ).then(fundsTransfer => {
                resolve(fundsTransfer);
            })
        })
    },

    addFundsTransfer: async (transaction, { transferReference, amount, requestedDate, executionDate, purpose, feeAmount, Method, Status }, { backend }) => {
        return await backend.transaction.addFundsTransfer( transaction.id, { transferReference, amount, requestedDate, executionDate, purpose, feeAmount, Method, Status } );
    },

    assignFundsTransfer: async (transaction, { fundsTransferId }, { backend }) => {
        return await backend.transaction.assignToFundsTransfer( transaction.id, fundsTransferId );
    },

    unassignFundsTransfer: async (_, { transactionId }, { backend }) => {
        return await backend.transaction.unassignFromFundsTransfer( transactionId );
    },
    
    fxTrade: async (transaction, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.transaction.getFxTrade( transaction.id ).then(fXTrade => {
                resolve(fXTrade);
            })
        })
    },

    addFxTrade: async (transaction, { tradeReference, tradeDate, settlementDate, amountSold, amountBought, rate, Status }, { backend }) => {
        return await backend.transaction.addFxTrade( transaction.id, { tradeReference, tradeDate, settlementDate, amountSold, amountBought, rate, Status } );
    },

    assignFxTrade: async (transaction, { fxTradeId }, { backend }) => {
        return await backend.transaction.assignToFxTrade( transaction.id, fxTradeId );
    },

    unassignFxTrade: async (_, { transactionId }, { backend }) => {
        return await backend.transaction.unassignFromFxTrade( transactionId );
    },
    
    dispute: async (transaction, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.transaction.getDispute( transaction.id ).then(dispute => {
                resolve(dispute);
            })
        })
    },

    addDispute: async (transaction, { disputeReference, raisedOn, reason, Status }, { backend }) => {
        return await backend.transaction.addDispute( transaction.id, { disputeReference, raisedOn, reason, Status } );
    },

    assignDispute: async (transaction, { disputeId }, { backend }) => {
        return await backend.transaction.assignToDispute( transaction.id, disputeId );
    },

    unassignDispute: async (_, { transactionId }, { backend }) => {
        return await backend.transaction.unassignFromDispute( transactionId );
    },
        },
ExternalAccount: {
    
    customer: async (externalAccount, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.externalAccount.getCustomer( externalAccount.id ).then(customer => {
                resolve(customer);
            })
        })
    },

    addCustomer: async (externalAccount, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus }, { backend }) => {
        return await backend.externalAccount.addCustomer( externalAccount.id, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } );
    },

    assignCustomer: async (externalAccount, { customerId }, { backend }) => {
        return await backend.externalAccount.assignToCustomer( externalAccount.id, customerId );
    },

    unassignCustomer: async (_, { externalAccountId }, { backend }) => {
        return await backend.externalAccount.unassignFromCustomer( externalAccountId );
    },
        
    transactions: async (externalAccount, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.externalAccount.getTransactions( externalAccount.id ).then(transactions => {
                resolve(transactions);
            })
        })
    },

    addToTransactions: async (externalAccount, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.externalAccount.addToTransactions( externalAccount.id, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToTransactions: async (externalAccount, { transactionsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.externalAccount.assignToTransactions( externalAccount.id, transactionsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    },
FundsTransfer: {
    
    sourceAccount: async (fundsTransfer, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.fundsTransfer.getSourceAccount( fundsTransfer.id ).then(account => {
                resolve(account);
            })
        })
    },

    addSourceAccount: async (fundsTransfer, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { backend }) => {
        return await backend.fundsTransfer.addSourceAccount( fundsTransfer.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } );
    },

    assignSourceAccount: async (fundsTransfer, { sourceAccountId }, { backend }) => {
        return await backend.fundsTransfer.assignToSourceAccount( fundsTransfer.id, sourceAccountId );
    },

    unassignSourceAccount: async (_, { fundsTransferId }, { backend }) => {
        return await backend.fundsTransfer.unassignFromSourceAccount( fundsTransferId );
    },
    
    destinationAccount: async (fundsTransfer, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.fundsTransfer.getDestinationAccount( fundsTransfer.id ).then(account => {
                resolve(account);
            })
        })
    },

    addDestinationAccount: async (fundsTransfer, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { backend }) => {
        return await backend.fundsTransfer.addDestinationAccount( fundsTransfer.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } );
    },

    assignDestinationAccount: async (fundsTransfer, { destinationAccountId }, { backend }) => {
        return await backend.fundsTransfer.assignToDestinationAccount( fundsTransfer.id, destinationAccountId );
    },

    unassignDestinationAccount: async (_, { fundsTransferId }, { backend }) => {
        return await backend.fundsTransfer.unassignFromDestinationAccount( fundsTransferId );
    },
    
    externalBeneficiary: async (fundsTransfer, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.fundsTransfer.getExternalBeneficiary( fundsTransfer.id ).then(externalAccount => {
                resolve(externalAccount);
            })
        })
    },

    addExternalBeneficiary: async (fundsTransfer, { name, iban, accountNumber, bic, bankName, country }, { backend }) => {
        return await backend.fundsTransfer.addExternalBeneficiary( fundsTransfer.id, { name, iban, accountNumber, bic, bankName, country } );
    },

    assignExternalBeneficiary: async (fundsTransfer, { externalBeneficiaryId }, { backend }) => {
        return await backend.fundsTransfer.assignToExternalBeneficiary( fundsTransfer.id, externalBeneficiaryId );
    },

    unassignExternalBeneficiary: async (_, { fundsTransferId }, { backend }) => {
        return await backend.fundsTransfer.unassignFromExternalBeneficiary( fundsTransferId );
    },
    
    initiatedBy: async (fundsTransfer, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.fundsTransfer.getInitiatedBy( fundsTransfer.id ).then(customer => {
                resolve(customer);
            })
        })
    },

    addInitiatedBy: async (fundsTransfer, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus }, { backend }) => {
        return await backend.fundsTransfer.addInitiatedBy( fundsTransfer.id, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } );
    },

    assignInitiatedBy: async (fundsTransfer, { initiatedById }, { backend }) => {
        return await backend.fundsTransfer.assignToInitiatedBy( fundsTransfer.id, initiatedById );
    },

    unassignInitiatedBy: async (_, { fundsTransferId }, { backend }) => {
        return await backend.fundsTransfer.unassignFromInitiatedBy( fundsTransferId );
    },
        
    transactions: async (fundsTransfer, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.fundsTransfer.getTransactions( fundsTransfer.id ).then(transactions => {
                resolve(transactions);
            })
        })
    },

    addToTransactions: async (fundsTransfer, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.fundsTransfer.addToTransactions( fundsTransfer.id, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToTransactions: async (fundsTransfer, { transactionsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.fundsTransfer.assignToTransactions( fundsTransfer.id, transactionsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    },
StandingInstruction: {
    
    account: async (standingInstruction, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.standingInstruction.getAccount( standingInstruction.id ).then(account => {
                resolve(account);
            })
        })
    },

    addAccount: async (standingInstruction, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { backend }) => {
        return await backend.standingInstruction.addAccount( standingInstruction.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } );
    },

    assignAccount: async (standingInstruction, { accountId }, { backend }) => {
        return await backend.standingInstruction.assignToAccount( standingInstruction.id, accountId );
    },

    unassignAccount: async (_, { standingInstructionId }, { backend }) => {
        return await backend.standingInstruction.unassignFromAccount( standingInstructionId );
    },
    
    beneficiary: async (standingInstruction, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.standingInstruction.getBeneficiary( standingInstruction.id ).then(externalAccount => {
                resolve(externalAccount);
            })
        })
    },

    addBeneficiary: async (standingInstruction, { name, iban, accountNumber, bic, bankName, country }, { backend }) => {
        return await backend.standingInstruction.addBeneficiary( standingInstruction.id, { name, iban, accountNumber, bic, bankName, country } );
    },

    assignBeneficiary: async (standingInstruction, { beneficiaryId }, { backend }) => {
        return await backend.standingInstruction.assignToBeneficiary( standingInstruction.id, beneficiaryId );
    },

    unassignBeneficiary: async (_, { standingInstructionId }, { backend }) => {
        return await backend.standingInstruction.unassignFromBeneficiary( standingInstructionId );
    },
        },
PaymentCard: {
    
    bank: async (paymentCard, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.paymentCard.getBank( paymentCard.id ).then(bank => {
                resolve(bank);
            })
        })
    },

    addBank: async (paymentCard, { name, legalName, swiftBic, headquartersCountry, website }, { backend }) => {
        return await backend.paymentCard.addBank( paymentCard.id, { name, legalName, swiftBic, headquartersCountry, website } );
    },

    assignBank: async (paymentCard, { bankId }, { backend }) => {
        return await backend.paymentCard.assignToBank( paymentCard.id, bankId );
    },

    unassignBank: async (_, { paymentCardId }, { backend }) => {
        return await backend.paymentCard.unassignFromBank( paymentCardId );
    },
    
    account: async (paymentCard, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.paymentCard.getAccount( paymentCard.id ).then(account => {
                resolve(account);
            })
        })
    },

    addAccount: async (paymentCard, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { backend }) => {
        return await backend.paymentCard.addAccount( paymentCard.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } );
    },

    assignAccount: async (paymentCard, { accountId }, { backend }) => {
        return await backend.paymentCard.assignToAccount( paymentCard.id, accountId );
    },

    unassignAccount: async (_, { paymentCardId }, { backend }) => {
        return await backend.paymentCard.unassignFromAccount( paymentCardId );
    },
    
    customer: async (paymentCard, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.paymentCard.getCustomer( paymentCard.id ).then(customer => {
                resolve(customer);
            })
        })
    },

    addCustomer: async (paymentCard, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus }, { backend }) => {
        return await backend.paymentCard.addCustomer( paymentCard.id, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } );
    },

    assignCustomer: async (paymentCard, { customerId }, { backend }) => {
        return await backend.paymentCard.assignToCustomer( paymentCard.id, customerId );
    },

    unassignCustomer: async (_, { paymentCardId }, { backend }) => {
        return await backend.paymentCard.unassignFromCustomer( paymentCardId );
    },
        
    transactions: async (paymentCard, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.paymentCard.getTransactions( paymentCard.id ).then(transactions => {
                resolve(transactions);
            })
        })
    },

    addToTransactions: async (paymentCard, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.paymentCard.addToTransactions( paymentCard.id, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToTransactions: async (paymentCard, { transactionsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.paymentCard.assignToTransactions( paymentCard.id, transactionsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    },
LoanAccount: {
    
    bank: async (loanAccount, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.getBank( loanAccount.id ).then(bank => {
                resolve(bank);
            })
        })
    },

    addBank: async (loanAccount, { name, legalName, swiftBic, headquartersCountry, website }, { backend }) => {
        return await backend.loanAccount.addBank( loanAccount.id, { name, legalName, swiftBic, headquartersCountry, website } );
    },

    assignBank: async (loanAccount, { bankId }, { backend }) => {
        return await backend.loanAccount.assignToBank( loanAccount.id, bankId );
    },

    unassignBank: async (_, { loanAccountId }, { backend }) => {
        return await backend.loanAccount.unassignFromBank( loanAccountId );
    },
    
    branch: async (loanAccount, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.getBranch( loanAccount.id ).then(branch => {
                resolve(branch);
            })
        })
    },

    addBranch: async (loanAccount, { name, branchCode, address, phone, openingHours }, { backend }) => {
        return await backend.loanAccount.addBranch( loanAccount.id, { name, branchCode, address, phone, openingHours } );
    },

    assignBranch: async (loanAccount, { branchId }, { backend }) => {
        return await backend.loanAccount.assignToBranch( loanAccount.id, branchId );
    },

    unassignBranch: async (_, { loanAccountId }, { backend }) => {
        return await backend.loanAccount.unassignFromBranch( loanAccountId );
    },
    
    product: async (loanAccount, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.getProduct( loanAccount.id ).then(bankingProduct => {
                resolve(bankingProduct);
            })
        })
    },

    addProduct: async (loanAccount, { productCode, name, description, ProductCategory }, { backend }) => {
        return await backend.loanAccount.addProduct( loanAccount.id, { productCode, name, description, ProductCategory } );
    },

    assignProduct: async (loanAccount, { productId }, { backend }) => {
        return await backend.loanAccount.assignToProduct( loanAccount.id, productId );
    },

    unassignProduct: async (_, { loanAccountId }, { backend }) => {
        return await backend.loanAccount.unassignFromProduct( loanAccountId );
    },
        
    borrowers: async (loanAccount, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.getBorrowers( loanAccount.id ).then(borrowers => {
                resolve(borrowers);
            })
        })
    },

    addToBorrowers: async (loanAccount, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.addToBorrowers( loanAccount.id, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToBorrowers: async (loanAccount, { borrowersIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.assignToBorrowers( loanAccount.id, borrowersIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    repaymentSchedule: async (loanAccount, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.getRepaymentSchedule( loanAccount.id ).then(repaymentSchedule => {
                resolve(repaymentSchedule);
            })
        })
    },

    addToRepaymentSchedule: async (loanAccount, { installmentNumber, dueDate, principalDue, interestDue, totalDue, Status }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.addToRepaymentSchedule( loanAccount.id, { installmentNumber, dueDate, principalDue, interestDue, totalDue, Status } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToRepaymentSchedule: async (loanAccount, { repaymentScheduleIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.assignToRepaymentSchedule( loanAccount.id, repaymentScheduleIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    payments: async (loanAccount, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.getPayments( loanAccount.id ).then(payments => {
                resolve(payments);
            })
        })
    },

    addToPayments: async (loanAccount, { paymentReference, amount, paymentDate, Method, Status }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.addToPayments( loanAccount.id, { paymentReference, amount, paymentDate, Method, Status } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToPayments: async (loanAccount, { paymentsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.assignToPayments( loanAccount.id, paymentsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    collateral: async (loanAccount, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.getCollateral( loanAccount.id ).then(collateral => {
                resolve(collateral);
            })
        })
    },

    addToCollateral: async (loanAccount, { appraisedValue, description, location, CollateralType }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.addToCollateral( loanAccount.id, { appraisedValue, description, location, CollateralType } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToCollateral: async (loanAccount, { collateralIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.assignToCollateral( loanAccount.id, collateralIds ).then( result => {
                resolve ( result );
            })
        })
    },

    
    feeCharges: async (loanAccount, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.getFeeCharges( loanAccount.id ).then(feeCharges => {
                resolve(feeCharges);
            })
        })
    },

    addToFeeCharges: async (loanAccount, { feeCode, amount, appliedOn, FeeType }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.addToFeeCharges( loanAccount.id, { feeCode, amount, appliedOn, FeeType } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToFeeCharges: async (loanAccount, { feeChargesIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.loanAccount.assignToFeeCharges( loanAccount.id, feeChargesIds ).then( result => {
                resolve ( result );
            })
        })
    },

    },
RepaymentSchedule: {
    
    loanAccount: async (repaymentSchedule, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.repaymentSchedule.getLoanAccount( repaymentSchedule.id ).then(loanAccount => {
                resolve(loanAccount);
            })
        })
    },

    addLoanAccount: async (repaymentSchedule, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status }, { backend }) => {
        return await backend.repaymentSchedule.addLoanAccount( repaymentSchedule.id, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } );
    },

    assignLoanAccount: async (repaymentSchedule, { loanAccountId }, { backend }) => {
        return await backend.repaymentSchedule.assignToLoanAccount( repaymentSchedule.id, loanAccountId );
    },

    unassignLoanAccount: async (_, { repaymentScheduleId }, { backend }) => {
        return await backend.repaymentSchedule.unassignFromLoanAccount( repaymentScheduleId );
    },
    
    payment: async (repaymentSchedule, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.repaymentSchedule.getPayment( repaymentSchedule.id ).then(loanPayment => {
                resolve(loanPayment);
            })
        })
    },

    addPayment: async (repaymentSchedule, { paymentReference, amount, paymentDate, Method, Status }, { backend }) => {
        return await backend.repaymentSchedule.addPayment( repaymentSchedule.id, { paymentReference, amount, paymentDate, Method, Status } );
    },

    assignPayment: async (repaymentSchedule, { paymentId }, { backend }) => {
        return await backend.repaymentSchedule.assignToPayment( repaymentSchedule.id, paymentId );
    },

    unassignPayment: async (_, { repaymentScheduleId }, { backend }) => {
        return await backend.repaymentSchedule.unassignFromPayment( repaymentScheduleId );
    },
        },
LoanPayment: {
    
    loanAccount: async (loanPayment, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.loanPayment.getLoanAccount( loanPayment.id ).then(loanAccount => {
                resolve(loanAccount);
            })
        })
    },

    addLoanAccount: async (loanPayment, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status }, { backend }) => {
        return await backend.loanPayment.addLoanAccount( loanPayment.id, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } );
    },

    assignLoanAccount: async (loanPayment, { loanAccountId }, { backend }) => {
        return await backend.loanPayment.assignToLoanAccount( loanPayment.id, loanAccountId );
    },

    unassignLoanAccount: async (_, { loanPaymentId }, { backend }) => {
        return await backend.loanPayment.unassignFromLoanAccount( loanPaymentId );
    },
    
    transaction: async (loanPayment, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.loanPayment.getTransaction( loanPayment.id ).then(transaction => {
                resolve(transaction);
            })
        })
    },

    addTransaction: async (loanPayment, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel }, { backend }) => {
        return await backend.loanPayment.addTransaction( loanPayment.id, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } );
    },

    assignTransaction: async (loanPayment, { transactionId }, { backend }) => {
        return await backend.loanPayment.assignToTransaction( loanPayment.id, transactionId );
    },

    unassignTransaction: async (_, { loanPaymentId }, { backend }) => {
        return await backend.loanPayment.unassignFromTransaction( loanPaymentId );
    },
        },
Collateral: {
    
    loanAccount: async (collateral, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.collateral.getLoanAccount( collateral.id ).then(loanAccount => {
                resolve(loanAccount);
            })
        })
    },

    addLoanAccount: async (collateral, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status }, { backend }) => {
        return await backend.collateral.addLoanAccount( collateral.id, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } );
    },

    assignLoanAccount: async (collateral, { loanAccountId }, { backend }) => {
        return await backend.collateral.assignToLoanAccount( collateral.id, loanAccountId );
    },

    unassignLoanAccount: async (_, { collateralId }, { backend }) => {
        return await backend.collateral.unassignFromLoanAccount( collateralId );
    },
        },
FeeCharge: {
    
    account: async (feeCharge, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.feeCharge.getAccount( feeCharge.id ).then(account => {
                resolve(account);
            })
        })
    },

    addAccount: async (feeCharge, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { backend }) => {
        return await backend.feeCharge.addAccount( feeCharge.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } );
    },

    assignAccount: async (feeCharge, { accountId }, { backend }) => {
        return await backend.feeCharge.assignToAccount( feeCharge.id, accountId );
    },

    unassignAccount: async (_, { feeChargeId }, { backend }) => {
        return await backend.feeCharge.unassignFromAccount( feeChargeId );
    },
    
    loanAccount: async (feeCharge, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.feeCharge.getLoanAccount( feeCharge.id ).then(loanAccount => {
                resolve(loanAccount);
            })
        })
    },

    addLoanAccount: async (feeCharge, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status }, { backend }) => {
        return await backend.feeCharge.addLoanAccount( feeCharge.id, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } );
    },

    assignLoanAccount: async (feeCharge, { loanAccountId }, { backend }) => {
        return await backend.feeCharge.assignToLoanAccount( feeCharge.id, loanAccountId );
    },

    unassignLoanAccount: async (_, { feeChargeId }, { backend }) => {
        return await backend.feeCharge.unassignFromLoanAccount( feeChargeId );
    },
        },
ExchangeRate: {
    
    bank: async (exchangeRate, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.exchangeRate.getBank( exchangeRate.id ).then(bank => {
                resolve(bank);
            })
        })
    },

    addBank: async (exchangeRate, { name, legalName, swiftBic, headquartersCountry, website }, { backend }) => {
        return await backend.exchangeRate.addBank( exchangeRate.id, { name, legalName, swiftBic, headquartersCountry, website } );
    },

    assignBank: async (exchangeRate, { bankId }, { backend }) => {
        return await backend.exchangeRate.assignToBank( exchangeRate.id, bankId );
    },

    unassignBank: async (_, { exchangeRateId }, { backend }) => {
        return await backend.exchangeRate.unassignFromBank( exchangeRateId );
    },
        
    fxTrades: async (exchangeRate, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.exchangeRate.getFxTrades( exchangeRate.id ).then(fxTrades => {
                resolve(fxTrades);
            })
        })
    },

    addToFxTrades: async (exchangeRate, { tradeReference, tradeDate, settlementDate, amountSold, amountBought, rate, Status }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.exchangeRate.addToFxTrades( exchangeRate.id, { tradeReference, tradeDate, settlementDate, amountSold, amountBought, rate, Status } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToFxTrades: async (exchangeRate, { fxTradesIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.exchangeRate.assignToFxTrades( exchangeRate.id, fxTradesIds ).then( result => {
                resolve ( result );
            })
        })
    },

    },
FXTrade: {
    
    customer: async (fXTrade, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.fXTrade.getCustomer( fXTrade.id ).then(customer => {
                resolve(customer);
            })
        })
    },

    addCustomer: async (fXTrade, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus }, { backend }) => {
        return await backend.fXTrade.addCustomer( fXTrade.id, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } );
    },

    assignCustomer: async (fXTrade, { customerId }, { backend }) => {
        return await backend.fXTrade.assignToCustomer( fXTrade.id, customerId );
    },

    unassignCustomer: async (_, { fXTradeId }, { backend }) => {
        return await backend.fXTrade.unassignFromCustomer( fXTradeId );
    },
    
    bank: async (fXTrade, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.fXTrade.getBank( fXTrade.id ).then(bank => {
                resolve(bank);
            })
        })
    },

    addBank: async (fXTrade, { name, legalName, swiftBic, headquartersCountry, website }, { backend }) => {
        return await backend.fXTrade.addBank( fXTrade.id, { name, legalName, swiftBic, headquartersCountry, website } );
    },

    assignBank: async (fXTrade, { bankId }, { backend }) => {
        return await backend.fXTrade.assignToBank( fXTrade.id, bankId );
    },

    unassignBank: async (_, { fXTradeId }, { backend }) => {
        return await backend.fXTrade.unassignFromBank( fXTradeId );
    },
    
    exchangeRate: async (fXTrade, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.fXTrade.getExchangeRate( fXTrade.id ).then(exchangeRate => {
                resolve(exchangeRate);
            })
        })
    },

    addExchangeRate: async (fXTrade, { baseCurrency, counterCurrency, rate, asOf, source }, { backend }) => {
        return await backend.fXTrade.addExchangeRate( fXTrade.id, { baseCurrency, counterCurrency, rate, asOf, source } );
    },

    assignExchangeRate: async (fXTrade, { exchangeRateId }, { backend }) => {
        return await backend.fXTrade.assignToExchangeRate( fXTrade.id, exchangeRateId );
    },

    unassignExchangeRate: async (_, { fXTradeId }, { backend }) => {
        return await backend.fXTrade.unassignFromExchangeRate( fXTradeId );
    },
    
    sourceAccount: async (fXTrade, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.fXTrade.getSourceAccount( fXTrade.id ).then(account => {
                resolve(account);
            })
        })
    },

    addSourceAccount: async (fXTrade, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { backend }) => {
        return await backend.fXTrade.addSourceAccount( fXTrade.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } );
    },

    assignSourceAccount: async (fXTrade, { sourceAccountId }, { backend }) => {
        return await backend.fXTrade.assignToSourceAccount( fXTrade.id, sourceAccountId );
    },

    unassignSourceAccount: async (_, { fXTradeId }, { backend }) => {
        return await backend.fXTrade.unassignFromSourceAccount( fXTradeId );
    },
    
    destinationAccount: async (fXTrade, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.fXTrade.getDestinationAccount( fXTrade.id ).then(account => {
                resolve(account);
            })
        })
    },

    addDestinationAccount: async (fXTrade, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { backend }) => {
        return await backend.fXTrade.addDestinationAccount( fXTrade.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } );
    },

    assignDestinationAccount: async (fXTrade, { destinationAccountId }, { backend }) => {
        return await backend.fXTrade.assignToDestinationAccount( fXTrade.id, destinationAccountId );
    },

    unassignDestinationAccount: async (_, { fXTradeId }, { backend }) => {
        return await backend.fXTrade.unassignFromDestinationAccount( fXTradeId );
    },
    
    transaction: async (fXTrade, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.fXTrade.getTransaction( fXTrade.id ).then(transaction => {
                resolve(transaction);
            })
        })
    },

    addTransaction: async (fXTrade, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel }, { backend }) => {
        return await backend.fXTrade.addTransaction( fXTrade.id, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } );
    },

    assignTransaction: async (fXTrade, { transactionId }, { backend }) => {
        return await backend.fXTrade.assignToTransaction( fXTrade.id, transactionId );
    },

    unassignTransaction: async (_, { fXTradeId }, { backend }) => {
        return await backend.fXTrade.unassignFromTransaction( fXTradeId );
    },
        },
Dispute: {
    
    transaction: async (dispute, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.dispute.getTransaction( dispute.id ).then(transaction => {
                resolve(transaction);
            })
        })
    },

    addTransaction: async (dispute, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel }, { backend }) => {
        return await backend.dispute.addTransaction( dispute.id, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } );
    },

    assignTransaction: async (dispute, { transactionId }, { backend }) => {
        return await backend.dispute.assignToTransaction( dispute.id, transactionId );
    },

    unassignTransaction: async (_, { disputeId }, { backend }) => {
        return await backend.dispute.unassignFromTransaction( disputeId );
    },
    
    customer: async (dispute, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.dispute.getCustomer( dispute.id ).then(customer => {
                resolve(customer);
            })
        })
    },

    addCustomer: async (dispute, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus }, { backend }) => {
        return await backend.dispute.addCustomer( dispute.id, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } );
    },

    assignCustomer: async (dispute, { customerId }, { backend }) => {
        return await backend.dispute.assignToCustomer( dispute.id, customerId );
    },

    unassignCustomer: async (_, { disputeId }, { backend }) => {
        return await backend.dispute.unassignFromCustomer( disputeId );
    },
    
    account: async (dispute, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.dispute.getAccount( dispute.id ).then(account => {
                resolve(account);
            })
        })
    },

    addAccount: async (dispute, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { backend }) => {
        return await backend.dispute.addAccount( dispute.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } );
    },

    assignAccount: async (dispute, { accountId }, { backend }) => {
        return await backend.dispute.assignToAccount( dispute.id, accountId );
    },

    unassignAccount: async (_, { disputeId }, { backend }) => {
        return await backend.dispute.unassignFromAccount( disputeId );
    },
    
    paymentCard: async (dispute, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.dispute.getPaymentCard( dispute.id ).then(paymentCard => {
                resolve(paymentCard);
            })
        })
    },

    addPaymentCard: async (dispute, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network }, { backend }) => {
        return await backend.dispute.addPaymentCard( dispute.id, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network } );
    },

    assignPaymentCard: async (dispute, { paymentCardId }, { backend }) => {
        return await backend.dispute.assignToPaymentCard( dispute.id, paymentCardId );
    },

    unassignPaymentCard: async (_, { disputeId }, { backend }) => {
        return await backend.dispute.unassignFromPaymentCard( disputeId );
    },
        },
Consent: {
    
    customer: async (consent, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.consent.getCustomer( consent.id ).then(customer => {
                resolve(customer);
            })
        })
    },

    addCustomer: async (consent, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus }, { backend }) => {
        return await backend.consent.addCustomer( consent.id, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } );
    },

    assignCustomer: async (consent, { customerId }, { backend }) => {
        return await backend.consent.assignToCustomer( consent.id, customerId );
    },

    unassignCustomer: async (_, { consentId }, { backend }) => {
        return await backend.consent.unassignFromCustomer( consentId );
    },
    
    bank: async (consent, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.consent.getBank( consent.id ).then(bank => {
                resolve(bank);
            })
        })
    },

    addBank: async (consent, { name, legalName, swiftBic, headquartersCountry, website }, { backend }) => {
        return await backend.consent.addBank( consent.id, { name, legalName, swiftBic, headquartersCountry, website } );
    },

    assignBank: async (consent, { bankId }, { backend }) => {
        return await backend.consent.assignToBank( consent.id, bankId );
    },

    unassignBank: async (_, { consentId }, { backend }) => {
        return await backend.consent.unassignFromBank( consentId );
    },
    
    thirdPartyProvider: async (consent, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.consent.getThirdPartyProvider( consent.id ).then(thirdPartyProvider => {
                resolve(thirdPartyProvider);
            })
        })
    },

    addThirdPartyProvider: async (consent, { name, registrationId, website }, { backend }) => {
        return await backend.consent.addThirdPartyProvider( consent.id, { name, registrationId, website } );
    },

    assignThirdPartyProvider: async (consent, { thirdPartyProviderId }, { backend }) => {
        return await backend.consent.assignToThirdPartyProvider( consent.id, thirdPartyProviderId );
    },

    unassignThirdPartyProvider: async (_, { consentId }, { backend }) => {
        return await backend.consent.unassignFromThirdPartyProvider( consentId );
    },
        
    authorizedAccounts: async (consent, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.consent.getAuthorizedAccounts( consent.id ).then(authorizedAccounts => {
                resolve(authorizedAccounts);
            })
        })
    },

    addToAuthorizedAccounts: async (consent, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.consent.addToAuthorizedAccounts( consent.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToAuthorizedAccounts: async (consent, { authorizedAccountsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.consent.assignToAuthorizedAccounts( consent.id, authorizedAccountsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    },
ThirdPartyProvider: {
    
    bank: async (thirdPartyProvider, { id }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.thirdPartyProvider.getBank( thirdPartyProvider.id ).then(bank => {
                resolve(bank);
            })
        })
    },

    addBank: async (thirdPartyProvider, { name, legalName, swiftBic, headquartersCountry, website }, { backend }) => {
        return await backend.thirdPartyProvider.addBank( thirdPartyProvider.id, { name, legalName, swiftBic, headquartersCountry, website } );
    },

    assignBank: async (thirdPartyProvider, { bankId }, { backend }) => {
        return await backend.thirdPartyProvider.assignToBank( thirdPartyProvider.id, bankId );
    },

    unassignBank: async (_, { thirdPartyProviderId }, { backend }) => {
        return await backend.thirdPartyProvider.unassignFromBank( thirdPartyProviderId );
    },
        
    consents: async (thirdPartyProvider, {}, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.thirdPartyProvider.getConsents( thirdPartyProvider.id ).then(consents => {
                resolve(consents);
            })
        })
    },

    addToConsents: async (thirdPartyProvider, { grantedOn, expiresOn, ConsentType, Status }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.thirdPartyProvider.addToConsents( thirdPartyProvider.id, { grantedOn, expiresOn, ConsentType, Status } ).then( result => {
                resolve ( result );
            })
        })
    },

    assignToConsents: async (thirdPartyProvider, { consentsIds }, { backend }) => {
        return new Promise(function(resolve, reject) {
            backend.thirdPartyProvider.assignToConsents( thirdPartyProvider.id, consentsIds ).then( result => {
                resolve ( result );
            })
        })
    },

    },
};

