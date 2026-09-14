import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HomePageComponent from './components/HomePageComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ListBankComponent from './components/ListBankComponent';
import CreateBankComponent from './components/CreateBankComponent';
import ViewBankComponent from './components/ViewBankComponent';
import ListBranchComponent from './components/ListBranchComponent';
import CreateBranchComponent from './components/CreateBranchComponent';
import ViewBranchComponent from './components/ViewBranchComponent';
import ListATMComponent from './components/ListATMComponent';
import CreateATMComponent from './components/CreateATMComponent';
import ViewATMComponent from './components/ViewATMComponent';
import ListCustomerComponent from './components/ListCustomerComponent';
import CreateCustomerComponent from './components/CreateCustomerComponent';
import ViewCustomerComponent from './components/ViewCustomerComponent';
import ListKycProfileComponent from './components/ListKycProfileComponent';
import CreateKycProfileComponent from './components/CreateKycProfileComponent';
import ViewKycProfileComponent from './components/ViewKycProfileComponent';
import ListIdentityDocumentComponent from './components/ListIdentityDocumentComponent';
import CreateIdentityDocumentComponent from './components/CreateIdentityDocumentComponent';
import ViewIdentityDocumentComponent from './components/ViewIdentityDocumentComponent';
import ListRiskAssessmentComponent from './components/ListRiskAssessmentComponent';
import CreateRiskAssessmentComponent from './components/CreateRiskAssessmentComponent';
import ViewRiskAssessmentComponent from './components/ViewRiskAssessmentComponent';
import ListScreeningResultComponent from './components/ListScreeningResultComponent';
import CreateScreeningResultComponent from './components/CreateScreeningResultComponent';
import ViewScreeningResultComponent from './components/ViewScreeningResultComponent';
import ListBankingProductComponent from './components/ListBankingProductComponent';
import CreateBankingProductComponent from './components/CreateBankingProductComponent';
import ViewBankingProductComponent from './components/ViewBankingProductComponent';
import ListAccountComponent from './components/ListAccountComponent';
import CreateAccountComponent from './components/CreateAccountComponent';
import ViewAccountComponent from './components/ViewAccountComponent';
import ListAccountStatementComponent from './components/ListAccountStatementComponent';
import CreateAccountStatementComponent from './components/CreateAccountStatementComponent';
import ViewAccountStatementComponent from './components/ViewAccountStatementComponent';
import ListTransactionComponent from './components/ListTransactionComponent';
import CreateTransactionComponent from './components/CreateTransactionComponent';
import ViewTransactionComponent from './components/ViewTransactionComponent';
import ListExternalAccountComponent from './components/ListExternalAccountComponent';
import CreateExternalAccountComponent from './components/CreateExternalAccountComponent';
import ViewExternalAccountComponent from './components/ViewExternalAccountComponent';
import ListFundsTransferComponent from './components/ListFundsTransferComponent';
import CreateFundsTransferComponent from './components/CreateFundsTransferComponent';
import ViewFundsTransferComponent from './components/ViewFundsTransferComponent';
import ListStandingInstructionComponent from './components/ListStandingInstructionComponent';
import CreateStandingInstructionComponent from './components/CreateStandingInstructionComponent';
import ViewStandingInstructionComponent from './components/ViewStandingInstructionComponent';
import ListPaymentCardComponent from './components/ListPaymentCardComponent';
import CreatePaymentCardComponent from './components/CreatePaymentCardComponent';
import ViewPaymentCardComponent from './components/ViewPaymentCardComponent';
import ListLoanAccountComponent from './components/ListLoanAccountComponent';
import CreateLoanAccountComponent from './components/CreateLoanAccountComponent';
import ViewLoanAccountComponent from './components/ViewLoanAccountComponent';
import ListRepaymentScheduleComponent from './components/ListRepaymentScheduleComponent';
import CreateRepaymentScheduleComponent from './components/CreateRepaymentScheduleComponent';
import ViewRepaymentScheduleComponent from './components/ViewRepaymentScheduleComponent';
import ListLoanPaymentComponent from './components/ListLoanPaymentComponent';
import CreateLoanPaymentComponent from './components/CreateLoanPaymentComponent';
import ViewLoanPaymentComponent from './components/ViewLoanPaymentComponent';
import ListCollateralComponent from './components/ListCollateralComponent';
import CreateCollateralComponent from './components/CreateCollateralComponent';
import ViewCollateralComponent from './components/ViewCollateralComponent';
import ListFeeChargeComponent from './components/ListFeeChargeComponent';
import CreateFeeChargeComponent from './components/CreateFeeChargeComponent';
import ViewFeeChargeComponent from './components/ViewFeeChargeComponent';
import ListExchangeRateComponent from './components/ListExchangeRateComponent';
import CreateExchangeRateComponent from './components/CreateExchangeRateComponent';
import ViewExchangeRateComponent from './components/ViewExchangeRateComponent';
import ListFXTradeComponent from './components/ListFXTradeComponent';
import CreateFXTradeComponent from './components/CreateFXTradeComponent';
import ViewFXTradeComponent from './components/ViewFXTradeComponent';
import ListDisputeComponent from './components/ListDisputeComponent';
import CreateDisputeComponent from './components/CreateDisputeComponent';
import ViewDisputeComponent from './components/ViewDisputeComponent';
import ListConsentComponent from './components/ListConsentComponent';
import CreateConsentComponent from './components/CreateConsentComponent';
import ViewConsentComponent from './components/ViewConsentComponent';
import ListThirdPartyProviderComponent from './components/ListThirdPartyProviderComponent';
import CreateThirdPartyProviderComponent from './components/CreateThirdPartyProviderComponent';
import ViewThirdPartyProviderComponent from './components/ViewThirdPartyProviderComponent';
function App() {
  return (
    <div>
        <Router>
                <HeaderComponent className="header"/>
                <div className="container">
                    <Switch>
                          <Route path = "/" exact component = {HomePageComponent}></Route>
                            <Route path = "/banks" component = {ListBankComponent}></Route>
                            <Route path = "/add-bank/:id" component = {CreateBankComponent}></Route>
                            <Route path = "/view-bank/:id" component = {ViewBankComponent}></Route>
                          {/* <Route path = "/update-bank/:id" component = {UpdateBankComponent}></Route> */}
                            <Route path = "/branchs" component = {ListBranchComponent}></Route>
                            <Route path = "/add-branch/:id" component = {CreateBranchComponent}></Route>
                            <Route path = "/view-branch/:id" component = {ViewBranchComponent}></Route>
                          {/* <Route path = "/update-branch/:id" component = {UpdateBranchComponent}></Route> */}
                            <Route path = "/aTMs" component = {ListATMComponent}></Route>
                            <Route path = "/add-aTM/:id" component = {CreateATMComponent}></Route>
                            <Route path = "/view-aTM/:id" component = {ViewATMComponent}></Route>
                          {/* <Route path = "/update-aTM/:id" component = {UpdateATMComponent}></Route> */}
                            <Route path = "/customers" component = {ListCustomerComponent}></Route>
                            <Route path = "/add-customer/:id" component = {CreateCustomerComponent}></Route>
                            <Route path = "/view-customer/:id" component = {ViewCustomerComponent}></Route>
                          {/* <Route path = "/update-customer/:id" component = {UpdateCustomerComponent}></Route> */}
                            <Route path = "/kycProfiles" component = {ListKycProfileComponent}></Route>
                            <Route path = "/add-kycProfile/:id" component = {CreateKycProfileComponent}></Route>
                            <Route path = "/view-kycProfile/:id" component = {ViewKycProfileComponent}></Route>
                          {/* <Route path = "/update-kycProfile/:id" component = {UpdateKycProfileComponent}></Route> */}
                            <Route path = "/identityDocuments" component = {ListIdentityDocumentComponent}></Route>
                            <Route path = "/add-identityDocument/:id" component = {CreateIdentityDocumentComponent}></Route>
                            <Route path = "/view-identityDocument/:id" component = {ViewIdentityDocumentComponent}></Route>
                          {/* <Route path = "/update-identityDocument/:id" component = {UpdateIdentityDocumentComponent}></Route> */}
                            <Route path = "/riskAssessments" component = {ListRiskAssessmentComponent}></Route>
                            <Route path = "/add-riskAssessment/:id" component = {CreateRiskAssessmentComponent}></Route>
                            <Route path = "/view-riskAssessment/:id" component = {ViewRiskAssessmentComponent}></Route>
                          {/* <Route path = "/update-riskAssessment/:id" component = {UpdateRiskAssessmentComponent}></Route> */}
                            <Route path = "/screeningResults" component = {ListScreeningResultComponent}></Route>
                            <Route path = "/add-screeningResult/:id" component = {CreateScreeningResultComponent}></Route>
                            <Route path = "/view-screeningResult/:id" component = {ViewScreeningResultComponent}></Route>
                          {/* <Route path = "/update-screeningResult/:id" component = {UpdateScreeningResultComponent}></Route> */}
                            <Route path = "/bankingProducts" component = {ListBankingProductComponent}></Route>
                            <Route path = "/add-bankingProduct/:id" component = {CreateBankingProductComponent}></Route>
                            <Route path = "/view-bankingProduct/:id" component = {ViewBankingProductComponent}></Route>
                          {/* <Route path = "/update-bankingProduct/:id" component = {UpdateBankingProductComponent}></Route> */}
                            <Route path = "/accounts" component = {ListAccountComponent}></Route>
                            <Route path = "/add-account/:id" component = {CreateAccountComponent}></Route>
                            <Route path = "/view-account/:id" component = {ViewAccountComponent}></Route>
                          {/* <Route path = "/update-account/:id" component = {UpdateAccountComponent}></Route> */}
                            <Route path = "/accountStatements" component = {ListAccountStatementComponent}></Route>
                            <Route path = "/add-accountStatement/:id" component = {CreateAccountStatementComponent}></Route>
                            <Route path = "/view-accountStatement/:id" component = {ViewAccountStatementComponent}></Route>
                          {/* <Route path = "/update-accountStatement/:id" component = {UpdateAccountStatementComponent}></Route> */}
                            <Route path = "/transactions" component = {ListTransactionComponent}></Route>
                            <Route path = "/add-transaction/:id" component = {CreateTransactionComponent}></Route>
                            <Route path = "/view-transaction/:id" component = {ViewTransactionComponent}></Route>
                          {/* <Route path = "/update-transaction/:id" component = {UpdateTransactionComponent}></Route> */}
                            <Route path = "/externalAccounts" component = {ListExternalAccountComponent}></Route>
                            <Route path = "/add-externalAccount/:id" component = {CreateExternalAccountComponent}></Route>
                            <Route path = "/view-externalAccount/:id" component = {ViewExternalAccountComponent}></Route>
                          {/* <Route path = "/update-externalAccount/:id" component = {UpdateExternalAccountComponent}></Route> */}
                            <Route path = "/fundsTransfers" component = {ListFundsTransferComponent}></Route>
                            <Route path = "/add-fundsTransfer/:id" component = {CreateFundsTransferComponent}></Route>
                            <Route path = "/view-fundsTransfer/:id" component = {ViewFundsTransferComponent}></Route>
                          {/* <Route path = "/update-fundsTransfer/:id" component = {UpdateFundsTransferComponent}></Route> */}
                            <Route path = "/standingInstructions" component = {ListStandingInstructionComponent}></Route>
                            <Route path = "/add-standingInstruction/:id" component = {CreateStandingInstructionComponent}></Route>
                            <Route path = "/view-standingInstruction/:id" component = {ViewStandingInstructionComponent}></Route>
                          {/* <Route path = "/update-standingInstruction/:id" component = {UpdateStandingInstructionComponent}></Route> */}
                            <Route path = "/paymentCards" component = {ListPaymentCardComponent}></Route>
                            <Route path = "/add-paymentCard/:id" component = {CreatePaymentCardComponent}></Route>
                            <Route path = "/view-paymentCard/:id" component = {ViewPaymentCardComponent}></Route>
                          {/* <Route path = "/update-paymentCard/:id" component = {UpdatePaymentCardComponent}></Route> */}
                            <Route path = "/loanAccounts" component = {ListLoanAccountComponent}></Route>
                            <Route path = "/add-loanAccount/:id" component = {CreateLoanAccountComponent}></Route>
                            <Route path = "/view-loanAccount/:id" component = {ViewLoanAccountComponent}></Route>
                          {/* <Route path = "/update-loanAccount/:id" component = {UpdateLoanAccountComponent}></Route> */}
                            <Route path = "/repaymentSchedules" component = {ListRepaymentScheduleComponent}></Route>
                            <Route path = "/add-repaymentSchedule/:id" component = {CreateRepaymentScheduleComponent}></Route>
                            <Route path = "/view-repaymentSchedule/:id" component = {ViewRepaymentScheduleComponent}></Route>
                          {/* <Route path = "/update-repaymentSchedule/:id" component = {UpdateRepaymentScheduleComponent}></Route> */}
                            <Route path = "/loanPayments" component = {ListLoanPaymentComponent}></Route>
                            <Route path = "/add-loanPayment/:id" component = {CreateLoanPaymentComponent}></Route>
                            <Route path = "/view-loanPayment/:id" component = {ViewLoanPaymentComponent}></Route>
                          {/* <Route path = "/update-loanPayment/:id" component = {UpdateLoanPaymentComponent}></Route> */}
                            <Route path = "/collaterals" component = {ListCollateralComponent}></Route>
                            <Route path = "/add-collateral/:id" component = {CreateCollateralComponent}></Route>
                            <Route path = "/view-collateral/:id" component = {ViewCollateralComponent}></Route>
                          {/* <Route path = "/update-collateral/:id" component = {UpdateCollateralComponent}></Route> */}
                            <Route path = "/feeCharges" component = {ListFeeChargeComponent}></Route>
                            <Route path = "/add-feeCharge/:id" component = {CreateFeeChargeComponent}></Route>
                            <Route path = "/view-feeCharge/:id" component = {ViewFeeChargeComponent}></Route>
                          {/* <Route path = "/update-feeCharge/:id" component = {UpdateFeeChargeComponent}></Route> */}
                            <Route path = "/exchangeRates" component = {ListExchangeRateComponent}></Route>
                            <Route path = "/add-exchangeRate/:id" component = {CreateExchangeRateComponent}></Route>
                            <Route path = "/view-exchangeRate/:id" component = {ViewExchangeRateComponent}></Route>
                          {/* <Route path = "/update-exchangeRate/:id" component = {UpdateExchangeRateComponent}></Route> */}
                            <Route path = "/fXTrades" component = {ListFXTradeComponent}></Route>
                            <Route path = "/add-fXTrade/:id" component = {CreateFXTradeComponent}></Route>
                            <Route path = "/view-fXTrade/:id" component = {ViewFXTradeComponent}></Route>
                          {/* <Route path = "/update-fXTrade/:id" component = {UpdateFXTradeComponent}></Route> */}
                            <Route path = "/disputes" component = {ListDisputeComponent}></Route>
                            <Route path = "/add-dispute/:id" component = {CreateDisputeComponent}></Route>
                            <Route path = "/view-dispute/:id" component = {ViewDisputeComponent}></Route>
                          {/* <Route path = "/update-dispute/:id" component = {UpdateDisputeComponent}></Route> */}
                            <Route path = "/consents" component = {ListConsentComponent}></Route>
                            <Route path = "/add-consent/:id" component = {CreateConsentComponent}></Route>
                            <Route path = "/view-consent/:id" component = {ViewConsentComponent}></Route>
                          {/* <Route path = "/update-consent/:id" component = {UpdateConsentComponent}></Route> */}
                            <Route path = "/thirdPartyProviders" component = {ListThirdPartyProviderComponent}></Route>
                            <Route path = "/add-thirdPartyProvider/:id" component = {CreateThirdPartyProviderComponent}></Route>
                            <Route path = "/view-thirdPartyProvider/:id" component = {ViewThirdPartyProviderComponent}></Route>
                          {/* <Route path = "/update-thirdPartyProvider/:id" component = {UpdateThirdPartyProviderComponent}></Route> */}
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
