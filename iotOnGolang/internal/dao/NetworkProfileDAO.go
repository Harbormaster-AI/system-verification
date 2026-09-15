package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing NetworkProfileDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateNetworkProfile - creates a new db entry
//----------------------------------------------------------------------------
func CreateNetworkProfile(obj model.NetworkProfile)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a NetworkProfile with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a NetworkProfile", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateNetworkProfile", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetNetworkProfile - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetNetworkProfile(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.NetworkProfile

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a NetworkProfile with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a NetworkProfile using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a NetworkProfile using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetNetworkProfile", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllNetworkProfile - returns all
//----------------------------------------------------------------------------
func GetAllNetworkProfile()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.NetworkProfile

	//----------------------------------------------------------------------------
	// Request the ORM to find all NetworkProfile
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all NetworkProfile" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all NetworkProfile", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllNetworkProfile", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateNetworkProfile - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateNetworkProfile(obj model.NetworkProfile)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a NetworkProfile using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a NetworkProfile using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateNetworkProfile", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteNetworkProfile - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteNetworkProfile(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the NetworkProfile with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetNetworkProfile(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.NetworkProfile so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.NetworkProfile)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a NetworkProfile using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a NetworkProfile using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteNetworkProfile", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Device on a NetworkProfile
//----------------------------------------------------------------------------
func AssignDeviceToNetworkProfile( networkProfileId uint64, deviceId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the NetworkProfile with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetNetworkProfile(networkProfileId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.NetworkProfile so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.NetworkProfile)

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
			// assign the Device	to the NetworkProfile
			//----------------------------------------------------------------------------
			parentObj.Device = &childObj

			//----------------------------------------------------------------------------
			// save the NetworkProfile
			//----------------------------------------------------------------------------
			return UpdateNetworkProfile(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Device", deviceId )
			return utils.RequestResult{false, msg, "assignDevice", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Device on a NetworkProfile
//----------------------------------------------------------------------------
func UnassignDeviceFromNetworkProfile(networkProfileId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the NetworkProfile with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetNetworkProfile(networkProfileId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.NetworkProfile so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.NetworkProfile)

		//----------------------------------------------------------------------------
		// assign an empty IoTDevice to the Device
		//----------------------------------------------------------------------------
		parentObj.Device = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Device
		//----------------------------------------------------------------------------
		parentObj.DeviceId = nil;

		//----------------------------------------------------------------------------
		// save the NetworkProfile
		//----------------------------------------------------------------------------
		return UpdateNetworkProfile(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Gateway on a NetworkProfile
//----------------------------------------------------------------------------
func AssignGatewayToNetworkProfile( networkProfileId uint64, gatewayId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the NetworkProfile with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetNetworkProfile(networkProfileId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.NetworkProfile so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.NetworkProfile)

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
			// assign the Gateway	to the NetworkProfile
			//----------------------------------------------------------------------------
			parentObj.Gateway = &childObj

			//----------------------------------------------------------------------------
			// save the NetworkProfile
			//----------------------------------------------------------------------------
			return UpdateNetworkProfile(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Gateway", gatewayId )
			return utils.RequestResult{false, msg, "assignGateway", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Gateway on a NetworkProfile
//----------------------------------------------------------------------------
func UnassignGatewayFromNetworkProfile(networkProfileId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the NetworkProfile with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetNetworkProfile(networkProfileId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.NetworkProfile so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.NetworkProfile)

		//----------------------------------------------------------------------------
		// assign an empty Gateway to the Gateway
		//----------------------------------------------------------------------------
		parentObj.Gateway = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Gateway
		//----------------------------------------------------------------------------
		parentObj.GatewayId = nil;

		//----------------------------------------------------------------------------
		// save the NetworkProfile
		//----------------------------------------------------------------------------
		return UpdateNetworkProfile(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a SimCard on a NetworkProfile
//----------------------------------------------------------------------------
func AssignSimCardToNetworkProfile( networkProfileId uint64, simCardId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the NetworkProfile with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetNetworkProfile(networkProfileId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.NetworkProfile so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.NetworkProfile)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.SimCard

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a SimCard with a
		// matching simCardId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, simCardId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the SimCard	to the NetworkProfile
			//----------------------------------------------------------------------------
			parentObj.SimCard = &childObj

			//----------------------------------------------------------------------------
			// save the NetworkProfile
			//----------------------------------------------------------------------------
			return UpdateNetworkProfile(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "SimCard", simCardId )
			return utils.RequestResult{false, msg, "assignSimCard", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a SimCard on a NetworkProfile
//----------------------------------------------------------------------------
func UnassignSimCardFromNetworkProfile(networkProfileId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the NetworkProfile with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetNetworkProfile(networkProfileId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.NetworkProfile so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.NetworkProfile)

		//----------------------------------------------------------------------------
		// assign an empty SimCard to the SimCard
		//----------------------------------------------------------------------------
		parentObj.SimCard = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the SimCard
		//----------------------------------------------------------------------------
		parentObj.SimCardId = nil;

		//----------------------------------------------------------------------------
		// save the NetworkProfile
		//----------------------------------------------------------------------------
		return UpdateNetworkProfile(parentObj)

	} else {
		return parentRequestResult
	}

}


