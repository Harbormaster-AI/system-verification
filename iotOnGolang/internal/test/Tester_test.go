package test

import ( 
	"testing"
    dao "iotOnGolang/internal/dao"
	"iotOnGolang/internal/model"
	"iotOnGolang/internal/utils"
	"github.com/google/go-cmp/cmp"
	"fmt"
#declareImports()	
)

func init() {
	utils.InitializeEnvironment()
}


func TestDeviceVendorCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for DeviceVendor
	//----------------------------------------------------------------------------
	DeviceVendorObj := model.DeviceVendor#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createDeviceVendorRequestResult := dao.CreateDeviceVendor( DeviceVendorObj )
	
	if createDeviceVendorRequestResult.Success == false {
		t.Errorf(createDeviceVendorRequestResult.Msg)
	} else {
		fmt.Println("Check Create DeviceVendor success...")
	}
	
	createDeviceVendorObj,_ := createDeviceVendorRequestResult.Data. (model.DeviceVendor)

	// --------------------------------------------------------------
	// Check DeviceVendor Obj ID
	// --------------------------------------------------------------	
	if createDeviceVendorObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for DeviceVendor" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getDeviceVendorRequestResult := dao.GetDeviceVendor( uint64(createDeviceVendorObj.ID) )
	
	if getDeviceVendorRequestResult.Success == false {
		t.Errorf(getDeviceVendorRequestResult.Msg)
	} else {
		fmt.Println("Check Get DeviceVendor success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getDeviceVendorObj,_ := getDeviceVendorRequestResult.Data. (model.DeviceVendor)
	compareDeviceVendor := cmp.Equal(createDeviceVendorObj.ID, getDeviceVendorObj.ID)
	
	if  compareDeviceVendor == false	{
		t.Errorf( "Created DeviceVendor object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllDeviceVendorRequestResult := dao.GetAllDeviceVendor()

	if getAllDeviceVendorRequestResult.Success == false {
			t.Errorf(getAllDeviceVendorRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll DeviceVendor success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllDeviceVendorObj []model.DeviceVendor = getAllDeviceVendorRequestResult.Data. ([]model.DeviceVendor)
		
	equalDeviceVendor := cmp.Equal(createDeviceVendorObj.ID, getAllDeviceVendorObj[len(getAllDeviceVendorObj)-1].ID)
		
	if equalDeviceVendor == false {
		t.Errorf( "Created object is not equal to the last entry in DeviceVendor[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for DeviceVendor
	// --------------------------------------------------------------	
	deleteDeviceVendorRequestResult := dao.DeleteDeviceVendor(uint64(createDeviceVendorObj.ID))

	if deleteDeviceVendorRequestResult.Success == false {
			t.Errorf(deleteDeviceVendorRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion DeviceVendor success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getDeviceVendorRequestResult = dao.GetDeviceVendor( uint64(createDeviceVendorObj.ID) )
	
	if getDeviceVendorRequestResult.Success == true {
		t.Errorf(getDeviceVendorRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestHardwareModuleCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for HardwareModule
	//----------------------------------------------------------------------------
	HardwareModuleObj := model.HardwareModule#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createHardwareModuleRequestResult := dao.CreateHardwareModule( HardwareModuleObj )
	
	if createHardwareModuleRequestResult.Success == false {
		t.Errorf(createHardwareModuleRequestResult.Msg)
	} else {
		fmt.Println("Check Create HardwareModule success...")
	}
	
	createHardwareModuleObj,_ := createHardwareModuleRequestResult.Data. (model.HardwareModule)

	// --------------------------------------------------------------
	// Check HardwareModule Obj ID
	// --------------------------------------------------------------	
	if createHardwareModuleObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for HardwareModule" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getHardwareModuleRequestResult := dao.GetHardwareModule( uint64(createHardwareModuleObj.ID) )
	
	if getHardwareModuleRequestResult.Success == false {
		t.Errorf(getHardwareModuleRequestResult.Msg)
	} else {
		fmt.Println("Check Get HardwareModule success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getHardwareModuleObj,_ := getHardwareModuleRequestResult.Data. (model.HardwareModule)
	compareHardwareModule := cmp.Equal(createHardwareModuleObj.ID, getHardwareModuleObj.ID)
	
	if  compareHardwareModule == false	{
		t.Errorf( "Created HardwareModule object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllHardwareModuleRequestResult := dao.GetAllHardwareModule()

	if getAllHardwareModuleRequestResult.Success == false {
			t.Errorf(getAllHardwareModuleRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll HardwareModule success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllHardwareModuleObj []model.HardwareModule = getAllHardwareModuleRequestResult.Data. ([]model.HardwareModule)
		
	equalHardwareModule := cmp.Equal(createHardwareModuleObj.ID, getAllHardwareModuleObj[len(getAllHardwareModuleObj)-1].ID)
		
	if equalHardwareModule == false {
		t.Errorf( "Created object is not equal to the last entry in HardwareModule[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for HardwareModule
	// --------------------------------------------------------------	
	deleteHardwareModuleRequestResult := dao.DeleteHardwareModule(uint64(createHardwareModuleObj.ID))

	if deleteHardwareModuleRequestResult.Success == false {
			t.Errorf(deleteHardwareModuleRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion HardwareModule success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getHardwareModuleRequestResult = dao.GetHardwareModule( uint64(createHardwareModuleObj.ID) )
	
	if getHardwareModuleRequestResult.Success == true {
		t.Errorf(getHardwareModuleRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestDeviceModelCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for DeviceModel
	//----------------------------------------------------------------------------
	DeviceModelObj := model.DeviceModel#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createDeviceModelRequestResult := dao.CreateDeviceModel( DeviceModelObj )
	
	if createDeviceModelRequestResult.Success == false {
		t.Errorf(createDeviceModelRequestResult.Msg)
	} else {
		fmt.Println("Check Create DeviceModel success...")
	}
	
	createDeviceModelObj,_ := createDeviceModelRequestResult.Data. (model.DeviceModel)

	// --------------------------------------------------------------
	// Check DeviceModel Obj ID
	// --------------------------------------------------------------	
	if createDeviceModelObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for DeviceModel" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getDeviceModelRequestResult := dao.GetDeviceModel( uint64(createDeviceModelObj.ID) )
	
	if getDeviceModelRequestResult.Success == false {
		t.Errorf(getDeviceModelRequestResult.Msg)
	} else {
		fmt.Println("Check Get DeviceModel success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getDeviceModelObj,_ := getDeviceModelRequestResult.Data. (model.DeviceModel)
	compareDeviceModel := cmp.Equal(createDeviceModelObj.ID, getDeviceModelObj.ID)
	
	if  compareDeviceModel == false	{
		t.Errorf( "Created DeviceModel object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllDeviceModelRequestResult := dao.GetAllDeviceModel()

	if getAllDeviceModelRequestResult.Success == false {
			t.Errorf(getAllDeviceModelRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll DeviceModel success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllDeviceModelObj []model.DeviceModel = getAllDeviceModelRequestResult.Data. ([]model.DeviceModel)
		
	equalDeviceModel := cmp.Equal(createDeviceModelObj.ID, getAllDeviceModelObj[len(getAllDeviceModelObj)-1].ID)
		
	if equalDeviceModel == false {
		t.Errorf( "Created object is not equal to the last entry in DeviceModel[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for DeviceModel
	// --------------------------------------------------------------	
	deleteDeviceModelRequestResult := dao.DeleteDeviceModel(uint64(createDeviceModelObj.ID))

	if deleteDeviceModelRequestResult.Success == false {
			t.Errorf(deleteDeviceModelRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion DeviceModel success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getDeviceModelRequestResult = dao.GetDeviceModel( uint64(createDeviceModelObj.ID) )
	
	if getDeviceModelRequestResult.Success == true {
		t.Errorf(getDeviceModelRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestFirmwareReleaseCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for FirmwareRelease
	//----------------------------------------------------------------------------
	FirmwareReleaseObj := model.FirmwareRelease#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createFirmwareReleaseRequestResult := dao.CreateFirmwareRelease( FirmwareReleaseObj )
	
	if createFirmwareReleaseRequestResult.Success == false {
		t.Errorf(createFirmwareReleaseRequestResult.Msg)
	} else {
		fmt.Println("Check Create FirmwareRelease success...")
	}
	
	createFirmwareReleaseObj,_ := createFirmwareReleaseRequestResult.Data. (model.FirmwareRelease)

	// --------------------------------------------------------------
	// Check FirmwareRelease Obj ID
	// --------------------------------------------------------------	
	if createFirmwareReleaseObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for FirmwareRelease" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getFirmwareReleaseRequestResult := dao.GetFirmwareRelease( uint64(createFirmwareReleaseObj.ID) )
	
	if getFirmwareReleaseRequestResult.Success == false {
		t.Errorf(getFirmwareReleaseRequestResult.Msg)
	} else {
		fmt.Println("Check Get FirmwareRelease success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getFirmwareReleaseObj,_ := getFirmwareReleaseRequestResult.Data. (model.FirmwareRelease)
	compareFirmwareRelease := cmp.Equal(createFirmwareReleaseObj.ID, getFirmwareReleaseObj.ID)
	
	if  compareFirmwareRelease == false	{
		t.Errorf( "Created FirmwareRelease object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllFirmwareReleaseRequestResult := dao.GetAllFirmwareRelease()

	if getAllFirmwareReleaseRequestResult.Success == false {
			t.Errorf(getAllFirmwareReleaseRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll FirmwareRelease success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllFirmwareReleaseObj []model.FirmwareRelease = getAllFirmwareReleaseRequestResult.Data. ([]model.FirmwareRelease)
		
	equalFirmwareRelease := cmp.Equal(createFirmwareReleaseObj.ID, getAllFirmwareReleaseObj[len(getAllFirmwareReleaseObj)-1].ID)
		
	if equalFirmwareRelease == false {
		t.Errorf( "Created object is not equal to the last entry in FirmwareRelease[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for FirmwareRelease
	// --------------------------------------------------------------	
	deleteFirmwareReleaseRequestResult := dao.DeleteFirmwareRelease(uint64(createFirmwareReleaseObj.ID))

	if deleteFirmwareReleaseRequestResult.Success == false {
			t.Errorf(deleteFirmwareReleaseRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion FirmwareRelease success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getFirmwareReleaseRequestResult = dao.GetFirmwareRelease( uint64(createFirmwareReleaseObj.ID) )
	
	if getFirmwareReleaseRequestResult.Success == true {
		t.Errorf(getFirmwareReleaseRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestIoTDeviceCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for IoTDevice
	//----------------------------------------------------------------------------
	IoTDeviceObj := model.IoTDevice#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createIoTDeviceRequestResult := dao.CreateIoTDevice( IoTDeviceObj )
	
	if createIoTDeviceRequestResult.Success == false {
		t.Errorf(createIoTDeviceRequestResult.Msg)
	} else {
		fmt.Println("Check Create IoTDevice success...")
	}
	
	createIoTDeviceObj,_ := createIoTDeviceRequestResult.Data. (model.IoTDevice)

	// --------------------------------------------------------------
	// Check IoTDevice Obj ID
	// --------------------------------------------------------------	
	if createIoTDeviceObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for IoTDevice" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getIoTDeviceRequestResult := dao.GetIoTDevice( uint64(createIoTDeviceObj.ID) )
	
	if getIoTDeviceRequestResult.Success == false {
		t.Errorf(getIoTDeviceRequestResult.Msg)
	} else {
		fmt.Println("Check Get IoTDevice success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getIoTDeviceObj,_ := getIoTDeviceRequestResult.Data. (model.IoTDevice)
	compareIoTDevice := cmp.Equal(createIoTDeviceObj.ID, getIoTDeviceObj.ID)
	
	if  compareIoTDevice == false	{
		t.Errorf( "Created IoTDevice object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllIoTDeviceRequestResult := dao.GetAllIoTDevice()

	if getAllIoTDeviceRequestResult.Success == false {
			t.Errorf(getAllIoTDeviceRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll IoTDevice success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllIoTDeviceObj []model.IoTDevice = getAllIoTDeviceRequestResult.Data. ([]model.IoTDevice)
		
	equalIoTDevice := cmp.Equal(createIoTDeviceObj.ID, getAllIoTDeviceObj[len(getAllIoTDeviceObj)-1].ID)
		
	if equalIoTDevice == false {
		t.Errorf( "Created object is not equal to the last entry in IoTDevice[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for IoTDevice
	// --------------------------------------------------------------	
	deleteIoTDeviceRequestResult := dao.DeleteIoTDevice(uint64(createIoTDeviceObj.ID))

	if deleteIoTDeviceRequestResult.Success == false {
			t.Errorf(deleteIoTDeviceRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion IoTDevice success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getIoTDeviceRequestResult = dao.GetIoTDevice( uint64(createIoTDeviceObj.ID) )
	
	if getIoTDeviceRequestResult.Success == true {
		t.Errorf(getIoTDeviceRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestSensorInstanceCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for SensorInstance
	//----------------------------------------------------------------------------
	SensorInstanceObj := model.SensorInstance#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createSensorInstanceRequestResult := dao.CreateSensorInstance( SensorInstanceObj )
	
	if createSensorInstanceRequestResult.Success == false {
		t.Errorf(createSensorInstanceRequestResult.Msg)
	} else {
		fmt.Println("Check Create SensorInstance success...")
	}
	
	createSensorInstanceObj,_ := createSensorInstanceRequestResult.Data. (model.SensorInstance)

	// --------------------------------------------------------------
	// Check SensorInstance Obj ID
	// --------------------------------------------------------------	
	if createSensorInstanceObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for SensorInstance" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getSensorInstanceRequestResult := dao.GetSensorInstance( uint64(createSensorInstanceObj.ID) )
	
	if getSensorInstanceRequestResult.Success == false {
		t.Errorf(getSensorInstanceRequestResult.Msg)
	} else {
		fmt.Println("Check Get SensorInstance success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getSensorInstanceObj,_ := getSensorInstanceRequestResult.Data. (model.SensorInstance)
	compareSensorInstance := cmp.Equal(createSensorInstanceObj.ID, getSensorInstanceObj.ID)
	
	if  compareSensorInstance == false	{
		t.Errorf( "Created SensorInstance object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllSensorInstanceRequestResult := dao.GetAllSensorInstance()

	if getAllSensorInstanceRequestResult.Success == false {
			t.Errorf(getAllSensorInstanceRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll SensorInstance success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllSensorInstanceObj []model.SensorInstance = getAllSensorInstanceRequestResult.Data. ([]model.SensorInstance)
		
	equalSensorInstance := cmp.Equal(createSensorInstanceObj.ID, getAllSensorInstanceObj[len(getAllSensorInstanceObj)-1].ID)
		
	if equalSensorInstance == false {
		t.Errorf( "Created object is not equal to the last entry in SensorInstance[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for SensorInstance
	// --------------------------------------------------------------	
	deleteSensorInstanceRequestResult := dao.DeleteSensorInstance(uint64(createSensorInstanceObj.ID))

	if deleteSensorInstanceRequestResult.Success == false {
			t.Errorf(deleteSensorInstanceRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion SensorInstance success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getSensorInstanceRequestResult = dao.GetSensorInstance( uint64(createSensorInstanceObj.ID) )
	
	if getSensorInstanceRequestResult.Success == true {
		t.Errorf(getSensorInstanceRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestActuatorInstanceCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for ActuatorInstance
	//----------------------------------------------------------------------------
	ActuatorInstanceObj := model.ActuatorInstance#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createActuatorInstanceRequestResult := dao.CreateActuatorInstance( ActuatorInstanceObj )
	
	if createActuatorInstanceRequestResult.Success == false {
		t.Errorf(createActuatorInstanceRequestResult.Msg)
	} else {
		fmt.Println("Check Create ActuatorInstance success...")
	}
	
	createActuatorInstanceObj,_ := createActuatorInstanceRequestResult.Data. (model.ActuatorInstance)

	// --------------------------------------------------------------
	// Check ActuatorInstance Obj ID
	// --------------------------------------------------------------	
	if createActuatorInstanceObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for ActuatorInstance" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getActuatorInstanceRequestResult := dao.GetActuatorInstance( uint64(createActuatorInstanceObj.ID) )
	
	if getActuatorInstanceRequestResult.Success == false {
		t.Errorf(getActuatorInstanceRequestResult.Msg)
	} else {
		fmt.Println("Check Get ActuatorInstance success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getActuatorInstanceObj,_ := getActuatorInstanceRequestResult.Data. (model.ActuatorInstance)
	compareActuatorInstance := cmp.Equal(createActuatorInstanceObj.ID, getActuatorInstanceObj.ID)
	
	if  compareActuatorInstance == false	{
		t.Errorf( "Created ActuatorInstance object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllActuatorInstanceRequestResult := dao.GetAllActuatorInstance()

	if getAllActuatorInstanceRequestResult.Success == false {
			t.Errorf(getAllActuatorInstanceRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll ActuatorInstance success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllActuatorInstanceObj []model.ActuatorInstance = getAllActuatorInstanceRequestResult.Data. ([]model.ActuatorInstance)
		
	equalActuatorInstance := cmp.Equal(createActuatorInstanceObj.ID, getAllActuatorInstanceObj[len(getAllActuatorInstanceObj)-1].ID)
		
	if equalActuatorInstance == false {
		t.Errorf( "Created object is not equal to the last entry in ActuatorInstance[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for ActuatorInstance
	// --------------------------------------------------------------	
	deleteActuatorInstanceRequestResult := dao.DeleteActuatorInstance(uint64(createActuatorInstanceObj.ID))

	if deleteActuatorInstanceRequestResult.Success == false {
			t.Errorf(deleteActuatorInstanceRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion ActuatorInstance success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getActuatorInstanceRequestResult = dao.GetActuatorInstance( uint64(createActuatorInstanceObj.ID) )
	
	if getActuatorInstanceRequestResult.Success == true {
		t.Errorf(getActuatorInstanceRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestTelemetrySchemaCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for TelemetrySchema
	//----------------------------------------------------------------------------
	TelemetrySchemaObj := model.TelemetrySchema#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createTelemetrySchemaRequestResult := dao.CreateTelemetrySchema( TelemetrySchemaObj )
	
	if createTelemetrySchemaRequestResult.Success == false {
		t.Errorf(createTelemetrySchemaRequestResult.Msg)
	} else {
		fmt.Println("Check Create TelemetrySchema success...")
	}
	
	createTelemetrySchemaObj,_ := createTelemetrySchemaRequestResult.Data. (model.TelemetrySchema)

	// --------------------------------------------------------------
	// Check TelemetrySchema Obj ID
	// --------------------------------------------------------------	
	if createTelemetrySchemaObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for TelemetrySchema" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getTelemetrySchemaRequestResult := dao.GetTelemetrySchema( uint64(createTelemetrySchemaObj.ID) )
	
	if getTelemetrySchemaRequestResult.Success == false {
		t.Errorf(getTelemetrySchemaRequestResult.Msg)
	} else {
		fmt.Println("Check Get TelemetrySchema success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getTelemetrySchemaObj,_ := getTelemetrySchemaRequestResult.Data. (model.TelemetrySchema)
	compareTelemetrySchema := cmp.Equal(createTelemetrySchemaObj.ID, getTelemetrySchemaObj.ID)
	
	if  compareTelemetrySchema == false	{
		t.Errorf( "Created TelemetrySchema object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllTelemetrySchemaRequestResult := dao.GetAllTelemetrySchema()

	if getAllTelemetrySchemaRequestResult.Success == false {
			t.Errorf(getAllTelemetrySchemaRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll TelemetrySchema success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllTelemetrySchemaObj []model.TelemetrySchema = getAllTelemetrySchemaRequestResult.Data. ([]model.TelemetrySchema)
		
	equalTelemetrySchema := cmp.Equal(createTelemetrySchemaObj.ID, getAllTelemetrySchemaObj[len(getAllTelemetrySchemaObj)-1].ID)
		
	if equalTelemetrySchema == false {
		t.Errorf( "Created object is not equal to the last entry in TelemetrySchema[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for TelemetrySchema
	// --------------------------------------------------------------	
	deleteTelemetrySchemaRequestResult := dao.DeleteTelemetrySchema(uint64(createTelemetrySchemaObj.ID))

	if deleteTelemetrySchemaRequestResult.Success == false {
			t.Errorf(deleteTelemetrySchemaRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion TelemetrySchema success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getTelemetrySchemaRequestResult = dao.GetTelemetrySchema( uint64(createTelemetrySchemaObj.ID) )
	
	if getTelemetrySchemaRequestResult.Success == true {
		t.Errorf(getTelemetrySchemaRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestTelemetryStreamCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for TelemetryStream
	//----------------------------------------------------------------------------
	TelemetryStreamObj := model.TelemetryStream#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createTelemetryStreamRequestResult := dao.CreateTelemetryStream( TelemetryStreamObj )
	
	if createTelemetryStreamRequestResult.Success == false {
		t.Errorf(createTelemetryStreamRequestResult.Msg)
	} else {
		fmt.Println("Check Create TelemetryStream success...")
	}
	
	createTelemetryStreamObj,_ := createTelemetryStreamRequestResult.Data. (model.TelemetryStream)

	// --------------------------------------------------------------
	// Check TelemetryStream Obj ID
	// --------------------------------------------------------------	
	if createTelemetryStreamObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for TelemetryStream" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getTelemetryStreamRequestResult := dao.GetTelemetryStream( uint64(createTelemetryStreamObj.ID) )
	
	if getTelemetryStreamRequestResult.Success == false {
		t.Errorf(getTelemetryStreamRequestResult.Msg)
	} else {
		fmt.Println("Check Get TelemetryStream success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getTelemetryStreamObj,_ := getTelemetryStreamRequestResult.Data. (model.TelemetryStream)
	compareTelemetryStream := cmp.Equal(createTelemetryStreamObj.ID, getTelemetryStreamObj.ID)
	
	if  compareTelemetryStream == false	{
		t.Errorf( "Created TelemetryStream object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllTelemetryStreamRequestResult := dao.GetAllTelemetryStream()

	if getAllTelemetryStreamRequestResult.Success == false {
			t.Errorf(getAllTelemetryStreamRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll TelemetryStream success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllTelemetryStreamObj []model.TelemetryStream = getAllTelemetryStreamRequestResult.Data. ([]model.TelemetryStream)
		
	equalTelemetryStream := cmp.Equal(createTelemetryStreamObj.ID, getAllTelemetryStreamObj[len(getAllTelemetryStreamObj)-1].ID)
		
	if equalTelemetryStream == false {
		t.Errorf( "Created object is not equal to the last entry in TelemetryStream[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for TelemetryStream
	// --------------------------------------------------------------	
	deleteTelemetryStreamRequestResult := dao.DeleteTelemetryStream(uint64(createTelemetryStreamObj.ID))

	if deleteTelemetryStreamRequestResult.Success == false {
			t.Errorf(deleteTelemetryStreamRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion TelemetryStream success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getTelemetryStreamRequestResult = dao.GetTelemetryStream( uint64(createTelemetryStreamObj.ID) )
	
	if getTelemetryStreamRequestResult.Success == true {
		t.Errorf(getTelemetryStreamRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestCommandDefinitionCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for CommandDefinition
	//----------------------------------------------------------------------------
	CommandDefinitionObj := model.CommandDefinition#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createCommandDefinitionRequestResult := dao.CreateCommandDefinition( CommandDefinitionObj )
	
	if createCommandDefinitionRequestResult.Success == false {
		t.Errorf(createCommandDefinitionRequestResult.Msg)
	} else {
		fmt.Println("Check Create CommandDefinition success...")
	}
	
	createCommandDefinitionObj,_ := createCommandDefinitionRequestResult.Data. (model.CommandDefinition)

	// --------------------------------------------------------------
	// Check CommandDefinition Obj ID
	// --------------------------------------------------------------	
	if createCommandDefinitionObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for CommandDefinition" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getCommandDefinitionRequestResult := dao.GetCommandDefinition( uint64(createCommandDefinitionObj.ID) )
	
	if getCommandDefinitionRequestResult.Success == false {
		t.Errorf(getCommandDefinitionRequestResult.Msg)
	} else {
		fmt.Println("Check Get CommandDefinition success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getCommandDefinitionObj,_ := getCommandDefinitionRequestResult.Data. (model.CommandDefinition)
	compareCommandDefinition := cmp.Equal(createCommandDefinitionObj.ID, getCommandDefinitionObj.ID)
	
	if  compareCommandDefinition == false	{
		t.Errorf( "Created CommandDefinition object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllCommandDefinitionRequestResult := dao.GetAllCommandDefinition()

	if getAllCommandDefinitionRequestResult.Success == false {
			t.Errorf(getAllCommandDefinitionRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll CommandDefinition success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllCommandDefinitionObj []model.CommandDefinition = getAllCommandDefinitionRequestResult.Data. ([]model.CommandDefinition)
		
	equalCommandDefinition := cmp.Equal(createCommandDefinitionObj.ID, getAllCommandDefinitionObj[len(getAllCommandDefinitionObj)-1].ID)
		
	if equalCommandDefinition == false {
		t.Errorf( "Created object is not equal to the last entry in CommandDefinition[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for CommandDefinition
	// --------------------------------------------------------------	
	deleteCommandDefinitionRequestResult := dao.DeleteCommandDefinition(uint64(createCommandDefinitionObj.ID))

	if deleteCommandDefinitionRequestResult.Success == false {
			t.Errorf(deleteCommandDefinitionRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion CommandDefinition success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getCommandDefinitionRequestResult = dao.GetCommandDefinition( uint64(createCommandDefinitionObj.ID) )
	
	if getCommandDefinitionRequestResult.Success == true {
		t.Errorf(getCommandDefinitionRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestCommandInvocationCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for CommandInvocation
	//----------------------------------------------------------------------------
	CommandInvocationObj := model.CommandInvocation#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createCommandInvocationRequestResult := dao.CreateCommandInvocation( CommandInvocationObj )
	
	if createCommandInvocationRequestResult.Success == false {
		t.Errorf(createCommandInvocationRequestResult.Msg)
	} else {
		fmt.Println("Check Create CommandInvocation success...")
	}
	
	createCommandInvocationObj,_ := createCommandInvocationRequestResult.Data. (model.CommandInvocation)

	// --------------------------------------------------------------
	// Check CommandInvocation Obj ID
	// --------------------------------------------------------------	
	if createCommandInvocationObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for CommandInvocation" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getCommandInvocationRequestResult := dao.GetCommandInvocation( uint64(createCommandInvocationObj.ID) )
	
	if getCommandInvocationRequestResult.Success == false {
		t.Errorf(getCommandInvocationRequestResult.Msg)
	} else {
		fmt.Println("Check Get CommandInvocation success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getCommandInvocationObj,_ := getCommandInvocationRequestResult.Data. (model.CommandInvocation)
	compareCommandInvocation := cmp.Equal(createCommandInvocationObj.ID, getCommandInvocationObj.ID)
	
	if  compareCommandInvocation == false	{
		t.Errorf( "Created CommandInvocation object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllCommandInvocationRequestResult := dao.GetAllCommandInvocation()

	if getAllCommandInvocationRequestResult.Success == false {
			t.Errorf(getAllCommandInvocationRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll CommandInvocation success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllCommandInvocationObj []model.CommandInvocation = getAllCommandInvocationRequestResult.Data. ([]model.CommandInvocation)
		
	equalCommandInvocation := cmp.Equal(createCommandInvocationObj.ID, getAllCommandInvocationObj[len(getAllCommandInvocationObj)-1].ID)
		
	if equalCommandInvocation == false {
		t.Errorf( "Created object is not equal to the last entry in CommandInvocation[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for CommandInvocation
	// --------------------------------------------------------------	
	deleteCommandInvocationRequestResult := dao.DeleteCommandInvocation(uint64(createCommandInvocationObj.ID))

	if deleteCommandInvocationRequestResult.Success == false {
			t.Errorf(deleteCommandInvocationRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion CommandInvocation success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getCommandInvocationRequestResult = dao.GetCommandInvocation( uint64(createCommandInvocationObj.ID) )
	
	if getCommandInvocationRequestResult.Success == true {
		t.Errorf(getCommandInvocationRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestAlertRuleCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for AlertRule
	//----------------------------------------------------------------------------
	AlertRuleObj := model.AlertRule#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createAlertRuleRequestResult := dao.CreateAlertRule( AlertRuleObj )
	
	if createAlertRuleRequestResult.Success == false {
		t.Errorf(createAlertRuleRequestResult.Msg)
	} else {
		fmt.Println("Check Create AlertRule success...")
	}
	
	createAlertRuleObj,_ := createAlertRuleRequestResult.Data. (model.AlertRule)

	// --------------------------------------------------------------
	// Check AlertRule Obj ID
	// --------------------------------------------------------------	
	if createAlertRuleObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for AlertRule" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getAlertRuleRequestResult := dao.GetAlertRule( uint64(createAlertRuleObj.ID) )
	
	if getAlertRuleRequestResult.Success == false {
		t.Errorf(getAlertRuleRequestResult.Msg)
	} else {
		fmt.Println("Check Get AlertRule success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getAlertRuleObj,_ := getAlertRuleRequestResult.Data. (model.AlertRule)
	compareAlertRule := cmp.Equal(createAlertRuleObj.ID, getAlertRuleObj.ID)
	
	if  compareAlertRule == false	{
		t.Errorf( "Created AlertRule object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllAlertRuleRequestResult := dao.GetAllAlertRule()

	if getAllAlertRuleRequestResult.Success == false {
			t.Errorf(getAllAlertRuleRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll AlertRule success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllAlertRuleObj []model.AlertRule = getAllAlertRuleRequestResult.Data. ([]model.AlertRule)
		
	equalAlertRule := cmp.Equal(createAlertRuleObj.ID, getAllAlertRuleObj[len(getAllAlertRuleObj)-1].ID)
		
	if equalAlertRule == false {
		t.Errorf( "Created object is not equal to the last entry in AlertRule[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for AlertRule
	// --------------------------------------------------------------	
	deleteAlertRuleRequestResult := dao.DeleteAlertRule(uint64(createAlertRuleObj.ID))

	if deleteAlertRuleRequestResult.Success == false {
			t.Errorf(deleteAlertRuleRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion AlertRule success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getAlertRuleRequestResult = dao.GetAlertRule( uint64(createAlertRuleObj.ID) )
	
	if getAlertRuleRequestResult.Success == true {
		t.Errorf(getAlertRuleRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestAlertCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Alert
	//----------------------------------------------------------------------------
	AlertObj := model.Alert#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createAlertRequestResult := dao.CreateAlert( AlertObj )
	
	if createAlertRequestResult.Success == false {
		t.Errorf(createAlertRequestResult.Msg)
	} else {
		fmt.Println("Check Create Alert success...")
	}
	
	createAlertObj,_ := createAlertRequestResult.Data. (model.Alert)

	// --------------------------------------------------------------
	// Check Alert Obj ID
	// --------------------------------------------------------------	
	if createAlertObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Alert" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getAlertRequestResult := dao.GetAlert( uint64(createAlertObj.ID) )
	
	if getAlertRequestResult.Success == false {
		t.Errorf(getAlertRequestResult.Msg)
	} else {
		fmt.Println("Check Get Alert success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getAlertObj,_ := getAlertRequestResult.Data. (model.Alert)
	compareAlert := cmp.Equal(createAlertObj.ID, getAlertObj.ID)
	
	if  compareAlert == false	{
		t.Errorf( "Created Alert object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllAlertRequestResult := dao.GetAllAlert()

	if getAllAlertRequestResult.Success == false {
			t.Errorf(getAllAlertRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Alert success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllAlertObj []model.Alert = getAllAlertRequestResult.Data. ([]model.Alert)
		
	equalAlert := cmp.Equal(createAlertObj.ID, getAllAlertObj[len(getAllAlertObj)-1].ID)
		
	if equalAlert == false {
		t.Errorf( "Created object is not equal to the last entry in Alert[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Alert
	// --------------------------------------------------------------	
	deleteAlertRequestResult := dao.DeleteAlert(uint64(createAlertObj.ID))

	if deleteAlertRequestResult.Success == false {
			t.Errorf(deleteAlertRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Alert success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getAlertRequestResult = dao.GetAlert( uint64(createAlertObj.ID) )
	
	if getAlertRequestResult.Success == true {
		t.Errorf(getAlertRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestTenantCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Tenant
	//----------------------------------------------------------------------------
	TenantObj := model.Tenant#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createTenantRequestResult := dao.CreateTenant( TenantObj )
	
	if createTenantRequestResult.Success == false {
		t.Errorf(createTenantRequestResult.Msg)
	} else {
		fmt.Println("Check Create Tenant success...")
	}
	
	createTenantObj,_ := createTenantRequestResult.Data. (model.Tenant)

	// --------------------------------------------------------------
	// Check Tenant Obj ID
	// --------------------------------------------------------------	
	if createTenantObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Tenant" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getTenantRequestResult := dao.GetTenant( uint64(createTenantObj.ID) )
	
	if getTenantRequestResult.Success == false {
		t.Errorf(getTenantRequestResult.Msg)
	} else {
		fmt.Println("Check Get Tenant success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getTenantObj,_ := getTenantRequestResult.Data. (model.Tenant)
	compareTenant := cmp.Equal(createTenantObj.ID, getTenantObj.ID)
	
	if  compareTenant == false	{
		t.Errorf( "Created Tenant object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllTenantRequestResult := dao.GetAllTenant()

	if getAllTenantRequestResult.Success == false {
			t.Errorf(getAllTenantRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Tenant success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllTenantObj []model.Tenant = getAllTenantRequestResult.Data. ([]model.Tenant)
		
	equalTenant := cmp.Equal(createTenantObj.ID, getAllTenantObj[len(getAllTenantObj)-1].ID)
		
	if equalTenant == false {
		t.Errorf( "Created object is not equal to the last entry in Tenant[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Tenant
	// --------------------------------------------------------------	
	deleteTenantRequestResult := dao.DeleteTenant(uint64(createTenantObj.ID))

	if deleteTenantRequestResult.Success == false {
			t.Errorf(deleteTenantRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Tenant success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getTenantRequestResult = dao.GetTenant( uint64(createTenantObj.ID) )
	
	if getTenantRequestResult.Success == true {
		t.Errorf(getTenantRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestTenantUserCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for TenantUser
	//----------------------------------------------------------------------------
	TenantUserObj := model.TenantUser#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createTenantUserRequestResult := dao.CreateTenantUser( TenantUserObj )
	
	if createTenantUserRequestResult.Success == false {
		t.Errorf(createTenantUserRequestResult.Msg)
	} else {
		fmt.Println("Check Create TenantUser success...")
	}
	
	createTenantUserObj,_ := createTenantUserRequestResult.Data. (model.TenantUser)

	// --------------------------------------------------------------
	// Check TenantUser Obj ID
	// --------------------------------------------------------------	
	if createTenantUserObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for TenantUser" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getTenantUserRequestResult := dao.GetTenantUser( uint64(createTenantUserObj.ID) )
	
	if getTenantUserRequestResult.Success == false {
		t.Errorf(getTenantUserRequestResult.Msg)
	} else {
		fmt.Println("Check Get TenantUser success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getTenantUserObj,_ := getTenantUserRequestResult.Data. (model.TenantUser)
	compareTenantUser := cmp.Equal(createTenantUserObj.ID, getTenantUserObj.ID)
	
	if  compareTenantUser == false	{
		t.Errorf( "Created TenantUser object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllTenantUserRequestResult := dao.GetAllTenantUser()

	if getAllTenantUserRequestResult.Success == false {
			t.Errorf(getAllTenantUserRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll TenantUser success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllTenantUserObj []model.TenantUser = getAllTenantUserRequestResult.Data. ([]model.TenantUser)
		
	equalTenantUser := cmp.Equal(createTenantUserObj.ID, getAllTenantUserObj[len(getAllTenantUserObj)-1].ID)
		
	if equalTenantUser == false {
		t.Errorf( "Created object is not equal to the last entry in TenantUser[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for TenantUser
	// --------------------------------------------------------------	
	deleteTenantUserRequestResult := dao.DeleteTenantUser(uint64(createTenantUserObj.ID))

	if deleteTenantUserRequestResult.Success == false {
			t.Errorf(deleteTenantUserRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion TenantUser success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getTenantUserRequestResult = dao.GetTenantUser( uint64(createTenantUserObj.ID) )
	
	if getTenantUserRequestResult.Success == true {
		t.Errorf(getTenantUserRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestSiteCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Site
	//----------------------------------------------------------------------------
	SiteObj := model.Site#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createSiteRequestResult := dao.CreateSite( SiteObj )
	
	if createSiteRequestResult.Success == false {
		t.Errorf(createSiteRequestResult.Msg)
	} else {
		fmt.Println("Check Create Site success...")
	}
	
	createSiteObj,_ := createSiteRequestResult.Data. (model.Site)

	// --------------------------------------------------------------
	// Check Site Obj ID
	// --------------------------------------------------------------	
	if createSiteObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Site" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getSiteRequestResult := dao.GetSite( uint64(createSiteObj.ID) )
	
	if getSiteRequestResult.Success == false {
		t.Errorf(getSiteRequestResult.Msg)
	} else {
		fmt.Println("Check Get Site success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getSiteObj,_ := getSiteRequestResult.Data. (model.Site)
	compareSite := cmp.Equal(createSiteObj.ID, getSiteObj.ID)
	
	if  compareSite == false	{
		t.Errorf( "Created Site object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllSiteRequestResult := dao.GetAllSite()

	if getAllSiteRequestResult.Success == false {
			t.Errorf(getAllSiteRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Site success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllSiteObj []model.Site = getAllSiteRequestResult.Data. ([]model.Site)
		
	equalSite := cmp.Equal(createSiteObj.ID, getAllSiteObj[len(getAllSiteObj)-1].ID)
		
	if equalSite == false {
		t.Errorf( "Created object is not equal to the last entry in Site[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Site
	// --------------------------------------------------------------	
	deleteSiteRequestResult := dao.DeleteSite(uint64(createSiteObj.ID))

	if deleteSiteRequestResult.Success == false {
			t.Errorf(deleteSiteRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Site success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getSiteRequestResult = dao.GetSite( uint64(createSiteObj.ID) )
	
	if getSiteRequestResult.Success == true {
		t.Errorf(getSiteRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestBuildingCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Building
	//----------------------------------------------------------------------------
	BuildingObj := model.Building#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createBuildingRequestResult := dao.CreateBuilding( BuildingObj )
	
	if createBuildingRequestResult.Success == false {
		t.Errorf(createBuildingRequestResult.Msg)
	} else {
		fmt.Println("Check Create Building success...")
	}
	
	createBuildingObj,_ := createBuildingRequestResult.Data. (model.Building)

	// --------------------------------------------------------------
	// Check Building Obj ID
	// --------------------------------------------------------------	
	if createBuildingObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Building" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getBuildingRequestResult := dao.GetBuilding( uint64(createBuildingObj.ID) )
	
	if getBuildingRequestResult.Success == false {
		t.Errorf(getBuildingRequestResult.Msg)
	} else {
		fmt.Println("Check Get Building success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getBuildingObj,_ := getBuildingRequestResult.Data. (model.Building)
	compareBuilding := cmp.Equal(createBuildingObj.ID, getBuildingObj.ID)
	
	if  compareBuilding == false	{
		t.Errorf( "Created Building object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllBuildingRequestResult := dao.GetAllBuilding()

	if getAllBuildingRequestResult.Success == false {
			t.Errorf(getAllBuildingRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Building success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllBuildingObj []model.Building = getAllBuildingRequestResult.Data. ([]model.Building)
		
	equalBuilding := cmp.Equal(createBuildingObj.ID, getAllBuildingObj[len(getAllBuildingObj)-1].ID)
		
	if equalBuilding == false {
		t.Errorf( "Created object is not equal to the last entry in Building[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Building
	// --------------------------------------------------------------	
	deleteBuildingRequestResult := dao.DeleteBuilding(uint64(createBuildingObj.ID))

	if deleteBuildingRequestResult.Success == false {
			t.Errorf(deleteBuildingRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Building success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getBuildingRequestResult = dao.GetBuilding( uint64(createBuildingObj.ID) )
	
	if getBuildingRequestResult.Success == true {
		t.Errorf(getBuildingRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestFloorCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Floor
	//----------------------------------------------------------------------------
	FloorObj := model.Floor#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createFloorRequestResult := dao.CreateFloor( FloorObj )
	
	if createFloorRequestResult.Success == false {
		t.Errorf(createFloorRequestResult.Msg)
	} else {
		fmt.Println("Check Create Floor success...")
	}
	
	createFloorObj,_ := createFloorRequestResult.Data. (model.Floor)

	// --------------------------------------------------------------
	// Check Floor Obj ID
	// --------------------------------------------------------------	
	if createFloorObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Floor" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getFloorRequestResult := dao.GetFloor( uint64(createFloorObj.ID) )
	
	if getFloorRequestResult.Success == false {
		t.Errorf(getFloorRequestResult.Msg)
	} else {
		fmt.Println("Check Get Floor success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getFloorObj,_ := getFloorRequestResult.Data. (model.Floor)
	compareFloor := cmp.Equal(createFloorObj.ID, getFloorObj.ID)
	
	if  compareFloor == false	{
		t.Errorf( "Created Floor object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllFloorRequestResult := dao.GetAllFloor()

	if getAllFloorRequestResult.Success == false {
			t.Errorf(getAllFloorRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Floor success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllFloorObj []model.Floor = getAllFloorRequestResult.Data. ([]model.Floor)
		
	equalFloor := cmp.Equal(createFloorObj.ID, getAllFloorObj[len(getAllFloorObj)-1].ID)
		
	if equalFloor == false {
		t.Errorf( "Created object is not equal to the last entry in Floor[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Floor
	// --------------------------------------------------------------	
	deleteFloorRequestResult := dao.DeleteFloor(uint64(createFloorObj.ID))

	if deleteFloorRequestResult.Success == false {
			t.Errorf(deleteFloorRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Floor success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getFloorRequestResult = dao.GetFloor( uint64(createFloorObj.ID) )
	
	if getFloorRequestResult.Success == true {
		t.Errorf(getFloorRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestRoomCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Room
	//----------------------------------------------------------------------------
	RoomObj := model.Room#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createRoomRequestResult := dao.CreateRoom( RoomObj )
	
	if createRoomRequestResult.Success == false {
		t.Errorf(createRoomRequestResult.Msg)
	} else {
		fmt.Println("Check Create Room success...")
	}
	
	createRoomObj,_ := createRoomRequestResult.Data. (model.Room)

	// --------------------------------------------------------------
	// Check Room Obj ID
	// --------------------------------------------------------------	
	if createRoomObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Room" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getRoomRequestResult := dao.GetRoom( uint64(createRoomObj.ID) )
	
	if getRoomRequestResult.Success == false {
		t.Errorf(getRoomRequestResult.Msg)
	} else {
		fmt.Println("Check Get Room success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getRoomObj,_ := getRoomRequestResult.Data. (model.Room)
	compareRoom := cmp.Equal(createRoomObj.ID, getRoomObj.ID)
	
	if  compareRoom == false	{
		t.Errorf( "Created Room object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllRoomRequestResult := dao.GetAllRoom()

	if getAllRoomRequestResult.Success == false {
			t.Errorf(getAllRoomRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Room success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllRoomObj []model.Room = getAllRoomRequestResult.Data. ([]model.Room)
		
	equalRoom := cmp.Equal(createRoomObj.ID, getAllRoomObj[len(getAllRoomObj)-1].ID)
		
	if equalRoom == false {
		t.Errorf( "Created object is not equal to the last entry in Room[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Room
	// --------------------------------------------------------------	
	deleteRoomRequestResult := dao.DeleteRoom(uint64(createRoomObj.ID))

	if deleteRoomRequestResult.Success == false {
			t.Errorf(deleteRoomRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Room success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getRoomRequestResult = dao.GetRoom( uint64(createRoomObj.ID) )
	
	if getRoomRequestResult.Success == true {
		t.Errorf(getRoomRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestGatewayCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for Gateway
	//----------------------------------------------------------------------------
	GatewayObj := model.Gateway#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createGatewayRequestResult := dao.CreateGateway( GatewayObj )
	
	if createGatewayRequestResult.Success == false {
		t.Errorf(createGatewayRequestResult.Msg)
	} else {
		fmt.Println("Check Create Gateway success...")
	}
	
	createGatewayObj,_ := createGatewayRequestResult.Data. (model.Gateway)

	// --------------------------------------------------------------
	// Check Gateway Obj ID
	// --------------------------------------------------------------	
	if createGatewayObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for Gateway" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getGatewayRequestResult := dao.GetGateway( uint64(createGatewayObj.ID) )
	
	if getGatewayRequestResult.Success == false {
		t.Errorf(getGatewayRequestResult.Msg)
	} else {
		fmt.Println("Check Get Gateway success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getGatewayObj,_ := getGatewayRequestResult.Data. (model.Gateway)
	compareGateway := cmp.Equal(createGatewayObj.ID, getGatewayObj.ID)
	
	if  compareGateway == false	{
		t.Errorf( "Created Gateway object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllGatewayRequestResult := dao.GetAllGateway()

	if getAllGatewayRequestResult.Success == false {
			t.Errorf(getAllGatewayRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll Gateway success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllGatewayObj []model.Gateway = getAllGatewayRequestResult.Data. ([]model.Gateway)
		
	equalGateway := cmp.Equal(createGatewayObj.ID, getAllGatewayObj[len(getAllGatewayObj)-1].ID)
		
	if equalGateway == false {
		t.Errorf( "Created object is not equal to the last entry in Gateway[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for Gateway
	// --------------------------------------------------------------	
	deleteGatewayRequestResult := dao.DeleteGateway(uint64(createGatewayObj.ID))

	if deleteGatewayRequestResult.Success == false {
			t.Errorf(deleteGatewayRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion Gateway success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getGatewayRequestResult = dao.GetGateway( uint64(createGatewayObj.ID) )
	
	if getGatewayRequestResult.Success == true {
		t.Errorf(getGatewayRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestEdgeApplicationCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for EdgeApplication
	//----------------------------------------------------------------------------
	EdgeApplicationObj := model.EdgeApplication#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createEdgeApplicationRequestResult := dao.CreateEdgeApplication( EdgeApplicationObj )
	
	if createEdgeApplicationRequestResult.Success == false {
		t.Errorf(createEdgeApplicationRequestResult.Msg)
	} else {
		fmt.Println("Check Create EdgeApplication success...")
	}
	
	createEdgeApplicationObj,_ := createEdgeApplicationRequestResult.Data. (model.EdgeApplication)

	// --------------------------------------------------------------
	// Check EdgeApplication Obj ID
	// --------------------------------------------------------------	
	if createEdgeApplicationObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for EdgeApplication" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getEdgeApplicationRequestResult := dao.GetEdgeApplication( uint64(createEdgeApplicationObj.ID) )
	
	if getEdgeApplicationRequestResult.Success == false {
		t.Errorf(getEdgeApplicationRequestResult.Msg)
	} else {
		fmt.Println("Check Get EdgeApplication success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getEdgeApplicationObj,_ := getEdgeApplicationRequestResult.Data. (model.EdgeApplication)
	compareEdgeApplication := cmp.Equal(createEdgeApplicationObj.ID, getEdgeApplicationObj.ID)
	
	if  compareEdgeApplication == false	{
		t.Errorf( "Created EdgeApplication object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllEdgeApplicationRequestResult := dao.GetAllEdgeApplication()

	if getAllEdgeApplicationRequestResult.Success == false {
			t.Errorf(getAllEdgeApplicationRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll EdgeApplication success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllEdgeApplicationObj []model.EdgeApplication = getAllEdgeApplicationRequestResult.Data. ([]model.EdgeApplication)
		
	equalEdgeApplication := cmp.Equal(createEdgeApplicationObj.ID, getAllEdgeApplicationObj[len(getAllEdgeApplicationObj)-1].ID)
		
	if equalEdgeApplication == false {
		t.Errorf( "Created object is not equal to the last entry in EdgeApplication[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for EdgeApplication
	// --------------------------------------------------------------	
	deleteEdgeApplicationRequestResult := dao.DeleteEdgeApplication(uint64(createEdgeApplicationObj.ID))

	if deleteEdgeApplicationRequestResult.Success == false {
			t.Errorf(deleteEdgeApplicationRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion EdgeApplication success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getEdgeApplicationRequestResult = dao.GetEdgeApplication( uint64(createEdgeApplicationObj.ID) )
	
	if getEdgeApplicationRequestResult.Success == true {
		t.Errorf(getEdgeApplicationRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestNetworkProfileCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for NetworkProfile
	//----------------------------------------------------------------------------
	NetworkProfileObj := model.NetworkProfile#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createNetworkProfileRequestResult := dao.CreateNetworkProfile( NetworkProfileObj )
	
	if createNetworkProfileRequestResult.Success == false {
		t.Errorf(createNetworkProfileRequestResult.Msg)
	} else {
		fmt.Println("Check Create NetworkProfile success...")
	}
	
	createNetworkProfileObj,_ := createNetworkProfileRequestResult.Data. (model.NetworkProfile)

	// --------------------------------------------------------------
	// Check NetworkProfile Obj ID
	// --------------------------------------------------------------	
	if createNetworkProfileObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for NetworkProfile" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getNetworkProfileRequestResult := dao.GetNetworkProfile( uint64(createNetworkProfileObj.ID) )
	
	if getNetworkProfileRequestResult.Success == false {
		t.Errorf(getNetworkProfileRequestResult.Msg)
	} else {
		fmt.Println("Check Get NetworkProfile success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getNetworkProfileObj,_ := getNetworkProfileRequestResult.Data. (model.NetworkProfile)
	compareNetworkProfile := cmp.Equal(createNetworkProfileObj.ID, getNetworkProfileObj.ID)
	
	if  compareNetworkProfile == false	{
		t.Errorf( "Created NetworkProfile object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllNetworkProfileRequestResult := dao.GetAllNetworkProfile()

	if getAllNetworkProfileRequestResult.Success == false {
			t.Errorf(getAllNetworkProfileRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll NetworkProfile success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllNetworkProfileObj []model.NetworkProfile = getAllNetworkProfileRequestResult.Data. ([]model.NetworkProfile)
		
	equalNetworkProfile := cmp.Equal(createNetworkProfileObj.ID, getAllNetworkProfileObj[len(getAllNetworkProfileObj)-1].ID)
		
	if equalNetworkProfile == false {
		t.Errorf( "Created object is not equal to the last entry in NetworkProfile[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for NetworkProfile
	// --------------------------------------------------------------	
	deleteNetworkProfileRequestResult := dao.DeleteNetworkProfile(uint64(createNetworkProfileObj.ID))

	if deleteNetworkProfileRequestResult.Success == false {
			t.Errorf(deleteNetworkProfileRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion NetworkProfile success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getNetworkProfileRequestResult = dao.GetNetworkProfile( uint64(createNetworkProfileObj.ID) )
	
	if getNetworkProfileRequestResult.Success == true {
		t.Errorf(getNetworkProfileRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestSimCardCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for SimCard
	//----------------------------------------------------------------------------
	SimCardObj := model.SimCard#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createSimCardRequestResult := dao.CreateSimCard( SimCardObj )
	
	if createSimCardRequestResult.Success == false {
		t.Errorf(createSimCardRequestResult.Msg)
	} else {
		fmt.Println("Check Create SimCard success...")
	}
	
	createSimCardObj,_ := createSimCardRequestResult.Data. (model.SimCard)

	// --------------------------------------------------------------
	// Check SimCard Obj ID
	// --------------------------------------------------------------	
	if createSimCardObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for SimCard" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getSimCardRequestResult := dao.GetSimCard( uint64(createSimCardObj.ID) )
	
	if getSimCardRequestResult.Success == false {
		t.Errorf(getSimCardRequestResult.Msg)
	} else {
		fmt.Println("Check Get SimCard success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getSimCardObj,_ := getSimCardRequestResult.Data. (model.SimCard)
	compareSimCard := cmp.Equal(createSimCardObj.ID, getSimCardObj.ID)
	
	if  compareSimCard == false	{
		t.Errorf( "Created SimCard object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllSimCardRequestResult := dao.GetAllSimCard()

	if getAllSimCardRequestResult.Success == false {
			t.Errorf(getAllSimCardRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll SimCard success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllSimCardObj []model.SimCard = getAllSimCardRequestResult.Data. ([]model.SimCard)
		
	equalSimCard := cmp.Equal(createSimCardObj.ID, getAllSimCardObj[len(getAllSimCardObj)-1].ID)
		
	if equalSimCard == false {
		t.Errorf( "Created object is not equal to the last entry in SimCard[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for SimCard
	// --------------------------------------------------------------	
	deleteSimCardRequestResult := dao.DeleteSimCard(uint64(createSimCardObj.ID))

	if deleteSimCardRequestResult.Success == false {
			t.Errorf(deleteSimCardRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion SimCard success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getSimCardRequestResult = dao.GetSimCard( uint64(createSimCardObj.ID) )
	
	if getSimCardRequestResult.Success == true {
		t.Errorf(getSimCardRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestConnectivityPlanCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for ConnectivityPlan
	//----------------------------------------------------------------------------
	ConnectivityPlanObj := model.ConnectivityPlan#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createConnectivityPlanRequestResult := dao.CreateConnectivityPlan( ConnectivityPlanObj )
	
	if createConnectivityPlanRequestResult.Success == false {
		t.Errorf(createConnectivityPlanRequestResult.Msg)
	} else {
		fmt.Println("Check Create ConnectivityPlan success...")
	}
	
	createConnectivityPlanObj,_ := createConnectivityPlanRequestResult.Data. (model.ConnectivityPlan)

	// --------------------------------------------------------------
	// Check ConnectivityPlan Obj ID
	// --------------------------------------------------------------	
	if createConnectivityPlanObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for ConnectivityPlan" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getConnectivityPlanRequestResult := dao.GetConnectivityPlan( uint64(createConnectivityPlanObj.ID) )
	
	if getConnectivityPlanRequestResult.Success == false {
		t.Errorf(getConnectivityPlanRequestResult.Msg)
	} else {
		fmt.Println("Check Get ConnectivityPlan success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getConnectivityPlanObj,_ := getConnectivityPlanRequestResult.Data. (model.ConnectivityPlan)
	compareConnectivityPlan := cmp.Equal(createConnectivityPlanObj.ID, getConnectivityPlanObj.ID)
	
	if  compareConnectivityPlan == false	{
		t.Errorf( "Created ConnectivityPlan object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllConnectivityPlanRequestResult := dao.GetAllConnectivityPlan()

	if getAllConnectivityPlanRequestResult.Success == false {
			t.Errorf(getAllConnectivityPlanRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll ConnectivityPlan success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllConnectivityPlanObj []model.ConnectivityPlan = getAllConnectivityPlanRequestResult.Data. ([]model.ConnectivityPlan)
		
	equalConnectivityPlan := cmp.Equal(createConnectivityPlanObj.ID, getAllConnectivityPlanObj[len(getAllConnectivityPlanObj)-1].ID)
		
	if equalConnectivityPlan == false {
		t.Errorf( "Created object is not equal to the last entry in ConnectivityPlan[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for ConnectivityPlan
	// --------------------------------------------------------------	
	deleteConnectivityPlanRequestResult := dao.DeleteConnectivityPlan(uint64(createConnectivityPlanObj.ID))

	if deleteConnectivityPlanRequestResult.Success == false {
			t.Errorf(deleteConnectivityPlanRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion ConnectivityPlan success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getConnectivityPlanRequestResult = dao.GetConnectivityPlan( uint64(createConnectivityPlanObj.ID) )
	
	if getConnectivityPlanRequestResult.Success == true {
		t.Errorf(getConnectivityPlanRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestMessagingEndpointCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for MessagingEndpoint
	//----------------------------------------------------------------------------
	MessagingEndpointObj := model.MessagingEndpoint#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createMessagingEndpointRequestResult := dao.CreateMessagingEndpoint( MessagingEndpointObj )
	
	if createMessagingEndpointRequestResult.Success == false {
		t.Errorf(createMessagingEndpointRequestResult.Msg)
	} else {
		fmt.Println("Check Create MessagingEndpoint success...")
	}
	
	createMessagingEndpointObj,_ := createMessagingEndpointRequestResult.Data. (model.MessagingEndpoint)

	// --------------------------------------------------------------
	// Check MessagingEndpoint Obj ID
	// --------------------------------------------------------------	
	if createMessagingEndpointObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for MessagingEndpoint" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getMessagingEndpointRequestResult := dao.GetMessagingEndpoint( uint64(createMessagingEndpointObj.ID) )
	
	if getMessagingEndpointRequestResult.Success == false {
		t.Errorf(getMessagingEndpointRequestResult.Msg)
	} else {
		fmt.Println("Check Get MessagingEndpoint success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getMessagingEndpointObj,_ := getMessagingEndpointRequestResult.Data. (model.MessagingEndpoint)
	compareMessagingEndpoint := cmp.Equal(createMessagingEndpointObj.ID, getMessagingEndpointObj.ID)
	
	if  compareMessagingEndpoint == false	{
		t.Errorf( "Created MessagingEndpoint object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllMessagingEndpointRequestResult := dao.GetAllMessagingEndpoint()

	if getAllMessagingEndpointRequestResult.Success == false {
			t.Errorf(getAllMessagingEndpointRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll MessagingEndpoint success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllMessagingEndpointObj []model.MessagingEndpoint = getAllMessagingEndpointRequestResult.Data. ([]model.MessagingEndpoint)
		
	equalMessagingEndpoint := cmp.Equal(createMessagingEndpointObj.ID, getAllMessagingEndpointObj[len(getAllMessagingEndpointObj)-1].ID)
		
	if equalMessagingEndpoint == false {
		t.Errorf( "Created object is not equal to the last entry in MessagingEndpoint[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for MessagingEndpoint
	// --------------------------------------------------------------	
	deleteMessagingEndpointRequestResult := dao.DeleteMessagingEndpoint(uint64(createMessagingEndpointObj.ID))

	if deleteMessagingEndpointRequestResult.Success == false {
			t.Errorf(deleteMessagingEndpointRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion MessagingEndpoint success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getMessagingEndpointRequestResult = dao.GetMessagingEndpoint( uint64(createMessagingEndpointObj.ID) )
	
	if getMessagingEndpointRequestResult.Success == true {
		t.Errorf(getMessagingEndpointRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestAccessPolicyCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for AccessPolicy
	//----------------------------------------------------------------------------
	AccessPolicyObj := model.AccessPolicy#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createAccessPolicyRequestResult := dao.CreateAccessPolicy( AccessPolicyObj )
	
	if createAccessPolicyRequestResult.Success == false {
		t.Errorf(createAccessPolicyRequestResult.Msg)
	} else {
		fmt.Println("Check Create AccessPolicy success...")
	}
	
	createAccessPolicyObj,_ := createAccessPolicyRequestResult.Data. (model.AccessPolicy)

	// --------------------------------------------------------------
	// Check AccessPolicy Obj ID
	// --------------------------------------------------------------	
	if createAccessPolicyObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for AccessPolicy" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getAccessPolicyRequestResult := dao.GetAccessPolicy( uint64(createAccessPolicyObj.ID) )
	
	if getAccessPolicyRequestResult.Success == false {
		t.Errorf(getAccessPolicyRequestResult.Msg)
	} else {
		fmt.Println("Check Get AccessPolicy success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getAccessPolicyObj,_ := getAccessPolicyRequestResult.Data. (model.AccessPolicy)
	compareAccessPolicy := cmp.Equal(createAccessPolicyObj.ID, getAccessPolicyObj.ID)
	
	if  compareAccessPolicy == false	{
		t.Errorf( "Created AccessPolicy object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllAccessPolicyRequestResult := dao.GetAllAccessPolicy()

	if getAllAccessPolicyRequestResult.Success == false {
			t.Errorf(getAllAccessPolicyRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll AccessPolicy success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllAccessPolicyObj []model.AccessPolicy = getAllAccessPolicyRequestResult.Data. ([]model.AccessPolicy)
		
	equalAccessPolicy := cmp.Equal(createAccessPolicyObj.ID, getAllAccessPolicyObj[len(getAllAccessPolicyObj)-1].ID)
		
	if equalAccessPolicy == false {
		t.Errorf( "Created object is not equal to the last entry in AccessPolicy[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for AccessPolicy
	// --------------------------------------------------------------	
	deleteAccessPolicyRequestResult := dao.DeleteAccessPolicy(uint64(createAccessPolicyObj.ID))

	if deleteAccessPolicyRequestResult.Success == false {
			t.Errorf(deleteAccessPolicyRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion AccessPolicy success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getAccessPolicyRequestResult = dao.GetAccessPolicy( uint64(createAccessPolicyObj.ID) )
	
	if getAccessPolicyRequestResult.Success == true {
		t.Errorf(getAccessPolicyRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestApiKeyCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for ApiKey
	//----------------------------------------------------------------------------
	ApiKeyObj := model.ApiKey#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createApiKeyRequestResult := dao.CreateApiKey( ApiKeyObj )
	
	if createApiKeyRequestResult.Success == false {
		t.Errorf(createApiKeyRequestResult.Msg)
	} else {
		fmt.Println("Check Create ApiKey success...")
	}
	
	createApiKeyObj,_ := createApiKeyRequestResult.Data. (model.ApiKey)

	// --------------------------------------------------------------
	// Check ApiKey Obj ID
	// --------------------------------------------------------------	
	if createApiKeyObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for ApiKey" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getApiKeyRequestResult := dao.GetApiKey( uint64(createApiKeyObj.ID) )
	
	if getApiKeyRequestResult.Success == false {
		t.Errorf(getApiKeyRequestResult.Msg)
	} else {
		fmt.Println("Check Get ApiKey success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getApiKeyObj,_ := getApiKeyRequestResult.Data. (model.ApiKey)
	compareApiKey := cmp.Equal(createApiKeyObj.ID, getApiKeyObj.ID)
	
	if  compareApiKey == false	{
		t.Errorf( "Created ApiKey object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllApiKeyRequestResult := dao.GetAllApiKey()

	if getAllApiKeyRequestResult.Success == false {
			t.Errorf(getAllApiKeyRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll ApiKey success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllApiKeyObj []model.ApiKey = getAllApiKeyRequestResult.Data. ([]model.ApiKey)
		
	equalApiKey := cmp.Equal(createApiKeyObj.ID, getAllApiKeyObj[len(getAllApiKeyObj)-1].ID)
		
	if equalApiKey == false {
		t.Errorf( "Created object is not equal to the last entry in ApiKey[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for ApiKey
	// --------------------------------------------------------------	
	deleteApiKeyRequestResult := dao.DeleteApiKey(uint64(createApiKeyObj.ID))

	if deleteApiKeyRequestResult.Success == false {
			t.Errorf(deleteApiKeyRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion ApiKey success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getApiKeyRequestResult = dao.GetApiKey( uint64(createApiKeyObj.ID) )
	
	if getApiKeyRequestResult.Success == true {
		t.Errorf(getApiKeyRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestDeviceCertificateCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for DeviceCertificate
	//----------------------------------------------------------------------------
	DeviceCertificateObj := model.DeviceCertificate#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createDeviceCertificateRequestResult := dao.CreateDeviceCertificate( DeviceCertificateObj )
	
	if createDeviceCertificateRequestResult.Success == false {
		t.Errorf(createDeviceCertificateRequestResult.Msg)
	} else {
		fmt.Println("Check Create DeviceCertificate success...")
	}
	
	createDeviceCertificateObj,_ := createDeviceCertificateRequestResult.Data. (model.DeviceCertificate)

	// --------------------------------------------------------------
	// Check DeviceCertificate Obj ID
	// --------------------------------------------------------------	
	if createDeviceCertificateObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for DeviceCertificate" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getDeviceCertificateRequestResult := dao.GetDeviceCertificate( uint64(createDeviceCertificateObj.ID) )
	
	if getDeviceCertificateRequestResult.Success == false {
		t.Errorf(getDeviceCertificateRequestResult.Msg)
	} else {
		fmt.Println("Check Get DeviceCertificate success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getDeviceCertificateObj,_ := getDeviceCertificateRequestResult.Data. (model.DeviceCertificate)
	compareDeviceCertificate := cmp.Equal(createDeviceCertificateObj.ID, getDeviceCertificateObj.ID)
	
	if  compareDeviceCertificate == false	{
		t.Errorf( "Created DeviceCertificate object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllDeviceCertificateRequestResult := dao.GetAllDeviceCertificate()

	if getAllDeviceCertificateRequestResult.Success == false {
			t.Errorf(getAllDeviceCertificateRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll DeviceCertificate success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllDeviceCertificateObj []model.DeviceCertificate = getAllDeviceCertificateRequestResult.Data. ([]model.DeviceCertificate)
		
	equalDeviceCertificate := cmp.Equal(createDeviceCertificateObj.ID, getAllDeviceCertificateObj[len(getAllDeviceCertificateObj)-1].ID)
		
	if equalDeviceCertificate == false {
		t.Errorf( "Created object is not equal to the last entry in DeviceCertificate[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for DeviceCertificate
	// --------------------------------------------------------------	
	deleteDeviceCertificateRequestResult := dao.DeleteDeviceCertificate(uint64(createDeviceCertificateObj.ID))

	if deleteDeviceCertificateRequestResult.Success == false {
			t.Errorf(deleteDeviceCertificateRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion DeviceCertificate success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getDeviceCertificateRequestResult = dao.GetDeviceCertificate( uint64(createDeviceCertificateObj.ID) )
	
	if getDeviceCertificateRequestResult.Success == true {
		t.Errorf(getDeviceCertificateRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestProvisioningRecordCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for ProvisioningRecord
	//----------------------------------------------------------------------------
	ProvisioningRecordObj := model.ProvisioningRecord#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createProvisioningRecordRequestResult := dao.CreateProvisioningRecord( ProvisioningRecordObj )
	
	if createProvisioningRecordRequestResult.Success == false {
		t.Errorf(createProvisioningRecordRequestResult.Msg)
	} else {
		fmt.Println("Check Create ProvisioningRecord success...")
	}
	
	createProvisioningRecordObj,_ := createProvisioningRecordRequestResult.Data. (model.ProvisioningRecord)

	// --------------------------------------------------------------
	// Check ProvisioningRecord Obj ID
	// --------------------------------------------------------------	
	if createProvisioningRecordObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for ProvisioningRecord" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getProvisioningRecordRequestResult := dao.GetProvisioningRecord( uint64(createProvisioningRecordObj.ID) )
	
	if getProvisioningRecordRequestResult.Success == false {
		t.Errorf(getProvisioningRecordRequestResult.Msg)
	} else {
		fmt.Println("Check Get ProvisioningRecord success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getProvisioningRecordObj,_ := getProvisioningRecordRequestResult.Data. (model.ProvisioningRecord)
	compareProvisioningRecord := cmp.Equal(createProvisioningRecordObj.ID, getProvisioningRecordObj.ID)
	
	if  compareProvisioningRecord == false	{
		t.Errorf( "Created ProvisioningRecord object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllProvisioningRecordRequestResult := dao.GetAllProvisioningRecord()

	if getAllProvisioningRecordRequestResult.Success == false {
			t.Errorf(getAllProvisioningRecordRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll ProvisioningRecord success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllProvisioningRecordObj []model.ProvisioningRecord = getAllProvisioningRecordRequestResult.Data. ([]model.ProvisioningRecord)
		
	equalProvisioningRecord := cmp.Equal(createProvisioningRecordObj.ID, getAllProvisioningRecordObj[len(getAllProvisioningRecordObj)-1].ID)
		
	if equalProvisioningRecord == false {
		t.Errorf( "Created object is not equal to the last entry in ProvisioningRecord[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for ProvisioningRecord
	// --------------------------------------------------------------	
	deleteProvisioningRecordRequestResult := dao.DeleteProvisioningRecord(uint64(createProvisioningRecordObj.ID))

	if deleteProvisioningRecordRequestResult.Success == false {
			t.Errorf(deleteProvisioningRecordRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion ProvisioningRecord success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getProvisioningRecordRequestResult = dao.GetProvisioningRecord( uint64(createProvisioningRecordObj.ID) )
	
	if getProvisioningRecordRequestResult.Success == true {
		t.Errorf(getProvisioningRecordRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestDigitalTwinCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for DigitalTwin
	//----------------------------------------------------------------------------
	DigitalTwinObj := model.DigitalTwin#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createDigitalTwinRequestResult := dao.CreateDigitalTwin( DigitalTwinObj )
	
	if createDigitalTwinRequestResult.Success == false {
		t.Errorf(createDigitalTwinRequestResult.Msg)
	} else {
		fmt.Println("Check Create DigitalTwin success...")
	}
	
	createDigitalTwinObj,_ := createDigitalTwinRequestResult.Data. (model.DigitalTwin)

	// --------------------------------------------------------------
	// Check DigitalTwin Obj ID
	// --------------------------------------------------------------	
	if createDigitalTwinObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for DigitalTwin" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getDigitalTwinRequestResult := dao.GetDigitalTwin( uint64(createDigitalTwinObj.ID) )
	
	if getDigitalTwinRequestResult.Success == false {
		t.Errorf(getDigitalTwinRequestResult.Msg)
	} else {
		fmt.Println("Check Get DigitalTwin success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getDigitalTwinObj,_ := getDigitalTwinRequestResult.Data. (model.DigitalTwin)
	compareDigitalTwin := cmp.Equal(createDigitalTwinObj.ID, getDigitalTwinObj.ID)
	
	if  compareDigitalTwin == false	{
		t.Errorf( "Created DigitalTwin object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllDigitalTwinRequestResult := dao.GetAllDigitalTwin()

	if getAllDigitalTwinRequestResult.Success == false {
			t.Errorf(getAllDigitalTwinRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll DigitalTwin success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllDigitalTwinObj []model.DigitalTwin = getAllDigitalTwinRequestResult.Data. ([]model.DigitalTwin)
		
	equalDigitalTwin := cmp.Equal(createDigitalTwinObj.ID, getAllDigitalTwinObj[len(getAllDigitalTwinObj)-1].ID)
		
	if equalDigitalTwin == false {
		t.Errorf( "Created object is not equal to the last entry in DigitalTwin[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for DigitalTwin
	// --------------------------------------------------------------	
	deleteDigitalTwinRequestResult := dao.DeleteDigitalTwin(uint64(createDigitalTwinObj.ID))

	if deleteDigitalTwinRequestResult.Success == false {
			t.Errorf(deleteDigitalTwinRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion DigitalTwin success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getDigitalTwinRequestResult = dao.GetDigitalTwin( uint64(createDigitalTwinObj.ID) )
	
	if getDigitalTwinRequestResult.Success == true {
		t.Errorf(getDigitalTwinRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestTwinTemplateCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for TwinTemplate
	//----------------------------------------------------------------------------
	TwinTemplateObj := model.TwinTemplate#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createTwinTemplateRequestResult := dao.CreateTwinTemplate( TwinTemplateObj )
	
	if createTwinTemplateRequestResult.Success == false {
		t.Errorf(createTwinTemplateRequestResult.Msg)
	} else {
		fmt.Println("Check Create TwinTemplate success...")
	}
	
	createTwinTemplateObj,_ := createTwinTemplateRequestResult.Data. (model.TwinTemplate)

	// --------------------------------------------------------------
	// Check TwinTemplate Obj ID
	// --------------------------------------------------------------	
	if createTwinTemplateObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for TwinTemplate" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getTwinTemplateRequestResult := dao.GetTwinTemplate( uint64(createTwinTemplateObj.ID) )
	
	if getTwinTemplateRequestResult.Success == false {
		t.Errorf(getTwinTemplateRequestResult.Msg)
	} else {
		fmt.Println("Check Get TwinTemplate success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getTwinTemplateObj,_ := getTwinTemplateRequestResult.Data. (model.TwinTemplate)
	compareTwinTemplate := cmp.Equal(createTwinTemplateObj.ID, getTwinTemplateObj.ID)
	
	if  compareTwinTemplate == false	{
		t.Errorf( "Created TwinTemplate object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllTwinTemplateRequestResult := dao.GetAllTwinTemplate()

	if getAllTwinTemplateRequestResult.Success == false {
			t.Errorf(getAllTwinTemplateRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll TwinTemplate success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllTwinTemplateObj []model.TwinTemplate = getAllTwinTemplateRequestResult.Data. ([]model.TwinTemplate)
		
	equalTwinTemplate := cmp.Equal(createTwinTemplateObj.ID, getAllTwinTemplateObj[len(getAllTwinTemplateObj)-1].ID)
		
	if equalTwinTemplate == false {
		t.Errorf( "Created object is not equal to the last entry in TwinTemplate[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for TwinTemplate
	// --------------------------------------------------------------	
	deleteTwinTemplateRequestResult := dao.DeleteTwinTemplate(uint64(createTwinTemplateObj.ID))

	if deleteTwinTemplateRequestResult.Success == false {
			t.Errorf(deleteTwinTemplateRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion TwinTemplate success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getTwinTemplateRequestResult = dao.GetTwinTemplate( uint64(createTwinTemplateObj.ID) )
	
	if getTwinTemplateRequestResult.Success == true {
		t.Errorf(getTwinTemplateRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestTwinChangeEventCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for TwinChangeEvent
	//----------------------------------------------------------------------------
	TwinChangeEventObj := model.TwinChangeEvent#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createTwinChangeEventRequestResult := dao.CreateTwinChangeEvent( TwinChangeEventObj )
	
	if createTwinChangeEventRequestResult.Success == false {
		t.Errorf(createTwinChangeEventRequestResult.Msg)
	} else {
		fmt.Println("Check Create TwinChangeEvent success...")
	}
	
	createTwinChangeEventObj,_ := createTwinChangeEventRequestResult.Data. (model.TwinChangeEvent)

	// --------------------------------------------------------------
	// Check TwinChangeEvent Obj ID
	// --------------------------------------------------------------	
	if createTwinChangeEventObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for TwinChangeEvent" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getTwinChangeEventRequestResult := dao.GetTwinChangeEvent( uint64(createTwinChangeEventObj.ID) )
	
	if getTwinChangeEventRequestResult.Success == false {
		t.Errorf(getTwinChangeEventRequestResult.Msg)
	} else {
		fmt.Println("Check Get TwinChangeEvent success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getTwinChangeEventObj,_ := getTwinChangeEventRequestResult.Data. (model.TwinChangeEvent)
	compareTwinChangeEvent := cmp.Equal(createTwinChangeEventObj.ID, getTwinChangeEventObj.ID)
	
	if  compareTwinChangeEvent == false	{
		t.Errorf( "Created TwinChangeEvent object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllTwinChangeEventRequestResult := dao.GetAllTwinChangeEvent()

	if getAllTwinChangeEventRequestResult.Success == false {
			t.Errorf(getAllTwinChangeEventRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll TwinChangeEvent success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllTwinChangeEventObj []model.TwinChangeEvent = getAllTwinChangeEventRequestResult.Data. ([]model.TwinChangeEvent)
		
	equalTwinChangeEvent := cmp.Equal(createTwinChangeEventObj.ID, getAllTwinChangeEventObj[len(getAllTwinChangeEventObj)-1].ID)
		
	if equalTwinChangeEvent == false {
		t.Errorf( "Created object is not equal to the last entry in TwinChangeEvent[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for TwinChangeEvent
	// --------------------------------------------------------------	
	deleteTwinChangeEventRequestResult := dao.DeleteTwinChangeEvent(uint64(createTwinChangeEventObj.ID))

	if deleteTwinChangeEventRequestResult.Success == false {
			t.Errorf(deleteTwinChangeEventRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion TwinChangeEvent success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getTwinChangeEventRequestResult = dao.GetTwinChangeEvent( uint64(createTwinChangeEventObj.ID) )
	
	if getTwinChangeEventRequestResult.Success == true {
		t.Errorf(getTwinChangeEventRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestMaintenanceTicketCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for MaintenanceTicket
	//----------------------------------------------------------------------------
	MaintenanceTicketObj := model.MaintenanceTicket#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createMaintenanceTicketRequestResult := dao.CreateMaintenanceTicket( MaintenanceTicketObj )
	
	if createMaintenanceTicketRequestResult.Success == false {
		t.Errorf(createMaintenanceTicketRequestResult.Msg)
	} else {
		fmt.Println("Check Create MaintenanceTicket success...")
	}
	
	createMaintenanceTicketObj,_ := createMaintenanceTicketRequestResult.Data. (model.MaintenanceTicket)

	// --------------------------------------------------------------
	// Check MaintenanceTicket Obj ID
	// --------------------------------------------------------------	
	if createMaintenanceTicketObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for MaintenanceTicket" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getMaintenanceTicketRequestResult := dao.GetMaintenanceTicket( uint64(createMaintenanceTicketObj.ID) )
	
	if getMaintenanceTicketRequestResult.Success == false {
		t.Errorf(getMaintenanceTicketRequestResult.Msg)
	} else {
		fmt.Println("Check Get MaintenanceTicket success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getMaintenanceTicketObj,_ := getMaintenanceTicketRequestResult.Data. (model.MaintenanceTicket)
	compareMaintenanceTicket := cmp.Equal(createMaintenanceTicketObj.ID, getMaintenanceTicketObj.ID)
	
	if  compareMaintenanceTicket == false	{
		t.Errorf( "Created MaintenanceTicket object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllMaintenanceTicketRequestResult := dao.GetAllMaintenanceTicket()

	if getAllMaintenanceTicketRequestResult.Success == false {
			t.Errorf(getAllMaintenanceTicketRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll MaintenanceTicket success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllMaintenanceTicketObj []model.MaintenanceTicket = getAllMaintenanceTicketRequestResult.Data. ([]model.MaintenanceTicket)
		
	equalMaintenanceTicket := cmp.Equal(createMaintenanceTicketObj.ID, getAllMaintenanceTicketObj[len(getAllMaintenanceTicketObj)-1].ID)
		
	if equalMaintenanceTicket == false {
		t.Errorf( "Created object is not equal to the last entry in MaintenanceTicket[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for MaintenanceTicket
	// --------------------------------------------------------------	
	deleteMaintenanceTicketRequestResult := dao.DeleteMaintenanceTicket(uint64(createMaintenanceTicketObj.ID))

	if deleteMaintenanceTicketRequestResult.Success == false {
			t.Errorf(deleteMaintenanceTicketRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion MaintenanceTicket success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getMaintenanceTicketRequestResult = dao.GetMaintenanceTicket( uint64(createMaintenanceTicketObj.ID) )
	
	if getMaintenanceTicketRequestResult.Success == true {
		t.Errorf(getMaintenanceTicketRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestDataRetentionPolicyCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for DataRetentionPolicy
	//----------------------------------------------------------------------------
	DataRetentionPolicyObj := model.DataRetentionPolicy#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createDataRetentionPolicyRequestResult := dao.CreateDataRetentionPolicy( DataRetentionPolicyObj )
	
	if createDataRetentionPolicyRequestResult.Success == false {
		t.Errorf(createDataRetentionPolicyRequestResult.Msg)
	} else {
		fmt.Println("Check Create DataRetentionPolicy success...")
	}
	
	createDataRetentionPolicyObj,_ := createDataRetentionPolicyRequestResult.Data. (model.DataRetentionPolicy)

	// --------------------------------------------------------------
	// Check DataRetentionPolicy Obj ID
	// --------------------------------------------------------------	
	if createDataRetentionPolicyObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for DataRetentionPolicy" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getDataRetentionPolicyRequestResult := dao.GetDataRetentionPolicy( uint64(createDataRetentionPolicyObj.ID) )
	
	if getDataRetentionPolicyRequestResult.Success == false {
		t.Errorf(getDataRetentionPolicyRequestResult.Msg)
	} else {
		fmt.Println("Check Get DataRetentionPolicy success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getDataRetentionPolicyObj,_ := getDataRetentionPolicyRequestResult.Data. (model.DataRetentionPolicy)
	compareDataRetentionPolicy := cmp.Equal(createDataRetentionPolicyObj.ID, getDataRetentionPolicyObj.ID)
	
	if  compareDataRetentionPolicy == false	{
		t.Errorf( "Created DataRetentionPolicy object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllDataRetentionPolicyRequestResult := dao.GetAllDataRetentionPolicy()

	if getAllDataRetentionPolicyRequestResult.Success == false {
			t.Errorf(getAllDataRetentionPolicyRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll DataRetentionPolicy success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllDataRetentionPolicyObj []model.DataRetentionPolicy = getAllDataRetentionPolicyRequestResult.Data. ([]model.DataRetentionPolicy)
		
	equalDataRetentionPolicy := cmp.Equal(createDataRetentionPolicyObj.ID, getAllDataRetentionPolicyObj[len(getAllDataRetentionPolicyObj)-1].ID)
		
	if equalDataRetentionPolicy == false {
		t.Errorf( "Created object is not equal to the last entry in DataRetentionPolicy[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for DataRetentionPolicy
	// --------------------------------------------------------------	
	deleteDataRetentionPolicyRequestResult := dao.DeleteDataRetentionPolicy(uint64(createDataRetentionPolicyObj.ID))

	if deleteDataRetentionPolicyRequestResult.Success == false {
			t.Errorf(deleteDataRetentionPolicyRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion DataRetentionPolicy success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getDataRetentionPolicyRequestResult = dao.GetDataRetentionPolicy( uint64(createDataRetentionPolicyObj.ID) )
	
	if getDataRetentionPolicyRequestResult.Success == true {
		t.Errorf(getDataRetentionPolicyRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestSoftwareUpdateCampaignCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for SoftwareUpdateCampaign
	//----------------------------------------------------------------------------
	SoftwareUpdateCampaignObj := model.SoftwareUpdateCampaign#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createSoftwareUpdateCampaignRequestResult := dao.CreateSoftwareUpdateCampaign( SoftwareUpdateCampaignObj )
	
	if createSoftwareUpdateCampaignRequestResult.Success == false {
		t.Errorf(createSoftwareUpdateCampaignRequestResult.Msg)
	} else {
		fmt.Println("Check Create SoftwareUpdateCampaign success...")
	}
	
	createSoftwareUpdateCampaignObj,_ := createSoftwareUpdateCampaignRequestResult.Data. (model.SoftwareUpdateCampaign)

	// --------------------------------------------------------------
	// Check SoftwareUpdateCampaign Obj ID
	// --------------------------------------------------------------	
	if createSoftwareUpdateCampaignObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for SoftwareUpdateCampaign" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getSoftwareUpdateCampaignRequestResult := dao.GetSoftwareUpdateCampaign( uint64(createSoftwareUpdateCampaignObj.ID) )
	
	if getSoftwareUpdateCampaignRequestResult.Success == false {
		t.Errorf(getSoftwareUpdateCampaignRequestResult.Msg)
	} else {
		fmt.Println("Check Get SoftwareUpdateCampaign success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getSoftwareUpdateCampaignObj,_ := getSoftwareUpdateCampaignRequestResult.Data. (model.SoftwareUpdateCampaign)
	compareSoftwareUpdateCampaign := cmp.Equal(createSoftwareUpdateCampaignObj.ID, getSoftwareUpdateCampaignObj.ID)
	
	if  compareSoftwareUpdateCampaign == false	{
		t.Errorf( "Created SoftwareUpdateCampaign object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllSoftwareUpdateCampaignRequestResult := dao.GetAllSoftwareUpdateCampaign()

	if getAllSoftwareUpdateCampaignRequestResult.Success == false {
			t.Errorf(getAllSoftwareUpdateCampaignRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll SoftwareUpdateCampaign success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllSoftwareUpdateCampaignObj []model.SoftwareUpdateCampaign = getAllSoftwareUpdateCampaignRequestResult.Data. ([]model.SoftwareUpdateCampaign)
		
	equalSoftwareUpdateCampaign := cmp.Equal(createSoftwareUpdateCampaignObj.ID, getAllSoftwareUpdateCampaignObj[len(getAllSoftwareUpdateCampaignObj)-1].ID)
		
	if equalSoftwareUpdateCampaign == false {
		t.Errorf( "Created object is not equal to the last entry in SoftwareUpdateCampaign[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for SoftwareUpdateCampaign
	// --------------------------------------------------------------	
	deleteSoftwareUpdateCampaignRequestResult := dao.DeleteSoftwareUpdateCampaign(uint64(createSoftwareUpdateCampaignObj.ID))

	if deleteSoftwareUpdateCampaignRequestResult.Success == false {
			t.Errorf(deleteSoftwareUpdateCampaignRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion SoftwareUpdateCampaign success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getSoftwareUpdateCampaignRequestResult = dao.GetSoftwareUpdateCampaign( uint64(createSoftwareUpdateCampaignObj.ID) )
	
	if getSoftwareUpdateCampaignRequestResult.Success == true {
		t.Errorf(getSoftwareUpdateCampaignRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestSoftwareUpdateExecutionCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for SoftwareUpdateExecution
	//----------------------------------------------------------------------------
	SoftwareUpdateExecutionObj := model.SoftwareUpdateExecution#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createSoftwareUpdateExecutionRequestResult := dao.CreateSoftwareUpdateExecution( SoftwareUpdateExecutionObj )
	
	if createSoftwareUpdateExecutionRequestResult.Success == false {
		t.Errorf(createSoftwareUpdateExecutionRequestResult.Msg)
	} else {
		fmt.Println("Check Create SoftwareUpdateExecution success...")
	}
	
	createSoftwareUpdateExecutionObj,_ := createSoftwareUpdateExecutionRequestResult.Data. (model.SoftwareUpdateExecution)

	// --------------------------------------------------------------
	// Check SoftwareUpdateExecution Obj ID
	// --------------------------------------------------------------	
	if createSoftwareUpdateExecutionObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for SoftwareUpdateExecution" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getSoftwareUpdateExecutionRequestResult := dao.GetSoftwareUpdateExecution( uint64(createSoftwareUpdateExecutionObj.ID) )
	
	if getSoftwareUpdateExecutionRequestResult.Success == false {
		t.Errorf(getSoftwareUpdateExecutionRequestResult.Msg)
	} else {
		fmt.Println("Check Get SoftwareUpdateExecution success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getSoftwareUpdateExecutionObj,_ := getSoftwareUpdateExecutionRequestResult.Data. (model.SoftwareUpdateExecution)
	compareSoftwareUpdateExecution := cmp.Equal(createSoftwareUpdateExecutionObj.ID, getSoftwareUpdateExecutionObj.ID)
	
	if  compareSoftwareUpdateExecution == false	{
		t.Errorf( "Created SoftwareUpdateExecution object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllSoftwareUpdateExecutionRequestResult := dao.GetAllSoftwareUpdateExecution()

	if getAllSoftwareUpdateExecutionRequestResult.Success == false {
			t.Errorf(getAllSoftwareUpdateExecutionRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll SoftwareUpdateExecution success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllSoftwareUpdateExecutionObj []model.SoftwareUpdateExecution = getAllSoftwareUpdateExecutionRequestResult.Data. ([]model.SoftwareUpdateExecution)
		
	equalSoftwareUpdateExecution := cmp.Equal(createSoftwareUpdateExecutionObj.ID, getAllSoftwareUpdateExecutionObj[len(getAllSoftwareUpdateExecutionObj)-1].ID)
		
	if equalSoftwareUpdateExecution == false {
		t.Errorf( "Created object is not equal to the last entry in SoftwareUpdateExecution[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for SoftwareUpdateExecution
	// --------------------------------------------------------------	
	deleteSoftwareUpdateExecutionRequestResult := dao.DeleteSoftwareUpdateExecution(uint64(createSoftwareUpdateExecutionObj.ID))

	if deleteSoftwareUpdateExecutionRequestResult.Success == false {
			t.Errorf(deleteSoftwareUpdateExecutionRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion SoftwareUpdateExecution success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getSoftwareUpdateExecutionRequestResult = dao.GetSoftwareUpdateExecution( uint64(createSoftwareUpdateExecutionObj.ID) )
	
	if getSoftwareUpdateExecutionRequestResult.Success == true {
		t.Errorf(getSoftwareUpdateExecutionRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestDeviceGroupCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for DeviceGroup
	//----------------------------------------------------------------------------
	DeviceGroupObj := model.DeviceGroup#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createDeviceGroupRequestResult := dao.CreateDeviceGroup( DeviceGroupObj )
	
	if createDeviceGroupRequestResult.Success == false {
		t.Errorf(createDeviceGroupRequestResult.Msg)
	} else {
		fmt.Println("Check Create DeviceGroup success...")
	}
	
	createDeviceGroupObj,_ := createDeviceGroupRequestResult.Data. (model.DeviceGroup)

	// --------------------------------------------------------------
	// Check DeviceGroup Obj ID
	// --------------------------------------------------------------	
	if createDeviceGroupObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for DeviceGroup" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getDeviceGroupRequestResult := dao.GetDeviceGroup( uint64(createDeviceGroupObj.ID) )
	
	if getDeviceGroupRequestResult.Success == false {
		t.Errorf(getDeviceGroupRequestResult.Msg)
	} else {
		fmt.Println("Check Get DeviceGroup success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getDeviceGroupObj,_ := getDeviceGroupRequestResult.Data. (model.DeviceGroup)
	compareDeviceGroup := cmp.Equal(createDeviceGroupObj.ID, getDeviceGroupObj.ID)
	
	if  compareDeviceGroup == false	{
		t.Errorf( "Created DeviceGroup object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllDeviceGroupRequestResult := dao.GetAllDeviceGroup()

	if getAllDeviceGroupRequestResult.Success == false {
			t.Errorf(getAllDeviceGroupRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll DeviceGroup success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllDeviceGroupObj []model.DeviceGroup = getAllDeviceGroupRequestResult.Data. ([]model.DeviceGroup)
		
	equalDeviceGroup := cmp.Equal(createDeviceGroupObj.ID, getAllDeviceGroupObj[len(getAllDeviceGroupObj)-1].ID)
		
	if equalDeviceGroup == false {
		t.Errorf( "Created object is not equal to the last entry in DeviceGroup[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for DeviceGroup
	// --------------------------------------------------------------	
	deleteDeviceGroupRequestResult := dao.DeleteDeviceGroup(uint64(createDeviceGroupObj.ID))

	if deleteDeviceGroupRequestResult.Success == false {
			t.Errorf(deleteDeviceGroupRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion DeviceGroup success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getDeviceGroupRequestResult = dao.GetDeviceGroup( uint64(createDeviceGroupObj.ID) )
	
	if getDeviceGroupRequestResult.Success == true {
		t.Errorf(getDeviceGroupRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}


func TestUsageRecordCRUD(t *testing.T) {

	//----------------------------------------------------------------------------
	// Test CRUD for UsageRecord
	//----------------------------------------------------------------------------
	UsageRecordObj := model.UsageRecord#defaultTestStructOutput(${class})

	// --------------------------------------------------------------
	// Check Create
	// --------------------------------------------------------------
	createUsageRecordRequestResult := dao.CreateUsageRecord( UsageRecordObj )
	
	if createUsageRecordRequestResult.Success == false {
		t.Errorf(createUsageRecordRequestResult.Msg)
	} else {
		fmt.Println("Check Create UsageRecord success...")
	}
	
	createUsageRecordObj,_ := createUsageRecordRequestResult.Data. (model.UsageRecord)

	// --------------------------------------------------------------
	// Check UsageRecord Obj ID
	// --------------------------------------------------------------	
	if createUsageRecordObj.ID == 0 {
	    t.Errorf( "The ORM failed to assign and ID for UsageRecord" )
	}	

	// --------------------------------------------------------------
	// Check Get
	// --------------------------------------------------------------	
	getUsageRecordRequestResult := dao.GetUsageRecord( uint64(createUsageRecordObj.ID) )
	
	if getUsageRecordRequestResult.Success == false {
		t.Errorf(getUsageRecordRequestResult.Msg)
	} else {
		fmt.Println("Check Get UsageRecord success...")
	}
	
	// --------------------------------------------------------------
	// Check returned struct from Get equals original created obj
	// --------------------------------------------------------------	
	getUsageRecordObj,_ := getUsageRecordRequestResult.Data. (model.UsageRecord)
	compareUsageRecord := cmp.Equal(createUsageRecordObj.ID, getUsageRecordObj.ID)
	
	if  compareUsageRecord == false	{
		t.Errorf( "Created UsageRecord object is not equal to read object." )
	}
	
	// --------------------------------------------------------------
	// Check GetAll
	// --------------------------------------------------------------	
	getAllUsageRecordRequestResult := dao.GetAllUsageRecord()

	if getAllUsageRecordRequestResult.Success == false {
			t.Errorf(getAllUsageRecordRequestResult.Msg)
	} else {
		fmt.Println("Check GetAll UsageRecord success...")
	}
	
	// --------------------------------------------------------------
	// Check GetAll returns an array with zero index equal 
	// to initially created object
	// --------------------------------------------------------------		
	var getAllUsageRecordObj []model.UsageRecord = getAllUsageRecordRequestResult.Data. ([]model.UsageRecord)
		
	equalUsageRecord := cmp.Equal(createUsageRecordObj.ID, getAllUsageRecordObj[len(getAllUsageRecordObj)-1].ID)
		
	if equalUsageRecord == false {
		t.Errorf( "Created object is not equal to the last entry in UsageRecord[] returned by GetAll" )
    }
    
	// --------------------------------------------------------------
	// Check deletion for UsageRecord
	// --------------------------------------------------------------	
	deleteUsageRecordRequestResult := dao.DeleteUsageRecord(uint64(createUsageRecordObj.ID))

	if deleteUsageRecordRequestResult.Success == false {
			t.Errorf(deleteUsageRecordRequestResult.Msg)
	} else {
		fmt.Println("Check Deletion UsageRecord success...")
	}


	// --------------------------------------------------------------
	// Check deletion causes Get to fail
	// --------------------------------------------------------------		
	getUsageRecordRequestResult = dao.GetUsageRecord( uint64(createUsageRecordObj.ID) )
	
	if getUsageRecordRequestResult.Success == true {
		t.Errorf(getUsageRecordRequestResult.Msg)
	} else {
		fmt.Println("Validate deletion success...")
	}	
	
}

