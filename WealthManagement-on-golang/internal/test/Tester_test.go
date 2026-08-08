package test

import ( 
	"testing"
    dao "WealthManagement-on-golang/internal/dao"
	"WealthManagement-on-golang/internal/model"
	"WealthManagement-on-golang/internal/utils"
	"github.com/google/go-cmp/cmp"
	"fmt"
)

func init() {
	utils.InitializeEnvironment()
}


func TestWealthFirmCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for WealthFirm
	//----------------------------------------------------------------------------
	WealthFirmObj := model.WealthFirm                                                                                                                            {Name:"test value for Name",LegalName:"test value for LegalName",DomicileCountry:"test value for DomicileCountry",Website:"test value for Website"}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createWealthFirmRequestResult := dao.CreateWealthFirm( WealthFirmObj )
	
	if createWealthFirmRequestResult.Success == false {
		t.Errorf(createWealthFirmRequestResult.Msg)
	} else {
		fmt.Println("Check Create WealthFirm success...")
	}
	
	createWealthFirmObj,_ := createWealthFirmRequestResult.Data. (model.WealthFirm)

	// --------------------------------------------------------------
	// Check WealthFirm Obj ID
	// --------------------------------------------------------------	
	if createWealthFirmObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for WealthFirm" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getWealthFirmRequestResult := dao.GetWealthFirm( uint64(createWealthFirmObj.ID) )
	
	if getWealthFirmRequestResult.Success == false {
		t.Errorf(getWealthFirmRequestResult.Msg)
	} else {
		fmt.Println("Check Get WealthFirm success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getWealthFirmObj,_ := getWealthFirmRequestResult.Data. (model.WealthFirm)
	compareWealthFirm := cmp.Equal(createWealthFirmObj.ID, getWealthFirmObj.ID)
	
	if  compareWealthFirm == false	{
		t.Errorf( "Created WealthFirm object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllWealthFirmRequestResult := dao.GetAllWealthFirm()

	if getAllWealthFirmRequestResult.Success == false {
			t.Errorf(getAllWealthFirmRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll WealthFirm success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllWealthFirmObj []model.WealthFirm = getAllWealthFirmRequestResult.Data. ([]model.WealthFirm)
		
	equalWealthFirm := cmp.Equal(createWealthFirmObj.ID, getAllWealthFirmObj[len(getAllWealthFirmObj)-1].ID)
		
	if equalWealthFirm == false {
		t.Errorf( "Created object is not equal to the last entry in WealthFirm[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for WealthFirm
	// --------------------------------------------------------------	
	deleteWealthFirmRequestResult := dao.DeleteWealthFirm(uint64(createWealthFirmObj.ID))

	if deleteWealthFirmRequestResult.Success == false {
			t.Errorf(deleteWealthFirmRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion WealthFirm success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getWealthFirmRequestResult = dao.GetWealthFirm( uint64(createWealthFirmObj.ID) )
	
	if getWealthFirmRequestResult.Success == true {
		t.Errorf(getWealthFirmRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestOfficeCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Office
	//----------------------------------------------------------------------------
	OfficeObj := model.Office                                            {Name:"test value for Name",Address:new Address()}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createOfficeRequestResult := dao.CreateOffice( OfficeObj )
	
	if createOfficeRequestResult.Success == false {
		t.Errorf(createOfficeRequestResult.Msg)
	} else {
		fmt.Println("Check Create Office success...")
	}
	
	createOfficeObj,_ := createOfficeRequestResult.Data. (model.Office)

	// --------------------------------------------------------------
	// Check Office Obj ID
	// --------------------------------------------------------------	
	if createOfficeObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Office" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getOfficeRequestResult := dao.GetOffice( uint64(createOfficeObj.ID) )
	
	if getOfficeRequestResult.Success == false {
		t.Errorf(getOfficeRequestResult.Msg)
	} else {
		fmt.Println("Check Get Office success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getOfficeObj,_ := getOfficeRequestResult.Data. (model.Office)
	compareOffice := cmp.Equal(createOfficeObj.ID, getOfficeObj.ID)
	
	if  compareOffice == false	{
		t.Errorf( "Created Office object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllOfficeRequestResult := dao.GetAllOffice()

	if getAllOfficeRequestResult.Success == false {
			t.Errorf(getAllOfficeRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Office success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllOfficeObj []model.Office = getAllOfficeRequestResult.Data. ([]model.Office)
		
	equalOffice := cmp.Equal(createOfficeObj.ID, getAllOfficeObj[len(getAllOfficeObj)-1].ID)
		
	if equalOffice == false {
		t.Errorf( "Created object is not equal to the last entry in Office[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Office
	// --------------------------------------------------------------	
	deleteOfficeRequestResult := dao.DeleteOffice(uint64(createOfficeObj.ID))

	if deleteOfficeRequestResult.Success == false {
			t.Errorf(deleteOfficeRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Office success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getOfficeRequestResult = dao.GetOffice( uint64(createOfficeObj.ID) )
	
	if getOfficeRequestResult.Success == true {
		t.Errorf(getOfficeRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestAdvisorCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Advisor
	//----------------------------------------------------------------------------
	AdvisorObj := model.Advisor                                                                                                            {FirstName:"test value for FirstName",LastName:"test value for LastName",LicenseNumber:"test value for LicenseNumber",Role:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createAdvisorRequestResult := dao.CreateAdvisor( AdvisorObj )
	
	if createAdvisorRequestResult.Success == false {
		t.Errorf(createAdvisorRequestResult.Msg)
	} else {
		fmt.Println("Check Create Advisor success...")
	}
	
	createAdvisorObj,_ := createAdvisorRequestResult.Data. (model.Advisor)

	// --------------------------------------------------------------
	// Check Advisor Obj ID
	// --------------------------------------------------------------	
	if createAdvisorObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Advisor" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getAdvisorRequestResult := dao.GetAdvisor( uint64(createAdvisorObj.ID) )
	
	if getAdvisorRequestResult.Success == false {
		t.Errorf(getAdvisorRequestResult.Msg)
	} else {
		fmt.Println("Check Get Advisor success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getAdvisorObj,_ := getAdvisorRequestResult.Data. (model.Advisor)
	compareAdvisor := cmp.Equal(createAdvisorObj.ID, getAdvisorObj.ID)
	
	if  compareAdvisor == false	{
		t.Errorf( "Created Advisor object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllAdvisorRequestResult := dao.GetAllAdvisor()

	if getAllAdvisorRequestResult.Success == false {
			t.Errorf(getAllAdvisorRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Advisor success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllAdvisorObj []model.Advisor = getAllAdvisorRequestResult.Data. ([]model.Advisor)
		
	equalAdvisor := cmp.Equal(createAdvisorObj.ID, getAllAdvisorObj[len(getAllAdvisorObj)-1].ID)
		
	if equalAdvisor == false {
		t.Errorf( "Created object is not equal to the last entry in Advisor[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Advisor
	// --------------------------------------------------------------	
	deleteAdvisorRequestResult := dao.DeleteAdvisor(uint64(createAdvisorObj.ID))

	if deleteAdvisorRequestResult.Success == false {
			t.Errorf(deleteAdvisorRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Advisor success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getAdvisorRequestResult = dao.GetAdvisor( uint64(createAdvisorObj.ID) )
	
	if getAdvisorRequestResult.Success == true {
		t.Errorf(getAdvisorRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestAdvisoryTeamCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for AdvisoryTeam
	//----------------------------------------------------------------------------
	AdvisoryTeamObj := model.AdvisoryTeam                                                            {Name:"test value for Name",Specialization:"test value for Specialization"}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createAdvisoryTeamRequestResult := dao.CreateAdvisoryTeam( AdvisoryTeamObj )
	
	if createAdvisoryTeamRequestResult.Success == false {
		t.Errorf(createAdvisoryTeamRequestResult.Msg)
	} else {
		fmt.Println("Check Create AdvisoryTeam success...")
	}
	
	createAdvisoryTeamObj,_ := createAdvisoryTeamRequestResult.Data. (model.AdvisoryTeam)

	// --------------------------------------------------------------
	// Check AdvisoryTeam Obj ID
	// --------------------------------------------------------------	
	if createAdvisoryTeamObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for AdvisoryTeam" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getAdvisoryTeamRequestResult := dao.GetAdvisoryTeam( uint64(createAdvisoryTeamObj.ID) )
	
	if getAdvisoryTeamRequestResult.Success == false {
		t.Errorf(getAdvisoryTeamRequestResult.Msg)
	} else {
		fmt.Println("Check Get AdvisoryTeam success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getAdvisoryTeamObj,_ := getAdvisoryTeamRequestResult.Data. (model.AdvisoryTeam)
	compareAdvisoryTeam := cmp.Equal(createAdvisoryTeamObj.ID, getAdvisoryTeamObj.ID)
	
	if  compareAdvisoryTeam == false	{
		t.Errorf( "Created AdvisoryTeam object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllAdvisoryTeamRequestResult := dao.GetAllAdvisoryTeam()

	if getAllAdvisoryTeamRequestResult.Success == false {
			t.Errorf(getAllAdvisoryTeamRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll AdvisoryTeam success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllAdvisoryTeamObj []model.AdvisoryTeam = getAllAdvisoryTeamRequestResult.Data. ([]model.AdvisoryTeam)
		
	equalAdvisoryTeam := cmp.Equal(createAdvisoryTeamObj.ID, getAllAdvisoryTeamObj[len(getAllAdvisoryTeamObj)-1].ID)
		
	if equalAdvisoryTeam == false {
		t.Errorf( "Created object is not equal to the last entry in AdvisoryTeam[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for AdvisoryTeam
	// --------------------------------------------------------------	
	deleteAdvisoryTeamRequestResult := dao.DeleteAdvisoryTeam(uint64(createAdvisoryTeamObj.ID))

	if deleteAdvisoryTeamRequestResult.Success == false {
			t.Errorf(deleteAdvisoryTeamRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion AdvisoryTeam success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getAdvisoryTeamRequestResult = dao.GetAdvisoryTeam( uint64(createAdvisoryTeamObj.ID) )
	
	if getAdvisoryTeamRequestResult.Success == true {
		t.Errorf(getAdvisoryTeamRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestHouseholdCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Household
	//----------------------------------------------------------------------------
	HouseholdObj := model.Household                            {Name:"test value for Name"}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createHouseholdRequestResult := dao.CreateHousehold( HouseholdObj )
	
	if createHouseholdRequestResult.Success == false {
		t.Errorf(createHouseholdRequestResult.Msg)
	} else {
		fmt.Println("Check Create Household success...")
	}
	
	createHouseholdObj,_ := createHouseholdRequestResult.Data. (model.Household)

	// --------------------------------------------------------------
	// Check Household Obj ID
	// --------------------------------------------------------------	
	if createHouseholdObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Household" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getHouseholdRequestResult := dao.GetHousehold( uint64(createHouseholdObj.ID) )
	
	if getHouseholdRequestResult.Success == false {
		t.Errorf(getHouseholdRequestResult.Msg)
	} else {
		fmt.Println("Check Get Household success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getHouseholdObj,_ := getHouseholdRequestResult.Data. (model.Household)
	compareHousehold := cmp.Equal(createHouseholdObj.ID, getHouseholdObj.ID)
	
	if  compareHousehold == false	{
		t.Errorf( "Created Household object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllHouseholdRequestResult := dao.GetAllHousehold()

	if getAllHouseholdRequestResult.Success == false {
			t.Errorf(getAllHouseholdRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Household success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllHouseholdObj []model.Household = getAllHouseholdRequestResult.Data. ([]model.Household)
		
	equalHousehold := cmp.Equal(createHouseholdObj.ID, getAllHouseholdObj[len(getAllHouseholdObj)-1].ID)
		
	if equalHousehold == false {
		t.Errorf( "Created object is not equal to the last entry in Household[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Household
	// --------------------------------------------------------------	
	deleteHouseholdRequestResult := dao.DeleteHousehold(uint64(createHouseholdObj.ID))

	if deleteHouseholdRequestResult.Success == false {
			t.Errorf(deleteHouseholdRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Household success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getHouseholdRequestResult = dao.GetHousehold( uint64(createHouseholdObj.ID) )
	
	if getHouseholdRequestResult.Success == true {
		t.Errorf(getHouseholdRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestClientCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Client
	//----------------------------------------------------------------------------
	ClientObj := model.Client                                                                                                                                                                                    {FirstName:"test value for FirstName",LastName:"test value for LastName",TaxResidency:"test value for TaxResidency",DateOfBirth:time.Now(),Email:"test value for Email"}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createClientRequestResult := dao.CreateClient( ClientObj )
	
	if createClientRequestResult.Success == false {
		t.Errorf(createClientRequestResult.Msg)
	} else {
		fmt.Println("Check Create Client success...")
	}
	
	createClientObj,_ := createClientRequestResult.Data. (model.Client)

	// --------------------------------------------------------------
	// Check Client Obj ID
	// --------------------------------------------------------------	
	if createClientObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Client" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getClientRequestResult := dao.GetClient( uint64(createClientObj.ID) )
	
	if getClientRequestResult.Success == false {
		t.Errorf(getClientRequestResult.Msg)
	} else {
		fmt.Println("Check Get Client success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getClientObj,_ := getClientRequestResult.Data. (model.Client)
	compareClient := cmp.Equal(createClientObj.ID, getClientObj.ID)
	
	if  compareClient == false	{
		t.Errorf( "Created Client object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllClientRequestResult := dao.GetAllClient()

	if getAllClientRequestResult.Success == false {
			t.Errorf(getAllClientRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Client success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllClientObj []model.Client = getAllClientRequestResult.Data. ([]model.Client)
		
	equalClient := cmp.Equal(createClientObj.ID, getAllClientObj[len(getAllClientObj)-1].ID)
		
	if equalClient == false {
		t.Errorf( "Created object is not equal to the last entry in Client[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Client
	// --------------------------------------------------------------	
	deleteClientRequestResult := dao.DeleteClient(uint64(createClientObj.ID))

	if deleteClientRequestResult.Success == false {
			t.Errorf(deleteClientRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Client success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getClientRequestResult = dao.GetClient( uint64(createClientObj.ID) )
	
	if getClientRequestResult.Success == true {
		t.Errorf(getClientRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestKycRecordCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for KycRecord
	//----------------------------------------------------------------------------
	KycRecordObj := model.KycRecord                                                                                                                                    {AssessmentDate:time.Now(),PepFlag:true,SourceOfWealth:"test value for SourceOfWealth",Status:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createKycRecordRequestResult := dao.CreateKycRecord( KycRecordObj )
	
	if createKycRecordRequestResult.Success == false {
		t.Errorf(createKycRecordRequestResult.Msg)
	} else {
		fmt.Println("Check Create KycRecord success...")
	}
	
	createKycRecordObj,_ := createKycRecordRequestResult.Data. (model.KycRecord)

	// --------------------------------------------------------------
	// Check KycRecord Obj ID
	// --------------------------------------------------------------	
	if createKycRecordObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for KycRecord" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getKycRecordRequestResult := dao.GetKycRecord( uint64(createKycRecordObj.ID) )
	
	if getKycRecordRequestResult.Success == false {
		t.Errorf(getKycRecordRequestResult.Msg)
	} else {
		fmt.Println("Check Get KycRecord success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getKycRecordObj,_ := getKycRecordRequestResult.Data. (model.KycRecord)
	compareKycRecord := cmp.Equal(createKycRecordObj.ID, getKycRecordObj.ID)
	
	if  compareKycRecord == false	{
		t.Errorf( "Created KycRecord object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllKycRecordRequestResult := dao.GetAllKycRecord()

	if getAllKycRecordRequestResult.Success == false {
			t.Errorf(getAllKycRecordRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll KycRecord success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllKycRecordObj []model.KycRecord = getAllKycRecordRequestResult.Data. ([]model.KycRecord)
		
	equalKycRecord := cmp.Equal(createKycRecordObj.ID, getAllKycRecordObj[len(getAllKycRecordObj)-1].ID)
		
	if equalKycRecord == false {
		t.Errorf( "Created object is not equal to the last entry in KycRecord[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for KycRecord
	// --------------------------------------------------------------	
	deleteKycRecordRequestResult := dao.DeleteKycRecord(uint64(createKycRecordObj.ID))

	if deleteKycRecordRequestResult.Success == false {
			t.Errorf(deleteKycRecordRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion KycRecord success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getKycRecordRequestResult = dao.GetKycRecord( uint64(createKycRecordObj.ID) )
	
	if getKycRecordRequestResult.Success == true {
		t.Errorf(getKycRecordRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestBeneficiaryCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Beneficiary
	//----------------------------------------------------------------------------
	BeneficiaryObj := model.Beneficiary                                                                                                            {FirstName:"test value for FirstName",LastName:"test value for LastName",Relationship:"test value for Relationship",AllocationPercent:new Percentage()}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createBeneficiaryRequestResult := dao.CreateBeneficiary( BeneficiaryObj )
	
	if createBeneficiaryRequestResult.Success == false {
		t.Errorf(createBeneficiaryRequestResult.Msg)
	} else {
		fmt.Println("Check Create Beneficiary success...")
	}
	
	createBeneficiaryObj,_ := createBeneficiaryRequestResult.Data. (model.Beneficiary)

	// --------------------------------------------------------------
	// Check Beneficiary Obj ID
	// --------------------------------------------------------------	
	if createBeneficiaryObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Beneficiary" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getBeneficiaryRequestResult := dao.GetBeneficiary( uint64(createBeneficiaryObj.ID) )
	
	if getBeneficiaryRequestResult.Success == false {
		t.Errorf(getBeneficiaryRequestResult.Msg)
	} else {
		fmt.Println("Check Get Beneficiary success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getBeneficiaryObj,_ := getBeneficiaryRequestResult.Data. (model.Beneficiary)
	compareBeneficiary := cmp.Equal(createBeneficiaryObj.ID, getBeneficiaryObj.ID)
	
	if  compareBeneficiary == false	{
		t.Errorf( "Created Beneficiary object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllBeneficiaryRequestResult := dao.GetAllBeneficiary()

	if getAllBeneficiaryRequestResult.Success == false {
			t.Errorf(getAllBeneficiaryRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Beneficiary success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllBeneficiaryObj []model.Beneficiary = getAllBeneficiaryRequestResult.Data. ([]model.Beneficiary)
		
	equalBeneficiary := cmp.Equal(createBeneficiaryObj.ID, getAllBeneficiaryObj[len(getAllBeneficiaryObj)-1].ID)
		
	if equalBeneficiary == false {
		t.Errorf( "Created object is not equal to the last entry in Beneficiary[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Beneficiary
	// --------------------------------------------------------------	
	deleteBeneficiaryRequestResult := dao.DeleteBeneficiary(uint64(createBeneficiaryObj.ID))

	if deleteBeneficiaryRequestResult.Success == false {
			t.Errorf(deleteBeneficiaryRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Beneficiary success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getBeneficiaryRequestResult = dao.GetBeneficiary( uint64(createBeneficiaryObj.ID) )
	
	if getBeneficiaryRequestResult.Success == true {
		t.Errorf(getBeneficiaryRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestCustodianCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Custodian
	//----------------------------------------------------------------------------
	CustodianObj := model.Custodian                                                                                            {Name:"test value for Name",ClearingNumber:"test value for ClearingNumber",Country:"test value for Country"}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createCustodianRequestResult := dao.CreateCustodian( CustodianObj )
	
	if createCustodianRequestResult.Success == false {
		t.Errorf(createCustodianRequestResult.Msg)
	} else {
		fmt.Println("Check Create Custodian success...")
	}
	
	createCustodianObj,_ := createCustodianRequestResult.Data. (model.Custodian)

	// --------------------------------------------------------------
	// Check Custodian Obj ID
	// --------------------------------------------------------------	
	if createCustodianObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Custodian" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getCustodianRequestResult := dao.GetCustodian( uint64(createCustodianObj.ID) )
	
	if getCustodianRequestResult.Success == false {
		t.Errorf(getCustodianRequestResult.Msg)
	} else {
		fmt.Println("Check Get Custodian success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getCustodianObj,_ := getCustodianRequestResult.Data. (model.Custodian)
	compareCustodian := cmp.Equal(createCustodianObj.ID, getCustodianObj.ID)
	
	if  compareCustodian == false	{
		t.Errorf( "Created Custodian object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllCustodianRequestResult := dao.GetAllCustodian()

	if getAllCustodianRequestResult.Success == false {
			t.Errorf(getAllCustodianRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Custodian success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllCustodianObj []model.Custodian = getAllCustodianRequestResult.Data. ([]model.Custodian)
		
	equalCustodian := cmp.Equal(createCustodianObj.ID, getAllCustodianObj[len(getAllCustodianObj)-1].ID)
		
	if equalCustodian == false {
		t.Errorf( "Created object is not equal to the last entry in Custodian[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Custodian
	// --------------------------------------------------------------	
	deleteCustodianRequestResult := dao.DeleteCustodian(uint64(createCustodianObj.ID))

	if deleteCustodianRequestResult.Success == false {
			t.Errorf(deleteCustodianRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Custodian success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getCustodianRequestResult = dao.GetCustodian( uint64(createCustodianObj.ID) )
	
	if getCustodianRequestResult.Success == true {
		t.Errorf(getCustodianRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestAccountCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Account
	//----------------------------------------------------------------------------
	AccountObj := model.Account                                                                                                                                                                                    {Name:"test value for Name",AccountNumber:new AccountNumber(),BaseCurrency:"test value for BaseCurrency",OpenedDate:time.Now(),AccountType:0,RegistrationType:0,Status:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createAccountRequestResult := dao.CreateAccount( AccountObj )
	
	if createAccountRequestResult.Success == false {
		t.Errorf(createAccountRequestResult.Msg)
	} else {
		fmt.Println("Check Create Account success...")
	}
	
	createAccountObj,_ := createAccountRequestResult.Data. (model.Account)

	// --------------------------------------------------------------
	// Check Account Obj ID
	// --------------------------------------------------------------	
	if createAccountObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Account" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getAccountRequestResult := dao.GetAccount( uint64(createAccountObj.ID) )
	
	if getAccountRequestResult.Success == false {
		t.Errorf(getAccountRequestResult.Msg)
	} else {
		fmt.Println("Check Get Account success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getAccountObj,_ := getAccountRequestResult.Data. (model.Account)
	compareAccount := cmp.Equal(createAccountObj.ID, getAccountObj.ID)
	
	if  compareAccount == false	{
		t.Errorf( "Created Account object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllAccountRequestResult := dao.GetAllAccount()

	if getAllAccountRequestResult.Success == false {
			t.Errorf(getAllAccountRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Account success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllAccountObj []model.Account = getAllAccountRequestResult.Data. ([]model.Account)
		
	equalAccount := cmp.Equal(createAccountObj.ID, getAllAccountObj[len(getAllAccountObj)-1].ID)
		
	if equalAccount == false {
		t.Errorf( "Created object is not equal to the last entry in Account[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Account
	// --------------------------------------------------------------	
	deleteAccountRequestResult := dao.DeleteAccount(uint64(createAccountObj.ID))

	if deleteAccountRequestResult.Success == false {
			t.Errorf(deleteAccountRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Account success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getAccountRequestResult = dao.GetAccount( uint64(createAccountObj.ID) )
	
	if getAccountRequestResult.Success == true {
		t.Errorf(getAccountRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestPortfolioCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Portfolio
	//----------------------------------------------------------------------------
	PortfolioObj := model.Portfolio                                                                                                                                                    {Name:"test value for Name",BaseCurrency:"test value for BaseCurrency",InceptionDate:time.Now(),PortfolioType:0,RebalanceFrequency:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createPortfolioRequestResult := dao.CreatePortfolio( PortfolioObj )
	
	if createPortfolioRequestResult.Success == false {
		t.Errorf(createPortfolioRequestResult.Msg)
	} else {
		fmt.Println("Check Create Portfolio success...")
	}
	
	createPortfolioObj,_ := createPortfolioRequestResult.Data. (model.Portfolio)

	// --------------------------------------------------------------
	// Check Portfolio Obj ID
	// --------------------------------------------------------------	
	if createPortfolioObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Portfolio" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getPortfolioRequestResult := dao.GetPortfolio( uint64(createPortfolioObj.ID) )
	
	if getPortfolioRequestResult.Success == false {
		t.Errorf(getPortfolioRequestResult.Msg)
	} else {
		fmt.Println("Check Get Portfolio success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getPortfolioObj,_ := getPortfolioRequestResult.Data. (model.Portfolio)
	comparePortfolio := cmp.Equal(createPortfolioObj.ID, getPortfolioObj.ID)
	
	if  comparePortfolio == false	{
		t.Errorf( "Created Portfolio object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllPortfolioRequestResult := dao.GetAllPortfolio()

	if getAllPortfolioRequestResult.Success == false {
			t.Errorf(getAllPortfolioRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Portfolio success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllPortfolioObj []model.Portfolio = getAllPortfolioRequestResult.Data. ([]model.Portfolio)
		
	equalPortfolio := cmp.Equal(createPortfolioObj.ID, getAllPortfolioObj[len(getAllPortfolioObj)-1].ID)
		
	if equalPortfolio == false {
		t.Errorf( "Created object is not equal to the last entry in Portfolio[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Portfolio
	// --------------------------------------------------------------	
	deletePortfolioRequestResult := dao.DeletePortfolio(uint64(createPortfolioObj.ID))

	if deletePortfolioRequestResult.Success == false {
			t.Errorf(deletePortfolioRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Portfolio success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getPortfolioRequestResult = dao.GetPortfolio( uint64(createPortfolioObj.ID) )
	
	if getPortfolioRequestResult.Success == true {
		t.Errorf(getPortfolioRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestInvestmentProgramCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for InvestmentProgram
	//----------------------------------------------------------------------------
	InvestmentProgramObj := model.InvestmentProgram                                                                                            {Name:"test value for Name",Description:"test value for Description",ProgramType:"test value for ProgramType"}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createInvestmentProgramRequestResult := dao.CreateInvestmentProgram( InvestmentProgramObj )
	
	if createInvestmentProgramRequestResult.Success == false {
		t.Errorf(createInvestmentProgramRequestResult.Msg)
	} else {
		fmt.Println("Check Create InvestmentProgram success...")
	}
	
	createInvestmentProgramObj,_ := createInvestmentProgramRequestResult.Data. (model.InvestmentProgram)

	// --------------------------------------------------------------
	// Check InvestmentProgram Obj ID
	// --------------------------------------------------------------	
	if createInvestmentProgramObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for InvestmentProgram" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getInvestmentProgramRequestResult := dao.GetInvestmentProgram( uint64(createInvestmentProgramObj.ID) )
	
	if getInvestmentProgramRequestResult.Success == false {
		t.Errorf(getInvestmentProgramRequestResult.Msg)
	} else {
		fmt.Println("Check Get InvestmentProgram success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getInvestmentProgramObj,_ := getInvestmentProgramRequestResult.Data. (model.InvestmentProgram)
	compareInvestmentProgram := cmp.Equal(createInvestmentProgramObj.ID, getInvestmentProgramObj.ID)
	
	if  compareInvestmentProgram == false	{
		t.Errorf( "Created InvestmentProgram object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllInvestmentProgramRequestResult := dao.GetAllInvestmentProgram()

	if getAllInvestmentProgramRequestResult.Success == false {
			t.Errorf(getAllInvestmentProgramRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll InvestmentProgram success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllInvestmentProgramObj []model.InvestmentProgram = getAllInvestmentProgramRequestResult.Data. ([]model.InvestmentProgram)
		
	equalInvestmentProgram := cmp.Equal(createInvestmentProgramObj.ID, getAllInvestmentProgramObj[len(getAllInvestmentProgramObj)-1].ID)
		
	if equalInvestmentProgram == false {
		t.Errorf( "Created object is not equal to the last entry in InvestmentProgram[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for InvestmentProgram
	// --------------------------------------------------------------	
	deleteInvestmentProgramRequestResult := dao.DeleteInvestmentProgram(uint64(createInvestmentProgramObj.ID))

	if deleteInvestmentProgramRequestResult.Success == false {
			t.Errorf(deleteInvestmentProgramRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion InvestmentProgram success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getInvestmentProgramRequestResult = dao.GetInvestmentProgram( uint64(createInvestmentProgramObj.ID) )
	
	if getInvestmentProgramRequestResult.Success == true {
		t.Errorf(getInvestmentProgramRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestModelPortfolioCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for ModelPortfolio
	//----------------------------------------------------------------------------
	ModelPortfolioObj := model.ModelPortfolio                                                                            {Name:"test value for Name",Objective:"test value for Objective",RiskLevel:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createModelPortfolioRequestResult := dao.CreateModelPortfolio( ModelPortfolioObj )
	
	if createModelPortfolioRequestResult.Success == false {
		t.Errorf(createModelPortfolioRequestResult.Msg)
	} else {
		fmt.Println("Check Create ModelPortfolio success...")
	}
	
	createModelPortfolioObj,_ := createModelPortfolioRequestResult.Data. (model.ModelPortfolio)

	// --------------------------------------------------------------
	// Check ModelPortfolio Obj ID
	// --------------------------------------------------------------	
	if createModelPortfolioObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for ModelPortfolio" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getModelPortfolioRequestResult := dao.GetModelPortfolio( uint64(createModelPortfolioObj.ID) )
	
	if getModelPortfolioRequestResult.Success == false {
		t.Errorf(getModelPortfolioRequestResult.Msg)
	} else {
		fmt.Println("Check Get ModelPortfolio success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getModelPortfolioObj,_ := getModelPortfolioRequestResult.Data. (model.ModelPortfolio)
	compareModelPortfolio := cmp.Equal(createModelPortfolioObj.ID, getModelPortfolioObj.ID)
	
	if  compareModelPortfolio == false	{
		t.Errorf( "Created ModelPortfolio object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllModelPortfolioRequestResult := dao.GetAllModelPortfolio()

	if getAllModelPortfolioRequestResult.Success == false {
			t.Errorf(getAllModelPortfolioRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll ModelPortfolio success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllModelPortfolioObj []model.ModelPortfolio = getAllModelPortfolioRequestResult.Data. ([]model.ModelPortfolio)
		
	equalModelPortfolio := cmp.Equal(createModelPortfolioObj.ID, getAllModelPortfolioObj[len(getAllModelPortfolioObj)-1].ID)
		
	if equalModelPortfolio == false {
		t.Errorf( "Created object is not equal to the last entry in ModelPortfolio[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for ModelPortfolio
	// --------------------------------------------------------------	
	deleteModelPortfolioRequestResult := dao.DeleteModelPortfolio(uint64(createModelPortfolioObj.ID))

	if deleteModelPortfolioRequestResult.Success == false {
			t.Errorf(deleteModelPortfolioRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion ModelPortfolio success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getModelPortfolioRequestResult = dao.GetModelPortfolio( uint64(createModelPortfolioObj.ID) )
	
	if getModelPortfolioRequestResult.Success == true {
		t.Errorf(getModelPortfolioRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestAssetAllocationSliceCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for AssetAllocationSlice
	//----------------------------------------------------------------------------
	AssetAllocationSliceObj := model.AssetAllocationSlice                            {TargetWeight:new Percentage(),AssetClass:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createAssetAllocationSliceRequestResult := dao.CreateAssetAllocationSlice( AssetAllocationSliceObj )
	
	if createAssetAllocationSliceRequestResult.Success == false {
		t.Errorf(createAssetAllocationSliceRequestResult.Msg)
	} else {
		fmt.Println("Check Create AssetAllocationSlice success...")
	}
	
	createAssetAllocationSliceObj,_ := createAssetAllocationSliceRequestResult.Data. (model.AssetAllocationSlice)

	// --------------------------------------------------------------
	// Check AssetAllocationSlice Obj ID
	// --------------------------------------------------------------	
	if createAssetAllocationSliceObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for AssetAllocationSlice" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getAssetAllocationSliceRequestResult := dao.GetAssetAllocationSlice( uint64(createAssetAllocationSliceObj.ID) )
	
	if getAssetAllocationSliceRequestResult.Success == false {
		t.Errorf(getAssetAllocationSliceRequestResult.Msg)
	} else {
		fmt.Println("Check Get AssetAllocationSlice success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getAssetAllocationSliceObj,_ := getAssetAllocationSliceRequestResult.Data. (model.AssetAllocationSlice)
	compareAssetAllocationSlice := cmp.Equal(createAssetAllocationSliceObj.ID, getAssetAllocationSliceObj.ID)
	
	if  compareAssetAllocationSlice == false	{
		t.Errorf( "Created AssetAllocationSlice object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllAssetAllocationSliceRequestResult := dao.GetAllAssetAllocationSlice()

	if getAllAssetAllocationSliceRequestResult.Success == false {
			t.Errorf(getAllAssetAllocationSliceRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll AssetAllocationSlice success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllAssetAllocationSliceObj []model.AssetAllocationSlice = getAllAssetAllocationSliceRequestResult.Data. ([]model.AssetAllocationSlice)
		
	equalAssetAllocationSlice := cmp.Equal(createAssetAllocationSliceObj.ID, getAllAssetAllocationSliceObj[len(getAllAssetAllocationSliceObj)-1].ID)
		
	if equalAssetAllocationSlice == false {
		t.Errorf( "Created object is not equal to the last entry in AssetAllocationSlice[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for AssetAllocationSlice
	// --------------------------------------------------------------	
	deleteAssetAllocationSliceRequestResult := dao.DeleteAssetAllocationSlice(uint64(createAssetAllocationSliceObj.ID))

	if deleteAssetAllocationSliceRequestResult.Success == false {
			t.Errorf(deleteAssetAllocationSliceRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion AssetAllocationSlice success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getAssetAllocationSliceRequestResult = dao.GetAssetAllocationSlice( uint64(createAssetAllocationSliceObj.ID) )
	
	if getAssetAllocationSliceRequestResult.Success == true {
		t.Errorf(getAssetAllocationSliceRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestInvestmentPolicyCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for InvestmentPolicy
	//----------------------------------------------------------------------------
	InvestmentPolicyObj := model.InvestmentPolicy                                                                            {PolicyNumber:"test value for PolicyNumber",Constraints:"test value for Constraints",SuitabilityStatus:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createInvestmentPolicyRequestResult := dao.CreateInvestmentPolicy( InvestmentPolicyObj )
	
	if createInvestmentPolicyRequestResult.Success == false {
		t.Errorf(createInvestmentPolicyRequestResult.Msg)
	} else {
		fmt.Println("Check Create InvestmentPolicy success...")
	}
	
	createInvestmentPolicyObj,_ := createInvestmentPolicyRequestResult.Data. (model.InvestmentPolicy)

	// --------------------------------------------------------------
	// Check InvestmentPolicy Obj ID
	// --------------------------------------------------------------	
	if createInvestmentPolicyObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for InvestmentPolicy" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getInvestmentPolicyRequestResult := dao.GetInvestmentPolicy( uint64(createInvestmentPolicyObj.ID) )
	
	if getInvestmentPolicyRequestResult.Success == false {
		t.Errorf(getInvestmentPolicyRequestResult.Msg)
	} else {
		fmt.Println("Check Get InvestmentPolicy success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getInvestmentPolicyObj,_ := getInvestmentPolicyRequestResult.Data. (model.InvestmentPolicy)
	compareInvestmentPolicy := cmp.Equal(createInvestmentPolicyObj.ID, getInvestmentPolicyObj.ID)
	
	if  compareInvestmentPolicy == false	{
		t.Errorf( "Created InvestmentPolicy object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllInvestmentPolicyRequestResult := dao.GetAllInvestmentPolicy()

	if getAllInvestmentPolicyRequestResult.Success == false {
			t.Errorf(getAllInvestmentPolicyRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll InvestmentPolicy success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllInvestmentPolicyObj []model.InvestmentPolicy = getAllInvestmentPolicyRequestResult.Data. ([]model.InvestmentPolicy)
		
	equalInvestmentPolicy := cmp.Equal(createInvestmentPolicyObj.ID, getAllInvestmentPolicyObj[len(getAllInvestmentPolicyObj)-1].ID)
		
	if equalInvestmentPolicy == false {
		t.Errorf( "Created object is not equal to the last entry in InvestmentPolicy[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for InvestmentPolicy
	// --------------------------------------------------------------	
	deleteInvestmentPolicyRequestResult := dao.DeleteInvestmentPolicy(uint64(createInvestmentPolicyObj.ID))

	if deleteInvestmentPolicyRequestResult.Success == false {
			t.Errorf(deleteInvestmentPolicyRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion InvestmentPolicy success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getInvestmentPolicyRequestResult = dao.GetInvestmentPolicy( uint64(createInvestmentPolicyObj.ID) )
	
	if getInvestmentPolicyRequestResult.Success == true {
		t.Errorf(getInvestmentPolicyRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestRiskAssessmentCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for RiskAssessment
	//----------------------------------------------------------------------------
	RiskAssessmentObj := model.RiskAssessment                                                                                                                                    {AssessmentDate:time.Now(),CapacityScore:100,HorizonYears:100,RiskTolerance:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createRiskAssessmentRequestResult := dao.CreateRiskAssessment( RiskAssessmentObj )
	
	if createRiskAssessmentRequestResult.Success == false {
		t.Errorf(createRiskAssessmentRequestResult.Msg)
	} else {
		fmt.Println("Check Create RiskAssessment success...")
	}
	
	createRiskAssessmentObj,_ := createRiskAssessmentRequestResult.Data. (model.RiskAssessment)

	// --------------------------------------------------------------
	// Check RiskAssessment Obj ID
	// --------------------------------------------------------------	
	if createRiskAssessmentObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for RiskAssessment" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getRiskAssessmentRequestResult := dao.GetRiskAssessment( uint64(createRiskAssessmentObj.ID) )
	
	if getRiskAssessmentRequestResult.Success == false {
		t.Errorf(getRiskAssessmentRequestResult.Msg)
	} else {
		fmt.Println("Check Get RiskAssessment success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getRiskAssessmentObj,_ := getRiskAssessmentRequestResult.Data. (model.RiskAssessment)
	compareRiskAssessment := cmp.Equal(createRiskAssessmentObj.ID, getRiskAssessmentObj.ID)
	
	if  compareRiskAssessment == false	{
		t.Errorf( "Created RiskAssessment object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllRiskAssessmentRequestResult := dao.GetAllRiskAssessment()

	if getAllRiskAssessmentRequestResult.Success == false {
			t.Errorf(getAllRiskAssessmentRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll RiskAssessment success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllRiskAssessmentObj []model.RiskAssessment = getAllRiskAssessmentRequestResult.Data. ([]model.RiskAssessment)
		
	equalRiskAssessment := cmp.Equal(createRiskAssessmentObj.ID, getAllRiskAssessmentObj[len(getAllRiskAssessmentObj)-1].ID)
		
	if equalRiskAssessment == false {
		t.Errorf( "Created object is not equal to the last entry in RiskAssessment[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for RiskAssessment
	// --------------------------------------------------------------	
	deleteRiskAssessmentRequestResult := dao.DeleteRiskAssessment(uint64(createRiskAssessmentObj.ID))

	if deleteRiskAssessmentRequestResult.Success == false {
			t.Errorf(deleteRiskAssessmentRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion RiskAssessment success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getRiskAssessmentRequestResult = dao.GetRiskAssessment( uint64(createRiskAssessmentObj.ID) )
	
	if getRiskAssessmentRequestResult.Success == true {
		t.Errorf(getRiskAssessmentRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestWealthGoalCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for WealthGoal
	//----------------------------------------------------------------------------
	WealthGoalObj := model.WealthGoal                                                                                                                                                    {Name:"test value for Name",TargetAmount:new Money(),TargetDate:time.Now(),Priority:100,GoalType:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createWealthGoalRequestResult := dao.CreateWealthGoal( WealthGoalObj )
	
	if createWealthGoalRequestResult.Success == false {
		t.Errorf(createWealthGoalRequestResult.Msg)
	} else {
		fmt.Println("Check Create WealthGoal success...")
	}
	
	createWealthGoalObj,_ := createWealthGoalRequestResult.Data. (model.WealthGoal)

	// --------------------------------------------------------------
	// Check WealthGoal Obj ID
	// --------------------------------------------------------------	
	if createWealthGoalObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for WealthGoal" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getWealthGoalRequestResult := dao.GetWealthGoal( uint64(createWealthGoalObj.ID) )
	
	if getWealthGoalRequestResult.Success == false {
		t.Errorf(getWealthGoalRequestResult.Msg)
	} else {
		fmt.Println("Check Get WealthGoal success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getWealthGoalObj,_ := getWealthGoalRequestResult.Data. (model.WealthGoal)
	compareWealthGoal := cmp.Equal(createWealthGoalObj.ID, getWealthGoalObj.ID)
	
	if  compareWealthGoal == false	{
		t.Errorf( "Created WealthGoal object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllWealthGoalRequestResult := dao.GetAllWealthGoal()

	if getAllWealthGoalRequestResult.Success == false {
			t.Errorf(getAllWealthGoalRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll WealthGoal success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllWealthGoalObj []model.WealthGoal = getAllWealthGoalRequestResult.Data. ([]model.WealthGoal)
		
	equalWealthGoal := cmp.Equal(createWealthGoalObj.ID, getAllWealthGoalObj[len(getAllWealthGoalObj)-1].ID)
		
	if equalWealthGoal == false {
		t.Errorf( "Created object is not equal to the last entry in WealthGoal[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for WealthGoal
	// --------------------------------------------------------------	
	deleteWealthGoalRequestResult := dao.DeleteWealthGoal(uint64(createWealthGoalObj.ID))

	if deleteWealthGoalRequestResult.Success == false {
			t.Errorf(deleteWealthGoalRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion WealthGoal success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getWealthGoalRequestResult = dao.GetWealthGoal( uint64(createWealthGoalObj.ID) )
	
	if getWealthGoalRequestResult.Success == true {
		t.Errorf(getWealthGoalRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestSecurityCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Security
	//----------------------------------------------------------------------------
	SecurityObj := model.Security                                                                                                                                                                            {Ticker:"test value for Ticker",Name:"test value for Name",Currency:"test value for Currency",Isin:new ISIN(),Cusip:new CUSIP(),ExpenseRatio:new Percentage(),SecurityType:0,AssetClass:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createSecurityRequestResult := dao.CreateSecurity( SecurityObj )
	
	if createSecurityRequestResult.Success == false {
		t.Errorf(createSecurityRequestResult.Msg)
	} else {
		fmt.Println("Check Create Security success...")
	}
	
	createSecurityObj,_ := createSecurityRequestResult.Data. (model.Security)

	// --------------------------------------------------------------
	// Check Security Obj ID
	// --------------------------------------------------------------	
	if createSecurityObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Security" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getSecurityRequestResult := dao.GetSecurity( uint64(createSecurityObj.ID) )
	
	if getSecurityRequestResult.Success == false {
		t.Errorf(getSecurityRequestResult.Msg)
	} else {
		fmt.Println("Check Get Security success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getSecurityObj,_ := getSecurityRequestResult.Data. (model.Security)
	compareSecurity := cmp.Equal(createSecurityObj.ID, getSecurityObj.ID)
	
	if  compareSecurity == false	{
		t.Errorf( "Created Security object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllSecurityRequestResult := dao.GetAllSecurity()

	if getAllSecurityRequestResult.Success == false {
			t.Errorf(getAllSecurityRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Security success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllSecurityObj []model.Security = getAllSecurityRequestResult.Data. ([]model.Security)
		
	equalSecurity := cmp.Equal(createSecurityObj.ID, getAllSecurityObj[len(getAllSecurityObj)-1].ID)
		
	if equalSecurity == false {
		t.Errorf( "Created object is not equal to the last entry in Security[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Security
	// --------------------------------------------------------------	
	deleteSecurityRequestResult := dao.DeleteSecurity(uint64(createSecurityObj.ID))

	if deleteSecurityRequestResult.Success == false {
			t.Errorf(deleteSecurityRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Security success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getSecurityRequestResult = dao.GetSecurity( uint64(createSecurityObj.ID) )
	
	if getSecurityRequestResult.Success == true {
		t.Errorf(getSecurityRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestMarketPriceCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for MarketPrice
	//----------------------------------------------------------------------------
	MarketPriceObj := model.MarketPrice                                                                                    {Price:new Money(),PriceDate:time.Now(),Source:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createMarketPriceRequestResult := dao.CreateMarketPrice( MarketPriceObj )
	
	if createMarketPriceRequestResult.Success == false {
		t.Errorf(createMarketPriceRequestResult.Msg)
	} else {
		fmt.Println("Check Create MarketPrice success...")
	}
	
	createMarketPriceObj,_ := createMarketPriceRequestResult.Data. (model.MarketPrice)

	// --------------------------------------------------------------
	// Check MarketPrice Obj ID
	// --------------------------------------------------------------	
	if createMarketPriceObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for MarketPrice" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getMarketPriceRequestResult := dao.GetMarketPrice( uint64(createMarketPriceObj.ID) )
	
	if getMarketPriceRequestResult.Success == false {
		t.Errorf(getMarketPriceRequestResult.Msg)
	} else {
		fmt.Println("Check Get MarketPrice success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getMarketPriceObj,_ := getMarketPriceRequestResult.Data. (model.MarketPrice)
	compareMarketPrice := cmp.Equal(createMarketPriceObj.ID, getMarketPriceObj.ID)
	
	if  compareMarketPrice == false	{
		t.Errorf( "Created MarketPrice object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllMarketPriceRequestResult := dao.GetAllMarketPrice()

	if getAllMarketPriceRequestResult.Success == false {
			t.Errorf(getAllMarketPriceRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll MarketPrice success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllMarketPriceObj []model.MarketPrice = getAllMarketPriceRequestResult.Data. ([]model.MarketPrice)
		
	equalMarketPrice := cmp.Equal(createMarketPriceObj.ID, getAllMarketPriceObj[len(getAllMarketPriceObj)-1].ID)
		
	if equalMarketPrice == false {
		t.Errorf( "Created object is not equal to the last entry in MarketPrice[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for MarketPrice
	// --------------------------------------------------------------	
	deleteMarketPriceRequestResult := dao.DeleteMarketPrice(uint64(createMarketPriceObj.ID))

	if deleteMarketPriceRequestResult.Success == false {
			t.Errorf(deleteMarketPriceRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion MarketPrice success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getMarketPriceRequestResult = dao.GetMarketPrice( uint64(createMarketPriceObj.ID) )
	
	if getMarketPriceRequestResult.Success == true {
		t.Errorf(getMarketPriceRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestCorporateActionCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for CorporateAction
	//----------------------------------------------------------------------------
	CorporateActionObj := model.CorporateAction                                                                                                                                                            {RecordDate:time.Now(),PayableDate:time.Now(),Details:"test value for Details",ActionType:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createCorporateActionRequestResult := dao.CreateCorporateAction( CorporateActionObj )
	
	if createCorporateActionRequestResult.Success == false {
		t.Errorf(createCorporateActionRequestResult.Msg)
	} else {
		fmt.Println("Check Create CorporateAction success...")
	}
	
	createCorporateActionObj,_ := createCorporateActionRequestResult.Data. (model.CorporateAction)

	// --------------------------------------------------------------
	// Check CorporateAction Obj ID
	// --------------------------------------------------------------	
	if createCorporateActionObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for CorporateAction" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getCorporateActionRequestResult := dao.GetCorporateAction( uint64(createCorporateActionObj.ID) )
	
	if getCorporateActionRequestResult.Success == false {
		t.Errorf(getCorporateActionRequestResult.Msg)
	} else {
		fmt.Println("Check Get CorporateAction success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getCorporateActionObj,_ := getCorporateActionRequestResult.Data. (model.CorporateAction)
	compareCorporateAction := cmp.Equal(createCorporateActionObj.ID, getCorporateActionObj.ID)
	
	if  compareCorporateAction == false	{
		t.Errorf( "Created CorporateAction object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllCorporateActionRequestResult := dao.GetAllCorporateAction()

	if getAllCorporateActionRequestResult.Success == false {
			t.Errorf(getAllCorporateActionRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll CorporateAction success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllCorporateActionObj []model.CorporateAction = getAllCorporateActionRequestResult.Data. ([]model.CorporateAction)
		
	equalCorporateAction := cmp.Equal(createCorporateActionObj.ID, getAllCorporateActionObj[len(getAllCorporateActionObj)-1].ID)
		
	if equalCorporateAction == false {
		t.Errorf( "Created object is not equal to the last entry in CorporateAction[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for CorporateAction
	// --------------------------------------------------------------	
	deleteCorporateActionRequestResult := dao.DeleteCorporateAction(uint64(createCorporateActionObj.ID))

	if deleteCorporateActionRequestResult.Success == false {
			t.Errorf(deleteCorporateActionRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion CorporateAction success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getCorporateActionRequestResult = dao.GetCorporateAction( uint64(createCorporateActionObj.ID) )
	
	if getCorporateActionRequestResult.Success == true {
		t.Errorf(getCorporateActionRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestDividendCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Dividend
	//----------------------------------------------------------------------------
	DividendObj := model.Dividend                            {GrossAmount:new Money(),TaxWithheld:new Money()}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createDividendRequestResult := dao.CreateDividend( DividendObj )
	
	if createDividendRequestResult.Success == false {
		t.Errorf(createDividendRequestResult.Msg)
	} else {
		fmt.Println("Check Create Dividend success...")
	}
	
	createDividendObj,_ := createDividendRequestResult.Data. (model.Dividend)

	// --------------------------------------------------------------
	// Check Dividend Obj ID
	// --------------------------------------------------------------	
	if createDividendObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Dividend" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getDividendRequestResult := dao.GetDividend( uint64(createDividendObj.ID) )
	
	if getDividendRequestResult.Success == false {
		t.Errorf(getDividendRequestResult.Msg)
	} else {
		fmt.Println("Check Get Dividend success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getDividendObj,_ := getDividendRequestResult.Data. (model.Dividend)
	compareDividend := cmp.Equal(createDividendObj.ID, getDividendObj.ID)
	
	if  compareDividend == false	{
		t.Errorf( "Created Dividend object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllDividendRequestResult := dao.GetAllDividend()

	if getAllDividendRequestResult.Success == false {
			t.Errorf(getAllDividendRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Dividend success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllDividendObj []model.Dividend = getAllDividendRequestResult.Data. ([]model.Dividend)
		
	equalDividend := cmp.Equal(createDividendObj.ID, getAllDividendObj[len(getAllDividendObj)-1].ID)
		
	if equalDividend == false {
		t.Errorf( "Created object is not equal to the last entry in Dividend[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Dividend
	// --------------------------------------------------------------	
	deleteDividendRequestResult := dao.DeleteDividend(uint64(createDividendObj.ID))

	if deleteDividendRequestResult.Success == false {
			t.Errorf(deleteDividendRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Dividend success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getDividendRequestResult = dao.GetDividend( uint64(createDividendObj.ID) )
	
	if getDividendRequestResult.Success == true {
		t.Errorf(getDividendRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestPositionCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Position
	//----------------------------------------------------------------------------
	PositionObj := model.Position                                                                                                    {Quantity:"test value",CostBasis:new Money(),PositionType:0,LotMethod:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createPositionRequestResult := dao.CreatePosition( PositionObj )
	
	if createPositionRequestResult.Success == false {
		t.Errorf(createPositionRequestResult.Msg)
	} else {
		fmt.Println("Check Create Position success...")
	}
	
	createPositionObj,_ := createPositionRequestResult.Data. (model.Position)

	// --------------------------------------------------------------
	// Check Position Obj ID
	// --------------------------------------------------------------	
	if createPositionObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Position" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getPositionRequestResult := dao.GetPosition( uint64(createPositionObj.ID) )
	
	if getPositionRequestResult.Success == false {
		t.Errorf(getPositionRequestResult.Msg)
	} else {
		fmt.Println("Check Get Position success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getPositionObj,_ := getPositionRequestResult.Data. (model.Position)
	comparePosition := cmp.Equal(createPositionObj.ID, getPositionObj.ID)
	
	if  comparePosition == false	{
		t.Errorf( "Created Position object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllPositionRequestResult := dao.GetAllPosition()

	if getAllPositionRequestResult.Success == false {
			t.Errorf(getAllPositionRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Position success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllPositionObj []model.Position = getAllPositionRequestResult.Data. ([]model.Position)
		
	equalPosition := cmp.Equal(createPositionObj.ID, getAllPositionObj[len(getAllPositionObj)-1].ID)
		
	if equalPosition == false {
		t.Errorf( "Created object is not equal to the last entry in Position[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Position
	// --------------------------------------------------------------	
	deletePositionRequestResult := dao.DeletePosition(uint64(createPositionObj.ID))

	if deletePositionRequestResult.Success == false {
			t.Errorf(deletePositionRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Position success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getPositionRequestResult = dao.GetPosition( uint64(createPositionObj.ID) )
	
	if getPositionRequestResult.Success == true {
		t.Errorf(getPositionRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestTaxLotCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for TaxLot
	//----------------------------------------------------------------------------
	TaxLotObj := model.TaxLot                                                                                                                                                                    {AcquisitionDate:time.Now(),Quantity:"test value",UnitCost:"test value"}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createTaxLotRequestResult := dao.CreateTaxLot( TaxLotObj )
	
	if createTaxLotRequestResult.Success == false {
		t.Errorf(createTaxLotRequestResult.Msg)
	} else {
		fmt.Println("Check Create TaxLot success...")
	}
	
	createTaxLotObj,_ := createTaxLotRequestResult.Data. (model.TaxLot)

	// --------------------------------------------------------------
	// Check TaxLot Obj ID
	// --------------------------------------------------------------	
	if createTaxLotObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for TaxLot" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getTaxLotRequestResult := dao.GetTaxLot( uint64(createTaxLotObj.ID) )
	
	if getTaxLotRequestResult.Success == false {
		t.Errorf(getTaxLotRequestResult.Msg)
	} else {
		fmt.Println("Check Get TaxLot success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getTaxLotObj,_ := getTaxLotRequestResult.Data. (model.TaxLot)
	compareTaxLot := cmp.Equal(createTaxLotObj.ID, getTaxLotObj.ID)
	
	if  compareTaxLot == false	{
		t.Errorf( "Created TaxLot object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllTaxLotRequestResult := dao.GetAllTaxLot()

	if getAllTaxLotRequestResult.Success == false {
			t.Errorf(getAllTaxLotRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll TaxLot success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllTaxLotObj []model.TaxLot = getAllTaxLotRequestResult.Data. ([]model.TaxLot)
		
	equalTaxLot := cmp.Equal(createTaxLotObj.ID, getAllTaxLotObj[len(getAllTaxLotObj)-1].ID)
		
	if equalTaxLot == false {
		t.Errorf( "Created object is not equal to the last entry in TaxLot[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for TaxLot
	// --------------------------------------------------------------	
	deleteTaxLotRequestResult := dao.DeleteTaxLot(uint64(createTaxLotObj.ID))

	if deleteTaxLotRequestResult.Success == false {
			t.Errorf(deleteTaxLotRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion TaxLot success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getTaxLotRequestResult = dao.GetTaxLot( uint64(createTaxLotObj.ID) )
	
	if getTaxLotRequestResult.Success == true {
		t.Errorf(getTaxLotRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestTransactionCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Transaction
	//----------------------------------------------------------------------------
	TransactionObj := model.Transaction                                                                                                                                                                                                    {TradeDate:time.Now(),SettleDate:time.Now(),Amount:new Money(),Quantity:"test value",TransactionType:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createTransactionRequestResult := dao.CreateTransaction( TransactionObj )
	
	if createTransactionRequestResult.Success == false {
		t.Errorf(createTransactionRequestResult.Msg)
	} else {
		fmt.Println("Check Create Transaction success...")
	}
	
	createTransactionObj,_ := createTransactionRequestResult.Data. (model.Transaction)

	// --------------------------------------------------------------
	// Check Transaction Obj ID
	// --------------------------------------------------------------	
	if createTransactionObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Transaction" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getTransactionRequestResult := dao.GetTransaction( uint64(createTransactionObj.ID) )
	
	if getTransactionRequestResult.Success == false {
		t.Errorf(getTransactionRequestResult.Msg)
	} else {
		fmt.Println("Check Get Transaction success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getTransactionObj,_ := getTransactionRequestResult.Data. (model.Transaction)
	compareTransaction := cmp.Equal(createTransactionObj.ID, getTransactionObj.ID)
	
	if  compareTransaction == false	{
		t.Errorf( "Created Transaction object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllTransactionRequestResult := dao.GetAllTransaction()

	if getAllTransactionRequestResult.Success == false {
			t.Errorf(getAllTransactionRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Transaction success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllTransactionObj []model.Transaction = getAllTransactionRequestResult.Data. ([]model.Transaction)
		
	equalTransaction := cmp.Equal(createTransactionObj.ID, getAllTransactionObj[len(getAllTransactionObj)-1].ID)
		
	if equalTransaction == false {
		t.Errorf( "Created object is not equal to the last entry in Transaction[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Transaction
	// --------------------------------------------------------------	
	deleteTransactionRequestResult := dao.DeleteTransaction(uint64(createTransactionObj.ID))

	if deleteTransactionRequestResult.Success == false {
			t.Errorf(deleteTransactionRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Transaction success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getTransactionRequestResult = dao.GetTransaction( uint64(createTransactionObj.ID) )
	
	if getTransactionRequestResult.Success == true {
		t.Errorf(getTransactionRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestOrder_CRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Order_
	//----------------------------------------------------------------------------
	Order_Obj := model.Order_                                                                                                                                                                                                                            {OrderNumber:"test value for OrderNumber",Quantity:"test value",LimitPrice:"test value",OrderType:0,Side:0,PriceType:0,TimeInForce:0,Status:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createOrder_RequestResult := dao.CreateOrder_( Order_Obj )
	
	if createOrder_RequestResult.Success == false {
		t.Errorf(createOrder_RequestResult.Msg)
	} else {
		fmt.Println("Check Create Order_ success...")
	}
	
	createOrder_Obj,_ := createOrder_RequestResult.Data. (model.Order_)

	// --------------------------------------------------------------
	// Check Order_ Obj ID
	// --------------------------------------------------------------	
	if createOrder_Obj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Order_" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getOrder_RequestResult := dao.GetOrder_( uint64(createOrder_Obj.ID) )
	
	if getOrder_RequestResult.Success == false {
		t.Errorf(getOrder_RequestResult.Msg)
	} else {
		fmt.Println("Check Get Order_ success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getOrder_Obj,_ := getOrder_RequestResult.Data. (model.Order_)
	compareOrder_ := cmp.Equal(createOrder_Obj.ID, getOrder_Obj.ID)
	
	if  compareOrder_ == false	{
		t.Errorf( "Created Order_ object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllOrder_RequestResult := dao.GetAllOrder_()

	if getAllOrder_RequestResult.Success == false {
			t.Errorf(getAllOrder_RequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Order_ success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllOrder_Obj []model.Order_ = getAllOrder_RequestResult.Data. ([]model.Order_)
		
	equalOrder_ := cmp.Equal(createOrder_Obj.ID, getAllOrder_Obj[len(getAllOrder_Obj)-1].ID)
		
	if equalOrder_ == false {
		t.Errorf( "Created object is not equal to the last entry in Order_[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Order_
	// --------------------------------------------------------------	
	deleteOrder_RequestResult := dao.DeleteOrder_(uint64(createOrder_Obj.ID))

	if deleteOrder_RequestResult.Success == false {
			t.Errorf(deleteOrder_RequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Order_ success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getOrder_RequestResult = dao.GetOrder_( uint64(createOrder_Obj.ID) )
	
	if getOrder_RequestResult.Success == true {
		t.Errorf(getOrder_RequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestOrderAllocationCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for OrderAllocation
	//----------------------------------------------------------------------------
	OrderAllocationObj := model.OrderAllocation            {AllocationPercent:new Percentage()}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createOrderAllocationRequestResult := dao.CreateOrderAllocation( OrderAllocationObj )
	
	if createOrderAllocationRequestResult.Success == false {
		t.Errorf(createOrderAllocationRequestResult.Msg)
	} else {
		fmt.Println("Check Create OrderAllocation success...")
	}
	
	createOrderAllocationObj,_ := createOrderAllocationRequestResult.Data. (model.OrderAllocation)

	// --------------------------------------------------------------
	// Check OrderAllocation Obj ID
	// --------------------------------------------------------------	
	if createOrderAllocationObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for OrderAllocation" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getOrderAllocationRequestResult := dao.GetOrderAllocation( uint64(createOrderAllocationObj.ID) )
	
	if getOrderAllocationRequestResult.Success == false {
		t.Errorf(getOrderAllocationRequestResult.Msg)
	} else {
		fmt.Println("Check Get OrderAllocation success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getOrderAllocationObj,_ := getOrderAllocationRequestResult.Data. (model.OrderAllocation)
	compareOrderAllocation := cmp.Equal(createOrderAllocationObj.ID, getOrderAllocationObj.ID)
	
	if  compareOrderAllocation == false	{
		t.Errorf( "Created OrderAllocation object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllOrderAllocationRequestResult := dao.GetAllOrderAllocation()

	if getAllOrderAllocationRequestResult.Success == false {
			t.Errorf(getAllOrderAllocationRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll OrderAllocation success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllOrderAllocationObj []model.OrderAllocation = getAllOrderAllocationRequestResult.Data. ([]model.OrderAllocation)
		
	equalOrderAllocation := cmp.Equal(createOrderAllocationObj.ID, getAllOrderAllocationObj[len(getAllOrderAllocationObj)-1].ID)
		
	if equalOrderAllocation == false {
		t.Errorf( "Created object is not equal to the last entry in OrderAllocation[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for OrderAllocation
	// --------------------------------------------------------------	
	deleteOrderAllocationRequestResult := dao.DeleteOrderAllocation(uint64(createOrderAllocationObj.ID))

	if deleteOrderAllocationRequestResult.Success == false {
			t.Errorf(deleteOrderAllocationRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion OrderAllocation success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getOrderAllocationRequestResult = dao.GetOrderAllocation( uint64(createOrderAllocationObj.ID) )
	
	if getOrderAllocationRequestResult.Success == true {
		t.Errorf(getOrderAllocationRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestTradeCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Trade
	//----------------------------------------------------------------------------
	TradeObj := model.Trade                                                                                                                                                                                                            {ExecutionId:"test value for ExecutionId",ExecutionPrice:new Money(),ExecutedQuantity:"test value",TradeDate:time.Now(),Venue:"test value for Venue",Status:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createTradeRequestResult := dao.CreateTrade( TradeObj )
	
	if createTradeRequestResult.Success == false {
		t.Errorf(createTradeRequestResult.Msg)
	} else {
		fmt.Println("Check Create Trade success...")
	}
	
	createTradeObj,_ := createTradeRequestResult.Data. (model.Trade)

	// --------------------------------------------------------------
	// Check Trade Obj ID
	// --------------------------------------------------------------	
	if createTradeObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Trade" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getTradeRequestResult := dao.GetTrade( uint64(createTradeObj.ID) )
	
	if getTradeRequestResult.Success == false {
		t.Errorf(getTradeRequestResult.Msg)
	} else {
		fmt.Println("Check Get Trade success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getTradeObj,_ := getTradeRequestResult.Data. (model.Trade)
	compareTrade := cmp.Equal(createTradeObj.ID, getTradeObj.ID)
	
	if  compareTrade == false	{
		t.Errorf( "Created Trade object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllTradeRequestResult := dao.GetAllTrade()

	if getAllTradeRequestResult.Success == false {
			t.Errorf(getAllTradeRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Trade success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllTradeObj []model.Trade = getAllTradeRequestResult.Data. ([]model.Trade)
		
	equalTrade := cmp.Equal(createTradeObj.ID, getAllTradeObj[len(getAllTradeObj)-1].ID)
		
	if equalTrade == false {
		t.Errorf( "Created object is not equal to the last entry in Trade[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Trade
	// --------------------------------------------------------------	
	deleteTradeRequestResult := dao.DeleteTrade(uint64(createTradeObj.ID))

	if deleteTradeRequestResult.Success == false {
			t.Errorf(deleteTradeRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Trade success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getTradeRequestResult = dao.GetTrade( uint64(createTradeObj.ID) )
	
	if getTradeRequestResult.Success == true {
		t.Errorf(getTradeRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestRebalancePlanCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for RebalancePlan
	//----------------------------------------------------------------------------
	RebalancePlanObj := model.RebalancePlan                                                                                    {PlanDate:time.Now(),Status:0,Method:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createRebalancePlanRequestResult := dao.CreateRebalancePlan( RebalancePlanObj )
	
	if createRebalancePlanRequestResult.Success == false {
		t.Errorf(createRebalancePlanRequestResult.Msg)
	} else {
		fmt.Println("Check Create RebalancePlan success...")
	}
	
	createRebalancePlanObj,_ := createRebalancePlanRequestResult.Data. (model.RebalancePlan)

	// --------------------------------------------------------------
	// Check RebalancePlan Obj ID
	// --------------------------------------------------------------	
	if createRebalancePlanObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for RebalancePlan" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getRebalancePlanRequestResult := dao.GetRebalancePlan( uint64(createRebalancePlanObj.ID) )
	
	if getRebalancePlanRequestResult.Success == false {
		t.Errorf(getRebalancePlanRequestResult.Msg)
	} else {
		fmt.Println("Check Get RebalancePlan success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getRebalancePlanObj,_ := getRebalancePlanRequestResult.Data. (model.RebalancePlan)
	compareRebalancePlan := cmp.Equal(createRebalancePlanObj.ID, getRebalancePlanObj.ID)
	
	if  compareRebalancePlan == false	{
		t.Errorf( "Created RebalancePlan object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllRebalancePlanRequestResult := dao.GetAllRebalancePlan()

	if getAllRebalancePlanRequestResult.Success == false {
			t.Errorf(getAllRebalancePlanRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll RebalancePlan success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllRebalancePlanObj []model.RebalancePlan = getAllRebalancePlanRequestResult.Data. ([]model.RebalancePlan)
		
	equalRebalancePlan := cmp.Equal(createRebalancePlanObj.ID, getAllRebalancePlanObj[len(getAllRebalancePlanObj)-1].ID)
		
	if equalRebalancePlan == false {
		t.Errorf( "Created object is not equal to the last entry in RebalancePlan[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for RebalancePlan
	// --------------------------------------------------------------	
	deleteRebalancePlanRequestResult := dao.DeleteRebalancePlan(uint64(createRebalancePlanObj.ID))

	if deleteRebalancePlanRequestResult.Success == false {
			t.Errorf(deleteRebalancePlanRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion RebalancePlan success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getRebalancePlanRequestResult = dao.GetRebalancePlan( uint64(createRebalancePlanObj.ID) )
	
	if getRebalancePlanRequestResult.Success == true {
		t.Errorf(getRebalancePlanRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestPerformanceReportCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for PerformanceReport
	//----------------------------------------------------------------------------
	PerformanceReportObj := model.PerformanceReport                                                                                                                                                            {PeriodStart:time.Now(),PeriodEnd:time.Now(),NetReturn:new Percentage(),GrossReturn:new Percentage(),Frequency:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createPerformanceReportRequestResult := dao.CreatePerformanceReport( PerformanceReportObj )
	
	if createPerformanceReportRequestResult.Success == false {
		t.Errorf(createPerformanceReportRequestResult.Msg)
	} else {
		fmt.Println("Check Create PerformanceReport success...")
	}
	
	createPerformanceReportObj,_ := createPerformanceReportRequestResult.Data. (model.PerformanceReport)

	// --------------------------------------------------------------
	// Check PerformanceReport Obj ID
	// --------------------------------------------------------------	
	if createPerformanceReportObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for PerformanceReport" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getPerformanceReportRequestResult := dao.GetPerformanceReport( uint64(createPerformanceReportObj.ID) )
	
	if getPerformanceReportRequestResult.Success == false {
		t.Errorf(getPerformanceReportRequestResult.Msg)
	} else {
		fmt.Println("Check Get PerformanceReport success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getPerformanceReportObj,_ := getPerformanceReportRequestResult.Data. (model.PerformanceReport)
	comparePerformanceReport := cmp.Equal(createPerformanceReportObj.ID, getPerformanceReportObj.ID)
	
	if  comparePerformanceReport == false	{
		t.Errorf( "Created PerformanceReport object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllPerformanceReportRequestResult := dao.GetAllPerformanceReport()

	if getAllPerformanceReportRequestResult.Success == false {
			t.Errorf(getAllPerformanceReportRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll PerformanceReport success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllPerformanceReportObj []model.PerformanceReport = getAllPerformanceReportRequestResult.Data. ([]model.PerformanceReport)
		
	equalPerformanceReport := cmp.Equal(createPerformanceReportObj.ID, getAllPerformanceReportObj[len(getAllPerformanceReportObj)-1].ID)
		
	if equalPerformanceReport == false {
		t.Errorf( "Created object is not equal to the last entry in PerformanceReport[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for PerformanceReport
	// --------------------------------------------------------------	
	deletePerformanceReportRequestResult := dao.DeletePerformanceReport(uint64(createPerformanceReportObj.ID))

	if deletePerformanceReportRequestResult.Success == false {
			t.Errorf(deletePerformanceReportRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion PerformanceReport success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getPerformanceReportRequestResult = dao.GetPerformanceReport( uint64(createPerformanceReportObj.ID) )
	
	if getPerformanceReportRequestResult.Success == true {
		t.Errorf(getPerformanceReportRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestBenchmarkCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Benchmark
	//----------------------------------------------------------------------------
	BenchmarkObj := model.Benchmark                                            {Name:"test value for Name",BenchmarkType:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createBenchmarkRequestResult := dao.CreateBenchmark( BenchmarkObj )
	
	if createBenchmarkRequestResult.Success == false {
		t.Errorf(createBenchmarkRequestResult.Msg)
	} else {
		fmt.Println("Check Create Benchmark success...")
	}
	
	createBenchmarkObj,_ := createBenchmarkRequestResult.Data. (model.Benchmark)

	// --------------------------------------------------------------
	// Check Benchmark Obj ID
	// --------------------------------------------------------------	
	if createBenchmarkObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Benchmark" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getBenchmarkRequestResult := dao.GetBenchmark( uint64(createBenchmarkObj.ID) )
	
	if getBenchmarkRequestResult.Success == false {
		t.Errorf(getBenchmarkRequestResult.Msg)
	} else {
		fmt.Println("Check Get Benchmark success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getBenchmarkObj,_ := getBenchmarkRequestResult.Data. (model.Benchmark)
	compareBenchmark := cmp.Equal(createBenchmarkObj.ID, getBenchmarkObj.ID)
	
	if  compareBenchmark == false	{
		t.Errorf( "Created Benchmark object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllBenchmarkRequestResult := dao.GetAllBenchmark()

	if getAllBenchmarkRequestResult.Success == false {
			t.Errorf(getAllBenchmarkRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Benchmark success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllBenchmarkObj []model.Benchmark = getAllBenchmarkRequestResult.Data. ([]model.Benchmark)
		
	equalBenchmark := cmp.Equal(createBenchmarkObj.ID, getAllBenchmarkObj[len(getAllBenchmarkObj)-1].ID)
		
	if equalBenchmark == false {
		t.Errorf( "Created object is not equal to the last entry in Benchmark[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Benchmark
	// --------------------------------------------------------------	
	deleteBenchmarkRequestResult := dao.DeleteBenchmark(uint64(createBenchmarkObj.ID))

	if deleteBenchmarkRequestResult.Success == false {
			t.Errorf(deleteBenchmarkRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Benchmark success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getBenchmarkRequestResult = dao.GetBenchmark( uint64(createBenchmarkObj.ID) )
	
	if getBenchmarkRequestResult.Success == true {
		t.Errorf(getBenchmarkRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestFeeScheduleCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for FeeSchedule
	//----------------------------------------------------------------------------
	FeeScheduleObj := model.FeeSchedule                                                                                            {Name:"test value for Name",Rate:new Percentage(),MinimumFee:new Money(),FeeType:0,BillingMethod:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createFeeScheduleRequestResult := dao.CreateFeeSchedule( FeeScheduleObj )
	
	if createFeeScheduleRequestResult.Success == false {
		t.Errorf(createFeeScheduleRequestResult.Msg)
	} else {
		fmt.Println("Check Create FeeSchedule success...")
	}
	
	createFeeScheduleObj,_ := createFeeScheduleRequestResult.Data. (model.FeeSchedule)

	// --------------------------------------------------------------
	// Check FeeSchedule Obj ID
	// --------------------------------------------------------------	
	if createFeeScheduleObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for FeeSchedule" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getFeeScheduleRequestResult := dao.GetFeeSchedule( uint64(createFeeScheduleObj.ID) )
	
	if getFeeScheduleRequestResult.Success == false {
		t.Errorf(getFeeScheduleRequestResult.Msg)
	} else {
		fmt.Println("Check Get FeeSchedule success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getFeeScheduleObj,_ := getFeeScheduleRequestResult.Data. (model.FeeSchedule)
	compareFeeSchedule := cmp.Equal(createFeeScheduleObj.ID, getFeeScheduleObj.ID)
	
	if  compareFeeSchedule == false	{
		t.Errorf( "Created FeeSchedule object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllFeeScheduleRequestResult := dao.GetAllFeeSchedule()

	if getAllFeeScheduleRequestResult.Success == false {
			t.Errorf(getAllFeeScheduleRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll FeeSchedule success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllFeeScheduleObj []model.FeeSchedule = getAllFeeScheduleRequestResult.Data. ([]model.FeeSchedule)
		
	equalFeeSchedule := cmp.Equal(createFeeScheduleObj.ID, getAllFeeScheduleObj[len(getAllFeeScheduleObj)-1].ID)
		
	if equalFeeSchedule == false {
		t.Errorf( "Created object is not equal to the last entry in FeeSchedule[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for FeeSchedule
	// --------------------------------------------------------------	
	deleteFeeScheduleRequestResult := dao.DeleteFeeSchedule(uint64(createFeeScheduleObj.ID))

	if deleteFeeScheduleRequestResult.Success == false {
			t.Errorf(deleteFeeScheduleRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion FeeSchedule success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getFeeScheduleRequestResult = dao.GetFeeSchedule( uint64(createFeeScheduleObj.ID) )
	
	if getFeeScheduleRequestResult.Success == true {
		t.Errorf(getFeeScheduleRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestFeeCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Fee
	//----------------------------------------------------------------------------
	FeeObj := model.Fee                                                                                                                    {FeeDate:time.Now(),Amount:new Money(),Description:"test value for Description",FeeType:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createFeeRequestResult := dao.CreateFee( FeeObj )
	
	if createFeeRequestResult.Success == false {
		t.Errorf(createFeeRequestResult.Msg)
	} else {
		fmt.Println("Check Create Fee success...")
	}
	
	createFeeObj,_ := createFeeRequestResult.Data. (model.Fee)

	// --------------------------------------------------------------
	// Check Fee Obj ID
	// --------------------------------------------------------------	
	if createFeeObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Fee" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getFeeRequestResult := dao.GetFee( uint64(createFeeObj.ID) )
	
	if getFeeRequestResult.Success == false {
		t.Errorf(getFeeRequestResult.Msg)
	} else {
		fmt.Println("Check Get Fee success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getFeeObj,_ := getFeeRequestResult.Data. (model.Fee)
	compareFee := cmp.Equal(createFeeObj.ID, getFeeObj.ID)
	
	if  compareFee == false	{
		t.Errorf( "Created Fee object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllFeeRequestResult := dao.GetAllFee()

	if getAllFeeRequestResult.Success == false {
			t.Errorf(getAllFeeRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Fee success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllFeeObj []model.Fee = getAllFeeRequestResult.Data. ([]model.Fee)
		
	equalFee := cmp.Equal(createFeeObj.ID, getAllFeeObj[len(getAllFeeObj)-1].ID)
		
	if equalFee == false {
		t.Errorf( "Created object is not equal to the last entry in Fee[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Fee
	// --------------------------------------------------------------	
	deleteFeeRequestResult := dao.DeleteFee(uint64(createFeeObj.ID))

	if deleteFeeRequestResult.Success == false {
			t.Errorf(deleteFeeRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Fee success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getFeeRequestResult = dao.GetFee( uint64(createFeeObj.ID) )
	
	if getFeeRequestResult.Success == true {
		t.Errorf(getFeeRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestBillingRunCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for BillingRun
	//----------------------------------------------------------------------------
	BillingRunObj := model.BillingRun                                                                                                                                                                                    {RunDate:time.Now(),PeriodStart:time.Now(),PeriodEnd:time.Now(),Status:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createBillingRunRequestResult := dao.CreateBillingRun( BillingRunObj )
	
	if createBillingRunRequestResult.Success == false {
		t.Errorf(createBillingRunRequestResult.Msg)
	} else {
		fmt.Println("Check Create BillingRun success...")
	}
	
	createBillingRunObj,_ := createBillingRunRequestResult.Data. (model.BillingRun)

	// --------------------------------------------------------------
	// Check BillingRun Obj ID
	// --------------------------------------------------------------	
	if createBillingRunObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for BillingRun" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getBillingRunRequestResult := dao.GetBillingRun( uint64(createBillingRunObj.ID) )
	
	if getBillingRunRequestResult.Success == false {
		t.Errorf(getBillingRunRequestResult.Msg)
	} else {
		fmt.Println("Check Get BillingRun success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getBillingRunObj,_ := getBillingRunRequestResult.Data. (model.BillingRun)
	compareBillingRun := cmp.Equal(createBillingRunObj.ID, getBillingRunObj.ID)
	
	if  compareBillingRun == false	{
		t.Errorf( "Created BillingRun object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllBillingRunRequestResult := dao.GetAllBillingRun()

	if getAllBillingRunRequestResult.Success == false {
			t.Errorf(getAllBillingRunRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll BillingRun success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllBillingRunObj []model.BillingRun = getAllBillingRunRequestResult.Data. ([]model.BillingRun)
		
	equalBillingRun := cmp.Equal(createBillingRunObj.ID, getAllBillingRunObj[len(getAllBillingRunObj)-1].ID)
		
	if equalBillingRun == false {
		t.Errorf( "Created object is not equal to the last entry in BillingRun[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for BillingRun
	// --------------------------------------------------------------	
	deleteBillingRunRequestResult := dao.DeleteBillingRun(uint64(createBillingRunObj.ID))

	if deleteBillingRunRequestResult.Success == false {
			t.Errorf(deleteBillingRunRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion BillingRun success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getBillingRunRequestResult = dao.GetBillingRun( uint64(createBillingRunObj.ID) )
	
	if getBillingRunRequestResult.Success == true {
		t.Errorf(getBillingRunRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestInvoiceCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Invoice
	//----------------------------------------------------------------------------
	InvoiceObj := model.Invoice                                                                                                                                                                            {InvoiceNumber:"test value for InvoiceNumber",IssueDate:time.Now(),DueDate:time.Now(),TotalDue:new Money(),Status:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createInvoiceRequestResult := dao.CreateInvoice( InvoiceObj )
	
	if createInvoiceRequestResult.Success == false {
		t.Errorf(createInvoiceRequestResult.Msg)
	} else {
		fmt.Println("Check Create Invoice success...")
	}
	
	createInvoiceObj,_ := createInvoiceRequestResult.Data. (model.Invoice)

	// --------------------------------------------------------------
	// Check Invoice Obj ID
	// --------------------------------------------------------------	
	if createInvoiceObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Invoice" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getInvoiceRequestResult := dao.GetInvoice( uint64(createInvoiceObj.ID) )
	
	if getInvoiceRequestResult.Success == false {
		t.Errorf(getInvoiceRequestResult.Msg)
	} else {
		fmt.Println("Check Get Invoice success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getInvoiceObj,_ := getInvoiceRequestResult.Data. (model.Invoice)
	compareInvoice := cmp.Equal(createInvoiceObj.ID, getInvoiceObj.ID)
	
	if  compareInvoice == false	{
		t.Errorf( "Created Invoice object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllInvoiceRequestResult := dao.GetAllInvoice()

	if getAllInvoiceRequestResult.Success == false {
			t.Errorf(getAllInvoiceRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Invoice success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllInvoiceObj []model.Invoice = getAllInvoiceRequestResult.Data. ([]model.Invoice)
		
	equalInvoice := cmp.Equal(createInvoiceObj.ID, getAllInvoiceObj[len(getAllInvoiceObj)-1].ID)
		
	if equalInvoice == false {
		t.Errorf( "Created object is not equal to the last entry in Invoice[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Invoice
	// --------------------------------------------------------------	
	deleteInvoiceRequestResult := dao.DeleteInvoice(uint64(createInvoiceObj.ID))

	if deleteInvoiceRequestResult.Success == false {
			t.Errorf(deleteInvoiceRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Invoice success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getInvoiceRequestResult = dao.GetInvoice( uint64(createInvoiceObj.ID) )
	
	if getInvoiceRequestResult.Success == true {
		t.Errorf(getInvoiceRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestDocumentCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Document
	//----------------------------------------------------------------------------
	DocumentObj := model.Document                                                                                                                                    {Title:"test value for Title",FileName:"test value for FileName",ReceivedDate:time.Now(),DocumentType:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createDocumentRequestResult := dao.CreateDocument( DocumentObj )
	
	if createDocumentRequestResult.Success == false {
		t.Errorf(createDocumentRequestResult.Msg)
	} else {
		fmt.Println("Check Create Document success...")
	}
	
	createDocumentObj,_ := createDocumentRequestResult.Data. (model.Document)

	// --------------------------------------------------------------
	// Check Document Obj ID
	// --------------------------------------------------------------	
	if createDocumentObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Document" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getDocumentRequestResult := dao.GetDocument( uint64(createDocumentObj.ID) )
	
	if getDocumentRequestResult.Success == false {
		t.Errorf(getDocumentRequestResult.Msg)
	} else {
		fmt.Println("Check Get Document success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getDocumentObj,_ := getDocumentRequestResult.Data. (model.Document)
	compareDocument := cmp.Equal(createDocumentObj.ID, getDocumentObj.ID)
	
	if  compareDocument == false	{
		t.Errorf( "Created Document object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllDocumentRequestResult := dao.GetAllDocument()

	if getAllDocumentRequestResult.Success == false {
			t.Errorf(getAllDocumentRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Document success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllDocumentObj []model.Document = getAllDocumentRequestResult.Data. ([]model.Document)
		
	equalDocument := cmp.Equal(createDocumentObj.ID, getAllDocumentObj[len(getAllDocumentObj)-1].ID)
		
	if equalDocument == false {
		t.Errorf( "Created object is not equal to the last entry in Document[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Document
	// --------------------------------------------------------------	
	deleteDocumentRequestResult := dao.DeleteDocument(uint64(createDocumentObj.ID))

	if deleteDocumentRequestResult.Success == false {
			t.Errorf(deleteDocumentRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Document success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getDocumentRequestResult = dao.GetDocument( uint64(createDocumentObj.ID) )
	
	if getDocumentRequestResult.Success == true {
		t.Errorf(getDocumentRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestAgreementCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Agreement
	//----------------------------------------------------------------------------
	AgreementObj := model.Agreement                                                                                    {EffectiveDate:time.Now(),AgreementType:0,Status:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createAgreementRequestResult := dao.CreateAgreement( AgreementObj )
	
	if createAgreementRequestResult.Success == false {
		t.Errorf(createAgreementRequestResult.Msg)
	} else {
		fmt.Println("Check Create Agreement success...")
	}
	
	createAgreementObj,_ := createAgreementRequestResult.Data. (model.Agreement)

	// --------------------------------------------------------------
	// Check Agreement Obj ID
	// --------------------------------------------------------------	
	if createAgreementObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Agreement" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getAgreementRequestResult := dao.GetAgreement( uint64(createAgreementObj.ID) )
	
	if getAgreementRequestResult.Success == false {
		t.Errorf(getAgreementRequestResult.Msg)
	} else {
		fmt.Println("Check Get Agreement success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getAgreementObj,_ := getAgreementRequestResult.Data. (model.Agreement)
	compareAgreement := cmp.Equal(createAgreementObj.ID, getAgreementObj.ID)
	
	if  compareAgreement == false	{
		t.Errorf( "Created Agreement object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllAgreementRequestResult := dao.GetAllAgreement()

	if getAllAgreementRequestResult.Success == false {
			t.Errorf(getAllAgreementRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Agreement success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllAgreementObj []model.Agreement = getAllAgreementRequestResult.Data. ([]model.Agreement)
		
	equalAgreement := cmp.Equal(createAgreementObj.ID, getAllAgreementObj[len(getAllAgreementObj)-1].ID)
		
	if equalAgreement == false {
		t.Errorf( "Created object is not equal to the last entry in Agreement[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Agreement
	// --------------------------------------------------------------	
	deleteAgreementRequestResult := dao.DeleteAgreement(uint64(createAgreementObj.ID))

	if deleteAgreementRequestResult.Success == false {
			t.Errorf(deleteAgreementRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Agreement success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getAgreementRequestResult = dao.GetAgreement( uint64(createAgreementObj.ID) )
	
	if getAgreementRequestResult.Success == true {
		t.Errorf(getAgreementRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestComplianceRuleCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for ComplianceRule
	//----------------------------------------------------------------------------
	ComplianceRuleObj := model.ComplianceRule                                                                                                            {Name:"test value for Name",RuleCode:"test value for RuleCode",Description:"test value for Description",RuleSeverity:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createComplianceRuleRequestResult := dao.CreateComplianceRule( ComplianceRuleObj )
	
	if createComplianceRuleRequestResult.Success == false {
		t.Errorf(createComplianceRuleRequestResult.Msg)
	} else {
		fmt.Println("Check Create ComplianceRule success...")
	}
	
	createComplianceRuleObj,_ := createComplianceRuleRequestResult.Data. (model.ComplianceRule)

	// --------------------------------------------------------------
	// Check ComplianceRule Obj ID
	// --------------------------------------------------------------	
	if createComplianceRuleObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for ComplianceRule" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getComplianceRuleRequestResult := dao.GetComplianceRule( uint64(createComplianceRuleObj.ID) )
	
	if getComplianceRuleRequestResult.Success == false {
		t.Errorf(getComplianceRuleRequestResult.Msg)
	} else {
		fmt.Println("Check Get ComplianceRule success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getComplianceRuleObj,_ := getComplianceRuleRequestResult.Data. (model.ComplianceRule)
	compareComplianceRule := cmp.Equal(createComplianceRuleObj.ID, getComplianceRuleObj.ID)
	
	if  compareComplianceRule == false	{
		t.Errorf( "Created ComplianceRule object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllComplianceRuleRequestResult := dao.GetAllComplianceRule()

	if getAllComplianceRuleRequestResult.Success == false {
			t.Errorf(getAllComplianceRuleRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll ComplianceRule success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllComplianceRuleObj []model.ComplianceRule = getAllComplianceRuleRequestResult.Data. ([]model.ComplianceRule)
		
	equalComplianceRule := cmp.Equal(createComplianceRuleObj.ID, getAllComplianceRuleObj[len(getAllComplianceRuleObj)-1].ID)
		
	if equalComplianceRule == false {
		t.Errorf( "Created object is not equal to the last entry in ComplianceRule[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for ComplianceRule
	// --------------------------------------------------------------	
	deleteComplianceRuleRequestResult := dao.DeleteComplianceRule(uint64(createComplianceRuleObj.ID))

	if deleteComplianceRuleRequestResult.Success == false {
			t.Errorf(deleteComplianceRuleRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion ComplianceRule success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getComplianceRuleRequestResult = dao.GetComplianceRule( uint64(createComplianceRuleObj.ID) )
	
	if getComplianceRuleRequestResult.Success == true {
		t.Errorf(getComplianceRuleRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestComplianceAlertCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for ComplianceAlert
	//----------------------------------------------------------------------------
	ComplianceAlertObj := model.ComplianceAlert                                                                                                                    {AlertDate:time.Now(),Message:"test value for Message",Status:0,Severity:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createComplianceAlertRequestResult := dao.CreateComplianceAlert( ComplianceAlertObj )
	
	if createComplianceAlertRequestResult.Success == false {
		t.Errorf(createComplianceAlertRequestResult.Msg)
	} else {
		fmt.Println("Check Create ComplianceAlert success...")
	}
	
	createComplianceAlertObj,_ := createComplianceAlertRequestResult.Data. (model.ComplianceAlert)

	// --------------------------------------------------------------
	// Check ComplianceAlert Obj ID
	// --------------------------------------------------------------	
	if createComplianceAlertObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for ComplianceAlert" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getComplianceAlertRequestResult := dao.GetComplianceAlert( uint64(createComplianceAlertObj.ID) )
	
	if getComplianceAlertRequestResult.Success == false {
		t.Errorf(getComplianceAlertRequestResult.Msg)
	} else {
		fmt.Println("Check Get ComplianceAlert success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getComplianceAlertObj,_ := getComplianceAlertRequestResult.Data. (model.ComplianceAlert)
	compareComplianceAlert := cmp.Equal(createComplianceAlertObj.ID, getComplianceAlertObj.ID)
	
	if  compareComplianceAlert == false	{
		t.Errorf( "Created ComplianceAlert object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllComplianceAlertRequestResult := dao.GetAllComplianceAlert()

	if getAllComplianceAlertRequestResult.Success == false {
			t.Errorf(getAllComplianceAlertRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll ComplianceAlert success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllComplianceAlertObj []model.ComplianceAlert = getAllComplianceAlertRequestResult.Data. ([]model.ComplianceAlert)
		
	equalComplianceAlert := cmp.Equal(createComplianceAlertObj.ID, getAllComplianceAlertObj[len(getAllComplianceAlertObj)-1].ID)
		
	if equalComplianceAlert == false {
		t.Errorf( "Created object is not equal to the last entry in ComplianceAlert[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for ComplianceAlert
	// --------------------------------------------------------------	
	deleteComplianceAlertRequestResult := dao.DeleteComplianceAlert(uint64(createComplianceAlertObj.ID))

	if deleteComplianceAlertRequestResult.Success == false {
			t.Errorf(deleteComplianceAlertRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion ComplianceAlert success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getComplianceAlertRequestResult = dao.GetComplianceAlert( uint64(createComplianceAlertObj.ID) )
	
	if getComplianceAlertRequestResult.Success == true {
		t.Errorf(getComplianceAlertRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestProposalCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Proposal
	//----------------------------------------------------------------------------
	ProposalObj := model.Proposal                                                                                                                                                    {ProposalNumber:"test value for ProposalNumber",CreatedDate:time.Now(),RecommendationText:"test value for RecommendationText",Status:0,ExpectedRisk:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createProposalRequestResult := dao.CreateProposal( ProposalObj )
	
	if createProposalRequestResult.Success == false {
		t.Errorf(createProposalRequestResult.Msg)
	} else {
		fmt.Println("Check Create Proposal success...")
	}
	
	createProposalObj,_ := createProposalRequestResult.Data. (model.Proposal)

	// --------------------------------------------------------------
	// Check Proposal Obj ID
	// --------------------------------------------------------------	
	if createProposalObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Proposal" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getProposalRequestResult := dao.GetProposal( uint64(createProposalObj.ID) )
	
	if getProposalRequestResult.Success == false {
		t.Errorf(getProposalRequestResult.Msg)
	} else {
		fmt.Println("Check Get Proposal success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getProposalObj,_ := getProposalRequestResult.Data. (model.Proposal)
	compareProposal := cmp.Equal(createProposalObj.ID, getProposalObj.ID)
	
	if  compareProposal == false	{
		t.Errorf( "Created Proposal object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllProposalRequestResult := dao.GetAllProposal()

	if getAllProposalRequestResult.Success == false {
			t.Errorf(getAllProposalRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Proposal success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllProposalObj []model.Proposal = getAllProposalRequestResult.Data. ([]model.Proposal)
		
	equalProposal := cmp.Equal(createProposalObj.ID, getAllProposalObj[len(getAllProposalObj)-1].ID)
		
	if equalProposal == false {
		t.Errorf( "Created object is not equal to the last entry in Proposal[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Proposal
	// --------------------------------------------------------------	
	deleteProposalRequestResult := dao.DeleteProposal(uint64(createProposalObj.ID))

	if deleteProposalRequestResult.Success == false {
			t.Errorf(deleteProposalRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Proposal success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getProposalRequestResult = dao.GetProposal( uint64(createProposalObj.ID) )
	
	if getProposalRequestResult.Success == true {
		t.Errorf(getProposalRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestAccountTransferCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for AccountTransfer
	//----------------------------------------------------------------------------
	AccountTransferObj := model.AccountTransfer                                                                                                                                            {RequestDate:time.Now(),CompletionDate:time.Now(),TransferType:0,Status:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createAccountTransferRequestResult := dao.CreateAccountTransfer( AccountTransferObj )
	
	if createAccountTransferRequestResult.Success == false {
		t.Errorf(createAccountTransferRequestResult.Msg)
	} else {
		fmt.Println("Check Create AccountTransfer success...")
	}
	
	createAccountTransferObj,_ := createAccountTransferRequestResult.Data. (model.AccountTransfer)

	// --------------------------------------------------------------
	// Check AccountTransfer Obj ID
	// --------------------------------------------------------------	
	if createAccountTransferObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for AccountTransfer" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getAccountTransferRequestResult := dao.GetAccountTransfer( uint64(createAccountTransferObj.ID) )
	
	if getAccountTransferRequestResult.Success == false {
		t.Errorf(getAccountTransferRequestResult.Msg)
	} else {
		fmt.Println("Check Get AccountTransfer success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getAccountTransferObj,_ := getAccountTransferRequestResult.Data. (model.AccountTransfer)
	compareAccountTransfer := cmp.Equal(createAccountTransferObj.ID, getAccountTransferObj.ID)
	
	if  compareAccountTransfer == false	{
		t.Errorf( "Created AccountTransfer object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllAccountTransferRequestResult := dao.GetAllAccountTransfer()

	if getAllAccountTransferRequestResult.Success == false {
			t.Errorf(getAllAccountTransferRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll AccountTransfer success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllAccountTransferObj []model.AccountTransfer = getAllAccountTransferRequestResult.Data. ([]model.AccountTransfer)
		
	equalAccountTransfer := cmp.Equal(createAccountTransferObj.ID, getAllAccountTransferObj[len(getAllAccountTransferObj)-1].ID)
		
	if equalAccountTransfer == false {
		t.Errorf( "Created object is not equal to the last entry in AccountTransfer[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for AccountTransfer
	// --------------------------------------------------------------	
	deleteAccountTransferRequestResult := dao.DeleteAccountTransfer(uint64(createAccountTransferObj.ID))

	if deleteAccountTransferRequestResult.Success == false {
			t.Errorf(deleteAccountTransferRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion AccountTransfer success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getAccountTransferRequestResult = dao.GetAccountTransfer( uint64(createAccountTransferObj.ID) )
	
	if getAccountTransferRequestResult.Success == true {
		t.Errorf(getAccountTransferRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestStandingInstructionCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for StandingInstruction
	//----------------------------------------------------------------------------
	StandingInstructionObj := model.StandingInstruction                                                                                                                                    {NextExecutionDate:time.Now(),Amount:new Money(),Active:true,InstructionType:0,Frequency:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createStandingInstructionRequestResult := dao.CreateStandingInstruction( StandingInstructionObj )
	
	if createStandingInstructionRequestResult.Success == false {
		t.Errorf(createStandingInstructionRequestResult.Msg)
	} else {
		fmt.Println("Check Create StandingInstruction success...")
	}
	
	createStandingInstructionObj,_ := createStandingInstructionRequestResult.Data. (model.StandingInstruction)

	// --------------------------------------------------------------
	// Check StandingInstruction Obj ID
	// --------------------------------------------------------------	
	if createStandingInstructionObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for StandingInstruction" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getStandingInstructionRequestResult := dao.GetStandingInstruction( uint64(createStandingInstructionObj.ID) )
	
	if getStandingInstructionRequestResult.Success == false {
		t.Errorf(getStandingInstructionRequestResult.Msg)
	} else {
		fmt.Println("Check Get StandingInstruction success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getStandingInstructionObj,_ := getStandingInstructionRequestResult.Data. (model.StandingInstruction)
	compareStandingInstruction := cmp.Equal(createStandingInstructionObj.ID, getStandingInstructionObj.ID)
	
	if  compareStandingInstruction == false	{
		t.Errorf( "Created StandingInstruction object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllStandingInstructionRequestResult := dao.GetAllStandingInstruction()

	if getAllStandingInstructionRequestResult.Success == false {
			t.Errorf(getAllStandingInstructionRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll StandingInstruction success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllStandingInstructionObj []model.StandingInstruction = getAllStandingInstructionRequestResult.Data. ([]model.StandingInstruction)
		
	equalStandingInstruction := cmp.Equal(createStandingInstructionObj.ID, getAllStandingInstructionObj[len(getAllStandingInstructionObj)-1].ID)
		
	if equalStandingInstruction == false {
		t.Errorf( "Created object is not equal to the last entry in StandingInstruction[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for StandingInstruction
	// --------------------------------------------------------------	
	deleteStandingInstructionRequestResult := dao.DeleteStandingInstruction(uint64(createStandingInstructionObj.ID))

	if deleteStandingInstructionRequestResult.Success == false {
			t.Errorf(deleteStandingInstructionRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion StandingInstruction success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getStandingInstructionRequestResult = dao.GetStandingInstruction( uint64(createStandingInstructionObj.ID) )
	
	if getStandingInstructionRequestResult.Success == true {
		t.Errorf(getStandingInstructionRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestCashMovementCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for CashMovement
	//----------------------------------------------------------------------------
	CashMovementObj := model.CashMovement                                                                                                                    {Amount:new Money(),ValueDate:time.Now(),Description:"test value for Description",MovementType:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createCashMovementRequestResult := dao.CreateCashMovement( CashMovementObj )
	
	if createCashMovementRequestResult.Success == false {
		t.Errorf(createCashMovementRequestResult.Msg)
	} else {
		fmt.Println("Check Create CashMovement success...")
	}
	
	createCashMovementObj,_ := createCashMovementRequestResult.Data. (model.CashMovement)

	// --------------------------------------------------------------
	// Check CashMovement Obj ID
	// --------------------------------------------------------------	
	if createCashMovementObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for CashMovement" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getCashMovementRequestResult := dao.GetCashMovement( uint64(createCashMovementObj.ID) )
	
	if getCashMovementRequestResult.Success == false {
		t.Errorf(getCashMovementRequestResult.Msg)
	} else {
		fmt.Println("Check Get CashMovement success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getCashMovementObj,_ := getCashMovementRequestResult.Data. (model.CashMovement)
	compareCashMovement := cmp.Equal(createCashMovementObj.ID, getCashMovementObj.ID)
	
	if  compareCashMovement == false	{
		t.Errorf( "Created CashMovement object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllCashMovementRequestResult := dao.GetAllCashMovement()

	if getAllCashMovementRequestResult.Success == false {
			t.Errorf(getAllCashMovementRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll CashMovement success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllCashMovementObj []model.CashMovement = getAllCashMovementRequestResult.Data. ([]model.CashMovement)
		
	equalCashMovement := cmp.Equal(createCashMovementObj.ID, getAllCashMovementObj[len(getAllCashMovementObj)-1].ID)
		
	if equalCashMovement == false {
		t.Errorf( "Created object is not equal to the last entry in CashMovement[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for CashMovement
	// --------------------------------------------------------------	
	deleteCashMovementRequestResult := dao.DeleteCashMovement(uint64(createCashMovementObj.ID))

	if deleteCashMovementRequestResult.Success == false {
			t.Errorf(deleteCashMovementRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion CashMovement success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getCashMovementRequestResult = dao.GetCashMovement( uint64(createCashMovementObj.ID) )
	
	if getCashMovementRequestResult.Success == true {
		t.Errorf(getCashMovementRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestResearchNoteCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for ResearchNote
	//----------------------------------------------------------------------------
	ResearchNoteObj := model.ResearchNote                                                                                                                                                                    {Title:"test value for Title",PublishedDate:time.Now(),Author:"test value for Author",ContentSummary:"test value for ContentSummary",Rating:0}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createResearchNoteRequestResult := dao.CreateResearchNote( ResearchNoteObj )
	
	if createResearchNoteRequestResult.Success == false {
		t.Errorf(createResearchNoteRequestResult.Msg)
	} else {
		fmt.Println("Check Create ResearchNote success...")
	}
	
	createResearchNoteObj,_ := createResearchNoteRequestResult.Data. (model.ResearchNote)

	// --------------------------------------------------------------
	// Check ResearchNote Obj ID
	// --------------------------------------------------------------	
	if createResearchNoteObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for ResearchNote" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getResearchNoteRequestResult := dao.GetResearchNote( uint64(createResearchNoteObj.ID) )
	
	if getResearchNoteRequestResult.Success == false {
		t.Errorf(getResearchNoteRequestResult.Msg)
	} else {
		fmt.Println("Check Get ResearchNote success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getResearchNoteObj,_ := getResearchNoteRequestResult.Data. (model.ResearchNote)
	compareResearchNote := cmp.Equal(createResearchNoteObj.ID, getResearchNoteObj.ID)
	
	if  compareResearchNote == false	{
		t.Errorf( "Created ResearchNote object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllResearchNoteRequestResult := dao.GetAllResearchNote()

	if getAllResearchNoteRequestResult.Success == false {
			t.Errorf(getAllResearchNoteRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll ResearchNote success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllResearchNoteObj []model.ResearchNote = getAllResearchNoteRequestResult.Data. ([]model.ResearchNote)
		
	equalResearchNote := cmp.Equal(createResearchNoteObj.ID, getAllResearchNoteObj[len(getAllResearchNoteObj)-1].ID)
		
	if equalResearchNote == false {
		t.Errorf( "Created object is not equal to the last entry in ResearchNote[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for ResearchNote
	// --------------------------------------------------------------	
	deleteResearchNoteRequestResult := dao.DeleteResearchNote(uint64(createResearchNoteObj.ID))

	if deleteResearchNoteRequestResult.Success == false {
			t.Errorf(deleteResearchNoteRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion ResearchNote success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getResearchNoteRequestResult = dao.GetResearchNote( uint64(createResearchNoteObj.ID) )
	
	if getResearchNoteRequestResult.Success == true {
		t.Errorf(getResearchNoteRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestMeetingCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Meeting
	//----------------------------------------------------------------------------
	MeetingObj := model.Meeting                                                                                                                                                    {MeetingDate:time.Now(),Location:"test value for Location",Subject:"test value for Subject",Notes:"test value for Notes"}

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createMeetingRequestResult := dao.CreateMeeting( MeetingObj )
	
	if createMeetingRequestResult.Success == false {
		t.Errorf(createMeetingRequestResult.Msg)
	} else {
		fmt.Println("Check Create Meeting success...")
	}
	
	createMeetingObj,_ := createMeetingRequestResult.Data. (model.Meeting)

	// --------------------------------------------------------------
	// Check Meeting Obj ID
	// --------------------------------------------------------------	
	if createMeetingObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Meeting" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getMeetingRequestResult := dao.GetMeeting( uint64(createMeetingObj.ID) )
	
	if getMeetingRequestResult.Success == false {
		t.Errorf(getMeetingRequestResult.Msg)
	} else {
		fmt.Println("Check Get Meeting success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getMeetingObj,_ := getMeetingRequestResult.Data. (model.Meeting)
	compareMeeting := cmp.Equal(createMeetingObj.ID, getMeetingObj.ID)
	
	if  compareMeeting == false	{
		t.Errorf( "Created Meeting object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllMeetingRequestResult := dao.GetAllMeeting()

	if getAllMeetingRequestResult.Success == false {
			t.Errorf(getAllMeetingRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Meeting success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllMeetingObj []model.Meeting = getAllMeetingRequestResult.Data. ([]model.Meeting)
		
	equalMeeting := cmp.Equal(createMeetingObj.ID, getAllMeetingObj[len(getAllMeetingObj)-1].ID)
		
	if equalMeeting == false {
		t.Errorf( "Created object is not equal to the last entry in Meeting[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Meeting
	// --------------------------------------------------------------	
	deleteMeetingRequestResult := dao.DeleteMeeting(uint64(createMeetingObj.ID))

	if deleteMeetingRequestResult.Success == false {
			t.Errorf(deleteMeetingRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Meeting success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getMeetingRequestResult = dao.GetMeeting( uint64(createMeetingObj.ID) )
	
	if getMeetingRequestResult.Success == true {
		t.Errorf(getMeetingRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}

