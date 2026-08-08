package router

import (

    WealthFirmController "WealthManagement-on-golang/internal/controller"
    OfficeController "WealthManagement-on-golang/internal/controller"
    AdvisorController "WealthManagement-on-golang/internal/controller"
    AdvisoryTeamController "WealthManagement-on-golang/internal/controller"
    HouseholdController "WealthManagement-on-golang/internal/controller"
    ClientController "WealthManagement-on-golang/internal/controller"
    KycRecordController "WealthManagement-on-golang/internal/controller"
    BeneficiaryController "WealthManagement-on-golang/internal/controller"
    CustodianController "WealthManagement-on-golang/internal/controller"
    AccountController "WealthManagement-on-golang/internal/controller"
    PortfolioController "WealthManagement-on-golang/internal/controller"
    InvestmentProgramController "WealthManagement-on-golang/internal/controller"
    ModelPortfolioController "WealthManagement-on-golang/internal/controller"
    AssetAllocationSliceController "WealthManagement-on-golang/internal/controller"
    InvestmentPolicyController "WealthManagement-on-golang/internal/controller"
    RiskAssessmentController "WealthManagement-on-golang/internal/controller"
    WealthGoalController "WealthManagement-on-golang/internal/controller"
    SecurityController "WealthManagement-on-golang/internal/controller"
    MarketPriceController "WealthManagement-on-golang/internal/controller"
    CorporateActionController "WealthManagement-on-golang/internal/controller"
    DividendController "WealthManagement-on-golang/internal/controller"
    PositionController "WealthManagement-on-golang/internal/controller"
    TaxLotController "WealthManagement-on-golang/internal/controller"
    TransactionController "WealthManagement-on-golang/internal/controller"
    Order_Controller "WealthManagement-on-golang/internal/controller"
    OrderAllocationController "WealthManagement-on-golang/internal/controller"
    TradeController "WealthManagement-on-golang/internal/controller"
    RebalancePlanController "WealthManagement-on-golang/internal/controller"
    PerformanceReportController "WealthManagement-on-golang/internal/controller"
    BenchmarkController "WealthManagement-on-golang/internal/controller"
    FeeScheduleController "WealthManagement-on-golang/internal/controller"
    FeeController "WealthManagement-on-golang/internal/controller"
    BillingRunController "WealthManagement-on-golang/internal/controller"
    InvoiceController "WealthManagement-on-golang/internal/controller"
    DocumentController "WealthManagement-on-golang/internal/controller"
    AgreementController "WealthManagement-on-golang/internal/controller"
    ComplianceRuleController "WealthManagement-on-golang/internal/controller"
    ComplianceAlertController "WealthManagement-on-golang/internal/controller"
    ProposalController "WealthManagement-on-golang/internal/controller"
    AccountTransferController "WealthManagement-on-golang/internal/controller"
    StandingInstructionController "WealthManagement-on-golang/internal/controller"
    CashMovementController "WealthManagement-on-golang/internal/controller"
    ResearchNoteController "WealthManagement-on-golang/internal/controller"
    MeetingController "WealthManagement-on-golang/internal/controller"
    jsonResponseFormatter "WealthManagement-on-golang/internal/response"
    "github.com/gorilla/mux"

    PulseIndicatorController__ "WealthManagement-on-golang/internal/controller"

)

