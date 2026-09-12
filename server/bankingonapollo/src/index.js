const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const { createStore } = require('./utils');
const context = async ({ req }) => {
	  return {};
	};
const BankAPI = require('./datasources/BankDS');
const BranchAPI = require('./datasources/BranchDS');
const ATMAPI = require('./datasources/ATMDS');
const CustomerAPI = require('./datasources/CustomerDS');
const KycProfileAPI = require('./datasources/KycProfileDS');
const IdentityDocumentAPI = require('./datasources/IdentityDocumentDS');
const RiskAssessmentAPI = require('./datasources/RiskAssessmentDS');
const ScreeningResultAPI = require('./datasources/ScreeningResultDS');
const BankingProductAPI = require('./datasources/BankingProductDS');
const AccountAPI = require('./datasources/AccountDS');
const AccountStatementAPI = require('./datasources/AccountStatementDS');
const TransactionAPI = require('./datasources/TransactionDS');
const ExternalAccountAPI = require('./datasources/ExternalAccountDS');
const FundsTransferAPI = require('./datasources/FundsTransferDS');
const StandingInstructionAPI = require('./datasources/StandingInstructionDS');
const PaymentCardAPI = require('./datasources/PaymentCardDS');
const LoanAccountAPI = require('./datasources/LoanAccountDS');
const RepaymentScheduleAPI = require('./datasources/RepaymentScheduleDS');
const LoanPaymentAPI = require('./datasources/LoanPaymentDS');
const CollateralAPI = require('./datasources/CollateralDS');
const FeeChargeAPI = require('./datasources/FeeChargeDS');
const ExchangeRateAPI = require('./datasources/ExchangeRateDS');
const FXTradeAPI = require('./datasources/FXTradeDS');
const DisputeAPI = require('./datasources/DisputeDS');
const ConsentAPI = require('./datasources/ConsentDS');
const ThirdPartyProviderAPI = require('./datasources/ThirdPartyProviderDS');

const store = createStore();
const internalEngineConfig = require('./engine-config');	
const dataSources = () => ({
	    BankAPI: new BankAPI({ store }),
	    BranchAPI: new BranchAPI({ store }),
	    ATMAPI: new ATMAPI({ store }),
	    CustomerAPI: new CustomerAPI({ store }),
	    KycProfileAPI: new KycProfileAPI({ store }),
	    IdentityDocumentAPI: new IdentityDocumentAPI({ store }),
	    RiskAssessmentAPI: new RiskAssessmentAPI({ store }),
	    ScreeningResultAPI: new ScreeningResultAPI({ store }),
	    BankingProductAPI: new BankingProductAPI({ store }),
	    AccountAPI: new AccountAPI({ store }),
	    AccountStatementAPI: new AccountStatementAPI({ store }),
	    TransactionAPI: new TransactionAPI({ store }),
	    ExternalAccountAPI: new ExternalAccountAPI({ store }),
	    FundsTransferAPI: new FundsTransferAPI({ store }),
	    StandingInstructionAPI: new StandingInstructionAPI({ store }),
	    PaymentCardAPI: new PaymentCardAPI({ store }),
	    LoanAccountAPI: new LoanAccountAPI({ store }),
	    RepaymentScheduleAPI: new RepaymentScheduleAPI({ store }),
	    LoanPaymentAPI: new LoanPaymentAPI({ store }),
	    CollateralAPI: new CollateralAPI({ store }),
	    FeeChargeAPI: new FeeChargeAPI({ store }),
	    ExchangeRateAPI: new ExchangeRateAPI({ store }),
	    FXTradeAPI: new FXTradeAPI({ store }),
	    DisputeAPI: new DisputeAPI({ store }),
	    ConsentAPI: new ConsentAPI({ store }),
	    ThirdPartyProviderAPI: new ThirdPartyProviderAPI({ store }),
});

store.bank.sync();
store.branch.sync();
store.aTM.sync();
store.customer.sync();
store.kycProfile.sync();
store.identityDocument.sync();
store.riskAssessment.sync();
store.screeningResult.sync();
store.bankingProduct.sync();
store.account.sync();
store.accountStatement.sync();
store.transaction.sync();
store.externalAccount.sync();
store.fundsTransfer.sync();
store.standingInstruction.sync();
store.paymentCard.sync();
store.loanAccount.sync();
store.repaymentSchedule.sync();
store.loanPayment.sync();
store.collateral.sync();
store.feeCharge.sync();
store.exchangeRate.sync();
store.fXTrade.sync();
store.dispute.sync();
store.consent.sync();
store.thirdPartyProvider.sync();

const server = new ApolloServer({
  typeDefs,
  context,
  resolvers,
  playground: { version: '1.7.25' },
  engine: {
    apiKey: process.env.APOLLO_KEY,
	...internalEngineConfig,
  },
  dataSources

});

server.listen().then(({ url }) => {
  console.log(`ð Server ready at ${url}`);
});


module.exports = {
    dataSources,
	context,
	typeDefs,
	resolvers,
	ApolloServer,
	store,
	server,
    BankAPI,
    BranchAPI,
    ATMAPI,
    CustomerAPI,
    KycProfileAPI,
    IdentityDocumentAPI,
    RiskAssessmentAPI,
    ScreeningResultAPI,
    BankingProductAPI,
    AccountAPI,
    AccountStatementAPI,
    TransactionAPI,
    ExternalAccountAPI,
    FundsTransferAPI,
    StandingInstructionAPI,
    PaymentCardAPI,
    LoanAccountAPI,
    RepaymentScheduleAPI,
    LoanPaymentAPI,
    CollateralAPI,
    FeeChargeAPI,
    ExchangeRateAPI,
    FXTradeAPI,
    DisputeAPI,
    ConsentAPI,
    ThirdPartyProviderAPI,
};