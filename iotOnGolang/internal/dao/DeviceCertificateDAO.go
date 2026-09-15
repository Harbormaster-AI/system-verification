
package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing DeviceCertificateDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateDeviceCertificate - creates a new db entry
//----------------------------------------------------------------------------
func CreateDeviceCertificate(obj model.DeviceCertificate)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a DeviceCertificate with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a DeviceCertificate", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateDeviceCertificate", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetDeviceCertificate - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetDeviceCertificate(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.DeviceCertificate

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a DeviceCertificate with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a DeviceCertificate using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a DeviceCertificate using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetDeviceCertificate", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllDeviceCertificate - returns all
//----------------------------------------------------------------------------
func GetAllDeviceCertificate()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.DeviceCertificate

	//----------------------------------------------------------------------------
	// Request the ORM to find all DeviceCertificate
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all DeviceCertificate" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all DeviceCertificate", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllDeviceCertificate", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateDeviceCertificate - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateDeviceCertificate(obj model.DeviceCertificate)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a DeviceCertificate using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a DeviceCertificate using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateDeviceCertificate", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteDeviceCertificate - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteDeviceCertificate(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the DeviceCertificate with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetDeviceCertificate(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceCertificate so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.DeviceCertificate)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a DeviceCertificate using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a DeviceCertificate using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteDeviceCertificate", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Device on a DeviceCertificate
//----------------------------------------------------------------------------
func AssignDeviceToDeviceCertificate( deviceCertificateId uint64, deviceId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the DeviceCertificate with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDeviceCertificate(deviceCertificateId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceCertificate so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DeviceCertificate)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.IoTDevice

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a IoTDevice with a
		// matching deviceId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, deviceId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Device	to the DeviceCertificate
			//----------------------------------------------------------------------------
			parentObj.Device = &childObj

			//----------------------------------------------------------------------------
			// save the DeviceCertificate
			//----------------------------------------------------------------------------
			return UpdateDeviceCertificate(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Device", deviceId )
			return utils.RequestResult{false, msg, "assignDevice", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Device on a DeviceCertificate
//----------------------------------------------------------------------------
func UnassignDeviceFromDeviceCertificate(deviceCertificateId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the DeviceCertificate with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDeviceCertificate(deviceCertificateId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceCertificate so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DeviceCertificate)

		//----------------------------------------------------------------------------
		// assign an empty IoTDevice to the Device
		//----------------------------------------------------------------------------
		parentObj.Device = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Device
		//----------------------------------------------------------------------------
		parentObj.DeviceId = nil;

		//----------------------------------------------------------------------------
		// save the DeviceCertificate
		//----------------------------------------------------------------------------
		return UpdateDeviceCertificate(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Gateway on a DeviceCertificate
//----------------------------------------------------------------------------
func AssignGatewayToDeviceCertificate( deviceCertificateId uint64, gatewayId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the DeviceCertificate with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDeviceCertificate(deviceCertificateId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceCertificate so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DeviceCertificate)

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
			// assign the Gateway	to the DeviceCertificate
			//----------------------------------------------------------------------------
			parentObj.Gateway = &childObj

			//----------------------------------------------------------------------------
			// save the DeviceCertificate
			//----------------------------------------------------------------------------
			return UpdateDeviceCertificate(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Gateway", gatewayId )
			return utils.RequestResult{false, msg, "assignGateway", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Gateway on a DeviceCertificate
//----------------------------------------------------------------------------
func UnassignGatewayFromDeviceCertificate(deviceCertificateId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the DeviceCertificate with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDeviceCertificate(deviceCertificateId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceCertificate so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DeviceCertificate)

		//----------------------------------------------------------------------------
		// assign an empty Gateway to the Gateway
		//----------------------------------------------------------------------------
		parentObj.Gateway = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Gateway
		//----------------------------------------------------------------------------
		parentObj.GatewayId = nil;

		//----------------------------------------------------------------------------
		// save the DeviceCertificate
		//----------------------------------------------------------------------------
		return UpdateDeviceCertificate(parentObj)

	} else {
		return parentRequestResult
	}

}


