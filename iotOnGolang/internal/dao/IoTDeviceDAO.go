package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing IoTDeviceDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateIoTDevice - creates a new db entry
//----------------------------------------------------------------------------
func CreateIoTDevice(obj model.IoTDevice)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var createMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	result := utils.GetDB().Create(&obj).Error

	if result == nil {
	    createMsg = fmt.Sprintf( "Created a IoTDevice with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a IoTDevice", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateIoTDevice", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetIoTDevice - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetIoTDevice(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.IoTDevice

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a IoTDevice with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a IoTDevice using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a IoTDevice using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetIoTDevice", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllIoTDevice - returns all
//----------------------------------------------------------------------------
func GetAllIoTDevice()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.IoTDevice

	//----------------------------------------------------------------------------
	// Request the ORM to find all IoTDevice
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all IoTDevice" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all IoTDevice", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllIoTDevice", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateIoTDevice - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateIoTDevice(obj model.IoTDevice)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var updateMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to save
	//----------------------------------------------------------------------------
	result := utils.GetDB().Save(&obj).Error

	if result == nil {
	    updateMsg = fmt.Sprintf( "Updated a IoTDevice using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a IoTDevice using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateIoTDevice", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteIoTDevice - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteIoTDevice(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetIoTDevice(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.IoTDevice)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a IoTDevice using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a IoTDevice using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteIoTDevice", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a DeviceModel on a IoTDevice
//----------------------------------------------------------------------------
func AssignDeviceModelToIoTDevice( ioTDeviceId uint64, deviceModelId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.DeviceModel

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a DeviceModel with a
		// matching deviceModelId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, deviceModelId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the DeviceModel	to the IoTDevice
			//----------------------------------------------------------------------------
			parentObj.DeviceModel = &childObj

			//----------------------------------------------------------------------------
			// save the IoTDevice
			//----------------------------------------------------------------------------
			return UpdateIoTDevice(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "DeviceModel", deviceModelId )
			return utils.RequestResult{false, msg, "assignDeviceModel", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a DeviceModel on a IoTDevice
//----------------------------------------------------------------------------
func UnassignDeviceModelFromIoTDevice(ioTDeviceId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		//----------------------------------------------------------------------------
		// assign an empty DeviceModel to the DeviceModel
		//----------------------------------------------------------------------------
		parentObj.DeviceModel = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the DeviceModel
		//----------------------------------------------------------------------------
		parentObj.DeviceModelId = nil;

		//----------------------------------------------------------------------------
		// save the IoTDevice
		//----------------------------------------------------------------------------
		return UpdateIoTDevice(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Tenant on a IoTDevice
//----------------------------------------------------------------------------
func AssignTenantToIoTDevice( ioTDeviceId uint64, tenantId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.Tenant

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Tenant with a
		// matching tenantId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, tenantId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Tenant	to the IoTDevice
			//----------------------------------------------------------------------------
			parentObj.Tenant = &childObj

			//----------------------------------------------------------------------------
			// save the IoTDevice
			//----------------------------------------------------------------------------
			return UpdateIoTDevice(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Tenant", tenantId )
			return utils.RequestResult{false, msg, "assignTenant", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Tenant on a IoTDevice
//----------------------------------------------------------------------------
func UnassignTenantFromIoTDevice(ioTDeviceId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		//----------------------------------------------------------------------------
		// assign an empty Tenant to the Tenant
		//----------------------------------------------------------------------------
		parentObj.Tenant = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Tenant
		//----------------------------------------------------------------------------
		parentObj.TenantId = nil;

		//----------------------------------------------------------------------------
		// save the IoTDevice
		//----------------------------------------------------------------------------
		return UpdateIoTDevice(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Site on a IoTDevice
//----------------------------------------------------------------------------
func AssignSiteToIoTDevice( ioTDeviceId uint64, siteId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.Site

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Site with a
		// matching siteId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, siteId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Site	to the IoTDevice
			//----------------------------------------------------------------------------
			parentObj.Site = &childObj

			//----------------------------------------------------------------------------
			// save the IoTDevice
			//----------------------------------------------------------------------------
			return UpdateIoTDevice(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Site", siteId )
			return utils.RequestResult{false, msg, "assignSite", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Site on a IoTDevice
//----------------------------------------------------------------------------
func UnassignSiteFromIoTDevice(ioTDeviceId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		//----------------------------------------------------------------------------
		// assign an empty Site to the Site
		//----------------------------------------------------------------------------
		parentObj.Site = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Site
		//----------------------------------------------------------------------------
		parentObj.SiteId = nil;

		//----------------------------------------------------------------------------
		// save the IoTDevice
		//----------------------------------------------------------------------------
		return UpdateIoTDevice(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Room on a IoTDevice
//----------------------------------------------------------------------------
func AssignRoomToIoTDevice( ioTDeviceId uint64, roomId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.Room

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Room with a
		// matching roomId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, roomId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Room	to the IoTDevice
			//----------------------------------------------------------------------------
			parentObj.Room = &childObj

			//----------------------------------------------------------------------------
			// save the IoTDevice
			//----------------------------------------------------------------------------
			return UpdateIoTDevice(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Room", roomId )
			return utils.RequestResult{false, msg, "assignRoom", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Room on a IoTDevice
//----------------------------------------------------------------------------
func UnassignRoomFromIoTDevice(ioTDeviceId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		//----------------------------------------------------------------------------
		// assign an empty Room to the Room
		//----------------------------------------------------------------------------
		parentObj.Room = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Room
		//----------------------------------------------------------------------------
		parentObj.RoomId = nil;

		//----------------------------------------------------------------------------
		// save the IoTDevice
		//----------------------------------------------------------------------------
		return UpdateIoTDevice(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Gateway on a IoTDevice
//----------------------------------------------------------------------------
func AssignGatewayToIoTDevice( ioTDeviceId uint64, gatewayId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.Gateway

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Gateway with a
		// matching gatewayId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, gatewayId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Gateway	to the IoTDevice
			//----------------------------------------------------------------------------
			parentObj.Gateway = &childObj

			//----------------------------------------------------------------------------
			// save the IoTDevice
			//----------------------------------------------------------------------------
			return UpdateIoTDevice(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Gateway", gatewayId )
			return utils.RequestResult{false, msg, "assignGateway", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Gateway on a IoTDevice
//----------------------------------------------------------------------------
func UnassignGatewayFromIoTDevice(ioTDeviceId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		//----------------------------------------------------------------------------
		// assign an empty Gateway to the Gateway
		//----------------------------------------------------------------------------
		parentObj.Gateway = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Gateway
		//----------------------------------------------------------------------------
		parentObj.GatewayId = nil;

		//----------------------------------------------------------------------------
		// save the IoTDevice
		//----------------------------------------------------------------------------
		return UpdateIoTDevice(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a DigitalTwin on a IoTDevice
//----------------------------------------------------------------------------
func AssignDigitalTwinToIoTDevice( ioTDeviceId uint64, digitalTwinId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.DigitalTwin

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a DigitalTwin with a
		// matching digitalTwinId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, digitalTwinId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the DigitalTwin	to the IoTDevice
			//----------------------------------------------------------------------------
			parentObj.DigitalTwin = &childObj

			//----------------------------------------------------------------------------
			// save the IoTDevice
			//----------------------------------------------------------------------------
			return UpdateIoTDevice(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "DigitalTwin", digitalTwinId )
			return utils.RequestResult{false, msg, "assignDigitalTwin", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a DigitalTwin on a IoTDevice
//----------------------------------------------------------------------------
func UnassignDigitalTwinFromIoTDevice(ioTDeviceId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		//----------------------------------------------------------------------------
		// assign an empty DigitalTwin to the DigitalTwin
		//----------------------------------------------------------------------------
		parentObj.DigitalTwin = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the DigitalTwin
		//----------------------------------------------------------------------------
		parentObj.DigitalTwinId = nil;

		//----------------------------------------------------------------------------
		// save the IoTDevice
		//----------------------------------------------------------------------------
		return UpdateIoTDevice(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a ProvisioningRecord on a IoTDevice
//----------------------------------------------------------------------------
func AssignProvisioningRecordToIoTDevice( ioTDeviceId uint64, provisioningRecordId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.ProvisioningRecord

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a ProvisioningRecord with a
		// matching provisioningRecordId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, provisioningRecordId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the ProvisioningRecord	to the IoTDevice
			//----------------------------------------------------------------------------
			parentObj.ProvisioningRecord = &childObj

			//----------------------------------------------------------------------------
			// save the IoTDevice
			//----------------------------------------------------------------------------
			return UpdateIoTDevice(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "ProvisioningRecord", provisioningRecordId )
			return utils.RequestResult{false, msg, "assignProvisioningRecord", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a ProvisioningRecord on a IoTDevice
//----------------------------------------------------------------------------
func UnassignProvisioningRecordFromIoTDevice(ioTDeviceId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		//----------------------------------------------------------------------------
		// assign an empty ProvisioningRecord to the ProvisioningRecord
		//----------------------------------------------------------------------------
		parentObj.ProvisioningRecord = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the ProvisioningRecord
		//----------------------------------------------------------------------------
		parentObj.ProvisioningRecordId = nil;

		//----------------------------------------------------------------------------
		// save the IoTDevice
		//----------------------------------------------------------------------------
		return UpdateIoTDevice(parentObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more sensorsIds as a Sensors to a IoTDevice
//----------------------------------------------------------------------------
func AddSensorsToIoTDevice ( ioTDeviceId uint64, sensorsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		// slice the ids on comma with no spaces
		ids := strings.Split( sensorsIds, ",")

		for _, sensorsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.SensorInstance

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a SensorInstance
			// with a matching sensorsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , sensorsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Sensors using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Sensors").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Sensors", sensorsId )
				return utils.RequestResult{false, msg, "unassignSensors", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified IoTDevice from the gorm
		//----------------------------------------------------------------------------
		return GetIoTDevice(ioTDeviceId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more sensorsIds as a Sensors from a IoTDevice
//----------------------------------------------------------------------------
func RemoveSensorsFromIoTDevice( ioTDeviceId uint64, sensorsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		// slice the ids on comma with no spaces
		ids := strings.Split( sensorsIds, ",")

		for _, sensorsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.SensorInstance

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a SensorInstance
			// with a matching sensorsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , sensorsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove SensorInstanceObj from the Sensors array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Sensors").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Sensors", sensorsId )
				return utils.RequestResult{false, msg, "removeSensors", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified IoTDevice from the gorm
		//----------------------------------------------------------------------------
		return GetIoTDevice(ioTDeviceId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more actuatorsIds as a Actuators to a IoTDevice
//----------------------------------------------------------------------------
func AddActuatorsToIoTDevice ( ioTDeviceId uint64, actuatorsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		// slice the ids on comma with no spaces
		ids := strings.Split( actuatorsIds, ",")

		for _, actuatorsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.ActuatorInstance

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a ActuatorInstance
			// with a matching actuatorsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , actuatorsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Actuators using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Actuators").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Actuators", actuatorsId )
				return utils.RequestResult{false, msg, "unassignActuators", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified IoTDevice from the gorm
		//----------------------------------------------------------------------------
		return GetIoTDevice(ioTDeviceId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more actuatorsIds as a Actuators from a IoTDevice
//----------------------------------------------------------------------------
func RemoveActuatorsFromIoTDevice( ioTDeviceId uint64, actuatorsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		// slice the ids on comma with no spaces
		ids := strings.Split( actuatorsIds, ",")

		for _, actuatorsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.ActuatorInstance

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a ActuatorInstance
			// with a matching actuatorsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , actuatorsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove ActuatorInstanceObj from the Actuators array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Actuators").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Actuators", actuatorsId )
				return utils.RequestResult{false, msg, "removeActuators", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified IoTDevice from the gorm
		//----------------------------------------------------------------------------
		return GetIoTDevice(ioTDeviceId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more certificatesIds as a Certificates to a IoTDevice
//----------------------------------------------------------------------------
func AddCertificatesToIoTDevice ( ioTDeviceId uint64, certificatesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		// slice the ids on comma with no spaces
		ids := strings.Split( certificatesIds, ",")

		for _, certificatesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.DeviceCertificate

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a DeviceCertificate
			// with a matching certificatesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , certificatesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Certificates using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Certificates").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Certificates", certificatesId )
				return utils.RequestResult{false, msg, "unassignCertificates", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified IoTDevice from the gorm
		//----------------------------------------------------------------------------
		return GetIoTDevice(ioTDeviceId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more certificatesIds as a Certificates from a IoTDevice
//----------------------------------------------------------------------------
func RemoveCertificatesFromIoTDevice( ioTDeviceId uint64, certificatesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		// slice the ids on comma with no spaces
		ids := strings.Split( certificatesIds, ",")

		for _, certificatesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.DeviceCertificate

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a DeviceCertificate
			// with a matching certificatesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , certificatesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove DeviceCertificateObj from the Certificates array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Certificates").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Certificates", certificatesId )
				return utils.RequestResult{false, msg, "removeCertificates", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified IoTDevice from the gorm
		//----------------------------------------------------------------------------
		return GetIoTDevice(ioTDeviceId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more telemetryStreamsIds as a TelemetryStreams to a IoTDevice
//----------------------------------------------------------------------------
func AddTelemetryStreamsToIoTDevice ( ioTDeviceId uint64, telemetryStreamsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		// slice the ids on comma with no spaces
		ids := strings.Split( telemetryStreamsIds, ",")

		for _, telemetryStreamsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.TelemetryStream

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a TelemetryStream
			// with a matching telemetryStreamsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , telemetryStreamsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the TelemetryStreams using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("TelemetryStreams").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "TelemetryStreams", telemetryStreamsId )
				return utils.RequestResult{false, msg, "unassignTelemetryStreams", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified IoTDevice from the gorm
		//----------------------------------------------------------------------------
		return GetIoTDevice(ioTDeviceId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more telemetryStreamsIds as a TelemetryStreams from a IoTDevice
//----------------------------------------------------------------------------
func RemoveTelemetryStreamsFromIoTDevice( ioTDeviceId uint64, telemetryStreamsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		// slice the ids on comma with no spaces
		ids := strings.Split( telemetryStreamsIds, ",")

		for _, telemetryStreamsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.TelemetryStream

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a TelemetryStream
			// with a matching telemetryStreamsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , telemetryStreamsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove TelemetryStreamObj from the TelemetryStreams array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("TelemetryStreams").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "TelemetryStreams", telemetryStreamsId )
				return utils.RequestResult{false, msg, "removeTelemetryStreams", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified IoTDevice from the gorm
		//----------------------------------------------------------------------------
		return GetIoTDevice(ioTDeviceId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more commandInvocationsIds as a CommandInvocations to a IoTDevice
//----------------------------------------------------------------------------
func AddCommandInvocationsToIoTDevice ( ioTDeviceId uint64, commandInvocationsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		// slice the ids on comma with no spaces
		ids := strings.Split( commandInvocationsIds, ",")

		for _, commandInvocationsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.CommandInvocation

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a CommandInvocation
			// with a matching commandInvocationsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , commandInvocationsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the CommandInvocations using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("CommandInvocations").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "CommandInvocations", commandInvocationsId )
				return utils.RequestResult{false, msg, "unassignCommandInvocations", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified IoTDevice from the gorm
		//----------------------------------------------------------------------------
		return GetIoTDevice(ioTDeviceId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more commandInvocationsIds as a CommandInvocations from a IoTDevice
//----------------------------------------------------------------------------
func RemoveCommandInvocationsFromIoTDevice( ioTDeviceId uint64, commandInvocationsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		// slice the ids on comma with no spaces
		ids := strings.Split( commandInvocationsIds, ",")

		for _, commandInvocationsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.CommandInvocation

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a CommandInvocation
			// with a matching commandInvocationsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , commandInvocationsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove CommandInvocationObj from the CommandInvocations array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("CommandInvocations").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "CommandInvocations", commandInvocationsId )
				return utils.RequestResult{false, msg, "removeCommandInvocations", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified IoTDevice from the gorm
		//----------------------------------------------------------------------------
		return GetIoTDevice(ioTDeviceId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more alertsIds as a Alerts to a IoTDevice
//----------------------------------------------------------------------------
func AddAlertsToIoTDevice ( ioTDeviceId uint64, alertsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		// slice the ids on comma with no spaces
		ids := strings.Split( alertsIds, ",")

		for _, alertsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.Alert

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Alert
			// with a matching alertsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , alertsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Alerts using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Alerts").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Alerts", alertsId )
				return utils.RequestResult{false, msg, "unassignAlerts", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified IoTDevice from the gorm
		//----------------------------------------------------------------------------
		return GetIoTDevice(ioTDeviceId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more alertsIds as a Alerts from a IoTDevice
//----------------------------------------------------------------------------
func RemoveAlertsFromIoTDevice( ioTDeviceId uint64, alertsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		// slice the ids on comma with no spaces
		ids := strings.Split( alertsIds, ",")

		for _, alertsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.Alert

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Alert
			// with a matching alertsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , alertsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove AlertObj from the Alerts array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Alerts").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Alerts", alertsId )
				return utils.RequestResult{false, msg, "removeAlerts", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified IoTDevice from the gorm
		//----------------------------------------------------------------------------
		return GetIoTDevice(ioTDeviceId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more deviceGroupsIds as a DeviceGroups to a IoTDevice
//----------------------------------------------------------------------------
func AddDeviceGroupsToIoTDevice ( ioTDeviceId uint64, deviceGroupsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		// slice the ids on comma with no spaces
		ids := strings.Split( deviceGroupsIds, ",")

		for _, deviceGroupsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.DeviceGroup

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a DeviceGroup
			// with a matching deviceGroupsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , deviceGroupsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the DeviceGroups using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("DeviceGroups").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "DeviceGroups", deviceGroupsId )
				return utils.RequestResult{false, msg, "unassignDeviceGroups", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified IoTDevice from the gorm
		//----------------------------------------------------------------------------
		return GetIoTDevice(ioTDeviceId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more deviceGroupsIds as a DeviceGroups from a IoTDevice
//----------------------------------------------------------------------------
func RemoveDeviceGroupsFromIoTDevice( ioTDeviceId uint64, deviceGroupsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		// slice the ids on comma with no spaces
		ids := strings.Split( deviceGroupsIds, ",")

		for _, deviceGroupsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.DeviceGroup

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a DeviceGroup
			// with a matching deviceGroupsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , deviceGroupsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove DeviceGroupObj from the DeviceGroups array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("DeviceGroups").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "DeviceGroups", deviceGroupsId )
				return utils.RequestResult{false, msg, "removeDeviceGroups", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified IoTDevice from the gorm
		//----------------------------------------------------------------------------
		return GetIoTDevice(ioTDeviceId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more networkProfilesIds as a NetworkProfiles to a IoTDevice
//----------------------------------------------------------------------------
func AddNetworkProfilesToIoTDevice ( ioTDeviceId uint64, networkProfilesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		// slice the ids on comma with no spaces
		ids := strings.Split( networkProfilesIds, ",")

		for _, networkProfilesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.NetworkProfile

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a NetworkProfile
			// with a matching networkProfilesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , networkProfilesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the NetworkProfiles using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("NetworkProfiles").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "NetworkProfiles", networkProfilesId )
				return utils.RequestResult{false, msg, "unassignNetworkProfiles", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified IoTDevice from the gorm
		//----------------------------------------------------------------------------
		return GetIoTDevice(ioTDeviceId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more networkProfilesIds as a NetworkProfiles from a IoTDevice
//----------------------------------------------------------------------------
func RemoveNetworkProfilesFromIoTDevice( ioTDeviceId uint64, networkProfilesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the IoTDevice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetIoTDevice(ioTDeviceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.IoTDevice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.IoTDevice)

		// slice the ids on comma with no spaces
		ids := strings.Split( networkProfilesIds, ",")

		for _, networkProfilesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.NetworkProfile

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a NetworkProfile
			// with a matching networkProfilesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , networkProfilesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove NetworkProfileObj from the NetworkProfiles array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("NetworkProfiles").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "NetworkProfiles", networkProfilesId )
				return utils.RequestResult{false, msg, "removeNetworkProfiles", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified IoTDevice from the gorm
		//----------------------------------------------------------------------------
		return GetIoTDevice(ioTDeviceId)

	} else {
		return parentRequestResult
	}
}

