const { paginateResults } = require('./utils');

module.exports = {

  Query: {
	  
//////////////////////////
// Bank
//////////////////////////
    bank: async (_, { id }, { dataSources }) => {
    	return await dataSources.BankAPI.find( id );
	},

    banks: async (_, { pageSize = 25, after }, { dataSources }) => {
      const all = await dataSources.BankAPI.findAll();

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
    branch: async (_, { id }, { dataSources }) => {
    	return await dataSources.BranchAPI.find( id );
	},

    branchs: async (_, { pageSize = 25, after }, { dataSources }) => {
      const all = await dataSources.BranchAPI.findAll();

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
    aTM: async (_, { id }, { dataSources }) => {
    	return await dataSources.ATMAPI.find( id );
	},

    aTMs: async (_, { pageSize = 25, after }, { dataSources }) => {
      const all = await dataSources.ATMAPI.findAll();

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
    customer: async (_, { id }, { dataSources }) => {
    	return await dataSources.CustomerAPI.find( id );
	},

    customers: async (_, { pageSize = 25, after }, { dataSources }) => {
      const all = await dataSources.CustomerAPI.findAll();

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
    kycProfile: async (_, { id }, { dataSources }) => {
    	return await dataSources.KycProfileAPI.find( id );
	},

    kycProfiles: async (_, { pageSize = 25, after }, { dataSources }) => {
      const all = await dataSources.KycProfileAPI.findAll();

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
    identityDocument: async (_, { id }, { dataSources }) => {
    	return await dataSources.IdentityDocumentAPI.find( id );
	},

    identityDocuments: async (_, { pageSize = 25, after }, { dataSources }) => {
      const all = await dataSources.IdentityDocumentAPI.findAll();

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
    riskAssessment: async (_, { id }, { dataSources }) => {
    	return await dataSources.RiskAssessmentAPI.find( id );
	},

    riskAssessments: async (_, { pageSize = 25, after }, { dataSources }) => {
      const all = await dataSources.RiskAssessmentAPI.findAll();

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
    screeningResult: async (_, { id }, { dataSources }) => {
    	return await dataSources.ScreeningResultAPI.find( id );
	},

    screeningResults: async (_, { pageSize = 25, after }, { dataSources }) => {
      const all = await dataSources.ScreeningResultAPI.findAll();

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
    bankingProduct: async (_, { id }, { dataSources }) => {
    	return await dataSources.BankingProductAPI.find( id );
	},

    bankingProducts: async (_, { pageSize = 25, after }, { dataSources }) => {
      const all = await dataSources.BankingProductAPI.findAll();

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
    account: async (_, { id }, { dataSources }) => {
    	return await dataSources.AccountAPI.find( id );
	},

    accounts: async (_, { pageSize = 25, after }, { dataSources }) => {
      const all = await dataSources.AccountAPI.findAll();

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
    accountStatement: async (_, { id }, { dataSources }) => {
    	return await dataSources.AccountStatementAPI.find( id );
	},

    accountStatements: async (_, { pageSize = 25, after }, { dataSources }) => {
      const all = await dataSources.AccountStatementAPI.findAll();

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
    transaction: async (_, { id }, { dataSources }) => {
    	return await dataSources.TransactionAPI.find( id );
	},

    transactions: async (_, { pageSize = 25, after }, { dataSources }) => {
      const all = await dataSources.TransactionAPI.findAll();

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
    externalAccount: async (_, { id }, { dataSources }) => {
    	return await dataSources.ExternalAccountAPI.find( id );
	},

    externalAccounts: async (_, { pageSize = 25, after }, { dataSources }) => {
      const all = await dataSources.ExternalAccountAPI.findAll();

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
    fundsTransfer: async (_, { id }, { dataSources }) => {
    	return await dataSources.FundsTransferAPI.find( id );
	},

    fundsTransfers: async (_, { pageSize = 25, after }, { dataSources }) => {
      const all = await dataSources.FundsTransferAPI.findAll();

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
    standingInstruction: async (_, { id }, { dataSources }) => {
    	return await dataSources.StandingInstructionAPI.find( id );
	},

    standingInstructions: async (_, { pageSize = 25, after }, { dataSources }) => {
      const all = await dataSources.StandingInstructionAPI.findAll();

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
    paymentCard: async (_, { id }, { dataSources }) => {
    	return await dataSources.PaymentCardAPI.find( id );
	},

    paymentCards: async (_, { pageSize = 25, after }, { dataSources }) => {
      const all = await dataSources.PaymentCardAPI.findAll();

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
    loanAccount: async (_, { id }, { dataSources }) => {
    	return await dataSources.LoanAccountAPI.find( id );
	},

    loanAccounts: async (_, { pageSize = 25, after }, { dataSources }) => {
      const all = await dataSources.LoanAccountAPI.findAll();

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
    repaymentSchedule: async (_, { id }, { dataSources }) => {
    	return await dataSources.RepaymentScheduleAPI.find( id );
	},

    repaymentSchedules: async (_, { pageSize = 25, after }, { dataSources }) => {
      const all = await dataSources.RepaymentScheduleAPI.findAll();

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
    loanPayment: async (_, { id }, { dataSources }) => {
    	return await dataSources.LoanPaymentAPI.find( id );
	},

    loanPayments: async (_, { pageSize = 25, after }, { dataSources }) => {
      const all = await dataSources.LoanPaymentAPI.findAll();

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
    collateral: async (_, { id }, { dataSources }) => {
    	return await dataSources.CollateralAPI.find( id );
	},

    collaterals: async (_, { pageSize = 25, after }, { dataSources }) => {
      const all = await dataSources.CollateralAPI.findAll();

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
    feeCharge: async (_, { id }, { dataSources }) => {
    	return await dataSources.FeeChargeAPI.find( id );
	},

    feeCharges: async (_, { pageSize = 25, after }, { dataSources }) => {
      const all = await dataSources.FeeChargeAPI.findAll();

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
    exchangeRate: async (_, { id }, { dataSources }) => {
    	return await dataSources.ExchangeRateAPI.find( id );
	},

    exchangeRates: async (_, { pageSize = 25, after }, { dataSources }) => {
      const all = await dataSources.ExchangeRateAPI.findAll();

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
    fXTrade: async (_, { id }, { dataSources }) => {
    	return await dataSources.FXTradeAPI.find( id );
	},

    fXTrades: async (_, { pageSize = 25, after }, { dataSources }) => {
      const all = await dataSources.FXTradeAPI.findAll();

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
    dispute: async (_, { id }, { dataSources }) => {
    	return await dataSources.DisputeAPI.find( id );
	},

    disputes: async (_, { pageSize = 25, after }, { dataSources }) => {
      const all = await dataSources.DisputeAPI.findAll();

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
    consent: async (_, { id }, { dataSources }) => {
    	return await dataSources.ConsentAPI.find( id );
	},

    consents: async (_, { pageSize = 25, after }, { dataSources }) => {
      const all = await dataSources.ConsentAPI.findAll();

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
    thirdPartyProvider: async (_, { id }, { dataSources }) => {
    	return await dataSources.ThirdPartyProviderAPI.find( id );
	},

    thirdPartyProviders: async (_, { pageSize = 25, after }, { dataSources }) => {
      const all = await dataSources.ThirdPartyProviderAPI.findAll();

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
	addBank: async (_, { name, legalName, swiftBic, headquartersCountry, website }, { dataSources }) => {
		return await dataSources.BankAPI.add( { name, legalName, swiftBic, headquartersCountry, website } );		
	},

	updateBank: async (_, { name, legalName, swiftBic, headquartersCountry, website, id }, { dataSources }) => {
		return await dataSources.BankAPI.update( { name, legalName, swiftBic, headquartersCountry, website }, id );	
	},

	removeBank: async (_, { id }, { dataSources }) => {
		return await dataSources.BankAPI.remove( { id } );	
	},
//////////////////////////
// Branch
//////////////////////////
	addBranch: async (_, { name, branchCode, address, phone, openingHours }, { dataSources }) => {
		return await dataSources.BranchAPI.add( { name, branchCode, address, phone, openingHours } );		
	},

	updateBranch: async (_, { name, branchCode, address, phone, openingHours, id }, { dataSources }) => {
		return await dataSources.BranchAPI.update( { name, branchCode, address, phone, openingHours }, id );	
	},

	removeBranch: async (_, { id }, { dataSources }) => {
		return await dataSources.BranchAPI.remove( { id } );	
	},
//////////////////////////
// ATM
//////////////////////////
	addATM: async (_, { terminalId, location, Status }, { dataSources }) => {
		return await dataSources.ATMAPI.add( { terminalId, location, Status } );		
	},

	updateATM: async (_, { terminalId, location, Status, id }, { dataSources }) => {
		return await dataSources.ATMAPI.update( { terminalId, location, Status }, id );	
	},

	removeATM: async (_, { id }, { dataSources }) => {
		return await dataSources.ATMAPI.remove( { id } );	
	},
//////////////////////////
// Customer
//////////////////////////
	addCustomer: async (_, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus }, { dataSources }) => {
		return await dataSources.CustomerAPI.add( { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } );		
	},

	updateCustomer: async (_, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus, id }, { dataSources }) => {
		return await dataSources.CustomerAPI.update( { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus }, id );	
	},

	removeCustomer: async (_, { id }, { dataSources }) => {
		return await dataSources.CustomerAPI.remove( { id } );	
	},
//////////////////////////
// KycProfile
//////////////////////////
	addKycProfile: async (_, { profileId, lastReviewedOn, Status }, { dataSources }) => {
		return await dataSources.KycProfileAPI.add( { profileId, lastReviewedOn, Status } );		
	},

	updateKycProfile: async (_, { profileId, lastReviewedOn, Status, id }, { dataSources }) => {
		return await dataSources.KycProfileAPI.update( { profileId, lastReviewedOn, Status }, id );	
	},

	removeKycProfile: async (_, { id }, { dataSources }) => {
		return await dataSources.KycProfileAPI.remove( { id } );	
	},
//////////////////////////
// IdentityDocument
//////////////////////////
	addIdentityDocument: async (_, { documentNumber, issuingCountry, expirationDate, DocumentType }, { dataSources }) => {
		return await dataSources.IdentityDocumentAPI.add( { documentNumber, issuingCountry, expirationDate, DocumentType } );		
	},

	updateIdentityDocument: async (_, { documentNumber, issuingCountry, expirationDate, DocumentType, id }, { dataSources }) => {
		return await dataSources.IdentityDocumentAPI.update( { documentNumber, issuingCountry, expirationDate, DocumentType }, id );	
	},

	removeIdentityDocument: async (_, { id }, { dataSources }) => {
		return await dataSources.IdentityDocumentAPI.remove( { id } );	
	},
//////////////////////////
// RiskAssessment
//////////////////////////
	addRiskAssessment: async (_, { score, assessedOn, Rating }, { dataSources }) => {
		return await dataSources.RiskAssessmentAPI.add( { score, assessedOn, Rating } );		
	},

	updateRiskAssessment: async (_, { score, assessedOn, Rating, id }, { dataSources }) => {
		return await dataSources.RiskAssessmentAPI.update( { score, assessedOn, Rating }, id );	
	},

	removeRiskAssessment: async (_, { id }, { dataSources }) => {
		return await dataSources.RiskAssessmentAPI.remove( { id } );	
	},
//////////////////////////
// ScreeningResult
//////////////////////////
	addScreeningResult: async (_, { screeningDate, provider, Outcome }, { dataSources }) => {
		return await dataSources.ScreeningResultAPI.add( { screeningDate, provider, Outcome } );		
	},

	updateScreeningResult: async (_, { screeningDate, provider, Outcome, id }, { dataSources }) => {
		return await dataSources.ScreeningResultAPI.update( { screeningDate, provider, Outcome }, id );	
	},

	removeScreeningResult: async (_, { id }, { dataSources }) => {
		return await dataSources.ScreeningResultAPI.remove( { id } );	
	},
//////////////////////////
// BankingProduct
//////////////////////////
	addBankingProduct: async (_, { productCode, name, description, ProductCategory }, { dataSources }) => {
		return await dataSources.BankingProductAPI.add( { productCode, name, description, ProductCategory } );		
	},

	updateBankingProduct: async (_, { productCode, name, description, ProductCategory, id }, { dataSources }) => {
		return await dataSources.BankingProductAPI.update( { productCode, name, description, ProductCategory }, id );	
	},

	removeBankingProduct: async (_, { id }, { dataSources }) => {
		return await dataSources.BankingProductAPI.remove( { id } );	
	},
//////////////////////////
// Account
//////////////////////////
	addAccount: async (_, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { dataSources }) => {
		return await dataSources.AccountAPI.add( { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } );		
	},

	updateAccount: async (_, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status, id }, { dataSources }) => {
		return await dataSources.AccountAPI.update( { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, id );	
	},

	removeAccount: async (_, { id }, { dataSources }) => {
		return await dataSources.AccountAPI.remove( { id } );	
	},
//////////////////////////
// AccountStatement
//////////////////////////
	addAccountStatement: async (_, { statementNumber, periodStart, periodEnd, openingBalance, closingBalance, DeliveryMethod }, { dataSources }) => {
		return await dataSources.AccountStatementAPI.add( { statementNumber, periodStart, periodEnd, openingBalance, closingBalance, DeliveryMethod } );		
	},

	updateAccountStatement: async (_, { statementNumber, periodStart, periodEnd, openingBalance, closingBalance, DeliveryMethod, id }, { dataSources }) => {
		return await dataSources.AccountStatementAPI.update( { statementNumber, periodStart, periodEnd, openingBalance, closingBalance, DeliveryMethod }, id );	
	},

	removeAccountStatement: async (_, { id }, { dataSources }) => {
		return await dataSources.AccountStatementAPI.remove( { id } );	
	},
//////////////////////////
// Transaction
//////////////////////////
	addTransaction: async (_, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel }, { dataSources }) => {
		return await dataSources.TransactionAPI.add( { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } );		
	},

	updateTransaction: async (_, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel, id }, { dataSources }) => {
		return await dataSources.TransactionAPI.update( { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel }, id );	
	},

	removeTransaction: async (_, { id }, { dataSources }) => {
		return await dataSources.TransactionAPI.remove( { id } );	
	},
//////////////////////////
// ExternalAccount
//////////////////////////
	addExternalAccount: async (_, { name, iban, accountNumber, bic, bankName, country }, { dataSources }) => {
		return await dataSources.ExternalAccountAPI.add( { name, iban, accountNumber, bic, bankName, country } );		
	},

	updateExternalAccount: async (_, { name, iban, accountNumber, bic, bankName, country, id }, { dataSources }) => {
		return await dataSources.ExternalAccountAPI.update( { name, iban, accountNumber, bic, bankName, country }, id );	
	},

	removeExternalAccount: async (_, { id }, { dataSources }) => {
		return await dataSources.ExternalAccountAPI.remove( { id } );	
	},
//////////////////////////
// FundsTransfer
//////////////////////////
	addFundsTransfer: async (_, { transferReference, amount, requestedDate, executionDate, purpose, feeAmount, Method, Status }, { dataSources }) => {
		return await dataSources.FundsTransferAPI.add( { transferReference, amount, requestedDate, executionDate, purpose, feeAmount, Method, Status } );		
	},

	updateFundsTransfer: async (_, { transferReference, amount, requestedDate, executionDate, purpose, feeAmount, Method, Status, id }, { dataSources }) => {
		return await dataSources.FundsTransferAPI.update( { transferReference, amount, requestedDate, executionDate, purpose, feeAmount, Method, Status }, id );	
	},

	removeFundsTransfer: async (_, { id }, { dataSources }) => {
		return await dataSources.FundsTransferAPI.remove( { id } );	
	},
//////////////////////////
// StandingInstruction
//////////////////////////
	addStandingInstruction: async (_, { instructionId, amount, nextExecutionDate, Frequency, Status }, { dataSources }) => {
		return await dataSources.StandingInstructionAPI.add( { instructionId, amount, nextExecutionDate, Frequency, Status } );		
	},

	updateStandingInstruction: async (_, { instructionId, amount, nextExecutionDate, Frequency, Status, id }, { dataSources }) => {
		return await dataSources.StandingInstructionAPI.update( { instructionId, amount, nextExecutionDate, Frequency, Status }, id );	
	},

	removeStandingInstruction: async (_, { id }, { dataSources }) => {
		return await dataSources.StandingInstructionAPI.remove( { id } );	
	},
//////////////////////////
// PaymentCard
//////////////////////////
	addPaymentCard: async (_, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network }, { dataSources }) => {
		return await dataSources.PaymentCardAPI.add( { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network } );		
	},

	updatePaymentCard: async (_, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network, id }, { dataSources }) => {
		return await dataSources.PaymentCardAPI.update( { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network }, id );	
	},

	removePaymentCard: async (_, { id }, { dataSources }) => {
		return await dataSources.PaymentCardAPI.remove( { id } );	
	},
//////////////////////////
// LoanAccount
//////////////////////////
	addLoanAccount: async (_, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status }, { dataSources }) => {
		return await dataSources.LoanAccountAPI.add( { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } );		
	},

	updateLoanAccount: async (_, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status, id }, { dataSources }) => {
		return await dataSources.LoanAccountAPI.update( { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status }, id );	
	},

	removeLoanAccount: async (_, { id }, { dataSources }) => {
		return await dataSources.LoanAccountAPI.remove( { id } );	
	},
//////////////////////////
// RepaymentSchedule
//////////////////////////
	addRepaymentSchedule: async (_, { installmentNumber, dueDate, principalDue, interestDue, totalDue, Status }, { dataSources }) => {
		return await dataSources.RepaymentScheduleAPI.add( { installmentNumber, dueDate, principalDue, interestDue, totalDue, Status } );		
	},

	updateRepaymentSchedule: async (_, { installmentNumber, dueDate, principalDue, interestDue, totalDue, Status, id }, { dataSources }) => {
		return await dataSources.RepaymentScheduleAPI.update( { installmentNumber, dueDate, principalDue, interestDue, totalDue, Status }, id );	
	},

	removeRepaymentSchedule: async (_, { id }, { dataSources }) => {
		return await dataSources.RepaymentScheduleAPI.remove( { id } );	
	},
//////////////////////////
// LoanPayment
//////////////////////////
	addLoanPayment: async (_, { paymentReference, amount, paymentDate, Method, Status }, { dataSources }) => {
		return await dataSources.LoanPaymentAPI.add( { paymentReference, amount, paymentDate, Method, Status } );		
	},

	updateLoanPayment: async (_, { paymentReference, amount, paymentDate, Method, Status, id }, { dataSources }) => {
		return await dataSources.LoanPaymentAPI.update( { paymentReference, amount, paymentDate, Method, Status }, id );	
	},

	removeLoanPayment: async (_, { id }, { dataSources }) => {
		return await dataSources.LoanPaymentAPI.remove( { id } );	
	},
//////////////////////////
// Collateral
//////////////////////////
	addCollateral: async (_, { appraisedValue, description, location, CollateralType }, { dataSources }) => {
		return await dataSources.CollateralAPI.add( { appraisedValue, description, location, CollateralType } );		
	},

	updateCollateral: async (_, { appraisedValue, description, location, CollateralType, id }, { dataSources }) => {
		return await dataSources.CollateralAPI.update( { appraisedValue, description, location, CollateralType }, id );	
	},

	removeCollateral: async (_, { id }, { dataSources }) => {
		return await dataSources.CollateralAPI.remove( { id } );	
	},
//////////////////////////
// FeeCharge
//////////////////////////
	addFeeCharge: async (_, { feeCode, amount, appliedOn, FeeType }, { dataSources }) => {
		return await dataSources.FeeChargeAPI.add( { feeCode, amount, appliedOn, FeeType } );		
	},

	updateFeeCharge: async (_, { feeCode, amount, appliedOn, FeeType, id }, { dataSources }) => {
		return await dataSources.FeeChargeAPI.update( { feeCode, amount, appliedOn, FeeType }, id );	
	},

	removeFeeCharge: async (_, { id }, { dataSources }) => {
		return await dataSources.FeeChargeAPI.remove( { id } );	
	},
//////////////////////////
// ExchangeRate
//////////////////////////
	addExchangeRate: async (_, { baseCurrency, counterCurrency, rate, asOf, source }, { dataSources }) => {
		return await dataSources.ExchangeRateAPI.add( { baseCurrency, counterCurrency, rate, asOf, source } );		
	},

	updateExchangeRate: async (_, { baseCurrency, counterCurrency, rate, asOf, source, id }, { dataSources }) => {
		return await dataSources.ExchangeRateAPI.update( { baseCurrency, counterCurrency, rate, asOf, source }, id );	
	},

	removeExchangeRate: async (_, { id }, { dataSources }) => {
		return await dataSources.ExchangeRateAPI.remove( { id } );	
	},
//////////////////////////
// FXTrade
//////////////////////////
	addFXTrade: async (_, { tradeReference, tradeDate, settlementDate, amountSold, amountBought, rate, Status }, { dataSources }) => {
		return await dataSources.FXTradeAPI.add( { tradeReference, tradeDate, settlementDate, amountSold, amountBought, rate, Status } );		
	},

	updateFXTrade: async (_, { tradeReference, tradeDate, settlementDate, amountSold, amountBought, rate, Status, id }, { dataSources }) => {
		return await dataSources.FXTradeAPI.update( { tradeReference, tradeDate, settlementDate, amountSold, amountBought, rate, Status }, id );	
	},

	removeFXTrade: async (_, { id }, { dataSources }) => {
		return await dataSources.FXTradeAPI.remove( { id } );	
	},
//////////////////////////
// Dispute
//////////////////////////
	addDispute: async (_, { disputeReference, raisedOn, reason, Status }, { dataSources }) => {
		return await dataSources.DisputeAPI.add( { disputeReference, raisedOn, reason, Status } );		
	},

	updateDispute: async (_, { disputeReference, raisedOn, reason, Status, id }, { dataSources }) => {
		return await dataSources.DisputeAPI.update( { disputeReference, raisedOn, reason, Status }, id );	
	},

	removeDispute: async (_, { id }, { dataSources }) => {
		return await dataSources.DisputeAPI.remove( { id } );	
	},
//////////////////////////
// Consent
//////////////////////////
	addConsent: async (_, { grantedOn, expiresOn, ConsentType, Status }, { dataSources }) => {
		return await dataSources.ConsentAPI.add( { grantedOn, expiresOn, ConsentType, Status } );		
	},

	updateConsent: async (_, { grantedOn, expiresOn, ConsentType, Status, id }, { dataSources }) => {
		return await dataSources.ConsentAPI.update( { grantedOn, expiresOn, ConsentType, Status }, id );	
	},

	removeConsent: async (_, { id }, { dataSources }) => {
		return await dataSources.ConsentAPI.remove( { id } );	
	},
//////////////////////////
// ThirdPartyProvider
//////////////////////////
	addThirdPartyProvider: async (_, { name, registrationId, website }, { dataSources }) => {
		return await dataSources.ThirdPartyProviderAPI.add( { name, registrationId, website } );		
	},

	updateThirdPartyProvider: async (_, { name, registrationId, website, id }, { dataSources }) => {
		return await dataSources.ThirdPartyProviderAPI.update( { name, registrationId, website }, id );	
	},

	removeThirdPartyProvider: async (_, { id }, { dataSources }) => {
		return await dataSources.ThirdPartyProviderAPI.remove( { id } );	
	},
  },

  Bank: {

	branches: async (bank, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.BankAPI.getLeagues( bank.id ).then(branches => {
				resolve(branches);
			})
		})
	},
        
    addToBranches: async (bank, { name, branchCode, address, phone, openingHours }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.BankAPI.addToBranches( bank.id, { name, branchCode, address, phone, openingHours } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToBranches: async (bank, { branchesIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.BankAPI.assignToBranches( bank.id, branchesIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	products: async (bank, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.BankAPI.getLeagues( bank.id ).then(products => {
				resolve(products);
			})
		})
	},
        
    addToProducts: async (bank, { productCode, name, description, ProductCategory }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.BankAPI.addToProducts( bank.id, { productCode, name, description, ProductCategory } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToProducts: async (bank, { productsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.BankAPI.assignToProducts( bank.id, productsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	customers: async (bank, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.BankAPI.getLeagues( bank.id ).then(customers => {
				resolve(customers);
			})
		})
	},
        
    addToCustomers: async (bank, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.BankAPI.addToCustomers( bank.id, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToCustomers: async (bank, { customersIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.BankAPI.assignToCustomers( bank.id, customersIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	accounts: async (bank, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.BankAPI.getLeagues( bank.id ).then(accounts => {
				resolve(accounts);
			})
		})
	},
        
    addToAccounts: async (bank, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.BankAPI.addToAccounts( bank.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToAccounts: async (bank, { accountsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.BankAPI.assignToAccounts( bank.id, accountsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	paymentCards: async (bank, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.BankAPI.getLeagues( bank.id ).then(paymentCards => {
				resolve(paymentCards);
			})
		})
	},
        
    addToPaymentCards: async (bank, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.BankAPI.addToPaymentCards( bank.id, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToPaymentCards: async (bank, { paymentCardsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.BankAPI.assignToPaymentCards( bank.id, paymentCardsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	loanAccounts: async (bank, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.BankAPI.getLeagues( bank.id ).then(loanAccounts => {
				resolve(loanAccounts);
			})
		})
	},
        
    addToLoanAccounts: async (bank, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.BankAPI.addToLoanAccounts( bank.id, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToLoanAccounts: async (bank, { loanAccountsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.BankAPI.assignToLoanAccounts( bank.id, loanAccountsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	exchangeRates: async (bank, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.BankAPI.getLeagues( bank.id ).then(exchangeRates => {
				resolve(exchangeRates);
			})
		})
	},
        
    addToExchangeRates: async (bank, { baseCurrency, counterCurrency, rate, asOf, source }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.BankAPI.addToExchangeRates( bank.id, { baseCurrency, counterCurrency, rate, asOf, source } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToExchangeRates: async (bank, { exchangeRatesIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.BankAPI.assignToExchangeRates( bank.id, exchangeRatesIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	consents: async (bank, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.BankAPI.getLeagues( bank.id ).then(consents => {
				resolve(consents);
			})
		})
	},
        
    addToConsents: async (bank, { grantedOn, expiresOn, ConsentType, Status }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.BankAPI.addToConsents( bank.id, { grantedOn, expiresOn, ConsentType, Status } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToConsents: async (bank, { consentsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.BankAPI.assignToConsents( bank.id, consentsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	thirdPartyProviders: async (bank, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.BankAPI.getLeagues( bank.id ).then(thirdPartyProviders => {
				resolve(thirdPartyProviders);
			})
		})
	},
        
    addToThirdPartyProviders: async (bank, { name, registrationId, website }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.BankAPI.addToThirdPartyProviders( bank.id, { name, registrationId, website } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToThirdPartyProviders: async (bank, { thirdPartyProvidersIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.BankAPI.assignToThirdPartyProviders( bank.id, thirdPartyProvidersIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	
  },
  Branch: {
	
	bank: async (branch, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.BranchAPI.getBank( branch.id ).then(bank => {
				resolve(bank);
			})
		})
	},
	
    addBank: async (branch, { name, legalName, swiftBic, headquartersCountry, website }, { dataSources }) => {
    	return await dataSources.BranchAPI.addBank( branch.id, { name, legalName, swiftBic, headquartersCountry, website } );
	},

    assignBank: async (branch, { bankId }, { dataSources }) => {
    	return await dataSources.BranchAPI.assignToBank( branch.id, bankId );	
	},
	
    unassignBank: async (_, { branchId }, { dataSources }) => {
    	return await dataSources.BranchAPI.unassignFromBank( branchId );
	},

	accounts: async (branch, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.BranchAPI.getLeagues( branch.id ).then(accounts => {
				resolve(accounts);
			})
		})
	},
        
    addToAccounts: async (branch, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.BranchAPI.addToAccounts( branch.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToAccounts: async (branch, { accountsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.BranchAPI.assignToAccounts( branch.id, accountsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	loanAccounts: async (branch, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.BranchAPI.getLeagues( branch.id ).then(loanAccounts => {
				resolve(loanAccounts);
			})
		})
	},
        
    addToLoanAccounts: async (branch, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.BranchAPI.addToLoanAccounts( branch.id, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToLoanAccounts: async (branch, { loanAccountsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.BranchAPI.assignToLoanAccounts( branch.id, loanAccountsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	atms: async (branch, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.BranchAPI.getLeagues( branch.id ).then(atms => {
				resolve(atms);
			})
		})
	},
        
    addToAtms: async (branch, { terminalId, location, Status }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.BranchAPI.addToAtms( branch.id, { terminalId, location, Status } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToAtms: async (branch, { atmsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.BranchAPI.assignToAtms( branch.id, atmsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	
  },
  ATM: {
	
	branch: async (aTM, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.ATMAPI.getBranch( aTM.id ).then(branch => {
				resolve(branch);
			})
		})
	},
	
    addBranch: async (aTM, { name, branchCode, address, phone, openingHours }, { dataSources }) => {
    	return await dataSources.ATMAPI.addBranch( aTM.id, { name, branchCode, address, phone, openingHours } );
	},

    assignBranch: async (aTM, { branchId }, { dataSources }) => {
    	return await dataSources.ATMAPI.assignToBranch( aTM.id, branchId );	
	},
	
    unassignBranch: async (_, { aTMId }, { dataSources }) => {
    	return await dataSources.ATMAPI.unassignFromBranch( aTMId );
	},
  },
  Customer: {
	
	bank: async (customer, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.CustomerAPI.getBank( customer.id ).then(bank => {
				resolve(bank);
			})
		})
	},
	
    addBank: async (customer, { name, legalName, swiftBic, headquartersCountry, website }, { dataSources }) => {
    	return await dataSources.CustomerAPI.addBank( customer.id, { name, legalName, swiftBic, headquartersCountry, website } );
	},

    assignBank: async (customer, { bankId }, { dataSources }) => {
    	return await dataSources.CustomerAPI.assignToBank( customer.id, bankId );	
	},
	
    unassignBank: async (_, { customerId }, { dataSources }) => {
    	return await dataSources.CustomerAPI.unassignFromBank( customerId );
	},

	accounts: async (customer, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.CustomerAPI.getLeagues( customer.id ).then(accounts => {
				resolve(accounts);
			})
		})
	},
        
    addToAccounts: async (customer, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.CustomerAPI.addToAccounts( customer.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToAccounts: async (customer, { accountsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.CustomerAPI.assignToAccounts( customer.id, accountsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	loanAccounts: async (customer, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.CustomerAPI.getLeagues( customer.id ).then(loanAccounts => {
				resolve(loanAccounts);
			})
		})
	},
        
    addToLoanAccounts: async (customer, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.CustomerAPI.addToLoanAccounts( customer.id, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToLoanAccounts: async (customer, { loanAccountsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.CustomerAPI.assignToLoanAccounts( customer.id, loanAccountsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	paymentCards: async (customer, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.CustomerAPI.getLeagues( customer.id ).then(paymentCards => {
				resolve(paymentCards);
			})
		})
	},
        
    addToPaymentCards: async (customer, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.CustomerAPI.addToPaymentCards( customer.id, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToPaymentCards: async (customer, { paymentCardsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.CustomerAPI.assignToPaymentCards( customer.id, paymentCardsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	externalAccounts: async (customer, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.CustomerAPI.getLeagues( customer.id ).then(externalAccounts => {
				resolve(externalAccounts);
			})
		})
	},
        
    addToExternalAccounts: async (customer, { name, iban, accountNumber, bic, bankName, country }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.CustomerAPI.addToExternalAccounts( customer.id, { name, iban, accountNumber, bic, bankName, country } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToExternalAccounts: async (customer, { externalAccountsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.CustomerAPI.assignToExternalAccounts( customer.id, externalAccountsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	fundsTransfers: async (customer, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.CustomerAPI.getLeagues( customer.id ).then(fundsTransfers => {
				resolve(fundsTransfers);
			})
		})
	},
        
    addToFundsTransfers: async (customer, { transferReference, amount, requestedDate, executionDate, purpose, feeAmount, Method, Status }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.CustomerAPI.addToFundsTransfers( customer.id, { transferReference, amount, requestedDate, executionDate, purpose, feeAmount, Method, Status } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToFundsTransfers: async (customer, { fundsTransfersIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.CustomerAPI.assignToFundsTransfers( customer.id, fundsTransfersIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	disputes: async (customer, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.CustomerAPI.getLeagues( customer.id ).then(disputes => {
				resolve(disputes);
			})
		})
	},
        
    addToDisputes: async (customer, { disputeReference, raisedOn, reason, Status }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.CustomerAPI.addToDisputes( customer.id, { disputeReference, raisedOn, reason, Status } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToDisputes: async (customer, { disputesIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.CustomerAPI.assignToDisputes( customer.id, disputesIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	kycProfiles: async (customer, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.CustomerAPI.getLeagues( customer.id ).then(kycProfiles => {
				resolve(kycProfiles);
			})
		})
	},
        
    addToKycProfiles: async (customer, { profileId, lastReviewedOn, Status }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.CustomerAPI.addToKycProfiles( customer.id, { profileId, lastReviewedOn, Status } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToKycProfiles: async (customer, { kycProfilesIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.CustomerAPI.assignToKycProfiles( customer.id, kycProfilesIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	consents: async (customer, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.CustomerAPI.getLeagues( customer.id ).then(consents => {
				resolve(consents);
			})
		})
	},
        
    addToConsents: async (customer, { grantedOn, expiresOn, ConsentType, Status }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.CustomerAPI.addToConsents( customer.id, { grantedOn, expiresOn, ConsentType, Status } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToConsents: async (customer, { consentsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.CustomerAPI.assignToConsents( customer.id, consentsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	
  },
  KycProfile: {
	
	customer: async (kycProfile, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.KycProfileAPI.getCustomer( kycProfile.id ).then(customer => {
				resolve(customer);
			})
		})
	},
	
    addCustomer: async (kycProfile, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus }, { dataSources }) => {
    	return await dataSources.KycProfileAPI.addCustomer( kycProfile.id, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } );
	},

    assignCustomer: async (kycProfile, { customerId }, { dataSources }) => {
    	return await dataSources.KycProfileAPI.assignToCustomer( kycProfile.id, customerId );	
	},
	
    unassignCustomer: async (_, { kycProfileId }, { dataSources }) => {
    	return await dataSources.KycProfileAPI.unassignFromCustomer( kycProfileId );
	},

	identityDocuments: async (kycProfile, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.KycProfileAPI.getLeagues( kycProfile.id ).then(identityDocuments => {
				resolve(identityDocuments);
			})
		})
	},
        
    addToIdentityDocuments: async (kycProfile, { documentNumber, issuingCountry, expirationDate, DocumentType }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.KycProfileAPI.addToIdentityDocuments( kycProfile.id, { documentNumber, issuingCountry, expirationDate, DocumentType } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToIdentityDocuments: async (kycProfile, { identityDocumentsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.KycProfileAPI.assignToIdentityDocuments( kycProfile.id, identityDocumentsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	riskAssessments: async (kycProfile, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.KycProfileAPI.getLeagues( kycProfile.id ).then(riskAssessments => {
				resolve(riskAssessments);
			})
		})
	},
        
    addToRiskAssessments: async (kycProfile, { score, assessedOn, Rating }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.KycProfileAPI.addToRiskAssessments( kycProfile.id, { score, assessedOn, Rating } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToRiskAssessments: async (kycProfile, { riskAssessmentsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.KycProfileAPI.assignToRiskAssessments( kycProfile.id, riskAssessmentsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	screenings: async (kycProfile, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.KycProfileAPI.getLeagues( kycProfile.id ).then(screenings => {
				resolve(screenings);
			})
		})
	},
        
    addToScreenings: async (kycProfile, { screeningDate, provider, Outcome }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.KycProfileAPI.addToScreenings( kycProfile.id, { screeningDate, provider, Outcome } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToScreenings: async (kycProfile, { screeningsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.KycProfileAPI.assignToScreenings( kycProfile.id, screeningsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	
  },
  IdentityDocument: {
	
	kycProfile: async (identityDocument, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.IdentityDocumentAPI.getKycProfile( identityDocument.id ).then(kycProfile => {
				resolve(kycProfile);
			})
		})
	},
	
    addKycProfile: async (identityDocument, { profileId, lastReviewedOn, Status }, { dataSources }) => {
    	return await dataSources.IdentityDocumentAPI.addKycProfile( identityDocument.id, { profileId, lastReviewedOn, Status } );
	},

    assignKycProfile: async (identityDocument, { kycProfileId }, { dataSources }) => {
    	return await dataSources.IdentityDocumentAPI.assignToKycProfile( identityDocument.id, kycProfileId );	
	},
	
    unassignKycProfile: async (_, { identityDocumentId }, { dataSources }) => {
    	return await dataSources.IdentityDocumentAPI.unassignFromKycProfile( identityDocumentId );
	},
  },
  RiskAssessment: {
	
	kycProfile: async (riskAssessment, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.RiskAssessmentAPI.getKycProfile( riskAssessment.id ).then(kycProfile => {
				resolve(kycProfile);
			})
		})
	},
	
    addKycProfile: async (riskAssessment, { profileId, lastReviewedOn, Status }, { dataSources }) => {
    	return await dataSources.RiskAssessmentAPI.addKycProfile( riskAssessment.id, { profileId, lastReviewedOn, Status } );
	},

    assignKycProfile: async (riskAssessment, { kycProfileId }, { dataSources }) => {
    	return await dataSources.RiskAssessmentAPI.assignToKycProfile( riskAssessment.id, kycProfileId );	
	},
	
    unassignKycProfile: async (_, { riskAssessmentId }, { dataSources }) => {
    	return await dataSources.RiskAssessmentAPI.unassignFromKycProfile( riskAssessmentId );
	},
  },
  ScreeningResult: {
	
	kycProfile: async (screeningResult, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.ScreeningResultAPI.getKycProfile( screeningResult.id ).then(kycProfile => {
				resolve(kycProfile);
			})
		})
	},
	
    addKycProfile: async (screeningResult, { profileId, lastReviewedOn, Status }, { dataSources }) => {
    	return await dataSources.ScreeningResultAPI.addKycProfile( screeningResult.id, { profileId, lastReviewedOn, Status } );
	},

    assignKycProfile: async (screeningResult, { kycProfileId }, { dataSources }) => {
    	return await dataSources.ScreeningResultAPI.assignToKycProfile( screeningResult.id, kycProfileId );	
	},
	
    unassignKycProfile: async (_, { screeningResultId }, { dataSources }) => {
    	return await dataSources.ScreeningResultAPI.unassignFromKycProfile( screeningResultId );
	},
  },
  BankingProduct: {
	
	bank: async (bankingProduct, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.BankingProductAPI.getBank( bankingProduct.id ).then(bank => {
				resolve(bank);
			})
		})
	},
	
    addBank: async (bankingProduct, { name, legalName, swiftBic, headquartersCountry, website }, { dataSources }) => {
    	return await dataSources.BankingProductAPI.addBank( bankingProduct.id, { name, legalName, swiftBic, headquartersCountry, website } );
	},

    assignBank: async (bankingProduct, { bankId }, { dataSources }) => {
    	return await dataSources.BankingProductAPI.assignToBank( bankingProduct.id, bankId );	
	},
	
    unassignBank: async (_, { bankingProductId }, { dataSources }) => {
    	return await dataSources.BankingProductAPI.unassignFromBank( bankingProductId );
	},

	accounts: async (bankingProduct, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.BankingProductAPI.getLeagues( bankingProduct.id ).then(accounts => {
				resolve(accounts);
			})
		})
	},
        
    addToAccounts: async (bankingProduct, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.BankingProductAPI.addToAccounts( bankingProduct.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToAccounts: async (bankingProduct, { accountsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.BankingProductAPI.assignToAccounts( bankingProduct.id, accountsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	loanAccounts: async (bankingProduct, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.BankingProductAPI.getLeagues( bankingProduct.id ).then(loanAccounts => {
				resolve(loanAccounts);
			})
		})
	},
        
    addToLoanAccounts: async (bankingProduct, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.BankingProductAPI.addToLoanAccounts( bankingProduct.id, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToLoanAccounts: async (bankingProduct, { loanAccountsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.BankingProductAPI.assignToLoanAccounts( bankingProduct.id, loanAccountsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	paymentCards: async (bankingProduct, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.BankingProductAPI.getLeagues( bankingProduct.id ).then(paymentCards => {
				resolve(paymentCards);
			})
		})
	},
        
    addToPaymentCards: async (bankingProduct, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.BankingProductAPI.addToPaymentCards( bankingProduct.id, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToPaymentCards: async (bankingProduct, { paymentCardsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.BankingProductAPI.assignToPaymentCards( bankingProduct.id, paymentCardsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	
  },
  Account: {
	
	bank: async (account, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.AccountAPI.getBank( account.id ).then(bank => {
				resolve(bank);
			})
		})
	},
	
    addBank: async (account, { name, legalName, swiftBic, headquartersCountry, website }, { dataSources }) => {
    	return await dataSources.AccountAPI.addBank( account.id, { name, legalName, swiftBic, headquartersCountry, website } );
	},

    assignBank: async (account, { bankId }, { dataSources }) => {
    	return await dataSources.AccountAPI.assignToBank( account.id, bankId );	
	},
	
    unassignBank: async (_, { accountId }, { dataSources }) => {
    	return await dataSources.AccountAPI.unassignFromBank( accountId );
	},
	
	branch: async (account, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.AccountAPI.getBranch( account.id ).then(branch => {
				resolve(branch);
			})
		})
	},
	
    addBranch: async (account, { name, branchCode, address, phone, openingHours }, { dataSources }) => {
    	return await dataSources.AccountAPI.addBranch( account.id, { name, branchCode, address, phone, openingHours } );
	},

    assignBranch: async (account, { branchId }, { dataSources }) => {
    	return await dataSources.AccountAPI.assignToBranch( account.id, branchId );	
	},
	
    unassignBranch: async (_, { accountId }, { dataSources }) => {
    	return await dataSources.AccountAPI.unassignFromBranch( accountId );
	},
	
	product: async (account, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.AccountAPI.getProduct( account.id ).then(bankingProduct => {
				resolve(bankingProduct);
			})
		})
	},
	
    addProduct: async (account, { productCode, name, description, ProductCategory }, { dataSources }) => {
    	return await dataSources.AccountAPI.addProduct( account.id, { productCode, name, description, ProductCategory } );
	},

    assignProduct: async (account, { productId }, { dataSources }) => {
    	return await dataSources.AccountAPI.assignToProduct( account.id, productId );	
	},
	
    unassignProduct: async (_, { accountId }, { dataSources }) => {
    	return await dataSources.AccountAPI.unassignFromProduct( accountId );
	},

	owners: async (account, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.AccountAPI.getLeagues( account.id ).then(owners => {
				resolve(owners);
			})
		})
	},
        
    addToOwners: async (account, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.AccountAPI.addToOwners( account.id, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToOwners: async (account, { ownersIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.AccountAPI.assignToOwners( account.id, ownersIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	transactions: async (account, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.AccountAPI.getLeagues( account.id ).then(transactions => {
				resolve(transactions);
			})
		})
	},
        
    addToTransactions: async (account, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.AccountAPI.addToTransactions( account.id, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToTransactions: async (account, { transactionsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.AccountAPI.assignToTransactions( account.id, transactionsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	statements: async (account, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.AccountAPI.getLeagues( account.id ).then(statements => {
				resolve(statements);
			})
		})
	},
        
    addToStatements: async (account, { statementNumber, periodStart, periodEnd, openingBalance, closingBalance, DeliveryMethod }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.AccountAPI.addToStatements( account.id, { statementNumber, periodStart, periodEnd, openingBalance, closingBalance, DeliveryMethod } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToStatements: async (account, { statementsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.AccountAPI.assignToStatements( account.id, statementsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	standingInstructions: async (account, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.AccountAPI.getLeagues( account.id ).then(standingInstructions => {
				resolve(standingInstructions);
			})
		})
	},
        
    addToStandingInstructions: async (account, { instructionId, amount, nextExecutionDate, Frequency, Status }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.AccountAPI.addToStandingInstructions( account.id, { instructionId, amount, nextExecutionDate, Frequency, Status } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToStandingInstructions: async (account, { standingInstructionsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.AccountAPI.assignToStandingInstructions( account.id, standingInstructionsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	feeCharges: async (account, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.AccountAPI.getLeagues( account.id ).then(feeCharges => {
				resolve(feeCharges);
			})
		})
	},
        
    addToFeeCharges: async (account, { feeCode, amount, appliedOn, FeeType }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.AccountAPI.addToFeeCharges( account.id, { feeCode, amount, appliedOn, FeeType } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToFeeCharges: async (account, { feeChargesIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.AccountAPI.assignToFeeCharges( account.id, feeChargesIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	
  },
  AccountStatement: {
	
	account: async (accountStatement, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.AccountStatementAPI.getAccount( accountStatement.id ).then(account => {
				resolve(account);
			})
		})
	},
	
    addAccount: async (accountStatement, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { dataSources }) => {
    	return await dataSources.AccountStatementAPI.addAccount( accountStatement.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } );
	},

    assignAccount: async (accountStatement, { accountId }, { dataSources }) => {
    	return await dataSources.AccountStatementAPI.assignToAccount( accountStatement.id, accountId );	
	},
	
    unassignAccount: async (_, { accountStatementId }, { dataSources }) => {
    	return await dataSources.AccountStatementAPI.unassignFromAccount( accountStatementId );
	},
  },
  Transaction: {
	
	account: async (transaction, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.TransactionAPI.getAccount( transaction.id ).then(account => {
				resolve(account);
			})
		})
	},
	
    addAccount: async (transaction, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { dataSources }) => {
    	return await dataSources.TransactionAPI.addAccount( transaction.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } );
	},

    assignAccount: async (transaction, { accountId }, { dataSources }) => {
    	return await dataSources.TransactionAPI.assignToAccount( transaction.id, accountId );	
	},
	
    unassignAccount: async (_, { transactionId }, { dataSources }) => {
    	return await dataSources.TransactionAPI.unassignFromAccount( transactionId );
	},
	
	externalCounterparty: async (transaction, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.TransactionAPI.getExternalCounterparty( transaction.id ).then(externalAccount => {
				resolve(externalAccount);
			})
		})
	},
	
    addExternalCounterparty: async (transaction, { name, iban, accountNumber, bic, bankName, country }, { dataSources }) => {
    	return await dataSources.TransactionAPI.addExternalCounterparty( transaction.id, { name, iban, accountNumber, bic, bankName, country } );
	},

    assignExternalCounterparty: async (transaction, { externalCounterpartyId }, { dataSources }) => {
    	return await dataSources.TransactionAPI.assignToExternalCounterparty( transaction.id, externalCounterpartyId );	
	},
	
    unassignExternalCounterparty: async (_, { transactionId }, { dataSources }) => {
    	return await dataSources.TransactionAPI.unassignFromExternalCounterparty( transactionId );
	},
	
	paymentCard: async (transaction, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.TransactionAPI.getPaymentCard( transaction.id ).then(paymentCard => {
				resolve(paymentCard);
			})
		})
	},
	
    addPaymentCard: async (transaction, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network }, { dataSources }) => {
    	return await dataSources.TransactionAPI.addPaymentCard( transaction.id, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network } );
	},

    assignPaymentCard: async (transaction, { paymentCardId }, { dataSources }) => {
    	return await dataSources.TransactionAPI.assignToPaymentCard( transaction.id, paymentCardId );	
	},
	
    unassignPaymentCard: async (_, { transactionId }, { dataSources }) => {
    	return await dataSources.TransactionAPI.unassignFromPaymentCard( transactionId );
	},
	
	fundsTransfer: async (transaction, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.TransactionAPI.getFundsTransfer( transaction.id ).then(fundsTransfer => {
				resolve(fundsTransfer);
			})
		})
	},
	
    addFundsTransfer: async (transaction, { transferReference, amount, requestedDate, executionDate, purpose, feeAmount, Method, Status }, { dataSources }) => {
    	return await dataSources.TransactionAPI.addFundsTransfer( transaction.id, { transferReference, amount, requestedDate, executionDate, purpose, feeAmount, Method, Status } );
	},

    assignFundsTransfer: async (transaction, { fundsTransferId }, { dataSources }) => {
    	return await dataSources.TransactionAPI.assignToFundsTransfer( transaction.id, fundsTransferId );	
	},
	
    unassignFundsTransfer: async (_, { transactionId }, { dataSources }) => {
    	return await dataSources.TransactionAPI.unassignFromFundsTransfer( transactionId );
	},
	
	fxTrade: async (transaction, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.TransactionAPI.getFxTrade( transaction.id ).then(fXTrade => {
				resolve(fXTrade);
			})
		})
	},
	
    addFxTrade: async (transaction, { tradeReference, tradeDate, settlementDate, amountSold, amountBought, rate, Status }, { dataSources }) => {
    	return await dataSources.TransactionAPI.addFxTrade( transaction.id, { tradeReference, tradeDate, settlementDate, amountSold, amountBought, rate, Status } );
	},

    assignFxTrade: async (transaction, { fxTradeId }, { dataSources }) => {
    	return await dataSources.TransactionAPI.assignToFxTrade( transaction.id, fxTradeId );	
	},
	
    unassignFxTrade: async (_, { transactionId }, { dataSources }) => {
    	return await dataSources.TransactionAPI.unassignFromFxTrade( transactionId );
	},
	
	dispute: async (transaction, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.TransactionAPI.getDispute( transaction.id ).then(dispute => {
				resolve(dispute);
			})
		})
	},
	
    addDispute: async (transaction, { disputeReference, raisedOn, reason, Status }, { dataSources }) => {
    	return await dataSources.TransactionAPI.addDispute( transaction.id, { disputeReference, raisedOn, reason, Status } );
	},

    assignDispute: async (transaction, { disputeId }, { dataSources }) => {
    	return await dataSources.TransactionAPI.assignToDispute( transaction.id, disputeId );	
	},
	
    unassignDispute: async (_, { transactionId }, { dataSources }) => {
    	return await dataSources.TransactionAPI.unassignFromDispute( transactionId );
	},
  },
  ExternalAccount: {
	
	customer: async (externalAccount, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.ExternalAccountAPI.getCustomer( externalAccount.id ).then(customer => {
				resolve(customer);
			})
		})
	},
	
    addCustomer: async (externalAccount, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus }, { dataSources }) => {
    	return await dataSources.ExternalAccountAPI.addCustomer( externalAccount.id, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } );
	},

    assignCustomer: async (externalAccount, { customerId }, { dataSources }) => {
    	return await dataSources.ExternalAccountAPI.assignToCustomer( externalAccount.id, customerId );	
	},
	
    unassignCustomer: async (_, { externalAccountId }, { dataSources }) => {
    	return await dataSources.ExternalAccountAPI.unassignFromCustomer( externalAccountId );
	},

	transactions: async (externalAccount, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.ExternalAccountAPI.getLeagues( externalAccount.id ).then(transactions => {
				resolve(transactions);
			})
		})
	},
        
    addToTransactions: async (externalAccount, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.ExternalAccountAPI.addToTransactions( externalAccount.id, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToTransactions: async (externalAccount, { transactionsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.ExternalAccountAPI.assignToTransactions( externalAccount.id, transactionsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	
  },
  FundsTransfer: {
	
	sourceAccount: async (fundsTransfer, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.FundsTransferAPI.getSourceAccount( fundsTransfer.id ).then(account => {
				resolve(account);
			})
		})
	},
	
    addSourceAccount: async (fundsTransfer, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { dataSources }) => {
    	return await dataSources.FundsTransferAPI.addSourceAccount( fundsTransfer.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } );
	},

    assignSourceAccount: async (fundsTransfer, { sourceAccountId }, { dataSources }) => {
    	return await dataSources.FundsTransferAPI.assignToSourceAccount( fundsTransfer.id, sourceAccountId );	
	},
	
    unassignSourceAccount: async (_, { fundsTransferId }, { dataSources }) => {
    	return await dataSources.FundsTransferAPI.unassignFromSourceAccount( fundsTransferId );
	},
	
	destinationAccount: async (fundsTransfer, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.FundsTransferAPI.getDestinationAccount( fundsTransfer.id ).then(account => {
				resolve(account);
			})
		})
	},
	
    addDestinationAccount: async (fundsTransfer, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { dataSources }) => {
    	return await dataSources.FundsTransferAPI.addDestinationAccount( fundsTransfer.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } );
	},

    assignDestinationAccount: async (fundsTransfer, { destinationAccountId }, { dataSources }) => {
    	return await dataSources.FundsTransferAPI.assignToDestinationAccount( fundsTransfer.id, destinationAccountId );	
	},
	
    unassignDestinationAccount: async (_, { fundsTransferId }, { dataSources }) => {
    	return await dataSources.FundsTransferAPI.unassignFromDestinationAccount( fundsTransferId );
	},
	
	externalBeneficiary: async (fundsTransfer, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.FundsTransferAPI.getExternalBeneficiary( fundsTransfer.id ).then(externalAccount => {
				resolve(externalAccount);
			})
		})
	},
	
    addExternalBeneficiary: async (fundsTransfer, { name, iban, accountNumber, bic, bankName, country }, { dataSources }) => {
    	return await dataSources.FundsTransferAPI.addExternalBeneficiary( fundsTransfer.id, { name, iban, accountNumber, bic, bankName, country } );
	},

    assignExternalBeneficiary: async (fundsTransfer, { externalBeneficiaryId }, { dataSources }) => {
    	return await dataSources.FundsTransferAPI.assignToExternalBeneficiary( fundsTransfer.id, externalBeneficiaryId );	
	},
	
    unassignExternalBeneficiary: async (_, { fundsTransferId }, { dataSources }) => {
    	return await dataSources.FundsTransferAPI.unassignFromExternalBeneficiary( fundsTransferId );
	},
	
	initiatedBy: async (fundsTransfer, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.FundsTransferAPI.getInitiatedBy( fundsTransfer.id ).then(customer => {
				resolve(customer);
			})
		})
	},
	
    addInitiatedBy: async (fundsTransfer, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus }, { dataSources }) => {
    	return await dataSources.FundsTransferAPI.addInitiatedBy( fundsTransfer.id, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } );
	},

    assignInitiatedBy: async (fundsTransfer, { initiatedById }, { dataSources }) => {
    	return await dataSources.FundsTransferAPI.assignToInitiatedBy( fundsTransfer.id, initiatedById );	
	},
	
    unassignInitiatedBy: async (_, { fundsTransferId }, { dataSources }) => {
    	return await dataSources.FundsTransferAPI.unassignFromInitiatedBy( fundsTransferId );
	},

	transactions: async (fundsTransfer, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.FundsTransferAPI.getLeagues( fundsTransfer.id ).then(transactions => {
				resolve(transactions);
			})
		})
	},
        
    addToTransactions: async (fundsTransfer, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.FundsTransferAPI.addToTransactions( fundsTransfer.id, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToTransactions: async (fundsTransfer, { transactionsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.FundsTransferAPI.assignToTransactions( fundsTransfer.id, transactionsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	
  },
  StandingInstruction: {
	
	account: async (standingInstruction, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.StandingInstructionAPI.getAccount( standingInstruction.id ).then(account => {
				resolve(account);
			})
		})
	},
	
    addAccount: async (standingInstruction, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { dataSources }) => {
    	return await dataSources.StandingInstructionAPI.addAccount( standingInstruction.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } );
	},

    assignAccount: async (standingInstruction, { accountId }, { dataSources }) => {
    	return await dataSources.StandingInstructionAPI.assignToAccount( standingInstruction.id, accountId );	
	},
	
    unassignAccount: async (_, { standingInstructionId }, { dataSources }) => {
    	return await dataSources.StandingInstructionAPI.unassignFromAccount( standingInstructionId );
	},
	
	beneficiary: async (standingInstruction, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.StandingInstructionAPI.getBeneficiary( standingInstruction.id ).then(externalAccount => {
				resolve(externalAccount);
			})
		})
	},
	
    addBeneficiary: async (standingInstruction, { name, iban, accountNumber, bic, bankName, country }, { dataSources }) => {
    	return await dataSources.StandingInstructionAPI.addBeneficiary( standingInstruction.id, { name, iban, accountNumber, bic, bankName, country } );
	},

    assignBeneficiary: async (standingInstruction, { beneficiaryId }, { dataSources }) => {
    	return await dataSources.StandingInstructionAPI.assignToBeneficiary( standingInstruction.id, beneficiaryId );	
	},
	
    unassignBeneficiary: async (_, { standingInstructionId }, { dataSources }) => {
    	return await dataSources.StandingInstructionAPI.unassignFromBeneficiary( standingInstructionId );
	},
  },
  PaymentCard: {
	
	bank: async (paymentCard, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.PaymentCardAPI.getBank( paymentCard.id ).then(bank => {
				resolve(bank);
			})
		})
	},
	
    addBank: async (paymentCard, { name, legalName, swiftBic, headquartersCountry, website }, { dataSources }) => {
    	return await dataSources.PaymentCardAPI.addBank( paymentCard.id, { name, legalName, swiftBic, headquartersCountry, website } );
	},

    assignBank: async (paymentCard, { bankId }, { dataSources }) => {
    	return await dataSources.PaymentCardAPI.assignToBank( paymentCard.id, bankId );	
	},
	
    unassignBank: async (_, { paymentCardId }, { dataSources }) => {
    	return await dataSources.PaymentCardAPI.unassignFromBank( paymentCardId );
	},
	
	account: async (paymentCard, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.PaymentCardAPI.getAccount( paymentCard.id ).then(account => {
				resolve(account);
			})
		})
	},
	
    addAccount: async (paymentCard, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { dataSources }) => {
    	return await dataSources.PaymentCardAPI.addAccount( paymentCard.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } );
	},

    assignAccount: async (paymentCard, { accountId }, { dataSources }) => {
    	return await dataSources.PaymentCardAPI.assignToAccount( paymentCard.id, accountId );	
	},
	
    unassignAccount: async (_, { paymentCardId }, { dataSources }) => {
    	return await dataSources.PaymentCardAPI.unassignFromAccount( paymentCardId );
	},
	
	customer: async (paymentCard, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.PaymentCardAPI.getCustomer( paymentCard.id ).then(customer => {
				resolve(customer);
			})
		})
	},
	
    addCustomer: async (paymentCard, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus }, { dataSources }) => {
    	return await dataSources.PaymentCardAPI.addCustomer( paymentCard.id, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } );
	},

    assignCustomer: async (paymentCard, { customerId }, { dataSources }) => {
    	return await dataSources.PaymentCardAPI.assignToCustomer( paymentCard.id, customerId );	
	},
	
    unassignCustomer: async (_, { paymentCardId }, { dataSources }) => {
    	return await dataSources.PaymentCardAPI.unassignFromCustomer( paymentCardId );
	},

	transactions: async (paymentCard, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.PaymentCardAPI.getLeagues( paymentCard.id ).then(transactions => {
				resolve(transactions);
			})
		})
	},
        
    addToTransactions: async (paymentCard, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.PaymentCardAPI.addToTransactions( paymentCard.id, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToTransactions: async (paymentCard, { transactionsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.PaymentCardAPI.assignToTransactions( paymentCard.id, transactionsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	
  },
  LoanAccount: {
	
	bank: async (loanAccount, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.LoanAccountAPI.getBank( loanAccount.id ).then(bank => {
				resolve(bank);
			})
		})
	},
	
    addBank: async (loanAccount, { name, legalName, swiftBic, headquartersCountry, website }, { dataSources }) => {
    	return await dataSources.LoanAccountAPI.addBank( loanAccount.id, { name, legalName, swiftBic, headquartersCountry, website } );
	},

    assignBank: async (loanAccount, { bankId }, { dataSources }) => {
    	return await dataSources.LoanAccountAPI.assignToBank( loanAccount.id, bankId );	
	},
	
    unassignBank: async (_, { loanAccountId }, { dataSources }) => {
    	return await dataSources.LoanAccountAPI.unassignFromBank( loanAccountId );
	},
	
	branch: async (loanAccount, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.LoanAccountAPI.getBranch( loanAccount.id ).then(branch => {
				resolve(branch);
			})
		})
	},
	
    addBranch: async (loanAccount, { name, branchCode, address, phone, openingHours }, { dataSources }) => {
    	return await dataSources.LoanAccountAPI.addBranch( loanAccount.id, { name, branchCode, address, phone, openingHours } );
	},

    assignBranch: async (loanAccount, { branchId }, { dataSources }) => {
    	return await dataSources.LoanAccountAPI.assignToBranch( loanAccount.id, branchId );	
	},
	
    unassignBranch: async (_, { loanAccountId }, { dataSources }) => {
    	return await dataSources.LoanAccountAPI.unassignFromBranch( loanAccountId );
	},
	
	product: async (loanAccount, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.LoanAccountAPI.getProduct( loanAccount.id ).then(bankingProduct => {
				resolve(bankingProduct);
			})
		})
	},
	
    addProduct: async (loanAccount, { productCode, name, description, ProductCategory }, { dataSources }) => {
    	return await dataSources.LoanAccountAPI.addProduct( loanAccount.id, { productCode, name, description, ProductCategory } );
	},

    assignProduct: async (loanAccount, { productId }, { dataSources }) => {
    	return await dataSources.LoanAccountAPI.assignToProduct( loanAccount.id, productId );	
	},
	
    unassignProduct: async (_, { loanAccountId }, { dataSources }) => {
    	return await dataSources.LoanAccountAPI.unassignFromProduct( loanAccountId );
	},

	borrowers: async (loanAccount, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.LoanAccountAPI.getLeagues( loanAccount.id ).then(borrowers => {
				resolve(borrowers);
			})
		})
	},
        
    addToBorrowers: async (loanAccount, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.LoanAccountAPI.addToBorrowers( loanAccount.id, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToBorrowers: async (loanAccount, { borrowersIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.LoanAccountAPI.assignToBorrowers( loanAccount.id, borrowersIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	repaymentSchedule: async (loanAccount, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.LoanAccountAPI.getLeagues( loanAccount.id ).then(repaymentSchedule => {
				resolve(repaymentSchedule);
			})
		})
	},
        
    addToRepaymentSchedule: async (loanAccount, { installmentNumber, dueDate, principalDue, interestDue, totalDue, Status }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.LoanAccountAPI.addToRepaymentSchedule( loanAccount.id, { installmentNumber, dueDate, principalDue, interestDue, totalDue, Status } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToRepaymentSchedule: async (loanAccount, { repaymentScheduleIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.LoanAccountAPI.assignToRepaymentSchedule( loanAccount.id, repaymentScheduleIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	payments: async (loanAccount, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.LoanAccountAPI.getLeagues( loanAccount.id ).then(payments => {
				resolve(payments);
			})
		})
	},
        
    addToPayments: async (loanAccount, { paymentReference, amount, paymentDate, Method, Status }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.LoanAccountAPI.addToPayments( loanAccount.id, { paymentReference, amount, paymentDate, Method, Status } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToPayments: async (loanAccount, { paymentsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.LoanAccountAPI.assignToPayments( loanAccount.id, paymentsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	collateral: async (loanAccount, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.LoanAccountAPI.getLeagues( loanAccount.id ).then(collateral => {
				resolve(collateral);
			})
		})
	},
        
    addToCollateral: async (loanAccount, { appraisedValue, description, location, CollateralType }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.LoanAccountAPI.addToCollateral( loanAccount.id, { appraisedValue, description, location, CollateralType } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToCollateral: async (loanAccount, { collateralIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.LoanAccountAPI.assignToCollateral( loanAccount.id, collateralIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	

	feeCharges: async (loanAccount, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.LoanAccountAPI.getLeagues( loanAccount.id ).then(feeCharges => {
				resolve(feeCharges);
			})
		})
	},
        
    addToFeeCharges: async (loanAccount, { feeCode, amount, appliedOn, FeeType }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.LoanAccountAPI.addToFeeCharges( loanAccount.id, { feeCode, amount, appliedOn, FeeType } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToFeeCharges: async (loanAccount, { feeChargesIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.LoanAccountAPI.assignToFeeCharges( loanAccount.id, feeChargesIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	
  },
  RepaymentSchedule: {
	
	loanAccount: async (repaymentSchedule, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.RepaymentScheduleAPI.getLoanAccount( repaymentSchedule.id ).then(loanAccount => {
				resolve(loanAccount);
			})
		})
	},
	
    addLoanAccount: async (repaymentSchedule, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status }, { dataSources }) => {
    	return await dataSources.RepaymentScheduleAPI.addLoanAccount( repaymentSchedule.id, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } );
	},

    assignLoanAccount: async (repaymentSchedule, { loanAccountId }, { dataSources }) => {
    	return await dataSources.RepaymentScheduleAPI.assignToLoanAccount( repaymentSchedule.id, loanAccountId );	
	},
	
    unassignLoanAccount: async (_, { repaymentScheduleId }, { dataSources }) => {
    	return await dataSources.RepaymentScheduleAPI.unassignFromLoanAccount( repaymentScheduleId );
	},
	
	payment: async (repaymentSchedule, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.RepaymentScheduleAPI.getPayment( repaymentSchedule.id ).then(loanPayment => {
				resolve(loanPayment);
			})
		})
	},
	
    addPayment: async (repaymentSchedule, { paymentReference, amount, paymentDate, Method, Status }, { dataSources }) => {
    	return await dataSources.RepaymentScheduleAPI.addPayment( repaymentSchedule.id, { paymentReference, amount, paymentDate, Method, Status } );
	},

    assignPayment: async (repaymentSchedule, { paymentId }, { dataSources }) => {
    	return await dataSources.RepaymentScheduleAPI.assignToPayment( repaymentSchedule.id, paymentId );	
	},
	
    unassignPayment: async (_, { repaymentScheduleId }, { dataSources }) => {
    	return await dataSources.RepaymentScheduleAPI.unassignFromPayment( repaymentScheduleId );
	},
  },
  LoanPayment: {
	
	loanAccount: async (loanPayment, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.LoanPaymentAPI.getLoanAccount( loanPayment.id ).then(loanAccount => {
				resolve(loanAccount);
			})
		})
	},
	
    addLoanAccount: async (loanPayment, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status }, { dataSources }) => {
    	return await dataSources.LoanPaymentAPI.addLoanAccount( loanPayment.id, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } );
	},

    assignLoanAccount: async (loanPayment, { loanAccountId }, { dataSources }) => {
    	return await dataSources.LoanPaymentAPI.assignToLoanAccount( loanPayment.id, loanAccountId );	
	},
	
    unassignLoanAccount: async (_, { loanPaymentId }, { dataSources }) => {
    	return await dataSources.LoanPaymentAPI.unassignFromLoanAccount( loanPaymentId );
	},
	
	transaction: async (loanPayment, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.LoanPaymentAPI.getTransaction( loanPayment.id ).then(transaction => {
				resolve(transaction);
			})
		})
	},
	
    addTransaction: async (loanPayment, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel }, { dataSources }) => {
    	return await dataSources.LoanPaymentAPI.addTransaction( loanPayment.id, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } );
	},

    assignTransaction: async (loanPayment, { transactionId }, { dataSources }) => {
    	return await dataSources.LoanPaymentAPI.assignToTransaction( loanPayment.id, transactionId );	
	},
	
    unassignTransaction: async (_, { loanPaymentId }, { dataSources }) => {
    	return await dataSources.LoanPaymentAPI.unassignFromTransaction( loanPaymentId );
	},
  },
  Collateral: {
	
	loanAccount: async (collateral, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.CollateralAPI.getLoanAccount( collateral.id ).then(loanAccount => {
				resolve(loanAccount);
			})
		})
	},
	
    addLoanAccount: async (collateral, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status }, { dataSources }) => {
    	return await dataSources.CollateralAPI.addLoanAccount( collateral.id, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } );
	},

    assignLoanAccount: async (collateral, { loanAccountId }, { dataSources }) => {
    	return await dataSources.CollateralAPI.assignToLoanAccount( collateral.id, loanAccountId );	
	},
	
    unassignLoanAccount: async (_, { collateralId }, { dataSources }) => {
    	return await dataSources.CollateralAPI.unassignFromLoanAccount( collateralId );
	},
  },
  FeeCharge: {
	
	account: async (feeCharge, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.FeeChargeAPI.getAccount( feeCharge.id ).then(account => {
				resolve(account);
			})
		})
	},
	
    addAccount: async (feeCharge, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { dataSources }) => {
    	return await dataSources.FeeChargeAPI.addAccount( feeCharge.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } );
	},

    assignAccount: async (feeCharge, { accountId }, { dataSources }) => {
    	return await dataSources.FeeChargeAPI.assignToAccount( feeCharge.id, accountId );	
	},
	
    unassignAccount: async (_, { feeChargeId }, { dataSources }) => {
    	return await dataSources.FeeChargeAPI.unassignFromAccount( feeChargeId );
	},
	
	loanAccount: async (feeCharge, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.FeeChargeAPI.getLoanAccount( feeCharge.id ).then(loanAccount => {
				resolve(loanAccount);
			})
		})
	},
	
    addLoanAccount: async (feeCharge, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status }, { dataSources }) => {
    	return await dataSources.FeeChargeAPI.addLoanAccount( feeCharge.id, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } );
	},

    assignLoanAccount: async (feeCharge, { loanAccountId }, { dataSources }) => {
    	return await dataSources.FeeChargeAPI.assignToLoanAccount( feeCharge.id, loanAccountId );	
	},
	
    unassignLoanAccount: async (_, { feeChargeId }, { dataSources }) => {
    	return await dataSources.FeeChargeAPI.unassignFromLoanAccount( feeChargeId );
	},
  },
  ExchangeRate: {
	
	bank: async (exchangeRate, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.ExchangeRateAPI.getBank( exchangeRate.id ).then(bank => {
				resolve(bank);
			})
		})
	},
	
    addBank: async (exchangeRate, { name, legalName, swiftBic, headquartersCountry, website }, { dataSources }) => {
    	return await dataSources.ExchangeRateAPI.addBank( exchangeRate.id, { name, legalName, swiftBic, headquartersCountry, website } );
	},

    assignBank: async (exchangeRate, { bankId }, { dataSources }) => {
    	return await dataSources.ExchangeRateAPI.assignToBank( exchangeRate.id, bankId );	
	},
	
    unassignBank: async (_, { exchangeRateId }, { dataSources }) => {
    	return await dataSources.ExchangeRateAPI.unassignFromBank( exchangeRateId );
	},

	fxTrades: async (exchangeRate, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.ExchangeRateAPI.getLeagues( exchangeRate.id ).then(fxTrades => {
				resolve(fxTrades);
			})
		})
	},
        
    addToFxTrades: async (exchangeRate, { tradeReference, tradeDate, settlementDate, amountSold, amountBought, rate, Status }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.ExchangeRateAPI.addToFxTrades( exchangeRate.id, { tradeReference, tradeDate, settlementDate, amountSold, amountBought, rate, Status } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToFxTrades: async (exchangeRate, { fxTradesIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.ExchangeRateAPI.assignToFxTrades( exchangeRate.id, fxTradesIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	
  },
  FXTrade: {
	
	customer: async (fXTrade, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.FXTradeAPI.getCustomer( fXTrade.id ).then(customer => {
				resolve(customer);
			})
		})
	},
	
    addCustomer: async (fXTrade, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus }, { dataSources }) => {
    	return await dataSources.FXTradeAPI.addCustomer( fXTrade.id, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } );
	},

    assignCustomer: async (fXTrade, { customerId }, { dataSources }) => {
    	return await dataSources.FXTradeAPI.assignToCustomer( fXTrade.id, customerId );	
	},
	
    unassignCustomer: async (_, { fXTradeId }, { dataSources }) => {
    	return await dataSources.FXTradeAPI.unassignFromCustomer( fXTradeId );
	},
	
	bank: async (fXTrade, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.FXTradeAPI.getBank( fXTrade.id ).then(bank => {
				resolve(bank);
			})
		})
	},
	
    addBank: async (fXTrade, { name, legalName, swiftBic, headquartersCountry, website }, { dataSources }) => {
    	return await dataSources.FXTradeAPI.addBank( fXTrade.id, { name, legalName, swiftBic, headquartersCountry, website } );
	},

    assignBank: async (fXTrade, { bankId }, { dataSources }) => {
    	return await dataSources.FXTradeAPI.assignToBank( fXTrade.id, bankId );	
	},
	
    unassignBank: async (_, { fXTradeId }, { dataSources }) => {
    	return await dataSources.FXTradeAPI.unassignFromBank( fXTradeId );
	},
	
	exchangeRate: async (fXTrade, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.FXTradeAPI.getExchangeRate( fXTrade.id ).then(exchangeRate => {
				resolve(exchangeRate);
			})
		})
	},
	
    addExchangeRate: async (fXTrade, { baseCurrency, counterCurrency, rate, asOf, source }, { dataSources }) => {
    	return await dataSources.FXTradeAPI.addExchangeRate( fXTrade.id, { baseCurrency, counterCurrency, rate, asOf, source } );
	},

    assignExchangeRate: async (fXTrade, { exchangeRateId }, { dataSources }) => {
    	return await dataSources.FXTradeAPI.assignToExchangeRate( fXTrade.id, exchangeRateId );	
	},
	
    unassignExchangeRate: async (_, { fXTradeId }, { dataSources }) => {
    	return await dataSources.FXTradeAPI.unassignFromExchangeRate( fXTradeId );
	},
	
	sourceAccount: async (fXTrade, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.FXTradeAPI.getSourceAccount( fXTrade.id ).then(account => {
				resolve(account);
			})
		})
	},
	
    addSourceAccount: async (fXTrade, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { dataSources }) => {
    	return await dataSources.FXTradeAPI.addSourceAccount( fXTrade.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } );
	},

    assignSourceAccount: async (fXTrade, { sourceAccountId }, { dataSources }) => {
    	return await dataSources.FXTradeAPI.assignToSourceAccount( fXTrade.id, sourceAccountId );	
	},
	
    unassignSourceAccount: async (_, { fXTradeId }, { dataSources }) => {
    	return await dataSources.FXTradeAPI.unassignFromSourceAccount( fXTradeId );
	},
	
	destinationAccount: async (fXTrade, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.FXTradeAPI.getDestinationAccount( fXTrade.id ).then(account => {
				resolve(account);
			})
		})
	},
	
    addDestinationAccount: async (fXTrade, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { dataSources }) => {
    	return await dataSources.FXTradeAPI.addDestinationAccount( fXTrade.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } );
	},

    assignDestinationAccount: async (fXTrade, { destinationAccountId }, { dataSources }) => {
    	return await dataSources.FXTradeAPI.assignToDestinationAccount( fXTrade.id, destinationAccountId );	
	},
	
    unassignDestinationAccount: async (_, { fXTradeId }, { dataSources }) => {
    	return await dataSources.FXTradeAPI.unassignFromDestinationAccount( fXTradeId );
	},
	
	transaction: async (fXTrade, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.FXTradeAPI.getTransaction( fXTrade.id ).then(transaction => {
				resolve(transaction);
			})
		})
	},
	
    addTransaction: async (fXTrade, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel }, { dataSources }) => {
    	return await dataSources.FXTradeAPI.addTransaction( fXTrade.id, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } );
	},

    assignTransaction: async (fXTrade, { transactionId }, { dataSources }) => {
    	return await dataSources.FXTradeAPI.assignToTransaction( fXTrade.id, transactionId );	
	},
	
    unassignTransaction: async (_, { fXTradeId }, { dataSources }) => {
    	return await dataSources.FXTradeAPI.unassignFromTransaction( fXTradeId );
	},
  },
  Dispute: {
	
	transaction: async (dispute, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.DisputeAPI.getTransaction( dispute.id ).then(transaction => {
				resolve(transaction);
			})
		})
	},
	
    addTransaction: async (dispute, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel }, { dataSources }) => {
    	return await dataSources.DisputeAPI.addTransaction( dispute.id, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } );
	},

    assignTransaction: async (dispute, { transactionId }, { dataSources }) => {
    	return await dataSources.DisputeAPI.assignToTransaction( dispute.id, transactionId );	
	},
	
    unassignTransaction: async (_, { disputeId }, { dataSources }) => {
    	return await dataSources.DisputeAPI.unassignFromTransaction( disputeId );
	},
	
	customer: async (dispute, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.DisputeAPI.getCustomer( dispute.id ).then(customer => {
				resolve(customer);
			})
		})
	},
	
    addCustomer: async (dispute, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus }, { dataSources }) => {
    	return await dataSources.DisputeAPI.addCustomer( dispute.id, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } );
	},

    assignCustomer: async (dispute, { customerId }, { dataSources }) => {
    	return await dataSources.DisputeAPI.assignToCustomer( dispute.id, customerId );	
	},
	
    unassignCustomer: async (_, { disputeId }, { dataSources }) => {
    	return await dataSources.DisputeAPI.unassignFromCustomer( disputeId );
	},
	
	account: async (dispute, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.DisputeAPI.getAccount( dispute.id ).then(account => {
				resolve(account);
			})
		})
	},
	
    addAccount: async (dispute, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { dataSources }) => {
    	return await dataSources.DisputeAPI.addAccount( dispute.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } );
	},

    assignAccount: async (dispute, { accountId }, { dataSources }) => {
    	return await dataSources.DisputeAPI.assignToAccount( dispute.id, accountId );	
	},
	
    unassignAccount: async (_, { disputeId }, { dataSources }) => {
    	return await dataSources.DisputeAPI.unassignFromAccount( disputeId );
	},
	
	paymentCard: async (dispute, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.DisputeAPI.getPaymentCard( dispute.id ).then(paymentCard => {
				resolve(paymentCard);
			})
		})
	},
	
    addPaymentCard: async (dispute, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network }, { dataSources }) => {
    	return await dataSources.DisputeAPI.addPaymentCard( dispute.id, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network } );
	},

    assignPaymentCard: async (dispute, { paymentCardId }, { dataSources }) => {
    	return await dataSources.DisputeAPI.assignToPaymentCard( dispute.id, paymentCardId );	
	},
	
    unassignPaymentCard: async (_, { disputeId }, { dataSources }) => {
    	return await dataSources.DisputeAPI.unassignFromPaymentCard( disputeId );
	},
  },
  Consent: {
	
	customer: async (consent, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.ConsentAPI.getCustomer( consent.id ).then(customer => {
				resolve(customer);
			})
		})
	},
	
    addCustomer: async (consent, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus }, { dataSources }) => {
    	return await dataSources.ConsentAPI.addCustomer( consent.id, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } );
	},

    assignCustomer: async (consent, { customerId }, { dataSources }) => {
    	return await dataSources.ConsentAPI.assignToCustomer( consent.id, customerId );	
	},
	
    unassignCustomer: async (_, { consentId }, { dataSources }) => {
    	return await dataSources.ConsentAPI.unassignFromCustomer( consentId );
	},
	
	bank: async (consent, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.ConsentAPI.getBank( consent.id ).then(bank => {
				resolve(bank);
			})
		})
	},
	
    addBank: async (consent, { name, legalName, swiftBic, headquartersCountry, website }, { dataSources }) => {
    	return await dataSources.ConsentAPI.addBank( consent.id, { name, legalName, swiftBic, headquartersCountry, website } );
	},

    assignBank: async (consent, { bankId }, { dataSources }) => {
    	return await dataSources.ConsentAPI.assignToBank( consent.id, bankId );	
	},
	
    unassignBank: async (_, { consentId }, { dataSources }) => {
    	return await dataSources.ConsentAPI.unassignFromBank( consentId );
	},
	
	thirdPartyProvider: async (consent, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.ConsentAPI.getThirdPartyProvider( consent.id ).then(thirdPartyProvider => {
				resolve(thirdPartyProvider);
			})
		})
	},
	
    addThirdPartyProvider: async (consent, { name, registrationId, website }, { dataSources }) => {
    	return await dataSources.ConsentAPI.addThirdPartyProvider( consent.id, { name, registrationId, website } );
	},

    assignThirdPartyProvider: async (consent, { thirdPartyProviderId }, { dataSources }) => {
    	return await dataSources.ConsentAPI.assignToThirdPartyProvider( consent.id, thirdPartyProviderId );	
	},
	
    unassignThirdPartyProvider: async (_, { consentId }, { dataSources }) => {
    	return await dataSources.ConsentAPI.unassignFromThirdPartyProvider( consentId );
	},

	authorizedAccounts: async (consent, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.ConsentAPI.getLeagues( consent.id ).then(authorizedAccounts => {
				resolve(authorizedAccounts);
			})
		})
	},
        
    addToAuthorizedAccounts: async (consent, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.ConsentAPI.addToAuthorizedAccounts( consent.id, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToAuthorizedAccounts: async (consent, { authorizedAccountsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.ConsentAPI.assignToAuthorizedAccounts( consent.id, authorizedAccountsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	
  },
  ThirdPartyProvider: {
	
	bank: async (thirdPartyProvider, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.ThirdPartyProviderAPI.getBank( thirdPartyProvider.id ).then(bank => {
				resolve(bank);
			})
		})
	},
	
    addBank: async (thirdPartyProvider, { name, legalName, swiftBic, headquartersCountry, website }, { dataSources }) => {
    	return await dataSources.ThirdPartyProviderAPI.addBank( thirdPartyProvider.id, { name, legalName, swiftBic, headquartersCountry, website } );
	},

    assignBank: async (thirdPartyProvider, { bankId }, { dataSources }) => {
    	return await dataSources.ThirdPartyProviderAPI.assignToBank( thirdPartyProvider.id, bankId );	
	},
	
    unassignBank: async (_, { thirdPartyProviderId }, { dataSources }) => {
    	return await dataSources.ThirdPartyProviderAPI.unassignFromBank( thirdPartyProviderId );
	},

	consents: async (thirdPartyProvider, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.ThirdPartyProviderAPI.getLeagues( thirdPartyProvider.id ).then(consents => {
				resolve(consents);
			})
		})
	},
        
    addToConsents: async (thirdPartyProvider, { grantedOn, expiresOn, ConsentType, Status }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.ThirdPartyProviderAPI.addToConsents( thirdPartyProvider.id, { grantedOn, expiresOn, ConsentType, Status } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToConsents: async (thirdPartyProvider, { consentsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.ThirdPartyProviderAPI.assignToConsents( thirdPartyProvider.id, consentsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	
  },
};