// Router is exported and used in main.go
func Router() *mux.Router {

    router := mux.NewRouter()

    //----------------------------------------------------------------------------
    // default controllers for health and availability checking
    //----------------------------------------------------------------------------

    router.HandleFunc("/", jsonResponseFormatter.FormatToJSON(PulseIndicatorController__.Default__)).Methods("GET", "OPTIONS")
    router.HandleFunc("/health", jsonResponseFormatter.FormatToJSON(PulseIndicatorController__.Health__)).Methods("GET", "OPTIONS")


    //----------------------------------------------------------------------------
    // WealthFirm Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/WealthFirm/{id}", jsonResponseFormatter.FormatToJSON(WealthFirmController.GetWealthFirm)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/WealthFirm", jsonResponseFormatter.FormatToJSON(WealthFirmController.GetAllWealthFirm)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewWealthFirm", jsonResponseFormatter.FormatToJSON(WealthFirmController.CreateWealthFirm)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/WealthFirm/{id}", jsonResponseFormatter.FormatToJSON(WealthFirmController.UpdateWealthFirm)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteWealthFirm/{id}", jsonResponseFormatter.FormatToJSON(WealthFirmController.DeleteWealthFirm)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddAdvisorsToWealthFirm/{parentId}/advisorsId", jsonResponseFormatter.FormatToJSON(WealthFirmController.AddAdvisorsToWealthFirm)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveAdvisorsFromWealthFirm/{parentId}/advisorsIds", jsonResponseFormatter.FormatToJSON(WealthFirmController.RemoveAdvisorsFromWealthFirm)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddOfficesToWealthFirm/{parentId}/officesId", jsonResponseFormatter.FormatToJSON(WealthFirmController.AddOfficesToWealthFirm)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveOfficesFromWealthFirm/{parentId}/officesIds", jsonResponseFormatter.FormatToJSON(WealthFirmController.RemoveOfficesFromWealthFirm)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddCustodiansToWealthFirm/{parentId}/custodiansId", jsonResponseFormatter.FormatToJSON(WealthFirmController.AddCustodiansToWealthFirm)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveCustodiansFromWealthFirm/{parentId}/custodiansIds", jsonResponseFormatter.FormatToJSON(WealthFirmController.RemoveCustodiansFromWealthFirm)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddInvestmentProgramsToWealthFirm/{parentId}/investmentProgramsId", jsonResponseFormatter.FormatToJSON(WealthFirmController.AddInvestmentProgramsToWealthFirm)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveInvestmentProgramsFromWealthFirm/{parentId}/investmentProgramsIds", jsonResponseFormatter.FormatToJSON(WealthFirmController.RemoveInvestmentProgramsFromWealthFirm)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Office Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Office/{id}", jsonResponseFormatter.FormatToJSON(OfficeController.GetOffice)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Office", jsonResponseFormatter.FormatToJSON(OfficeController.GetAllOffice)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewOffice", jsonResponseFormatter.FormatToJSON(OfficeController.CreateOffice)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Office/{id}", jsonResponseFormatter.FormatToJSON(OfficeController.UpdateOffice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteOffice/{id}", jsonResponseFormatter.FormatToJSON(OfficeController.DeleteOffice)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignFirmToOffice/{parentId}/firmId", jsonResponseFormatter.FormatToJSON(OfficeController.AssignFirmToOffice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignFirmFromOffice/{parentId}", jsonResponseFormatter.FormatToJSON(OfficeController.UnassignFirmFromOffice)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddAdvisorsToOffice/{parentId}/advisorsId", jsonResponseFormatter.FormatToJSON(OfficeController.AddAdvisorsToOffice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveAdvisorsFromOffice/{parentId}/advisorsIds", jsonResponseFormatter.FormatToJSON(OfficeController.RemoveAdvisorsFromOffice)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Advisor Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Advisor/{id}", jsonResponseFormatter.FormatToJSON(AdvisorController.GetAdvisor)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Advisor", jsonResponseFormatter.FormatToJSON(AdvisorController.GetAllAdvisor)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewAdvisor", jsonResponseFormatter.FormatToJSON(AdvisorController.CreateAdvisor)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Advisor/{id}", jsonResponseFormatter.FormatToJSON(AdvisorController.UpdateAdvisor)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteAdvisor/{id}", jsonResponseFormatter.FormatToJSON(AdvisorController.DeleteAdvisor)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignFirmToAdvisor/{parentId}/firmId", jsonResponseFormatter.FormatToJSON(AdvisorController.AssignFirmToAdvisor)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignFirmFromAdvisor/{parentId}", jsonResponseFormatter.FormatToJSON(AdvisorController.UnassignFirmFromAdvisor)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignOfficeToAdvisor/{parentId}/officeId", jsonResponseFormatter.FormatToJSON(AdvisorController.AssignOfficeToAdvisor)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignOfficeFromAdvisor/{parentId}", jsonResponseFormatter.FormatToJSON(AdvisorController.UnassignOfficeFromAdvisor)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignAdvisoryTeamToAdvisor/{parentId}/advisoryTeamId", jsonResponseFormatter.FormatToJSON(AdvisorController.AssignAdvisoryTeamToAdvisor)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignAdvisoryTeamFromAdvisor/{parentId}", jsonResponseFormatter.FormatToJSON(AdvisorController.UnassignAdvisoryTeamFromAdvisor)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddClientsToAdvisor/{parentId}/clientsId", jsonResponseFormatter.FormatToJSON(AdvisorController.AddClientsToAdvisor)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveClientsFromAdvisor/{parentId}/clientsIds", jsonResponseFormatter.FormatToJSON(AdvisorController.RemoveClientsFromAdvisor)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // AdvisoryTeam Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AdvisoryTeam/{id}", jsonResponseFormatter.FormatToJSON(AdvisoryTeamController.GetAdvisoryTeam)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/AdvisoryTeam", jsonResponseFormatter.FormatToJSON(AdvisoryTeamController.GetAllAdvisoryTeam)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewAdvisoryTeam", jsonResponseFormatter.FormatToJSON(AdvisoryTeamController.CreateAdvisoryTeam)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/AdvisoryTeam/{id}", jsonResponseFormatter.FormatToJSON(AdvisoryTeamController.UpdateAdvisoryTeam)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteAdvisoryTeam/{id}", jsonResponseFormatter.FormatToJSON(AdvisoryTeamController.DeleteAdvisoryTeam)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddAdvisorsToAdvisoryTeam/{parentId}/advisorsId", jsonResponseFormatter.FormatToJSON(AdvisoryTeamController.AddAdvisorsToAdvisoryTeam)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveAdvisorsFromAdvisoryTeam/{parentId}/advisorsIds", jsonResponseFormatter.FormatToJSON(AdvisoryTeamController.RemoveAdvisorsFromAdvisoryTeam)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddHouseholdsToAdvisoryTeam/{parentId}/householdsId", jsonResponseFormatter.FormatToJSON(AdvisoryTeamController.AddHouseholdsToAdvisoryTeam)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveHouseholdsFromAdvisoryTeam/{parentId}/householdsIds", jsonResponseFormatter.FormatToJSON(AdvisoryTeamController.RemoveHouseholdsFromAdvisoryTeam)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Household Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Household/{id}", jsonResponseFormatter.FormatToJSON(HouseholdController.GetHousehold)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Household", jsonResponseFormatter.FormatToJSON(HouseholdController.GetAllHousehold)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewHousehold", jsonResponseFormatter.FormatToJSON(HouseholdController.CreateHousehold)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Household/{id}", jsonResponseFormatter.FormatToJSON(HouseholdController.UpdateHousehold)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteHousehold/{id}", jsonResponseFormatter.FormatToJSON(HouseholdController.DeleteHousehold)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignPrimaryAdvisorToHousehold/{parentId}/primaryAdvisorId", jsonResponseFormatter.FormatToJSON(HouseholdController.AssignPrimaryAdvisorToHousehold)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignPrimaryAdvisorFromHousehold/{parentId}", jsonResponseFormatter.FormatToJSON(HouseholdController.UnassignPrimaryAdvisorFromHousehold)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddClientsToHousehold/{parentId}/clientsId", jsonResponseFormatter.FormatToJSON(HouseholdController.AddClientsToHousehold)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveClientsFromHousehold/{parentId}/clientsIds", jsonResponseFormatter.FormatToJSON(HouseholdController.RemoveClientsFromHousehold)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddPortfoliosToHousehold/{parentId}/portfoliosId", jsonResponseFormatter.FormatToJSON(HouseholdController.AddPortfoliosToHousehold)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemovePortfoliosFromHousehold/{parentId}/portfoliosIds", jsonResponseFormatter.FormatToJSON(HouseholdController.RemovePortfoliosFromHousehold)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddGoalsToHousehold/{parentId}/goalsId", jsonResponseFormatter.FormatToJSON(HouseholdController.AddGoalsToHousehold)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveGoalsFromHousehold/{parentId}/goalsIds", jsonResponseFormatter.FormatToJSON(HouseholdController.RemoveGoalsFromHousehold)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddRiskAssessmentsToHousehold/{parentId}/riskAssessmentsId", jsonResponseFormatter.FormatToJSON(HouseholdController.AddRiskAssessmentsToHousehold)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveRiskAssessmentsFromHousehold/{parentId}/riskAssessmentsIds", jsonResponseFormatter.FormatToJSON(HouseholdController.RemoveRiskAssessmentsFromHousehold)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Client Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Client/{id}", jsonResponseFormatter.FormatToJSON(ClientController.GetClient)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Client", jsonResponseFormatter.FormatToJSON(ClientController.GetAllClient)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewClient", jsonResponseFormatter.FormatToJSON(ClientController.CreateClient)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Client/{id}", jsonResponseFormatter.FormatToJSON(ClientController.UpdateClient)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteClient/{id}", jsonResponseFormatter.FormatToJSON(ClientController.DeleteClient)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignHouseholdToClient/{parentId}/householdId", jsonResponseFormatter.FormatToJSON(ClientController.AssignHouseholdToClient)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignHouseholdFromClient/{parentId}", jsonResponseFormatter.FormatToJSON(ClientController.UnassignHouseholdFromClient)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignKycRecordToClient/{parentId}/kycRecordId", jsonResponseFormatter.FormatToJSON(ClientController.AssignKycRecordToClient)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignKycRecordFromClient/{parentId}", jsonResponseFormatter.FormatToJSON(ClientController.UnassignKycRecordFromClient)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddAccountsToClient/{parentId}/accountsId", jsonResponseFormatter.FormatToJSON(ClientController.AddAccountsToClient)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveAccountsFromClient/{parentId}/accountsIds", jsonResponseFormatter.FormatToJSON(ClientController.RemoveAccountsFromClient)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddDocumentsToClient/{parentId}/documentsId", jsonResponseFormatter.FormatToJSON(ClientController.AddDocumentsToClient)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveDocumentsFromClient/{parentId}/documentsIds", jsonResponseFormatter.FormatToJSON(ClientController.RemoveDocumentsFromClient)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddBeneficiariesToClient/{parentId}/beneficiariesId", jsonResponseFormatter.FormatToJSON(ClientController.AddBeneficiariesToClient)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveBeneficiariesFromClient/{parentId}/beneficiariesIds", jsonResponseFormatter.FormatToJSON(ClientController.RemoveBeneficiariesFromClient)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddAgreementsToClient/{parentId}/agreementsId", jsonResponseFormatter.FormatToJSON(ClientController.AddAgreementsToClient)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveAgreementsFromClient/{parentId}/agreementsIds", jsonResponseFormatter.FormatToJSON(ClientController.RemoveAgreementsFromClient)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // KycRecord Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/KycRecord/{id}", jsonResponseFormatter.FormatToJSON(KycRecordController.GetKycRecord)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/KycRecord", jsonResponseFormatter.FormatToJSON(KycRecordController.GetAllKycRecord)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewKycRecord", jsonResponseFormatter.FormatToJSON(KycRecordController.CreateKycRecord)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/KycRecord/{id}", jsonResponseFormatter.FormatToJSON(KycRecordController.UpdateKycRecord)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteKycRecord/{id}", jsonResponseFormatter.FormatToJSON(KycRecordController.DeleteKycRecord)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignClientToKycRecord/{parentId}/clientId", jsonResponseFormatter.FormatToJSON(KycRecordController.AssignClientToKycRecord)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignClientFromKycRecord/{parentId}", jsonResponseFormatter.FormatToJSON(KycRecordController.UnassignClientFromKycRecord)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddDocumentsToKycRecord/{parentId}/documentsId", jsonResponseFormatter.FormatToJSON(KycRecordController.AddDocumentsToKycRecord)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveDocumentsFromKycRecord/{parentId}/documentsIds", jsonResponseFormatter.FormatToJSON(KycRecordController.RemoveDocumentsFromKycRecord)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Beneficiary Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Beneficiary/{id}", jsonResponseFormatter.FormatToJSON(BeneficiaryController.GetBeneficiary)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Beneficiary", jsonResponseFormatter.FormatToJSON(BeneficiaryController.GetAllBeneficiary)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewBeneficiary", jsonResponseFormatter.FormatToJSON(BeneficiaryController.CreateBeneficiary)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Beneficiary/{id}", jsonResponseFormatter.FormatToJSON(BeneficiaryController.UpdateBeneficiary)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteBeneficiary/{id}", jsonResponseFormatter.FormatToJSON(BeneficiaryController.DeleteBeneficiary)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignClientToBeneficiary/{parentId}/clientId", jsonResponseFormatter.FormatToJSON(BeneficiaryController.AssignClientToBeneficiary)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignClientFromBeneficiary/{parentId}", jsonResponseFormatter.FormatToJSON(BeneficiaryController.UnassignClientFromBeneficiary)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddAccountsToBeneficiary/{parentId}/accountsId", jsonResponseFormatter.FormatToJSON(BeneficiaryController.AddAccountsToBeneficiary)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveAccountsFromBeneficiary/{parentId}/accountsIds", jsonResponseFormatter.FormatToJSON(BeneficiaryController.RemoveAccountsFromBeneficiary)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Custodian Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Custodian/{id}", jsonResponseFormatter.FormatToJSON(CustodianController.GetCustodian)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Custodian", jsonResponseFormatter.FormatToJSON(CustodianController.GetAllCustodian)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewCustodian", jsonResponseFormatter.FormatToJSON(CustodianController.CreateCustodian)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Custodian/{id}", jsonResponseFormatter.FormatToJSON(CustodianController.UpdateCustodian)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteCustodian/{id}", jsonResponseFormatter.FormatToJSON(CustodianController.DeleteCustodian)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddAccountsToCustodian/{parentId}/accountsId", jsonResponseFormatter.FormatToJSON(CustodianController.AddAccountsToCustodian)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveAccountsFromCustodian/{parentId}/accountsIds", jsonResponseFormatter.FormatToJSON(CustodianController.RemoveAccountsFromCustodian)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddTransfersToCustodian/{parentId}/transfersId", jsonResponseFormatter.FormatToJSON(CustodianController.AddTransfersToCustodian)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveTransfersFromCustodian/{parentId}/transfersIds", jsonResponseFormatter.FormatToJSON(CustodianController.RemoveTransfersFromCustodian)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Account Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Account/{id}", jsonResponseFormatter.FormatToJSON(AccountController.GetAccount)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Account", jsonResponseFormatter.FormatToJSON(AccountController.GetAllAccount)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewAccount", jsonResponseFormatter.FormatToJSON(AccountController.CreateAccount)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Account/{id}", jsonResponseFormatter.FormatToJSON(AccountController.UpdateAccount)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteAccount/{id}", jsonResponseFormatter.FormatToJSON(AccountController.DeleteAccount)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignHouseholdToAccount/{parentId}/householdId", jsonResponseFormatter.FormatToJSON(AccountController.AssignHouseholdToAccount)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignHouseholdFromAccount/{parentId}", jsonResponseFormatter.FormatToJSON(AccountController.UnassignHouseholdFromAccount)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignAdvisorToAccount/{parentId}/advisorId", jsonResponseFormatter.FormatToJSON(AccountController.AssignAdvisorToAccount)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignAdvisorFromAccount/{parentId}", jsonResponseFormatter.FormatToJSON(AccountController.UnassignAdvisorFromAccount)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignCustodianToAccount/{parentId}/custodianId", jsonResponseFormatter.FormatToJSON(AccountController.AssignCustodianToAccount)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignCustodianFromAccount/{parentId}", jsonResponseFormatter.FormatToJSON(AccountController.UnassignCustodianFromAccount)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignPortfolioToAccount/{parentId}/portfolioId", jsonResponseFormatter.FormatToJSON(AccountController.AssignPortfolioToAccount)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignPortfolioFromAccount/{parentId}", jsonResponseFormatter.FormatToJSON(AccountController.UnassignPortfolioFromAccount)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddBeneficiariesToAccount/{parentId}/beneficiariesId", jsonResponseFormatter.FormatToJSON(AccountController.AddBeneficiariesToAccount)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveBeneficiariesFromAccount/{parentId}/beneficiariesIds", jsonResponseFormatter.FormatToJSON(AccountController.RemoveBeneficiariesFromAccount)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddPositionsToAccount/{parentId}/positionsId", jsonResponseFormatter.FormatToJSON(AccountController.AddPositionsToAccount)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemovePositionsFromAccount/{parentId}/positionsIds", jsonResponseFormatter.FormatToJSON(AccountController.RemovePositionsFromAccount)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddTransactionsToAccount/{parentId}/transactionsId", jsonResponseFormatter.FormatToJSON(AccountController.AddTransactionsToAccount)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveTransactionsFromAccount/{parentId}/transactionsIds", jsonResponseFormatter.FormatToJSON(AccountController.RemoveTransactionsFromAccount)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddFeesToAccount/{parentId}/feesId", jsonResponseFormatter.FormatToJSON(AccountController.AddFeesToAccount)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveFeesFromAccount/{parentId}/feesIds", jsonResponseFormatter.FormatToJSON(AccountController.RemoveFeesFromAccount)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddStandingInstructionsToAccount/{parentId}/standingInstructionsId", jsonResponseFormatter.FormatToJSON(AccountController.AddStandingInstructionsToAccount)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveStandingInstructionsFromAccount/{parentId}/standingInstructionsIds", jsonResponseFormatter.FormatToJSON(AccountController.RemoveStandingInstructionsFromAccount)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddInvoicesToAccount/{parentId}/invoicesId", jsonResponseFormatter.FormatToJSON(AccountController.AddInvoicesToAccount)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveInvoicesFromAccount/{parentId}/invoicesIds", jsonResponseFormatter.FormatToJSON(AccountController.RemoveInvoicesFromAccount)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Portfolio Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Portfolio/{id}", jsonResponseFormatter.FormatToJSON(PortfolioController.GetPortfolio)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Portfolio", jsonResponseFormatter.FormatToJSON(PortfolioController.GetAllPortfolio)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewPortfolio", jsonResponseFormatter.FormatToJSON(PortfolioController.CreatePortfolio)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Portfolio/{id}", jsonResponseFormatter.FormatToJSON(PortfolioController.UpdatePortfolio)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeletePortfolio/{id}", jsonResponseFormatter.FormatToJSON(PortfolioController.DeletePortfolio)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignAccountToPortfolio/{parentId}/accountId", jsonResponseFormatter.FormatToJSON(PortfolioController.AssignAccountToPortfolio)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignAccountFromPortfolio/{parentId}", jsonResponseFormatter.FormatToJSON(PortfolioController.UnassignAccountFromPortfolio)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignModelPortfolioToPortfolio/{parentId}/modelPortfolioId", jsonResponseFormatter.FormatToJSON(PortfolioController.AssignModelPortfolioToPortfolio)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignModelPortfolioFromPortfolio/{parentId}", jsonResponseFormatter.FormatToJSON(PortfolioController.UnassignModelPortfolioFromPortfolio)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignBenchmarkToPortfolio/{parentId}/benchmarkId", jsonResponseFormatter.FormatToJSON(PortfolioController.AssignBenchmarkToPortfolio)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignBenchmarkFromPortfolio/{parentId}", jsonResponseFormatter.FormatToJSON(PortfolioController.UnassignBenchmarkFromPortfolio)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignInvestmentPolicyToPortfolio/{parentId}/investmentPolicyId", jsonResponseFormatter.FormatToJSON(PortfolioController.AssignInvestmentPolicyToPortfolio)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignInvestmentPolicyFromPortfolio/{parentId}", jsonResponseFormatter.FormatToJSON(PortfolioController.UnassignInvestmentPolicyFromPortfolio)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddPositionsToPortfolio/{parentId}/positionsId", jsonResponseFormatter.FormatToJSON(PortfolioController.AddPositionsToPortfolio)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemovePositionsFromPortfolio/{parentId}/positionsIds", jsonResponseFormatter.FormatToJSON(PortfolioController.RemovePositionsFromPortfolio)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddPerformanceReportsToPortfolio/{parentId}/performanceReportsId", jsonResponseFormatter.FormatToJSON(PortfolioController.AddPerformanceReportsToPortfolio)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemovePerformanceReportsFromPortfolio/{parentId}/performanceReportsIds", jsonResponseFormatter.FormatToJSON(PortfolioController.RemovePerformanceReportsFromPortfolio)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddRebalancePlansToPortfolio/{parentId}/rebalancePlansId", jsonResponseFormatter.FormatToJSON(PortfolioController.AddRebalancePlansToPortfolio)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveRebalancePlansFromPortfolio/{parentId}/rebalancePlansIds", jsonResponseFormatter.FormatToJSON(PortfolioController.RemoveRebalancePlansFromPortfolio)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // InvestmentProgram Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/InvestmentProgram/{id}", jsonResponseFormatter.FormatToJSON(InvestmentProgramController.GetInvestmentProgram)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/InvestmentProgram", jsonResponseFormatter.FormatToJSON(InvestmentProgramController.GetAllInvestmentProgram)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewInvestmentProgram", jsonResponseFormatter.FormatToJSON(InvestmentProgramController.CreateInvestmentProgram)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/InvestmentProgram/{id}", jsonResponseFormatter.FormatToJSON(InvestmentProgramController.UpdateInvestmentProgram)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteInvestmentProgram/{id}", jsonResponseFormatter.FormatToJSON(InvestmentProgramController.DeleteInvestmentProgram)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddModelPortfoliosToInvestmentProgram/{parentId}/modelPortfoliosId", jsonResponseFormatter.FormatToJSON(InvestmentProgramController.AddModelPortfoliosToInvestmentProgram)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveModelPortfoliosFromInvestmentProgram/{parentId}/modelPortfoliosIds", jsonResponseFormatter.FormatToJSON(InvestmentProgramController.RemoveModelPortfoliosFromInvestmentProgram)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddFeeSchedulesToInvestmentProgram/{parentId}/feeSchedulesId", jsonResponseFormatter.FormatToJSON(InvestmentProgramController.AddFeeSchedulesToInvestmentProgram)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveFeeSchedulesFromInvestmentProgram/{parentId}/feeSchedulesIds", jsonResponseFormatter.FormatToJSON(InvestmentProgramController.RemoveFeeSchedulesFromInvestmentProgram)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // ModelPortfolio Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/ModelPortfolio/{id}", jsonResponseFormatter.FormatToJSON(ModelPortfolioController.GetModelPortfolio)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/ModelPortfolio", jsonResponseFormatter.FormatToJSON(ModelPortfolioController.GetAllModelPortfolio)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewModelPortfolio", jsonResponseFormatter.FormatToJSON(ModelPortfolioController.CreateModelPortfolio)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/ModelPortfolio/{id}", jsonResponseFormatter.FormatToJSON(ModelPortfolioController.UpdateModelPortfolio)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteModelPortfolio/{id}", jsonResponseFormatter.FormatToJSON(ModelPortfolioController.DeleteModelPortfolio)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddAllocationsToModelPortfolio/{parentId}/allocationsId", jsonResponseFormatter.FormatToJSON(ModelPortfolioController.AddAllocationsToModelPortfolio)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveAllocationsFromModelPortfolio/{parentId}/allocationsIds", jsonResponseFormatter.FormatToJSON(ModelPortfolioController.RemoveAllocationsFromModelPortfolio)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddPortfoliosToModelPortfolio/{parentId}/portfoliosId", jsonResponseFormatter.FormatToJSON(ModelPortfolioController.AddPortfoliosToModelPortfolio)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemovePortfoliosFromModelPortfolio/{parentId}/portfoliosIds", jsonResponseFormatter.FormatToJSON(ModelPortfolioController.RemovePortfoliosFromModelPortfolio)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // AssetAllocationSlice Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssetAllocationSlice/{id}", jsonResponseFormatter.FormatToJSON(AssetAllocationSliceController.GetAssetAllocationSlice)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/AssetAllocationSlice", jsonResponseFormatter.FormatToJSON(AssetAllocationSliceController.GetAllAssetAllocationSlice)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewAssetAllocationSlice", jsonResponseFormatter.FormatToJSON(AssetAllocationSliceController.CreateAssetAllocationSlice)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/AssetAllocationSlice/{id}", jsonResponseFormatter.FormatToJSON(AssetAllocationSliceController.UpdateAssetAllocationSlice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteAssetAllocationSlice/{id}", jsonResponseFormatter.FormatToJSON(AssetAllocationSliceController.DeleteAssetAllocationSlice)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignModelPortfolioToAssetAllocationSlice/{parentId}/modelPortfolioId", jsonResponseFormatter.FormatToJSON(AssetAllocationSliceController.AssignModelPortfolioToAssetAllocationSlice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignModelPortfolioFromAssetAllocationSlice/{parentId}", jsonResponseFormatter.FormatToJSON(AssetAllocationSliceController.UnassignModelPortfolioFromAssetAllocationSlice)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // InvestmentPolicy Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/InvestmentPolicy/{id}", jsonResponseFormatter.FormatToJSON(InvestmentPolicyController.GetInvestmentPolicy)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/InvestmentPolicy", jsonResponseFormatter.FormatToJSON(InvestmentPolicyController.GetAllInvestmentPolicy)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewInvestmentPolicy", jsonResponseFormatter.FormatToJSON(InvestmentPolicyController.CreateInvestmentPolicy)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/InvestmentPolicy/{id}", jsonResponseFormatter.FormatToJSON(InvestmentPolicyController.UpdateInvestmentPolicy)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteInvestmentPolicy/{id}", jsonResponseFormatter.FormatToJSON(InvestmentPolicyController.DeleteInvestmentPolicy)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignPortfolioToInvestmentPolicy/{parentId}/portfolioId", jsonResponseFormatter.FormatToJSON(InvestmentPolicyController.AssignPortfolioToInvestmentPolicy)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignPortfolioFromInvestmentPolicy/{parentId}", jsonResponseFormatter.FormatToJSON(InvestmentPolicyController.UnassignPortfolioFromInvestmentPolicy)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignRiskAssessmentToInvestmentPolicy/{parentId}/riskAssessmentId", jsonResponseFormatter.FormatToJSON(InvestmentPolicyController.AssignRiskAssessmentToInvestmentPolicy)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignRiskAssessmentFromInvestmentPolicy/{parentId}", jsonResponseFormatter.FormatToJSON(InvestmentPolicyController.UnassignRiskAssessmentFromInvestmentPolicy)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddGoalsToInvestmentPolicy/{parentId}/goalsId", jsonResponseFormatter.FormatToJSON(InvestmentPolicyController.AddGoalsToInvestmentPolicy)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveGoalsFromInvestmentPolicy/{parentId}/goalsIds", jsonResponseFormatter.FormatToJSON(InvestmentPolicyController.RemoveGoalsFromInvestmentPolicy)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // RiskAssessment Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/RiskAssessment/{id}", jsonResponseFormatter.FormatToJSON(RiskAssessmentController.GetRiskAssessment)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/RiskAssessment", jsonResponseFormatter.FormatToJSON(RiskAssessmentController.GetAllRiskAssessment)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewRiskAssessment", jsonResponseFormatter.FormatToJSON(RiskAssessmentController.CreateRiskAssessment)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/RiskAssessment/{id}", jsonResponseFormatter.FormatToJSON(RiskAssessmentController.UpdateRiskAssessment)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteRiskAssessment/{id}", jsonResponseFormatter.FormatToJSON(RiskAssessmentController.DeleteRiskAssessment)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignHouseholdToRiskAssessment/{parentId}/householdId", jsonResponseFormatter.FormatToJSON(RiskAssessmentController.AssignHouseholdToRiskAssessment)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignHouseholdFromRiskAssessment/{parentId}", jsonResponseFormatter.FormatToJSON(RiskAssessmentController.UnassignHouseholdFromRiskAssessment)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignAdvisorToRiskAssessment/{parentId}/advisorId", jsonResponseFormatter.FormatToJSON(RiskAssessmentController.AssignAdvisorToRiskAssessment)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignAdvisorFromRiskAssessment/{parentId}", jsonResponseFormatter.FormatToJSON(RiskAssessmentController.UnassignAdvisorFromRiskAssessment)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // WealthGoal Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/WealthGoal/{id}", jsonResponseFormatter.FormatToJSON(WealthGoalController.GetWealthGoal)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/WealthGoal", jsonResponseFormatter.FormatToJSON(WealthGoalController.GetAllWealthGoal)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewWealthGoal", jsonResponseFormatter.FormatToJSON(WealthGoalController.CreateWealthGoal)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/WealthGoal/{id}", jsonResponseFormatter.FormatToJSON(WealthGoalController.UpdateWealthGoal)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteWealthGoal/{id}", jsonResponseFormatter.FormatToJSON(WealthGoalController.DeleteWealthGoal)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignHouseholdToWealthGoal/{parentId}/householdId", jsonResponseFormatter.FormatToJSON(WealthGoalController.AssignHouseholdToWealthGoal)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignHouseholdFromWealthGoal/{parentId}", jsonResponseFormatter.FormatToJSON(WealthGoalController.UnassignHouseholdFromWealthGoal)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignPortfolioToWealthGoal/{parentId}/portfolioId", jsonResponseFormatter.FormatToJSON(WealthGoalController.AssignPortfolioToWealthGoal)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignPortfolioFromWealthGoal/{parentId}", jsonResponseFormatter.FormatToJSON(WealthGoalController.UnassignPortfolioFromWealthGoal)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignInvestmentPolicyToWealthGoal/{parentId}/investmentPolicyId", jsonResponseFormatter.FormatToJSON(WealthGoalController.AssignInvestmentPolicyToWealthGoal)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignInvestmentPolicyFromWealthGoal/{parentId}", jsonResponseFormatter.FormatToJSON(WealthGoalController.UnassignInvestmentPolicyFromWealthGoal)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Security Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Security/{id}", jsonResponseFormatter.FormatToJSON(SecurityController.GetSecurity)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Security", jsonResponseFormatter.FormatToJSON(SecurityController.GetAllSecurity)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewSecurity", jsonResponseFormatter.FormatToJSON(SecurityController.CreateSecurity)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Security/{id}", jsonResponseFormatter.FormatToJSON(SecurityController.UpdateSecurity)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteSecurity/{id}", jsonResponseFormatter.FormatToJSON(SecurityController.DeleteSecurity)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddCorporateActionsToSecurity/{parentId}/corporateActionsId", jsonResponseFormatter.FormatToJSON(SecurityController.AddCorporateActionsToSecurity)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveCorporateActionsFromSecurity/{parentId}/corporateActionsIds", jsonResponseFormatter.FormatToJSON(SecurityController.RemoveCorporateActionsFromSecurity)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddPricesToSecurity/{parentId}/pricesId", jsonResponseFormatter.FormatToJSON(SecurityController.AddPricesToSecurity)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemovePricesFromSecurity/{parentId}/pricesIds", jsonResponseFormatter.FormatToJSON(SecurityController.RemovePricesFromSecurity)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddBenchmarksToSecurity/{parentId}/benchmarksId", jsonResponseFormatter.FormatToJSON(SecurityController.AddBenchmarksToSecurity)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveBenchmarksFromSecurity/{parentId}/benchmarksIds", jsonResponseFormatter.FormatToJSON(SecurityController.RemoveBenchmarksFromSecurity)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // MarketPrice Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/MarketPrice/{id}", jsonResponseFormatter.FormatToJSON(MarketPriceController.GetMarketPrice)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/MarketPrice", jsonResponseFormatter.FormatToJSON(MarketPriceController.GetAllMarketPrice)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewMarketPrice", jsonResponseFormatter.FormatToJSON(MarketPriceController.CreateMarketPrice)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/MarketPrice/{id}", jsonResponseFormatter.FormatToJSON(MarketPriceController.UpdateMarketPrice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteMarketPrice/{id}", jsonResponseFormatter.FormatToJSON(MarketPriceController.DeleteMarketPrice)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignSecurityToMarketPrice/{parentId}/securityId", jsonResponseFormatter.FormatToJSON(MarketPriceController.AssignSecurityToMarketPrice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignSecurityFromMarketPrice/{parentId}", jsonResponseFormatter.FormatToJSON(MarketPriceController.UnassignSecurityFromMarketPrice)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // CorporateAction Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/CorporateAction/{id}", jsonResponseFormatter.FormatToJSON(CorporateActionController.GetCorporateAction)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/CorporateAction", jsonResponseFormatter.FormatToJSON(CorporateActionController.GetAllCorporateAction)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewCorporateAction", jsonResponseFormatter.FormatToJSON(CorporateActionController.CreateCorporateAction)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/CorporateAction/{id}", jsonResponseFormatter.FormatToJSON(CorporateActionController.UpdateCorporateAction)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteCorporateAction/{id}", jsonResponseFormatter.FormatToJSON(CorporateActionController.DeleteCorporateAction)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignSecurityToCorporateAction/{parentId}/securityId", jsonResponseFormatter.FormatToJSON(CorporateActionController.AssignSecurityToCorporateAction)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignSecurityFromCorporateAction/{parentId}", jsonResponseFormatter.FormatToJSON(CorporateActionController.UnassignSecurityFromCorporateAction)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddDividendsToCorporateAction/{parentId}/dividendsId", jsonResponseFormatter.FormatToJSON(CorporateActionController.AddDividendsToCorporateAction)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveDividendsFromCorporateAction/{parentId}/dividendsIds", jsonResponseFormatter.FormatToJSON(CorporateActionController.RemoveDividendsFromCorporateAction)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Dividend Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Dividend/{id}", jsonResponseFormatter.FormatToJSON(DividendController.GetDividend)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Dividend", jsonResponseFormatter.FormatToJSON(DividendController.GetAllDividend)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewDividend", jsonResponseFormatter.FormatToJSON(DividendController.CreateDividend)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Dividend/{id}", jsonResponseFormatter.FormatToJSON(DividendController.UpdateDividend)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteDividend/{id}", jsonResponseFormatter.FormatToJSON(DividendController.DeleteDividend)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignCorporateActionToDividend/{parentId}/corporateActionId", jsonResponseFormatter.FormatToJSON(DividendController.AssignCorporateActionToDividend)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignCorporateActionFromDividend/{parentId}", jsonResponseFormatter.FormatToJSON(DividendController.UnassignCorporateActionFromDividend)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Position Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Position/{id}", jsonResponseFormatter.FormatToJSON(PositionController.GetPosition)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Position", jsonResponseFormatter.FormatToJSON(PositionController.GetAllPosition)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewPosition", jsonResponseFormatter.FormatToJSON(PositionController.CreatePosition)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Position/{id}", jsonResponseFormatter.FormatToJSON(PositionController.UpdatePosition)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeletePosition/{id}", jsonResponseFormatter.FormatToJSON(PositionController.DeletePosition)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignPortfolioToPosition/{parentId}/portfolioId", jsonResponseFormatter.FormatToJSON(PositionController.AssignPortfolioToPosition)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignPortfolioFromPosition/{parentId}", jsonResponseFormatter.FormatToJSON(PositionController.UnassignPortfolioFromPosition)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignSecurityToPosition/{parentId}/securityId", jsonResponseFormatter.FormatToJSON(PositionController.AssignSecurityToPosition)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignSecurityFromPosition/{parentId}", jsonResponseFormatter.FormatToJSON(PositionController.UnassignSecurityFromPosition)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddTaxLotsToPosition/{parentId}/taxLotsId", jsonResponseFormatter.FormatToJSON(PositionController.AddTaxLotsToPosition)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveTaxLotsFromPosition/{parentId}/taxLotsIds", jsonResponseFormatter.FormatToJSON(PositionController.RemoveTaxLotsFromPosition)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddTransactionsToPosition/{parentId}/transactionsId", jsonResponseFormatter.FormatToJSON(PositionController.AddTransactionsToPosition)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveTransactionsFromPosition/{parentId}/transactionsIds", jsonResponseFormatter.FormatToJSON(PositionController.RemoveTransactionsFromPosition)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // TaxLot Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/TaxLot/{id}", jsonResponseFormatter.FormatToJSON(TaxLotController.GetTaxLot)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/TaxLot", jsonResponseFormatter.FormatToJSON(TaxLotController.GetAllTaxLot)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewTaxLot", jsonResponseFormatter.FormatToJSON(TaxLotController.CreateTaxLot)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/TaxLot/{id}", jsonResponseFormatter.FormatToJSON(TaxLotController.UpdateTaxLot)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteTaxLot/{id}", jsonResponseFormatter.FormatToJSON(TaxLotController.DeleteTaxLot)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignPositionToTaxLot/{parentId}/positionId", jsonResponseFormatter.FormatToJSON(TaxLotController.AssignPositionToTaxLot)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignPositionFromTaxLot/{parentId}", jsonResponseFormatter.FormatToJSON(TaxLotController.UnassignPositionFromTaxLot)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Transaction Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Transaction/{id}", jsonResponseFormatter.FormatToJSON(TransactionController.GetTransaction)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Transaction", jsonResponseFormatter.FormatToJSON(TransactionController.GetAllTransaction)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewTransaction", jsonResponseFormatter.FormatToJSON(TransactionController.CreateTransaction)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Transaction/{id}", jsonResponseFormatter.FormatToJSON(TransactionController.UpdateTransaction)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteTransaction/{id}", jsonResponseFormatter.FormatToJSON(TransactionController.DeleteTransaction)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignAccountToTransaction/{parentId}/accountId", jsonResponseFormatter.FormatToJSON(TransactionController.AssignAccountToTransaction)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignAccountFromTransaction/{parentId}", jsonResponseFormatter.FormatToJSON(TransactionController.UnassignAccountFromTransaction)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignSecurityToTransaction/{parentId}/securityId", jsonResponseFormatter.FormatToJSON(TransactionController.AssignSecurityToTransaction)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignSecurityFromTransaction/{parentId}", jsonResponseFormatter.FormatToJSON(TransactionController.UnassignSecurityFromTransaction)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignOrderToTransaction/{parentId}/orderId", jsonResponseFormatter.FormatToJSON(TransactionController.AssignOrderToTransaction)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignOrderFromTransaction/{parentId}", jsonResponseFormatter.FormatToJSON(TransactionController.UnassignOrderFromTransaction)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignPositionToTransaction/{parentId}/positionId", jsonResponseFormatter.FormatToJSON(TransactionController.AssignPositionToTransaction)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignPositionFromTransaction/{parentId}", jsonResponseFormatter.FormatToJSON(TransactionController.UnassignPositionFromTransaction)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Order_ Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Order_/{id}", jsonResponseFormatter.FormatToJSON(Order_Controller.GetOrder_)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Order_", jsonResponseFormatter.FormatToJSON(Order_Controller.GetAllOrder_)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewOrder_", jsonResponseFormatter.FormatToJSON(Order_Controller.CreateOrder_)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Order_/{id}", jsonResponseFormatter.FormatToJSON(Order_Controller.UpdateOrder_)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteOrder_/{id}", jsonResponseFormatter.FormatToJSON(Order_Controller.DeleteOrder_)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignAccountToOrder_/{parentId}/accountId", jsonResponseFormatter.FormatToJSON(Order_Controller.AssignAccountToOrder_)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignAccountFromOrder_/{parentId}", jsonResponseFormatter.FormatToJSON(Order_Controller.UnassignAccountFromOrder_)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignSecurityToOrder_/{parentId}/securityId", jsonResponseFormatter.FormatToJSON(Order_Controller.AssignSecurityToOrder_)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignSecurityFromOrder_/{parentId}", jsonResponseFormatter.FormatToJSON(Order_Controller.UnassignSecurityFromOrder_)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignAdvisorToOrder_/{parentId}/advisorId", jsonResponseFormatter.FormatToJSON(Order_Controller.AssignAdvisorToOrder_)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignAdvisorFromOrder_/{parentId}", jsonResponseFormatter.FormatToJSON(Order_Controller.UnassignAdvisorFromOrder_)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddAllocationsToOrder_/{parentId}/allocationsId", jsonResponseFormatter.FormatToJSON(Order_Controller.AddAllocationsToOrder_)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveAllocationsFromOrder_/{parentId}/allocationsIds", jsonResponseFormatter.FormatToJSON(Order_Controller.RemoveAllocationsFromOrder_)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddTradesToOrder_/{parentId}/tradesId", jsonResponseFormatter.FormatToJSON(Order_Controller.AddTradesToOrder_)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveTradesFromOrder_/{parentId}/tradesIds", jsonResponseFormatter.FormatToJSON(Order_Controller.RemoveTradesFromOrder_)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // OrderAllocation Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/OrderAllocation/{id}", jsonResponseFormatter.FormatToJSON(OrderAllocationController.GetOrderAllocation)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/OrderAllocation", jsonResponseFormatter.FormatToJSON(OrderAllocationController.GetAllOrderAllocation)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewOrderAllocation", jsonResponseFormatter.FormatToJSON(OrderAllocationController.CreateOrderAllocation)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/OrderAllocation/{id}", jsonResponseFormatter.FormatToJSON(OrderAllocationController.UpdateOrderAllocation)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteOrderAllocation/{id}", jsonResponseFormatter.FormatToJSON(OrderAllocationController.DeleteOrderAllocation)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignOrderToOrderAllocation/{parentId}/orderId", jsonResponseFormatter.FormatToJSON(OrderAllocationController.AssignOrderToOrderAllocation)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignOrderFromOrderAllocation/{parentId}", jsonResponseFormatter.FormatToJSON(OrderAllocationController.UnassignOrderFromOrderAllocation)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignAccountToOrderAllocation/{parentId}/accountId", jsonResponseFormatter.FormatToJSON(OrderAllocationController.AssignAccountToOrderAllocation)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignAccountFromOrderAllocation/{parentId}", jsonResponseFormatter.FormatToJSON(OrderAllocationController.UnassignAccountFromOrderAllocation)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignPortfolioToOrderAllocation/{parentId}/portfolioId", jsonResponseFormatter.FormatToJSON(OrderAllocationController.AssignPortfolioToOrderAllocation)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignPortfolioFromOrderAllocation/{parentId}", jsonResponseFormatter.FormatToJSON(OrderAllocationController.UnassignPortfolioFromOrderAllocation)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Trade Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Trade/{id}", jsonResponseFormatter.FormatToJSON(TradeController.GetTrade)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Trade", jsonResponseFormatter.FormatToJSON(TradeController.GetAllTrade)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewTrade", jsonResponseFormatter.FormatToJSON(TradeController.CreateTrade)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Trade/{id}", jsonResponseFormatter.FormatToJSON(TradeController.UpdateTrade)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteTrade/{id}", jsonResponseFormatter.FormatToJSON(TradeController.DeleteTrade)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignOrderToTrade/{parentId}/orderId", jsonResponseFormatter.FormatToJSON(TradeController.AssignOrderToTrade)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignOrderFromTrade/{parentId}", jsonResponseFormatter.FormatToJSON(TradeController.UnassignOrderFromTrade)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignAccountToTrade/{parentId}/accountId", jsonResponseFormatter.FormatToJSON(TradeController.AssignAccountToTrade)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignAccountFromTrade/{parentId}", jsonResponseFormatter.FormatToJSON(TradeController.UnassignAccountFromTrade)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignSecurityToTrade/{parentId}/securityId", jsonResponseFormatter.FormatToJSON(TradeController.AssignSecurityToTrade)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignSecurityFromTrade/{parentId}", jsonResponseFormatter.FormatToJSON(TradeController.UnassignSecurityFromTrade)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignTransactionToTrade/{parentId}/transactionId", jsonResponseFormatter.FormatToJSON(TradeController.AssignTransactionToTrade)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignTransactionFromTrade/{parentId}", jsonResponseFormatter.FormatToJSON(TradeController.UnassignTransactionFromTrade)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // RebalancePlan Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/RebalancePlan/{id}", jsonResponseFormatter.FormatToJSON(RebalancePlanController.GetRebalancePlan)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/RebalancePlan", jsonResponseFormatter.FormatToJSON(RebalancePlanController.GetAllRebalancePlan)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewRebalancePlan", jsonResponseFormatter.FormatToJSON(RebalancePlanController.CreateRebalancePlan)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/RebalancePlan/{id}", jsonResponseFormatter.FormatToJSON(RebalancePlanController.UpdateRebalancePlan)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteRebalancePlan/{id}", jsonResponseFormatter.FormatToJSON(RebalancePlanController.DeleteRebalancePlan)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignPortfolioToRebalancePlan/{parentId}/portfolioId", jsonResponseFormatter.FormatToJSON(RebalancePlanController.AssignPortfolioToRebalancePlan)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignPortfolioFromRebalancePlan/{parentId}", jsonResponseFormatter.FormatToJSON(RebalancePlanController.UnassignPortfolioFromRebalancePlan)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignAdvisorToRebalancePlan/{parentId}/advisorId", jsonResponseFormatter.FormatToJSON(RebalancePlanController.AssignAdvisorToRebalancePlan)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignAdvisorFromRebalancePlan/{parentId}", jsonResponseFormatter.FormatToJSON(RebalancePlanController.UnassignAdvisorFromRebalancePlan)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddProposedOrdersToRebalancePlan/{parentId}/proposedOrdersId", jsonResponseFormatter.FormatToJSON(RebalancePlanController.AddProposedOrdersToRebalancePlan)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveProposedOrdersFromRebalancePlan/{parentId}/proposedOrdersIds", jsonResponseFormatter.FormatToJSON(RebalancePlanController.RemoveProposedOrdersFromRebalancePlan)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // PerformanceReport Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/PerformanceReport/{id}", jsonResponseFormatter.FormatToJSON(PerformanceReportController.GetPerformanceReport)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/PerformanceReport", jsonResponseFormatter.FormatToJSON(PerformanceReportController.GetAllPerformanceReport)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewPerformanceReport", jsonResponseFormatter.FormatToJSON(PerformanceReportController.CreatePerformanceReport)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/PerformanceReport/{id}", jsonResponseFormatter.FormatToJSON(PerformanceReportController.UpdatePerformanceReport)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeletePerformanceReport/{id}", jsonResponseFormatter.FormatToJSON(PerformanceReportController.DeletePerformanceReport)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignPortfolioToPerformanceReport/{parentId}/portfolioId", jsonResponseFormatter.FormatToJSON(PerformanceReportController.AssignPortfolioToPerformanceReport)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignPortfolioFromPerformanceReport/{parentId}", jsonResponseFormatter.FormatToJSON(PerformanceReportController.UnassignPortfolioFromPerformanceReport)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignBenchmarkToPerformanceReport/{parentId}/benchmarkId", jsonResponseFormatter.FormatToJSON(PerformanceReportController.AssignBenchmarkToPerformanceReport)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignBenchmarkFromPerformanceReport/{parentId}", jsonResponseFormatter.FormatToJSON(PerformanceReportController.UnassignBenchmarkFromPerformanceReport)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Benchmark Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Benchmark/{id}", jsonResponseFormatter.FormatToJSON(BenchmarkController.GetBenchmark)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Benchmark", jsonResponseFormatter.FormatToJSON(BenchmarkController.GetAllBenchmark)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewBenchmark", jsonResponseFormatter.FormatToJSON(BenchmarkController.CreateBenchmark)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Benchmark/{id}", jsonResponseFormatter.FormatToJSON(BenchmarkController.UpdateBenchmark)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteBenchmark/{id}", jsonResponseFormatter.FormatToJSON(BenchmarkController.DeleteBenchmark)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddPerformanceReportsToBenchmark/{parentId}/performanceReportsId", jsonResponseFormatter.FormatToJSON(BenchmarkController.AddPerformanceReportsToBenchmark)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemovePerformanceReportsFromBenchmark/{parentId}/performanceReportsIds", jsonResponseFormatter.FormatToJSON(BenchmarkController.RemovePerformanceReportsFromBenchmark)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddConstituentsToBenchmark/{parentId}/constituentsId", jsonResponseFormatter.FormatToJSON(BenchmarkController.AddConstituentsToBenchmark)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveConstituentsFromBenchmark/{parentId}/constituentsIds", jsonResponseFormatter.FormatToJSON(BenchmarkController.RemoveConstituentsFromBenchmark)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // FeeSchedule Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/FeeSchedule/{id}", jsonResponseFormatter.FormatToJSON(FeeScheduleController.GetFeeSchedule)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/FeeSchedule", jsonResponseFormatter.FormatToJSON(FeeScheduleController.GetAllFeeSchedule)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewFeeSchedule", jsonResponseFormatter.FormatToJSON(FeeScheduleController.CreateFeeSchedule)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/FeeSchedule/{id}", jsonResponseFormatter.FormatToJSON(FeeScheduleController.UpdateFeeSchedule)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteFeeSchedule/{id}", jsonResponseFormatter.FormatToJSON(FeeScheduleController.DeleteFeeSchedule)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddAccountsToFeeSchedule/{parentId}/accountsId", jsonResponseFormatter.FormatToJSON(FeeScheduleController.AddAccountsToFeeSchedule)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveAccountsFromFeeSchedule/{parentId}/accountsIds", jsonResponseFormatter.FormatToJSON(FeeScheduleController.RemoveAccountsFromFeeSchedule)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddBillingRunsToFeeSchedule/{parentId}/billingRunsId", jsonResponseFormatter.FormatToJSON(FeeScheduleController.AddBillingRunsToFeeSchedule)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveBillingRunsFromFeeSchedule/{parentId}/billingRunsIds", jsonResponseFormatter.FormatToJSON(FeeScheduleController.RemoveBillingRunsFromFeeSchedule)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Fee Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Fee/{id}", jsonResponseFormatter.FormatToJSON(FeeController.GetFee)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Fee", jsonResponseFormatter.FormatToJSON(FeeController.GetAllFee)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewFee", jsonResponseFormatter.FormatToJSON(FeeController.CreateFee)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Fee/{id}", jsonResponseFormatter.FormatToJSON(FeeController.UpdateFee)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteFee/{id}", jsonResponseFormatter.FormatToJSON(FeeController.DeleteFee)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignAccountToFee/{parentId}/accountId", jsonResponseFormatter.FormatToJSON(FeeController.AssignAccountToFee)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignAccountFromFee/{parentId}", jsonResponseFormatter.FormatToJSON(FeeController.UnassignAccountFromFee)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignInvoiceToFee/{parentId}/invoiceId", jsonResponseFormatter.FormatToJSON(FeeController.AssignInvoiceToFee)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignInvoiceFromFee/{parentId}", jsonResponseFormatter.FormatToJSON(FeeController.UnassignInvoiceFromFee)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // BillingRun Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/BillingRun/{id}", jsonResponseFormatter.FormatToJSON(BillingRunController.GetBillingRun)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/BillingRun", jsonResponseFormatter.FormatToJSON(BillingRunController.GetAllBillingRun)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewBillingRun", jsonResponseFormatter.FormatToJSON(BillingRunController.CreateBillingRun)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/BillingRun/{id}", jsonResponseFormatter.FormatToJSON(BillingRunController.UpdateBillingRun)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteBillingRun/{id}", jsonResponseFormatter.FormatToJSON(BillingRunController.DeleteBillingRun)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignFeeScheduleToBillingRun/{parentId}/feeScheduleId", jsonResponseFormatter.FormatToJSON(BillingRunController.AssignFeeScheduleToBillingRun)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignFeeScheduleFromBillingRun/{parentId}", jsonResponseFormatter.FormatToJSON(BillingRunController.UnassignFeeScheduleFromBillingRun)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddInvoicesToBillingRun/{parentId}/invoicesId", jsonResponseFormatter.FormatToJSON(BillingRunController.AddInvoicesToBillingRun)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveInvoicesFromBillingRun/{parentId}/invoicesIds", jsonResponseFormatter.FormatToJSON(BillingRunController.RemoveInvoicesFromBillingRun)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Invoice Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Invoice/{id}", jsonResponseFormatter.FormatToJSON(InvoiceController.GetInvoice)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Invoice", jsonResponseFormatter.FormatToJSON(InvoiceController.GetAllInvoice)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewInvoice", jsonResponseFormatter.FormatToJSON(InvoiceController.CreateInvoice)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Invoice/{id}", jsonResponseFormatter.FormatToJSON(InvoiceController.UpdateInvoice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteInvoice/{id}", jsonResponseFormatter.FormatToJSON(InvoiceController.DeleteInvoice)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignAccountToInvoice/{parentId}/accountId", jsonResponseFormatter.FormatToJSON(InvoiceController.AssignAccountToInvoice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignAccountFromInvoice/{parentId}", jsonResponseFormatter.FormatToJSON(InvoiceController.UnassignAccountFromInvoice)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignBillingRunToInvoice/{parentId}/billingRunId", jsonResponseFormatter.FormatToJSON(InvoiceController.AssignBillingRunToInvoice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignBillingRunFromInvoice/{parentId}", jsonResponseFormatter.FormatToJSON(InvoiceController.UnassignBillingRunFromInvoice)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddFeesToInvoice/{parentId}/feesId", jsonResponseFormatter.FormatToJSON(InvoiceController.AddFeesToInvoice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveFeesFromInvoice/{parentId}/feesIds", jsonResponseFormatter.FormatToJSON(InvoiceController.RemoveFeesFromInvoice)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Document Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Document/{id}", jsonResponseFormatter.FormatToJSON(DocumentController.GetDocument)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Document", jsonResponseFormatter.FormatToJSON(DocumentController.GetAllDocument)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewDocument", jsonResponseFormatter.FormatToJSON(DocumentController.CreateDocument)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Document/{id}", jsonResponseFormatter.FormatToJSON(DocumentController.UpdateDocument)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteDocument/{id}", jsonResponseFormatter.FormatToJSON(DocumentController.DeleteDocument)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignClientToDocument/{parentId}/clientId", jsonResponseFormatter.FormatToJSON(DocumentController.AssignClientToDocument)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignClientFromDocument/{parentId}", jsonResponseFormatter.FormatToJSON(DocumentController.UnassignClientFromDocument)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignKycRecordToDocument/{parentId}/kycRecordId", jsonResponseFormatter.FormatToJSON(DocumentController.AssignKycRecordToDocument)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignKycRecordFromDocument/{parentId}", jsonResponseFormatter.FormatToJSON(DocumentController.UnassignKycRecordFromDocument)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignAgreementToDocument/{parentId}/agreementId", jsonResponseFormatter.FormatToJSON(DocumentController.AssignAgreementToDocument)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignAgreementFromDocument/{parentId}", jsonResponseFormatter.FormatToJSON(DocumentController.UnassignAgreementFromDocument)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Agreement Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Agreement/{id}", jsonResponseFormatter.FormatToJSON(AgreementController.GetAgreement)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Agreement", jsonResponseFormatter.FormatToJSON(AgreementController.GetAllAgreement)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewAgreement", jsonResponseFormatter.FormatToJSON(AgreementController.CreateAgreement)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Agreement/{id}", jsonResponseFormatter.FormatToJSON(AgreementController.UpdateAgreement)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteAgreement/{id}", jsonResponseFormatter.FormatToJSON(AgreementController.DeleteAgreement)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignClientToAgreement/{parentId}/clientId", jsonResponseFormatter.FormatToJSON(AgreementController.AssignClientToAgreement)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignClientFromAgreement/{parentId}", jsonResponseFormatter.FormatToJSON(AgreementController.UnassignClientFromAgreement)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignAccountToAgreement/{parentId}/accountId", jsonResponseFormatter.FormatToJSON(AgreementController.AssignAccountToAgreement)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignAccountFromAgreement/{parentId}", jsonResponseFormatter.FormatToJSON(AgreementController.UnassignAccountFromAgreement)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddDocumentsToAgreement/{parentId}/documentsId", jsonResponseFormatter.FormatToJSON(AgreementController.AddDocumentsToAgreement)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveDocumentsFromAgreement/{parentId}/documentsIds", jsonResponseFormatter.FormatToJSON(AgreementController.RemoveDocumentsFromAgreement)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // ComplianceRule Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/ComplianceRule/{id}", jsonResponseFormatter.FormatToJSON(ComplianceRuleController.GetComplianceRule)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/ComplianceRule", jsonResponseFormatter.FormatToJSON(ComplianceRuleController.GetAllComplianceRule)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewComplianceRule", jsonResponseFormatter.FormatToJSON(ComplianceRuleController.CreateComplianceRule)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/ComplianceRule/{id}", jsonResponseFormatter.FormatToJSON(ComplianceRuleController.UpdateComplianceRule)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteComplianceRule/{id}", jsonResponseFormatter.FormatToJSON(ComplianceRuleController.DeleteComplianceRule)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddAlertsToComplianceRule/{parentId}/alertsId", jsonResponseFormatter.FormatToJSON(ComplianceRuleController.AddAlertsToComplianceRule)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveAlertsFromComplianceRule/{parentId}/alertsIds", jsonResponseFormatter.FormatToJSON(ComplianceRuleController.RemoveAlertsFromComplianceRule)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // ComplianceAlert Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/ComplianceAlert/{id}", jsonResponseFormatter.FormatToJSON(ComplianceAlertController.GetComplianceAlert)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/ComplianceAlert", jsonResponseFormatter.FormatToJSON(ComplianceAlertController.GetAllComplianceAlert)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewComplianceAlert", jsonResponseFormatter.FormatToJSON(ComplianceAlertController.CreateComplianceAlert)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/ComplianceAlert/{id}", jsonResponseFormatter.FormatToJSON(ComplianceAlertController.UpdateComplianceAlert)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteComplianceAlert/{id}", jsonResponseFormatter.FormatToJSON(ComplianceAlertController.DeleteComplianceAlert)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignRuleToComplianceAlert/{parentId}/ruleId", jsonResponseFormatter.FormatToJSON(ComplianceAlertController.AssignRuleToComplianceAlert)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignRuleFromComplianceAlert/{parentId}", jsonResponseFormatter.FormatToJSON(ComplianceAlertController.UnassignRuleFromComplianceAlert)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignAccountToComplianceAlert/{parentId}/accountId", jsonResponseFormatter.FormatToJSON(ComplianceAlertController.AssignAccountToComplianceAlert)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignAccountFromComplianceAlert/{parentId}", jsonResponseFormatter.FormatToJSON(ComplianceAlertController.UnassignAccountFromComplianceAlert)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignOrderToComplianceAlert/{parentId}/orderId", jsonResponseFormatter.FormatToJSON(ComplianceAlertController.AssignOrderToComplianceAlert)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignOrderFromComplianceAlert/{parentId}", jsonResponseFormatter.FormatToJSON(ComplianceAlertController.UnassignOrderFromComplianceAlert)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignAdvisorToComplianceAlert/{parentId}/advisorId", jsonResponseFormatter.FormatToJSON(ComplianceAlertController.AssignAdvisorToComplianceAlert)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignAdvisorFromComplianceAlert/{parentId}", jsonResponseFormatter.FormatToJSON(ComplianceAlertController.UnassignAdvisorFromComplianceAlert)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Proposal Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Proposal/{id}", jsonResponseFormatter.FormatToJSON(ProposalController.GetProposal)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Proposal", jsonResponseFormatter.FormatToJSON(ProposalController.GetAllProposal)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewProposal", jsonResponseFormatter.FormatToJSON(ProposalController.CreateProposal)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Proposal/{id}", jsonResponseFormatter.FormatToJSON(ProposalController.UpdateProposal)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteProposal/{id}", jsonResponseFormatter.FormatToJSON(ProposalController.DeleteProposal)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignHouseholdToProposal/{parentId}/householdId", jsonResponseFormatter.FormatToJSON(ProposalController.AssignHouseholdToProposal)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignHouseholdFromProposal/{parentId}", jsonResponseFormatter.FormatToJSON(ProposalController.UnassignHouseholdFromProposal)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignAdvisorToProposal/{parentId}/advisorId", jsonResponseFormatter.FormatToJSON(ProposalController.AssignAdvisorToProposal)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignAdvisorFromProposal/{parentId}", jsonResponseFormatter.FormatToJSON(ProposalController.UnassignAdvisorFromProposal)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignModelPortfolioToProposal/{parentId}/modelPortfolioId", jsonResponseFormatter.FormatToJSON(ProposalController.AssignModelPortfolioToProposal)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignModelPortfolioFromProposal/{parentId}", jsonResponseFormatter.FormatToJSON(ProposalController.UnassignModelPortfolioFromProposal)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignAccountToProposal/{parentId}/accountId", jsonResponseFormatter.FormatToJSON(ProposalController.AssignAccountToProposal)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignAccountFromProposal/{parentId}", jsonResponseFormatter.FormatToJSON(ProposalController.UnassignAccountFromProposal)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // AccountTransfer Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AccountTransfer/{id}", jsonResponseFormatter.FormatToJSON(AccountTransferController.GetAccountTransfer)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/AccountTransfer", jsonResponseFormatter.FormatToJSON(AccountTransferController.GetAllAccountTransfer)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewAccountTransfer", jsonResponseFormatter.FormatToJSON(AccountTransferController.CreateAccountTransfer)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/AccountTransfer/{id}", jsonResponseFormatter.FormatToJSON(AccountTransferController.UpdateAccountTransfer)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteAccountTransfer/{id}", jsonResponseFormatter.FormatToJSON(AccountTransferController.DeleteAccountTransfer)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignFromCustodianToAccountTransfer/{parentId}/fromCustodianId", jsonResponseFormatter.FormatToJSON(AccountTransferController.AssignFromCustodianToAccountTransfer)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignFromCustodianFromAccountTransfer/{parentId}", jsonResponseFormatter.FormatToJSON(AccountTransferController.UnassignFromCustodianFromAccountTransfer)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignToCustodianToAccountTransfer/{parentId}/toCustodianId", jsonResponseFormatter.FormatToJSON(AccountTransferController.AssignToCustodianToAccountTransfer)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignToCustodianFromAccountTransfer/{parentId}", jsonResponseFormatter.FormatToJSON(AccountTransferController.UnassignToCustodianFromAccountTransfer)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignAccountToAccountTransfer/{parentId}/accountId", jsonResponseFormatter.FormatToJSON(AccountTransferController.AssignAccountToAccountTransfer)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignAccountFromAccountTransfer/{parentId}", jsonResponseFormatter.FormatToJSON(AccountTransferController.UnassignAccountFromAccountTransfer)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // StandingInstruction Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/StandingInstruction/{id}", jsonResponseFormatter.FormatToJSON(StandingInstructionController.GetStandingInstruction)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/StandingInstruction", jsonResponseFormatter.FormatToJSON(StandingInstructionController.GetAllStandingInstruction)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewStandingInstruction", jsonResponseFormatter.FormatToJSON(StandingInstructionController.CreateStandingInstruction)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/StandingInstruction/{id}", jsonResponseFormatter.FormatToJSON(StandingInstructionController.UpdateStandingInstruction)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteStandingInstruction/{id}", jsonResponseFormatter.FormatToJSON(StandingInstructionController.DeleteStandingInstruction)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignAccountToStandingInstruction/{parentId}/accountId", jsonResponseFormatter.FormatToJSON(StandingInstructionController.AssignAccountToStandingInstruction)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignAccountFromStandingInstruction/{parentId}", jsonResponseFormatter.FormatToJSON(StandingInstructionController.UnassignAccountFromStandingInstruction)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignDestinationAccountToStandingInstruction/{parentId}/destinationAccountId", jsonResponseFormatter.FormatToJSON(StandingInstructionController.AssignDestinationAccountToStandingInstruction)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignDestinationAccountFromStandingInstruction/{parentId}", jsonResponseFormatter.FormatToJSON(StandingInstructionController.UnassignDestinationAccountFromStandingInstruction)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // CashMovement Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/CashMovement/{id}", jsonResponseFormatter.FormatToJSON(CashMovementController.GetCashMovement)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/CashMovement", jsonResponseFormatter.FormatToJSON(CashMovementController.GetAllCashMovement)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewCashMovement", jsonResponseFormatter.FormatToJSON(CashMovementController.CreateCashMovement)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/CashMovement/{id}", jsonResponseFormatter.FormatToJSON(CashMovementController.UpdateCashMovement)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteCashMovement/{id}", jsonResponseFormatter.FormatToJSON(CashMovementController.DeleteCashMovement)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignAccountToCashMovement/{parentId}/accountId", jsonResponseFormatter.FormatToJSON(CashMovementController.AssignAccountToCashMovement)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignAccountFromCashMovement/{parentId}", jsonResponseFormatter.FormatToJSON(CashMovementController.UnassignAccountFromCashMovement)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignRelatedInstructionToCashMovement/{parentId}/relatedInstructionId", jsonResponseFormatter.FormatToJSON(CashMovementController.AssignRelatedInstructionToCashMovement)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignRelatedInstructionFromCashMovement/{parentId}", jsonResponseFormatter.FormatToJSON(CashMovementController.UnassignRelatedInstructionFromCashMovement)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignRelatedTransactionToCashMovement/{parentId}/relatedTransactionId", jsonResponseFormatter.FormatToJSON(CashMovementController.AssignRelatedTransactionToCashMovement)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignRelatedTransactionFromCashMovement/{parentId}", jsonResponseFormatter.FormatToJSON(CashMovementController.UnassignRelatedTransactionFromCashMovement)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // ResearchNote Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/ResearchNote/{id}", jsonResponseFormatter.FormatToJSON(ResearchNoteController.GetResearchNote)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/ResearchNote", jsonResponseFormatter.FormatToJSON(ResearchNoteController.GetAllResearchNote)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewResearchNote", jsonResponseFormatter.FormatToJSON(ResearchNoteController.CreateResearchNote)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/ResearchNote/{id}", jsonResponseFormatter.FormatToJSON(ResearchNoteController.UpdateResearchNote)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteResearchNote/{id}", jsonResponseFormatter.FormatToJSON(ResearchNoteController.DeleteResearchNote)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignSecurityToResearchNote/{parentId}/securityId", jsonResponseFormatter.FormatToJSON(ResearchNoteController.AssignSecurityToResearchNote)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignSecurityFromResearchNote/{parentId}", jsonResponseFormatter.FormatToJSON(ResearchNoteController.UnassignSecurityFromResearchNote)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignAdvisorToResearchNote/{parentId}/advisorId", jsonResponseFormatter.FormatToJSON(ResearchNoteController.AssignAdvisorToResearchNote)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignAdvisorFromResearchNote/{parentId}", jsonResponseFormatter.FormatToJSON(ResearchNoteController.UnassignAdvisorFromResearchNote)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Meeting Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Meeting/{id}", jsonResponseFormatter.FormatToJSON(MeetingController.GetMeeting)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Meeting", jsonResponseFormatter.FormatToJSON(MeetingController.GetAllMeeting)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewMeeting", jsonResponseFormatter.FormatToJSON(MeetingController.CreateMeeting)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Meeting/{id}", jsonResponseFormatter.FormatToJSON(MeetingController.UpdateMeeting)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteMeeting/{id}", jsonResponseFormatter.FormatToJSON(MeetingController.DeleteMeeting)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignHouseholdToMeeting/{parentId}/householdId", jsonResponseFormatter.FormatToJSON(MeetingController.AssignHouseholdToMeeting)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignHouseholdFromMeeting/{parentId}", jsonResponseFormatter.FormatToJSON(MeetingController.UnassignHouseholdFromMeeting)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignAdvisorToMeeting/{parentId}/advisorId", jsonResponseFormatter.FormatToJSON(MeetingController.AssignAdvisorToMeeting)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignAdvisorFromMeeting/{parentId}", jsonResponseFormatter.FormatToJSON(MeetingController.UnassignAdvisorFromMeeting)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddDocumentsToMeeting/{parentId}/documentsId", jsonResponseFormatter.FormatToJSON(MeetingController.AddDocumentsToMeeting)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveDocumentsFromMeeting/{parentId}/documentsIds", jsonResponseFormatter.FormatToJSON(MeetingController.RemoveDocumentsFromMeeting)).Methods("DELETE", "OPTIONS")

    return router
}
